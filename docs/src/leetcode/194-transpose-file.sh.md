# [194. 转置文件](https://leetcode.cn/problems/transpose-file/)



## 一、题目描述

给定一个文件 `file.txt`，转置它的内容（即行列互换）。

你可以假设每行列数相同，并且每个字段由空格分隔。

**示例：**

假设 `file.txt` 内容如下：

```
name age
alice 21
ryan 30
```

应当输出：

```
name alice ryan
age 21 30
```

**说明：** 本题是 LeetCode **Shell** 分类题，经典解法是用 `awk` 把每列收集到数组，最后 `END` 按列打印；或用 `paste` + `cut` 组合（但 `cut` 列数需预知，灵活性差）。



## 二、解答方法

### 2.1 方法一：awk 收集列再打印

1. **思路**

`awk` 逐行读取，把第 `i` 列追加进数组 `col[i]`（用空格连接）；`END` 中遍历每一列，打印 `col[i]`。注意用 `NF` 获取当前行列数，`NR==1` 时确定总列数。

2. **代码实现**

:::::: code-group

```bash [bash]
awk '{
    for (i = 1; i <= NF; i++) {
        if (NR == 1) c[i] = $i
        else c[i] = c[i] " " $i
    }
} END {
    for (i = 1; i <= NF; i++) print c[i]
}' file.txt
```

::::::

### 2.2 方法二：paste + cut（列数已知时）

1. **思路**

对每一列 `i` 用 `cut -d' ' -f i` 提取，`paste -d' '` 横向拼接。

2. **代码实现（假设 2 列）**

```bash
paste -d' ' <(cut -d' ' -f1 file.txt) <(cut -d' ' -f2 file.txt)
```

> 通用脚本需先获取列数再循环，较繁琐，故首选 awk 法。

3. **复杂度分析**

- `awk` 法：`O(行数 × 列数)`，内存存全部数据。

## 三、总结

| 方法 | 优点 |
| ---- | ---- |
| `awk` 数组收集 | 列数自适应，推荐 |
| `paste + cut` | 直观但需已知列数 |

`awk` 中 `NR`（当前行号）、`NF`（当前行字段数）是处理行列转换的关键内建变量。
