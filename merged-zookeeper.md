# ZooKeeper 全面总结

> 本文综合整理自多篇 ZooKeeper 相关笔记与论文，涵盖核心概念、协议原理、数据模型、典型应用场景、跨数据中心部署、运维实践，以及阿里巴巴为何不用 ZooKeeper 做服务发现的深度分析。

---

## 一、核心概念

### 1.1 ZooKeeper 是什么

ZooKeeper 是一个**高可用、高可靠的分布式协调服务**（Distributed Coordination Service），最初由 Yahoo 开发，后成为 Apache 顶级项目。它为分布式应用提供：

- **命名服务**（Name Service）
- **配置管理**（Configuration Management）
- **组成员管理**（Group Membership）
- **分布式锁**（Distributed Lock）
- **Leader 选举**（Leader Election）
- **队列**（Queue）、**屏障**（Barrier）、**两阶段提交**（Two-Phase Commit）

ZooKeeper 本质上是一个**顺序一致性（Sequential Consistency）的分布式 key/value 数据库**，数据以树状层次结构组织，所有数据保存在内存中，同时写入事务日志到磁盘以保证持久性。

### 1.2 核心设计原则

- **数据全量复制**：所有节点保存完整数据副本（内存），因此数据总量受限于内存大小（znode 数据上限 1MB，实际应远小于此）。
- **写操作串行化**：所有写请求由 Leader 统一排序并广播，保证全局写顺序。
- **读操作本地化**：读请求可由任意节点直接响应（从内存读取），因此读性能随节点数增加而线性提升，但可能读到稍旧的数据。
- **写性能随节点增加而下降**：因为每次写都需要多数派确认。
- **节点数量建议为奇数**：3 节点容忍 1 个故障，5 节点容忍 2 个故障。

### 1.3 一致性保证

ZooKeeper 提供以下一致性保证：

| 保证 | 说明 |
|------|------|
| **顺序一致性** | 来自同一客户端的更新按发送顺序执行 |
| **原子性** | 更新操作要么成功要么失败，不存在部分成功 |
| **单一系统视图** | 客户端无论连接哪个服务器，看到的数据视图一致（不会看到比之前更旧的数据） |
| **持久性** | 更新一旦成功，数据持久化，服务器重启不丢失 |
| **时效性** | 客户端视图在一定时间范围内保证更新（通常几十秒内） |

**重要注意**：ZooKeeper **不保证**跨客户端的实时一致性。客户端 A 写入后通知客户端 B 读取，B 可能读到旧值。如需强一致读，B 应先调用 `sync()` 强制同步到 Leader 最新状态。

### 1.4 CAP 定位

- **写操作**：通过 ZAB 协议实现**线性一致性**（Linearizability）
- **读操作**：实现**顺序一致性**（Sequential Consistency），可通过 `sync` + `read` 升级为线性一致性读
- 整体偏向 **CP**：在网络分区时优先保证一致性，牺牲可用性

---

## 二、ZAB 协议

### 2.1 概述

ZAB（ZooKeeper Atomic Broadcast）是 ZooKeeper 的核心一致性协议，参考了 Paxos 算法思想，分为两个阶段循环运行：

### 2.2 阶段一：Leader 选举（Leader Election）

- 集群启动或 Leader 故障时触发选举
- 所有节点（称为 quorum peer）参与投票
- 当**多数派**（quorum）follower 完成与新 Leader 的状态同步后，选举阶段结束
- 选举速度很快，通常约 **200ms**

### 2.3 阶段二：原子广播（Atomic Broadcast）

- 所有写请求发送给 Leader
- Leader 为每个写操作分配全局唯一递增的事务 ID（**zxid**）
- Leader 将写操作广播给所有 Follower
- 当**多数派** Follower 确认写入后，Leader 提交事务并通知客户端成功
- 保证所有副本上操作的复制顺序一致

### 2.4 角色

| 角色 | 职责 |
|------|------|
| **Leader** | 处理所有写请求，分配 zxid，广播事务，确认多数派提交 |
| **Follower** | 接收并执行 Leader 广播的事务，参与投票，可直接处理读请求 |
| **Observer/Learner** | 仅接收数据复制，不参与投票，用于扩展读性能 |

### 2.5 写操作流程

```
Client → Follower → 转发给 Leader → Leader 广播 Proposal → 
Follower ACK → 多数派确认 → Leader Commit → Follower 应用 → 
返回客户端成功
```

