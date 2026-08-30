# [368. 最大整除子集](https://leetcode.cn/problems/largest-divisible-subset/)

## 一、题目描述

给定一个 **无重复** 正整数数组 `nums`，找出其中最大的子集，使得子集内 **任意两个元素** 都满足「一个能整除另一个」（即对任意 `i<j`，`nums[i] | nums[j]` 或反向）。返回该子集（可任意顺序）。

**示例：**
```
输入：nums = [1,2,3]   输出：[1,2] 或 [1,3]（1 能整除 2、3）
输入：nums = [1,2,4,8]  输出：[1,2,4,8]（链状整除）
```

**提示：** `1 <= nums.length <= 1000`，`1 <= nums[i] <= 2×10⁹`，所有 `nums[i]` 互不相同。

## 二、解答方法

### 方法一：排序 + DP（类似 LIS）

**思路：** 先排序。若 `a | b` 且 `b | c` 则 `a | c`，故排序后只需检查「前一个整除当前」。`dp[i]` = 以 `nums[i]` 结尾的最大整除子集长度，`prev[i]` 记录前驱。转移：对 `j<i`，若 `nums[i]%nums[j]==0` 则 `dp[i]=max(dp[i], dp[j]+1)`。最后回溯前驱得子集。

:::::: code-group

```java [Java]
class Solution {
    public List<Integer> largestDivisibleSubset(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        int[] dp = new int[n], prev = new int[n];
        Arrays.fill(dp, 1); Arrays.fill(prev, -1);
        int maxLen = 1, maxIdx = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] % nums[j] == 0 && dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1; prev[i] = j;
                }
            }
            if (dp[i] > maxLen) { maxLen = dp[i]; maxIdx = i; }
        }
        List<Integer> res = new ArrayList<>();
        while (maxIdx != -1) { res.add(0, nums[maxIdx]); maxIdx = prev[maxIdx]; }
        return res;
    }
}
```

```python [Python]
class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        nums.sort()
        n = len(nums)
        dp = [1]*n; prev = [-1]*n
        maxLen, maxIdx = 1, 0
        for i in range(n):
            for j in range(i):
                if nums[i] % nums[j] == 0 and dp[j]+1 > dp[i]:
                    dp[i] = dp[j]+1; prev[i] = j
            if dp[i] > maxLen: maxLen, maxIdx = dp[i], i
        res = []
        while maxIdx != -1: res.insert(0, nums[maxIdx]); maxIdx = prev[maxIdx]
        return res
```

```cpp [C++]
class Solution {
public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n=nums.size();
        vector<int> dp(n,1), prev(n,-1);
        int maxLen=1, maxIdx=0;
        for(int i=0;i<n;i++){
            for(int j=0;j<i;j++){
                if(nums[i]%nums[j]==0 && dp[j]+1>dp[i]){ dp[i]=dp[j]+1; prev[i]=j; }
            }
            if(dp[i]>maxLen){ maxLen=dp[i]; maxIdx=i; }
        }
        vector<int> res;
        for(int i=maxIdx;i!=-1;i=prev[i]) res.insert(res.begin(),nums[i]);
        return res;
    }
};
```

```go [Go]
func largestDivisibleSubset(nums []int) []int {
    sort.Ints(nums)
    n := len(nums)
    dp := make([]int, n); prev := make([]int, n)
    for i := range dp { dp[i] = 1; prev[i] = -1 }
    maxLen, maxIdx := 1, 0
    for i := 0; i < n; i++ {
        for j := 0; j < i; j++ {
            if nums[i]%nums[j] == 0 && dp[j]+1 > dp[i] { dp[i] = dp[j]+1; prev[i] = j }
        }
        if dp[i] > maxLen { maxLen, maxIdx = dp[i], i }
    }
    res := []int{}
    for i := maxIdx; i != -1; i = prev[i] { res = append([]int{nums[i]}, res...) }
    return res
}
```

```js [JavaScript]
var largestDivisibleSubset = function (nums) {
    nums.sort((a,b)=>a-b);
    const n = nums.length;
    const dp = new Array(n).fill(1), prev = new Array(n).fill(-1);
    let maxLen=1, maxIdx=0;
    for (let i=0;i<n;i++){
        for (let j=0;j<i;j++){
            if (nums[i]%nums[j]===0 && dp[j]+1>dp[i]){ dp[i]=dp[j]+1; prev[i]=j; }
        }
        if (dp[i]>maxLen){ maxLen=dp[i]; maxIdx=i; }
    }
    const res=[];
    for (let i=maxIdx;i!==-1;i=prev[i]) res.unshift(nums[i]);
    return res;
};
```

::::::

**复杂度：** 时间 `O(n²)`，空间 `O(n)`。

## 三、总结

排序后转 LIS 类 DP：关键性质「整除关系可传递，排序后只验前一个」。注意子集内「任意两两」整除，排序保证只需相邻验证（因整体有序，小整除大）。与 `300 LIS` 同构，但转移条件变「取模为 0」。回溯 `prev` 还原子集。同类：`646 最长数对链`（也需排序+DP）。
