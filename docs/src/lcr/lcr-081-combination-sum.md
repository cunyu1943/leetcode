# [LCR 081. 组合总和](https://leetcode.cn/problems/Ygoe9J/)



## 一、题目描述

给你一个 **无重复元素** 的整数数组 `candidates` 和一个目标整数 `target` ，找出 `candidates` 中可以使数字和为目标数 `target` 的 所有 **不同组合** ，并以列表形式返回。你可以按 **任意顺序** 返回这些组合。

`candidates` 中的 **同一个** 数字可以 **无限制重复被选取** 。如果至少一个数字的被选数量不同，则两种组合是不同的。

对于给定的输入，保证和为 `target` 的不同组合数少于 `150` 个。



**示例 1：**

```
输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]
```

**示例 2：**

```
输入: candidates = [2,3,5], target = 8
输出: [[2,2,2,2],[2,3,3],[3,5]]
```

**提示：**

- `1 <= candidates.length <= 30`
- `2 <= candidates[i] <= 40`
- `candidates` 的所有元素 **互不相同**
- `1 <= target <= 40`



## 二、解答方法

### 2.1 方法一：回溯（可重复选取）

1. **思路**

排序后回溯，每个位置可选多次：

- `dfs(idx, target)`：从 `idx` 开始尝试，`target` 为剩余目标；
- 若 `target == 0` 记录；若 `target < 0` 或 `idx == n` 返回；
- 对 `candidates[idx]`：要么跳过它（`idx+1`），要么选它（`target - val`，`idx` 不变，因为可重复取）。

用「选/不选」或「从 start 开始循环」均可。这里用循环方式：从 `start` 开始枚举，选后不前进 `start`。

时间 `O(S)`（`S` 为可行组合数的总长度），空间 `O(target/min)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(candidates, target, 0, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int[] c, int target, int start, List<Integer> cur, List<List<Integer>> res) {
        if (target == 0) {
            res.add(new ArrayList<>(cur));
            return;
        }
        for (int i = start; i < c.length; i++) {
            if (c[i] > target) continue;
            cur.add(c[i]);
            dfs(c, target - c[i], i, cur, res);
            cur.remove(cur.size() - 1);
        }
    }
}
```

```python [Python]
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        res = []

        def dfs(start, target, cur):
            if target == 0:
                res.append(cur[:])
                return
            for i in range(start, len(candidates)):
                if candidates[i] > target:
                    continue
                cur.append(candidates[i])
                dfs(i, target - candidates[i], cur)
                cur.pop()

        dfs(0, target, [])
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> cur;
        dfs(candidates, target, 0, cur, res);
        return res;
    }
private:
    void dfs(vector<int>& c, int target, int start, vector<int>& cur, vector<vector<int>>& res) {
        if (target == 0) { res.push_back(cur); return; }
        for (int i = start; i < c.size(); i++) {
            if (c[i] > target) continue;
            cur.push_back(c[i]);
            dfs(c, target - c[i], i, cur, res);
            cur.pop_back();
        }
    }
};
```

```go [Go]
func combinationSum(candidates []int, target int) [][]int {
    var res [][]int
    cur := []int{}
    var dfs func(start, target int)
    dfs = func(start, target int) {
        if target == 0 {
            tmp := make([]int, len(cur))
            copy(tmp, cur)
            res = append(res, tmp)
            return
        }
        for i := start; i < len(candidates); i++ {
            if candidates[i] > target {
                continue
            }
            cur = append(cur, candidates[i])
            dfs(i, target-candidates[i])
            cur = cur[:len(cur)-1]
        }
    }
    dfs(0, target)
    return res
}
```

```js [JavaScript]
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    const res = [];
    const cur = [];
    const dfs = (start, target) => {
        if (target === 0) {
            res.push([...cur]);
            return;
        }
        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > target) continue;
            cur.push(candidates[i]);
            dfs(i, target - candidates[i]);
            cur.pop();
        }
    };
    dfs(0, target);
    return res;
};
```

```c [C]
#include <stdlib.h>

int** res;
int* cols;
int cnt;

static void dfs(int* c, int cSize, int target, int start, int* cur, int len) {
    if (target == 0) {
        res[cnt] = (int*)malloc(len * sizeof(int));
        for (int i = 0; i < len; i++) res[cnt][i] = cur[i];
        cols[cnt] = len;
        cnt++;
        return;
    }
    for (int i = start; i < cSize; i++) {
        if (c[i] > target) continue;
        cur[len] = c[i];
        dfs(c, cSize, target - c[i], i, cur, len + 1);
    }
}

int** combinationSum(int* candidates, int candidatesSize, int target, int* returnSize, int** returnColumnSizes) {
    res = (int**)malloc(500 * sizeof(int*));
    cols = (int*)malloc(500 * sizeof(int));
    cnt = 0;
    int* cur = (int*)malloc(target * sizeof(int));
    dfs(candidates, candidatesSize, target, 0, cur, 0);
    free(cur);
    *returnSize = cnt;
    *returnColumnSizes = cols;
    return res;
}
```

```ts [TypeScript]
function combinationSum(candidates: number[], target: number): number[][] {
    const res: number[][] = [];
    const cur: number[] = [];
    const dfs = (start: number, target: number) => {
        if (target === 0) {
            res.push([...cur]);
            return;
        }
        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > target) continue;
            cur.push(candidates[i]);
            dfs(i, target - candidates[i]);
            cur.pop();
        }
    };
    dfs(0, target);
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：指数级，与可行组合数相关。
- **空间复杂度**：`O(target / min(c))`，递归栈深度。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯 | 指数级 | `O(目标/最小数)` | 标准解法 |

「可重复选取」的关键是递归时 `start` 不前进（同一数字可再选），配合 `target` 递减与剪枝（`c[i] > target` 跳过）即可高效枚举所有组合。

