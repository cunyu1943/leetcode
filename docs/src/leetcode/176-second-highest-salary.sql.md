# [176. 第二高的薪水](https://leetcode.cn/problems/second-highest-salary/)



## 一、题目描述

`Employee` 表：

```
+-------------+---------+
| 列名         | 类型     |
+-------------+---------+
| id          | int     |
| salary      | int     |
+-------------+---------+
id 是该表的主键。
该表的每一行都包含员工的工资信息。
```

查询并返回 `Employee` 表中 **第二高** 的 **不同** 薪水。如果不存在第二高的薪水，查询应返回 `null`（`None`） 。

查询结果如下例所示。



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
输出:
+---------------------+
| SecondHighestSalary |
+---------------------+
| 200                 |
+---------------------+
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
输出:
+---------------------+
| SecondHighestSalary |
+---------------------+
| null                |
+---------------------+
```

**提示：** 注意「不存在时返回 null」这一要求，需要 `IFNULL` / `COALESCE` 处理。



## 二、解答方法

### 2.1 方法一：DISTINCT + LIMIT + OFFSET + IFNULL

1. **思路**

先取**去重**后的薪水降序排列，跳过第 1 条（`OFFSET 1`）取第 2 条（`LIMIT 1`）。若结果集为空，用 `IFNULL`（MySQL）或 `COALESCE`（通用）返回 `null`。

2. **代码实现**

:::::: code-group

```sql [MySQL]
SELECT
    IFNULL(
        (SELECT DISTINCT salary
         FROM Employee
         ORDER BY salary DESC
         LIMIT 1 OFFSET 1),
        NULL
    ) AS SecondHighestSalary;
```

```sql [PostgreSQL / SQL Server]
SELECT
    (SELECT DISTINCT salary
     FROM Employee
     ORDER BY salary DESC
     OFFSET 1 LIMIT 1) AS SecondHighestSalary;
```

::::::

### 2.2 方法二：子查询 MAX（排除最高薪）

1. **思路**

第二高薪水 = 所有小于「最高薪水」中的最大值。用子查询先求最大值，再求小于它的最大值；外层用 `MAX` 聚合，若无结果自然返回 `null`。

2. **代码实现**

```sql
SELECT MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);
```

3. **复杂度分析**

- 方法一：排序 + 取数，依赖索引可优化。
- 方法二：两次全表扫描求 MAX，简单直观。

## 三、总结

| 方法 | 优点 | 适用 |
| ---- | ---- | ---- |
| `DISTINCT + LIMIT OFFSET` | 易扩展到第 N 高 | 通用，面试推荐 |
| 子查询 `MAX` 排除法 | 无需处理偏移 | 仅第二高方便 |

注意：**必须 `DISTINCT`**（薪水可能重复），且 **必须处理 `null`**（用 `IFNULL`）。扩展「第 N 高」可使用 `LIMIT 1 OFFSET N-1` 或 `DENSE_RANK()` 窗口函数。
