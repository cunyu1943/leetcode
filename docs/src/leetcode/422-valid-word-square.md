# [422. 有效的单词方块 🔒 会员题](https://leetcode.cn/problems/valid-word-square/)

## 一、题目描述

给定一个单词列表 `words`，判断它是否能排列成一个**合法的单词方块**：第 `k` 行的字符串在垂直方向上读（由上到下）与第 `k` 列字符串相同。

即要求对每个 `i`：`words[i][j] == words[j][i]` 对所有合法的 `i, j` 成立（当 `j < len(words[i])` 时）。

本题为 LeetCode Premium（会员）题目。

**示例 1：**

```
输入：words = ["abcd","bnrt","crmy","dtye"]
输出：true
解释：第 0 行 "abcd"，第 0 列 a,b,c,d；第 1 行 "bnrt"，第1列 b,n,r,t … 均一致。
```

**示例 2：**

```
输入：words = ["ball","area","lead","lady"]
输出：true
```

**示例 3：**

```
输入：words = ["abcd","bnrt","crm","dt"]
输出：true
```

**提示：**

- `1 <= words.length <= 500`
- `1 <= words[i].length <= 500`
- `words[i]` 仅由小写字母组成

## 二、解答方法

### 2.1 方法一：直接按定义校验

1. 思路

按给定顺序（题目已给出排列），逐位置检查 `words[i][j] == words[j][i]`。注意下标越界处理：当 `j >= len(words[i])` 时该位置无字符，但仍要求 `words[j]` 长度足以提供 `words[j][i]`（即 `i < len(words[j])`）且该字符一致。等价于对所有 `i, j` 满足 `words[i]` 第 j 位（若存在）等于 `words[j]` 第 i 位（若存在），两边的「存在性」也需一致。

2. 代码实现（Python 示例，最直观）

:::::: code-group

```python [Python]
class Solution:
    def validWordSquare(self, words: List[str]) -> bool:
        n = len(words)
        for i in range(n):
            for j in range(len(words[i])):
                if j >= n or i >= len(words[j]) or words[i][j] != words[j][i]:
                    return False
        # 同时验证 j>i 方向（被 i 循环已覆盖？需补列循环）
        for j in range(n):
            for i in range(len(words[j])):
                if i >= n or j >= len(words[i]) or words[j][i] != words[i][j]:
                    return False
        return True
```

```java [Java]
class Solution {
    public boolean validWordSquare(List<String> words) {
        int n = words.size();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < words.get(i).length(); j++) {
                if (j >= n || i >= words.get(j).length()
                    || words.get(i).charAt(j) != words.get(j).charAt(i))
                    return false;
            }
        }
        return true;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(\sum |words[i]|)$。
- 空间复杂度：$O(1)$。

## 三、总结

会员题，本质是「行列对称校验」。若题目变体为「从字典中找出能构成方块的排列」（425 单词方块）则需回溯 + 前缀剪枝。相关题目：425 Word Squares、212 单词搜索 II（前缀树）。
