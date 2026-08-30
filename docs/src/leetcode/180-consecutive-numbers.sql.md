# [180. 连续出现的数字](https://leetcode.cn/problems/consecutive-numbers/)



## 一、题目描述

表：`Logs`

```
+-------------+---------+
| 列名         | 类型     |
+-------------+---------+
| id          | int     |
| num         | varchar |
+-------------+---------+
id 是该表的主键。
id 是一个自增列，表中的每一行表示一个日志，num 表示该日志对应的数字。
```

找出所有至少连续出现三次的数字，返回的结果表中的数据可以按 **任意顺序** 排序。

返回结果格式如下例所示。



**示例：**

```
输入：
Logs 表:
+----+-----+
| id | num |
+----+-----+
| 1  | 1   |
| 2  | 1   |
| 3  | 1   |
| 4  | 2   |
| 5  | 1   |
| 6  | 2   |
| 7  | 2   |
+----+-----+
输出：
+-----------------+
| ConsecutiveNums |
+-----------------+
| 1               |
+-----------------+
解释：1 是唯一连续出现至少三次的数字。
```

**提示：** 本题考察 **自连接** 或 **窗口函数 `LEAD/LAG`** 判断连续相同值。注意 `id` 是连续自增的，可利用相邻 id 做连接。



## 二、解答方法

### 2.1 方法一：自连接（3 张表）

1. **思路**

将 `Logs` 与自身连接三次：`l1.id = l2.id - 1 = l3.id - 2`（相邻三行），且 `l1.num = l2.num = l3.num`。最后去重得到结果。

2. **代码实现**

:::::: code-group

```sql [MySQL]
SELECT DISTINCT l1.num AS ConsecutiveNums
FROM Logs l1, Logs l2, Logs l3
WHERE l1.id = l2.id - 1
  AND l2.id = l3.id - 1
  AND l1.num = l2.num
  AND l2.num = l3.num;
```

```sql [PostgreSQL / SQL Server]
SELECT DISTINCT l1.num AS "ConsecutiveNums"
FROM Logs l1
JOIN Logs l2 ON l1.id = l2.id - 1
JOIN Logs l3 ON l2.id = l3.id - 1
WHERE l1.num = l2.num AND l2.num = l3.num;
```

::::::

### 2.2 方法二：窗口函数（LEAD / LAG）

1. **思路**

用 `LAG(num, 1)` 和 `LAG(num, 2)` 取前两行的值，判断三行是否相等，再取去重结果。

2. **代码实现（MySQL 8+）**

```sql
SELECT DISTINCT num AS ConsecutiveNums
FROM (
    SELECT num,
           LAG(num, 1) OVER (ORDER BY id) AS prev1,
           LAG(num, 2) OVER (ORDER BY id) AS prev2
    FROM Logs
) t
WHERE num = prev1 AND num = prev2;
```

3. **复杂度分析**

- 自连接法：三表笛卡尔积，数据量大时较慢。
- 窗口函数法：一次排序，效率更高，推荐。

## 三、总结

| 方法 | 优点 | 缺点 |
| ---- | ---- | ---- |
| 自连接 | 兼容所有版本 | 扩展性差（k 次需 k 张表） |
| `LAG/LEAD` 窗口 | 可读、易扩展到「连续 k 次」 | 需支持窗口函数 |

判断「连续相同」的本质是**比较相邻行**，窗口函数比多次自连接更优雅。若要找「连续 k 次」，可改用 `COUNT + 变量` 或 `ROW_NUMBER` 差值分组法。
