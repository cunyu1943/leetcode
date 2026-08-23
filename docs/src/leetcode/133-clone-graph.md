# [133. 克隆图](https://leetcode.cn/problems/clone-graph/)



## 一、题目描述

给你无向 **连通** 图中一个节点的引用，请你返回该图的 **深拷贝**（克隆）。

图中的每个节点都包含它的值 `val`（`int`）和其邻居的列表（`list[Node]`）。

```
class Node {
    public int val;
    public List<Node> neighbors;
}
```



**示例 1：**

```
输入：adjList = [[2,4],[1,3],[2,4],[1,3]]
输出：[[2,4],[1,3],[2,4],[1,3]]
解释：图中有 4 个节点。节点 1 的值是 1，它有两个邻居：节点 2 和 4。节点 2 的值是 2，它有两个邻居：节点 1 和 3 ……
```

**示例 2：**

```
输入：adjList = [[]]
输出：[[]]
解释：输入包含一个空列表。该图仅仅只有一个值为 1 的节点，它没有任何邻居。
```

**示例 3：**

```
输入：adjList = []
输出：[]
解释：图为空，返回空。
```

**提示：**

- 节点数不超过 `100`。
- 每个节点值 `Node.val` 都是唯一的，`1 <= Node.val <= 100`。
- 无向图是一个简单图，即没有重复边，也没有自环。
- 由于图是无向的，如果节点 `p` 是节点 `q` 的邻居，那么节点 `q` 也必定是节点 `p` 的邻居。
- 图是连通图，你可以从给定节点访问到所有节点。



## 二、解答方法

### 2.1 方法一：DFS + 哈希表

1. **思路**

图可能包含环，克隆时必须保证每个节点只被创建一次，否则会无限递归。用哈希表 `visited` 建立「原节点 -> 克隆节点」的映射：

- 若当前节点已在 `visited` 中，直接返回其克隆；
- 否则创建克隆节点（只赋值 `val`，`neighbors` 暂空），先放入 `visited`；
- 递归克隆其所有邻居，把克隆后的邻居加入当前克隆节点的 `neighbors`；
- 返回克隆节点。

先放映射再递归，能正确处理环。

2. **代码实现**

::::: code-group

```java [Java]
/**
 * Definition for a Node.
 * class Node {
 *     public int val;
 *     public List<Node> neighbors;
 *     public Node() {
 *         val = 0;
 *         neighbors = new ArrayList<Node>();
 *     }
 *     public Node(int _val) {
 *         val = _val;
 *         neighbors = new ArrayList<Node>();
 *     }
 *     public Node(int _val, ArrayList<Node> _neighbors) {
 *         val = _val;
 *         neighbors = _neighbors;
 *     }
 * }
 */
class Solution {
    private Map<Node, Node> visited = new HashMap<>();

    public Node cloneGraph(Node node) {
        if (node == null) return null;
        if (visited.containsKey(node)) return visited.get(node);

        Node clone = new Node(node.val);
        visited.put(node, clone);
        for (Node neighbor : node.neighbors) {
            clone.neighbors.add(cloneGraph(neighbor));
        }
        return clone;
    }
}
```

```python [Python]
# Definition for a Node.
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

class Solution:
    def __init__(self):
        self.visited = {}

    def cloneGraph(self, node: 'Node') -> 'Node':
        if not node:
            return None
        if node in self.visited:
            return self.visited[node]

        clone = Node(node.val)
        self.visited[node] = clone
        for neighbor in node.neighbors:
            clone.neighbors.append(self.cloneGraph(neighbor))
        return clone
```

```cpp [C++]
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() {
        val = 0;
        neighbors = vector<Node*>();
    }
    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
    Node(int _val, vector<Node*> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
};
*/
class Solution {
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;
        if (visited.count(node)) return visited[node];
        Node* clone = new Node(node->val);
        visited[node] = clone;
        for (Node* neighbor : node->neighbors) {
            clone->neighbors.push_back(cloneGraph(neighbor));
        }
        return clone;
    }
private:
    unordered_map<Node*, Node*> visited;
};
```

```go [Go]
/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Neighbors []*Node
 * }
 */
func cloneGraph(node *Node) *Node {
    visited := make(map[*Node]*Node)
	var dfs func(*Node) *Node
	dfs = func(n *Node) *Node {
		if n == nil {
			return nil
		}
		if c, ok := visited[n]; ok {
			return c
		}
		clone := &Node{Val: n.Val}
		visited[n] = clone
		for _, neighbor := range n.Neighbors {
			clone.Neighbors = append(clone.Neighbors, dfs(neighbor))
		}
		return clone
	}
	return dfs(node)
}
```

