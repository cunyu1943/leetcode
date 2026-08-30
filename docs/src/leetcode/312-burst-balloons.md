# [312. 戳气球](https://leetcode.cn/problems/burst-balloons/)

## 一、题目描述

有 `n` 个气球，下标 `0 ~ n-1`，每个气球上有数字 `nums[i]`。戳破第 `i` 个气球可获得 `nums[left] * nums[i] * nums[right]` 硬币（`left`、`right` 为相邻未戳破的气球）。边界外视作数字 1。求最多可得多少硬币。

**示例：**
```
输入：nums = [3,1,5,8]   输出：167
解释：戳 1→5→3→8：3*1*5=15, 3*5*8=120, 3*8*1=24, 1*3*1=3 → 15+120+24+3=167（最优顺序不同）
```

**提示：** `n == nums.length`, `1 <= n <= 300`, `0 <= nums[i] <= 100`。

## 二、解答方法

### 方法一：区间 DP（逆向思考）

**思路：** 直接想「先戳谁」难处理邻居。逆向：把过程看作「最后戳破的气球」——在开区间 `(i, j)` 内，最后戳破 `k` 时，`i` 和 `j` 是当时仅有的左右邻居（已先被戳完）。
`dp[i][j]` = 戳破 `(i,j)` 开区间内所有气球的最大值 = `max(dp[i][k] + dp[k][j] + nums[i]*nums[k]*nums[j])`。首尾加虚拟气球 `nums[-1]=nums[n]=1`。

:::::: code-group

```java [Java]
class Solution {
    public int maxCoins(int[] nums) {
        int n = nums.length;
        int[] a = new int[n + 2];
        a[0] = a[n + 1] = 1;
        System.arraycopy(nums, 0, a, 1, n);
        int[][] dp = new int[n + 2][n + 2];
        for (int len = 2; len <= n + 1; len++)            // 区间长度 i..j 间距
            for (int i = 0; i + len <= n + 1; i++) {
                int j = i + len;
                for (int k = i + 1; k < j; k++)
                    dp[i][j] = Math.max(dp[i][j], dp[i][k] + dp[k][j] + a[i] * a[k] * a[j]);
            }
        return dp[0][n + 1];
    }
}
```

```python [Python]
class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        a = [1] + nums + [1]
        n = len(a)
        dp = [[0]*n for _ in range(n)]
        for length in range(2, n):
            for i in range(n - length):
                j = i + length
                for k in range(i+1, j):
                    dp[i][j] = max(dp[i][j], dp[i][k] + dp[k][j] + a[i]*a[k]*a[j])
        return dp[0][n-1]
```

```cpp [C++]
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        vector<int> a(n+2); a[0]=a[n+1]=1;
        for (int i=0;i<n;i++) a[i+1]=nums[i];
        vector<vector<int>> dp(n+2, vector<int>(n+2,0));
        for (int len=2;len<=n+1;len++)
            for (int i=0;i+len<=n+1;i++){
                int j=i+len;
                for (int k=i+1;k<j;k++)
                    dp[i][j]=max(dp[i][j], dp[i][k]+dp[k][j]+a[i]*a[k]*a[j]);
            }
        return dp[0][n+1];
    }
};
```

```go [Go]
func maxCoins(nums []int) int {
    n := len(nums)
    a := make([]int, n+2)
    a[0], a[n+1] = 1, 1
    for i := 0; i < n; i++ { a[i+1] = nums[i] }
    dp := make([][]int, n+2)
    for i := range dp { dp[i] = make([]int, n+2) }
    for length := 2; length <= n+1; length++ {
        for i := 0; i+length <= n+1; i++ {
            j := i + length
            for k := i+1; k < j; k++ {
                if v := dp[i][k] + dp[k][j] + a[i]*a[k]*a[j]; v > dp[i][j] { dp[i][j] = v }
            }
        }
    }
    return dp[0][n+1]
}
```

```js [JavaScript]
var maxCoins = function (nums) {
    const a = [1, ...nums, 1];
    const n = a.length;
    const dp = Array.from({length: n}, () => new Array(n).fill(0));
    for (let length = 2; length < n; length++) {
        for (let i = 0; i+length < n; i++) {
            const j = i + length;
            for (let k = i+1; k < j; k++)
                dp[i][j] = Math.max(dp[i][j], dp[i][k] + dp[k][j] + a[i]*a[k]*a[j]);
        }
    }
    return dp[0][n-1];
};
```

::::::

**复杂度：** 时间 `O(n³)`，空间 `O(n²)`。

## 三、总结

区间 DP 经典。关键是「逆向思维」：把「戳破」转为「最后被戳破的那个气球」，从而左右邻居固定为区间边界 `i, j`。这是 `1000 最小公共祖先` 系列外的经典 DP，同思路延伸有 `873 最长斐波那契子序列`、`1022`。务必记住开区间边界填充 1 的 trick。
