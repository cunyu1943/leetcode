# [面试题 04.01. 节点间通路](https://leetcode.cn/problems/route-between-nodes-lcci/)

## 一、题目描述

给定有向图，设计一个算法，找出两个节点之间是否存在一条路径。

**示例 1：**

```
输入：n = 3, graph = [[0, 1], [0, 2], [1, 2], [1, 2]], start = 0, target = 2
输出：true
```

**示例 2：**

```
输入：n = 5, graph = [[0, 1], [0, 2], [0, 4], [0, 4], [0, 1], [1, 3], [1, 4], [1, 3], [2, 3], [3, 4]], start = 0, target = 4
输出：true
```

**提示：**

- 节点数量 `n` 在 `[0, 100000]` 范围内。
- 边数量 `graph.length` 在 `[0, 100000]` 范围内。
- 图中可能存在自环和平行边。
- `start` 和 `target` 是有效的节点编号。

---

## 二、解答方法

### 2.1 方法一：深度优先搜索（DFS）

**1. 思路**

使用邻接表构建图。从 `start` 节点开始进行深度优先遍历，使用一个布尔数组 `visited` 记录已访问节点，避免重复访问。若在遍历过程中遇到 `target`，则返回 `true`；否则遍历完所有可达节点后返回 `false`。

DFS 可用递归或显式栈实现。递归代码简洁，但注意节点数量较大时可能栈溢出，此处使用迭代栈更安全。

**2. 代码实现**

:::::: code-group

```java [Java]
import java.util.*;

class Solution {
    public boolean findWhetherExistsPath(int n, int[][] graph, int start, int target) {
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] edge : graph) {
            adj[edge[0]].add(edge[1]);
        }
        boolean[] visited = new boolean[n];
        Stack<Integer> stack = new Stack<>();
        stack.push(start);
        while (!stack.isEmpty()) {
            int cur = stack.pop();
            if (cur == target) return true;
            if (visited[cur]) continue;
            visited[cur] = true;
            for (int next : adj[cur]) {
                if (!visited[next]) stack.push(next);
            }
        }
        return false;
    }
}
```

```python [Python]
class Solution:
    def findWhetherExistsPath(self, n: int, graph: List[List[int]], start: int, target: int) -> bool:
        adj = [[] for _ in range(n)]
        for u, v in graph:
            adj[u].append(v)
        visited = [False] * n
        stack = [start]
        while stack:
            cur = stack.pop()
            if cur == target:
                return True
            if visited[cur]:
                continue
            visited[cur] = True
            for nxt in adj[cur]:
                if not visited[nxt]:
                    stack.append(nxt)
        return False
```

```go [Go]
func findWhetherExistsPath(n int, graph [][]int, start int, target int) bool {
    adj := make([][]int, n)
    for _, edge := range graph {
        u, v := edge[0], edge[1]
        adj[u] = append(adj[u], v)
    }
    visited := make([]bool, n)
    stack := []int{start}
    for len(stack) > 0 {
        cur := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        if cur == target {
            return true
        }
        if visited[cur] {
            continue
        }
        visited[cur] = true
        for _, nxt := range adj[cur] {
            if !visited[nxt] {
                stack = append(stack, nxt)
            }
        }
    }
    return false
}
```

```c [C]
#include <stdbool.h>
#include <stdlib.h>

typedef struct AdjListNode {
    int val;
    struct AdjListNode* next;
} AdjListNode;

typedef struct {
    AdjListNode** heads;
    int size;
} Graph;

void addEdge(Graph* g, int u, int v) {
    AdjListNode* node = (AdjListNode*)malloc(sizeof(AdjListNode));
    node->val = v;
    node->next = g->heads[u];
    g->heads[u] = node;
}

bool findWhetherExistsPath(int n, int** graph, int graphSize, int* graphColSize, int start, int target) {
    Graph* g = (Graph*)malloc(sizeof(Graph));
    g->heads = (AdjListNode**)calloc(n, sizeof(AdjListNode*));
    g->size = n;
    for (int i = 0; i < graphSize; i++) {
        addEdge(g, graph[i][0], graph[i][1]);
    }
    bool* visited = (bool*)calloc(n, sizeof(bool));
    int* stack = (int*)malloc(n * sizeof(int));
    int top = 0;
    stack[top++] = start;
    while (top > 0) {
        int cur = stack[--top];
        if (cur == target) {
            free(visited); free(stack); free(g->heads); free(g);
            return true;
        }
        if (visited[cur]) continue;
        visited[cur] = true;
        AdjListNode* node = g->heads[cur];
        while (node) {
            if (!visited[node->val]) stack[top++] = node->val;
            node = node->next;
        }
    }
    free(visited); free(stack); free(g->heads); free(g);
    return false;
}
```

