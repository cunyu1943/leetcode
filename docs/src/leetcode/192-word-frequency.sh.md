# [192. 统计词频](https://leetcode.cn/problems/word-frequency/)



## 一、题目描述

写一个 bash 脚本以统计文本文件 `words.txt` 中每个单词出现的频率。

为了简单起见，你可以假设：

-   `words.txt` 只包括小写字母和 `' '` 。
-   每个单词只由小写字母组成。
-   单词间由一个或多个空格字符分隔。

**示例：**

假设 `words.txt` 内容如下：

```
the day is sunny the the
the sunny is is
```

你的脚本应当输出（以词频降序排列）：

```
the 4
is 3
sunny 2
day 1
```

**注意：**

-   你应当 **假设文件 ConcurrentAndSequential.txt 确实存在**，并且能够被读取；
-   你应当输出频率降序排列的结果；
-   若两个单词出现频率相同，则按字典序（升序）输出（部分评测用例有此要求，根题意以「频率降序」为首要条件）。

**说明：** 本题是 LeetCode 的 **Shell** 分类题，需用 bash 一行或多行命令完成，常用 `tr`、`sort`、`uniq -c` 工具链。



## 二、解答方法

### 2.1 方法一：tr + sort + uniq -c + sort -nr

1. **思路**

- `tr -s ' ' '\n'`：把所有空格压缩并转成换行，使每个单词独占一行；
- `sort`：排序以便 `uniq` 统计；
- `uniq -c`：统计每个单词出现次数（`-c` 输出 `次数 单词`）；
- `sort -nr`：按次数数值降序排列（`-n` 数值，`-r` 反向）。

2. **代码实现**

:::::: code-group

```bash [bash]
cat words.txt | tr -s ' ' '\n' | sort | uniq -c | sort -nr | awk '{print $2, $1}'
```

::::::

### 2.2 方法二：纯 awk

1. **思路**

用 `awk` 把每行按空格拆词并计数，最后 `END` 遍历输出，再用 `sort` 排序。

2. **代码实现**

```bash
awk '{for(i=1;i<=NF;i++) cnt[$i]++} END{for(w in cnt) print cnt[w], w}' words.txt | sort -nr | awk '{print $2, $1}'
```

3. **复杂度分析**

- 主要开销在 `sort`/`uniq`，约 `O(m log m)`，m 为单词总数。

## 三、总结

| 方法 | 优点 |
| ---- | ---- |
| `tr + sort + uniq -c` | 管道直观，UNIX 哲学经典 |
| 纯 `awk` | 灵活，可控制输出格式 |

Shell 文本处理三件套 `tr/sort/uniq` + `awk` 是统计词频的标准范式。`uniq -c` 必须先 `sort` 才能正确计数。