关键点：Follower 收到客户端的写请求后转发给 Leader，**会等待该写操作完成后才返回给客户端**，以保证顺序一致性（写后读可见）。

---

## 三、数据模型

### 3.1 ZNode 树

ZooKeeper 的数据模型是一棵**层次化的 ZNode 树**，类似文件系统：

```
/
├── /app1
│   ├── /app1/config    (data: "v1.2")
│   └── /app1/members
│       ├── /app1/members/node1
│       └── /app1/members/node2
└── /zookeeper          (系统保留节点)
```

- 路径使用**绝对路径**（斜杠分隔），不支持相对路径
- 每个 ZNode 既可以存储数据，也可以有子节点
- `zookeeper` 为系统保留名称

### 3.2 ZNode 类型

| 类型 | 特点 |
|------|------|
| **Persistent（持久节点）** | 创建后一直存在，除非主动删除 |
| **Ephemeral（临时节点）** | 与创建它的 Session 绑定，Session 结束自动删除；**不能有子节点** |
| **Sequential（顺序节点）** | 创建时自动在名称后追加 10 位递增序号（如 `lock-0000000001`） |
| **Protected（保护节点）** | 名称前加 GUID 前缀，断线重连后可识别是否为自己创建的节点 |

可组合使用，如 **ProtectedEphemeralSequential**（保护临时顺序节点），常用于服务发现和分布式锁。

### 3.3 Stat 结构体

每个 ZNode 维护一个 Stat 结构体：

| 字段 | 说明 |
|------|------|
| `czxid` | 创建该节点的事务 zxid |
| `mzxid` | 最近修改该节点的事务 zxid |
| `ctime` | 创建时间 |
| `mtime` | 最近修改时间 |
| `version` | 数据版本号（每次修改递增） |
| `cversion` | 子节点版本号 |
| `aversion` | ACL 版本号 |
| `ephemeralOwner` | 临时节点的 Session ID（持久节点为 0） |
| `dataLength` | 数据长度 |
| `numChildren` | 子节点数量 |

### 3.4 核心操作

| 操作 | 说明 |
|------|------|
| `create` | 创建 ZNode |
| `delete` | 删除 ZNode（需指定版本号，-1 忽略版本检查） |
| `exists` | 判断 ZNode 是否存在，可设置 Watch |
| `getData` | 获取 ZNode 数据，可设置 Watch |
| `setData` | 更新 ZNode 数据（需指定版本号） |
| `getChildren` | 获取子节点列表，可设置 Watch |
| `sync` | 强制同步到 Leader 最新状态 |
| `multi` | 批量原子操作（要么全成功，要么全失败） |

### 3.5 Watch 机制

- 客户端可在 `exists`、`getData`、`getChildren` 操作时设置 Watch
- Watch 是**一次性触发**的：触发后自动移除，需重新设置
- Watch 事件类型：`NodeCreated`、`NodeDeleted`、`NodeDataChanged`、`NodeChildrenChanged`
- Watch 事件保证**有序性**：先于对应的新数据被客户端看到
- **注意**：在收到 Watch 事件和重新设置 Watch 之间，可能错过中间的变更

### 3.6 Session 机制

- 客户端与服务器建立 TCP 长连接，创建 Session
- Session 有超时时间（通常 2~20 个 tick，即 4~40 秒）
- 客户端通过心跳（ping）维持 Session 活性
- 连接断开后客户端自动尝试重连其他服务器，**携带已知最新 zxid**，确保不会连接到状态更旧的服务器
- Session 过期后，所有关联的临时节点被删除

### 3.7 ACL 访问控制

支持的鉴权方式：
- **digest**：用户名 + 密码
- **sasl**：Kerberos
- **ip**：客户端 IP 地址

权限类型：CREATE、READ、WRITE、DELETE、ADMIN

---

## 四、典型应用

### 4.1 服务发现

**原理**：利用临时节点（Ephemeral ZNode）将服务进程的生命周期与 ZNode 绑定。

**实现步骤**：
1. 创建服务根节点（如 `/api`），持久节点
2. 创建服务名节点（如 `/api/user`），持久节点
3. 每个服务实例创建 **ProtectedEphemeralSequential** 子节点，数据为 `{host, port}` 的 JSON
4. 消费者通过 `getChildren` + Watch 获取服务列表，实时感知上下线

**Go 语言示例核心结构**：
```go
type ServiceNode struct {
    Name string `json:"name"`
    Host string `json:"host"`
    Port int    `json:"port"`
}
```

