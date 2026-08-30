# [216. 组合总和 III](https://leetcode.cn/problems/combination-sum-iii/)



## 一、题目描述

找出所有 **相加之和为 `n`** 的 **`k` 个数的组合**，且满足下列条件：

-   只使用数字 `1` 到 `9`
-   每个数字 **最多使用一次**

返回 **所有可能的有效组合的列表** 。该列表不能包含相同的组合两次，组合可以以任何顺序返回。



**示例 1：**

```
输入：k = 3, n = 7
输出：[[1,2,4]]
解释：1 + 2 + 4 = 7，没有其他符合的组合了。
```

**示例 2：**

```
输入：k = 3, n = 9
输出：[[1,2,6],[1,3,5],[2,3,4]]
解释：1+2+6=9，1+3+5=9，2+3+4=9。
```

**示例 3：**

```
输入：k = 4, n = 1
输出：[]
解释：不存在有效的组合。在 [1,9] 范围内使用 4 个不同的数字，我们可以得到的最小和是 1+2+3+4 = 10，大于 1。
```

**提示：**

-   `2 <= k <= 9`
-   `1 <= n <= 60`



## 二、解答方法

### 2.1 方法一：回溯 + 剪枝

1. **思路**

回溯枚举：从 `start` 开始依次尝试数字 `1~9`，加入 `path`，剩余目标和 `n - i`，剩余个数 `k - 1`。终止条件：`k == 0` 且 `n == 0` 时把 `path` 加入结果。

剪枝：
- 当前数字 `i > n` 时，后续数字更大，可直接 `break`；
- 循环上界优化为 `min(9, n)`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    private List<List<Integer>> res = new ArrayList<>();
    private List<Integer> path = new ArrayList<>();

    public List<List<Integer>> combinationSum3(int k, int n) {
        dfs(k, n, 1);
        return res;
    }

    private void dfs(int k, int n, int start) {
        if (k == 0 && n == 0) {
            res.add(new ArrayList<>(path));
            return;
        }
        if (k == 0 || n <= 0) return;
        for (int i = start; i <= 9; i++) {
            if (i > n) break;      // 剪枝
            path.add(i);
            dfs(k - 1, n - i, i + 1);
            path.remove(path.size() - 1);
        }
    }
}
```

```python [Python]
class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        res, path = [], []

        def dfs(k, n, start):
            if k == 0 and n == 0:
                res.append(path[:])
                return
            if k == 0 or n <= 0:
                return
            for i in range(start, 10):
                if i > n:
                    break
                path.append(i)
                dfs(k - 1, n - i, i + 1)
                path.pop()

        dfs(k, n, 1)
        return res
```

```go [Go]
func combinationSum3(k int, n int) [][]int {
    res := [][]int{}
    path := []int{}
    var dfs func(k, n, start int)
    dfs = func(k, n, start int) {
        if k == 0 && n == 0 {
            tmp := make([]int, len(path))
            copy(tmp, path)
            res = append(res, tmp)
            return
        }
        if k == 0 || n <= 0 {
            return
        }
        for i := start; i <= 9; i++ {
            if i > n {
                break
            }
            path = append(path, i)
            dfs(k-1, n-i, i+1)
            path = path[:len(path)-1]
        }
    }
    dfs(k, n, 1)
    return res
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> combinationSum3(int k, int n) {
        vector<vector<int>> res;
        vector<int> path;
        function<void(int,int,int)> dfs = [&](int k, int n, int start) {
            if (k == 0 && n == 0) {
                res.push_back(path);
                return;
            }
            if (k == 0 || n <= 0) return;
            for (int i = start; i <= 9; i++) {
                if (i > n) break;
                path.push_back(i);
                dfs(k - 1, n - i, i + 1);
                path.pop_back();
            }
        };
        dfs(k, n, 1);
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
    const res = [], path = [];
    const dfs = (k, n, start) => {
        if (k === 0 && n === 0) {
            res.push([...path]);
            return;
        }
        if (k === 0 || n <= 0) return;
        for (let i = start; i <= 9; i++) {
            if (i > n) break;
            path.push(i);
            dfs(k - 1, n - i, i + 1);
            path.pop();
        }
    };
    dfs(k, n, 1);
    return res;
};
```

```ts [TypeScript]
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
function combinationSum3(k: number, n: number): number[][] {
    const res: number[][] = [], path: number[] = [];
    const dfs = (k: number, n: number, start: number): void => {
        if (k === 0 && n === 0) {
            res.push([...path]);
            return;
        }
        if (k === 0 || n <= 0) return;
        for (let i = start; i <= 9; i++) {
            if (i > n) break;
            path.push(i);
            dfs(k - 1, n - i, i + 1);
            path.pop();
        }
    };
    dfs(k, n, 1);
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(C(9,k) × k)`，即从 9 个数中选 k 个的组合数。
- **空间复杂度**：`O(k)`（递归栈 + path）。

## 三、总结

本题是 **组合型回溯** 的经典模板（与 77 题「组合」同源）：

```
dfs(剩余个数, 剩余目标, 起始下标)
  ├─ 终止：个数与目标同时归零 → 收集
  └─ 枚举 i ∈ [start, 9]：做选择 → 递归 → 撤销选择
```

关键点：
- 用 `start` 参数保证 **递增选取**，天然去重（避免 `[1,2,4]` 与 `[2,1,4]` 重复）；
- `i + 1` 而非 `i`，保证每个数字 **最多用一次**（区别于 39 题可重复选取用 `i`）；
- `i > n` 时 `break` 剪枝，因为后续数字更大。
