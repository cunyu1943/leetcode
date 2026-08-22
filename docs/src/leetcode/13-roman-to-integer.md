# [13. 罗马数字转整数](https://leetcode.cn/problems/roman-to-integer/)



## 一、题目描述

罗马数字包含以下七种字符：`I`、`V`、`X`、`L`、`C`、`D`、`M`，分别对应 1、5、10、50、100、500、1000。

通常情况下，罗马数字中小的数字在大的数字右边。但也存在特例：小的数字在大的数字左边时，表示用大数减小数，仅适用于以下六种：`IV`(4)、`IX`(9)、`XL`(40)、`XC`(90)、`CD`(400)、`CM`(900)。

给定一个罗马数字，将其转换成整数。



**示例 1：**

```
输入：s = "III"
输出：3
```

**示例 2：**

```
输入：s = "IV"
输出：4
```

**示例 3：**

```
输入：s = "IX"
输出：9
```

**示例 4：**

```
输入：s = "LVIII"
输出：58
解释：L = 50, V = 5, III = 3。
```

**示例 5：**

```
输入：s = "MCMXCIV"
输出：1994
解释：M = 1000, CM = 900, XC = 90, IV = 4。
```

**提示：**

-   `1 <= s.length <= 15`
-   `s` 仅含字符 `('I', 'V', 'X', 'L', 'C', 'D', 'M')`
-   题目数据保证 `s` 是一个有效的罗马数字，且表示整数在 `[1, 3999]` 内



## 二、解答方法

### 2.1 方法一：左减右加（一次遍历）

1. **思路**

用哈希表记录每个字符的对应值。从左到右遍历：

-   若当前字符的值 `<` 右边一个字符的值，说明是「小数在大数左边」的减法情形，减去当前值；
-   否则加上当前值。

只需比较相邻两字符即可，无需单独处理 6 种特例。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int romanToInt(String s) {
        Map<Character, Integer> map = new HashMap<>();
        map.put('I', 1); map.put('V', 5); map.put('X', 10);
        map.put('L', 50); map.put('C', 100); map.put('D', 500); map.put('M', 1000);
        int res = 0, n = s.length();
        for (int i = 0; i < n; i++) {
            int cur = map.get(s.charAt(i));
            if (i < n - 1 && cur < map.get(s.charAt(i + 1))) {
                res -= cur;
            } else {
                res += cur;
            }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def romanToInt(self, s: str) -> int:
        mp = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
        res = 0
        n = len(s)
        for i, c in enumerate(s):
            val = mp[c]
            if i < n - 1 and val < mp[s[i + 1]]:
                res -= val
            else:
                res += val
        return res
```

```go [Go]
func romanToInt(s string) int {
    mp := map[byte]int{'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    res, n := 0, len(s)
    for i := 0; i < n; i++ {
        cur := mp[s[i]]
        if i < n-1 && cur < mp[s[i+1]] {
            res -= cur
        } else {
            res += cur
        }
    }
    return res
}
```

```c [C]
int romanToInt(char* s) {
    int val[128] = {0};
    val['I'] = 1; val['V'] = 5; val['X'] = 10;
    val['L'] = 50; val['C'] = 100; val['D'] = 500; val['M'] = 1000;
    int res = 0;
    for (int i = 0; s[i]; i++) {
        int cur = val[(int)s[i]];
        if (s[i + 1] && cur < val[(int)s[i + 1]]) {
            res -= cur;
        } else {
            res += cur;
        }
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    int romanToInt(string s) {
        unordered_map<char, int> mp = {
            {'I', 1}, {'V', 5}, {'X', 10}, {'L', 50},
            {'C', 100}, {'D', 500}, {'M', 1000}
        };
        int res = 0, n = s.size();
        for (int i = 0; i < n; i++) {
            int cur = mp[s[i]];
            if (i < n - 1 && cur < mp[s[i + 1]]) {
                res -= cur;
            } else {
                res += cur;
            }
        }
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    const mp = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let res = 0, n = s.length;
    for (let i = 0; i < n; i++) {
        const cur = mp[s[i]];
        if (i < n - 1 && cur < mp[s[i + 1]]) {
            res -= cur;
        } else {
            res += cur;
        }
    }
    return res;
};
```

```ts [TypeScript]
function romanToInt(s: string): number {
    const mp: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let res = 0, n = s.length;
    for (let i = 0; i < n; i++) {
        const cur = mp[s[i]];
        if (i < n - 1 && cur < mp[s[i + 1]]) {
            res -= cur;
        } else {
            res += cur;
        }
    }
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，其中 `n` 为字符串长度，线性遍历一次。
- **空间复杂度**：`O(1)`，哈希表大小固定为 7。

### 2.2 方法二：从右向左累加

1. **思路**

官方提示推荐从右向左处理：维护一个「前一个值 `prev`」，若当前值 `< prev` 则减，否则加，并更新 `prev`。与左减右加等价，但无需关心边界条件 `i < n - 1`，逻辑更干净。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int romanToInt(String s) {
        Map<Character, Integer> map = new HashMap<>();
        map.put('I', 1); map.put('V', 5); map.put('X', 10);
        map.put('L', 50); map.put('C', 100); map.put('D', 500); map.put('M', 1000);
        int res = 0, prev = 0;
        for (int i = s.length() - 1; i >= 0; i--) {
            int cur = map.get(s.charAt(i));
            if (cur < prev) res -= cur;
            else res += cur;
            prev = cur;
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def romanToInt(self, s: str) -> int:
        mp = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
        res, prev = 0, 0
        for c in reversed(s):
            val = mp[c]
            if val < prev:
                res -= val
            else:
                res += val
            prev = val
        return res
```

```go [Go]
func romanToInt(s string) int {
    mp := map[byte]int{'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    res, prev := 0, 0
    for i := len(s) - 1; i >= 0; i-- {
        cur := mp[s[i]]
        if cur < prev {
            res -= cur
        } else {
            res += cur
        }
        prev = cur
    }
    return res
}
```

```c [C]
int romanToInt(char* s) {
    int val[128] = {0};
    val['I'] = 1; val['V'] = 5; val['X'] = 10;
    val['L'] = 50; val['C'] = 100; val['D'] = 500; val['M'] = 1000;
    int res = 0, prev = 0, n = 0;
    while (s[n]) n++;
    for (int i = n - 1; i >= 0; i--) {
        int cur = val[(int)s[i]];
        if (cur < prev) res -= cur;
        else res += cur;
        prev = cur;
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    int romanToInt(string s) {
        unordered_map<char, int> mp = {
            {'I', 1}, {'V', 5}, {'X', 10}, {'L', 50},
            {'C', 100}, {'D', 500}, {'M', 1000}
        };
        int res = 0, prev = 0;
        for (int i = (int)s.size() - 1; i >= 0; i--) {
            int cur = mp[s[i]];
            if (cur < prev) res -= cur;
            else res += cur;
            prev = cur;
        }
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    const mp = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let res = 0, prev = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        const cur = mp[s[i]];
        if (cur < prev) res -= cur;
        else res += cur;
        prev = cur;
    }
    return res;
};
```

```ts [TypeScript]
function romanToInt(s: string): number {
    const mp: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let res = 0, prev = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        const cur = mp[s[i]];
        if (cur < prev) res -= cur;
        else res += cur;
        prev = cur;
    }
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，线性遍历一次。
- **空间复杂度**：`O(1)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 左减右加（一次遍历） | `O(n)` | `O(1)` | 常规实现 |
| 从右向左累加 | `O(n)` | `O(1)` | 常规实现 |

