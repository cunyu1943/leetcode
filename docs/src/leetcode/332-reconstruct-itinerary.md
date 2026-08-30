# [332. 重新安排行程](https://leetcode.cn/problems/reconstruct-itinerary/)

## 一、题目描述

给你一份机票列表 `tickets`（每张 `[from, to]`），从一个出发机场 `JFK` 出发，用掉所有机票，找出一条 **字典序最小** 的行程路线（每个机场只出现一次，且必须用完所有机票）。返回行程机场列表。

**示例：**
```
输入：tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
输出：["JFK","MUC","LHR","SFO","SJC"]
```

**提示：** `1 <= tickets.length <= 300`，`tickets[i].length == 2`，所有机场为 3 大写字母，`JFK` 一定为起点。行程一定存在（欧拉路径）。

## 二、解答方法

### 方法一：Hierholzer 算法（欧拉路径）

**思路：** 建图（邻接表，每个机场的去向用 `PriorityQueue` 保证字典序最小）。从 `JFK` 出发 DFS：先递归访问邻居，回溯时再把当前节点加入结果（逆序）。最后反转得到正序。这是「后序插入」的欧拉回路构造法。

:::::: code-group

```java [Java]
class Solution {
    Map<String, PriorityQueue<String>> g = new HashMap<>();
    List<String> route = new ArrayList<>();
    public List<String> findItinerary(List<List<String>> tickets) {
        for (List<String> t : tickets) g.computeIfAbsent(t.get(0), k -> new PriorityQueue<>()).offer(t.get(1));
        dfs("JFK");
        Collections.reverse(route);
        return route;
    }
    void dfs(String u) {
        while (g.containsKey(u) && !g.get(u).isEmpty()) dfs(g.get(u).poll());
        route.add(u);
    }
}
```

```python [Python]
class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        from collections import defaultdict
        import heapq
        g = defaultdict(list)
        for u, v in tickets: heapq.heappush(g[u], v)
        route = []
        def dfs(u):
            while g[u]:
                dfs(heapq.heappop(g[u]))
            route.append(u)
        dfs("JFK")
        return route[::-1]
```

```cpp [C++]
class Solution {
    unordered_map<string, priority_queue<string, vector<string>, greater<string>>> g;
    vector<string> route;
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        for (auto& t : tickets) g[t[0]].push(t[1]);
        function<void(string)> dfs = [&](string u) {
            while (!g[u].empty()) { string v = g[u].top(); g[u].pop(); dfs(v); }
            route.push_back(u);
        };
        dfs("JFK");
        reverse(route.begin(), route.end());
        return route;
    }
};
```

```go [Go]
func findItinerary(tickets [][]string) []string {
    g := map[string][]string{}
    for _, t := range tickets { g[t[0]] = append(g[t[0]], t[1]) }
    for k := range g { sort.Strings(g[k]) }   // 字典序
    route := []string{}
    var dfs func(string)
    dfs = func(u string) {
        for len(g[u]) > 0 {
            v := g[u][0]; g[u] = g[u][1:]
            dfs(v)
        }
        route = append(route, u)
    }
    dfs("JFK")
    for i, j := 0, len(route)-1; i < j; i, j = i+1, j-1 { route[i], route[j] = route[j], route[i] }
    return route
}
```

```js [JavaScript]
var findItinerary = function (tickets) {
    const g = {};
    for (const [u, v] of tickets) { (g[u] ||= []).push(v); }
    for (const k in g) g[k].sort();
    const route = [];
    const dfs = u => {
        while (g[u] && g[u].length) { dfs(g[u].shift()); }
        route.push(u);
    };
    dfs("JFK");
    return route.reverse();
};
```

::::::

**复杂度：** 时间 `O(E log E)`（E=机票数，排序邻接表），空间 `O(E)`。

## 三、总结

Hierholzer 算法求欧拉路径：后序插入节点保证「死胡同节点在路径前」。用最小堆/排序保证字典序最小。这是 `332` 经典，关键「先递归邻居、回溯才记录当前点」。注意图可能有重边（用队列/多重集）。
