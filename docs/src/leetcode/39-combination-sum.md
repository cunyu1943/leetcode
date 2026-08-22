# [39. 组合总和](https://leetcode.cn/problems/combination-sum/)



## 一、题目描述

给你一个 **无重复元素** 的整数数组 `candidates` 和一个目标整数 `target`，找出 `candidates` 中可以使数字和为目标数 `target` 的 **所有不同组合**，并以列表形式返回。

你可以按 **任意顺序** 返回这些组合。

`candidates` 中的 **同一个** 数字可以 **无限制重复被选取**。如果至少一个所选数字数量不同，则称两种组合不同。

**注意：**解集不能包含重复的组合。



**示例 1：**

```
输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]
解释：2 和 3 可以形成一组候选，2 + 2 + 3 = 7。注意 2 可以使用多次。7 也是一个候选。
```

**示例 2：**

```
输入：candidates = [2,3,5], target = 8
输出：[[2,2,2,2],[2,3,3],[3,5]]
```

**示例 3：**

```
输入：candidates = [2], target = 1
输出：[]
```

**提示：**

-   `1 <= candidates.length <= 30`
-   `2 <= candidates[i] <= 40`
-   `candidates` 的所有元素 **互不相同**
-   `1 <= target <= 40`



## 二、解答方法

### 2.1 方法一：回溯（DFS +  startIndex）

1. **思路**

每个数字可重复使用，因此递归时传入「当前处理下标 `start`」，下一层仍从 `start` 开始（允许重复选自己），从而自然避免产生重复组合（保证了组合内的升序顺序）：

-   从 `start` 遍历候选数字，若 `target == 0` 收集当前路径；
-   若 `target - candidates[i] < 0` 则剪枝（因数组有序，后面更大更不行）；
-   否则递归 `dfs(i, target - candidates[i])` 继续选（下标仍为 `i`，允许重复）。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private List<List<Integer>> res = new ArrayList<>();
    private List<Integer> path = new ArrayList<>();

    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        Arrays.sort(candidates);
        dfs(candidates, 0, target);
        return res;
    }

    private void dfs(int[] candidates, int start, int target) {
        if (target == 0) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            if (candidates[i] > target) break;
            path.add(candidates[i]);
            dfs(candidates, i, target - candidates[i]);
            path.remove(path.size() - 1);
        }
    }
}
```

```python [Python]
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        res = []
        path = []

        def dfs(start, target):
            if target == 0:
                res.append(path[:])
                return
            for i in range(start, len(candidates)):
                if candidates[i] > target:
                    break
                path.append(candidates[i])
                dfs(i, target - candidates[i])
                path.pop()

        dfs(0, target)
        return res
```

```go [Go]
func combinationSum(candidates []int, target int) [][]int {
    sort.Ints(candidates)
    res := [][]int{}
    path := []int{}
    var dfs func(int, int)
    dfs = func(start, target int) {
        if target == 0 {
            tmp := make([]int, len(path))
            copy(tmp, path)
            res = append(res, tmp)
            return
        }
        for i := start; i < len(candidates); i++ {
            if candidates[i] > target {
                break
            }
            path = append(path, candidates[i])
            dfs(i, target-candidates[i])
            path = path[:len(path)-1]
        }
    }
    dfs(0, target)
    return res
}
```

```c [C]
/* 回溯返回二维数组在 C 中需手动管理内存，推荐移植上述思路 */
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path;

    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        dfs(candidates, 0, target);
        return res;
    }

    void dfs(vector<int>& candidates, int start, int target) {
        if (target == 0) {
            res.push_back(path);
            return;
        }
        for (int i = start; i < candidates.size(); i++) {
            if (candidates[i] > target) break;
            path.push_back(candidates[i]);
            dfs(candidates, i, target - candidates[i]);
            path.pop_back();
        }
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    candidates.sort((a, b) => a - b);
    const res = [];
    const path = [];
    const dfs = (start, target) => {
        if (target === 0) {
            res.push([...path]);
            return;
        }
        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > target) break;
            path.push(candidates[i]);
            dfs(i, target - candidates[i]);
            path.pop();
        }
    };
    dfs(0, target);
    return res;
};
```

```ts [TypeScript]
function combinationSum(candidates: number[], target: number): number[][] {
    candidates.sort((a, b) => a - b);
    const res: number[][] = [];
    const path: number[] = [];
    const dfs = (start: number, target: number): void => {
        if (target === 0) {
            res.push([...path]);
            return;
        }
        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > target) break;
            path.push(candidates[i]);
            dfs(i, target - candidates[i]);
            path.pop();
        }
    };
    dfs(0, target);
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(2^t / sqrt(t))` 量级（`t = target`），组合指数级，但有剪枝。
- **空间复杂度**：`O(t / min)`，递归栈与路径长度，结果存储不计。

### 2.2 方法二：回溯（计算每个数字的使用次数）

1. **思路**

对每个数字 `candidates[i]`，枚举它使用 `k` 次（`0 * c <= target`），再递归处理下一个数字。逻辑等价，但用「次数循环」显式表达可重复选取。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private List<List<Integer>> res = new ArrayList<>();
    private List<Integer> path = new ArrayList<>();

    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        Arrays.sort(candidates);
        dfs(candidates, 0, target);
        return res;
    }

    private void dfs(int[] candidates, int idx, int target) {
        if (target == 0) {
            res.add(new ArrayList<>(path));
            return;
        }
        if (idx == candidates.length) return;
        // 不选 candidates[idx]
        dfs(candidates, idx + 1, target);
        // 选 candidates[idx]（可多次）
        if (target >= candidates[idx]) {
            path.add(candidates[idx]);
            dfs(candidates, idx, target - candidates[idx]);
            path.remove(path.size() - 1);
        }
    }
}
```

