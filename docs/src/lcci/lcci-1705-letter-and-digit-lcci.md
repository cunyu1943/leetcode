# [面试题 17.05. 字母与数字](https://leetcode.cn/problems/find-longest-subarray-lcci/)

## 一、题目描述

给定一个由字母和数字组成的数组，找到最长的子数组，使其包含相同数量的字母和数字。返回该子数组，若有多组，返回左端点下标最小的。

**示例：**

```
输入: ["a","b","c","1","2","3","4","5","d"]
输出: ["1","2","3","4","5"]
解释: 字母子数组 ["a","b","c","d"] 与数字 ["1","2","3","4","5"] 中后者更长，且等量。
```

**提示：**

- `array.length <= 100000`。

---

## 二、解答方法

### 2.1 方法一：前缀和 + 哈希表

**1. 思路**

将字母记为 `+1`，数字记为 `-1`，问题转化为求「和为 0 的最长子数组」。计算前缀和，用哈希表记录每个前缀和首次出现的位置；当某前缀和再次出现时，二者之间的子数组和为 0，即字母数字数量相等。取最大长度且左端点最小。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public String[] findLongestSubarray(String[] array) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, -1);
        int sum = 0, maxLen = 0, start = -1;
        for (int i = 0; i < array.length; i++) {
            sum += Character.isLetter(array[i].charAt(0)) ? 1 : -1;
            if (map.containsKey(sum)) {
                int len = i - map.get(sum);
                if (len > maxLen) { maxLen = len; start = map.get(sum); }
            } else {
                map.put(sum, i);
            }
        }
        if (maxLen == 0) return new String[0];
        String[] res = new String[maxLen];
        for (int i = 0; i < maxLen; i++) res[i] = array[start + 1 + i];
        return res;
    }
}
```

```python [Python]
class Solution:
    def findLongestSubarray(self, array: List[str]) -> List[str]:
        from collections import defaultdict
        mp = {0: -1}
        s, max_len, start = 0, 0, -1
        for i, v in enumerate(array):
            s += 1 if v.isalpha() else -1
            if s in mp:
                length = i - mp[s]
                if length > max_len:
                    max_len, start = length, mp[s]
            else:
                mp[s] = i
        return array[start + 1: start + 1 + max_len] if max_len else []
