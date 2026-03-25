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
];
