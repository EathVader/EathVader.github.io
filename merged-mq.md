# 消息队列全面总结

## 一、消息队列核心概念

### 1.1 什么是消息队列

消息队列（Message Queue, MQ）本质上是一个基于磁盘持久化的 FIFO 队列数据结构，用于在分布式系统中实现进程间的异步通信。它充当"蓄水池"角色——当洪峰数据来临时，大量消息堆积在 MQ 中，后端程序按自身消费速度读取数据，从而平滑瞬时写压力。

### 1.2 为什么使用消息队列

三大核心场景：**解耦、异步、削峰**。

- **解耦**：系统 A 将消息写入 MQ，下游系统自行订阅，新增/移除下游无需修改上游代码。
- **异步**：非必要的业务逻辑以异步方式运行，加快主链路响应速度。
- **削峰填谷**：高并发时请求先进入 MQ，后端按数据库可承受的并发量慢慢拉取，避免数据库被瞬时流量击垮。

### 1.3 使用消息队列的代价

- **系统可用性降低**：MQ 本身成为新的故障点，MQ 挂掉则整个链路受影响。
- **系统复杂性增加**：需额外考虑一致性、幂等、可靠传输、顺序性等问题。

### 1.4 消息的生命周期

以微信 MQ 为例，框架介入任务的完整生命周期：**入队落盘 → 派发 → 处理 → 提交结果 → 销毁**。业务基于框架开发，只需专注任务处理逻辑。

## 二、常见 MQ 对比（Kafka / RocketMQ / Pulsar / RabbitMQ）

### 2.1 总览对比

| 特性 | Kafka | RocketMQ | Pulsar | RabbitMQ |
|------|-------|----------|--------|----------|
| 开发语言 | Scala/Java | Java | Java | Erlang |
| 协议 | 自定义二进制 TCP | 自定义 | 自定义二进制 | AMQP |
| 消息模型 | 发布/订阅（基于 Partition） | 发布/订阅 + 点对点 | 发布/订阅（基于 Topic + Partition） | 点对点 + 发布/订阅 |
| 吞吐量 | 极高（百万级/秒） | 高（十万级/秒） | 高 | 中（万级/秒） |
| 延迟 | ms 级 | ms 级 | ms 级 | μs 级 |
| 消息可靠性 | 可配置（acks=all 时最高） | 高（同步双写） | 高（BookKeeper 持久化） | 高（镜像队列） |
| 顺序消息 | Partition 内有序 | 支持 | 支持 | 不保证 |
| 事务消息 | 支持（0.11+） | 支持 | 支持 | 不支持 |
| 消息回溯 | 支持（基于 offset） | 支持 | 支持 | 不支持 |
| 社区活跃度 | 极高 | 高（Apache 顶级项目） | 高（Apache 孵化） | 高 |
| 运维复杂度 | 中（依赖 ZooKeeper） | 中（NameServer 轻量） | 高（依赖 BookKeeper + ZK） | 低 |

### 2.2 选型建议

- **中小型公司**：推荐 **RabbitMQ**。功能完备，管理界面友好，社区活跃可解决开发中遇到的 bug。
- **大型公司**：根据场景在 **RocketMQ** 和 **Kafka** 之间选择。
  - 日志采集、大数据流处理 → **Kafka**（吞吐量极高）。
  - 交易链路、金融级可靠性 → **RocketMQ**（阿里双11万亿级消息验证，稳定可靠优先于吞吐）。
- **下一代架构**：**Pulsar** 存算分离架构，适合需要多租户、跨地域复制的场景。

### 2.3 各 MQ 架构特点

**Kafka**：Broker 集群 + ZooKeeper。Producer push 消息到 Broker，Consumer pull 消息。Topic 分为多个 Partition，Partition 分布在不同 Broker 上。通过 ISR（In-Sync Replicas）机制保证高可用。

**RocketMQ**：经历三代演进——第一代推模式（关系型数据库存储）→ 第二代拉模式（自研存储）→ 第三代 RocketMQ（拉模式为主兼有推模式）。采用 NameServer 替代 ZooKeeper，更轻量。Producer 只能发送到 Broker Master，Consumer 可从 Master 或 Slave 订阅。

**Pulsar**：存算分离架构，Broker 无状态，数据持久化到 Apache BookKeeper。Producer 通过 LookupService 做服务发现，找到 Topic 对应的 Broker 建立连接。支持 PartitionedProducer，内部为每个分区创建独立的 ProducerImpl 实例。

