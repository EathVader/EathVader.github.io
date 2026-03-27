# EathVader.github.io 项目文档

## 📊 项目概述

| 项目 | 内容 |
|------|------|
| 名称 | EathVader's Lab - 交互式技术教程网站 |
| 技术栈 | Astro + 纯 HTML/CSS/JS |
| 部署 | GitHub Pages + GitHub Actions |
| 访问 | https://eathvader.github.io |
| 仓库 | https://github.com/EathVader/EathVader.github.io |
| 统计 | Cloudflare Web Analytics |
| 评论 | Giscus (GitHub Discussions) |

---

## 🏗️ 项目结构

```
EathVader.github.io/
├── astro.config.mjs
├── package.json
├── .gitignore                    # 忽略 AGENTS.md, CHAT_HISTORY.md, TUTORIAL_MAP.md, dist/, node_modules/
├── .github/workflows/deploy.yml  # CI/CD
├── src/
│   ├── data/tutorials.ts         # 教程数据（主页卡片自动生成）
│   ├── layouts/Base.astro        # 公共布局
│   ├── pages/index.astro         # 主页
│   └── styles/global.css
└── public/
    ├── common.js                 # 公共工具（哈希/二分/防抖）
    ├── syntax-highlight.js       # Prism.js 语法高亮
    ├── a11y.js                   # 可访问性增强
    ├── microgpt/                 # MicroGPT 交互式教程
    ├── go-mutex/                 # Go Mutex 从零实现
    ├── btree-concurrency/        # B+树并发控制
    ├── rbtree/                   # 红黑树
    ├── avl-tree/                 # AVL 树
    ├── btree/                    # B树/B+树
    ├── trie/                     # Trie 树
    ├── segment-tree/             # 线段树
    ├── binary-tree/              # 二叉树面试题
    ├── sorting/                  # 排序算法大全
    ├── heap-sort/                # 堆与堆排序
    ├── linked-list-sort/         # 链表排序
    ├── disk-merge-sort/          # 磁盘多路归并
    ├── dp/                       # 动态规划入门
    ├── knapsack/                 # 背包问题
    ├── lcs/                      # 最长公共子序列
    ├── longest-palindrome/       # 最长回文子串
    ├── bloom-filter/             # Bloom Filter
    ├── cuckoo-filter/            # Cuckoo Filter
    ├── skip-list/                # Skip List
    ├── binary-search/            # 二分法
    ├── top-k/                    # Top K 问题
    ├── linked-list/              # 链表反转
    └── stack-queue/               # 栈和队列
```

---

## 📋 关键文件位置

| 功能 | 文件路径 |
|------|----------|
| 教程列表 | `src/data/tutorials.ts` |
| 公共布局 | `src/layouts/Base.astro` |
| 主页 | `src/pages/index.astro` |
| 全局样式 | `src/styles/global.css` |
| Astro 配置 | `astro.config.mjs` |
| CI/CD | `.github/workflows/deploy.yml` |

---

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

---

## 📚 教程进度总览

### 已完成 (22个)

| 分类 | 教程 |
|------|------|
| 🌲 树结构 (7) | 红黑树、AVL、B树、Trie、线段树、Radix Tree、二叉树面试题 |
| 🔢 排序 (4) | 排序算法大全、堆与堆排序、链表排序、磁盘多路归并 |
| 📐 动态规划 (4) | 动态规划入门、背包问题、最长公共子序列、最长回文子串 |
| 🔍 查找与过滤 (5) | Bloom Filter、Cuckoo Filter、Skip List、二分法、Top K |
| 🔗 链表 (1) | 链表反转 |
| 📦 栈队列 (1) | 栈和队列 |
| 🧠 深度学习 (1) | MicroGPT |
| 🔒 并发 (1) | Go Mutex |
| 🗄️ 数据库 (1) | B+树并发 |

---

## ✅ 已完成改进清单

### P0 - 高优先级 ✅
| 任务 | 说明 |
|------|------|
| top-k 交互演示 | Quick Select 可视化 |
| go-mutex 交互演示 | 线程竞争锁动画 |
| btree-concurrency 交互演示 | 锁模式可视化 |
| bloom-filter 交互演示 | 误判率计算器 |
| meta description | 22个教程全部添加 |
| Open Graph 标签 | 22个教程全部添加 |
| JSON-LD 结构化数据 | 22个教程全部添加 |

### P1 - 中优先级 ✅
| 任务 | 说明 |
|------|------|
| 公共JS模块 | `public/common.js` |
| 语法高亮 | `public/syntax-highlight.js` |

### P2 - 低优先级 ✅
| 任务 | 说明 |
|------|------|
| skip-link 导航 | `Base.astro` + `a11y.js` |
| focus 状态样式 | 22个教程全部添加 |
| JS 按需加载 | 语法高亮模块支持按需加载 |

---

## 📝 添加新教程流程

1. `mkdir public/new-topic/`
2. 编写 `index.html` + `styles.css`（可复用现有样式）
3. `</body>` 前添加:
   - giscus 评论脚本
   - Cloudflare Analytics 脚本
   - `</body>` 前添加 skip-link 和 a11y.js
4. `src/data/tutorials.ts` 添加一条记录
5. `git push` → 自动部署

---

## 🔗 相关链接

- 仓库: https://github.com/EathVader/EathVader.github.io
- 演示: https://eathvader.github.io
- 问题反馈: https://github.com/EathVader/EathVader.github.io/issues

---

## 📋 待完成（未来工作）

1. **og:image** - 需要为每个教程制作分享图片
2. **骨架屏** - 首屏加载优化
3. **单元测试** - 交互演示的测试覆盖
4. **Jump Consistent Hash** - 尚未制作
5. **Randomized BST** - 尚未制作

---

*最后更新: 2026-03-27*