**注意事项**：
- 进程退出前务必调用 `Close()` 关闭 Session，否则临时节点要等 Session 超时后才消失
- 获取子节点列表和读取子节点数据不是原子操作，读取时节点可能已被删除
- 健康检测仅依赖 TCP 长连接活性，无法反映服务真实健康状态

### 4.2 配置管理

**原理**：将配置数据存储在 ZNode 中，所有依赖该配置的进程通过 Watch 机制实时获取变更。

**实现**：
1. 配置写入方（Master）将 key-value 写入指定 ZNode（如 `/config`）
2. 配置消费方通过 `getData` + Watch 读取配置
3. 配置变更时，Watch 触发 `NodeDataChanged` 事件
4. 消费方在回调中重新 `getData` + Watch，获取最新配置

**优势**：所有进程最终都能获得最新配置，重启的进程在初始化时也能读到最新值。

### 4.3 分布式锁

#### 排他锁（Exclusive Lock）

1. 在锁节点（如 `/locknode`）下创建 **Ephemeral + Sequential** 子节点 `lock-`
2. 调用 `getChildren`（**不设置 Watch**，避免羊群效应）
3. 如果自己的序号最小，获得锁
4. 否则，对序号比自己小的前一个节点调用 `exists` + Watch
5. 前一个节点删除时收到通知，回到步骤 2

**释放锁**：删除自己创建的节点

**关键设计**：
- 每个节点只 Watch 前一个节点，避免**羊群效应**（Herd Effect）
- 无轮询、无超时
- 使用 Session ID 嵌入节点名处理连接丢失的重入问题

#### 共享锁（Shared/Read-Write Lock）

- 读锁：创建 `read-` 前缀的顺序临时节点，仅当前面没有 `write-` 节点时获得锁
- 写锁：创建 `write-` 前缀的顺序临时节点，仅当前面没有任何节点时获得锁

#### 可撤销共享锁

在锁节点上 `setData("unlock")` 通知持有者释放锁，持有者通过 Watch 感知并自愿释放。

### 4.4 Leader 选举

1. 在选举节点（如 `/election`）下创建 **Ephemeral + Sequential** 子节点 `n_`
2. 获取所有子节点列表
3. 如果自己的序号最小，成为 Leader
4. 否则，Watch 序号比自己小的前一个节点（避免羊群效应）
5. 前一个节点消失时，重新检查是否成为 Leader

### 4.5 队列

- **FIFO 队列**：创建 Sequential + Ephemeral 子节点，消费者取序号最小的节点
- **优先级队列**：节点名包含优先级数字（如 `queue-01`），数字越小优先级越高

### 4.6 屏障（Barrier）

- **单屏障**：通过一个屏障节点的存在/删除控制所有进程的阻塞/放行
- **双屏障**：同步计算的开始和结束，所有进程到齐后开始，全部完成后结束

### 4.7 两阶段提交

- 协调者创建事务节点 `/app/Tx`，为每个参与者创建子节点
- 参与者投票（写入 "commit" 或 "abort"）
- 所有参与者通过 Watch 感知投票结果，达成一致决定

---

## 五、跨数据中心部署

### 5.1 方案一：单集群跨数据中心（Single Coordination Service）

```
DC1: ZK1, ZK2    DC2: ZK3, ZK4    DC3: ZK5
```

- **优点**：正确性有保证，可用性好（无单点）
- **缺点**：写操作慢（需跨数据中心多数派确认），读操作快（本地读）

### 5.2 方案二：Learner 模式

```
DC1: ZK1, ZK2, ZK3 (Acceptors)    DC2: Learner1    DC3: Learner2
```

- 所有 Acceptor 部署在一个数据中心，其他数据中心仅部署 Learner（只复制，不投票）
- **优点**：DC1 写操作快（投票在本地完成）
- **缺点**：DC1 是单点，DC1 故障则写服务不可用；其他 DC 写操作需跨数据中心转发

### 5.3 方案三：多独立集群（Multiple Coordination Services）

```
DC1: 独立 ZK 集群（负责 Partition A）+ DC2 的 Learner
DC2: 独立 ZK 集群（负责 Partition B）+ DC1 的 Learner
```

- 数据按规则分片（Partition），每个 DC 负责自己分片的写操作
- **优点**：各 DC 写操作快，读操作本地完成，单 DC 故障仅影响其负责的分片
- **缺点**：**不满足顺序一致性**！不同 DC 的客户端可能看到不同的数据变更顺序

