# [LCR 093. 最长的斐波那契子序列的长度](https://leetcode.cn/problems/Q91FMA/)



## 一、题目描述

如果序列 `X_1, X_2, ..., X_n` 满足下列条件，就说它是 *斐波那契式* 的：

- `n >= 3`
- 对于所有 `i + 2 <= n`，都有 `X_i + X_{i+1} = X_{i+2}`

给定一个 **严格递增** 的正整数数组形成序列 `arr` ，找到 `arr` 中最长的斐波那契式的子序列的长度。如果一个不存在，返回 `0` 。

（回想一下，子序列是从原序列 `arr` 中派生出来的，它从 `arr` 中删掉任意数量的元素（也可以不删），而不改变其余元素的顺序。例如，`[3, 5, 8]` 是 `[3, 4, 5, 6, 7, 8]` 的一个子序列。）



**示例 1：**

```
输入: arr = [1,2,3,4,5,6,7,8]
输出: 5
解释: 最长的斐波那契式子序列为 [1,2,3,5,8] 。
```

**示例 2：**

```
输入: arr = [1,3,7,11,12,14,18]
输出: 3
解释: 最长的斐波那契式子序列有 [1,11,12]、[3,11,14] 以及 [7,11,18] 。
```

**提示：**

- `3 <= arr.length <= 1000`
- `1 <= arr[i] < arr[i + 1] <= 10⁹`



## 二、解答方法

### 2.1 方法一：动态规划 + 哈希表

1. **思路**

设 `dp[j][k]` 表示「以 `arr[j]`、`arr[k]`（j < k）为最后两项的斐波那契子序列的最大长度」。

- 若存在下标 `i` 使 `arr[i] + arr[j] == arr[k]`（即 `arr[i] = arr[k] - arr[j]`），则 `dp[j][k] = dp[i][j] + 1`；
- 否则 `dp[j][k] = 2`（至少两项，作为起始）。

用哈希表 `idx[value] = 下标` 快速查找 `i`。答案取所有 `dp[j][k] >= 3` 的最大值。

时间 `O(n²)`，空间 `O(n²)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int lenLongestFibSubseq(int[] arr) {
        int n = arr.length;
        Map<Integer, Integer> idx = new HashMap<>();
        for (int i = 0; i < n; i++) idx.put(arr[i], i);
        int[][] dp = new int[n][n];
        int ans = 0;
        for (int k = 0; k < n; k++) {
            for (int j = 0; j < k; j++) {
                int need = arr[k] - arr[j];
                Integer i = idx.get(need);
                if (i != null && i < j) {
                    dp[j][k] = dp[i][j] + 1;
                    ans = Math.max(ans, dp[j][k]);
                } else {
                    dp[j][k] = 2;
                }
            }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def lenLongestFibSubseq(self, arr: List[int]) -> int:
        n = len(arr)
        idx = {v: i for i, v in enumerate(arr)}
        dp = [[0] * n for _ in range(n)]
        ans = 0
        for k in range(n):
            for j in range(k):
                need = arr[k] - arr[j]
                i = idx.get(need, -1)
                if i != -1 and i < j:
                    dp[j][k] = dp[i][j] + 1
                    ans = max(ans, dp[j][k])
                else:
                    dp[j][k] = 2
        return ans
```

```cpp [C++]
class Solution {
public:
    int lenLongestFibSubseq(vector<int>& arr) {
        int n = arr.size();
        unordered_map<int, int> idx;
        for (int i = 0; i < n; i++) idx[arr[i]] = i;
        vector<vector<int>> dp(n, vector<int>(n, 0));
        int ans = 0;
        for (int k = 0; k < n; k++) {
            for (int j = 0; j < k; j++) {
                int need = arr[k] - arr[j];
                auto it = idx.find(need);
                if (it != idx.end() && it->second < j) {
                    dp[j][k] = dp[it->second][j] + 1;
                    ans = max(ans, dp[j][k]);
                } else {
                    dp[j][k] = 2;
                }
            }
        }
        return ans;
    }
};
```

```go [Go]
func lenLongestFibSubseq(arr []int) int {
    n := len(arr)
    idx := map[int]int{}
    for i, v := range arr {
        idx[v] = i
    }
    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, n)
    }
    ans := 0
    for k := 0; k < n; k++ {
        for j := 0; j < k; j++ {
            need := arr[k] - arr[j]
            if i, ok := idx[need]; ok && i < j {
                dp[j][k] = dp[i][j] + 1
                if dp[j][k] > ans {
                    ans = dp[j][k]
                }
            } else {
                dp[j][k] = 2
            }
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number[]} arr
 * @return {number}
 */
var lenLongestFibSubseq = function (arr) {
    const n = arr.length;
    const idx = new Map();
    for (let i = 0; i < n; i++) idx.set(arr[i], i);
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));
    let ans = 0;
    for (let k = 0; k < n; k++) {
        for (let j = 0; j < k; j++) {
            const need = arr[k] - arr[j];
            const i = idx.get(need);
            if (i !== undefined && i < j) {
                dp[j][k] = dp[i][j] + 1;
                ans = Math.max(ans, dp[j][k]);
            } else {
                dp[j][k] = 2;
            }
        }
    }
    return ans;
};
```

```c [C]
#include <stdlib.h>

int lenLongestFibSubseq(int* arr, int arrSize) {
    // 用「值 → 下标」哈希（开放寻址）
    int* key = (int*)malloc(20005 * sizeof(int));
    int* val = (int*)malloc(20005 * sizeof(int));
    for (int i = 0; i < 20005; i++) key[i] = -1;
    for (int i = 0; i < arrSize; i++) {
        int h = (arr[i] * 31) % 20005;
        while (key[h] != -1 && key[h] != arr[i]) h = (h + 1) % 20005;
        key[h] = arr[i];
        val[h] = i;
    }
    int** dp = (int**)malloc(arrSize * sizeof(int*));
    for (int i = 0; i < arrSize; i++) dp[i] = (int*)calloc(arrSize, sizeof(int));
    int ans = 0;
    for (int k = 0; k < arrSize; k++) {
        for (int j = 0; j < k; j++) {
            int need = arr[k] - arr[j];
            int h = (need * 31) % 20005;
            while (key[h] != -1 && key[h] != need) h = (h + 1) % 20005;
            if (key[h] == need && val[h] < j) {
                dp[j][k] = dp[val[h]][j] + 1;
                if (dp[j][k] > ans) ans = dp[j][k];
            } else {
                dp[j][k] = 2;
            }
        }
    }
    for (int i = 0; i < arrSize; i++) free(dp[i]);
    free(dp);
    free(key);
    free(val);
    return ans;
}
```

```ts [TypeScript]
function lenLongestFibSubseq(arr: number[]): number {
    const n = arr.length;
    const idx = new Map<number, number>();
    for (let i = 0; i < n; i++) idx.set(arr[i], i);
    const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
    let ans = 0;
    for (let k = 0; k < n; k++) {
        for (let j = 0; j < k; j++) {
            const need = arr[k] - arr[j];
            const i = idx.get(need);
            if (i !== undefined && i < j) {
                dp[j][k] = dp[i][j] + 1;
                ans = Math.max(ans, dp[j][k]);
            } else {
                dp[j][k] = 2;
            }
        }
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`。
- **空间复杂度**：`O(n²)`，DP 表。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| DP + 哈希 | `O(n²)` | `O(n²)` | 标准解法 |

关键是把斐波那契子序列的状态定义为「最后两项下标 (j, k)」，由 `arr[k] - arr[j]` 反查第三项是否存在，即可递推长度。数组严格递增保证了值到下标的唯一映射。

