# [178. 分数排名](https://leetcode.cn/problems/rank-scores/)



## 一、题目描述

表: `Scores`

```
+-------------+---------+
| 列名         | 类型     |
+-------------+---------+
| id          | int     |
| score       | decimal |
+-------------+---------+
id 是该表的主键。
该表的每一行都包含了一场比赛的分数，分数是一个有两位小数的浮点数。
```

编写 SQL 查询来排名，排名按以下条件计算：

-   分数应按从高到低排列。
-   如果两个分数相等，则两个分数排名相同（**并列**）。
-   排名后的下一个分数应紧接上一个排名之后，即排名之间不应有「间隔」（**密集排名，DENSE_RANK**）。

返回结果表按 `score` **降序** 排序。

查询结果格式如下所示。



**示例：**

```
输入:
Scores 表:
+----+-------+
| id | score |
+----+-------+
| 1  | 3.50  |
| 2  | 3.65  |
| 3  | 4.00  |
| 4  | 3.85  |
| 5  | 4.00  |
| 6  | 3.65  |
+----+-------+
输出:
+-------+------+
| score | rank |
+-------+------+
| 4.00  | 1    |
| 4.00  | 1    |
| 3.85  | 2    |
| 3.65  | 3    |
| 3.65  | 3    |
| 3.50  | 4    |
+-------+------+
```

**提示：** 本题考察 **`DENSE_RANK()`** 窗口函数，或自连接计数法（用于不支持窗口函数的旧版本）。



## 二、解答方法

### 2.1 方法一：DENSE_RANK 窗口函数（推荐）

1. **思路**

直接用 `DENSE_RANK() OVER (ORDER BY score DESC)` 生成密集排名，再按 `score` 降序输出。

2. **代码实现**

:::::: code-group

```sql [MySQL 8+ / PostgreSQL / SQL Server]
SELECT
    score,
    DENSE_RANK() OVER (ORDER BY score DESC) AS `rank`
FROM Scores
ORDER BY score DESC;
```

::::::

### 2.2 方法二：自连接计数（兼容旧版 MySQL）

1. **思路**

对每个分数，统计「比它大的**不同**分数个数」+ 1 即为其排名。用 `Scores` 与自身的去重分数表连接计数。

2. **代码实现（MySQL 5.x 无窗口函数）**

```sql
SELECT
    s.score,
    COUNT(DISTINCT t.score) AS `rank`
FROM Scores s
JOIN Scores t ON s.score <= t.score
GROUP BY s.id, s.score
ORDER BY s.score DESC;
```

3. **复杂度分析**

- 窗口函数法：`O(n log n)`（排序）。
- 自连接法：约 `O(n²)`，大数据集较慢。

## 三、总结

| 排名方式 | 含义 | 函数 |
| -------- | ---- | ---- |
| 密集排名 | 并列后不跳号（1,1,2,3） | `DENSE_RANK()` ✅ |
| 标准排名 | 并列后跳号（1,1,3,4） | `RANK()` |
| 行号 | 严格连续（1,2,3,4） | `ROW_NUMBER()` |

本题明确要求**密集排名且不跳号**，必须用 `DENSE_RANK()`（或等价的自连接计数）。注意区分 `RANK`、`DENSE_RANK`、`ROW_NUMBER` 三者差异，这是 SQL 面试高频考点。
