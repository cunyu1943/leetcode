# [466. 统计重复个数 🔒 会员题](https://leetcode.cn/problems/count-the-repetitions/)

## 一、题目描述

定义字符串 `s2` 重复 `n` 次为 `s2` 自身拼接 `n` 次。给定两个字符串 `s1`、`s2` 和两个整数 `n1`、`n2`，求最大的整数 `M` 使得 `(s2 重复 n2 次)` 在 `(s1 重复 n1 次)` 中作为子串出现了 `M` 次（按顺序、可跨拼接边界）。

本题为 LeetCode Premium（会员）题目。

**示例 1：**

```
输入：s1 = "acb", n1 = 4, s2 = "ab", n2 = 2
输出：2
解释：s1 重复 4 次 = "acbacbacbacb"，s2 重复 2 次 = "abab"，在前者中 "ab" 出现了 2 次。
```

**示例 2：**

```
输入：s1 = "aaa", n1 = 3, s2 = "aa", n2 = 1
输出：4
```

**提示：**

- `1 <= s1.length, s2.length <= 100`
- `s1`、`s2` 仅由小写字母组成
- `1 <= n1, n2 <= 10^6`

## 二、解答方法

### 2.1 方法一：找循环节（状态记忆化匹配）

1. 思路

在 `s1` 重复 `n1` 次的长串中逐字符匹配 `s2`（也循环重复）。关键优化：由于 `s1` 重复，`s2` 匹配到某位置 `p`（s2 内下标）且刚用完一个 `s1` 时，状态 `(p, 已用完 s1 数)` 会出现循环。记录每个 `s2` 下标 `p` 第一次出现时累计用了多少 `s1`、匹配了多少 `s2` 循环，之后遇到相同 `p` 即可用循环节直接推导，避免 $O(n1 \cdot |s1|)$ 暴力。

2. 代码实现（Python 示例）

:::::: code-group

```python [Python]
class Solution:
    def getMaxRepetitions(self, s1: str, n1: int, s2: str, n2: int) -> int:
        if n1 == 0:
            return 0
        # 记忆：s2 下标 p -> (用了几个 s1, 匹配了几个 s2 循环)
        memo = {}
        s1_cnt = 0  # 已扫描的 s1 个数
        s2_cnt = 0  # 已完整匹配的 s2 个数
        p = 0        # s2 当前匹配下标
        while s1_cnt < n1:
            for ch in s1:
                if ch == s2[p]:
                    p += 1
                    if p == len(s2):
                        p = 0
                        s2_cnt += 1
            s1_cnt += 1
            if p in memo:
                prev_s1, prev_s2 = memo[p]
                # 循环节：每 (s1_cnt - prev_s1) 个 s1 增加 (s2_cnt - prev_s2) 个 s2
                cycle_s1 = s1_cnt - prev_s1
                cycle_s2 = s2_cnt - prev_s2
                remain = n1 - s1_cnt
                reps = remain // cycle_s1
                s1_cnt += reps * cycle_s1
                s2_cnt += reps * cycle_s2
                # 不再进入外层大循环
                break
            else:
                memo[p] = (s1_cnt, s2_cnt)
        # 最终 s2 循环次数 / n2 即为答案
        return s2_cnt // n2
```

```java [Java]
class Solution {
    public int getMaxRepetitions(String s1, int n1, String s2, int n2) {
        if (n1 == 0) return 0;
        int[] memoS1 = new int[s2.length()];
        int[] memoS2 = new int[s2.length()];
        Arrays.fill(memoS1, -1);
        int s1Cnt = 0, s2Cnt = 0, p = 0;
        while (s1Cnt < n1) {
            for (char ch : s1.toCharArray()) {
                if (ch == s2.charAt(p)) {
                    p++;
                    if (p == s2.length()) { p = 0; s2Cnt++; }
                }
            }
            s1Cnt++;
            if (memoS1[p] != -1) {
                int cycleS1 = s1Cnt - memoS1[p];
                int cycleS2 = s2Cnt - memoS2[p];
                int remain = n1 - s1Cnt;
                int reps = remain / cycleS1;
                s1Cnt += reps * cycleS1;
                s2Cnt += reps * cycleS2;
                break;
            } else {
                memoS1[p] = s1Cnt;
                memoS2[p] = s2Cnt;
            }
        }
        return s2Cnt / n2;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(|s1| \cdot |s2|)$，因循环节长度限于 `|s2|`。
- 空间复杂度：$O(|s2|)$。

## 三、总结

会员题。「找循环节 + 状态记忆化」是处理「大重复次数匹配」的核心，避免朴素 $O(n1 \cdot |s1|)$。相关题目：686 重复叠加字符串匹配、459 重复子串。
