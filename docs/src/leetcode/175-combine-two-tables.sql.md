# [175. 组合两个表](https://leetcode.cn/problems/combine-two-tables/)



## 一、题目描述

表: `Person`

```
+-------------+---------+
| 列名         | 类型     |
+-------------+---------+
| PersonId    | int     |
| FirstName   | varchar |
| LastName    | varchar |
+-------------+---------+
PersonId 是该表的主键（具有唯一值的列）。
该表包含一些人的 ID 和姓名信息。
```

表: `Address`

```
+-------------+---------+
| 列名         | 类型    |
+-------------+---------+
| AddressId   | int     |
| PersonId    | int     |
| City        | varchar |
| State       | varchar |
+-------------+---------+
AddressId 是该表的主键。
该表的 PersonId 是 Person 表中 PersonId 的外键。
```

编写解决方案，报告 `Person` 表中每个人的姓、名、城市和州。如果 `personId` 的地址不在 `Address` 表中，则报告为 `null` 。

以 **任意顺序** 返回结果表。

（注意：题目未明确要求返回 personId 列，但有些增强写法会保留，标准答案为 FirstName, LastName, City, State）



**示例：**

```
输入:
Person 表:
+----------+----------+-----------+
| personId | lastName | firstName |
+----------+----------+-----------+
| 1        | Wang     | Allen     |
| 2        | Alice    | Bob       |
+----------+----------+-----------+
Address 表:
+-----------+----------+---------------+------------+
| addressId | personId | city          | state      |
+-----------+----------+---------------+------------+
| 1         | 2        | New York City | New York   |
+-----------+----------+---------------+------------+
输出:
+-----------+----------+---------------+----------+
| firstName | lastName | city          | state    |
+-----------+----------+---------------+----------+
| Allen     | Wang     | null          | null     |
| Bob       | Alice    | New York City | New York |
+-----------+----------+---------------+----------+
解释: 只有 Allen 没有地址信息，因此 city 和 state 返回 null。
```

**提示：** 本题是 LeetCode 数据库（SQL）分类第一题，也是经典的 **LEFT JOIN** 入门题。



## 二、解答方法

### 2.1 方法一：LEFT JOIN

1. **思路**

题目要求「报告 **每个人** 的地址信息，若没有地址则为 `null`」，即无论 `Address` 表是否匹配，都要保留 `Person` 表的全部行。这正是 **LEFT JOIN（左外连接）** 的语义：以 `Person` 为主表，按 `PersonId` 关联 `Address`。

2. **代码实现**

:::::: code-group

```sql [MySQL / PostgreSQL]
SELECT
    p.firstName,
    p.lastName,
    a.city,
    a.state
FROM
    Person p
LEFT JOIN
    Address a ON p.personId = a.personId;
```

```sql [SQL Server]
SELECT
    p.FirstName,
    p.LastName,
    a.City,
    a.State
FROM
    Person p
LEFT JOIN
    Address a ON p.PersonId = a.PersonId;
```

::::::

3. **复杂度分析**

- 取决于数据库优化器，通常对连接字段建立索引后可近似 `O(n)`。

## 三、总结

| 连接类型 | 结果 |
| -------- | ---- |
| `INNER JOIN` | 仅返回两表都匹配的行（会丢失无地址的人，错误） |
| `LEFT JOIN` | 保留左表（Person）全部行 ✅ |

本题是 SQL 入门必会题，核心考点：**「保留主表所有记录 → 用 LEFT JOIN」**。若题目要求「两表都有」才用 `INNER JOIN`。
