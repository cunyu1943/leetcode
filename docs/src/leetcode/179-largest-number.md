# [179. 最大数](https://leetcode.cn/problems/largest-number/)



## 一、题目描述

给定一组非负整数 `nums`，重新排列每个数的顺序（每个数不可拆分）使之组成一个最大的整数。

**注意：** 输出结果可能非常大，所以你需要返回一个字符串而不是整数。



**示例 1：**

```
输入：nums = [10,2]
输出："210"
```

**示例 2：**

```
输入：nums = [3,30,34,5,9]
输出："9534330"
```

**示例 3：**

```
输入：nums = [10]
输出："10"
```

**提示：**

-   `1 <= nums.length <= 100`
-   `0 <= nums[i] <= 10⁹`



## 二、解答方法

### 2.1 方法一：自定义排序（比较拼接串）

1. **思路**

关键是比较规则：对两个数字 `a`、`b`，若 `a` 拼 `b` 的串 `("" + a + b)` 大于 `b` 拼 `a` 的串 `("" + b + a)`，则 `a` 应排在 `b` 前面。按此规则降序排序后拼接即可。注意：若排序后首元素为 `"0"`，说明所有数都是 0，直接返回 `"0"`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public String largestNumber(int[] nums) {
        String[] strs = new String[nums.length];
        for (int i = 0; i < nums.length; i++) {
            strs[i] = String.valueOf(nums[i]);
        }
        Arrays.sort(strs, (a, b) -> (b + a).compareTo(a + b));
        if (strs[0].equals("0")) return "0";
        return String.join("", strs);
    }
}
```

```python [Python]
class Solution:
    def largestNumber(self, nums: List[int]) -> str:
        strs = list(map(str, nums))
        strs.sort(key=cmp_to_key(lambda a, b: 1 if a + b < b + a else -1 if a + b > b + a else 0))
        if strs[0] == "0":
            return "0"
        return "".join(strs)
```

```go [Go]
import "sort"
import "strconv"

func largestNumber(nums []int) string {
    strs := make([]string, len(nums))
    for i, num := range nums {
        strs[i] = strconv.Itoa(num)
    }
    sort.Slice(strs, func(i, j int) bool {
        return strs[i]+strs[j] > strs[j]+strs[i]
    })
    if strs[0] == "0" {
        return "0"
    }
    res := ""
    for _, s := range strs {
        res += s
    }
    return res
}
```

```cpp [C++]
class Solution {
public:
    string largestNumber(vector<int>& nums) {
        vector<string> strs;
        for (int num : nums) strs.push_back(to_string(num));
        sort(strs.begin(), strs.end(), [](const string& a, const string& b) {
            return a + b > b + a;
        });
        if (strs[0] == "0") return "0";
        string res;
        for (const string& s : strs) res += s;
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
    const strs = nums.map(String);
    strs.sort((a, b) => (b + a) - (a + b) > 0 ? -1 : 1);
    // 字符串比较更稳妥：
    strs.sort((a, b) => (b + a).localeCompare(a + b));
    if (strs[0] === '0') return '0';
    return strs.join('');
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @return {string}
 */
function largestNumber(nums: number[]): string {
    const strs = nums.map(String);
    strs.sort((a, b) => (b + a).localeCompare(a + b));
    if (strs[0] === '0') return '0';
    return strs.join('');
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n log n · k)`，`k` 为数字位数（比较拼接串）。
- **空间复杂度**：`O(n)`。

## 三、总结

本题核心是定义**字典序拼接比较规则**：`a` 应在 `b` 前当且仅当 `a+b > b+a`。这是贪心排序的经典应用。别忘了全 0 特判返回 `"0"`。