### 5.4 方案四：Modular Composition（改进方案）

在方案三基础上，对**非本分片的读操作**前插入 `sync` 操作：

```
读非本分片数据 → sync（从对应 DC 拉取最新数据到本地 Learner）→ read
```

- 保证了跨分片读的线性一致性，从而满足顺序一致性
- 本分片读写仍在本地完成，性能好
- 非本分片读需跨数据中心 sync，有额外延迟

### 5.5 方案对比

| 方案 | 写性能 | 读性能 | 正确性 | 可用性 |
|------|--------|--------|--------|--------|
| 单集群跨 DC | 慢（跨 DC 投票） | 快（本地读） | ✅ | 好（无单点） |
| Learner 模式 | DC1 快，其他慢 | 快（本地读） | ✅ | DC1 单点 |
| 多独立集群 | 本分片快 | 快（本地读） | ❌ 不满足顺序一致性 | 好（故障隔离） |
| Modular Composition | 本分片快 | 本分片快，跨分片有 sync 开销 | ✅ | 好（故障隔离） |

---

## 六、运维部署

### 6.1 安装

```bash
# 下载解压
tar xzf zookeeper-x.y.z.tar.gz
export ZOOKEEPER_HOME=~/zookeeper-x.y.z
export PATH=$PATH:$ZOOKEEPER_HOME/bin

# 或通过 yum 安装
yum install zookeeper -y
```

### 6.2 配置文件（zoo.cfg）

```properties
# 基本时间单位（毫秒）
tickTime=2000

# 数据目录
dataDir=/data/zookeeper/data

# 事务日志目录（建议独立磁盘）
dataLogDir=/data/zookeeper/log

# 客户端连接端口
clientPort=2181

# 最大客户端连接数
maxClientCnxns=50

# Follower 连接和同步 Leader 的超时（tick 数）
initLimit=10

# Follower 同步 Leader 的超时（tick 数）
syncLimit=5

# 集群节点配置
server.1=10.248.0.44:2888:3888
server.2=10.248.0.45:2888:3888
server.3=10.248.0.46:2888:3888

# 自动清理快照和日志
autopurge.purgeInterval=2
autopurge.snapRetainCount=24
```

**关键参数说明**：
- `initLimit`：Follower 初始连接 Leader 的超时时间，如果频繁选举失败说明值太低
- `syncLimit`：Follower 同步 Leader 的超时，超时后 Follower 自动重启
- `2888` 端口：Follower 与 Leader 通信
- `3888` 端口：Leader 选举通信

### 6.3 设置 myid

每台服务器在 `dataDir` 下创建 `myid` 文件，内容为该节点的 ID（1~255）：

```bash
mkdir -p /data/zookeeper/data
echo '1' > /data/zookeeper/data/myid  # 第一台
echo '2' > /data/zookeeper/data/myid  # 第二台
echo '3' > /data/zookeeper/data/myid  # 第三台
```

### 6.4 启动与检查

```bash
# 启动
zkServer.sh start

# 检查状态
zkServer.sh status
echo ruok | nc localhost 2181    # 返回 imok 表示正常
echo stat | nc localhost 2181    # 查看详细状态
echo mntr | nc localhost 2181    # 监控指标

# 命令行客户端
zkCli.sh -server localhost:2181
```

### 6.5 四字命令

| 命令 | 说明 |
|------|------|
| `ruok` | 检查服务是否运行（返回 imok） |
| `stat` | 服务器状态和连接的客户端 |
| `mntr` | 监控指标（延迟、连接数等） |
| `conf` | 输出配置信息 |
| `cons` | 列出所有客户端连接详情 |
| `dump` | 列出未完成的 Session 和临时节点 |
| `envi` | 环境信息 |
| `wchs` | Watch 概要信息 |

### 6.6 运维最佳实践

1. **事务日志与快照分离**：`dataLogDir` 使用独立磁盘，最大化写日志速率
2. **节点数量为奇数**：3 或 5 个节点最常见
3. **专用服务器**：ZooKeeper 服务器不应运行其他应用
4. **JVM 调优**：在 `conf/java.env` 中配置 JVM 参数
5. **监控**：定期检查 ZooKeeper metrics，关注延迟、连接数、未完成请求数
6. **Session 超时设置**：
   - 太短：网络抖动导致频繁 Session 过期
   - 太长：故障检测延迟增大
   - 集群规模越大，超时时间应适当增大

