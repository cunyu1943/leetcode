# [246. 中心对称数](https://leetcode.cn/problems/strobogrammatic-number/)



## 一、题目描述

给你一个字符串 `num` ，它表示一个整数。如果 `num` 是一个 **中心对称数** ，则返回 `true` ，否则返回 `false` 。

**中心对称数** 是指：一个数字在旋转 **180°** 之后看起来依旧相同的数字（或数字串）。

数字 `0`、`1` 和 `8` 在旋转后保持不变；`6` 变成 `9`，`9` 变成 `6`；其他数字在旋转后不会变成有效的数字。

**示例 1：**

```
输入：num = "69"
输出：true
解释：69 旋转 180° 后变成 69。
```

**示例 2：**

```
输入：num = "88"
输出：true
```

**示例 3：**

```
输入：num = "962"
输出：false
解释：962 旋转后变成 296，与原数不同。
```

**提示：**

-   `1 <= num.length <= 50`
-   `num` 仅由数字组成
-   `num` 不包含任何前导零，除了零本身



## 二、解答方法

### 2.1 方法一：双指针 + 哈希映射

1. **思路**

合法的中心对称对只有：`0↔0`、`1↔1`、`8↔8`、`6↔9`、`9↔6`。

用双指针从两端向中间扫描，检查每对字符是否构成合法的对称对。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isStrobogrammatic(String num) {
        Map<Character, Character> map = Map.of('0', '0', '1', '1', '8', '8', '6', '9', '9', '6');
        int left = 0, right = num.length() - 1;
        while (left <= right) {
            char c1 = num.charAt(left), c2 = num.charAt(right);
            if (!map.containsKey(c1) || map.get(c1) != c2) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isStrobogrammatic(self, num: str) -> bool:
        pairs = {'0': '0', '1': '1', '8': '8', '6': '9', '9': '6'}
        left, right = 0, len(num) - 1
        while left <= right:
            if num[left] not in pairs or pairs[num[left]] != num[right]:
                return False
            left += 1
            right -= 1
        return True
```

```go [Go]
func isStrobogrammatic(num string) bool {
    pairs := map[byte]byte{'0': '0', '1': '1', '8': '8', '6': '9', '9': '6'}
    left, right := 0, len(num)-1
    for left <= right {
        c1, c2 := num[left], num[right]
        if v, ok := pairs[c1]; !ok || v != c2 {
            return false
        }
        left++
        right--
    }
    return true
}
```

```cpp [C++]
class Solution {
public:
    bool isStrobogrammatic(string num) {
        unordered_map<char, char> pairs{{'0','0'},{'1','1'},{'8','8'},{'6','9'},{'9','6'}};
        int left = 0, right = num.size() - 1;
        while (left <= right) {
            if (!pairs.count(num[left]) || pairs[num[left]] != num[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
};
```

```js [JavaScript]
/**
 * @param {string} num
 * @return {boolean}
 */
var isStrobogrammatic = function (num) {
    const pairs = { '0': '0', '1': '1', '8': '8', '6': '9', '9': '6' };
    let left = 0, right = num.length - 1;
    while (left <= right) {
        if (pairs[num[left]] === undefined || pairs[num[left]] !== num[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
};
```

```ts [TypeScript]
/**
 * @param {string} num
 * @return {boolean}
 */
function isStrobogrammatic(num: string): boolean {
    const pairs: Record<string, string> = { '0': '0', '1': '1', '8': '8', '6': '9', '9': '6' };
    let left = 0, right = num.length - 1;
    while (left <= right) {
        if (pairs[num[left]] === undefined || pairs[num[left]] !== num[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`（固定大小的映射表）。

### 2.2 方法二：递归（由外向内）

1. **思路**

递归判断：首尾字符必须构成合法对称对，且中间子串也是中心对称数。基线条件为空串或单字符（单字符必须是 `0`/`1`/`8`）。

2. **代码实现（Python）**

```python
class Solution:
    def isStrobogrammatic(self, num: str) -> bool:
        pairs = {'0': '0', '1': '1', '8': '8', '6': '9', '9': '6'}
        def check(s):
            if not s:
                return True
            if len(s) == 1:
                return s in '018'
            return s[0] in pairs and pairs[s[0]] == s[-1] and check(s[1:-1])
        return check(num)
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`（递归栈，且切片产生新字符串）。

## 三、总结

中心对称数系列基础题，核心是记住 **5 组合法映射**：

```
0↔0   1↔1   8↔8   6↔9   9↔6
```

其余数字（`2`、`3`、`4`、`5`、`7`）旋转后无效，直接返回 `false`。

系列延伸：
- **247 题**：给定长度 n，**生成** 所有中心对称数 → 递归由外向内逐层添加对称对；
- **248 题**：统计区间 `[low, high]` 内中心对称数的个数。
