# [325. 和等于 k 的最长子数组长度](https://leetcode.cn/problems/maximum-size-subarray-sum-equals-k/) [🔒 会员题]

## 一、题目描述

给定一个整数数组 `nums` 和整数 `k`，找到 **和等于 k 的最长连续子数组的长度**。若不存在返回 0。

**示例：**
```
输入：nums = [1,-1,5,-2,3], k = 3   输出：4（子数组 [1,-1,5,-2] 和为 3，长度 4）
输入：nums = [-2,-1,2,1], k = 1      输出：2（[-1,2] 或 [2,1]）
```

**提示：** `1 <= nums.length <= 2×10⁵`，`-10⁴ <= nums[i] <= 10⁴`，`-10⁹ <= k <= 10⁹`。

## 二、解答方法

### 方法一：前缀和 + 哈希表

**思路：** 前缀和 `pre[i]`，子数组 `nums[j..i]` 和为 `pre[i]-pre[j-1]`。要找 `pre[i]-pre[j]=k` 即 `pre[j]=pre[i]-k` 且 `j` 最小（长度最大）。用 `HashMap<前缀和, 最早出现下标>` 边遍历边查。

:::::: code-group

```java [Java]
class Solution {
    public int maxSubArrayLen(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, -1);                  // 空前缀
        int pre = 0, ans = 0;
        for (int i = 0; i < nums.length; i++) {
            pre += nums[i];
            if (map.containsKey(pre - k)) ans = Math.max(ans, i - map.get(pre - k));
            map.putIfAbsent(pre, i);     // 只记录最早下标
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def maxSubArrayLen(self, nums: List[int], k: int) -> int:
        seen = {0: -1}; pre = 0; ans = 0
        for i, x in enumerate(nums):
            pre += x
            if pre - k in seen: ans = max(ans, i - seen[pre-k])
            seen.setdefault(pre, i)
        return ans
```

```cpp [C++]
class Solution {
public:
    int maxSubArrayLen(vector<int>& nums, int k) {
        unordered_map<int,int> map; map[0]=-1;
        int pre=0, ans=0;
        for (int i=0;i<nums.size();i++){
            pre += nums[i];
            if (map.count(pre-k)) ans = max(ans, i-map[pre-k]);
            if (!map.count(pre)) map[pre]=i;
        }
        return ans;
    }
};
```

```go [Go]
func maxSubArrayLen(nums []int, k int) int {
    seen := map[int]int{0: -1}
    pre, ans := 0, 0
    for i, x := range nums {
        pre += x
        if j, ok := seen[pre-k]; ok {
            if i-j > ans { ans = i-j }
        }
        if _, ok := seen[pre]; !ok { seen[pre] = i }
    }
    return ans
}
```

```js [JavaScript]
var maxSubArrayLen = function (nums, k) {
    const seen = new Map([[0, -1]]); let pre = 0, ans = 0;
    for (let i=0;i<nums.length;i++) {
        pre += nums[i];
        if (seen.has(pre-k)) ans = Math.max(ans, i - seen.get(pre-k));
        if (!seen.has(pre)) seen.set(pre, i);
    }
    return ans;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(n)`。

## 三、总结

前缀和 + 哈希是「子数组和为 k 的最值」标准解法。务必：①`map.put(0,-1)` 处理从头开始的子数组；②**只存最早下标**以最大化长度；③先查后插（避免用自己减自己得 0）。同类：`560 和为 k 的子数组`（求个数）、`523 连续的子数组和`（倍数）。