```cpp [C++]
class Solution {
public:
    bool findWhetherExistsPath(int n, vector<vector<int>>& graph, int start, int target) {
        vector<vector<int>> adj(n);
        for (auto& edge : graph) {
            adj[edge[0]].push_back(edge[1]);
        }
        vector<bool> visited(n, false);
        stack<int> st;
        st.push(start);
        while (!st.empty()) {
            int cur = st.top();
            st.pop();
            if (cur == target) return true;
            if (visited[cur]) continue;
            visited[cur] = true;
            for (int nxt : adj[cur]) {
                if (!visited[nxt]) st.push(nxt);
            }
        }
        return false;
    }
};
```

```javascript [JavaScript]
var findWhetherExistsPath = function(n, graph, start, target) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of graph) {
        adj[u].push(v);
    }
    const visited = new Array(n).fill(false);
    const stack = [start];
    while (stack.length) {
        const cur = stack.pop();
        if (cur === target) return true;
        if (visited[cur]) continue;
        visited[cur] = true;
        for (const nxt of adj[cur]) {
            if (!visited[nxt]) stack.push(nxt);
        }
    }
    return false;
};
```

```typescript [TypeScript]
function findWhetherExistsPath(n: number, graph: number[][], start: number, target: number): boolean {
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of graph) {
        adj[u].push(v);
    }
    const visited: boolean[] = new Array(n).fill(false);
    const stack: number[] = [start];
    while (stack.length) {
        const cur = stack.pop()!;
        if (cur === target) return true;
        if (visited[cur]) continue;
        visited[cur] = true;
        for (const nxt of adj[cur]) {
            if (!visited[nxt]) stack.push(nxt);
        }
    }
    return false;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n + e)`，其中 `n` 为节点数，`e` 为边数，需要遍历所有节点和边一次。
- **空间复杂度**：`O(n + e)`，用于存储邻接表和访问状态。

---

### 2.2 方法二：广度优先搜索（BFS）

**1. 思路**

与 DFS 类似，但使用队列进行广度优先遍历。从 `start` 开始逐层扩展，若遇到 `target` 则返回 `true`。BFS 同样需要 `visited` 数组避免重复访问。

**2. 代码实现**

:::::: code-group

```java [Java]
import java.util.*;

class Solution {
    public boolean findWhetherExistsPath(int n, int[][] graph, int start, int target) {
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] edge : graph) {
            adj[edge[0]].add(edge[1]);
        }
        boolean[] visited = new boolean[n];
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(start);
        while (!queue.isEmpty()) {
            int cur = queue.poll();
            if (cur == target) return true;
            if (visited[cur]) continue;
            visited[cur] = true;
            for (int next : adj[cur]) {
                if (!visited[next]) queue.offer(next);
            }
        }
        return false;
    }
}
```

```python [Python]
from collections import deque

class Solution:
    def findWhetherExistsPath(self, n: int, graph: List[List[int]], start: int, target: int) -> bool:
        adj = [[] for _ in range(n)]
        for u, v in graph:
            adj[u].append(v)
        visited = [False] * n
        q = deque([start])
        while q:
            cur = q.popleft()
            if cur == target:
                return True
            if visited[cur]:
                continue
            visited[cur] = True
            for nxt in adj[cur]:
                if not visited[nxt]:
                    q.append(nxt)
        return False
```

```go [Go]
func findWhetherExistsPath(n int, graph [][]int, start int, target int) bool {
    adj := make([][]int, n)
    for _, edge := range graph {
        u, v := edge[0], edge[1]
        adj[u] = append(adj[u], v)
    }
    visited := make([]bool, n)
    queue := []int{start}
    for len(queue) > 0 {
        cur := queue[0]
        queue = queue[1:]
        if cur == target {
            return true
        }
        if visited[cur] {
            continue
        }
        visited[cur] = true
        for _, nxt := range adj[cur] {
            if !visited[nxt] {
                queue = append(queue, nxt)
            }
        }
    }
    return false
}
```

