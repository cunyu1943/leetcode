# [LCR 116. 省份数量](https://leetcode.cn/problems/bLyHh0/)



## 一、题目描述

有 `n` 个城市，其中一些彼此相连，另一些没有相连。如果城市 `a` 与城市 `b` 直接相连，且城市 `b` 与城市 `c` 直接相连，那么城市 `a` 与城市 `c` 间接相连。

**省份** 是一组直接或间接相连的城市，组内不含其他没有相连的城市。

给你一个 `n x n` 的矩阵 `isConnected` ，其中 `isConnected[i][j] = 1` 表示第 `i` 个城市和第 `j` 个城市直接相连，而 `isConnected[i][j] = 0` 表示二者不直接相连。

返回矩阵中 **省份** 的数量。



**示例 1：**

```
输入：isConnected = [[1,1,0],[1,1,0],[0,0,1]]
输出：2
```

**示例 2：**

```
输入：isConnected = [[1,0,0],[0,1,0],[0,0,1]]
输出：3
```

**提示：**

- `1 <= n <= 200`
- `n == isConnected.length`
- `n == isConnected[i].length`
- `isConnected[i][j]` 为 `1` 或 `0`
- `isConnected[i][i] == 1`
- `isConnected[i][j] == isConnected[j][i]`



## 二、解答方法

### 2.1 方法一：并查集

1. **思路**

把每个城市看作节点，`isConnected[i][j] == 1` 表示 `i` 与 `j` 在同一省份：

- 初始化每个城市单独成集合；
- 遍历矩阵，连通的城市 `union(i, j)`；
- 统计不同集合的个数（根节点数量）即省份数。

时间 `O(n² α(n))`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (isConnected[i][j] == 1) union(parent, i, j);
            }
        }
        int cnt = 0;
        for (int i = 0; i < n; i++) if (find(parent, i) == i) cnt++;
        return cnt;
    }
    private int find(int[] parent, int x) {
        if (parent[x] != x) parent[x] = find(parent, parent[x]);
        return parent[x];
    }
    private void union(int[] parent, int a, int b) {
        int ra = find(parent, a), rb = find(parent, b);
        if (ra != rb) parent[ra] = rb;
    }
}
```

```python [Python]
class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        parent = list(range(n))

        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def union(a, b):
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[ra] = rb

        for i in range(n):
            for j in range(i + 1, n):
                if isConnected[i][j] == 1:
                    union(i, j)
        return sum(1 for i in range(n) if find(i) == i)
```

```cpp [C++]
class Solution {
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size();
        vector<int> parent(n);
        iota(parent.begin(), parent.end(), 0);
        function<int(int)> find = [&](int x) {
            if (parent[x] != x) parent[x] = find(parent[x]);
            return parent[x];
        };
        auto unionn = [&](int a, int b) {
            int ra = find(a), rb = find(b);
            if (ra != rb) parent[ra] = rb;
        };
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                if (isConnected[i][j]) unionn(i, j);
        int cnt = 0;
        for (int i = 0; i < n; i++) if (find(i) == i) cnt++;
        return cnt;
    }
};
```

```go [Go]
func findCircleNum(isConnected [][]int) int {
    n := len(isConnected)
    parent := make([]int, n)
    for i := range parent {
        parent[i] = i
    }
    var find func(x int) int
    find = func(x int) int {
        if parent[x] != x {
            parent[x] = find(parent[x])
        }
        return parent[x]
    }
    union := func(a, b int) {
        ra, rb := find(a), find(b)
        if ra != rb {
            parent[ra] = rb
        }
    }
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            if isConnected[i][j] == 1 {
                union(i, j)
            }
        }
    }
    cnt := 0
    for i := 0; i < n; i++ {
        if find(i) == i {
            cnt++
        }
    }
    return cnt
}
```

```js [JavaScript]
/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isConnected) {
    const n = isConnected.length;
    const parent = Array.from({ length: n }, (_, i) => i);
    const find = (x) => {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    };
    const union = (a, b) => {
        const ra = find(a), rb = find(b);
        if (ra !== rb) parent[ra] = rb;
    };
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (isConnected[i][j] === 1) union(i, j);
        }
    }
    let cnt = 0;
    for (let i = 0; i < n; i++) if (find(i) === i) cnt++;
    return cnt;
};
```

```c [C]
#include <stdlib.h>

static int find(int* parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}

int findCircleNum(int** isConnected, int isConnectedSize, int* isConnectedColSize) {
    int n = isConnectedSize;
    int* parent = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) parent[i] = i;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (isConnected[i][j]) {
                int ra = find(parent, i), rb = find(parent, j);
                if (ra != rb) parent[ra] = rb;
            }
        }
    }
    int cnt = 0;
    for (int i = 0; i < n; i++) if (find(parent, i) == i) cnt++;
    free(parent);
    return cnt;
}
```

```ts [TypeScript]
function findCircleNum(isConnected: number[][]): number {
    const n = isConnected.length;
    const parent: number[] = Array.from({ length: n }, (_, i) => i);
    const find = (x: number): number => {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    };
    const union = (a: number, b: number) => {
        const ra = find(a), rb = find(b);
        if (ra !== rb) parent[ra] = rb;
    };
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (isConnected[i][j] === 1) union(i, j);
        }
    }
    let cnt = 0;
    for (let i = 0; i < n; i++) if (find(i) === i) cnt++;
    return cnt;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n² α(n))`，遍历矩阵 + 并查集操作。
- **空间复杂度**：`O(n)`，父节点数组。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 并查集 | `O(n²α(n))` | `O(n)` | 标准解法 |

省份即「连通分量」。并查集把所有直接/间接相连的城市合并，最后统计根节点数量；也可用 DFS 染色得到同样结果。