---

## 七、阿里为什么不用 ZooKeeper 做服务发现

### 7.1 背景

- 2007 年淘宝自研注册中心 ConfigServer 诞生
- 2011 年 Dubbo 开源，支持 ZooKeeper 作为注册中心，推动了 ZK 在国内服务发现领域的流行
- 阿里内部维护着国内最大规模的 ZooKeeper 集群（近千台节点）

### 7.2 注册中心应该是 AP 而非 CP

**数据不一致的影响有限**：如果不同调用方拿到的服务地址列表略有差异（如 S1={ip1..ip9}，S2={ip2..ip10}），仅导致流量轻微不均衡，在最终一致性模型下很快收敛。

**不可用的影响是致命的**：在 ZK 的 2-2-1 三机房部署中，当机房 3 网络分区时，ZK5 不可写（联系不上 Leader）。此时机房 3 的服务无法注册/扩缩容，但机房 3 内部的服务之间网络是通的，却因为注册中心不可用而无法互相调用——**这是不可接受的**。

**铁律**：注册中心不能因为自身的任何原因破坏服务之间本身的可连通性。

### 7.3 服务规模与容量瓶颈

- ZooKeeper 的写操作不可水平扩展（所有写经过 Leader）
- 随着服务规模增长（频繁发布、健康检测、海量长连接），ZK 很快力不从心
- 通过业务垂直拆分到多个 ZK 集群是权宜之计，但破坏了服务的全局可连通性

### 7.4 健康检测过于简单

ZooKeeper 的健康检测绑定在 **Session/TCP 长连接活性**上：
- TCP 连接正常 ≠ 服务健康
- 无法自定义健康检测逻辑（如 HTTP 健康端点、业务逻辑检查）
- 健康检测应开放给服务提供方自定义

### 7.5 持久化存储的必要性存疑

- 服务的实时地址列表和健康状态**不需要**持久化事务日志（调用方只关心当前状态，不关心历史）
- ZAB 协议的事务日志和快照机制在服务发现场景下是不必要的开销
- 服务元数据（版本、分组、权重等）需要持久化，但这部分可以用更合适的存储

### 7.6 客户端复杂度高

- ZooKeeper 原生客户端不好用，Curator 也只是略好
- 需要深入理解 Session 状态机、Watch 机制、各种异常处理
- `ConnectionLossException`：连接丢失，需要处理幂等性和重试
- `SessionExpiredException`：Session 过期，不可恢复，需重建所有状态
- 据阿里内部经验，**80% 以上首次使用 ZK 做集群管理的开发者会踩坑**

### 7.7 注册中心容灾

- 注册中心完全宕机时，服务调用链路**不应受影响**
- 需要客户端本地缓存（Client Snapshot）机制
- ZooKeeper 原生客户端不具备此能力
- 应定期演练：把所有 ZK 节点全部关闭，验证服务调用不受影响

### 7.8 ZooKeeper 的正确使用场景

阿里巴巴的结论：**ZooKeeper 是 "The King of Coordination for Big Data"**

✅ **适合的场景**：
- 粗粒度分布式锁
- 分布式选主
- 主备高可用切换
- 大数据领域的任务协调（Hadoop、HBase、Kafka 等）

❌ **不适合的场景**：
- 大规模服务发现
- 大规模健康监测
- 交易链路上的主业务数据存取
- 需要高 TPS 写入的场景

**一句话总结**：大数据向左（用 ZooKeeper），交易向右（用专门的注册中心）；分布式协调向左，服务发现向右。

---

## 附录：异常处理速查

| 异常 | 类型 | 处理方式 |
|------|------|----------|
| `InterruptedException` | 操作被中断 | 通常意味着应用主动取消，向上抛出 |
| `ConnectionLossException` | 可恢复 | 同一 Session 内重试，注意幂等性 |
| `SessionExpiredException` | 不可恢复 | 必须重建 ZooKeeper 实例和所有状态 |
| `NoNodeException` | 状态异常 | 节点不存在，检查路径或创建节点 |
| `NodeExistsException` | 状态异常 | 节点已存在，多进程并发创建的正常现象 |
| `BadVersionException` | 状态异常 | 版本号不匹配，数据已被其他客户端修改 |
| `AuthFailedException` | 不可恢复 | 鉴权失败，检查 ACL 配置 |
