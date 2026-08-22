# [40. 组合总和 II](https://leetcode.cn/problems/combination-sum-ii/)



## 一、题目描述

给定一个候选人编号的集合 `candidates` 和一个目标数 `target`，找出 `candidates` 中所有可以使数字和为 `target` 的组合。

`candidates` 中的每个数字在每个组合中只能使用 **一次**。

**注意：**解集不能包含重复的组合。



**示例 1：**

```
输入：candidates = [10,1,2,7,6,1,5], target = 8
输出：
[
[1,1,2],
[1,2,5],
[1,7],
[2,6]
]
```

**示例 2：**

```
输入：candidates = [2,5,2,1,2], target = 5
输出：
[
[1,2,2],
[5]
]
```

**提示：**

-   `1 <= candidates.length <= 100`
-   `1 <= candidates[i] <= 50`
-   `1 <= target <= 30`



## 二、解答方法

### 2.1 方法一：回溯 + 同层去重（startIndex + used / 排序）

1. **思路**

与第 39 题不同，这里每个数字只能用一次，且候选数组含重复数字、解集不能重复。做法：

-   先排序，使相同数字相邻；
-   递归下标 `i` 从 `start` 开始（下一层 `start = i+1`，保证每个数只用一次）；
-   **同层去重**：若 `i > start` 且 `candidates[i] == candidates[i-1]`，说明同一层中前一个相同数字已被作为起点枚举过，跳过以避免重复组合。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private List<List<Integer>> res = new ArrayList<>();
    private List<Integer> path = new ArrayList<>();

    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
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
            if (i > start && candidates[i] == candidates[i - 1]) continue;
            if (candidates[i] > target) break;
            path.add(candidates[i]);
            dfs(candidates, i + 1, target - candidates[i]);
            path.remove(path.size() - 1);
        }
    }
}
```

```python [Python]
class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        res, path = [], []

        def dfs(start, target):
            if target == 0:
                res.append(path[:])
                return
            for i in range(start, len(candidates)):
                if i > start and candidates[i] == candidates[i - 1]:
                    continue
                if candidates[i] > target:
                    break
                path.append(candidates[i])
                dfs(i + 1, target - candidates[i])
                path.pop()

        dfs(0, target)
        return res
