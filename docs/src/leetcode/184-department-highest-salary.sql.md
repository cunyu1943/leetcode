# [184. 部门工资最高的员工](https://leetcode.cn/problems/department-highest-salary/)



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
id 是该表的主键。
departmentId 是 Department 表 id 的外键。
```

表：`Department`

```
+-------------+---------+
| 列名         | 类型    |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+
id 是该表的主键。
```

编写 SQL 查询，找出每个部门中 **工资最高** 的员工。对于上述示例，Joe 是唯一一个在 IT 部门工资最高的人；Henry 在销售部门工资最高。

按 **任意顺序** 返回结果表。



**示例：**

```
输入：
Employee 表:
+----+-------+--------+--------------+
| id | name  | salary | departmentId |
+----+-------+--------+--------------+
| 1  | Joe   | 70000  | 1            |
| 2  | Jim   | 90000  | 1            |
| 3  | Henry | 80000  | 2            |
| 4  | Sam   | 60000  | 2            |
| 5  | Max   | 90000  | 1            |
+----+-------+--------+--------------+
Department 表:
+----+-------+
| id | name  |
+----+-------+
| 1  | IT    |
| 2  | Sales |
+----+-------+
输出：
+------------+----------+--------+
| Department | Employee | salary |
+------------+----------+--------+
| IT         | Jim      | 90000  |
| IT         | Max      | 90000  |
| Sales      | Henry    | 80000  |
+------------+-------+----------+--------+
```

**提示：** 本题考察**分组内极值**，可用 `MAX + GROUP BY` 再连接，或窗口函数 `RANK()`/`DENSE_RANK()`。注意同一部门可能有多个并列最高。



## 二、解答方法

### 2.1 方法一：子查询求各部门最高薪再关联

1. **思路**

先在子查询里按 `departmentId` 分组求 `MAX(salary)`，再与 `Employee` 连接取工资等于该最大值的员工，最后 `JOIN Department` 取部门名。

2. **代码实现**

:::::: code-group

```sql [MySQL / PostgreSQL / SQL Server]
SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary
FROM Employee e
JOIN Department d ON e.departmentId = d.id
WHERE (e.departmentId, e.salary) IN (
    SELECT departmentId, MAX(salary)
    FROM Employee
    GROUP BY departmentId
);
```

::::::

### 2.2 方法二：窗口函数 DENSE_RANK

1. **思路**

用 `DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC)` 给部门内员工排名，取排名 = 1 的行。

2. **代码实现**

```sql
SELECT Department, Employee, Salary
FROM (
    SELECT d.name AS Department,
           e.name AS Employee,
           e.salary AS Salary,
           DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk
    FROM Employee e
    JOIN Department d ON e.departmentId = d.id
) t
WHERE rnk = 1;
```

3. **复杂度分析**

- 子查询法：两次扫描 Employee。
- 窗口函数法：一次排序，表达力强，推荐。

## 三、总结

| 方法 | 优点 |
| ---- | ---- |
| 子查询 `IN` 元组 | 兼容旧版 |
| `DENSE_RANK` 窗口 | 可读、易扩展到「前 N 名」 |

分组内取极值/排名是 SQL 高频考点；注意并列第一应使用 `DENSE_RANK`（或允许跳号的 `RANK`）。
