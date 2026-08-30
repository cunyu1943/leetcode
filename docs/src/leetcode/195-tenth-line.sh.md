# [195. 第十行](https://leetcode.cn/problems/tenth-line/)



## 一、题目描述

给定一个文本文件 `file.txt`，请只打印其第十行内容。

**示例：**

假设 `file.txt` 内容如下：

```
Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
Line 10
```

你的脚本应当输出 `Line 10`。

**说明：** 若文件不足十行，则不应输出任何内容。本题是 LeetCode **Shell** 分类题，常用 `sed -n '10p'` 或 `awk 'NR==10'`。



## 二、解答方法

### 2.1 方法一：sed -n '10p'

1. **思路**

`sed -n '10p'` 表示「不自动打印（`-n`），只打印第 10 行（`10p`）」。文件不足 10 行时自然无输出。

2. **代码实现**

:::::: code-group

```bash [bash]
sed -n '10p' file.txt
```

::::::

### 2.2 方法二：awk 'NR==10'

1. **思路**

`awk` 中 `NR` 为当前行号，匹配 `NR==10` 时打印该行并 `exit` 提前结束（效率更高）。

2. **代码实现**

```bash
awk 'NR==10 {print; exit}' file.txt
```

3. **复杂度分析**

- `sed`/`awk` 均为流式单行处理，`O(n)`，n 为行数。

## 三、总结

| 方法 | 优点 |
| ---- | ---- |
| `sed -n '10p'` | 最简洁 |
| `awk 'NR==10'` | 可加 `exit` 提前退出 |

`s sed` 的 `-n` 与 `p` 命令配合是「打印指定行」的标准写法；`awk` 用 `NR` 行号变量更灵活（如 `NR>=10 && NR<=20` 打印区间）。
