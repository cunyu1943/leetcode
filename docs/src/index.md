---
layout: home

hero:
  name: 村雨遥的 LeetCode 学习笔记
  text: 算法刷题笔记 & 题解
  tagline: 记录 LeetCode、剑指 Offer 与程序员面试金典的刷题历程，沉淀解题思路与代码实现
  actions:
    - theme: brand
      text: LeetCode 题解
      link: /leetcode/1-two-sum
    - theme: alt
      text: 剑指 Offer 题解
      link: /lcr/lcr-001-divide-two-integers
    - theme: alt
      text: 程序员面试金典
      link: /lcci/lcci-0101-is-unique
    - theme: alt
      text: 使用指南
      link: /guide

features:
  - icon: 📝
    title: LeetCode 题解（140 题）
    details: 收录第 1 ~ 140 题的题解，每篇包含题目描述、示例、解题思路、代码实现与时间/空间复杂度分析。
  - icon: 🗡️
    title: 剑指 Offer 题解（119 题）
    details: 收录 LCR 001 ~ 140 的剑指 Offer（专项突击版）题解，覆盖常见数据结构与算法考点。
  - icon: 📚
    title: 程序员面试金典（109 题）
    details: 收录面试题 01 ~ 17 的程序员面试金典（LCCI）题解，覆盖字符串、链表、栈、树、数组、排序与查找等面试高频考点。
  - icon: 🔍
    title: 本地全文搜索
    details: 内置 VitePress 本地搜索，支持按题号、题名、关键词快速定位题解。
  - icon: 🌐
    title: 自动部署
    details: 基于 GitHub Actions 自动构建并部署到 GitHub Pages，推送 main 分支即发布。
---

## 一、项目简介

本项目是一个基于 [VitePress](https://vitepress.dev/) 构建的 LeetCode 算法学习笔记站点，用于记录和分享刷题过程中的题解与思路。

目前共收录 **368 篇** 题解笔记，分为三大模块：

- **LeetCode**：第 1 ~ 140 题，共 140 篇；
- **剑指 Offer（专项突击版）**：LCR 001 ~ 140，共 119 篇；
- **程序员面试金典（LCCI）**：面试题 01 ~ 17，共 109 篇。

每篇题解都遵循统一的结构：题目描述、示例、解题思路、代码实现（多语言/多解法）以及复杂度分析，方便复习与对比。

## 二、目录

- [使用指南](/guide)
- [LeetCode 题解](/leetcode/1-two-sum)
- [剑指 Offer 题解](/lcr/lcr-001-divide-two-integers)
- [程序员面试金典题解](/lcci/lcci-0101-is-unique)

## 三、技术特性

- **构建框架**：VitePress（静态站点生成器）
- **本地搜索**：内置 `search.provider: 'local'`，无需额外索引服务
- **代码组图标**：`vitepress-plugin-group-icons` 为代码块自动匹配语言图标
- **RSS 订阅**：`vitepress-plugin-rss` 生成站点 RSS
- **文档修订历史**：`@nolebase/vitepress-plugin-git-changelog` 展示每篇文章的 Git 提交记录
- **公告 / 打赏**：`vitepress-plugin-announcement` 与 `vitepress-plugin-sponsor` 增强交互
- **主题定制**：深色模式默认开启，包含自定义样式（代码高亮、引用块、模糊、标记等）
- **自动部署**：GitHub Actions 构建产物并发布至 GitHub Pages
- **SEO**：自动生成 `sitemap.xml`

## 四、本地运行

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm docs:dev

# 构建静态站点
pnpm docs:build

# 预览构建产物
pnpm docs:preview
```

## 五、站点地址

- 在线访问：<https://cunyu1943.github.io/leetcode/>
- 项目仓库：<https://github.com/cunyu1943/leetcode>

## 六、声明

- 本站所有题解均为作者个人学习总结，仅供学习交流使用。
- 题解中的题目原文版权归 [LeetCode](https://leetcode.cn/) 及对应权利人所有。
- 如内容有误或侵权，请通过仓库 Issue 反馈，我们将及时处理。

---

Copyright © 2026 <a href="https://github.com/cunyu1943">村雨遥</a>