```

```go [Go]
func combinationSum2(candidates []int, target int) [][]int {
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
            if i > start && candidates[i] == candidates[i-1] {
                continue
            }
            if candidates[i] > target {
                break
            }
            path = append(path, candidates[i])
            dfs(i+1, target-candidates[i])
            path = path[:len(path)-1]
        }
    }
    dfs(0, target)
    return res
}
```

```c [C]
/* 回溯 + 去重在 C 中需手动管理动态数组，推荐移植上述思路 */
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path;
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        dfs(candidates, 0, target);
        return res;
    }
    void dfs(vector<int>& candidates, int start, int target) {
        if (target == 0) { res.push_back(path); return; }
        for (int i = start; i < candidates.size(); i++) {
            if (i > start && candidates[i] == candidates[i - 1]) continue;
            if (candidates[i] > target) break;
            path.push_back(candidates[i]);
            dfs(candidates, i + 1, target - candidates[i]);
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
var combinationSum2 = function (candidates, target) {
    candidates.sort((a, b) => a - b);
    const res = [], path = [];
    const dfs = (start, target) => {
        if (target === 0) { res.push([...path]); return; }
        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue;
            if (candidates[i] > target) break;
            path.push(candidates[i]);
            dfs(i + 1, target - candidates[i]);
            path.pop();
        }
    };
    dfs(0, target);
    return res;
};
```

```ts [TypeScript]
function combinationSum2(candidates: number[], target: number): number[][] {
    candidates.sort((a, b) => a - b);
    const res: number[][] = [], path: number[] = [];
    const dfs = (start: number, target: number): void => {
        if (target === 0) { res.push([...path]); return; }
        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue;
            if (candidates[i] > target) break;
            path.push(candidates[i]);
            dfs(i + 1, target - candidates[i]);
            path.pop();
        }
    };
    dfs(0, target);
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(2^n)`，指数级，但有排序与剪枝。
- **空间复杂度**：`O(n)`，递归栈与路径长度。

### 2.2 方法二：回溯 + used 数组去重

1. **思路**

用 `used` 布尔数组标记本层之前是否已使用过该数字。当 `i > 0 && candidates[i] == candidates[i-1] && !used[i-1]` 时跳过——即「前一个相同数字在上一轮递归中已用完、当前层未使用」，避免同一组合被不同顺序重复生成。与同层去重的 `i > start` 写法等价。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private List<List<Integer>> res = new ArrayList<>();
    private List<Integer> path = new ArrayList<>();
    private boolean[] used;

    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        used = new boolean[candidates.length];
        dfs(candidates, 0, target);
        return res;
    }

    private void dfs(int[] candidates, int start, int target) {
        if (target == 0) { res.add(new ArrayList<>(path)); return; }
        for (int i = start; i < candidates.length; i++) {
            if (i > 0 && candidates[i] == candidates[i - 1] && !used[i - 1]) continue;
            if (candidates[i] > target) break;
            used[i] = true;
            path.add(candidates[i]);
            dfs(candidates, i + 1, target - candidates[i]);
            path.remove(path.size() - 1);
            used[i] = false;
        }
    }
}
```

```python [Python]
class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        res, path = [], []
        used = [False] * len(candidates)

        def dfs(start, target):
            if target == 0:
                res.append(path[:])
                return
            for i in range(start, len(candidates)):
                if i > 0 and candidates[i] == candidates[i - 1] and not used[i - 1]:
                    continue
                if candidates[i] > target:
                    break
                used[i] = True
                path.append(candidates[i])
                dfs(i + 1, target - candidates[i])
                path.pop()
                used[i] = False

        dfs(0, target)
        return res
```

```go [Go]
func combinationSum2(candidates []int, target int) [][]int {
    sort.Ints(candidates)
    res := [][]int{}
    path := []int{}
    used := make([]bool, len(candidates))
    var dfs func(int, int)
    dfs = func(start, target int) {
        if target == 0 {
            tmp := make([]int, len(path))
            copy(tmp, path)
            res = append(res, tmp)
            return
        }
        for i := start; i < len(candidates); i++ {
            if i > 0 && candidates[i] == candidates[i-1] && !used[i-1] {
                continue
            }
            if candidates[i] > target {
                break
            }
            used[i] = true
            path = append(path, candidates[i])
            dfs(i+1, target-candidates[i])
            path = path[:len(path)-1]
            used[i] = false
        }
    }
    dfs(0, target)
    return res
}
```

```c [C]
/* used 数组去重法在 C 中实现较繁琐，推荐方法一 */
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path;
    vector<bool> used;
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        used.assign(candidates.size(), false);
        dfs(candidates, 0, target);
        return res;
    }
    void dfs(vector<int>& candidates, int start, int target) {
        if (target == 0) { res.push_back(path); return; }
        for (int i = start; i < candidates.size(); i++) {
            if (i > 0 && candidates[i] == candidates[i - 1] && !used[i - 1]) continue;
            if (candidates[i] > target) break;
            used[i] = true;
            path.push_back(candidates[i]);
            dfs(candidates, i + 1, target - candidates[i]);
            path.pop_back();
            used[i] = false;
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
var combinationSum2 = function (candidates, target) {
    candidates.sort((a, b) => a - b);
    const res = [], path = [], used = new Array(candidates.length).fill(false);
    const dfs = (start, target) => {
        if (target === 0) { res.push([...path]); return; }
        for (let i = start; i < candidates.length; i++) {
            if (i > 0 && candidates[i] === candidates[i - 1] && !used[i - 1]) continue;
            if (candidates[i] > target) break;
            used[i] = true;
            path.push(candidates[i]);
            dfs(i + 1, target - candidates[i]);
            path.pop();
            used[i] = false;
        }
    };
    dfs(0, target);
    return res;
};
```

```ts [TypeScript]
function combinationSum2(candidates: number[], target: number): number[][] {
    candidates.sort((a, b) => a - b);
    const res: number[][] = [], path: number[] = [], used: boolean[] = new Array(candidates.length).fill(false);
    const dfs = (start: number, target: number): void => {
        if (target === 0) { res.push([...path]); return; }
        for (let i = start; i < candidates.length; i++) {
            if (i > 0 && candidates[i] === candidates[i - 1] && !used[i - 1]) continue;
            if (candidates[i] > target) break;
            used[i] = true;
            path.push(candidates[i]);
            dfs(i + 1, target - candidates[i]);
            path.pop();
            used[i] = false;
        }
    };
    dfs(0, target);
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(2^n)`，指数级。
- **空间复杂度**：`O(n)`，递归栈、`used` 与路径。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯 + 同层去重（startIndex + used / 排序） | `O(2^n)` | `O(n)` | 暴力枚举所有可能 |
| 回溯 + used 数组去重 | `O(2^n)` | `O(n)` | 暴力枚举所有可能 |

