# [266. 回文排列](https://leetcode.cn/problems/palindrome-permutation/)



## 一、题目描述

给定一个字符串，判断该字符串中是否可以通过 **重新排列** 组合，形成一个 **回文字符串** 。

**示例 1：**

```
输入: "code"
输出: false
```

**示例 2：**

```
输入: "aab"
输出: true
解释："aab" 可排列成 "aba"。
```

**示例 3：**

```
输入: "carerac"
输出: true
解释："carerac" 可排列成 "racecar" 等回文。
```

**提示：**

-   `1 <= s.length <= 5000`
-   `s` 只包含小写英文字母



## 二、解答方法

### 2.1 方法一：哈希计数（统计奇数次字符）

1. **思路**

一个字符串能重排成回文串的 **充要条件**：**出现奇数次的字符最多只有 1 个**（该字符放在回文中心，其余字符左右对称各放一半）。

做法：统计每个字符的出现次数，统计「出现奇数次」的字符个数，若 `> 1` 则返回 `false`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean canPermutePalindrome(String s) {
        int[] count = new int[256];          // 或 new int[26]
        for (char c : s.toCharArray()) {
            count[c]++;
        }
        int odd = 0;
        for (int c : count) {
            if (c % 2 == 1) {
                odd++;
                if (odd > 1) return false;   // 提前剪枝
            }
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def canPermutePalindrome(self, s: str) -> bool:
        from collections import Counter
        # 出现奇数次的字符至多 1 个
        return sum(v % 2 for v in Counter(s).values()) <= 1
```

```go [Go]
func canPermutePalindrome(s string) bool {
    count := make(map[rune]int)
    for _, c := range s {
        count[c]++
    }
    odd := 0
    for _, v := range count {
        if v%2 == 1 {
            odd++
            if odd > 1 {
                return false
            }
        }
    }
    return true
}
```

```cpp [C++]
class Solution {
public:
    bool canPermutePalindrome(string s) {
        unordered_map<char, int> count;
        for (char c : s) count[c]++;
        int odd = 0;
        for (auto& kv : count) {
            if (kv.second % 2) {
                odd++;
                if (odd > 1) return false;
            }
        }
        return true;
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {boolean}
 */
var canPermutePalindrome = function (s) {
    const count = new Map();
    for (const c of s) {
        count.set(c, (count.get(c) || 0) + 1);
    }
    let odd = 0;
    for (const v of count.values()) {
        if (v % 2 === 1) {
            odd++;
            if (odd > 1) return false;
        }
    }
    return true;
};
```

```ts [TypeScript]
/**
 * @param {string} s
 * @return {boolean}
 */
function canPermutePalindrome(s: string): boolean {
    const count = new Map<string, number>();
    for (const c of s) {
        count.set(c, (count.get(c) || 0) + 1);
    }
    let odd = 0;
    for (const v of count.values()) {
        if (v % 2 === 1) {
            odd++;
            if (odd > 1) return false;
        }
    }
    return true;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(k)`，k 为字符集大小（小写字母时 `O(1)`）。

### 2.2 方法二：位运算（位掩码）

1. **思路**

用整数的每一位表示一个字符出现次数的 **奇偶性**：遇到某字符就把对应位翻转（`xor`）。

最终：
- 若所有位都是 0 → 所有字符出现偶数次 → 可构成回文；
- 若恰有一位为 1 → 只有一个字符出现奇数次 → 可构成回文。

判断「最多一位为 1」：`mask == 0 || (mask & (mask - 1)) == 0`。

2. **代码实现（Python）**

```python
class Solution:
    def canPermutePalindrome(self, s: str) -> bool:
        mask = 0
        for ch in s:
            mask ^= 1 << (ord(ch) - ord('a'))     # 翻转对应位
        return mask == 0 or (mask & (mask - 1)) == 0
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 空间 | 特点 |
| ---- | ---- | ---- |
| 哈希计数 | `O(k)` | 通用，可读性好 |
| 位掩码 | `O(1)` | 极省空间，技巧性强 |

**核心结论**：字符串可重排成回文 ⇔ **出现奇数次的字符数 ≤ 1**。

位运算技巧：
- `mask ^= 1 << i`：翻转第 i 位（偶数次抵消，奇数次为 1）；
- `mask & (mask - 1)`：消去最低位的 1；若结果为 0 说明 `mask` 中最多一个 1。

延伸：**267. 回文排列 II** 要求 **生成所有** 回文排列 —— 先按奇偶性判断可行性，构造出「左半部分」后全排列，再拼上中心字符与镜像。