**RabbitMQ**：支持普通集群和镜像集群模式。Erlang 语言天生具备高并发特性，但国内定制化开发人才稀缺。

## 三、消息模型（点对点 / 发布订阅）

### 3.1 点对点模型（单播）

一份数据仅发送给一个消费者。典型场景：计数系统——多台机器提供服务，但同一条消息只能被其中一台处理，否则计数重复。

实现方式：消费者组（Consumer Group）内的消费者竞争消费同一队列的消息，每条消息只被组内一个消费者处理。

### 3.2 发布/订阅模型（广播）

一份数据发送给所有订阅者。典型场景：数据冗余存储——同一条消息需要发送到多台机器进行持久化。

### 3.3 分组发送（混合模型）

结合广播和单播：不同消费者组之间是广播关系（每个组都收到全量数据），组内是单播关系（组内只有一个消费者处理）。

- Kafka：通过 Consumer Group 天然支持。不同 Group 独立消费同一 Topic 的全量数据；同一 Group 内的 Consumer 分摊 Partition。
- RocketMQ：类似机制，Consumer 同时和 Master/Slave 建立长连接。
- Pulsar：通过 Subscription 模式（Exclusive / Shared / Failover）灵活支持。

### 3.4 数据重放

MQ 的重要能力——将消费位点回退到之前某个状态，重新消费历史数据。用于数据恢复、bug 修复后的数据重处理。Kafka 通过 offset 机制天然支持，RocketMQ 和 Pulsar 同样支持。

## 四、可靠性保证（幂等 / 顺序 / 事务消息）

### 4.1 如何保证消息不丢失

消息丢失可能发生在三个环节：**生产者丢数据、MQ 丢数据、消费者丢数据**。

**RabbitMQ 方案：**
- 生产者：使用 confirm 模式（优于 transaction 模式，后者吞吐量低）。消息投递到队列后 Broker 返回 Ack，未处理则返回 Nack 可重试。
- MQ 端：开启持久化（queue 的 durable=true + deliveryMode=2），配合 confirm 机制，持久化后再发 Ack。
- 消费者：关闭自动确认，采用手动确认（manual ack）。

**Kafka 方案：**
- 生产者：设置 `acks=all`（所有 ISR 副本确认）+ `retries=MAX`（写入失败无限重试）。
- MQ 端：`replication.factor > 1`（每个 Partition 至少 2 个副本）+ `min.insync.replicas > 1`（Leader 至少感知 1 个 Follower 在同步）。
- 消费者：关闭自动提交 offset，改为手动提交。

**RocketMQ 方案：**
- 同步双写模式：Master 和 Slave 均写成功才返回成功，保证机器故障时数据不丢。
- 异步复制模式：Master 写成功即返回，吞吐量高但 Master 故障可能丢数据。
- 通过全局递增 SequenceID 保证数据强一致。

### 4.2 如何保证消息不被重复消费（幂等性）

重复消费的根因：消费者处理完消息后的确认信息（ACK/offset 提交）因网络故障未送达 MQ，导致 MQ 重新投递。

**解决方案（按业务场景）：**
1. **数据库 insert 操作**：利用唯一主键约束，重复插入会主键冲突。
2. **Redis set 操作**：天然幂等，set 多次结果一致。
3. **通用方案**：用 Redis 维护消费记录，消费前查询 `<全局ID, message>` 是否已存在。
4. **Pulsar 方案**：Producer 包含 sequenceId，可用于服务端去重实现幂等。

### 4.3 如何保证消息的顺序性

核心思路：**保证需要有序的消息进入同一个队列（Partition/Queue），由同一个消费者顺序消费。**

- Kafka：通过 Key 的 hash 将相关消息路由到同一 Partition，Partition 内严格有序。
- RocketMQ：支持顺序消息，将同一业务 ID 的消息发送到同一 Queue。
- 多消费者场景：入队保证有序，出队后由消费者自行保证处理顺序（如失败重试机制）。

### 4.4 事务消息

RocketMQ 原生支持事务消息：
1. 发送半消息（Half Message）到 Broker，此时消费者不可见。
2. 执行本地事务。
3. 根据本地事务结果提交（Commit）或回滚（Rollback）半消息。
4. Broker 定时回查未确认的半消息状态。

