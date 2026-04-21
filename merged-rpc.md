# RPC 与通信协议全面总结

> 综合整理自：《体系化认识RPC》、《分布式应用通信协议》、《服务化实战之 dubbo/dubbox/motan/thrift/grpc 等RPC框架比较及选型》

---

## 一、RPC 核心原理

### 1.1 什么是 RPC

RPC（Remote Procedure Call）即远程过程调用，核心目标是：**让调用方感觉就像调用本地函数一样调用远端函数，让服务提供方感觉就像实现一个本地函数一样来实现服务**。

- 在某种传输协议（TCP/HTTP 等）上携带信息数据，通过网络从远程计算机程序上请求服务
- 在 OSI 模型中，RPC 跨越了传输层和应用层
- 基于请求-应答模式
- 跨语言的通信标准

### 1.2 RPC 的分层架构

任何一个 RPC 规范和实现都包含三层：

| 层次 | 职责 | 示例 |
|------|------|------|
| **服务层（Service）** | RPC 接口定义与实现 | IDL 定义、业务逻辑 |
| **协议层（Protocol）** | RPC 报文格式和数据编码格式 | PB、Thrift Binary/Compact |
| **传输层（Transport）** | 实现底层通信（如 socket） | TCP、HTTP/2 |

应用程序通信性能排序：IPC < TCP < HTTP < SOAP

### 1.3 RPC 核心技术体系

一个完整的 RPC 框架需要解决以下核心问题：

#### 1.3.1 传输（Transport）

TCP 协议是 RPC 的基石。关键特性：**面向连接、全双工、可靠传输（按序/不重/不丢/容错）、流量控制（滑动窗口）**。

RPC 传输的 message 是 TCP body 中的数据，采用嵌套的 header + body（payload）结构。

#### 1.3.2 I/O 模型

高性能 RPC 需要满足：服务端尽可能多地处理并发请求，同时尽可能短地处理完毕。

四种 I/O 模型：

| 模型 | 特点 | 适用场景 |
|------|------|----------|
| **阻塞 I/O（BIO）** | 线程被 I/O 阻塞，CPU 空闲 | 低并发 |
| **非阻塞 I/O（NIO）** | 轮询检查 I/O 状态 | 中等并发 |
| **I/O 多路复用** | 一个线程监听多个 Socket（epoll/kqueue） | 高并发，工业界主流 |
| **异步 I/O（AIO）** | 内核完成 I/O 后回调通知 | Windows IOCP |

**I/O 多路复用 → Reactor 模式**：epoll + 事件驱动，通过分治手段把网络连接、编码等工作交给专门线程池。Redis、Nginx、Node.js、Netty 均采用此模式。

**异步 I/O → Proactor 模式**：在 Windows 上大放异彩（IOCP）。

#### 1.3.3 线程模型

Thrift 提供的多种 Server 模型是很好的参考：

- `TSimpleServer`：单线程阻塞 I/O
- `TThreadPoolServer`：线程池阻塞 I/O
- `TNonblockingServer`：单线程非阻塞 I/O
- `THsHaServer`：单线程非阻塞 I/O + 工作线程池
- `TThreadedSelectorServer`：多线程非阻塞 I/O + 工作线程池

#### 1.3.4 协议结构（Wire Protocol）

TCP 是 binary stream 通道，应用层需要解决 **TCP 粘包和半包** 问题。三种常见方式：

1. **分隔符/换行符**：如 memcache 使用 `\r\n`
2. **固定长度 header + payload**：RPC 最常用，header 中包含 body length
3. **特殊标记**：如 HTTP 的 Content-Length

#### 1.3.5 可靠性

- 长连接心跳保活
- 网络闪断重连、重传
- 连接超时控制
- Netty 等框架封装了这些复杂性

---

## 二、序列化协议

### 2.1 评估维度

| 维度 | 说明 |
|------|------|
| **编码格式** | 文本（human readable）vs 二进制（binary） |
| **Schema 声明** | 基于 IDL（PB/Thrift）vs 自描述（JSON/XML） |
| **语言中立性** | 跨语言支持程度 |
| **兼容性** | 新老契约的前向/后向兼容 |
| **压缩契合度** | 与 gzip/snappy 等压缩算法的配合 |
| **性能** | 序列化/反序列化时间 + 序列化后数据大小 |

### 2.2 主流序列化方案对比

| 方案 | 编码 | Schema | 跨语言 | 性能 |
|------|------|--------|--------|------|
| **Protocol Buffers** | 二进制 | IDL（.proto） | ✅ 优秀 | ⭐⭐⭐⭐⭐ 业界最高之一 |
| **Thrift** | 二进制（Binary/Compact） | IDL（.thrift） | ✅ 优秀 | ⭐⭐⭐⭐⭐ |
| **Avro** | 二进制 | JSON Schema | ✅ | ⭐⭐⭐⭐ |
| **Hessian** | 二进制 | 自描述 | ✅ | ⭐⭐⭐ |
| **Kryo** | 二进制 | 无 | ❌ Java only | ⭐⭐⭐⭐ |
| **FST** | 二进制 | 无 | ❌ Java only | ⭐⭐⭐⭐ |
| **JSON** | 文本 | 自描述 | ✅ | ⭐⭐ |
| **XML** | 文本 | XSD | ✅ | ⭐ |
| **Java Native** | 二进制 | 无 | ❌ | ⭐ |

