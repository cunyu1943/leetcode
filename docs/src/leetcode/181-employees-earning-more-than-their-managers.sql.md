# [181. 超过经理收入的员工](https://leetcode.cn/problems/employees-earning-more-than-their-managers/)



## 一、题目描述

表：`Employee`

```
+-------------+---------+
| 列名         | 类型     |
+-------------+---------+
| id          | int     |
| name        | varchar |
| salary      | int     |
| managerId   | int     |
+-------------+---------+
id 是该表的主键。
该表的每一行都表示雇员的 id、姓名、工资和经理的 id。
```

编写一个 SQL 查询，找出收入比其经理高的员工。

以 **任意顺序** 返回结果表。

查询结果格式如下所示。



**示例：**

```
输入：
Employee 表:
+----+-------+--------+-----------+
| id | name  | salary | managerId |
+----+-------+--------+-----------+
| 1  | Joe   | 70000  | 3         |
| 2  | Henry | 68000  | 4         |
| 3  | Sam   | 60000  | null      |
| 4  | Max   | 90000  | null      |
+----+-------+--------+-----------+
输出：
+----------+
| Employee |
+----------+
| Joe      |
+----------+
解释：Joe 的工资（70000）超过其经理 Sam 的工资（60000）。
```

**提示：** 本题考察**自连接（self join）**或子查询，将 Employee 与自身按 managerId 关联。



## 二、解答方法

### 2.1 方法一：自连接（INNER JOIN）

1. **思路**

把 `Employee` 表当作员工表 `e` 和经理表 `m`，连接条件为 `e.managerId = m.id`，筛选 `e.salary > m.salary`。

2. **代码实现**

:::::: code-group

```sql [MySQL / PostgreSQL / SQL Server]
SELECT e.name AS Employee
FROM Employee e
JOIN Employee m ON e.managerId = m.id
WHERE e.salary > m.salary;
```

::::::

### 2.2 方法二：子查询

1. **思路**

用子查询取经理工资再比较，可读性稍弱但同样正确。

2. **代码实现**

```sql
SELECT name AS Employee
FROM Employee e
WHERE salary > (
    SELECT salary
    FROM Employee m
    WHERE m.id = e.managerId
);
```

3. **复杂度分析**

- 自连接法：依赖索引（managerId、id），近似 `O(n)`。

## 三、总结

| 方法 | 优点 | 缺点 |
| ---- | ---- | ---- |
| 自连接 | 直观、易优化 | 多表扫描 |
| 子查询 | 语义清晰 | 相关子查询可能较慢 |

核心是**同一张表自我关联**，区分「员工行」与「经理行」即可。