Kafka 0.11+ 支持 Exactly-Once 语义和事务 API。

### 4.5 确认与阻塞机制

类似 TCP 协议，MQ 需要确认机制保证数据不丢失。当后端处理不过来或未确认时，MQ 发送阻塞，直到后端恢复接收和确认能力。这正是 MQ "蓄水池"功能的体现。

## 五、Kafka 性能监控

### 5.1 Broker 核心指标

| 指标 | MBean | 含义 | 告警建议 |
|------|-------|------|----------|
| **UnderReplicatedPartitions** | `kafka.server:type=ReplicaManager,name=UnderReplicatedPartitions` | 未充分复制的分区数 | > 0 持续时应告警 |
| **IsrShrinksPerSec / IsrExpandsPerSec** | `kafka.server:type=ReplicaManager` | ISR 池收缩/扩展速率 | 收缩无对应扩展时告警 |
| **ActiveControllerCount** | `kafka.controller:type=KafkaController` | 集群中活跃 Controller 数量 | 必须为 1，为 0 立即告警 |
| **OfflinePartitionsCount** | `kafka.controller:type=KafkaController` | 无 Leader 的离线分区数 | > 0 立即告警（读写完全阻塞） |
| **UncleanLeaderElectionsPerSec** | `kafka.controller:type=ControllerStats` | 不干净的 Leader 选举速率 | > 0 必须告警（意味着数据丢失） |
| **TotalTimeMs** | `kafka.network:type=RequestMetrics` | 请求总耗时（queue + local + remote + response） | 异常波动时排查各子阶段 |
| **PurgatorySize** | `kafka.server:type=ProducerRequestPurgatory` | 等待中的请求数（Produce/Fetch） | 持续增大说明延迟源 |
| **BytesInPerSec / BytesOutPerSec** | `kafka.server:type=BrokerTopicMetrics` | 入站/出站字节速率 | 监控网络瓶颈 |

### 5.2 主机级别指标

- **Page Cache 读取比率**：Kafka 设计之初就依赖内核 Page Cache 加速。比率 < 80% 应考虑扩容 Broker。
- **磁盘使用率**：Kafka 所有数据持久化到磁盘，磁盘满则服务失败。需监控增长趋势并提前告警。
- **CPU 使用率**：通常不是瓶颈，但出现尖峰值得排查。
- **网络吞吐**：结合 TCP 重传和丢包错误判断是否为网络问题。

### 5.3 JVM GC 指标

| 指标 | 含义 |
|------|------|
| **ParNew count/time** | 年轻代 GC 次数和耗时（Stop-the-World，直接影响性能） |
| **CMS count/time** | 老年代 GC 次数和耗时（低暂停，但耗时过长说明内存不足） |

GC 暂停过长会导致 ZooKeeper 会话超时。优化手段：升级 JDK/GC 收集器、调整堆大小、优化数据结构、调整 `zookeeper.session.timeout.ms`。

### 5.4 Producer 监控指标

| 指标 | 含义 |
|------|------|
| **Response rate** | Broker 响应速率，取决于 `acks` 配置 |
| **Request rate** | 发送请求速率，关注峰值和骤降 |
| **Request latency avg** | 平均请求延迟，可通过 `linger.ms` 和 `batch.size` 调优 |
| **Outgoing byte rate** | 出站字节速率 |
| **IO wait time ns avg** | I/O 等待时间，过高考虑换 SSD |

**调优要点**：增大 `batch.size`（上限配置，不会无限等待）可显著提升吞吐量；`linger.ms` 控制发送前等待时间以积累批量消息。

### 5.5 Consumer 监控指标

| 指标 | 含义 |
|------|------|
| **ConsumerLag / MaxLag** | 消费者当前 offset 与生产者 offset 的差值，最关键的消费者指标 |
| **BytesPerSec** | 消费字节速率 |
| **MessagesPerSec** | 消费消息速率（与字节速率不一定正相关，消息大小可变） |
| **MinFetchRate** | 最小拉取速率，趋近 0 可能是消费者故障信号 |

**ConsumerLag 处理**：持续高 lag 说明消费者过载，可增加消费者数量 + 增加 Partition 数量来提升并行度。

### 5.6 ZooKeeper 监控

