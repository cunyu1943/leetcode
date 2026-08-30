# [197. 上升的温度](https://leetcode.cn/problems/rising-temperature/)



## 一、题目描述

表：`Weather`

```
+---------------+---------+
| 列名           | 类型     |
+---------------+---------+
| id            | int     |
| recordDate    | date    |
| temperature   | int     |
+---------------+---------+
id 是该表的主键。
该表包含特定日期的温度信息。
```

编写 SQL 查询，找出与之前（昨天的）日期相比温度更高的所有日期的 `id`。

返回结果 **不要求顺序**。

**示例：**

```
输入：
Weather 表:
+----+------------+-------------+
| id | recordDate | temperature |
+----+------------+-------------+
| 1  | 2015-01-01 | 10          |
| 2  | 2015-01-02 | 25          |
| 3  | 2015-01-03 | 20          |
| 4  | 2015-01-04 | 30          |
+----+------------+-------------+
输出：
+----+
| id |
+----+
| 2  |
| 4  |
+----+
解释：2015-01-02 温度(25) > 前一天(10) → id=2；2015-01-04 温度(30) > 前一天(20) → id=4。
```

**提示：** 本题考察 **日期函数 `DATE_SUB` / `DATE_ADD` + 自连接**，或窗口函数 `LAG()` 取前一天温度。注意是「昨天」而非「上一条记录」，必须按日期相差 1 天判断。



## 二、解答方法

### 2.1 方法一：自连接 + 日期比较

1. **思路**

`Weather w1` 连接 `Weather w2`，条件是 `w2.recordDate = DATE_SUB(w1.recordDate, INTERVAL 1 DAY)` 且 `w1.temperature > w2.temperature`。

2. **代码实现**

:::::: code-group

```sql [MySQL]
SELECT w1.id
FROM Weather w1
JOIN Weather w2 ON w1.recordDate = DATE_SUB(w2.recordDate, INTERVAL 1 DAY)
WHERE w1.temperature > w2.temperature;
```

```sql [PostgreSQL]
SELECT w1.id
FROM Weather w1
JOIN Weather w2 ON w1.recordDate = w2.recordDate + INTERVAL '1 day'
WHERE w1.temperature > w2.temperature;
```

```sql [SQL Server]
SELECT w1.id
FROM Weather w1
JOIN Weather w2 ON w1.recordDate = DATEADD(day, 1, w2.recordDate)
WHERE w1.temperature > w2.temperature;
```

::::::

### 2.2 方法二：窗口函数 LAG

1. **思路**

用 `LAG(temperature) OVER (ORDER BY recordDate)` 取前一天温度，`LAG(recordDate)` 取前一天日期，判断是否相差 1 天且温度更高。

2. **代码实现**

```sql
SELECT id FROM (
    SELECT id,
           temperature,
           LAG(temperature) OVER (ORDER BY recordDate) AS prev_temp,
           LAG(recordDate) OVER (ORDER BY recordDate) AS prev_date,
           recordDate
    FROM Weather
) t
WHERE prev_temp IS NOT NULL
  AND recordDate = prev_date + INTERVAL '1 day'
  AND temperature > prev_temp;
```

3. **复杂度分析**

- 自连接：依赖 `recordDate` 索引，近似 `O(n)`。
- 窗口函数：一次排序，更简洁。

## 三、总结

| 方法 | 注意点 |
| ---- | ---- |
| 自连接 + 日期差 | 用 `DATE_SUB`/`DATEADD` 比较「昨天」 |
| `LAG` 窗口 | 可读性强，需判断日期差为 1 天 |

关键陷阱：是「温度比**昨天**高」而非「比上一条记录高」——若日期不连续，按 id 相邻会出错，必须按 **日期差 1 天** 关联。
