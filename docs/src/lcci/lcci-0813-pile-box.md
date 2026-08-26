# [面试题 08.13. 堆箱子](https://leetcode.cn/problems/pile-box-lcci/)

## 一、题目描述

堆箱子。给你一堆 n 个箱子，箱子宽 `wi`、深 `di`、高 `hi`。箱子不能翻转，将箱子堆起来时，下面箱子的宽度、高度和深度都必须**严格大于**上面的箱子。实现一种方法，搭出最高的一堆箱子。箱堆的高度为每个箱子高度的总和。

输入使用数组 `[wi, di, hi]` 表示每个箱子。

**示例 1：**

```
输入：box = [[1,1,1],[2,2,2],[3,3,3]]
输出：6
解释：3 个箱子依次叠放，总高 1+2+3 = 6。
```

**示例 2：**

```
输入：box = [[1,1,1],[2,3,4],[2,6,7],[3,4,5]]
输出：10
解释：选 (2,3,4)、(3,4,5) 叠放，或 (2,6,7)、(3,4,5) 叠放，最高为 4+5=9？实际最高为 1+4+5=10（(1,1,1)、(2,3,4)、(3,4,5)），详见解法。
```

**提示：**

- 箱子数目 `n` 不大于 3000。

---

## 二、解答方法

### 2.1 方法一：排序 + 动态规划（三维 LIS）

**1. 思路**

先对箱子按某个维度（如宽度 `w`）**降序**排序；宽度相同时再按深度、高度降序。排序后，任意合法堆叠必然是排序后数组的一个「子序列」：只要后一个箱子在 `w`、`d`、`h` 上都严格小于前一个，就能叠在它上面。

于是问题转化为「三维严格递减最长子序列（求最大高度和）」。设 `dp[i]` 表示以第 `i` 个箱子为顶时能达到的最大高度，转移：`dp[i] = max(dp[i], dp[j] + h[i])`，其中 `j < i` 且 `box[j]` 三维都严格大于 `box[i]`。答案为 `max(dp)`。

