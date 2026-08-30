# [161. 相隔为 1 的编辑距离](https://leetcode.cn/problems/one-edit-distance/) [🔒 会员题]



## 一、题目描述

给定两个字符串 `s` 和 `t` ，如果它们只有**一个编辑距离**，则返回 `true` 。

一个编辑距离表示：在字符串中插入一个字符、删除一个字符或修改一个字符，恰好使得 `s` 变成 `t`（或反之）。要求**恰好**为 1 次编辑，不是 0 次也不是 2 次及以上。



**示例 1：**

```
输入: s = "ab", t = "acb"
输出: true
解释: 在 "ab" 中间插入 'c' 得到 "acb"，恰好一次编辑。
```

**示例 2：**

```
输入: s = "ab", t = "abc"
输出: false
解释: 可以一次编辑从 "ab" 到 "abc"（插入 'c'），但题意要求 s 与 t 长度差不超过 1；此处实际为 true 型，注意仅当恰好为 1 次才返回 true。若 s="ab",t="abc" 应为 true。
```

**提示：**

-   `0 <= s.length, t.length <= 10⁴`
-   `s` 和 `t` 由小写字母组成



## 二、解答方法

### 2.1 方法一：双指针

1. **思路**

- 若长度差 > 1，必然不是 1 次编辑，直接返回 `false`。
- 长度差 == 0：统计不同字符个数，恰好 1 个不同则为 `true`。
- 长度差 == 1：让 `longer` 与 `shorter` 比较，遇到第一处不同后 `longer` 指针跳过一格继续比较，若剩余完全相等则为 `true`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isOneEditDistance(String s, String t) {
        int m = s.length(), n = t.length();
        if (Math.abs(m - n) > 1) return false;
        if (m > n) return isOneEditDistance(t, s); // 保证 s 更短
        int i = 0, j = 0;
        boolean diff = false;
        while (i < m && j < n) {
            if (s.charAt(i) != t.charAt(j)) {
                if (diff) return false; // 已有过一次差异
                diff = true;
                if (m == n) i++; // 等长则替换
            } else {
                i++;
            }
            j++;
        }
        // 若从未出现差异，则长度差须为 1（插入/删除）
        return diff || (i == m && j == n - 1);
    }
}
```

```python [Python]
class Solution:
    def isOneEditDistance(self, s: str, t: str) -> bool:
        m, n = len(s), len(t)
        if abs(m - n) > 1:
            return False
        if m > n:
            return self.isOneEditDistance(t, s)
        diff = False
        i = j = 0
        while i < m and j < n:
            if s[i] != t[j]:
                if diff:
                    return False
                diff = True
                if m == n:
                    i += 1
            else:
                i += 1
            j += 1
        return diff or (i == m and j == n - 1)
```

```go [Go]
func isOneEditDistance(s string, t string) bool {
    m, n := len(s), len(t)
    if abs(m-n) > 1 {
        return false
    }
    if m > n {
        return isOneEditDistance(t, s)
    }
    diff := false
    i, j := 0, 0
    for i < m && j < n {
        if s[i] != t[j] {
            if diff {
                return false
            }
            diff = true
            if m == n {
                i++
            }
        } else {
            i++
        }
        j++
    }
    return diff || (i == m && j == n-1)
}

func abs(a int) int { if a < 0 { return -a }; return a }
```

```cpp [C++]
class Solution {
public:
    bool isOneEditDistance(string s, string t) {
        int m = s.size(), n = t.size();
        if (abs(m - n) > 1) return false;
        if (m > n) return isOneEditDistance(t, s);
        bool diff = false;
        int i = 0, j = 0;
        while (i < m && j < n) {
            if (s[i] != t[j]) {
                if (diff) return false;
                diff = true;
                if (m == n) i++;
            } else {
                i++;
            }
            j++;
        }
        return diff || (i == m && j == n - 1);
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isOneEditDistance = function (s, t) {
    let m = s.length, n = t.length;
    if (Math.abs(m - n) > 1) return false;
    if (m > n) return isOneEditDistance(t, s);
    let diff = false;
    let i = 0, j = 0;
    while (i < m && j < n) {
        if (s[i] !== t[j]) {
            if (diff) return false;
            diff = true;
            if (m === n) i++;
        } else {
            i++;
        }
        j++;
    }
    return diff || (i === m && j === n - 1);
};
```

```ts [TypeScript]
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isOneEditDistance(s: string, t: string): boolean {
    let m = s.length, n = t.length;
    if (Math.abs(m - n) > 1) return false;
    if (m > n) return isOneEditDistance(t, s);
    let diff = false;
    let i = 0, j = 0;
    while (i < m && j < n) {
        if (s[i] !== t[j]) {
            if (diff) return false;
            diff = true;
            if (m === n) i++;
        } else {
            i++;
        }
        j++;
    }
    return diff || (i === m && j === n - 1);
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(min(m, n))`。
- **空间复杂度**：`O(1)`。

## 三、总结

关键是**区分三种长度情形**：长度差 >1 直接否定；差 0 看字符差异数；差 1 用跳过一格的双指针。注意「恰好一次」意味着 `s == t` 时应返回 `false`。
