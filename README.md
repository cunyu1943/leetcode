# 村雨遥的 LeetCode 学习笔记

> 基于 [VitePress](https://vitepress.dev/) 构建的算法刷题笔记站点，记录 LeetCode、剑指 Offer 与程序员面试金典的题解与解题思路。

在线访问：<https://cunyu1943.github.io/leetcode/>

---

## 一、项目简介

本项目用于记录和分享 LeetCode 刷题过程中的题解与思路，目前共收录 **301 篇** 题解笔记，分为三大模块：

- **LeetCode**：第 1 ~ 140 题，共 140 篇；
- **剑指 Offer（专项突击版）**：LCR 001 ~ 140，共 119 篇；
- **程序员面试金典（LCCI）**：面试题 01 ~ 16，共 42 篇。

每篇题解都遵循统一的结构：**题目描述 → 示例 → 解题思路 → 代码实现 → 复杂度分析**，方便复习与对比不同解法。

## 二、目录结构

```text
leetcode/
├── docs/                      # VitePress 文档源
│   ├── .vitepress/
│   │   ├── config.mts         # 站点与主题配置
│   │   ├── configs/           # 导航(nav)与侧边栏(sidebar)配置
│   │   └── theme/             # 自定义主题（组件 & 样式）
│   │       ├── components/    # 公告、修订历史、文章元信息、首页装饰等组件
│   │       └── style/         # 自定义 CSS
│   ├── public/                # 静态资源（图片、favicon 等）
│   ├── leetcode/              # LeetCode 题解（leetcode/1-two-sum.md ... 140-*.md）
│   ├── lcr/                   # 剑指 Offer 题解（lcr/lcr-001-*.md ... lcr-140.md）
│   ├── lcci/                  # 程序员面试金典题解（lcci/lcci-0101-*.md ... lcci-1619-*.md）
│   ├── index.md               # 站点首页
│   └── guide.md               # 使用指南
├── .github/
│   └── workflows/
│       └── auto-deploy.yml    # GitHub Actions 自动部署
├── package.json
├── LICENSE
└── README.md
```

## 三、核心功能与模块

### 1. 题解模块

| 模块 | 目录 | 内容 |
| --- | --- | --- |
| LeetCode | `docs/src/leetcode/` | 第 1 ~ 140 题，140 篇题解 |
| 剑指 Offer | `docs/src/lcr/` | LCR 001 ~ 140，119 篇题解 |
| 程序员面试金典 | `docs/src/lcci/` | 面试题 01 ~ 16，42 篇题解 |

### 2. 站点能力

- **本地搜索**：内置 `search.provider: 'local'`，按题号、题名、关键词快速检索
- **代码组图标**：`vitepress-plugin-group-icons` 为代码块自动匹配语言图标
- **RSS 订阅**：`vitepress-plugin-rss` 生成站点 RSS
- **文档修订历史**：`@nolebase/vitepress-plugin-git-changelog` 展示每篇文章的 Git 提交记录
- **公告 / 打赏**：`vitepress-plugin-announcement`、`vitepress-plugin-sponsor`
- **主题定制**：默认深色模式 + 自定义样式（代码高亮、引用块、模糊、标记、侧边栏图标等）
- **自动部署**：GitHub Actions 构建并发布至 GitHub Pages（`main` 分支推送触发）
- **SEO**：自动生成 `sitemap.xml`

### 3. 配置模块

- `docs/.vitepress/config.mts`：站点级与主题级配置
- `docs/.vitepress/configs/nav.ts`：顶部导航
- `docs/.vitepress/configs/sidebar.ts`：LeetCode、剑指 Offer 与程序员面试金典分组侧边栏

## 四、本地运行

```bash
# 安装依赖（项目使用 pnpm）
pnpm install

# 启动开发服务器（默认 http://localhost:5173）
pnpm docs:dev

# 构建静态站点（产物位于 docs/.vitepress/dist）
pnpm docs:build

# 预览构建产物
pnpm docs:preview
```

依赖脚本见 `package.json`：

| 脚本 | 说明 |
| --- | --- |
| `docs:dev` | 启动本地开发服务器 |
| `docs:build` | 构建生产环境静态站点 |
| `docs:preview` | 预览构建产物 |
| `format` | 使用 Prettier 格式化全部文档 |

## 五、部署

项目通过 `.github/workflows/auto-deploy.yml` 实现 CI/CD：

1. 推送代码到 `main` 分支（或手动触发 Actions）；
2. GitHub Actions 使用 `pnpm` 安装依赖并执行 `pnpm docs:build`；
3. 构建产物上传并由 `actions/deploy-pages` 发布至 GitHub Pages。

最终站点地址：<https://cunyu1943.github.io/leetcode/>

## 六、新增题解

1. 在 `docs/src/leetcode/`、`docs/src/lcr/` 或 `docs/src/lcci/` 目录下新建 `题号-题名.md`；
2. 按统一结构撰写：题目描述、示例、解题思路、代码实现、复杂度分析；
3. 在 `docs/.vitepress/configs/sidebar.ts` 中将新题加入对应分组；
4. 提交并推送到 `main` 分支，站点将自动重新构建与部署。

## 七、声明

- 本站所有题解均为作者个人学习总结，仅供学习交流使用。
- 题解中的题目原文版权归 [LeetCode](https://leetcode.cn/) 及对应权利人所有。
- 如内容有误或侵权，请通过仓库 Issue 反馈，我们将及时处理。

## 八、许可证

本项目基于 [MIT 许可证](./LICENSE) 开源。
