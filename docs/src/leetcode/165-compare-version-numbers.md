# [165. 比较版本号](https://leetcode.cn/problems/compare-version-numbers/)



## 一、题目描述

给你两个版本号字符串 `version1` 和 `version2` ，请你比较它们。

版本号由一个或多个修订号组成，各修订号由一个 `'.'` 连接。每个修订号由 **多位数字** 组成，可能包含前导零。每个版本号至少包含一个字符。修订号从左到右编号，下标从 0 开始，最左边的修订号下标为 0 ，下一个修订号下标为 1 ，以此类推。例如，`2.5.33` 和 `0.1` 都是有效的版本号。

比较版本号时，请按从左到右的顺序依次比较它们的修订号。比较修订号时，只需比较 **忽略任何前导零后的整数值** 。如果版本号没有指定某个下标处的修订号，则该修订号视为 `0` 。

返回规则：

-   如果 `version1 > version2` 返回 `1`，
-   如果 `version1 < version2` 返回 `-1`，
-   除此之外返回 `0`。



**示例 1：**

```
输入：version1 = "1.01", version2 = "1.001"
输出：0
解释：忽略前导零，"01" 和 "001" 都表示相同的整数 "1"。
```

**示例 2：**

```
输入：version1 = "1.0", version2 = "1.0.0"
输出：0
解释："1.0" 等同于 "1.0.0" ，没有指定下标为 2 的修订号，默认为 "0"。
```

**示例 3：**

```
输入：version1 = "0.1", version2 = "1.1"
输出：-1
解释：version1 中下标为 0 的修订号是 "0"，version2 中下标为 0 的修订号是 "1" 。0 < 1，所以 version1 < version2。
```

**提示：**

-   `1 <= version1.length, version2.length <= 500`
-   `version1` 和 `version2` 仅包含数字和 `'.'`
-   `version1` 和 `version2` 都是 有效版本号
-   `version1` 和 `version2` 的所有修订号都可以存储在 **32 位整数** 中



## 二、解答方法

### 2.1 方法一：双指针逐段比较

1. **思路**

用两个指针分别遍历两个版本号，以 `'.'` 为分隔提取每段整数（自动忽略前导零），逐段比较。较短版本号缺失的段视为 `0`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int compareVersion(String version1, String version2) {
        int i = 0, j = 0;
        int n = version1.length(), m = version2.length();
        while (i < n || j < m) {
            int v1 = 0, v2 = 0;
            while (i < n && version1.charAt(i) != '.') {
                v1 = v1 * 10 + (version1.charAt(i) - '0');
                i++;
            }
            while (j < m && version2.charAt(j) != '.') {
                v2 = v2 * 10 + (version2.charAt(j) - '0');
                j++;
            }
            if (v1 != v2) return v1 < v2 ? -1 : 1;
            i++; j++;
        }
        return 0;
    }
}
```

```python [Python]
class Solution:
    def compareVersion(self, version1: str, version2: str) -> int:
        v1 = list(map(int, version1.split('.')))
        v2 = list(map(int, version2.split('.')))
        for i in range(max(len(v1), len(v2))):
            a = v1[i] if i < len(v1) else 0
            b = v2[i] if i < len(v2) else 0
            if a != b:
                return -1 if a < b else 1
        return 0
```

```go [Go]
func compareVersion(version1 string, version2 string) int {
    v1 := strings.Split(version1, ".")
    v2 := strings.Split(version2, ".")
    for i := 0; i < len(v1) || i < len(v2); i++ {
        a, b := 0, 0
        if i < len(v1) {
            a, _ = strconv.Atoi(v1[i])
        }
        if i < len(v2) {
            b, _ = strconv.Atoi(v2[i])
        }
        if a != b {
            if a < b {
                return -1
            }
            return 1
        }
    }
    return 0
}
```

```cpp [C++]
class Solution {
public:
    int compareVersion(string version1, string version2) {
        int i = 0, j = 0;
        int n = version1.size(), m = version2.size();
        while (i < n || j < m) {
            int v1 = 0, v2 = 0;
            while (i < n && version1[i] != '.') {
                v1 = v1 * 10 + (version1[i] - '0');
                i++;
            }
            while (j < m && version2[j] != '.') {
                v2 = v2 * 10 + (version2[j] - '0');
                j++;
            }
            if (v1 != v2) return v1 < v2 ? -1 : 1;
            i++; j++;
        }
        return 0;
    }
};
```

```js [JavaScript]
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
    const v1 = version1.split('.').map(Number);
    const v2 = version2.split('.').map(Number);
    const maxLen = Math.max(v1.length, v2.length);
    for (let i = 0; i < maxLen; i++) {
        const a = v1[i] || 0;
        const b = v2[i] || 0;
        if (a !== b) return a < b ? -1 : 1;
    }
    return 0;
};
```

```ts [TypeScript]
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
function compareVersion(version1: string, version2: string): number {
    const v1 = version1.split('.').map(Number);
    const v2 = version2.split('.').map(Number);
    const maxLen = Math.max(v1.length, v2.length);
    for (let i = 0; i < maxLen; i++) {
        const a = v1[i] || 0;
        const b = v2[i] || 0;
        if (a !== b) return a < b ? -1 : 1;
    }
    return 0;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(max(n, m))`。
- **空间复杂度**：`O(n + m)`（拆分数组，Go/Java 双指针为 `O(1)`）。

## 三、总结

比较版本号本质是**按段比较整数**，注意「前导零忽略」与「短版本缺段补 0」两个细节。Python/JS 用 `split` 最简洁；Java/C++ 用双指针更省空间。
