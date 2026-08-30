# [185. 部门工资前三高的员工](https://leetcode.cn/problems/department-top-three-salaries/)



## 一、题目描述

表：`Employee`

```
+--------------+---------+
| 列名          | 类型    |
+--------------+---------+
| id           | int     |
| name         | varchar |
| salary       | int     |
| departmentId | int     |
+--------------+---------+
```

表：`Department`

```
+-------------+---------+
| 列名         | 类型    |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+
```

编写 SQL 查询，找出每个部门中 **工资前三高** 的所有员工。如果同一个部门有两个或多个人工资相同且都排在前三，把所有这样的人全部列出。

按 **任意顺序** 返回结果表。



**示例：**

```
输入：
Employee 表:
+----+-------+--------+--------------+
| id | name  | salary | departmentId |
+----+-------+--------+--------------+
| 1  | Joe   | 85000  | 1            |
| 2  | Henry | 80000  | 2            |
| 3  | Sam   | 60000  | 2            |
| 4  | Max   | 90000  | 1            |
| 5  | Janet | 69000  | 1            |
| 6  | Randy | 85000  | 1            |
| 7  | Will  | 70000  | 1            |
+----+-------+--------+--------------+
输出：
+------------+----------+--------+
| Department | Employee | Salary |
+------------+----------+--------+
| IT         | Max      | 90000  |
| IT         | Joe      | 85000  |
| IT         | Randy    | 85000  |
| IT         | Will     | 70000  |
| Sales      | Henry    | 80000  |
| Sales      | Sam      | 60000  |
+------------+----------+--------+
```

**提示：** 本题是 184 题的扩展：取**前三高**且允许并列。用窗口函数 `DENSE_RANK` 排名 ≤ 3 即可；或用自连接计数法。



## 二、解答方法

### 2.1 方法一：窗口函数 DENSE_RANK

1. **思路**

`DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC)`，筛选 `rnk <= 3`。

2. **代码实现**

:::::: code-group

```sql [MySQL 8+ / PostgreSQL / SQL Server]
SELECT Department, Employee, Salary
FROM (
    SELECT d.name AS Department,
           e.name AS Employee,
           e.salary AS Salary,
           DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk
    FROM Employee e
    JOIN Department d ON e.departmentId = d.id
) t
WHERE rnk <= 3;
```

::::::

### 2.2 方法二：自连接计数（兼容旧版）

1. **思路**

对每个员工，统计同部门中比他工资**严格更高的不同工资数** `cnt`；若 `cnt < 3` 说明他处于前三（含并列）。

2. **代码实现（MySQL 5.x）**

```sql
SELECT d.name AS Department, e1.name AS Employee, e1.salary AS Salary
FROM Employee e1
JOIN Department d ON e1.departmentId = d.id
WHERE (
    SELECT COUNT(DISTINCT e2.salary)
    FROM Employee e2
    WHERE e2.departmentId = e1.departmentId
      AND e2.salary > e1.salary
) < 3
ORDER BY d.name, e1.salary DESC;
```

3. **复杂度分析**

- 窗口法：一次排序 `O(n log n)`，推荐。
- 自连接计数：约 `O(n²)`，大数据集慢。

## 三、总结

| 方法 | 优点 |
| ---- | ---- |
| `DENSE_RANK <= 3` | 简洁、高效，推荐 |
| 自连接计数 | 兼容无窗口函数的旧版 |

「前 N 高（允许并列）」统一用 `DENSE_RANK() <= N`；若要求**严格前 N 行**（跳过并列），则改用 `ROW_NUMBER()`。
