# [254. 因子的组合](https://leetcode.cn/problems/factor-combinations/) [🔒 会员题]



## 一、题目描述

整数可以被看作是其因子的乘积。

例如：

```
8 = 2 x 2 x 2;
  = 2 x 4.
```

请实现一个函数，该函数接收一个整数 `n` 并返回 **所有可能的因子组合** 的列表。

**注意：**

-   你可以假设 `n` 永远都是正数。
-   因子必须大于 `1` 并且小于 `n`。

**示例 1：**

```
输入：n = 1
输出：[]
```

**示例 2：**

```
输入：n = 12
输出：[[2,6],[2,2,3],[3,4]]
```

**示例 3：**

```
输入：n = 37
输出：[]
```

**示例 4：**

```
输入：n = 32
输出：[[2,16],[2,2,8],[2,2,2,4],[2,2,2,2,2],[2,4,4],[4,8]]
```



## 二、解答方法

### 2.1 方法一：回溯 + 起始因子递增（去重）

1. **思路**

从因子 `start = 2` 开始，依次尝试每个可能的因子 `i`：

- 若 `n % i == 0`，则 `i` 是一个因子，把它加入 `path`，然后递归处理 `n / i`，且 **后续因子从 `i` 开始**（而非从 2 开始），保证组合内因子 **非递减**，从而天然去重（避免 `[2,6]` 与 `[6,2]` 重复）。
- 递归结束后，把当前因子 `n` 本身也加入 `path` 作为一组结果（此时 `n >= start`）。

剪枝：循环条件用 `i * i <= n`（只需试到 `√n`）。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    private List<List<Integer>> res = new ArrayList<>();
    private List<Integer> path = new ArrayList<>();

    public List<List<Integer>> getFactors(int n) {
        dfs(n, 2);
        return res;
    }

    private void dfs(int n, int start) {
        if (n < 2) return;
        for (int i = start; i * i <= n; i++) {      // 只需试到 √n
            if (n % i == 0) {
                path.add(i);
                path.add(n / i);
                res.add(new ArrayList<>(path));      // 记录 [i, n/i]
                path.remove(path.size() - 1);        // 回溯，继续分解 n/i
                dfs(n / i, i);
                path.remove(path.size() - 1);
            }
        }
    }
}
```

```python [Python]
class Solution:
    def getFactors(self, n: int) -> List[List[int]]:
        res = []

        def dfs(n, start, path):
            i = start
            while i * i <= n:                 # 只需试到 √n
                if n % i == 0:
                    res.append(path + [i, n // i])
                    dfs(n // i, i, path + [i])
                i += 1

        dfs(n, 2, [])
        return res
```

```go [Go]
func getFactors(n int) [][]int {
    res := [][]int{}
    var dfs func(n, start int, path []int)
    dfs = func(n, start int, path []int) {
        for i := start; i*i <= n; i++ {
            if n%i == 0 {
                // 组合 1：[i, n/i]
                combo := make([]int, len(path), len(path)+2)
                copy(combo, path)
                combo = append(combo, i, n/i)
                res = append(res, combo)
                // 继续分解 n/i
                dfs(n/i, i, append(append([]int{}, path...), i))
            }
        }
    }
    dfs(n, 2, []int{})
    return res
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> getFactors(int n) {
        vector<vector<int>> res;
        vector<int> path;
        dfs(n, 2, path, res);
        return res;
    }
private:
    void dfs(int n, int start, vector<int>& path, vector<vector<int>>& res) {
        for (int i = start; i * i <= n; i++) {
            if (n % i == 0) {
                path.push_back(i);
                path.push_back(n / i);
                res.push_back(path);          // [i, n/i]
                path.pop_back();
                dfs(n / i, i, path, res);     // 继续分解 n/i
                path.pop_back();
            }
        }
    }
};
```

```js [JavaScript]
/**
 * @param {number} n
 * @return {number[][]}
 */
var getFactors = function (n) {
    const res = [];
    const dfs = (n, start, path) => {
        for (let i = start; i * i <= n; i++) {
            if (n % i === 0) {
                res.push([...path, i, n / i]);
                dfs(n / i, i, [...path, i]);
            }
        }
    };
    dfs(n, 2, []);
    return res;
};
```

```ts [TypeScript]
/**
 * @param {number} n
 * @return {number[][]}
 */
function getFactors(n: number): number[][] {
    const res: number[][] = [];
    const dfs = (n: number, start: number, path: number[]): void => {
        for (let i = start; i * i <= n; i++) {
            if (n % i === 0) {
                res.push([...path, i, n / i]);
                dfs(n / i, i, [...path, i]);
            }
        }
    };
    dfs(n, 2, []);
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：与因子组合数量成正比，约为 `O(结果数 × 因子个数)`。
- **空间复杂度**：`O(log n)`（递归深度，最多分解到全为 2）。

## 三、总结

本题是 **组合型回溯** 的变体，两个关键设计：

1. **起始因子递增（`start` 参数）**：保证每个组合内的因子非递减，天然去重。这是「组合」类问题（区别于「排列」）的标准技巧，与 `39/40/216` 题一致。

2. **双分支递归**：每次找到一个因子 `i` 时：
   - 把 `[i, n/i]` 作为一组完整答案加入结果；
   - 同时继续把 `n/i` 拆分成更细的因子。

3. **试除上界 `i * i <= n`**：因子成对出现，只需试到 `√n` 即可，避免重复枚举。

注意 `n = 1` 和「质数」的情况返回空列表（`[]`）—— 因为题目要求因子必须 `> 1` 且 `< n`。
