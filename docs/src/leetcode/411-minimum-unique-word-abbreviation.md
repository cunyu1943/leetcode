# [411. 最短单词缩写 🔒 会员题](https://leetcode.cn/problems/minimum-unique-word-abbreviation/)

## 一、题目描述

一个字符串的**缩写**是用字符 `aZb` 形式表示（`a` 是前缀、`b` 是后缀、`Z` 是中间被省略的字符数）。给定目标单词 `target` 和一组同长度单词 `dictionary`，求 `target` 的一个**最短**缩写，使得它在 `dictionary` 中是唯一的（即不与任何字典单词冲突 —— 冲突当且仅当缩写后两者在原位置字符一致或被计数的位置）。

若存在多个最短缩写，返回任意一种。本题为 LeetCode Premium（会员）题目。

**示例 1：**

```
输入：target = "apple", dictionary = ["blade"]
输出："a4"
解释："a4" 表示保留首字母 a，省略后续 4 个字母，与 "blade" 不冲突。
```

**示例 2：**

```
输入：target = "apple", dictionary = ["plain","amber","blade"]
输出："1p3"
解释："1p3" 与三个字典词均不冲突，且长度为最短之一。
```

**提示：**

- `0 <= len(target) <= 20`（题目保证长度较小，可枚举子集）
- 所有单词长度相同

## 二、解答方法

### 2.1 方法一：枚举缩写组合 + 冲突判定

1. 思路

由于长度 $\le 20$，可枚举 `target` 所有「保留哪些位置」的组合（共 $2^{len}$ 种，用二进制掩码），生成对应的缩写（保留位保留字符、连续省略位用计数表示）。对每个缩写，检查是否与任一 `dictionary` 单词冲突：冲突定义为——对保留位，两词该位字符必须相同；对省略位则不计。若某缩写对所有字典词都「至少有一位保留字符不同」则为唯一合法。在所有合法缩写中挑最短（长度相同则字典序小）。

2. 代码实现（Python 示例，结构清晰）

:::::: code-group

```python [Python]
class Solution:
    def minAbbreviation(self, target: str, dictionary: List[str]) -> str:
        n = len(target)
        cand = []
        # 生成所有保留掩码对应的缩写
        def build(mask: int) -> str:
            s, cnt = [], 0
            for i in range(n):
                if mask & (1 << i):
                    if cnt:
                        s.append(str(cnt)); cnt = 0
                    s.append(target[i])
                else:
                    cnt += 1
            if cnt:
                s.append(str(cnt))
            return "".join(s)
        def conflict(abbr_mask: int, word: str) -> bool:
            # 对 word，用同样的保留位比较
            for i in range(n):
                if abbr_mask & (1 << i):
                    if target[i] != word[i]:
                        return False
            return True
        ans = None
        for mask in range(1 << n):
            ok = all(not conflict(mask, w) for w in dictionary)
            if ok:
                abbr = build(mask)
                if ans is None or len(abbr) < len(ans) or (len(abbr) == len(ans) and abbr < ans):
                    ans = abbr
        return ans
```

```java [Java]
class Solution {
    public String minAbbreviation(String target, String[] dictionary) {
        int n = target.length();
        String best = null;
        for (int mask = 0; mask < (1 << n); mask++) {
            boolean ok = true;
            for (String w : dictionary) {
                boolean same = true;
                for (int i = 0; i < n; i++)
                    if (((mask >> i) & 1) == 1 && target.charAt(i) != w.charAt(i)) { same = false; break; }
                if (same) { ok = false; break; }
            }
            if (!ok) continue;
            String abbr = build(mask, target);
            if (best == null || abbr.length() < best.length() ||
                (abbr.length() == best.length() && abbr.compareTo(best) < 0)) best = abbr;
        }
        return best;
    }
    private String build(int mask, String t) {
        StringBuilder sb = new StringBuilder(); int cnt = 0;
        for (int i = 0; i < t.length(); i++) {
            if (((mask >> i) & 1) == 1) {
                if (cnt > 0) { sb.append(cnt); cnt = 0; }
                sb.append(t.charAt(i));
            } else cnt++;
        }
        if (cnt > 0) sb.append(cnt);
        return sb.toString();
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(2^n \cdot |dictionary| \cdot n)$，因 $n \le 20$ 可接受。
- 空间复杂度：$O(2^n)$ 输出或 $O(1)$ 仅存最优。

## 三、总结

会员题，核心是「用掩码枚举所有缩写并验证唯一性」，因长度受限可暴力。与 320 广义缩写、408 有效单词缩写同源。相关思路：枚举子集（78 子集）。
