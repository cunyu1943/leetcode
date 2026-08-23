import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    { text: '🏠 首页', link: '/' },
    { text: '🧑🏻‍💻 我的主页', link: 'https://cunyu1943.github.io' },
    {
        text: '🗺️ 学习路径',
        items: [
            { text: '1️⃣ LeetCode', link: '/leetcode/1-two-sum' },
            { text: '2️⃣ 剑指 Offer', link: '/lcr/lcr-001-divide-two-integers' },

        ]
    },

    {
        text: '📋 开源项目',
        items: [
            { text: '🅱️ 博客', link: 'https://github.com/cunyu1943/blog' },
            { text: '☕️ JavaPark', link: 'https://github.com/cunyu1943/JavaPark' },
            { text: '📰 好物周刊', link: 'https://github.com/cunyu1943/weekly' },
            { text: '💾 MySQL 学习指南', link: 'https://github.com/cunyu1943/mysql-tutorial' },
            { text: '🐍 Python 学习指南', link: 'https://github.com/cunyu1943/python-tutorial' },
            { text: '🖥️ 计算机学习指南', link: 'https://github.com/cunyu1943/cs-guide' },
            { text: '🧰 JetBrains IDEs 中文教程', link: 'https://github.com/cunyu1943/jetbrains-ides-tutorial' },
            { text: '🍃 Spring Boot Demos', link: 'https://github.com/cunyu1943/spring-boot-demos' },

        ]
    },
]