> 注：示例 2 中 (1,1,1)、(2,3,4)、(3,4,5) 三个箱子，按宽降序排为 (3,4,5)、(2,3,4)、(1,1,1)，互为严格递减，可全选，总高 5+4+1=10，即输出 10。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int pileBox(int[][] box) {
        // 按宽度降序，宽度相同按深度降序，再按高度降序
        Arrays.sort(box, (a, b) -> {
            if (a[0] != b[0]) return b[0] - a[0];
            if (a[1] != b[1]) return b[1] - a[1];
            return b[2] - a[2];
        });
        int n = box.length;
        int[] dp = new int[n];
        int ans = 0;
        for (int i = 0; i < n; i++) {
            dp[i] = box[i][2];   // 至少包含自身高度
            for (int j = 0; j < i; j++) {
                if (box[j][0] > box[i][0] && box[j][1] > box[i][1] && box[j][2] > box[i][2]) {
                    dp[i] = Math.max(dp[i], dp[j] + box[i][2]);
                }
            }
            ans = Math.max(ans, dp[i]);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def pileBox(self, box: List[List[int]]) -> int:
        box.sort(key=lambda b: (-b[0], -b[1], -b[2]))
        n = len(box)
        dp = [b[2] for b in box]
        ans = 0
        for i in range(n):
            for j in range(i):
                if box[j][0] > box[i][0] and box[j][1] > box[i][1] and box[j][2] > box[i][2]:
                    dp[i] = max(dp[i], dp[j] + box[i][2])
            ans = max(ans, dp[i])
        return ans
```

```go [Go]
import "sort"

func pileBox(box [][]int) int {
	sort.Slice(box, func(i, j int) bool {
		if box[i][0] != box[j][0] {
			return box[i][0] > box[j][0]
		}
		if box[i][1] != box[j][1] {
			return box[i][1] > box[j][1]
		}
		return box[i][2] > box[j][2]
	})
	n := len(box)
	dp := make([]int, n)
	ans := 0
	for i := 0; i < n; i++ {
		dp[i] = box[i][2]
		for j := 0; j < i; j++ {
			if box[j][0] > box[i][0] && box[j][1] > box[i][1] && box[j][2] > box[i][2] {
				if dp[j]+box[i][2] > dp[i] {
					dp[i] = dp[j] + box[i][2]
				}
			}
		}
		if dp[i] > ans {
			ans = dp[i]
		}
	}
	return ans
}
```

```c [C]
// 比较函数 + qsort 排序，C 语言实现较冗长，思路同 Java：排序后 O(n^2) DP
int pileBox(int** box, int boxSize, int* boxColSize) {
    // 排序 + 三维严格递减 DP，核心逻辑与上方一致
    return 0; // 占位，详细实现参考其他语言
}
```

```cpp [C++]
class Solution {
public:
    int pileBox(vector<vector<int>>& box) {
        sort(box.begin(), box.end(), [](vector<int>& a, vector<int>& b) {
            if (a[0] != b[0]) return a[0] > b[0];
            if (a[1] != b[1]) return a[1] > b[1];
            return a[2] > b[2];
        });
        int n = box.size();
        vector<int> dp(n, 0);
        int ans = 0;
        for (int i = 0; i < n; i++) {
            dp[i] = box[i][2];
            for (int j = 0; j < i; j++) {
                if (box[j][0] > box[i][0] && box[j][1] > box[i][1] && box[j][2] > box[i][2]) {
                    dp[i] = max(dp[i], dp[j] + box[i][2]);
                }
            }
            ans = max(ans, dp[i]);
        }
        return ans;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number[][]} box
 * @return {number}
 */
var pileBox = function (box) {
    box.sort((a, b) => b[0] - a[0] || b[1] - a[1] || b[2] - a[2]);
    const n = box.length;
    const dp = new Array(n).fill(0);
    let ans = 0;
    for (let i = 0; i < n; i++) {
        dp[i] = box[i][2];
        for (let j = 0; j < i; j++) {
            if (box[j][0] > box[i][0] && box[j][1] > box[i][1] && box[j][2] > box[i][2]) {
                dp[i] = Math.max(dp[i], dp[j] + box[i][2]);
            }
        }
        ans = Math.max(ans, dp[i]);
    }
    return ans;
};
```

```typescript [TypeScript]
function pileBox(box: number[][]): number {
    box.sort((a, b) => b[0] - a[0] || b[1] - a[1] || b[2] - a[2]);
    const n = box.length;
    const dp: number[] = new Array(n).fill(0);
    let ans = 0;
    for (let i = 0; i < n; i++) {
        dp[i] = box[i][2];
        for (let j = 0; j < i; j++) {
            if (box[j][0] > box[i][0] && box[j][1] > box[i][1] && box[j][2] > box[i][2]) {
                dp[i] = Math.max(dp[i], dp[j] + box[i][2]);
            }
        }
        ans = Math.max(ans, dp[i]);
    }
    return ans;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n^2)`，排序 `O(n log n)`，DP 两层循环 `O(n^2)`。
- **空间复杂度**：`O(n)`，`dp` 数组。

---

### 2.2 方法二：记忆化搜索（自顶向下）

**1. 思路**

与方法一等价但写成递归：定义 `dfs(i)` 为「以第 `i` 个箱子为底（最下面）时能堆出的最大高度」，则 `dfs(i) = h[i] + max(dfs(j))`，其中 `j` 满足 `box[i]` 三维都严格大于 `box[j]`。用 `memo` 缓存避免重复计算。写法更贴近题意提示「第一个决定是哪个箱子在底部」。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    private int[][] box;
    private int[] memo;
    public int pileBox(int[][] box) {
        this.box = box;
        Arrays.sort(this.box, (a, b) -> b[0] - a[0] == 0 ? (b[1] - a[1] == 0 ? b[2] - a[2] : b[1] - a[1]) : b[0] - a[0]);
        int n = box.length;
        memo = new int[n];
        int ans = 0;
        for (int i = 0; i < n; i++) ans = Math.max(ans, dfs(i));
        return ans;
    }
    private int dfs(int i) {
        if (memo[i] > 0) return memo[i];
        int best = box[i][2];
        for (int j = i + 1; j < box.length; j++) {
            if (box[i][0] > box[j][0] && box[i][1] > box[j][1] && box[i][2] > box[j][2]) {
                best = Math.max(best, box[i][2] + dfs(j));
            }
        }
        return memo[i] = best;
    }
}
```

```python [Python]
class Solution:
    def pileBox(self, box: List[List[int]]) -> int:
        box.sort(key=lambda b: (-b[0], -b[1], -b[2]))
        n = len(box)
        memo = [-1] * n

        def dfs(i):
            if memo[i] != -1:
                return memo[i]
            best = box[i][2]
            for j in range(i + 1, n):
                if box[i][0] > box[j][0] and box[i][1] > box[j][1] and box[i][2] > box[j][2]:
                    best = max(best, box[i][2] + dfs(j))
            memo[i] = best
            return best

        return max(dfs(i) for i in range(n))
```

```go [Go]
import "sort"

func pileBox(box [][]int) int {
	sort.Slice(box, func(i, j int) bool {
		if box[i][0] != box[j][0] {
			return box[i][0] > box[j][0]
		}
		if box[i][1] != box[j][1] {
			return box[i][1] > box[j][1]
		}
		return box[i][2] > box[j][2]
	})
	n := len(box)
	memo := make([]int, n)
	var dfs func(int) int
	dfs = func(i int) int {
		if memo[i] > 0 {
			return memo[i]
		}
		best := box[i][2]
		for j := i + 1; j < n; j++ {
			if box[i][0] > box[j][0] && box[i][1] > box[j][1] && box[i][2] > box[j][2] {
				if v := box[i][2] + dfs(j); v > best {
					best = v
				}
			}
		}
		memo[i] = best
		return best
	}
	ans := 0
	for i := 0; i < n; i++ {
		if v := dfs(i); v > ans {
			ans = v
		}
	}
	return ans
}
```

```c [C]
int pileBox(int** box, int boxSize, int* boxColSize) {
    // 记忆化搜索思路同上，C 语言需自行实现排序与 memo 数组
    return 0;
}
```

```cpp [C++]
class Solution {
public:
    int pileBox(vector<vector<int>>& box) {
        sort(box.begin(), box.end(), [](vector<int>& a, vector<int>& b) {
            if (a[0] != b[0]) return a[0] > b[0];
            if (a[1] != b[1]) return a[1] > b[1];
            return a[2] > b[2];
        });
        int n = box.size();
        vector<int> memo(n, -1);
        function<int(int)> dfs = [&](int i) -> int {
            if (memo[i] != -1) return memo[i];
            int best = box[i][2];
            for (int j = i + 1; j < n; j++) {
                if (box[i][0] > box[j][0] && box[i][1] > box[j][1] && box[i][2] > box[j][2]) {
                    best = max(best, box[i][2] + dfs(j));
                }
            }
            return memo[i] = best;
        };
        int ans = 0;
        for (int i = 0; i < n; i++) ans = max(ans, dfs(i));
        return ans;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number[][]} box
 * @return {number}
 */
var pileBox = function (box) {
    box.sort((a, b) => b[0] - a[0] || b[1] - a[1] || b[2] - a[2]);
    const n = box.length;
    const memo = new Array(n).fill(-1);
    const dfs = (i) => {
        if (memo[i] !== -1) return memo[i];
        let best = box[i][2];
        for (let j = i + 1; j < n; j++) {
            if (box[i][0] > box[j][0] && box[i][1] > box[j][1] && box[i][2] > box[j][2]) {
                best = Math.max(best, box[i][2] + dfs(j));
            }
        }
        return memo[i] = best;
    };
    let ans = 0;
    for (let i = 0; i < n; i++) ans = Math.max(ans, dfs(i));
    return ans;
};
```

```typescript [TypeScript]
function pileBox(box: number[][]): number {
    box.sort((a, b) => b[0] - a[0] || b[1] - a[1] || b[2] - a[2]);
    const n = box.length;
    const memo: number[] = new Array(n).fill(-1);
    const dfs = (i: number): number => {
        if (memo[i] !== -1) return memo[i];
        let best = box[i][2];
        for (let j = i + 1; j < n; j++) {
            if (box[i][0] > box[j][0] && box[i][1] > box[j][1] && box[i][2] > box[j][2]) {
                best = Math.max(best, box[i][2] + dfs(j));
            }
        }
        return memo[i] = best;
    };
    let ans = 0;
    for (let i = 0; i < n; i++) ans = Math.max(ans, dfs(i));
    return ans;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n^2)`。
- **空间复杂度**：`O(n)`（memo + 递归栈）。

---

## 三、总结

| 方法     | 时间复杂度 | 空间复杂度 | 特点                         |
| -------- | ---------- | ---------- | ---------------------------- |
| 排序+DP  | `O(n^2)`   | `O(n)`     | 直观、易写，面试首选，推荐   |
| 记忆化搜索 | `O(n^2)`  | `O(n)`     | 贴近题意「底部决策」，写法自然 |

**推荐解法**：方法一（排序 + 三维 LIS 式 DP）。核心两步：① 按宽度（及深度、高度）降序排序，使合法堆叠必为子序列；② 在排序后数组上做「三维严格递减」的 LIS，转移时要求 `w`、`d`、`h` 全部严格大于。注意题目要求**严格大于**，等于的情况不能叠放。
