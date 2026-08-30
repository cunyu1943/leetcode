# [229. 多数元素 II](https://leetcode.cn/problems/majority-element-ii/)



## 一、题目描述

给定一个大小为 `n` 的整数数组，找出其中 **所有** 出现 **超过 `⌊ n/3 ⌋` 次** 的元素。

**进阶：** 尝试设计时间复杂度 `O(n)`、空间复杂度 `O(1)`的算法解决此问题。



**示例 1：**

```
输入：nums = [3,2,3]
输出：[3]
```

**示例 2：**

```
输入：nums = [1]
输出：[1]
```

**示例 3：**

```
输入：nums = [1,2]
输出：[1,2]
```

**提示：**

-   `n == nums.length`
-   `1 <= n <= 5 * 10⁴`
-   `-10⁹ <= nums[i] <= 10⁹`



## 二、解答方法

### 2.1 方法一：Boyer-Moore 摩尔投票法（O(n) 时间，O(1) 空间）

1. **思路**

超过 `n/3` 的元素 **最多有 2 个**。摩尔投票法推广到两个候选：

1. 维护两个候选 `cand1`、`cand2` 及其计数 `cnt1`、`cnt2`；
2. 遍历：
   - 若 `num == cand1` → `cnt1++`；
   - 否则若 `num == cand2` → `cnt2++`；
   - 否则若 `cnt1 == 0` → `cand1 = num, cnt1 = 1`；
   - 否则若 `cnt2 == 0` → `cand2 = num, cnt2 = 1`；
   - 否则（`num` 与两个候选都不同且计数都不为 0）→ `cnt1--, cnt2--`（「三消」）；
3. **必须二次验证**：投票结果只是候选，需重新统计真实出现次数是否 `> n/3`。