### 2.3 Protocol Buffers 为何高效

- 使用字段序号作为标识（而非包名类名），极其紧凑
- 使用 varint 和 zigzag 对整型做特殊编码
- 同一个 Person 对象：PB 序列化仅 33 字节，远小于 JSON/XML

### 2.4 通信协议演进历史

1. **第一轮**：HTTP → 带来 Internet 与电子商务
2. **第二轮**：Java RMI → 跨平台但仅限 Java
3. **第三轮**：XML → 标准数据封装，SOAP/WebService
4. **第四轮**：高性能二进制 RPC → Hessian、Thrift、PB、gRPC

---

## 三、常见 RPC 框架对比

### 3.1 框架分类

**服务治理型**（内置注册中心、监控、负载均衡）：
- Dubbo / Dubbox / Motan

**多语言型**（侧重跨语言通信）：
- gRPC / Thrift / Avro

### 3.2 详细对比

| 特性 | Dubbo/Dubbox | Motan | gRPC | Thrift |
|------|-------------|-------|------|--------|
| **开发方** | 阿里/当当 | 新浪微博 | Google | Facebook/Apache |
| **语言支持** | Java 为主（可集成 Thrift） | Java 为主 | 多语言 | 多语言 |
| **序列化** | Hessian2/Kryo/FST/Thrift | Hessian2 | Protocol Buffers | Thrift Binary/Compact |
| **传输协议** | TCP（Netty） | TCP（Netty） | HTTP/2 | TCP |
| **服务治理** | ✅ 完善（ZK 注册中心、监控） | ✅ 完善 | ❌ 需自建 | ❌ 需自建 |
| **服务发现** | ZooKeeper | ZooKeeper/Consul | 需自建 | 需自建 |
| **负载均衡** | 多种策略 | 多种策略 | 客户端 | 需自建 |
| **REST 支持** | ✅ Dubbox 支持 | ❌ | ✅ gRPC-Gateway | ❌ |
| **IDL** | 可选 | 无 | .proto 必须 | .thrift 必须 |
| **社区活跃度** | Dubbo 已重启维护 | 一般 | 非常活跃 | 活跃 |

### 3.3 性能测试数据（10 万次调用）

| 框架/协议 | 平均 TPS | 备注 |
|-----------|---------|------|
| **Dubbox + Thrift** | ~7,500 | 性能最优 |
| **Motan** | ~2,500 | |
| **Dubbox + FST** | ~2,200 | |
| **gRPC** | ~1,900 | HTTP/2 开销 |
| **Dubbox + Kryo** | ~1,900 | |

> 测试环境：JDK7, Win7 64bit, 简单 Person 对象列表返回

### 3.4 RPC 性能三要素

1. **I/O 模型**：非阻塞 I/O（Netty）
2. **序列化方式**：二进制协议（PB/Thrift Compact）
3. **线程调度模型**：Reactor 模式

高性能推荐组合：**异步非阻塞 I/O（Netty）+ 二进制序列化（Thrift/PB）+ Reactor 线程模型**

---

## 四、选型建议

### 4.1 选型决策树

```
需要跨语言？
├── 是 → 需要 HTTP/2 + 流式？
│       ├── 是 → gRPC
│       └── 否 → 极致性能？
│               ├── 是 → Thrift
│               └── 否 → gRPC（生态更好）
└── 否 → Java 生态
        ├── 需要完善服务治理？ → Dubbox（集成 Thrift 协议可兼顾性能）
        └── 轻量级？ → Motan
```

### 4.2 场景化建议

| 场景 | 推荐方案 | 理由 |
|------|---------|------|
| **企业内部 Java 微服务** | Dubbox | 服务治理完善，可集成多种序列化协议 |
| **跨语言微服务** | gRPC | HTTP/2 友好，PB 高效，生态活跃 |
| **极致性能（大规模内部通信）** | Thrift | 序列化性能最优，TNonblockingServer 高效 |
| **已有 Dubbo 体系** | Dubbox 升级 | 平滑迁移，增加 REST + 多协议支持 |
| **新项目、云原生** | gRPC | 与 K8s/Istio 等云原生生态契合 |

### 4.3 关键原则

1. **接口先行，语言中立**：服务提供者和消费者解耦，并行开发
2. **契约驱动开发**：基于 IDL 定义接口，Mock 测试桩并行验证
3. **API 版本兼容性优先**：使用 Thrift IDL / PB 的字段编号机制保证前向兼容
4. **循序渐进**：微服务拆分粒度不必一步到位，随业务演进逐步细化
5. **综合考量**：不仅看性能，还要看团队熟悉度、社区活跃度、运维成本
