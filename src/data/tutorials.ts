export interface Tutorial {
  slug: string;
  tag: string;
  title: string;
  description: string;
  meta: string;
}

export const tutorials: Tutorial[] = [
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
    slug: 'randomized-bst',
    tag: '🌲 树结构',
    title: '随机化搜索树 (Treap)',
    description:
      '结合二叉搜索树与堆的特性，通过随机优先级实现自平衡。覆盖Treap原理、插入删除旋转、交互式演示，与AVL/红黑树对比。',
    meta: '基于 Martinez & Roura (1997) · 2026-03',
  },
];
