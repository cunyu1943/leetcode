# [210. 课程表 II](https://leetcode.cn/problems/course-schedule-ii/)



## 一、题目描述

现在你总共有 `numCourses` 门课需要选，记为 `0` 到 `numCourses - 1`。给你一个数组 `prerequisites` ，其中 `prerequisites[i] = [ai, bi]` ，表示在选修课程 `ai` 前 **必须** 先选修 `bi` 。

例如，想要学习课程 `0` ，你需要先完成课程 `1` ，我们用一个匹配来表示：`[0,1]` 。

返回你为了学完所有课程所安排的学习顺序。可能会有多个正确的顺序，你只要返回 **任意一种** 就可以了。如果不可能完成所有课程，返回 **一个空数组** 。



**示例 1：**

```
输入：numCourses = 2, prerequisites = [[1,0]]
输出：[0,1]
解释：总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为 [0,1]。
```

**示例 2：**

```
输入：numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
输出：[0,2,1,3]
解释：总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2，且它们都应在课程 0 之后。
     因此，一个正确的课程顺序是 [0,1,2,3]，另一个正确的排序是 [0,2,1,3]。
```

**示例 3：**

```
输入：numCourses = 1, prerequisites = []
输出：[0]
```

**提示：**

-   `1 <= numCourses <= 2000`
-   `0 <= prerequisites.length <= numCourses * (numCourses - 1)`
-   `prerequisites[i].length == 2`
-   `0 <= ai, bi < numCourses`
-   `ai != bi`
-   所有 `[ai, bi]` 互不相同



## 二、解答方法

### 2.1 方法一：拓扑排序（BFS / Kahn 算法）

1. **思路**

与 207 题相同，只是把出队的课程依次加入结果数组，即得到一个合法的拓扑序。若最终课程数不足 `numCourses`（有环），返回空数组。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
        int[] indegree = new int[numCourses];
        for (int[] p : prerequisites) {
            graph.get(p[1]).add(p[0]);
            indegree[p[0]]++;
        }
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) queue.offer(i);
        }
        int[] order = new int[numCourses];
        int idx = 0;
        while (!queue.isEmpty()) {
            int c = queue.poll();
            order[idx++] = c;
            for (int next : graph.get(c)) {
                if (--indegree[next] == 0) queue.offer(next);
            }
        }
        return idx == numCourses ? order : new int[0];
    }
}
```

```python [Python]
class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        from collections import deque
        graph = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses
        for a, b in prerequisites:
            graph[b].append(a)
            indegree[a] += 1
        q = deque(i for i in range(numCourses) if indegree[i] == 0)
        order = []
        while q:
            c = q.popleft()
            order.append(c)
            for nxt in graph[c]:
                indegree[nxt] -= 1
                if indegree[nxt] == 0:
                    q.append(nxt)
        return order if len(order) == numCourses else []
```

```go [Go]
func findOrder(numCourses int, prerequisites [][]int) []int {
    graph := make([][]int, numCourses)
    indegree := make([]int, numCourses)
    for _, p := range prerequisites {
        graph[p[1]] = append(graph[p[1]], p[0])
        indegree[p[0]]++
    }
    queue := []int{}
    for i := 0; i < numCourses; i++ {
        if indegree[i] == 0 {
            queue = append(queue, i)
        }
    }
    order := []int{}
    for len(queue) > 0 {
        c := queue[0]
        queue = queue[1:]
        order = append(order, c)
        for _, next := range graph[c] {
            indegree[next]--
            if indegree[next] == 0 {
                queue = append(queue, next)
            }
        }
    }
    if len(order) != numCourses {
        return []int{}
    }
    return order
}
```

```cpp [C++]
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> graph(numCourses);
        vector<int> indegree(numCourses, 0);
        for (auto& p : prerequisites) {
            graph[p[1]].push_back(p[0]);
            indegree[p[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; i++) if (indegree[i] == 0) q.push(i);
        vector<int> order;
        while (!q.empty()) {
            int c = q.front(); q.pop();
            order.push_back(c);
            for (int next : graph[c]) {
                if (--indegree[next] == 0) q.push(next);
            }
        }
        if (order.size() != numCourses) return {};
        return order;
    }
};
```

```js [JavaScript]
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => []);
    const indegree = new Array(numCourses).fill(0);
    for (const [a, b] of prerequisites) {
        graph[b].push(a);
        indegree[a]++;
    }
    const queue = [];
    for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) queue.push(i);
    const order = [];
    while (queue.length) {
        const c = queue.shift();
        order.push(c);
        for (const next of graph[c]) {
            if (--indegree[next] === 0) queue.push(next);
        }
    }
    return order.length === numCourses ? order : [];
};
```

```ts [TypeScript]
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const graph: number[][] = Array.from({ length: numCourses }, () => []);
    const indegree = new Array(numCourses).fill(0);
    for (const [a, b] of prerequisites) {
        graph[b].push(a);
        indegree[a]++;
    }
    const queue: number[] = [];
    for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) queue.push(i);
    const order: number[] = [];
    while (queue.length) {
        const c = queue.shift()!;
        order.push(c);
        for (const next of graph[c]) {
            if (--indegree[next] === 0) queue.push(next);
        }
    }
    return order.length === numCourses ? order : [];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(V + E)`。
- **空间复杂度**：`O(V + E)`。

### 2.2 方法二：DFS 后序遍历（逆拓扑序）

1. **思路**

DFS 访问完某节点的所有后继后，把该节点加入栈（后序）。最终 **逆序** 输出栈即为拓扑序。用三色标记检测环。

2. **代码实现（Python）**

```python
class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        graph = [[] for _ in range(numCourses)]
        for a, b in prerequisites:
            graph[b].append(a)
        visited = [0] * numCourses
        order = []

        def dfs(c):
            if visited[c] == 1:
                return False
            if visited[c] == 2:
                return True
            visited[c] = 1
            for nxt in graph[c]:
                if not dfs(nxt):
                    return False
            visited[c] = 2
            order.append(c)
            return True

        for i in range(numCourses):
            if not dfs(i):
                return []
        return order[::-1]
```

3. **复杂度分析**

- **时间复杂度**：`O(V + E)`。
- **空间复杂度**：`O(V + E)`。

## 三、总结

| 方法 | 顺序来源 |
| ---- | -------- |
| Kahn（BFS） | 入度为 0 依次出队 |
| DFS 后序 | 后序入栈后逆序输出 |

207 题只判断「能否完成」，210 题要求 **输出一个合法拓扑序**。若要求「字典序最小」的拓扑序，把 BFS 的普通队列换成 **优先队列（小顶堆）** 即可。
