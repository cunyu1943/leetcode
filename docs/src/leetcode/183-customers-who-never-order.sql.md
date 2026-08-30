# [183. 从不订购的客户](https://leetcode.cn/problems/customers-who-never-order/)



## 一、题目描述

表：`Customers`

```
+-------------+---------+
| 列名         | 类型     |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+
id 是该表的主键。
```

表：`Orders`

```
+-------------+---------+
| 列名         | 类型     |
+-------------+---------+
| id          | int     |
| customerId  | int     |
+-------------+---------+
id 是该表的主键。
customerId 是 Customers 表中 id 的外键。
```

编写 SQL 查询，**报告**所有从不订购任何东西的客户。

返回结果表 **无任何顺序要求**。

查询结果格式如下所示。



**示例：**

```
输入：
Customers 表:
+----+-------+
| id | name  |
+----+-------+
| 1  | Joe   |
| 2  | Henry |
| 3  | Sam   |
| 4  | Max   |
+----+-------+
Orders 表:
+----+-----------+
| id | customerId|
+----+-----------+
| 1  | 3         |
| 2  | 1         |
+----+-----------+
输出：
+-----------+
| Customers |
+-----------+
| Henry     |
| Max       |
+-----------+
```

**提示：** 本题考察 **LEFT JOIN + IS NULL** 或 **NOT IN 子查询**。



## 二、解答方法

### 2.1 方法一：LEFT JOIN + IS NULL

1. **思路**

以 `Customers` 为主表 `LEFT JOIN` `Orders`，凡是 `Orders.customerId` 为 `null` 的即为从未订购的客户。

2. **代码实现**

:::::: code-group

```sql [MySQL / PostgreSQL / SQL Server]
SELECT c.name AS Customers
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customerId
WHERE o.customerId IS NULL;
```

::::::

### 2.2 方法二：NOT IN 子查询

1. **思路**

`WHERE id NOT IN (SELECT customerId FROM Orders)` 同样正确，但 `NOT IN` 在子查询含 `null` 时有坑（本题子查询无 null，安全）。

2. **代码实现**

```sql
SELECT name AS Customers
FROM Customers
WHERE id NOT IN (SELECT customerId FROM Orders);
```

3. **复杂度分析**

- `LEFT JOIN + IS NULL` 在 `customerId` 有索引时效率更高，推荐。

## 三、总结

| 方法 | 适用 |
| ---- | ---- |
| `LEFT JOIN + IS NULL` | 通用、可优化，推荐 |
| `NOT IN` | 子查询无 null 时可用 |

「找出 A 中不在 B 的记录」是 `LEFT JOIN ... IS NULL` 的经典场景。