```js [JavaScript]
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *     this.val = val === undefined ? 0 : val;
 *     this.neighbors = neighbors === undefined ? [] : neighbors;
 * }
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node) {
    if (!node) return null;
    const visited = new Map();

    const dfs = (n) => {
        if (visited.has(n)) return visited.get(n);
        const clone = new Node(n.val);
        visited.set(n, clone);
        for (const neighbor of n.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }
        return clone;
    };

    return dfs(node);
};
```

```c [C]
#include <stdlib.h>

struct Node {
    int val;
    int numNeighbors;
    struct Node** neighbors;
};

struct Node* dfs(struct Node* node, struct Node** visited) {
    if (!node) return NULL;
    if (visited[node->val]) return visited[node->val];
    struct Node* clone = (struct Node*)malloc(sizeof(struct Node));
    clone->val = node->val;
    clone->numNeighbors = node->numNeighbors;
    clone->neighbors = (struct Node**)malloc(node->numNeighbors * sizeof(struct Node*));
    visited[node->val] = clone;
    for (int i = 0; i < node->numNeighbors; i++)
        clone->neighbors[i] = dfs(node->neighbors[i], visited);
    return clone;
}

struct Node* cloneGraph(struct Node* node) {
    if (!node) return NULL;
    struct Node** visited = (struct Node**)calloc(101, sizeof(struct Node*));
    struct Node* res = dfs(node, visited);
    free(visited);
    return res;
}
```

```ts [TypeScript]
class Node {
    val: number;
    neighbors: Node[];
    constructor(val?: number, neighbors?: Node[]) {
        this.val = val ?? 0;
        this.neighbors = neighbors ?? [];
    }
}

function cloneGraph(node: Node | null): Node | null {
    if (!node) return null;
    const visited = new Map<Node, Node>();

    const dfs = (n: Node): Node => {
        if (visited.has(n)) return visited.get(n)!;
        const clone = new Node(n.val);
        visited.set(n, clone);
        for (const neighbor of n.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }
        return clone;
    };
    return dfs(node);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点与每条边都只被访问一次。
- **空间复杂度**：`O(n)`，哈希表存储所有节点映射，递归栈最坏 `O(n)`。

### 2.2 方法二：BFS + 哈希表

1. **思路**

用 BFS 逐层克隆，同样借助哈希表避免重复创建：

- 创建起点克隆并放入 `visited`，起点入队；
- 每次出队一个原节点，遍历其邻居：
  - 若邻居未克隆过，则创建并放入 `visited`，同时入队；
  - 把（已克隆的）邻居加入当前克隆节点的 `neighbors`。

BFS 用显式队列，避免深图递归栈过深。

2. **代码实现**

::::: code-group

```java [Java]
/**
 * Definition for a Node.
 * class Node {
 *     public int val;
 *     public List<Node> neighbors;
 *     public Node() { val = 0; neighbors = new ArrayList<Node>(); }
 *     public Node(int _val) { val = _val; neighbors = new ArrayList<Node>(); }
 *     public Node(int _val, ArrayList<Node> _neighbors) { val = _val; neighbors = _neighbors; }
 * }
 */
class Solution {
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        Map<Node, Node> visited = new HashMap<>();
        Queue<Node> queue = new LinkedList<>();
        Node cloneNode = new Node(node.val);
        visited.put(node, cloneNode);
        queue.offer(node);

        while (!queue.isEmpty()) {
            Node cur = queue.poll();
            for (Node neighbor : cur.neighbors) {
                if (!visited.containsKey(neighbor)) {
                    visited.put(neighbor, new Node(neighbor.val));
                    queue.offer(neighbor);
                }
                visited.get(cur).neighbors.add(visited.get(neighbor));
            }
        }
        return cloneNode;
    }
}
```

```python [Python]
# Definition for a Node.
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        if not node:
            return None
        from collections import deque
        visited = {}
        clone_node = Node(node.val)
        visited[node] = clone_node
        queue = deque([node])

        while queue:
            cur = queue.popleft()
            for neighbor in cur.neighbors:
                if neighbor not in visited:
                    visited[neighbor] = Node(neighbor.val)
                    queue.append(neighbor)
                visited[cur].neighbors.append(visited[neighbor])
        return clone_node
```

```cpp [C++]
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() { val = 0; neighbors = vector<Node*>(); }
    Node(int _val) { val = _val; neighbors = vector<Node*>(); }
    Node(int _val, vector<Node*> _neighbors) { val = _val; neighbors = _neighbors; }
};
*/
class Solution {
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;
        unordered_map<Node*, Node*> visited;
        queue<Node*> q;
        Node* cloneNode = new Node(node->val);
        visited[node] = cloneNode;
        q.push(node);

