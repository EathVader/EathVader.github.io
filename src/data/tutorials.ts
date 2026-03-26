export interface Tutorial {
  slug: string;
  tag: string;
  title: string;
  description: string;
  meta: string;
}

export const tutorials: Tutorial[] = [
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
];
