# [228. 汇总区间](https://leetcode.cn/problems/summary-ranges/)



## 一、题目描述

给定一个 **无重复元素** 的 **有序** 整数数组 `nums` 。

返回 **恰好覆盖数组中所有数字** 的 **最小有序** 区间范围列表。也就是说，`nums` 的每个元素都恰好被某个区间范围所覆盖，并且不存在属于某个区间但不属于 `nums` 的数字 `x` 。

列表中的每个区间范围 `[a,b]` 应该按如下格式输出：

-   `"a->b"` ，如果 `a != b`
-   `"a"` ，如果 `a == b`



**示例 1：**

```
输入：nums = [0,1,2,4,5,7]
输出：["0->2","4->5","7"]
解释：区间范围是：[0,2] --> "0->2"，[4,5] --> "4->5"，[7,7] --> "7"
```

**示例 2：**

```
输入：nums = [0,2,3,4,6,8,9]
输出：["0","2->4","6","8->9"]
```

**提示：**

-   `0 <= nums.length <= 20`
-   `-2³¹ <= nums[i] <= 2³¹ - 1`
-   `nums` 中的所有值都 **互不相同**
-   `nums` 按升序排列



## 二、解答方法

### 2.1 方法一：一次遍历（双指针）

1. **思路**

用指针 `i` 指向当前区间的起点，向后检查 `nums[j+1] == nums[j] + 1` 是否连续。当不再连续（或到达末尾）时：

- 若 `start == end`，输出单个数字；
- 否则输出 `"start->end"`。

然后把 `i` 移到 `j+1` 继续。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public List<String> summaryRanges(int[] nums) {
        List<String> res = new ArrayList<>();
        int i = 0;
        while (i < nums.length) {
            int start = nums[i];
            while (i + 1 < nums.length && nums[i + 1] == nums[i] + 1) {
                i++;
            }
            int end = nums[i];
            if (start == end) {
                res.add(String.valueOf(start));
            } else {
                res.add(start + "->" + end);
            }
            i++;
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def summaryRanges(self, nums: List[int]) -> List[str]:
        res = []
        i = 0
        while i < len(nums):
            start = nums[i]
            while i + 1 < len(nums) and nums[i + 1] == nums[i] + 1:
                i += 1
            end = nums[i]
            res.append(str(start) if start == end else f"{start}->{end}")
            i += 1
        return res
```

```go [Go]
func summaryRanges(nums []int) []string {
    res := []string{}
    i := 0
    for i < len(nums) {
        start := nums[i]
        for i+1 < len(nums) && nums[i+1] == nums[i]+1 {
            i++
        }
        end := nums[i]
        if start == end {
            res = append(res, strconv.Itoa(start))
        } else {
            res = append(res, strconv.Itoa(start)+"->"+strconv.Itoa(end))
        }
        i++
    }
    return res
}
```

```cpp [C++]
class Solution {
public:
    vector<string> summaryRanges(vector<int>& nums) {
        vector<string> res;
        int i = 0;
        while (i < nums.size()) {
            long long start = nums[i];
            while (i + 1 < nums.size() && (long long)nums[i + 1] == nums[i] + 1) {
                i++;
            }
            long long end = nums[i];
            if (start == end) {
                res.push_back(to_string(start));
            } else {
                res.push_back(to_string(start) + "->" + to_string(end));
            }
            i++;
        }
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
    const res = [];
    let i = 0;
    while (i < nums.length) {
        const start = nums[i];
        while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) {
            i++;
        }
        const end = nums[i];
        res.push(start === end ? String(start) : `${start}->${end}`);
        i++;
    }
    return res;
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @return {string[]}
 */
function summaryRanges(nums: number[]): string[] {
    const res: string[] = [];
    let i = 0;
    while (i < nums.length) {
        const start = nums[i];
        while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) {
            i++;
        }
        const end = nums[i];
        res.push(start === end ? String(start) : `${start}->${end}`);
        i++;
    }
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`（不计输出）。

## 三、总结

典型的 **连续区间合并** 问题：用双指针找出每段「连续 +1」的区间，按格式输出。

注意细节：
1. 判断连续时用 `nums[i+1] == nums[i] + 1`，在 Java/C++ 中若 `nums[i]` 接近 `INT_MAX` 会 **溢出**，需先转 `long`/`long long`；
2. 空数组直接返回空列表；
3. 单元素区间输出数字本身，不加 `->`。
