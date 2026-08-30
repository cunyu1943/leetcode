# [189. 轮转数组](https://leetcode.cn/problems/rotate-array/)



## 一、题目描述

给定一个整数数组 `nums`，将数组中的元素向右轮转 `k` 个位置，其中 `k` 是 **非负** 数。



**示例 1：**

```
输入：nums = [1,2,3,4,5,6,7], k = 3
输出：[5,6,7,1,2,3,4]
解释：向右轮转 1 步: [7,1,2,3,4,5,6]；向右轮转 2 步: [6,7,1,2,3,4,5]；向右轮转 3 步: [5,6,7,1,2,3,4]。
```

**示例 2：**

```
输入：nums = [-1,-100,3,99], k = 2
输出：[3,99,-1,-100]
```

**提示：**

-   `1 <= nums.length <= 10⁵`
-   `-2³¹ <= nums[i] <= 2³¹ - 1`
-   `0 <= k <= 10⁵`

**进阶：** 尽可能想出更多的解决方案，至少有 **三种** 不同的方法可以解决这个问题。你能使用空间复杂度 `O(1)` 的 **原地** 算法解决吗？



## 二、解答方法

### 2.1 方法一：三次反转（原地 O(1) 空间，最优）

1. **思路**

关键公式：`k = k % n`。三次反转：先反转整个数组，再反转前 `k` 个，最后反转剩余 `n-k` 个，即得右移结果。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;
        reverse(nums, 0, n - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, n - 1);
    }
    private void reverse(int[] nums, int l, int r) {
        while (l < r) {
            int t = nums[l]; nums[l] = nums[r]; nums[r] = t;
            l++; r--;
        }
    }
}
```

```python [Python]
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        n = len(nums)
        k %= n
        nums.reverse()
        nums[:k] = reversed(nums[:k])
        nums[k:] = reversed(nums[k:])
```

```go [Go]
func rotate(nums []int, k int) {
    n := len(nums)
    k %= n
    reverse(nums, 0, n-1)
    reverse(nums, 0, k-1)
    reverse(nums, k, n-1)
}

func reverse(nums []int, l, r int) {
    for l < r {
        nums[l], nums[r] = nums[r], nums[l]
        l++
        r--
    }
}
```

```cpp [C++]
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;
        reverse(nums.begin(), nums.end());
        reverse(nums.begin(), nums.begin() + k);
        reverse(nums.begin() + k, nums.end());
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
    const n = nums.length;
    k %= n;
    const reverse = (l, r) => {
        while (l < r) {
            [nums[l], nums[r]] = [nums[r], nums[l]];
            l++; r--;
        }
    };
    reverse(0, n - 1);
    reverse(0, k - 1);
    reverse(k, n - 1);
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
    const n = nums.length;
    k %= n;
    const reverse = (l: number, r: number) => {
        while (l < r) {
            [nums[l], nums[r]] = [nums[r], nums[l]];
            l++; r--;
        }
    };
    reverse(0, n - 1);
    reverse(0, k - 1);
    reverse(k, n - 1);
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：额外数组 / 环状替换

1. **思路**

- **额外数组**：`ans[(i+k)%n] = nums[i]`，空间 `O(n)`。
- **环状替换**：按 `gcd(n,k)` 个循环依次跳跃交换，原地 `O(1)` 空间（较绕，面试首选三次反转）。

2. **代码实现（额外数组，Python）**

```python
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        n = len(nums)
        k %= n
        ans = nums[:]
        for i in range(n):
            nums[(i + k) % n] = ans[i]
```

3. **复杂度分析**

- 额外数组：时间 `O(n)`，空间 `O(n)`。
- 环状替换：时间 `O(n)`，空间 `O(1)`。

## 三、总结

| 方法 | 时间 | 空间 | 特点 |
| ---- | ---- | ---- | ---- |
| 三次反转 | `O(n)` | `O(1)` | 最优，推荐 |
| 环状替换 | `O(n)` | `O(1)` | 逻辑较复杂 |
| 额外数组 | `O(n)` | `O(n)` | 直观 |

务必先 `k %= n`，否则 k 大于数组长度时会越界/错误。三次反转是本题标准原地解法。