注意选票抵消的本质：三个不同的数互相抵消，剩下可能的多数元素不受影响。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public List<Integer> majorityElement(int[] nums) {
        List<Integer> res = new ArrayList<>();
        if (nums == null || nums.length == 0) return res;
        int cand1 = 0, cand2 = 0, cnt1 = 0, cnt2 = 0;
        for (int num : nums) {
            if (num == cand1) {
                cnt1++;
            } else if (num == cand2) {
                cnt2++;
            } else if (cnt1 == 0) {
                cand1 = num;
                cnt1 = 1;
            } else if (cnt2 == 0) {
                cand2 = num;
                cnt2 = 1;
            } else {
                cnt1--;
                cnt2--;
            }
        }
        // 二次验证真实次数
        cnt1 = 0;
        cnt2 = 0;
        for (int num : nums) {
            if (num == cand1) cnt1++;
            else if (num == cand2) cnt2++;   // else if 防止 cand1 == cand2 时重复计数
        }
        int threshold = nums.length / 3;
        if (cnt1 > threshold) res.add(cand1);
        if (cnt2 > threshold) res.add(cand2);
        return res;
    }
}
```

```python [Python]
class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        if not nums:
            return []
        cand1 = cand2 = None
        cnt1 = cnt2 = 0
        for num in nums:
            if num == cand1:
                cnt1 += 1
            elif num == cand2:
                cnt2 += 1
            elif cnt1 == 0:
                cand1, cnt1 = num, 1
            elif cnt2 == 0:
                cand2, cnt2 = num, 1
            else:
                cnt1 -= 1
                cnt2 -= 1
        # 二次验证
        return [c for c in (cand1, cand2) if nums.count(c) > len(nums) // 3]
```

```go [Go]
func majorityElement(nums []int) []int {
    res := []int{}
    cand1, cand2, cnt1, cnt2 := 0, 0, 0, 0
    for _, num := range nums {
        if num == cand1 {
            cnt1++
        } else if num == cand2 {
            cnt2++
        } else if cnt1 == 0 {
            cand1, cnt1 = num, 1
        } else if cnt2 == 0 {
            cand2, cnt2 = num, 1
        } else {
            cnt1--
            cnt2--
        }
    }
    cnt1, cnt2 = 0, 0
    for _, num := range nums {
        if num == cand1 {
            cnt1++
        } else if num == cand2 {
            cnt2++
        }
    }
    threshold := len(nums) / 3
    if cnt1 > threshold {
        res = append(res, cand1)
    }
    if cnt2 > threshold {
        res = append(res, cand2)
    }
    return res
}
```

```cpp [C++]
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        vector<int> res;
        int cand1 = 0, cand2 = 0, cnt1 = 0, cnt2 = 0;
        for (int num : nums) {
            if (num == cand1) cnt1++;
            else if (num == cand2) cnt2++;
            else if (cnt1 == 0) { cand1 = num; cnt1 = 1; }
            else if (cnt2 == 0) { cand2 = num; cnt2 = 1; }
            else { cnt1--; cnt2--; }
        }
        cnt1 = cnt2 = 0;
        for (int num : nums) {
            if (num == cand1) cnt1++;
            else if (num == cand2) cnt2++;
        }
        int threshold = nums.size() / 3;
        if (cnt1 > threshold) res.push_back(cand1);
        if (cnt2 > threshold) res.push_back(cand2);
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function (nums) {
    let cand1 = null, cand2 = null, cnt1 = 0, cnt2 = 0;
    for (const num of nums) {
        if (num === cand1) cnt1++;
        else if (num === cand2) cnt2++;
        else if (cnt1 === 0) { cand1 = num; cnt1 = 1; }
        else if (cnt2 === 0) { cand2 = num; cnt2 = 1; }
        else { cnt1--; cnt2--; }
    }
    cnt1 = cnt2 = 0;
    for (const num of nums) {
        if (num === cand1) cnt1++;
        else if (num === cand2) cnt2++;
    }
    const res = [];
    const threshold = Math.floor(nums.length / 3);
    if (cnt1 > threshold) res.push(cand1);
    if (cnt2 > threshold) res.push(cand2);
    return res;
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @return {number[]}
 */
function majorityElement(nums: number[]): number[] {
    let cand1: number | null = null, cand2: number | null = null;
    let cnt1 = 0, cnt2 = 0;
    for (const num of nums) {
        if (num === cand1) cnt1++;
        else if (num === cand2) cnt2++;
        else if (cnt1 === 0) { cand1 = num; cnt1 = 1; }
        else if (cnt2 === 0) { cand2 = num; cnt2 = 1; }
        else { cnt1--; cnt2--; }
    }
    cnt1 = cnt2 = 0;
    for (const num of nums) {
        if (num === cand1) cnt1++;
        else if (num === cand2) cnt2++;
    }
    const res: number[] = [];
    const threshold = Math.floor(nums.length / 3);
    if (cnt1 > threshold) res.push(cand1!);
    if (cnt2 > threshold) res.push(cand2!);
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`（不计输出）。

### 2.2 方法二：哈希表计数

1. **思路**

用哈希表统计每个数出现次数，再筛选 `> n/3` 的元素。简单直观但需要 `O(n)` 空间。

2. **代码实现（Python）**

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        from collections import Counter
        return [k for k, v in Counter(nums).items() if v > len(nums) // 3]
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 空间 | 特点 |
| ---- | ---- | ---- |
| 摩尔投票（双候选） | `O(1)` | 进阶要求，推荐 |
| 哈希表 | `O(n)` | 简单直观 |

推广规律：
- 出现 **超过 `n/2`** 的元素最多 1 个 → 1 个候选（169 题）；
- 出现 **超过 `n/3`** 的元素最多 2 个 → 2 个候选（229 题）；
- 一般地，超过 `n/k` 的元素最多 `k-1` 个 → `k-1` 个候选。

**关键陷阱**：投票阶段只产生「候选」，必须 **二次遍历验证** 真实次数，否则在无多数元素的数组（如 `[1,2,3]`）中会输出错误结果。
