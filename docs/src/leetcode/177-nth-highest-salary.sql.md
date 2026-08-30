# [177. 第 N 高的薪水](https://leetcode.cn/problems/nth-highest-salary/)



## 一、题目描述

表: `Employee`

```
+-------------+---------+
| 列名         | 类型     |
+-------------+---------+
| id          | int     |
| salary      | int     |
+-------------+---------+
id 是该表的主键。
该表的每一行包含员工的工资信息。
```

编写一个 SQL 查询来报告 `Employee` 表中第 `n` 高的薪水。如果没有第 `n` 高的薪水，查询应该返回 `null` 。



**示例 1：**

```
输入:
Employee 表:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+
n = 2
输出:
+------------------------+
| getNthHighestSalary(2) |
+------------------------+
| 200                    |
+------------------------+
```

**示例 2：**

```
输入:
Employee 表:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
+----+--------+
n = 2
输出:
+------------------------+
| getNthHighestSalary(2) |
+------------------------+
| null                   |
+------------------------+
```

**提示：** 本题要求写一个**存储函数/过程**（MySQL 中 `CREATE FUNCTION`），`n` 是参数。



## 二、解答方法

### 2.1 方法一：MySQL 自定义函数（LIMIT + OFFSET）

1. **思路**

用 `DECLARE` 声明一个变量 `offset_val = n - 1`，然后在查询里 `LIMIT 1 OFFSET offset_val` 取第 n 高。注意 MySQL 中 `LIMIT` 不能接变量，需用 `PREPARE` 动态 SQL 或用会话变量拼接。下面用动态 SQL 写法。

2. **代码实现（MySQL）**

```sql
CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
    DECLARE offset_val INT;
    SET offset_val = N - 1;
    RETURN (
        SELECT DISTINCT salary
        FROM Employee
        ORDER BY salary DESC
        LIMIT 1 OFFSET offset_val
    );
END;
```

> 注：部分 MySQL 版本不允许 `LIMIT` 后直接跟变量，可改用 `LIMIT offset_val, 1` 或字符串拼接 `PREPARE` 语句。若只要求查询（非函数），可写成：

```sql
SET @n = 2;
SELECT DISTINCT salary AS NthHighestSalary
FROM Employee
ORDER BY salary DESC
LIMIT 1 OFFSET @n - 1;
```

### 2.2 方法二：窗口函数 DENSE_RANK

1. **思路**

用 `DENSE_RANK()` 对薪水降序排名（相同薪水同名次），再筛选排名 = n 的记录，取 `MAX`（处理 null）。

2. **代码实现（PostgreSQL / SQL Server）**

```sql
SELECT (
    SELECT MAX(salary)
    FROM (
        SELECT salary,
               DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
        FROM Employee
    ) t
    WHERE rnk = 2
) AS NthHighestSalary;
```

3. **复杂度分析**

- 窗口函数法需一次排序 `O(n log n)`，但表达力强、易扩展到任意 n。

## 三、总结

| 方法 | 优点 | 缺点 |
| ---- | ---- | ---- |
| `LIMIT OFFSET` 函数 | 简洁，LeetCode 官方接受 | MySQL 变量限制 |
| `DENSE_RANK` 窗口 | 可读性强，通用 | 某些旧版本不支持 |

关键点：1）**`DISTINCT`** 去重；2）**`OFFSET = n-1`**；3）**返回 `null` 的处理**（用 `IFNULL` 或聚合 `MAX`）。176 题是 n=2 的特例。
