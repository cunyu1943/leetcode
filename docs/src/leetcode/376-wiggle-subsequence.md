# [376. 摆动序列](https://leetcode.cn/problems/wiggle-subsequence/)

## 一、题目描述

如果连续数字之间的差严格在正负之间交替（如 `↑↓↑↓` 或 `↓↑↓↑`），则该序列为 **摆动序列**。给定整数数组 `nums`，返回 **最长摆动子序列的长度**（子序列可不连续）。

**示例：**
```
输入：nums = [1,7,4,9,2,5]   输出：6（整个序列就是摆动：+6,-3,+5,-7,+3）
输入：nums = [1,17,5,10,13,15,10,5,16,8]  输出：7
```

**提示：** `1 <= nums.length <= 1000`，`0 <= nums[i] <= 10⁴`。

## 二、解答方法

### 方法一：贪心（统计转折点）

**思路：** 摆动序列只关心「转折点」。维护两个状态量 `up`、`down`：`up` = 以上升结尾的最长摆动长，`down` = 以下降结尾的最长。遍历：
- `nums[i] > nums[i-1]`：`up = down + 1`；
- `nums[i] < nums[i-1]`：`down = up + 1`；
- 相等则不变。
最终 `max(up, down)`。

:::::: code-group

```java [Java]
class Solution {
    public int wiggleMaxLength(int[] nums) {
        if (nums.length < 2) return nums.length;
        int up = 1, down = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > nums[i-1]) up = down + 1;
            else if (nums[i] < nums[i-1]) down = up + 1;
        }
        return Math.max(up, down);
    }
}
```

```python [Python]
class Solution:
    def wiggleMaxLength(self, nums: List[int]) -> int:
        if len(nums) < 2: return len(nums)
        up = down = 1
        for i in range(1, len(nums)):
            if nums[i] > nums[i-1]: up = down + 1
            elif nums[i] < nums[i-1]: down = up + 1
        return max(up, down)
```

```cpp [C++]
class Solution {
public:
    int wiggleMaxLength(vector<int>& nums) {
        if (nums.size()<2) return nums.size();
        int up=1, down=1;
        for(int i=1;i<nums.size();i++){
            if(nums[i]>nums[i-1]) up=down+1;
            else if(nums[i]<nums[i-1]) down=up+1;
        }
        return max(up,down);
    }
};
```

```go [Go]
func wiggleMaxLength(nums []int) int {
    if len(nums) < 2 { return len(nums) }
    up, down := 1, 1
    for i := 1; i < len(nums); i++ {
        if nums[i] > nums[i-1] { up = down+1 } else if nums[i] < nums[i-1] { down = up+1 }
    }
    if up > down { return up }; return down
}
```

```js [JavaScript]
var wiggleMaxLength = function (nums) {
    if (nums.length < 2) return nums.length;
    let up = 1, down = 1;
    for (let i=1; i<nums.length; i++) {
        if (nums[i] > nums[i-1]) up = down + 1;
        else if (nums[i] < nums[i-1]) down = up + 1;
    }
    return Math.max(up, down);
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(1)`。

## 三、总结

`up/down` 贪心是 `O(n)` 最优解（比 DP `O(n²)` 优）。本质：「消除连续单调段，只留转折点」。对比 `280/324 摆动排序`（要求重排而非子序列）。注意相等元素跳过（不更新状态）。本题是贪心+状态机的典范，常考。
