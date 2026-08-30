# [196. 删除重复的电子邮箱](https://leetcode.cn/problems/delete-duplicate-emails/)



## 一、题目描述

表：`Person`

```
+-------------+---------+
| 列名         | 类型     |
+-------------+---------+
| id          | int     |
| email       | varchar |
+-------------+---------+
id 是该表的主键。
该表的每行都包含一封电子邮件。电子邮件不包含大写字母。
```

编写 SQL 语句，**删除** 所有重复的电子邮件，只保留 **id 最小** 的那个。

**注意：** 在 `Person` 表上编写 SQL 语句，在执行语句之后，该表应只剩不重复的邮箱，且保留 id 最小的记录。不允许使用临时表或创建新表，只能在原表上操作（部分数据库要求用 DELETE 而非 SELECT）。



**示例：**

```
输入：
Person 表:
+----+------------------+
| id | email            |
+----+------------------+
| 1  | john@example.com |
| 2  | bob@example.com  |
| 3  | john@example.com |
+----+------------------+
输出：
+----+------------------+
| id | email            |
+----+------------------+
| 1  | john@example.com |
| 2  | bob@example.com  |
+----+------------------+
解释：john@example.com 重复，保留 id 最小的（id=1），删除 id=3。
```

**提示：** 本题考察 **DELETE + 自连接** 或 **DELETE ... WHERE id NOT IN (子查询最小 id)**。注意 MySQL 不允许在子查询中直接引用被删表，需用派生表包裹。



## 二、解答方法

### 2.1 方法一：DELETE + 自连接

1. **思路**

将 `Person p1` 与 `Person p2` 按 `email` 连接，删除 `p1.id > p2.id` 的行（即保留每个邮箱中 id 较小的）。

2. **代码实现**

:::::: code-group

```sql [MySQL]
DELETE p1
FROM Person p1
JOIN Person p2 ON p1.email = p2.email
WHERE p1.id > p2.id;
```

```sql [PostgreSQL / SQL Server]
DELETE FROM Person
WHERE id NOT IN (
    SELECT MIN(id)
    FROM Person
    GROUP BY email
);
```

::::::

### 2.2 方法二：子查询保留最小 id（MySQL 需用派生表）

1. **思路**

MySQL 不允许 `DELETE` 的子查询直接引用同一表，可包一层派生表：

2. **代码实现（MySQL）**

```sql
DELETE FROM Person
WHERE id NOT IN (
    SELECT id FROM (
        SELECT MIN(id) AS id FROM Person GROUP BY email
    ) t
);
```

3. **复杂度分析**

- 自连接删除：依赖 `email`/`id` 索引，近似 `O(n)`。

## 三、总结

| 方法 | 注意点 |
| ---- | ---- |
| `DELETE + 自连接` | MySQL 直接支持，推荐 |
| `NOT IN 子查询` | MySQL 需包派生表绕过限制 |

「保留每组最小 id、删除其余」是数据去重经典操作；务必用 `p1.id > p2.id` 而非 `>=`，否则连自身也会被删。
