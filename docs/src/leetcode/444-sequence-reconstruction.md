# [444. 序列重建 🔒 会员题](https://leetcode.cn/problems/sequence-reconstruction/)

## 一、题目描述

给定原序列 `org` 和若干序列组成的列表 `seqs`。判断是否**唯一**地能从 `seqs` 重建出 `org`，即：

- `org` 是 `seqs` 中所有序列的「超序列」（拓扑顺序之一）；
- 且 `org` 是 `seqs` 的**唯一**拓扑顺序。

本题为 LeetCode Premium（会员）题目。

**示例 1：**

```
输入：org = [1,2,3], seqs = [[1,2],[1,3]]
输出：false
解释：可重建出 [1,2,3] 和 [1,3,2] 两种，不唯一。
```

**示例 2：**

```
输入：org = [1,2,3], seqs = [[1,2],[2,3],[1,3]]
输出：true
```

**提示：**

- `1 <= org.length, seqs.length <= 10^4`
- 所有序列中数字为 1 ~ n 的整数（n = org 长度）

## 二、解答方法

### 2.1 方法一：拓扑排序 + 唯一性判定

1. 思路

由 `seqs` 构建有向图（相邻元素连边），统计每个节点的入度。做 Kahn 拓扑排序时，若某一步「入度为 0 的节点不止一个」，说明存在多种合法顺序，不唯一返回 `false`；最终拓扑序必须与 `org` 完全一致且所有节点都出现。

2. 代码实现（Python 示例）

:::::: code-group

```python [Python]
class Solution:
    def sequenceReconstruction(self, org: List[int], seqs: List[List[int]]) -> bool:
        from collections import defaultdict, deque
        n = len(org)
        indeg = {x: 0 for x in org}
        adj = defaultdict(set)
        for seq in seqs:
            for i in range(len(seq) - 1):
                a, b = seq[i], seq[i + 1]
                if b not in indeg:
                    return False
                if b not in adj[a]:
                    adj[a].add(b)
                    indeg[b] += 1
        q = deque([x for x in org if indeg[x] == 0])
        res = []
        while len(q) == 1:
            a = q.popleft()
            res.append(a)
            for b in adj[a]:
                indeg[b] -= 1
                if indeg[b] == 0:
                    q.append(b)
        return res == org
```

```java [Java]
class Solution {
    public boolean sequenceReconstruction(int[] org, List<List<Integer>> seqs) {
        int n = org.length;
        Map<Integer, Integer> indeg = new HashMap<>();
        Map<Integer, Set<Integer>> adj = new HashMap<>();
        for (int x : org) { indeg.put(x, 0); adj.put(x, new HashSet<>()); }
        for (List<Integer> seq : seqs) {
            for (int i = 0; i < seq.size() - 1; i++) {
                int a = seq.get(i), b = seq.get(i + 1);
                if (!indeg.containsKey(b)) return false;
                if (!adj.get(a).contains(b)) {
                    adj.get(a).add(b);
                    indeg.put(b, indeg.get(b) + 1);
                }
            }
        }
        Queue<Integer> q = new LinkedList<>();
        for (int x : org) if (indeg.get(x) == 0) q.offer(x);
        int idx = 0;
        while (q.size() == 1) {
            int a = q.poll();
            if (a != org[idx++]) return false;
            for (int b : adj.get(a)) {
                indeg.put(b, indeg.get(b) - 1);
                if (indeg.get(b) == 0) q.offer(b);
            }
        }
        return idx == n;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(V + E)$。
- 空间复杂度：$O(V + E)$。

## 三、总结

会员题。拓扑排序中「每步仅一个入度为 0 的节点」是判断拓扑序唯一的充要条件。相关题目：207 课程表、210 课程表 II、269 火星词典。
