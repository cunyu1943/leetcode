# [LCR 082. 组合总和 II](https://leetcode.cn/problems/4sjJUc/)



## 一、题目描述

给定一个可能有重复数字的整数数组 `candidates` 和一个目标数 `target` ，找出 `candidates` 中所有可以使数字和为 `target` 的组合。

`candidates` 中的每个数字在每个组合中只能使用一次，解集不能包含重复的组合。



**示例 1：**

```
输入: candidates = [10,1,2,7,6,1,5], target = 8,
输出:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
```

**示例 2：**

```
输入: candidates = [2,5,2,1,2], target = 5,
输出:
[
[1,2,2],
[5]
]
```

**提示：**

- `1 <= candidates.length <= 100`
- `1 <= candidates[i] <= 50`
- `1 <= target <= 30`



## 二、解答方法

### 2.1 方法一：排序 + 回溯去重

1. **思路**

与组合总和 I 的区别：每个数字只能用一次（递归时 `i + 1`），且数组中可能有重复数字，需在「同一层」跳过相同值以避免重复组合：

- 先排序；
- `dfs(start, target)`，`target == 0` 记录；
- 循环 `i` 从 `start` 开始：若 `i > start && c[i] == c[i-1]` 跳过（同一层去重）；选 `c[i]` 后递归 `i + 1`。

时间 `O(2ⁿ)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
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
            if (i > start && c[i] == c[i - 1]) continue; // 同一层去重
            if (c[i] > target) continue;
            cur.add(c[i]);
            dfs(c, target - c[i], i + 1, cur, res);
            cur.remove(cur.size() - 1);
        }
    }
}
```

```python [Python]
class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        res = []

        def dfs(start, target, cur):
            if target == 0:
                res.append(cur[:])
                return
            for i in range(start, len(candidates)):
                if i > start and candidates[i] == candidates[i - 1]:
                    continue
                if candidates[i] > target:
                    continue
                cur.append(candidates[i])
                dfs(i + 1, target - candidates[i], cur)
                cur.pop()

        dfs(0, target, [])
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        vector<vector<int>> res;
        vector<int> cur;
        dfs(candidates, target, 0, cur, res);
        return res;
    }
private:
    void dfs(vector<int>& c, int target, int start, vector<int>& cur, vector<vector<int>>& res) {
        if (target == 0) { res.push_back(cur); return; }
        for (int i = start; i < c.size(); i++) {
            if (i > start && c[i] == c[i - 1]) continue;
            if (c[i] > target) continue;
            cur.push_back(c[i]);
            dfs(c, target - c[i], i + 1, cur, res);
            cur.pop_back();
        }
    }
};
```

```go [Go]
func combinationSum2(candidates []int, target int) [][]int {
    sort.Ints(candidates)
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
            if i > start && candidates[i] == candidates[i-1] {
                continue
            }
            if candidates[i] > target {
                continue
            }
            cur = append(cur, candidates[i])
            dfs(i+1, target-candidates[i])
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
var combinationSum2 = function (candidates, target) {
    candidates.sort((a, b) => a - b);
    const res = [];
    const cur = [];
    const dfs = (start, target) => {
        if (target === 0) {
            res.push([...cur]);
            return;
        }
        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue;
            if (candidates[i] > target) continue;
            cur.push(candidates[i]);
            dfs(i + 1, target - candidates[i]);
            cur.pop();
        }
    };
    dfs(0, target);
    return res;
};
```

```c [C]
#include <stdlib.h>

int cmp(const void* a, const void* b) { return *(int*)a - *(int*)b; }

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
        if (i > start && c[i] == c[i - 1]) continue;
        if (c[i] > target) continue;
        cur[len] = c[i];
        dfs(c, cSize, target - c[i], i + 1, cur, len + 1);
    }
}

int** combinationSum2(int* candidates, int candidatesSize, int target, int* returnSize, int** returnColumnSizes) {
    qsort(candidates, candidatesSize, sizeof(int), cmp);
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
function combinationSum2(candidates: number[], target: number): number[][] {
    candidates.sort((a, b) => a - b);
    const res: number[][] = [];
    const cur: number[] = [];
    const dfs = (start: number, target: number) => {
        if (target === 0) {
            res.push([...cur]);
            return;
        }
        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue;
            if (candidates[i] > target) continue;
            cur.push(candidates[i]);
            dfs(i + 1, target - candidates[i]);
            cur.pop();
        }
    };
    dfs(0, target);
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(2ⁿ)`，指数级。
- **空间复杂度**：`O(n)`，递归栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 排序 + 回溯去重 | `O(2ⁿ)` | `O(n)` | 标准解法 |

与「组合总和 I」相比有两处改动：递归用 `i + 1`（每个数只能用一次）；同一层遇到相同值跳过（`i > start && c[i] == c[i-1]`），两者共同保证组合不重复。

