export interface Tutorial {
  slug: string;
  tag: string;
  title: string;
  description: string;
  meta: string;
}

export const tutorials: Tutorial[] = [
  {
    slug: 'backend-fundamentals',
    tag: '🏗️ 后端基础',
    title: '后端基础知识全景总结',
    description:
      '网络协议、数据库事务、操作系统——后端工程师三大支柱一网打尽。覆盖 TCP/UDP、ACID、隔离级别、进程线程、虚拟内存、I/O 多路复用、RAID，含交互式知识测验。',
    meta: '基于编程起跑线笔记 · 2026-04',
  },
  {
    slug: 'consistent-hash',
    tag: '🌐 分布式',
    title: '一致性哈希算法',
    description:
      '从取模到哈希环，理解分布式系统负载均衡的首选算法。覆盖哈希环原理、虚拟节点、节点增删影响，含交互式哈希环可视化与分布统计。',
    meta: '基于峰云就她了博客 · 2026-03',
  },
  {
    slug: 'simhash',
    tag: '🔍 相似度算法',
    title: 'SimHash 与 MinHash 文档去重',
    description:
      '海量文档的近似查重：SimHash 指纹识别与 MinHash 集合相似度。覆盖局部敏感哈希、海明距离、分块索引、Jaccard 系数，含交互式 SimHash 计算演示。',
    meta: '基于多篇技术文章 · 2026-03',
  },
  {
    slug: 'lru-cache',
    tag: '🗄️ 缓存',
    title: 'LRU Cache 设计实现',
    description:
      '双向链表 + 哈希表，O(1) 实现最近最少使用缓存。覆盖数据结构设计、get/put 操作图解、淘汰机制、完整 Python 代码、交互式可视化。',
    meta: '基于 LeetCode 146 · 2026-03',
  },
  {
    slug: 'microgpt',
    tag: '🧠 Deep Learning',
    title: 'MicroGPT 交互式教程',
    description:
      '用 ~200 行纯 Python 从零实现 GPT 的完整训练与推理。包含 6 个交互演示、5 张架构图，覆盖 Autograd、Transformer、Adam 等核心概念。',
    meta: '基于 Andrej Karpathy 的代码 · 2026-03',
  },
  {
    slug: 'go-mutex',
    tag: '🔒 Concurrency',
    title: 'Go Mutex 从零实现',
    description:
      '从自旋锁到 Futex，一步步理解互斥锁的实现原理。包含数据竞争可视化、原子操作图解、三状态机、性能对比图表。',
    meta: '基于 Chris Rybicki 的博客 · 2026-03',
  },
  {
    slug: 'btree-concurrency',
    tag: '🗄️ Database',
    title: 'B+树并发控制的前世今生',
    description:
      '从粗粒度锁到 Lock-Free，40 年并发优化之路。覆盖 MySQL 5.6/5.7、SX 锁、Blink 树、OLFIT 版本号、缓存一致性等核心概念。',
    meta: '基于 POLARDB 内核团队文章 · 2026-03',
  },
  {
    slug: 'rbtree',
    tag: '🌲 Data Structure',
    title: '红黑树图解教程',
    description:
      '从二叉查找树到红黑树，用 SVG 图解理解自平衡的奥秘。覆盖 5 条规则、旋转操作、插入修复 3 种情况、删除修复 4 种情况。',
    meta: '综合多篇文章 · 2026-03',
  },
  {
    slug: 'avl-tree',
    tag: '🌲 Data Structure',
    title: 'AVL 树图解教程',
    description:
      '最早的自平衡 BST，严格平衡查找最快。覆盖平衡因子、四种旋转（LL/LR/RR/RL）、插入删除平衡、AVL vs 红黑树对比。',
    meta: '综合多篇文章 · 2026-03',
  },
  {
    slug: 'btree',
    tag: '🗄️ Database',
    title: 'B树、B+树与B*树图解',
    description:
      '为磁盘而生的多路平衡搜索树。覆盖磁盘 IO 原理、B 树性质、B+ 树索引优势、B* 树空间优化、三者对比。',
    meta: '综合多篇文章 · 2026-03',
  },
  {
    slug: 'trie',
    tag: '🌲 Data Structure',
    title: 'Trie 树图解教程',
    description:
      '前缀树 / 字典树，字符串检索利器。覆盖基本操作、交互式演示、敏感词过滤、IP 地址查询、双数组 Trie 压缩。',
    meta: '综合多篇文章 · 2026-03',
  },
  {
    slug: 'segment-tree',
    tag: '🌲 Data Structure',
    title: '线段树图解教程',
    description:
      '区间查询与修改的终极武器。覆盖建树、区间查询、单点更新、懒传播、交互式可视化、经典应用与方案对比。',
    meta: '综合多篇文章 · 2026-03',
  },
  {
    slug: 'radix-tree',
    tag: '🌲 Data Structure',
    title: 'Radix Tree 图解教程',
    description:
      '压缩前缀树，用更少节点存更多字符串。覆盖压缩原理、节点分裂、交互式可视化、Linux 内核页缓存、HTTP 路由、ART。',
    meta: '综合多篇文章 · 2026-03',
  },
  {
    slug: 'binary-tree',
    tag: '🌲 Data Structure',
    title: '二叉树面试题图解',
    description:
      '22 道经典面试题，递归思维一网打尽。覆盖四种遍历、深度计算、结构判断、LCA、BST 验证、卡特兰数、解题模式总结。',
    meta: '综合多篇文章 · 2026-03',
  },
  {
    slug: 'sorting',
    tag: '🔢 Algorithm',
    title: '排序算法图解大全',
    description:
      '十大排序算法从原理到可视化。覆盖冒泡、选择、插入、希尔、归并、快排、堆排序、计数、基数、桶排序，含交互演示与全面对比。',
    meta: '综合多篇文章 · 2026-03',
  },
  {
    slug: 'bloom-filter',
    tag: '🔍 Algorithm',
    title: '布隆过滤器图解教程',
    description:
      '用极少内存判断元素是否存在。覆盖原理、误判率分析、交互式可视化、Cuckoo Filter 对比、Redis/Chrome/HBase 实际应用。',
    meta: '综合多篇文章 · 2026-03',
  },
  {
    slug: 'dp',
    tag: '📊 Algorithm',
    title: '动态规划图解教程',
    description:
      '从零理解 DP 的核心思想。覆盖斐波那契、零钱兑换、0/1 背包、LCS、最长回文子串，含交互式 DP 表填充可视化与模式总结。',
    meta: '综合多篇文章 · 2026-03',
  },
  {
    slug: 'skip-list',
    tag: '🔍 Data Structure',
    title: '跳表图解教程',
    description:
      '链表也能二分查找，平衡树的优雅替代。覆盖多层结构、随机层高、交互式可视化、跳表 vs 红黑树、Redis 为何选跳表。',
    meta: '综合多篇文章 · 2026-03',
  },
  {
    slug: 'linked-list',
    tag: '🔗 Data Structure',
    title: '链表经典题图解',
    description:
      '链表反转、环检测、合并排序，指针操作一网打尽。覆盖迭代/递归反转、Floyd 快慢指针、归并排序链表，含交互式可视化。',
    meta: '综合多篇文章 · 2026-03',
  },
  {
    slug: 'binary-search',
    tag: '🔍 Algorithm',
    title: '二分法图解教程',
    description:
      '二分查找的 N 种变体。覆盖基础二分、第一个/最后一个位置、旋转数组、峰值元素、二维矩阵搜索，含交互式可视化。',
    meta: '综合多篇文章 · 2026-03',
  },
  {
    slug: 'top-k',
    tag: '🔍 Algorithm',
    title: 'Top K 问题图解',
    description:
      '海量数据找最大 K 个元素。覆盖小顶堆法、Quick Select 快速选择、复杂度对比、热搜排行榜实战。',
    meta: '综合多篇文章 · 2026-03',
  },
  {
    slug: 'stack-queue',
    tag: '📦 Data Structure',
    title: '栈和队列图解教程',
    description:
      'LIFO 与 FIFO 的经典应用。覆盖括号匹配、单调栈、最小栈、两栈实现队列，含交互式可视化。',
    meta: '综合多篇文章 · 2026-03',
  },
  {
    slug: 'external-sort',
    tag: '📊 大数据',
    title: '磁盘多路归并排序',
    description:
      '海量数据排序经典方案。覆盖归并段生成、K 路归并、最小堆优先队列、I/O 缓冲优化、败者树对比，含交互式可视化。',
    meta: '基于老钱的文章 · 2026-03',
  },
  {
    slug: 'tcp-handshake',
    tag: '🌐 网络协议',
    title: 'TCP 三次握手详解',
    description:
      '为什么建立连接需要"三次握手"？Seq和Ack机制如何工作？通过动画和图解理解TCP可靠传输的起点。',
    meta: '综合多篇文章 · 2026-04',
  },
  {
    slug: 'tcp-wave',
    tag: '🌐 网络协议',
    title: 'TCP 四次挥手详解',
    description:
      '为什么关闭连接需要"四次挥手"？TIME_WAIT状态有什么用？通过动画理解TCP连接的安全关闭。',
    meta: '综合多篇文章 · 2026-04',
  },
  {
    slug: 'tcp-window',
    tag: '🌐 网络协议',
    title: 'TCP 滑动窗口与可靠传输',
    description:
      '滑动窗口如何实现流量控制？累计确认和选择重传如何保证可靠性？通过交互式动画深入理解。',
    meta: '综合多篇文章 · 2026-04',
  },
  {
    slug: 'http',
    tag: '🌐 Web',
    title: 'HTTP 协议详解',
    description:
      '从请求响应格式到方法、状态码、头信息，通过交互式演示深入理解Web的基石协议。',
    meta: '综合多篇文章 · 2026-04',
  },
  {
    slug: 'dns',
    tag: '🌐 网络协议',
    title: 'DNS 域名系统详解',
    description:
      '从域名到IP地址的翻译过程：递归查询、迭代查询、DNS记录类型、缓存机制一网打尽。',
    meta: '综合多篇文章 · 2026-04',
  },
  {
    slug: 'url-to-page',
    tag: '🌐 Web',
    title: '从输入URL到页面显示',
    description:
      '浏览器地址栏输入URL后发生了什么？DNS→TCP→TLS→HTTP→渲染，完整流程一网打尽。',
    meta: '综合多篇文章 · 2026-04',
  },
  {
    slug: 'switch-router',
    tag: '🌐 网络协议',
    title: '交换机与路由器区别详解',
    description:
      '一文读懂网络设备的核心差异：MAC地址 vs IP地址，二层 vs 三层，三层交换机 vs 路由器。',
    meta: '综合多篇文章 · 2026-04',
  },
  {
    slug: 'tcp-nagle',
    tag: '🔗 网络协议',
    title: 'TCP Nagle算法与Delay Ack',
    description:
      '经典性能问题：300KB数据延迟300ms的根因。Nagle算法和Delay Ack的相爱相伤，解决方案TCP_NODELAY。',
    meta: '基于阿里技术文章 · 2026-04',
  },
  {
    slug: 'tcp-interview',
    tag: '🎯 面试必备',
    title: 'TCP 面试15问',
    description:
      '15个经典TCP面试题：ACK确认、半打开状态、RST异常关闭、MSS/MTU、2MSL等待，面试常考。',
    meta: '基于简书文章 · 2026-04',
  },
  {
    slug: 'randomized-bst',
    tag: '🌲 树结构',
    title: '随机化搜索树 (Treap)',
    description:
      '结合二叉搜索树与堆的特性，通过随机优先级实现自平衡。覆盖Treap原理、插入删除旋转、交互式演示，与AVL/红黑树对比。',
    meta: '基于 Martinez & Roura (1997) · 2026-03',
  },
  {
    slug: 'osi-model',
    tag: '🌐 网络协议',
    title: '网络协议模型：七层、五层、四层',
    description:
      '详解OSI七层模型、TCP/IP五层模型和四层模型的概念、功能及各层协议，数据封装与解封装过程，含交互式层点击查看。',
    meta: '基于 CSDN 技术文章 · 2026-04',
  },
  {
    slug: 'http-idempotent',
    tag: '🌐 Web',
    title: 'HTTP幂等性概念与应用',
    description:
      '详解HTTP幂等性概念，分布式事务vs幂等设计，GET/POST/PUT/DELETE的幂等性分析，及实际应用场景。含交互式判断练习。',
    meta: '基于酷壳 CoolShell · 2026-04',
  },
  {
    slug: 'tcp-fsm',
    tag: '🌐 网络协议',
    title: 'TCP状态机与重传机制',
    description:
      '深入理解TCP状态机、三次握手四次挥手、SYN超时、TIME_WAIT、超时重传与快速重传机制。含交互式握手过程模拟。',
    meta: '基于程序猿说你好/酷壳 · 2026-04',
  },
  {
    slug: 'http-server',
    tag: '🌐 Web',
    title: 'Http Server 的演进：从单进程到epoll',
    description:
      '用故事理解Http Server的演进：从单进程阻塞到多进程、select模型，再到epoll，理解高并发网络编程的核心思想。',
    meta: '基于码农翻身 · 2026-04',
  },
  {
    slug: 'http-interview',
    tag: '🌐 Web',
    title: 'HTTP 协议详解',
    description:
      '全面理解HTTP协议：请求响应模型、8种请求方法、状态码、请求/响应头、内容协商、缓存机制，面试常考知识点一网打尽。',
    meta: '基于 SegmentFault · 2026-04',
  },
  {
    slug: 'load-average',
    tag: '🔧 系统运维',
    title: '一分钟理解负载 Load Average',
    description:
      '用马路和汽车的比喻，一分钟理解Linux系统负载Load Average的含义、查看方法和不同数值的意义。',
    meta: '基于架构师之路 · 2026-04',
  },
  {
    slug: 'tcpdump',
    tag: '🔧 网络调试',
    title: 'iOS/Android 网络抓包教程：tcpdump',
    description:
      '移动端网络抓包实战：iOS 使用 rvictl 创建虚拟网卡，Android 通过 adb 上传 tcpdump。详解 TCP Flags、Seq/Ack、RTT 计算。',
    meta: '基于 MrPeak 技术分享 · 2026-04',
  },
  {
    slug: 'wsgi',
    tag: '🐍 Python',
    title: 'WSGI 接口详解',
    description:
      'WSGI（Web Server Gateway Interface）详解：从 Web 应用本质到三层架构，从 Hello World 到 Flask 框架原理，含交互式 WSGI 服务器模拟。',
    meta: '基于廖雪峰/Flask 源码 · 2026-04',
  },
  {
    slug: 'flask-source',
    tag: '🐍 Python',
    title: 'Flask 0.1 源代码分析',
    description:
      'Flask 0.1 源代码分析：从 WSGI 接口到路由系统，理解 Flask 框架如何工作，不到 700 行代码的 Web 框架设计精髓。',
    meta: '基于 Flask 源码分析 · 2026-04',
  },
  {
    slug: 'java-memory-model',
    tag: '☕ Java',
    title: 'Java 内存模型（JMM）详解',
    description:
      '从 CPU 缓存一致性到并发编程问题，深入理解 Java 内存模型。volatile、synchronized、final 如何实现原子性、可见性、有序性。',
    meta: '基于 HollisChuang 博客 · 2026-04',
  },
  {
    slug: 'jvm-offheap',
    tag: '☕ Java',
    title: 'JVM 堆外内存回收机制',
    description:
      'JVM 堆外内存的申请、释放与回收机制：DirectByteBuffer、Cleaner 链表、System.gc() 触发条件，以及 -XX:+DisableExplicitGC 的坑。',
    meta: '基于程序员小灰/占小狼 · 2026-04',
  },
  {
    slug: 'python-concurrency',
    tag: '🐍 Python',
    title: 'Python 并发编程：进程篇',
    description:
      'GIL 问题与多进程解决方案：multiprocessing、进程池 Pool、进程间通信。对比单进程/多线程/多进程的性能差异。',
    meta: '基于 Python 之美 · 2026-04',
  },
  {
    slug: 'web-scraping',
    tag: '🐍 Python',
    title: '高效 Web 爬虫 6 个技巧',
    description:
      'Python 高效 Web 爬虫开发 6 个技巧：Session 复用、连接池、并发请求、错误重试、代理轮换、数据流处理。',
    meta: '基于 Adnan\'s Random bytes · 2026-04',
  },
  {
    slug: 'python-requests',
    tag: '🐍 Python',
    title: 'Python requests 深入理解',
    description:
      'Python requests 库深度解析：Session 对象、PreparedRequest、流式上传/下载、连接复用、最佳实践。',
    meta: '基于 Anthony Shaw Medium · 2026-04',
  },
  {
    slug: 'python-web-perf',
    tag: '🐍 Python',
    title: 'Python Web 应用性能调优',
    description:
      'Python Web 应用性能调优指南：数据库查询优化、缓存策略、异步处理、连接池、内存管理、性能分析工具。',
    meta: '基于多篇技术文章综合 · 2026-04',
  },
  {
    slug: 'guava-cache',
    tag: '☕ Java',
    title: 'Guava Cache 源码分析',
    description:
      'Guava Cache 源码分析：LRU 策略、并发读写、过期机制、回收机制。深入理解本地缓存的设计与实现。',
    meta: '基于 Guava 源码 · 2026-04',
  },
  {
    slug: 'gunicorn-lru',
    tag: '🐍 Python',
    title: 'Gunicorn 与 LRU Cache 陷阱',
    description:
      'Gunicorn 多 worker 模式下 @lru_cache 的陷阱：每个 worker 独立缓存导致命中率低。分析原因并提供 Memcached/Redis 替代方案。',
    meta: '基于 Krzysztof Zuraw 博客 · 2026-04',
  },
  {
    slug: 'consistent-hash',
    tag: '🏗️ 分布式',
    title: '一致性 Hash 算法与 Python 实现',
    description:
      '一致性 Hash 算法详解：传统 Hash 的问题、Hash 环原理、虚拟节点、Python HashRing 完整实现。应用于 Memcached、Amazon Dynamo。',
    meta: '基于阿笨猫博客 · 2026-04',
  },
  {
    slug: 'python-exceptions',
    tag: '🐍 Python',
    title: 'Python 异常处理最佳实践',
    description:
      'Python 异常处理 6 种模式对比：Giant Try-Except、Fine-Grained、Nested、While True、User-Defined、Encapsulating Function。含优缺点分析和推荐方案。',
    meta: '基于 Naftali Harris 博客 · 2026-04',
  },
  {
    slug: 'python-mro',
    tag: '🐍 Python',
    title: 'Python MRO 方法解析顺序',
    description:
      'Python C3 线性化算法详解：单继承 vs 多继承、merge 算法逐步演示、经典类 vs 新式类、MRO 冲突示例。深入理解 Python 方法查找顺序。',
    meta: '基于 Michele Simionato · 2026-04',
  },
  {
    slug: 'python-super',
    tag: '🐍 Python',
    title: 'Python super() 深入理解',
    description:
      'Python super() 原理和最佳实践：super() 不是调用父类、多继承中的调用顺序、合作式继承、常见误区。',
    meta: '基于 Python 官方文档/技术博客 · 2026-04',
  },
  {
    slug: 'bplustree',
    tag: '🐍 Python',
    title: 'Python3 在磁盘上的 B+ 树',
    description:
      'B+ 树原理与磁盘存储实现：B+ 树结构、节点分裂合并、磁盘 vs 内存、Python 实现要点。数据库索引的核心数据结构。',
    meta: '基于 Bplustree 项目 · 2026-04',
  },
  {
    slug: 'pinyin-input',
    tag: '🐍 Python',
    title: '用 Python 实现中文拼音输入法',
    description:
      '中文拼音输入法原理与 Python 实现：拼音到汉字映射、Bigram 语言模型、Viterbi 候选排序、交互式拼音输入演示。',
    meta: '基于程序师 · 2026-04',
  },
  {
    slug: 'parser-compiler',
    tag: '🔧 编译原理',
    title: '编译器原理与 Parser 实战',
    description:
      '从 Regex 的局限引入编译器原理：词法分析、语法分析、AST、BNF 文法。实战用 Jison 写一个 Todo 文件 Parser，完整展示 Lexer → BNF → AST → Render 流程。',
    meta: '基于 BMPI.dev · 2026-04',
  },
  {
    slug: 'p2p-nat',
    tag: '🌐 网络协议',
    title: 'NAT 穿透与 P2P 通信',
    description:
      'NAT 穿透原理与实战：STUN/TURN 协议、4种 NAT 类型、PyPunchP2P 工作流程、TCP vs UDP 穿透区别。从零实现 P2P 聊天。',
    meta: '基于 laike9m 博客 · 2026-04',
  },
  {
    slug: 'domain-split',
    tag: '🏗️ 微服务',
    title: '微服务资源隔离之域名拆分',
    description:
      '微服务架构中的资源隔离实践：核心/非核心业务域名拆分、网关隔离、带宽管理策略、高可用保障。',
    meta: '基于技术转型之路 · 2026-04',
  },
  {
    slug: 'python-subprocess',
    tag: '🐍 Python',
    title: 'Python subprocess PIPE 使用指南',
    description:
      'Python subprocess 模块 PIPE 使用指南：管道通信、命令链式调用、输出捕获、常见陷阱与最佳实践。',
    meta: '基于技术博客 · 2026-04',
  },
  {
    slug: 'java-learning-path',
    tag: '☕ Java',
    title: 'Java 学习路线详解',
    description:
      'Java 完整学习路线图：从 HelloWorld 到 Spring 生态，OOP、集合、并发、JVM、框架，附学习资源推荐。',
    meta: '基于多篇技术文章综合 · 2026-04',
  },
];
