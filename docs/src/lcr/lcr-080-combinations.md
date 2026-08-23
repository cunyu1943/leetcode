# [LCR 080. 组合](https://leetcode.cn/problems/uUsW3B/)



## 一、题目描述

给定两个整数 `n` 和 `k`，返回范围 `[1, n]` 中所有可能的 `k` 个数的组合。

你可以按 **任何顺序** 返回答案。



**示例 1：**

```
输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
```

**示例 2：**

```
输入：n = 1, k = 1
输出：[[1]]
```

**提示：**

- `1 <= n <= 20`
- `1 <= k <= n`



## 二、解答方法

### 2.1 方法一：回溯

1. **思路**

从 `start` 到 `n` 依次选取数字加入组合，保证组合内递增（避免重复组合）：

- 当前组合长度到 `k` 时记录；
- 从 `start` 开始枚举下一个数字，选后递归 `start = i + 1`，再回溯。

时间 `O(C(n,k))`，空间 `O(k)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(1, n, k, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int start, int n, int k, List<Integer> cur, List<List<Integer>> res) {
        if (cur.size() == k) {
            res.add(new ArrayList<>(cur));
            return;
        }
        for (int i = start; i <= n; i++) {
            cur.add(i);
            dfs(i + 1, n, k, cur, res);
            cur.remove(cur.size() - 1);
        }
    }
}
```

```python [Python]
class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        res = []

        def dfs(start, cur):
            if len(cur) == k:
                res.append(cur[:])
                return
            for i in range(start, n + 1):
                cur.append(i)
                dfs(i + 1, cur)
                cur.pop()

        dfs(1, [])
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> res;
        vector<int> cur;
        dfs(1, n, k, cur, res);
        return res;
    }
private:
    void dfs(int start, int n, int k, vector<int>& cur, vector<vector<int>>& res) {
        if (cur.size() == k) { res.push_back(cur); return; }
        for (int i = start; i <= n; i++) {
            cur.push_back(i);
            dfs(i + 1, n, k, cur, res);
            cur.pop_back();
        }
    }
};
```

```go [Go]
func combine(n int, k int) [][]int {
    var res [][]int
    cur := []int{}
    var dfs func(start int)
    dfs = func(start int) {
        if len(cur) == k {
            tmp := make([]int, len(cur))
            copy(tmp, cur)
            res = append(res, tmp)
            return
        }
        for i := start; i <= n; i++ {
            cur = append(cur, i)
            dfs(i + 1)
            cur = cur[:len(cur)-1]
        }
    }
    dfs(1)
    return res
}
```

```js [JavaScript]
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
    const res = [];
    const cur = [];
    const dfs = (start) => {
        if (cur.length === k) {
            res.push([...cur]);
            return;
        }
        for (let i = start; i <= n; i++) {
            cur.push(i);
            dfs(i + 1);
            cur.pop();
        }
    };
    dfs(1);
    return res;
};
```

```c [C]
#include <stdlib.h>

int** res;
int* cols;
int cnt;

static void dfs(int start, int n, int k, int* cur, int len) {
    if (len == k) {
        res[cnt] = (int*)malloc(k * sizeof(int));
        for (int i = 0; i < k; i++) res[cnt][i] = cur[i];
        cols[cnt] = k;
        cnt++;
        return;
    }
    for (int i = start; i <= n; i++) {
        cur[len] = i;
        dfs(i + 1, n, k, cur, len + 1);
    }
}

int** combine(int n, int k, int* returnSize, int** returnColumnSizes) {
    res = (int**)malloc(200000 * sizeof(int*));
    cols = (int*)malloc(200000 * sizeof(int));
    cnt = 0;
    int* cur = (int*)malloc(k * sizeof(int));
    dfs(1, n, k, cur, 0);
    free(cur);
    *returnSize = cnt;
    *returnColumnSizes = cols;
    return res;
}
```

```ts [TypeScript]
function combine(n: number, k: number): number[][] {
    const res: number[][] = [];
    const cur: number[] = [];
    const dfs = (start: number) => {
        if (cur.length === k) {
            res.push([...cur]);
            return;
        }
        for (let i = start; i <= n; i++) {
            cur.push(i);
            dfs(i + 1);
            cur.pop();
        }
    };
    dfs(1);
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(C(n,k) × k)`，每个组合复制 `k` 个元素。
- **空间复杂度**：`O(k)`，递归栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯 | `O(C(n,k)·k)` | `O(k)` | 标准解法 |

组合与排列的区别在于「顺序无关」：回溯时只从 `start` 之后取数，保证组合内递增，从而天然去重。