```python [Python]
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        res, path = [], []

        def dfs(idx, target):
            if target == 0:
                res.append(path[:])
                return
            if idx == len(candidates):
                return
            dfs(idx + 1, target)
            if target >= candidates[idx]:
                path.append(candidates[idx])
                dfs(idx, target - candidates[idx])
                path.pop()

        dfs(0, target)
        return res
```

```go [Go]
func combinationSum(candidates []int, target int) [][]int {
    sort.Ints(candidates)
    res := [][]int{}
    path := []int{}
    var dfs func(int, int)
    dfs = func(idx, target int) {
        if target == 0 {
            tmp := make([]int, len(path))
            copy(tmp, path)
            res = append(res, tmp)
            return
        }
        if idx == len(candidates) {
            return
        }
        dfs(idx+1, target)
        if target >= candidates[idx] {
            path = append(path, candidates[idx])
            dfs(idx, target-candidates[idx])
            path = path[:len(path)-1]
        }
    }
    dfs(0, target)
    return res
}
```

```c [C]
/* 同上，C 需手动管理动态数组，略去完整实现 */
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path;
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        dfs(candidates, 0, target);
        return res;
    }
    void dfs(vector<int>& candidates, int idx, int target) {
        if (target == 0) { res.push_back(path); return; }
        if (idx == candidates.size()) return;
        dfs(candidates, idx + 1, target);
        if (target >= candidates[idx]) {
            path.push_back(candidates[idx]);
            dfs(candidates, idx, target - candidates[idx]);
            path.pop_back();
        }
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    candidates.sort((a, b) => a - b);
    const res = [], path = [];
    const dfs = (idx, target) => {
        if (target === 0) { res.push([...path]); return; }
        if (idx === candidates.length) return;
        dfs(idx + 1, target);
        if (target >= candidates[idx]) {
            path.push(candidates[idx]);
            dfs(idx, target - candidates[idx]);
            path.pop();
        }
    };
    dfs(0, target);
    return res;
};
```

```ts [TypeScript]
function combinationSum(candidates: number[], target: number): number[][] {
    candidates.sort((a, b) => a - b);
    const res: number[][] = [], path: number[] = [];
    const dfs = (idx: number, target: number): void => {
        if (target === 0) { res.push([...path]); return; }
        if (idx === candidates.length) return;
        dfs(idx + 1, target);
        if (target >= candidates[idx]) {
            path.push(candidates[idx]);
            dfs(idx, target - candidates[idx]);
            path.pop();
        }
    };
    dfs(0, target);
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：与法一相同，指数级。
- **空间复杂度**：`O(t / min)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯（DFS +  startIndex） | `O(2^t / sqrt(t))` | `O(t / min)` | 暴力枚举所有可能 |
| 回溯（计算每个数字的使用次数） | `—` | `O(t / min)` | 暴力枚举所有可能 |

