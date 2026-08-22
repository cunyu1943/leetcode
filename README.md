# VitePress 个人站点模板

基于 [VitePress](https://vitepress.dev/) 构建的个人站点模板，集成了丰富的社区插件与自定义主题样式，开箱即用。

## 功能特性

- **全文搜索** — 基于 [pagefind](https://pagefind.app/) 的离线全文搜索
- **RSS 订阅** — 通过 `vitepress-plugin-rss` 自动生成 RSS
- **Git 变更日志** — 基于 `@nolebase/vitepress-plugin-git-changelog` 自动记录页面修改历史
- **公告弹窗** — 自定义公告组件，支持文本、图片、按钮，5 秒自动关闭
- **打赏功能** — 集成 `vitepress-plugin-sponsor`，支持支付宝/微信二维码
- **站点统计** — 基于 [不蒜子](https://busuanzi.pure.js.org/) 的访问量与访客数统计
- **文章元信息** — 自动显示更新日期、字数统计、预估阅读时长
- **代码组图标** — `vitepress-plugin-group-icons` 为代码块添加语言图标
- **自定义样式** — 引用块、代码块、侧边栏图标、模糊隐藏、标记高亮等多套自定义样式
- **霞鹜文楷字体** — 全站使用 LXGW WenKai GB Screen R 字体
- **Hero 下划线动画** — 首页标题带 SVG 下划线装饰
- **暗色主题** — 默认启用深色模式
- **GitHub Pages 自动部署** — 配置了 GitHub Actions 工作流，推送到 `main` 分支自动构建部署

## 项目结构

```
.
├── .github/
│   └── workflows/
│       └── auto-deploy.yml       # GitHub Actions 自动部署
├── docs/
│   ├── .vitepress/
│   │   ├── configs/
│   │   │   ├── nav.ts            # 导航栏配置
│   │   │   └── sidebar.ts        # 侧边栏配置
│   │   ├── theme/
│   │   │   ├── components/
│   │   │   │   ├── ArticleMetadata.vue  # 文章元信息（字数/阅读时长）
│   │   │   │   ├── DataPanel.vue        # 站点访问量统计面板
│   │   │   │   ├── HomeUnderline.vue    # 首页标题下划线装饰
│   │   │   │   └── notice.vue           # 公告弹窗组件
│   │   │   ├── style/
│   │   │   │   ├── var.css              # CSS 变量与字体
│   │   │   │   ├── index.css            # 样式入口
│   │   │   │   ├── blockquote.css       # 引用块样式
│   │   │   │   ├── blur.css             # 模糊隐藏样式
│   │   │   │   ├── hidden.css           # 隐藏样式
│   │   │   │   ├── marker.css           # 标记高亮样式
│   │   │   │   ├── sidebarIcon.css      # 侧边栏图标样式
│   │   │   │   ├── vp-code.css          # 代码块样式
│   │   │   │   ├── vp-code-group.css    # 代码组样式
│   │   │   │   └── vp-code-title.css    # 代码标题样式
│   │   │   ├── untils/
│   │   │   │   └── functions.ts         # 工具函数（字数统计）
│   │   │   └── index.ts                 # 主题入口
│   │   └── config.mts                   # VitePress 站点配置
│   └── src/
│       ├── public/
│       │   ├── imgs/                    # 图片资源
│       │   └── svg/                     # SVG 图标
│       ├── index.md                     # 首页
│       ├── api-examples.md             # API 示例页
│       ├── markdown-examples.md        # Markdown 扩展示例页
│       └── leetcode/                    # LeetCode 题解（1-50）
├── package.json
├── pnpm-lock.yaml
└── LICENSE                             # CC BY 4.0
```

## LeetCode 题解

本仓库整理了 LeetCode 高频题解，每道题均提供 **Java / Python / Go / C / C++ / JavaScript / TypeScript** 多语言实现，并附带复杂度分析与解法对比。

### 已收录题目（1 - 100）

| 题号 | 题目 | 题号 | 题目 |
|------|------|------|------|
| 1 | [两数之和](docs/src/leetcode/1-two-sum.md) | 51 | [N 皇后](docs/src/leetcode/51-n-queens.md) |
| 2 | [两数相加](docs/src/leetcode/2-add-two-numbers.md) | 52 | [N 皇后 II](docs/src/leetcode/52-n-queens-ii.md) |
| 3 | [无重复字符的最长子串](docs/src/leetcode/3-longest-substring-without-repeating-characters.md) | 53 | [最大子数组和](docs/src/leetcode/53-maximum-subarray.md) |
| 4 | [寻找两个正序数组的中位数](docs/src/leetcode/4-median-of-two-sorted-arrays.md) | 54 | [螺旋矩阵](docs/src/leetcode/54-spiral-matrix.md) |
| 5 | [最长回文子串](docs/src/leetcode/5-longest-palindromic-substring.md) | 55 | [跳跃游戏](docs/src/leetcode/55-jump-game.md) |
| 6 | [Z 字形变换](docs/src/leetcode/6-zigzag-conversion.md) | 56 | [合并区间](docs/src/leetcode/56-merge-intervals.md) |
| 7 | [整数反转](docs/src/leetcode/7-reverse-integer.md) | 57 | [插入区间](docs/src/leetcode/57-insert-interval.md) |
| 8 | [字符串转换整数 (atoi)](docs/src/leetcode/8-string-to-integer-atoi.md) | 58 | [最后一个单词的长度](docs/src/leetcode/58-length-of-last-word.md) |
| 9 | [回文数](docs/src/leetcode/9-palindrome-number.md) | 59 | [螺旋矩阵 II](docs/src/leetcode/59-spiral-matrix-ii.md) |
| 10 | [正则表达式匹配](docs/src/leetcode/10-regular-expression-matching.md) | 60 | [排列序列](docs/src/leetcode/60-permutation-sequence.md) |
| 11 | [盛最多水的容器](docs/src/leetcode/11-container-with-most-water.md) | 61 | [旋转链表](docs/src/leetcode/61-rotate-list.md) |
| 12 | [整数转罗马数字](docs/src/leetcode/12-integer-to-roman.md) | 62 | [不同路径](docs/src/leetcode/62-unique-paths.md) |
| 13 | [罗马数字转整数](docs/src/leetcode/13-roman-to-integer.md) | 63 | [不同路径 II](docs/src/leetcode/63-unique-paths-ii.md) |
| 14 | [最长公共前缀](docs/src/leetcode/14-longest-common-prefix.md) | 64 | [最小路径和](docs/src/leetcode/64-minimum-path-sum.md) |
| 15 | [三数之和](docs/src/leetcode/15-3sum.md) | 65 | [有效数字](docs/src/leetcode/65-valid-number.md) |
| 16 | [最接近的三数之和](docs/src/leetcode/16-3sum-closest.md) | 66 | [加一](docs/src/leetcode/66-plus-one.md) |
| 17 | [电话号码的字母组合](docs/src/leetcode/17-letter-combinations-of-a-phone-number.md) | 67 | [二进制求和](docs/src/leetcode/67-add-binary.md) |
| 18 | [四数之和](docs/src/leetcode/18-4sum.md) | 68 | [文本左右对齐](docs/src/leetcode/68-text-justification.md) |
| 19 | [删除链表的倒数第 N 个结点](docs/src/leetcode/19-remove-nth-node-from-end-of-list.md) | 69 | [x 的平方根](docs/src/leetcode/69-sqrtx.md) |
| 20 | [有效的括号](docs/src/leetcode/20-valid-parentheses.md) | 70 | [爬楼梯](docs/src/leetcode/70-climbing-stairs.md) |
| 21 | [合并两个有序链表](docs/src/leetcode/21-merge-two-sorted-lists.md) | 71 | [简化路径](docs/src/leetcode/71-simplify-path.md) |
| 22 | [括号生成](docs/src/leetcode/22-generate-parentheses.md) | 72 | [编辑距离](docs/src/leetcode/72-edit-distance.md) |
| 23 | [合并 K 个升序链表](docs/src/leetcode/23-merge-k-sorted-lists.md) | 73 | [矩阵置零](docs/src/leetcode/73-set-matrix-zeroes.md) |
| 24 | [两两交换链表中的节点](docs/src/leetcode/24-swap-nodes-in-pairs.md) | 74 | [搜索二维矩阵](docs/src/leetcode/74-search-a-2d-matrix.md) |
| 25 | [K 个一组翻转链表](docs/src/leetcode/25-reverse-nodes-in-k-group.md) | 75 | [颜色分类](docs/src/leetcode/75-sort-colors.md) |
| 26 | [删除有序数组中的重复项](docs/src/leetcode/26-remove-duplicates-from-sorted-array.md) | 76 | [最小覆盖子串](docs/src/leetcode/76-minimum-window-substring.md) |
| 27 | [移除元素](docs/src/leetcode/27-remove-element.md) | 77 | [组合](docs/src/leetcode/77-combinations.md) |
| 28 | [找出字符串中第一个匹配项的下标](docs/src/leetcode/28-find-the-index-of-the-first-occurrence-in-a-string.md) | 78 | [子集](docs/src/leetcode/78-subsets.md) |
| 29 | [两数相除](docs/src/leetcode/29-divide-two-integers.md) | 79 | [单词搜索](docs/src/leetcode/79-word-search.md) |
| 30 | [串联所有单词的子串](docs/src/leetcode/30-substring-with-concatenation-of-all-words.md) | 80 | [删除有序数组中的重复项 II](docs/src/leetcode/80-remove-duplicates-from-sorted-array-ii.md) |
| 31 | [下一个排列](docs/src/leetcode/31-next-permutation.md) | 81 | [搜索旋转排序数组 II](docs/src/leetcode/81-search-in-rotated-sorted-array-ii.md) |
| 32 | [最长有效括号](docs/src/leetcode/32-longest-valid-parentheses.md) | 82 | [删除排序链表中的重复元素 II](docs/src/leetcode/82-remove-duplicates-from-sorted-list-ii.md) |
| 33 | [搜索旋转排序数组](docs/src/leetcode/33-search-in-rotated-sorted-array.md) | 83 | [删除排序链表中的重复元素](docs/src/leetcode/83-remove-duplicates-from-sorted-list.md) |
| 34 | [在排序数组中查找元素的第一个和最后一个位置](docs/src/leetcode/34-find-first-and-last-position-of-element-in-sorted-array.md) | 84 | [柱状图中最大的矩形](docs/src/leetcode/84-largest-rectangle-in-histogram.md) |
| 35 | [搜索插入位置](docs/src/leetcode/35-search-insert-position.md) | 85 | [最大矩形](docs/src/leetcode/85-maximal-rectangle.md) |
| 36 | [有效的数独](docs/src/leetcode/36-valid-sudoku.md) | 86 | [分隔链表](docs/src/leetcode/86-partition-list.md) |
| 37 | [解数独](docs/src/leetcode/37-sudoku-solver.md) | 87 | [扰乱字符串](docs/src/leetcode/87-scramble-string.md) |
| 38 | [外观数列](docs/src/leetcode/38-count-and-say.md) | 88 | [合并两个有序数组](docs/src/leetcode/88-merge-sorted-array.md) |
| 39 | [组合总和](docs/src/leetcode/39-combination-sum.md) | 89 | [格雷编码](docs/src/leetcode/89-gray-code.md) |
| 40 | [组合总和 II](docs/src/leetcode/40-combination-sum-ii.md) | 90 | [子集 II](docs/src/leetcode/90-subsets-ii.md) |
| 41 | [缺失的第一个正数](docs/src/leetcode/41-first-missing-positive.md) | 91 | [解码方法](docs/src/leetcode/91-decode-ways.md) |
| 42 | [接雨水](docs/src/leetcode/42-trapping-rain-water.md) | 92 | [反转链表 II](docs/src/leetcode/92-reverse-linked-list-ii.md) |
| 43 | [字符串相乘](docs/src/leetcode/43-multiply-strings.md) | 93 | [复原 IP 地址](docs/src/leetcode/93-restore-ip-addresses.md) |
| 44 | [通配符匹配](docs/src/leetcode/44-wildcard-matching.md) | 94 | [二叉树的中序遍历](docs/src/leetcode/94-binary-tree-inorder-traversal.md) |
| 45 | [跳跃游戏 II](docs/src/leetcode/45-jump-game-ii.md) | 95 | [不同的二叉搜索树 II](docs/src/leetcode/95-unique-binary-search-trees-ii.md) |
| 46 | [全排列](docs/src/leetcode/46-permutations.md) | 96 | [不同的二叉搜索树](docs/src/leetcode/96-unique-binary-search-trees.md) |
| 47 | [全排列 II](docs/src/leetcode/47-permutations-ii.md) | 97 | [交错字符串](docs/src/leetcode/97-interleaving-string.md) |
| 48 | [旋转图像](docs/src/leetcode/48-rotate-image.md) | 98 | [验证二叉搜索树](docs/src/leetcode/98-validate-binary-search-tree.md) |
| 49 | [字母异位词分组](docs/src/leetcode/49-group-anagrams.md) | 99 | [恢复二叉搜索树](docs/src/leetcode/99-recover-binary-search-tree.md) |
| 50 | [Pow(x, n)](docs/src/leetcode/50-powx-n.md) | 100 | [相同的树](docs/src/leetcode/100-same-tree.md) |

## 快速开始

### 环境要求

- Node.js >= 20
- pnpm（推荐）

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm docs:dev
```

### 构建生产

```bash
pnpm docs:build
```

### 预览构建结果

```bash
pnpm docs:preview
```

## 自定义配置

### 站点信息

编辑 [docs/.vitepress/config.mts](docs/.vitepress/config.mts) 修改站点标题、描述、语言等基础配置：

```ts
export default defineConfig({
  title: "你的站点名",
  description: "你的站点描述",
  lang: 'zh-CN',
  // ...
})
```

### 导航栏与侧边栏

- 导航栏：编辑 [docs/.vitepress/configs/nav.ts](docs/.vitepress/configs/nav.ts)
- 侧边栏：编辑 [docs/.vitepress/configs/sidebar.ts](docs/.vitepress/configs/sidebar.ts)

### 公告弹窗

编辑 [docs/.vitepress/theme/components/notice.vue](docs/.vitepress/theme/components/notice.vue) 修改公告内容，或在 [config.mts](docs/.vitepress/config.mts) 中通过 `AnnouncementPlugin` 配置。

### 打赏二维码

替换以下图片文件：

- `docs/src/public/imgs/award/alipay.jpg` — 支付宝收款码
- `docs/src/public/imgs/award/wechatpay.jpg` — 微信收款码

### 主题色与字体

编辑 [docs/.vitepress/theme/style/var.css](docs/.vitepress/theme/style/var.css) 修改 CSS 变量，包括品牌色、Hero 渐变色、字体等。

## 部署

项目已配置 GitHub Actions 自动部署工作流（[.github/workflows/auto-deploy.yml](.github/workflows/auto-deploy.yml)），推送到 `main` 分支即可自动构建并部署到 GitHub Pages。

如需手动部署，请参考 [VitePress 部署文档](https://vitepress.dev/guide/deploy)。

## 技术栈

| 技术 | 说明 |
|------|------|
| [VitePress](https://vitepress.dev/) | 静态站点生成器 |
| [Vue 3](https://vuejs.org/) | 前端框架 |
| [pagefind](https://pagefind.app/) | 离线全文搜索 |
| [不蒜子](https://busuanzi.pure.js.org/) | 站点访问统计 |
| [LXGW WenKai](https://github.com/lxgw/LxgwWenKai) | 霞鹜文楷字体 |

## Star 趋势

[![Star History Chart](https://api.star-history.com/svg?repos=cunyu1943/vitpress&type=Date)](https://star-history.com/#cunyu1943/vitpress&Date)

## 许可证

[Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE)
