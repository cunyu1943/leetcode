# [207. 课程表](https://leetcode.cn/problems/course-schedule/)



## 一、题目描述

你这个学期必须选修 `numCourses` 门课程，记为 `0` 到 `numCourses - 1` 。

在选修某些课程之前需要一些先修课程。 先修课程按数组 `prerequisites` 给出，其中 `prerequisites[i] = [ai, bi]` ，表示如果要学习课程 `ai` 则 **必须** 先学习课程 `bi` 。

例如，先修课程对 `[0, 1]` 表示：想要学习课程 `0` ，你需要先完成课程 `1` 。

请你判断是否可能完成所有课程的学习？如果可以，返回 `true` ；否则，返回 `false` 。



**示例 1：**

```
输入：numCourses = 2, prerequisites = [[1,0]]
输出：true
解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0。这是可能的。
```

**示例 2：**

```
输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
输出：false
解释：总共有 2 门课程。学习课程 1 之前需要完成课程 0，学习课程 0 之前需要完成课程 1。这是不可能的。
```

**提示：**

-   `1 <= numCourses <= 2000`
-   `0 <= prerequisites.length <= 5000`
-   `prerequisites[i].length == 2`
-   `0 <= ai, bi < numCourses`
-   `prerequisites[i]` 中的所有课程对 **互不相同**



## 二、解答方法

### 2.1 方法一：拓扑排序（BFS / Kahn 算法）

1. **思路**

把课程看作有向图节点，`[ai, bi]` 表示边 `bi → ai`（先修 → 后续）。

1. 统计每门课的 **入度**（依赖的先修课数量），建邻接表；
2. 把入度为 0 的课程入队（可以直接学）；
3. 不断出队课程 `c`，把它指向的课程入度减 1，若减到 0 则入队；
4. 最后统计出队课程数，若等于 `numCourses` 则无环，可以完成。

本质是 **判断有向图是否有环**。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
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
        int count = 0;
        while (!queue.isEmpty()) {
            int c = queue.poll();
            count++;
            for (int next : graph.get(c)) {
                if (--indegree[next] == 0) queue.offer(next);
            }
        }
        return count == numCourses;
    }
}
```

```python [Python]
class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        from collections import deque
        graph = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses
        for a, b in prerequisites:
            graph[b].append(a)
            indegree[a] += 1
        q = deque(i for i in range(numCourses) if indegree[i] == 0)
        count = 0
        while q:
            c = q.popleft()
            count += 1
            for nxt in graph[c]:
                indegree[nxt] -= 1
                if indegree[nxt] == 0:
                    q.append(nxt)
        return count == numCourses
```

```go [Go]
func canFinish(numCourses int, prerequisites [][]int) bool {
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
    count := 0
    for len(queue) > 0 {
        c := queue[0]
        queue = queue[1:]
        count++
        for _, next := range graph[c] {
            indegree[next]--
            if indegree[next] == 0 {
                queue = append(queue, next)
            }
        }
    }
    return count == numCourses
}
```

```cpp [C++]
class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> graph(numCourses);
        vector<int> indegree(numCourses, 0);
        for (auto& p : prerequisites) {
            graph[p[1]].push_back(p[0]);
            indegree[p[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; i++) if (indegree[i] == 0) q.push(i);
        int count = 0;
        while (!q.empty()) {
            int c = q.front(); q.pop();
            count++;
            for (int next : graph[c]) {
                if (--indegree[next] == 0) q.push(next);
            }
        }
        return count == numCourses;
    }
};
```

```js [JavaScript]
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => []);
    const indegree = new Array(numCourses).fill(0);
    for (const [a, b] of prerequisites) {
        graph[b].push(a);
        indegree[a]++;
    }
    const queue = [];
    for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) queue.push(i);
    let count = 0;
    while (queue.length) {
        const c = queue.shift();
        count++;
        for (const next of graph[c]) {
            if (--indegree[next] === 0) queue.push(next);
        }
    }
    return count === numCourses;
};
```

```ts [TypeScript]
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const graph: number[][] = Array.from({ length: numCourses }, () => []);
    const indegree = new Array(numCourses).fill(0);
    for (const [a, b] of prerequisites) {
        graph[b].push(a);
        indegree[a]++;
    }
    const queue: number[] = [];
    for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) queue.push(i);
    let count = 0;
    while (queue.length) {
        const c = queue.shift()!;
        count++;
        for (const next of graph[c]) {
            if (--indegree[next] === 0) queue.push(next);
        }
    }
    return count === numCourses;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(V + E)`，V 为课程数，E 为先修关系数。
- **空间复杂度**：`O(V + E)`。

### 2.2 方法二：DFS 三色标记检测环

1. **思路**

用 `visited[i]` 三态：`0` 未访问、`1` 正在访问（当前递归栈中）、`2` 已完成。DFS 时若遇到状态 `1` 的节点说明存在环；visited 为 `2` 的节点直接跳过。

2. **代码实现（Python）**

```python
class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        graph = [[] for _ in range(numCourses)]
        for a, b in prerequisites:
            graph[b].append(a)
        visited = [0] * numCourses

        def dfs(c):
            if visited[c] == 1:
                return False   # 遇到环
            if visited[c] == 2:
                return True
            visited[c] = 1
            for nxt in graph[c]:
                if not dfs(nxt):
                    return False
            visited[c] = 2
            return True

        return all(dfs(i) for i in range(numCourses))
```

3. **复杂度分析**

- **时间复杂度**：`O(V + E)`。
- **空间复杂度**：`O(V + E)`（递归栈 + 邻接表）。

## 三、总结

| 方法 | 思路 |
| ---- | ---- |
| Kahn（BFS 入度） | 入度为 0 入队，计数是否等于总课程数 |
| DFS 三色标记 | 遇「正在访问」节点即有环 |

本题是 **拓扑排序** 的入门题：判断有向图是否有环。若要求输出具体学习顺序，则用 `210. 课程表 II`（BFS 时把出队顺序记录下来即可）。