```c [C]
#include <stdbool.h>
#include <stdlib.h>

typedef struct AdjListNode {
    int val;
    struct AdjListNode* next;
} AdjListNode;

typedef struct {
    AdjListNode** heads;
    int size;
} Graph;

void addEdge(Graph* g, int u, int v) {
    AdjListNode* node = (AdjListNode*)malloc(sizeof(AdjListNode));
    node->val = v;
    node->next = g->heads[u];
    g->heads[u] = node;
}

bool findWhetherExistsPath(int n, int** graph, int graphSize, int* graphColSize, int start, int target) {
    Graph* g = (Graph*)malloc(sizeof(Graph));
    g->heads = (AdjListNode**)calloc(n, sizeof(AdjListNode*));
    g->size = n;
    for (int i = 0; i < graphSize; i++) {
        addEdge(g, graph[i][0], graph[i][1]);
    }
    bool* visited = (bool*)calloc(n, sizeof(bool));
    int* queue = (int*)malloc(n * sizeof(int));
    int head = 0, tail = 0;
    queue[tail++] = start;
    while (head < tail) {
        int cur = queue[head++];
        if (cur == target) {
            free(visited); free(queue); free(g->heads); free(g);
            return true;
        }
        if (visited[cur]) continue;
        visited[cur] = true;
        AdjListNode* node = g->heads[cur];
        while (node) {
            if (!visited[node->val]) queue[tail++] = node->val;
            node = node->next;
        }
    }
    free(visited); free(queue); free(g->heads); free(g);
    return false;
}
```

```cpp [C++]
class Solution {
public:
    bool findWhetherExistsPath(int n, vector<vector<int>>& graph, int start, int target) {
        vector<vector<int>> adj(n);
        for (auto& edge : graph) {
            adj[edge[0]].push_back(edge[1]);
        }
        vector<bool> visited(n, false);
        queue<int> q;
        q.push(start);
        while (!q.empty()) {
            int cur = q.front();
            q.pop();
            if (cur == target) return true;
            if (visited[cur]) continue;
            visited[cur] = true;
            for (int nxt : adj[cur]) {
                if (!visited[nxt]) q.push(nxt);
            }
        }
        return false;
    }
};
```

```javascript [JavaScript]
var findWhetherExistsPath = function(n, graph, start, target) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of graph) {
        adj[u].push(v);
    }
    const visited = new Array(n).fill(false);
    const queue = [start];
    while (queue.length) {
        const cur = queue.shift();
        if (cur === target) return true;
        if (visited[cur]) continue;
        visited[cur] = true;
        for (const nxt of adj[cur]) {
            if (!visited[nxt]) queue.push(nxt);
        }
    }
    return false;
};
```

```typescript [TypeScript]
function findWhetherExistsPath(n: number, graph: number[][], start: number, target: number): boolean {
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of graph) {
        adj[u].push(v);
    }
    const visited: boolean[] = new Array(n).fill(false);
    const queue: number[] = [start];
    while (queue.length) {
        const cur = queue.shift()!;
        if (cur === target) return true;
        if (visited[cur]) continue;
        visited[cur] = true;
        for (const nxt of adj[cur]) {
            if (!visited[nxt]) queue.push(nxt);
        }
    }
    return false;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n + e)`。
- **空间复杂度**：`O(n + e)`。

---

## 三、总结

| 方法          | 时间复杂度 | 空间复杂度 | 特点               |
| ------------- | ---------- | ---------- | ------------------ |
| DFS（迭代栈） | `O(n+e)`   | `O(n+e)`   | 使用栈，代码简洁   |
| BFS（队列）   | `O(n+e)`   | `O(n+e)`   | 使用队列，同样高效 |

两种方法均可正确求解，选择哪一种取决于个人偏好。在实际生产中，若图较大且路径较浅，BFS 可能更早找到；若图较深，DFS 可能更省内存（但需注意递归栈风险，使用迭代版本可避免）。推荐使用 **DFS 迭代** 或 **BFS**，两者均稳定可靠。