```

```go [Go]
func findLongestSubarray(array []string) []string {
    mp := map[int]int{0: -1}
    sum, maxLen, start := 0, 0, -1
    for i, v := range array {
        if v >= "a" && v <= "z" || v >= "A" && v <= "Z" {
            sum++
        } else {
            sum--
        }
        if j, ok := mp[sum]; ok {
            if i-j > maxLen {
                maxLen = i - j
                start = j
            }
        } else {
            mp[sum] = i
        }
    }
    if maxLen == 0 {
        return []string{}
    }
    return append([]string{}, array[start+1:start+1+maxLen]...)
}
```

```c [C]
// 略：C 实现思路同前缀和，用哈希表较繁琐，可参考 C++ 逻辑
```

```cpp [C++]
class Solution {
public:
    vector<string> findLongestSubarray(vector<string>& array) {
        unordered_map<int, int> mp;
        mp[0] = -1;
        int sum = 0, maxLen = 0, start = -1;
        for (int i = 0; i < array.size(); i++) {
            sum += isalpha(array[i][0]) ? 1 : -1;
            if (mp.count(sum)) {
                int len = i - mp[sum];
                if (len > maxLen) { maxLen = len; start = mp[sum]; }
            } else mp[sum] = i;
        }
        if (maxLen == 0) return {};
        return vector<string>(array.begin() + start + 1, array.begin() + start + 1 + maxLen);
    }
};
```

```javascript [JavaScript]
var findLongestSubarray = function(array) {
    const map = new Map([[0, -1]]);
    let sum = 0, maxLen = 0, start = -1;
    for (let i = 0; i < array.length; i++) {
        sum += /[a-zA-Z]/.test(array[i]) ? 1 : -1;
        if (map.has(sum)) {
            const len = i - map.get(sum);
            if (len > maxLen) { maxLen = len; start = map.get(sum); }
        } else map.set(sum, i);
    }
    return maxLen ? array.slice(start + 1, start + 1 + maxLen) : [];
};
```

```typescript [TypeScript]
function findLongestSubarray(array: string[]): string[] {
    const map = new Map<number, number>([[0, -1]]);
    let sum = 0, maxLen = 0, start = -1;
    for (let i = 0; i < array.length; i++) {
        sum += /[a-zA-Z]/.test(array[i]) ? 1 : -1;
        if (map.has(sum)) {
            const len = i - map.get(sum);
            if (len > maxLen) { maxLen = len; start = map.get(sum); }
        } else map.set(sum, i);
    }
    return maxLen ? array.slice(start + 1, start + 1 + maxLen) : [];
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

---

### 2.2 方法二：暴力枚举（不推荐）

**1. 思路**

枚举所有子数组起点终点，统计字母与数字数量是否相等并记录最长。复杂度高，仅作对比。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public String[] findLongestSubarray(String[] array) {
        int n = array.length, maxLen = 0, start = -1;
        for (int i = 0; i < n; i++) {
            int letter = 0, digit = 0;
            for (int j = i; j < n; j++) {
                if (Character.isLetter(array[j].charAt(0))) letter++;
                else digit++;
                if (letter == digit && j - i + 1 > maxLen) {
                    maxLen = j - i + 1; start = i;
                }
            }
        }
        if (maxLen == 0) return new String[0];
        String[] res = new String[maxLen];
        for (int k = 0; k < maxLen; k++) res[k] = array[start + k];
        return res;
    }
}
```

```python [Python]
class Solution:
    def findLongestSubarray(self, array: List[str]) -> List[str]:
        n, max_len, start = len(array), 0, -1
        for i in range(n):
            letter = digit = 0
            for j in range(i, n):
                if array[j].isalpha():
                    letter += 1
                else:
                    digit += 1
                if letter == digit and j - i + 1 > max_len:
                    max_len, start = j - i + 1, i
        return array[start:start + max_len] if max_len else []
```

```cpp [C++]
class Solution {
public:
    vector<string> findLongestSubarray(vector<string>& array) {
        int n = array.size(), maxLen = 0, start = -1;
        for (int i = 0; i < n; i++) {
            int letter = 0, digit = 0;
            for (int j = i; j < n; j++) {
                if (isalpha(array[j][0])) letter++;
                else digit++;
                if (letter == digit && j - i + 1 > maxLen) {
                    maxLen = j - i + 1; start = i;
                }
            }
        }
        if (maxLen == 0) return {};
        return vector<string>(array.begin() + start, array.begin() + start + maxLen);
    }
};
```

```javascript [JavaScript]
var findLongestSubarray = function(array) {
    let n = array.length, maxLen = 0, start = -1;
    for (let i = 0; i < n; i++) {
        let letter = 0, digit = 0;
        for (let j = i; j < n; j++) {
            if (/[a-zA-Z]/.test(array[j])) letter++;
            else digit++;
            if (letter === digit && j - i + 1 > maxLen) {
                maxLen = j - i + 1; start = i;
            }
        }
    }
    return maxLen ? array.slice(start, start + maxLen) : [];
};
```

```typescript [TypeScript]
function findLongestSubarray(array: string[]): string[] {
    let n = array.length, maxLen = 0, start = -1;
    for (let i = 0; i < n; i++) {
        let letter = 0, digit = 0;
        for (let j = i; j < n; j++) {
            if (/[a-zA-Z]/.test(array[j])) letter++;
            else digit++;
            if (letter === digit && j - i + 1 > maxLen) {
                maxLen = j - i + 1; start = i;
            }
        }
    }
    return maxLen ? array.slice(start, start + maxLen) : [];
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n²)`。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度 | 特点                       |
| -------------- | ---------- | ---------- | -------------------------- |
| 前缀和 + 哈希  | `O(n)`     | `O(n)`     | 最优，推荐                 |
| 暴力枚举       | `O(n²)`    | `O(1)`     | 直观但超时风险             |

**推荐**：使用前缀和 + 哈希表，将问题转化为「和为 0 的最长子数组」。
