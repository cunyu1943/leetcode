# [262. 行程和用户](https://leetcode.cn/problems/trips-and-users/) [🔒 会员题]



## 一、题目描述

表：`Trips`

```
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| id          | int      |
| client_id   | int      |
| driver_id   | int      |
| city_id     | int      |
| status      | enum     |
| request_at  | date     |
+-------------+----------+
id 是这张表的主键。
这张表中存所有出租车的行程信息。每段行程有唯一 id ，其中 client_id 和 driver_id 是 Users 表中 users_id 的外键。
status 是一个表示行程状态的枚举类型，枚举成员为(‘completed’, ‘cancelled_by_driver’, ‘cancelled_by_client’) 。
```

表：`Users`

```
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| user_id     | int      |
| banned      | enum     |
| role        | enum     |
+-------------+----------+
user_id 是这张表的主键。
这张表中存所有用户，每个用户都有一个唯一的 user_id ，role 是一个枚举类型，
枚举成员为 (‘client’, ‘driver’, ‘partner’) 。banned 枚举成员为 (‘Yes’, ‘No’) 。
```

**取消率** 的计算方式如下：(被司机或乘客取消的非禁止用户生成的订单数量) / (非禁止用户生成的订单总数)。

写一段 SQL 语句查出 **`2013-10-01` 至 `2013-10-03` 期间非禁止用户（乘客和司机都必须未被禁止）的取消率**。非禁止用户即 banned 为 `No` 的用户，禁止用户即 banned 为 `Yes` 的用户。

返回结果表中的数据可以按 **任意顺序** 组织。其中取消率 `Cancellation Rate` 需要 **四舍五入保留两位小数** 。

**示例：**

```
输入：
Trips 表：
+----+-----------+-----------+---------+---------------------+------------+
| id | client_id | driver_id | city_id | status              | request_at |
+----+-----------+-----------+---------+---------------------+------------+
| 1  | 1         | 10        | 1       | completed           | 2013-10-01 |
| 2  | 2         | 11        | 1       | cancelled_by_driver | 2013-10-01 |
| 3  | 3         | 12        | 6       | completed           | 2013-10-01 |
| 4  | 4         | 13        | 6       | cancelled_by_client | 2013-10-01 |
| 5  | 1         | 10        | 1       | completed           | 2013-10-02 |
| 6  | 2         | 11        | 6       | completed           | 2013-10-02 |
| 7  | 3         | 12        | 6       | completed           | 2013-10-02 |
| 8  | 2         | 12        | 12      | completed           | 2013-10-03 |
| 9  | 3         | 10        | 12      | completed           | 2013-10-03 |
| 10 | 4         | 13        | 12      | cancelled_by_driver | 2013-10-03 |
+----+-----------+-----------+---------+---------------------+------------+

Users 表：
+----------+--------+--------+
| users_id | banned | role   |
+----------+--------+--------+
| 1        | No     | client |
| 2        | Yes    | client |
| 3        | No     | client |
| 4        | No     | client |
| 10       | No     | driver |
| 11       | No     | driver |
| 12       | No     | driver |
| 13       | No     | driver |
+----------+--------+--------+

输出：
+------------+-------------------+
| Day        | Cancellation Rate |
+------------+-------------------+
| 2013-10-01 | 0.33              |
| 2013-10-02 | 0.00              |
| 2013-10-03 | 0.50              |
+------------+-------------------+
```



## 二、解答方法

### 2.1 方法一：JOIN 过滤 + 条件聚合

1. **思路**

1. 用 `JOIN` 把 `Trips` 与 `Users` 连接两次：一次以 `client_id = users_id`，一次以 `driver_id = users_id`，并过滤掉 `banned = 'Yes'` 的用户（乘客和司机都需未被禁止）；
2. 限定日期范围 `request_at BETWEEN '2013-10-01' AND '2013-10-03'`；
3. 按日期分组，用条件聚合统计：
   - 取消数：`SUM(status <> 'completed')`（或 `SUM(CASE WHEN status IN ('cancelled_by_driver','cancelled_by_client') THEN 1 ELSE 0 END)`）；
   - 总数：`COUNT(*)`；