        while (!q.empty()) {
            Node* cur = q.front(); q.pop();
            for (Node* neighbor : cur->neighbors) {
                if (!visited.count(neighbor)) {
                    visited[neighbor] = new Node(neighbor->val);
                    q.push(neighbor);
                }
                visited[cur]->neighbors.push_back(visited[neighbor]);
            }
        }
        return cloneNode;
    }
};
```

```go [Go]
/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Neighbors []*Node
 * }
 */
func cloneGraph(node *Node) *Node {
    if node == nil {
        return nil
    }
    visited := make(map[*Node]*Node)
    queue := []*Node{node}
    cloneNode := &Node{Val: node.Val}
    visited[node] = cloneNode

    for len(queue) > 0 {
        cur := queue[0]
        queue = queue[1:]
        for _, neighbor := range cur.Neighbors {
            if _, ok := visited[neighbor]; !ok {
                visited[neighbor] = &Node{Val: neighbor.Val}
                queue = append(queue, neighbor)
            }
            visited[cur].Neighbors = append(visited[cur].Neighbors, visited[neighbor])
        }
    }
    return cloneNode
}
```

```js [JavaScript]
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *     this.val = val === undefined ? 0 : val;
 *     this.neighbors = neighbors === undefined ? [] : neighbors;
 * }
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node) {
    if (!node) return null;
    const visited = new Map();
    const queue = [node];
    const cloneNode = new Node(node.val);
    visited.set(node, cloneNode);

    while (queue.length) {
        const cur = queue.shift();
        for (const neighbor of cur.neighbors) {
            if (!visited.has(neighbor)) {
                visited.set(neighbor, new Node(neighbor.val));
                queue.push(neighbor);
            }
            visited.get(cur).neighbors.push(visited.get(neighbor));
        }
    }
    return cloneNode;
};
```

```c [C]
#include <stdlib.h>

struct Node {
    int val;
    int numNeighbors;
    struct Node** neighbors;
};

struct Node* cloneGraph(struct Node* node) {
    if (!node) return NULL;
    struct Node** visited = (struct Node**)calloc(101, sizeof(struct Node*));
    struct Node** q = (struct Node**)malloc(101 * sizeof(struct Node*));
    int qh = 0, qt = 0;
    struct Node* cloneNode = (struct Node*)malloc(sizeof(struct Node));
    cloneNode->val = node->val;
    cloneNode->numNeighbors = node->numNeighbors;
    cloneNode->neighbors = (struct Node**)malloc(node->numNeighbors * sizeof(struct Node*));
    visited[node->val] = cloneNode;
    q[qt++] = node;

    while (qh < qt) {
        struct Node* cur = q[qh++];
        for (int i = 0; i < cur->numNeighbors; i++) {
            struct Node* nb = cur->neighbors[i];
            if (!visited[nb->val]) {
                struct Node* c = (struct Node*)malloc(sizeof(struct Node));
                c->val = nb->val;
                c->numNeighbors = nb->numNeighbors;
                c->neighbors = (struct Node**)malloc(nb->numNeighbors * sizeof(struct Node*));
                visited[nb->val] = c;
                q[qt++] = nb;
            }
            visited[cur->val]->neighbors[i] = visited[nb->val];
        }
    }
    free(q); free(visited);
    return cloneNode;
}
```

```ts [TypeScript]
class Node {
    val: number;
    neighbors: Node[];
    constructor(val?: number, neighbors?: Node[]) {
        this.val = val ?? 0;
        this.neighbors = neighbors ?? [];
    }
}

function cloneGraph(node: Node | null): Node | null {
    if (!node) return null;
    const visited = new Map<Node, Node>();
    const cloneNode = new Node(node.val);
    visited.set(node, cloneNode);
    const queue: Node[] = [node];

    while (queue.length) {
        const cur = queue.shift()!;
        for (const neighbor of cur.neighbors) {
            if (!visited.has(neighbor)) {
                visited.set(neighbor, new Node(neighbor.val));
                queue.push(neighbor);
            }
            visited.get(cur)!.neighbors.push(visited.get(neighbor)!);
        }
    }
    return cloneNode;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点、每条边访问一次。
- **空间复杂度**：`O(n)`，哈希表与队列。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| DFS + 哈希表 | `O(n)` | `O(n)` | 代码最短，推荐 |
| BFS + 哈希表 | `O(n)` | `O(n)` | 非递归，避免栈溢出 |

核心要点都是「用哈希表记录原节点与克隆节点的对应关系」，保证每个节点只被克隆一次，从而正确处理环。
