# 使用指南

本指南介绍如何浏览、本地运行以及为「村雨遥的 LeetCode 学习笔记」贡献题解。

---

## 一、简介

本项目是一个基于 [VitePress](https://vitepress.dev/) 构建的算法刷题笔记站点，用于记录和分享 LeetCode 与剑指 Offer 的题解。

目前共收录 **259 篇** 题解笔记，分为两大模块：

- **LeetCode**：第 1 ~ 140 题，共 140 篇；
- **剑指 Offer（专项突击版）**：LCR 001 ~ 140，共 119 篇。

每篇题解都遵循统一结构：**题目描述 → 示例 → 解题思路 → 代码实现 → 复杂度分析**，方便复习与对比不同解法。

在线访问：<https://cunyu1943.github.io/leetcode/>

## 二、目录

- [项目简介](#一简介)
- [站点导航](#三站点导航)
- [本地运行](#四本地运行)
- [题解结构](#五题解结构)
- [新增题解](#六新增题解)
- [站点部署](#七站点部署)
- [常见问题](#八常见问题)

## 三、站点导航

站点顶部导航与侧边栏将数据分组，便于快速定位：

| 导航 | 说明 |
| --- | --- |
| LeetCode 题解 | 进入第 1 ~ 140 题的题解列表 |
| 剑指 Offer 题解 | 进入 LCR 001 ~ 140 的题解列表 |
| 使用指南 | 当前页面 |

侧边栏按题号区间对题解分组，点击即可阅读对应题解。如需调整分组，请修改 `docs/.vitepress/configs/sidebar.ts`。

**检索**：站点内置本地搜索（快捷键 `Ctrl/Cmd + K`），支持按题号、题名或关键词快速定位题解。

**其他能力**：

- 每篇文章标题下方会自动展示「文章元信息」（如题目链接）；
- 文章底部展示「Git 修订历史」，可查看该篇的提交记录；
- 站点默认深色模式，可在右上角切换主题。

## 四、本地运行

环境要求：Node.js 与 pnpm（项目使用 pnpm 管理依赖）。

```bash
# 1. 克隆仓库
git clone https://github.com/cunyu1943/leetcode.git
cd leetcode

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器（默认 http://localhost:5173）
pnpm docs:dev

# 4. 构建静态站点（产物位于 docs/.vitepress/dist）
pnpm docs:build

# 5. 预览构建产物
pnpm docs:preview
```

`package.json` 中的可用脚本：

| 脚本 | 说明 |
| --- | --- |
| `docs:dev` | 启动本地开发服务器 |
| `docs:build` | 构建生产环境静态站点 |
| `docs:preview` | 预览构建产物 |
| `format` | 使用 Prettier 格式化全部文档 |

## 五、题解结构

每篇题解（如 `docs/src/leetcode/1-two-sum.md`）遵循统一格式，便于阅读与维护：

```markdown
# [1. 两数之和](https://leetcode.cn/problems/two-sum/)

## 一、题目描述
（题目原文）

## 二、解答方法

1. 思路（分析与思路说明）

2. 代码实现（多语言 / 多解法的代码块）

3. 复杂度分析（时间复杂度与空间复杂度）

三、总结（不同方法对比）
```

- 标题使用带 LeetCode 原题链接的 `[题号. 题名](原题地址)` 形式；
- 代码块标注语言类型（如 ```java、```python），站点会自动匹配语言图标；
- 如需新增字段（如「总结」「相似题目」），请保持整站风格一致。

## 六、新增题解

1. 在 `docs/src/leetcode/`（LeetCode）或 `docs/src/lcr/`（剑指 Offer）目录下新建 `题号-题名.md`；
2. 按 [题解结构](#五题解结构) 撰写内容；
3. 在 `docs/.vitepress/configs/sidebar.ts` 中将新题加入对应分组；
4. 本地预览确认无误后，提交并推送到 `main` 分支，站点将自动重新构建与部署。

> 命名建议：文件名为小写、连字符分隔，且题号与侧边栏分组保持一致，避免出现死链。

## 七、站点部署

部署通过 `.github/workflows/auto-deploy.yml` 自动完成：

1. 推送代码到 `main` 分支（或在 GitHub Actions 页面手动触发）；
2. GitHub Actions 使用 pnpm 安装依赖并执行 `pnpm docs:build`；
3. 构建产物上传并由 `actions/deploy-pages` 发布至 GitHub Pages。

最终站点地址：<https://cunyu1943.github.io/leetcode/>

如需修改部署分支或构建命令，请编辑 `.github/workflows/auto-deploy.yml` 与 `package.json`。

## 八、常见问题

**Q1：本地启动后页面空白或样式异常？**
尝试删除依赖与构建缓存后重装：`rm -rf node_modules docs/.vitepress/dist && pnpm install && pnpm docs:dev`。

**Q2：新增题解后在侧边栏看不到？**
请确认已在 `docs/.vitepress/configs/sidebar.ts` 中将文件加入对应分组，且文件名与路径正确。

**Q3：搜索不到刚加的内容？**
本地搜索基于构建产物建立索引，开发模式下索引实时更新；若仍搜索不到，重启 `docs:dev` 即可。

**Q4：如何修改站点标题、Logo 或页脚？**
站点级配置集中在 `docs/.vitepress/config.mts`，导航与侧边栏分别在 `configs/nav.ts` 与 `configs/sidebar.ts`。

## 九、声明

- 本站所有题解均为作者个人学习总结，仅供学习交流使用。
- 题解中的题目原文版权归 [LeetCode](https://leetcode.cn/) 及对应权利人所有。
- 如内容有误或侵权，请通过仓库 Issue 反馈，我们将及时处理。
