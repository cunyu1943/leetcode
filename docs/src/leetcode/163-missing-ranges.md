# [163. 缺失的区间](https://leetcode.cn/problems/missing-ranges/) [🔒 会员题]



## 一、题目描述

给定一个排序的整数数组 `nums` ，其中元素的范围为闭区间 `[lower, upper]`（包含 `lower` 和 `upper`）。返回 **不包含** 在数组中的，且落在 `[lower, upper]` 范围内的**缺失区间** 的**最简**表示列表。

即，对每个缺失区间 `[a, b]`，若 `a == b` 则仅输出 `"a"`；否则输出 `"a->b"`。



**示例 1：**

```
输入: nums = [0, 1, 3, 50, 75], lower = 0, upper = 99
输出: ["2", "4->49", "51->74", "76->99"]
解释: 缺失区间为 [2,2]、[4,49]、[51,74]、[76,99]。
```

**示例 2：**

```
输入: nums = [], lower = 1, upper = 1
输出: ["1"]
```

**提示：**

-   `-10⁹ <= lower <= upper <= 10⁹`
-   `0 <= nums.length <= 100`
-   `lower <= nums[i] <= upper`
-   `nums` 中的所有值 **互不相同** 且按升序排列



## 二、解答方法

### 2.1 方法一：一次遍历

1. **思路**

用 `prev` 记录「已覆盖的下一个期望数字」，初始为 `lower`。遍历数组，若当前 `num > prev` 说明 `prev..num-1` 缺失，加入结果；然后 `prev = num + 1`。遍历结束后，若 `prev <= upper` 说明末尾还有缺失区间。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public List<String> findMissingRanges(int[] nums, int lower, int upper) {
        List<String> res = new ArrayList<>();
        long prev = (long) lower - 1;
        for (int num : nums) {
            if (num - prev >= 2) {
                res.add(format(prev + 1, num - 1));
            }
            prev = num;
        }
        if (upper - prev >= 1) {
            res.add(format(prev + 1, upper));
        }
        return res;
    }

    private String format(long a, long b) {
        return a == b ? String.valueOf(a) : a + "->" + b;
    }
}
```

```python [Python]
class Solution:
    def findMissingRanges(self, nums: List[int], lower: int, upper: int) -> List[str]:
        res = []
        prev = lower - 1
        for num in nums:
            if num - prev >= 2:
                if prev + 1 == num - 1:
                    res.append(str(prev + 1))
                else:
                    res.append(f"{prev + 1}->{num - 1}")
            prev = num
        if upper - prev >= 1:
            if prev + 1 == upper:
                res.append(str(prev + 1))
            else:
                res.append(f"{prev + 1}->{upper}")
        return res
```

```go [Go]
func findMissingRanges(nums []int, lower int, upper int) []string {
    res := []string{}
    prev := int64(lower) - 1
    add := func(a, b int64) {
        if a == b {
            res = append(res, strconv.FormatInt(a, 10))
        } else {
            res = append(res, strconv.FormatInt(a, 10)+"->"+strconv.FormatInt(b, 10))
        }
    }
    for _, num := range nums {
        n := int64(num)
        if n-prev >= 2 {
            add(prev+1, n-1)
        }
        prev = n
    }
    if int64(upper)-prev >= 1 {
        add(prev+1, int64(upper))
    }
    return res
}
```

```cpp [C++]
class Solution {
public:
    vector<string> findMissingRanges(vector<int>& nums, int lower, int upper) {
        vector<string> res;
        long prev = (long)lower - 1;
        auto format = [](long a, long b) -> string {
            return a == b ? to_string(a) : to_string(a) + "->" + to_string(b);
        };
        for (int num : nums) {
            if ((long)num - prev >= 2) {
                res.push_back(format(prev + 1, num - 1));
            }
            prev = num;
        }
        if ((long)upper - prev >= 1) {
            res.push_back(format(prev + 1, upper));
        }
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 */
var findMissingRanges = function (nums, lower, upper) {
    const res = [];
    let prev = lower - 1;
    const format = (a, b) => (a === b ? `${a}` : `${a}->${b}`);
    for (const num of nums) {
        if (num - prev >= 2) {
            res.push(format(prev + 1, num - 1));
        }
        prev = num;
    }
    if (upper - prev >= 1) {
        res.push(format(prev + 1, upper));
    }
    return res;
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 */
function findMissingRanges(nums: number[], lower: number, upper: number): string[] {
    const res: string[] = [];
    let prev = lower - 1;
    const format = (a: number, b: number) => (a === b ? `${a}` : `${a}->${b}`);
    for (const num of nums) {
        if (num - prev >= 2) {
            res.push(format(prev + 1, num - 1));
        }
        prev = num;
    }
    if (upper - prev >= 1) {
        res.push(format(prev + 1, upper));
    }
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`（不计结果）。

## 三、总结

注意用 `long` 避免 `upper - prev` 的整型溢出（Java/C++）。核心是把「首尾哨兵」统一为相邻比较，遍历一遍即可。