| 指标 | 含义 |
|------|------|
| `zk_outstanding_requests` | 排队请求数，过多会触发限流 |
| `zk_avg_latency` | 平均响应延迟（ms） |
| `zk_num_alive_connections` | 客户端连接数，异常下降需排查 |
| `zk_followers`（Leader only） | 活跃 Follower 数 = 集群总数 - 1 |
| `zk_pending_syncs`（Leader only） | 待同步事务数，> 10 应告警 |
| `zk_open_file_descriptor_count` | 文件描述符使用数 |

ZooKeeper 应完全驻留内存，避免 swap。磁盘延迟直接影响事务日志写入性能，建议使用 SSD。

## 六、微信 MQ 实践

### 6.1 架构概述

微信 MQ 是自研的异步队列组件，分为 **MQ**（任务持久化和调度框架）和 **Worker**（任务处理框架）两部分。核心特点：
- 关注单机性能，任务单机持久化、本机消费。
- 框架介入任务完整生命周期：入队落盘 → 派发 → 处理 → 提交结果 → 销毁。

### 6.2 MQ 2.0 三大优化

#### 6.2.1 跨机消费——更优的任务调度

**问题**：MQ 1.0 任务只能本机消费。微信多 IDC 部署，部分 IDC 与 APNs 网络质量差导致 Worker 消费能力下降，产生积压。

**解决方案**：去中心化、自适应的弹性消费网络。

核心设计决策：
1. **拉任务 vs 推任务**：选择**拉模式**。推模式延迟低但任务积压在 Worker 端无法重新调度；拉模式任务留在 MQ 端，可被空闲 Worker 拉走。
2. **积压感知**：通过**广播模式**，MQ 将积压量信息通过长连接推送给 Worker。支持本机/跨机/跨 IDC 的分级广播过滤。
3. **消除积压**：Worker 优先消费本机积压，有余力时帮助其他 MQ。分优先级拉取，正常时降低跨机消费，故障时有效消除局部积压。

**效果**：实现 IDC 级别容灾，即使只剩一个 IDC 可用，推送质量不受影响。

#### 6.2.2 类 MapReduce 框架——更高效的任务处理

**问题**：群聊批量并行化投递——每个步骤的 RPC 按目标机器聚合为批量操作再并行执行，多次 MapReduce 嵌套导致代码极其复杂。

**解决方案**：
- **类 MapReduce 任务处理框架**：封装通用 MR 过程和并发调度，提供并发池隔离能力（解决并发池饿死问题）。
- **流式任务处理框架**：任务处理结束时可返回新任务，通过 MQ 内部框架流转入队（比 RPC 入队更轻量、事务性更强）。冗长逻辑可切分为小功能块串联复用，每级之间由 MQ 充当缓冲和调度。

#### 6.2.3 过载保护

**前向限速**（MQ 主动限速）：
- 基于 **CPU 使用率**：CPU 过高时降低任务处理速度，优先保证队列缓存能力。
- 基于**任务成功率**：收集成功率信息评估后端有效输出，通过反馈计算限制重试速度。

**后向限速**（业务反馈限速）：
- 基于**后端 RPC 访问量**：收集业务对后端的实际调用量，反向调节任务处理速度。解决任务处理存在扩散访问时，仅限制任务速度无法准确控制后端压力的问题。

## 七、MQ 设计与实现

### 7.1 MQ 基础功能设计

一个完整的 MQ 应具备以下功能：

| 功能 | 说明 |
|------|------|
| **FIFO 队列** | 基于磁盘持久化的先进先出队列，程序崩溃或断电不丢数据 |
| **广播** | 一份数据发送多份（如数据冗余存储到多台机器） |
| **单播** | 一份数据仅发送一份（如计数系统去重） |
| **分组发送** | 组间广播 + 组内单播（如存储系统需全量 + 计数系统需去重） |
| **数据重放** | 回退消费位点重新消费历史数据，用于数据恢复 |
| **确认与阻塞** | 类 TCP 确认机制，后端未确认则阻塞发送，实现蓄水池功能 |

### 7.2 Pulsar Producer 设计与实现

#### 类职责划分

| 类 | 职责 |
|----|------|
| **Producer** | 定义发送接口（同步/异步发送、flush、统计） |
| **ProducerBase** | 基础实现，持有配置（conf）、Schema、拦截器（interceptors） |
| **ProducerImpl** | 核心实现，一个实例绑定一个 Topic。持有 pendingMessages、batchMessageContainer、timeout 等 |
| **PartitionedProducerImpl** | 组合多个 ProducerImpl，按分区数创建对应数量的 ProducerImpl。通过 MessageRouter 将消息路由到目标 Partition |

