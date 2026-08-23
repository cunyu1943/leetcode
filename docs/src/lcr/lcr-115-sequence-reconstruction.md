# [LCR 115. 序列重建](https://leetcode.cn/problems/ur2n8P/)



## 一、题目描述

给定一个长度为 `n` 的整数数组 `nums` ，其中 `nums` 是范围为 `[1, n]` 的整数的排列。还提供了一个整数数组 `sequences` ，其中 `sequences[i]` 是 `nums` 的子序列。

检查 `nums` 是否是唯一的最短 **超序列**。最短 **超序列** 是 **长度最短** 的序列，并且所有序列 `sequences[i]` 都是它的子序列。对于给定的数组 `sequences` ，可能存在多个有效的 **超序列**。

- 例如，对于 `sequences = [[1,2],[2,3]]` ，有两个最短超序列 `[1,2,3]` 和 `[1,3,2]`。
- 而对于 `sequences = [[1,2],[2,3],[1,3]]` ，只有一个最短超序列 `[1,2,3]`。

如果 `nums` 是序列的唯一最短 **超序列** ，则返回 `true` ，否则返回 `false` 。

**子序列** 是一个可以通过从另一个序列中删除一些元素或不删除元素而得到的序列，而不改变剩余元素的顺序。



**示例 1：**

```
输入: nums = [1,2,3], sequences = [[1,2],[1,3]]
输出: false
```

**示例 2：**

```
输入: nums = [1,2,3], sequences = [[1,2]]
输出: false
```

**示例 3：**

```
输入: nums = [1,2,3], sequences = [[1,2],[1,3],[2,3]]
输出: true
```

**提示：**

- `n == nums.length`
- `1 <= n <= 10⁴`
- `nums` 是 `[1, n]` 范围内所有整数的排列
- `1 <= sequences.length <= 10⁴`
- `1 <= sequences[i].length <= 10⁴`



## 二、解答方法

### 2.1 方法一：拓扑排序判断唯一性

1. **思路**

由 `sequences` 中每个子序列的相邻元素关系建图（`u -> v` 表示 `u` 必须排在 `v` 前），`nums` 是唯一最短超序列等价于「拓扑序唯一且恰为 `nums`」：

- 建图、统计入度；
- BFS：每轮入度 0 的节点必须恰好 1 个，否则超序列不唯一；
- 依次弹出的节点必须与 `nums` 逐位一致。

时间 `O(Σ seq + n)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public boolean sequenceReconstruction(int[] nums, List<List<Integer>> sequences) {
        int n = nums.length;
        List<Integer>[] g = new List[n + 1];
        int[] indeg = new int[n + 1];
        for (int i = 1; i <= n; i++) g[i] = new ArrayList<>();
        boolean[][] seen = new boolean[n + 1][n + 1]; // 去重边
        for (List<Integer> seq : sequences) {
            for (int i = 1; i < seq.size(); i++) {
                int u = seq.get(i - 1), v = seq.get(i);
                if (!seen[u][v]) {
                    seen[u][v] = true;
                    g[u].add(v);
                    indeg[v]++;
                }
            }
        }
        Deque<Integer> q = new ArrayDeque<>();
        for (int i = 1; i <= n; i++) if (indeg[i] == 0) q.offer(i);
        int idx = 0;
        while (!q.isEmpty()) {
            if (q.size() > 1) return false; // 唯一性：每轮只能有一个候选
            int u = q.poll();
            if (idx >= n || nums[idx] != u) return false;
            idx++;
            for (int v : g[u]) if (--indeg[v] == 0) q.offer(v);
        }
        return idx == n;
    }
}
```

```python [Python]
class Solution:
    def sequenceReconstruction(self, nums: List[int], sequences: List[List[int]]) -> bool:
        n = len(nums)
        g = [[] for _ in range(n + 1)]
        indeg = [0] * (n + 1)
        seen = set()
        for seq in sequences:
            for i in range(1, len(seq)):
                u, v = seq[i - 1], seq[i]
                if (u, v) not in seen:
                    seen.add((u, v))
                    g[u].append(v)
                    indeg[v] += 1
        from collections import deque
        q = deque([i for i in range(1, n + 1) if indeg[i] == 0])
        idx = 0
        while q:
            if len(q) > 1:
                return False
            u = q.popleft()
            if idx >= n or nums[idx] != u:
                return False
            idx += 1
            for v in g[u]:
                indeg[v] -= 1
                if indeg[v] == 0:
                    q.append(v)
        return idx == n
```

```cpp [C++]
class Solution {
public:
    bool sequenceReconstruction(vector<int>& nums, vector<vector<int>>& sequences) {
        int n = nums.size();
        vector<vector<int>> g(n + 1);
        vector<int> indeg(n + 1, 0);
        vector<vector<char>> seen(n + 1, vector<char>(n + 1, 0));
        for (auto& seq : sequences) {
            for (int i = 1; i < seq.size(); i++) {
                int u = seq[i - 1], v = seq[i];
                if (!seen[u][v]) {
                    seen[u][v] = 1;
                    g[u].push_back(v);
                    indeg[v]++;
                }
            }
        }
        queue<int> q;
        for (int i = 1; i <= n; i++) if (indeg[i] == 0) q.push(i);
        int idx = 0;
        while (!q.empty()) {
            if (q.size() > 1) return false;
            int u = q.front(); q.pop();
            if (idx >= n || nums[idx] != u) return false;
            idx++;
            for (int v : g[u]) if (--indeg[v] == 0) q.push(v);
        }
        return idx == n;
    }
};
```

