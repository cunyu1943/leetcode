# [182. 查找重复的电子邮箱](https://leetcode.cn/problems/duplicate-emails/)



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

编写 SQL 查询，**报告**所有重复的电子邮件。请注意，重复的电子邮件应具有 **相同的** 电子邮件地址，但 **不同的** id。

返回结果表 **无任何顺序要求**。

查询结果格式如下所示。



**示例：**

```
输入：
Person 表:
+----+---------+
| id | email   |
+----+---------+
| 1  | a@b.com |
| 2  | c@d.com |
| 3  | a@b.com |
+----+---------+
输出：
+---------+
| Email   |
+---------+
| a@b.com |
+---------+
解释：a@b.com 出现了两次。
```

**提示：** 本题考察 **GROUP BY + HAVING（计数 > 1）**，或子查询去重。



## 二、解答方法

### 2.1 方法一：GROUP BY + HAVING

1. **思路**

按 `email` 分组，用 `HAVING COUNT(*) > 1` 筛选出现次数大于 1 的邮箱。

2. **代码实现**

:::::: code-group

```sql [MySQL / PostgreSQL / SQL Server]
SELECT email AS Email
FROM Person
GROUP BY email
HAVING COUNT(*) > 1;
```

::::::

### 2.2 方法二：子查询（GROUP BY 后再连接）

1. **思路**

先统计每个邮箱出现次数，再筛选大于 1 的。

2. **代码实现**

```sql
SELECT DISTINCT p1.email AS Email
FROM Person p1
JOIN Person p2 ON p1.email = p2.email
WHERE p1.id != p2.id;
```

3. **复杂度分析**

- `GROUP BY` 法：需一次分组聚合，效率优于自连接。

## 三、总结

| 方法 | 优点 |
| ---- | ---- |
| `GROUP BY + HAVING` | 标准、高效，推荐 |
| 自连接 + DISTINCT | 直观但较慢 |

「查找重复」是 SQL 高频题型，首选 `GROUP BY ... HAVING COUNT(*) > 1`。