#### 消息发送流程

1. **寻址**：通过 LookupService（Binary/HTTP）完成 Topic → Broker 的映射并建立连接。
2. **消息校验与属性增强**。
3. **消息路由**：PartitionedProducerImpl 通过 routerPolicy（MessageRouter）选择目标 Partition。
4. **序列化与发送**：将消息包装为 OpSendMsg，加入 pendingMessages，通过 Connection 的 EventLoop 执行发送。
5. **ACK 处理**：通过 sequenceId 匹配 OpSendMsg，执行回调。
6. **批量支持**：通过 batchMessageContainer 在客户端内存中积累消息，flush 时批量发送。

#### 设计亮点

- Producer 绑定到分区级别，每个分区独立的 Producer 便于实现幂等。
- 同步发送基于异步实现（等待 Future），代码复用性好。
- 拦截器机制（beforeSend / onSendAcknowledgement）提供扩展点。

### 7.3 RocketMQ 高可用架构

#### 低延迟优化

RocketMQ 依赖 Page Cache 加速读写，但受 JVM GC、内核内存管理、文件 IO 等因素影响会出现偶发高延迟。优化措施：

| 优化方向 | 具体手段 |
|----------|----------|
| **JVM 停顿** | 关闭偏向锁（`-XX:-UseBiasedLocking`）、GC 日志输出到 tmpfs、关闭 hsperfdata（`-XX:+PerfDisableSharedMem`） |
| **锁优化** | 利用 CAS 原语将核心链路无锁化，避免上下文切换开销 |
| **内存管理** | 调整 `vm.extra_free_kbytes` 和 `vm.swappiness` 避免直接回收（Direct Reclaim）和匿名页换出 |
| **Page Cache** | 内存预分配、文件预热、mlock 系统调用、读写分离 |

**优化成果**：写消息延迟 99.995% 在 1ms 内，100% 在 100ms 内。

#### 容量保障三大法宝

1. **限流**：借鉴排队理论，对慢请求进行容错处理。离线场景用滑动窗口缓慢缩小拉取频率；高频交易场景采取快速失败策略。经典算法：漏桶（恒定速率）和令牌桶（允许突发）。
2. **降级**：丢卒保车，关闭低优先级组件（如消息轨迹追溯）。基于用户数据 QoS 和引擎组件 QoS 分级。
3. **熔断**：借鉴 Netflix Hystrix 思路自研熔断机制，毫秒级识别并隔离异常服务（常规容错需 30 秒摘除不可用机器）。

#### 高可用方案

基于 Master/Slave + ZooKeeper + Controller 组件：

**有限状态机转换**：
1. 第一个节点启动 → **单主状态**
2. 第二个节点启动 → **异步复制状态**（Master 异步复制到 Slave）
3. Slave 数据即将追上 → **半同步状态**（Hold 写请求，异步复制差异数据）
4. 数据完全追上 → **同步复制状态**（任一节点故障，秒级切换到单主状态）

Controller 组件无状态，多机房分布式部署，监听 ZooKeeper 上的状态变更，控制主备状态机切换。整个切换过程对用户透明，无需运维干预。

#### CAP 权衡

| 方案 | 一致性 | 延迟 | 吞吐 | 数据丢失 | 故障恢复 |
|------|--------|------|------|----------|----------|
| 冷备 | 低 | - | - | 可能 | 手动 |
| Master/Slave 异步 | 最终一致 | 低 | 高 | 可能 | 手动/自动 |
| Master/Slave 同步 | 强一致 | 较高 | 较低 | 不丢 | 自动 |
| Paxos | 强一致 | 高 | 低 | 不丢 | 自动 |

### 7.4 高可用集群部署模式

**RocketMQ**：多 Master 模式、多 Master 多 Slave 异步复制模式、多 Master 多 Slave 同步双写模式。

**Kafka**：多 Broker + ZooKeeper 集群。通过 Partition 的 Leader/Follower 机制实现高可用。Leader 处理所有读写，Follower 从 Leader pull 数据保持同步。Leader 故障时从 ISR 中选举新 Leader。

**可用性公式**：`Availability = MTBF / (MTBF + MTTR)`。5 个 9（99.999%）意味着全年不可用时间 ≤ 5.26 分钟，必须具备故障自动恢复能力。