```go [Go]
func sequenceReconstruction(nums []int, sequences [][]int) bool {
    n := len(nums)
    g := make([][]int, n+1)
    indeg := make([]int, n+1)
    seen := make([][]bool, n+1)
    for i := range seen {
        seen[i] = make([]bool, n+1)
    }
    for _, seq := range sequences {
        for i := 1; i < len(seq); i++ {
            u, v := seq[i-1], seq[i]
            if !seen[u][v] {
                seen[u][v] = true
                g[u] = append(g[u], v)
                indeg[v]++
            }
        }
    }
    q := []int{}
    for i := 1; i <= n; i++ {
        if indeg[i] == 0 {
            q = append(q, i)
        }
    }
    idx := 0
    for len(q) > 0 {
        if len(q) > 1 {
            return false
        }
        u := q[0]
        q = q[1:]
        if idx >= n || nums[idx] != u {
            return false
        }
        idx++
        for _, v := range g[u] {
            indeg[v]--
            if indeg[v] == 0 {
                q = append(q, v)
            }
        }
    }
    return idx == n
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number[][]} sequences
 * @return {boolean}
 */
var sequenceReconstruction = function (nums, sequences) {
    const n = nums.length;
    const g = Array.from({ length: n + 1 }, () => []);
    const indeg = new Array(n + 1).fill(0);
    const seen = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(false));
    for (const seq of sequences) {
        for (let i = 1; i < seq.length; i++) {
            const u = seq[i - 1], v = seq[i];
            if (!seen[u][v]) {
                seen[u][v] = true;
                g[u].push(v);
                indeg[v]++;
            }
        }
    }
    const q = [];
    for (let i = 1; i <= n; i++) if (indeg[i] === 0) q.push(i);
    let idx = 0;
    while (q.length) {
        if (q.length > 1) return false;
        const u = q.shift();
        if (idx >= n || nums[idx] !== u) return false;
        idx++;
        for (const v of g[u]) {
            if (--indeg[v] === 0) q.push(v);
        }
    }
    return idx === n;
};
```

```c [C]
#include <stdlib.h>

int sequenceReconstruction(int* nums, int numsSize, int** sequences, int sequencesSize, int* sequencesColSize) {
    int n = numsSize;
    // 邻接表（n+1 个节点）
    int** g = (int**)calloc(n + 1, sizeof(int*));
    int* gSize = (int*)calloc(n + 1, sizeof(int));
    int* indeg = (int*)calloc(n + 1, sizeof(int));
    int** seen = (int**)calloc(n + 1, sizeof(int*));
    for (int i = 0; i <= n; i++) {
        g[i] = (int*)malloc((n + 1) * sizeof(int));
        seen[i] = (int*)calloc(n + 1, sizeof(int));
    }
    for (int s = 0; s < sequencesSize; s++) {
        for (int i = 1; i < sequencesColSize[s]; i++) {
            int u = sequences[s][i - 1], v = sequences[s][i];
            if (!seen[u][v]) {
                seen[u][v] = 1;
                g[u][gSize[u]++] = v;
                indeg[v]++;
            }
        }
    }
    int* q = (int*)malloc((n + 1) * sizeof(int));
    int head = 0, tail = 0;
    for (int i = 1; i <= n; i++) if (indeg[i] == 0) q[tail++] = i;
    int idx = 0;
    while (head < tail) {
        if (tail - head > 1) return 0;
        int u = q[head++];
        if (idx >= n || nums[idx] != u) return 0;
        idx++;
        for (int k = 0; k < gSize[u]; k++) {
            int v = g[u][k];
            if (--indeg[v] == 0) q[tail++] = v;
        }
    }
    int res = (idx == n);
    for (int i = 0; i <= n; i++) { free(g[i]); free(seen[i]); }
    free(g); free(gSize); free(indeg); free(seen); free(q);
    return res;
}
```

```ts [TypeScript]
function sequenceReconstruction(nums: number[], sequences: number[][]): boolean {
    const n = nums.length;
    const g: number[][] = Array.from({ length: n + 1 }, () => []);
    const indeg: number[] = new Array(n + 1).fill(0);
    const seen: boolean[][] = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(false));
    for (const seq of sequences) {
        for (let i = 1; i < seq.length; i++) {
            const u = seq[i - 1], v = seq[i];
            if (!seen[u][v]) {
                seen[u][v] = true;
                g[u].push(v);
                indeg[v]++;
            }
        }
    }
    const q: number[] = [];
    for (let i = 1; i <= n; i++) if (indeg[i] === 0) q.push(i);
    let idx = 0;
    while (q.length) {
        if (q.length > 1) return false;
        const u = q.shift()!;
        if (idx >= n || nums[idx] !== u) return false;
        idx++;
        for (const v of g[u]) {
            if (--indeg[v] === 0) q.push(v);
        }
    }
    return idx === n;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(Σ seq + n)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 拓扑唯一性判断 | `O(Σseq+n)` | `O(n)` | 标准解法 |

「唯一最短超序列」即唯一拓扑序。Kahn 拓扑排序中，若某一轮存在多个入度为 0 的候选，说明拓扑序不唯一；逐位比对 `nums` 即可确认是否为给定的唯一序列。

