# [277. 搜索名人](https://leetcode.cn/problems/find-the-celebrity/) [🔒 会员题]

## 一、题目描述

假设你是一个专业的狗仔，参加了一个 `n` 人派对，其中每个人都被从 `0` 到 `n - 1` 标号。在这个派对人群当中可能存在一位 **名人**。所谓 **名人** 的定义是：其他所有 `n - 1` 个人都认识他，但他不认识任何一个人。

现在你想要确认这个名人是谁。你可以问如下问题：「你认识那个人吗？」也就是 API `boolean knows(a, b)` 询问 a 是否认识 b。 ruling 第 `k` 个人是名人当且仅当 `knows(k, i) == false` 对所有 `i != k`，且 `knows(i, k) == true` 对所有 `i != k`。

请实现 `int findCelebrity(n)` 函数，返回名人的编号（如果名人存在）。如果没有名人，返回 `-1`。

**注意：** 这是一个 **交互式** 问题。

**示例：**

```
输入：graph = [[1,1,0],[0,1,0],[1,1,1]]   输出：1
解释：节点 1 不认识任何人，且其他人都认识节点 1 → 名人是 1
```

**提示：** `n == graph.length`，`2 <= n <= 100`，`graph[i][j]` 为 0 或 1。

## 二、解答方法

### 方法一：两阶段（候选 + 验证）

**思路：** 名人最多只有一个。先用 O(n) 次查询找出 **候选**：维护 `candidate = 0`，遍历 `i = 1..n-1`，若 `knows(candidate, i)`（候选认识 i，则候选不可能是名人）→ 候选换成 i；否则候选仍是当前候选。遍历后，若 `knows(i, candidate)` 为 false（有人不认识候选）或 `knows(candidate, i)` 为 true（候选认识别人），则无名人。

:::::: code-group

```java [Java]
/* The knows API is defined in the parent class Relation */
public int findCelebrity(int n) {
    int candidate = 0;
    for (int i = 1; i < n; i++) {
        if (knows(candidate, i)) {     // candidate 认识别人 → 不是名人
            candidate = i;
        }
    }
    for (int i = 0; i < n; i++) {
        if (i == candidate) continue;
        if (!knows(i, candidate) || knows(candidate, i)) return -1;
    }
    return candidate;
}
```

```python [Python]
class Solution:
    def findCelebrity(self, n: int) -> int:
        candidate = 0
        for i in range(1, n):
            if knows(candidate, i):
                candidate = i
        for i in range(n):
            if i == candidate: continue
            if not knows(i, candidate) or knows(candidate, i):
                return -1
        return candidate
```

```cpp [C++]
class Solution {
public:
    int findCelebrity(int n) {
        int candidate = 0;
        for (int i = 1; i < n; i++)
            if (knows(candidate, i)) candidate = i;
        for (int i = 0; i < n; i++) {
            if (i == candidate) continue;
            if (!knows(i, candidate) || knows(candidate, i)) return -1;
        }
        return candidate;
    }
};
```

```go [Go]
func solution(knows func(a, b int) bool) func(n int) int {
    return func(n int) int {
        candidate := 0
        for i := 1; i < n; i++ {
            if knows(candidate, i) {
                candidate = i
            }
        }
        for i := 0; i < n; i++ {
            if i == candidate { continue }
            if !knows(i, candidate) || knows(candidate, i) {
                return -1
            }
        }
        return candidate
    }
}
```

```js [JavaScript]
var solution = function (knows) {
    return function (n) {
        let candidate = 0;
        for (let i = 1; i < n; i++) {
            if (knows(candidate, i)) candidate = i;
        }
        for (let i = 0; i < n; i++) {
            if (i === candidate) continue;
            if (!knows(i, candidate) || knows(candidate, i)) return -1;
        }
        return candidate;
    };
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(1)`（最多 2n 次查询）。

## 三、总结

核心洞察：**最多一个名人**，且「a 认识 b ⇒ a 不是名人，b 仍可能是」。因此 O(n) 扫描把不可能的人淘汰，留一个候选。最后必须验证候选（因为扫描只保证候选「不被淘汰」，不保证是真名人）。注意验证要同时检查「别人都认识他」和「他不认识别人」两个条件。