4. 用 `ROUND(取消数 / 总数, 2)` 得到保留两位小数的取消率。

注意：MySQL 中整数除法会截断，需先乘 `1.0` 或用 `CAST`。

2. **代码实现**

:::::: code-group

```sql [MySQL]
SELECT
    t.request_at AS Day,
    ROUND(
        SUM(CASE WHEN t.status <> 'completed' THEN 1 ELSE 0 END) / COUNT(*) ,
        2
    ) AS `Cancellation Rate`
FROM Trips t
JOIN Users uc ON t.client_id = uc.users_id AND uc.banned = 'No'
JOIN Users ud ON t.driver_id = ud.users_id AND ud.banned = 'No'
WHERE t.request_at BETWEEN '2013-10-01' AND '2013-10-03'
GROUP BY t.request_at
ORDER BY t.request_at;
```

```sql [PostgreSQL]
SELECT
    t.request_at AS "Day",
    ROUND(
        SUM(CASE WHEN t.status <> 'completed' THEN 1 ELSE 0 END)::numeric / COUNT(*),
        2
    ) AS "Cancellation Rate"
FROM Trips t
JOIN Users uc ON t.client_id = uc.users_id AND uc.banned = 'No'
JOIN Users ud ON t.driver_id = ud.users_id AND ud.banned = 'No'
WHERE t.request_at BETWEEN '2013-10-01' AND '2013-10-03'
GROUP BY t.request_at
ORDER BY t.request_at;
```

```sql [SQL Server]
SELECT
    t.request_at AS [Day],
    ROUND(
        SUM(CASE WHEN t.status <> 'completed' THEN 1.0 ELSE 0 END) / COUNT(*),
        2
    ) AS [Cancellation Rate]
FROM Trips t
JOIN Users uc ON t.client_id = uc.users_id AND uc.banned = 'No'
JOIN Users ud ON t.driver_id = ud.users_id AND ud.banned = 'No'
WHERE t.request_at BETWEEN '2013-10-01' AND '2013-10-03'
GROUP BY t.request_at
ORDER BY t.request_at;
```

::::::

### 2.2 方法二：子查询过滤禁止用户

1. **思路**

先用子查询取出所有未被禁止的 `users_id`，再用 `client_id IN (...) AND driver_id IN (...)` 过滤行程，逻辑更直观。

2. **代码实现（MySQL）**

```sql
SELECT
    request_at AS Day,
    ROUND(SUM(status <> 'completed') / COUNT(*), 2) AS `Cancellation Rate`
FROM Trips
WHERE request_at BETWEEN '2013-10-01' AND '2013-10-03'
  AND client_id IN (SELECT users_id FROM Users WHERE banned = 'No')
  AND driver_id IN (SELECT users_id FROM Users WHERE banned = 'No')
GROUP BY request_at;
```

3. **复杂度分析**

- 主要开销在 `JOIN` 与分组聚合，日期列与外键有索引时效率较高。

## 三、总结

| 要点 | 说明 |
| ---- | ---- |
| 双 JOIN | 乘客与司机都需满足 `banned = 'No'` |
| 条件聚合 | `SUM(CASE WHEN ... THEN 1 ELSE 0 END)` 统计取消数 |
| 小数处理 | MySQL 整数除法需乘 `1.0`；PostgreSQL 需 `::numeric` |
| 结果命名 | 含空格的别名用反引号 / 双引号 / 方括号包裹 |

本题是 SQL 中「**比率类统计**」的经典题，模板为：

```
ROUND(SUM(满足条件数) / COUNT(总数), 保留位数)
```

易错点：不要只过滤乘客或只过滤司机 —— **两端都必须是非禁止用户**。
