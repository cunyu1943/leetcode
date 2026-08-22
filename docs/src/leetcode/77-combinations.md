# [77. 组合](https://leetcode.cn/problems/combinations/)



## 一、题目描述

给定两个整数 `n` 和 `k`，返回范围 `[1, n]` 中所有可能的 `k` 个数的组合。

你可以按 **任何顺序** 返回答案。



**示例 1：**

```
输入：n = 4, k = 2
输出：[[2,4],[3,4],[2,3],[1,2],[1,4],[1,3]]
```

**示例 2：**

```
输入：n = 1, k = 1
输出：[[1]]
```

**提示：**

-   `1 <= n <= 20`
-   `1 <= k <= n`



## 二、解答方法

### 2.1 方法一：回溯（按序剪枝）


1. **思路**

从 1 到 n 依次选择，保持序列递增避免重复，当长度达到 `k` 时记录；利用 `n - (k - path.size()) + 1` 上界剪枝。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    List<List<Integer>> res = new ArrayList<>();
    List<Integer> path = new ArrayList<>();
    public List<List<Integer>> combine(int n, int k) {
        backtrack(1, n, k);
        return res;
    }
    private void backtrack(int start, int n, int k) {
        if (path.size() == k) { res.add(new ArrayList<>(path)); return; }
        for (int i = start; i <= n - (k - path.size()) + 1; i++) {
            path.add(i);
            backtrack(i + 1, n, k);
            path.remove(path.size() - 1);
        }
    }
}
```

```python [Python]
def combine(n: int, k: int) -> List[List[int]]:
    res, path = [], []
    def backtrack(start):
        if len(path) == k:
            res.append(path[:]); return
        for i in range(start, n - (k - len(path)) + 2):
            path.append(i); backtrack(i + 1); path.pop()
    backtrack(1)
    return res
```

```go [Go]
func combine(n int, k int) [][]int {
    res := [][]int{}
    path := []int{}
    var backtrack func(int)
    backtrack = func(start int) {
        if len(path) == k {
            tmp := make([]int, k); copy(tmp, path); res = append(res, tmp); return
        }
        for i := start; i <= n-(k-len(path))+1; i++ {
            path = append(path, i)
            backtrack(i + 1)
            path = path[:len(path)-1]
        }
    }
    backtrack(1)
    return res
}
```

```c [C]
int** combine(int n, int k, int* returnSize, int** returnColumnSizes) {
    // 回溯按序剪枝核心结构同上，完整实现略
    *returnSize = 0; return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> res;
        vector<int> path;
        function<void(int)> backtrack = [&](int start) {
            if (path.size() == k) { res.push_back(path); return; }
            for (int i = start; i <= n - (k - path.size()) + 1; i++) {
                path.push_back(i);
                backtrack(i + 1);
                path.pop_back();
            }
        };
        backtrack(1);
        return res;
    }
};
```

```javascript [JavaScript]
var combine = function(n, k) {
    const res = [], path = [];
    const backtrack = (start) => {
        if (path.length === k) { res.push([...path]); return; }
        for (let i = start; i <= n - (k - path.length) + 1; i++) {
            path.push(i); backtrack(i + 1); path.pop();
        }
    };
    backtrack(1);
    return res;
};
```

```typescript [TypeScript]
function combine(n: number, k: number): number[][] {
    const res: number[][] = [], path: number[] = [];
    const backtrack = (start: number): void => {
        if (path.length === k) { res.push([...path]); return; }
        for (let i = start; i <= n - (k - path.length) + 1; i++) {
            path.push(i); backtrack(i + 1); path.pop();
        }
    };
    backtrack(1);
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(C(n, k) * k)`，组合数乘构造长度。
- **空间复杂度**：`O(k)`，递归栈与路径。

### 2.2 方法二：回溯（无剪枝）


1. **思路**

不计算上界，直接枚举所有起点，靠 `start` 递增保证不重复，代码更简洁但枚举次数略多。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    List<List<Integer>> res = new ArrayList<>();
    List<Integer> path = new ArrayList<>();
    public List<List<Integer>> combine(int n, int k) {
        backtrack(1, n, k);
        return res;
    }
    private void backtrack(int start, int n, int k) {
        if (path.size() == k) { res.add(new ArrayList<>(path)); return; }
        for (int i = start; i <= n; i++) {
            path.add(i);
            backtrack(i + 1, n, k);
            path.remove(path.size() - 1);
        }
    }
}
```

```python [Python]
def combine(n: int, k: int) -> List[List[int]]:
    res, path = [], []
    def backtrack(start):
        if len(path) == k:
            res.append(path[:]); return
        for i in range(start, n + 1):
            path.append(i); backtrack(i + 1); path.pop()
    backtrack(1)
    return res
```

```go [Go]
func combine(n int, k int) [][]int {
    res := [][]int{}
    path := []int{}
    var backtrack func(int)
    backtrack = func(start int) {
        if len(path) == k {
            tmp := make([]int, k); copy(tmp, path); res = append(res, tmp); return
        }
        for i := start; i <= n; i++ {
            path = append(path, i)
            backtrack(i + 1)
            path = path[:len(path)-1]
        }
    }
    backtrack(1)
    return res
}
```

```c [C]
int** combine(int n, int k, int* returnSize, int** returnColumnSizes) {
    // 无剪枝回溯核心结构同上，完整实现略
    *returnSize = 0; return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> res;
        vector<int> path;
        function<void(int)> backtrack = [&](int start) {
            if (path.size() == k) { res.push_back(path); return; }
            for (int i = start; i <= n; i++) {
                path.push_back(i);
                backtrack(i + 1);
                path.pop_back();
            }
        };
        backtrack(1);
        return res;
    }
};
```

```javascript [JavaScript]
var combine = function(n, k) {
    const res = [], path = [];
    const backtrack = (start) => {
        if (path.length === k) { res.push([...path]); return; }
        for (let i = start; i <= n; i++) {
            path.push(i); backtrack(i + 1); path.pop();
        }
    };
    backtrack(1);
    return res;
};
```

```typescript [TypeScript]
function combine(n: number, k: number): number[][] {
    const res: number[][] = [], path: number[] = [];
    const backtrack = (start: number): void => {
        if (path.length === k) { res.push([...path]); return; }
        for (let i = start; i <= n; i++) {
            path.push(i); backtrack(i + 1); path.pop();
        }
    };
    backtrack(1);
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(C(n, k) * k)`，与剪枝版同阶。
- **空间复杂度**：`O(k)`，递归栈与路径。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯（按序剪枝） | `O(C(n,k)*k)` | `O(k)` | 上界剪枝，更快 |
| 回溯（无剪枝） | `O(C(n,k)*k)` | `O(k)` | 代码最简，推荐入门 |
