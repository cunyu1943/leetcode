# [364. 嵌套列表权重和 II](https://leetcode.cn/problems/nested-list-weight-sum-ii/) [🔒 会员题]

## 一、题目描述

给定一个嵌套整数列表，计算所有整数的「深度加权总和」，但 **权重反转**：最深的嵌套层权重为 1，最外层权重最大。即 `sum = Σ value × (最大深度 - 当前深度 + 1)`。

**示例：**
```
输入：[1,[4,[6]]]   最大深度=3
普通权重：1*1 + 4*2 + 6*3 = 27
反转权重：1*3 + 4*2 + 6*1 = 17
输出：17
```

**提示：** 列表元素个数 `[0, 10⁴]`。

## 二、解答方法

### 方法一：广度优先（按层累加）

**思路：** 用 BFS 逐层遍历，每层整数值累加到一个 `levelSum`。遍历完所有层后，结果 = 把所有层的 `levelSum` 自底向上加权——更简单：每进入一层，把之前所有层的和「再乘 1 上移」：维护 `total` 和 `levelSum`，每层 `total += levelSum; levelSum = 当前层整数和`，最后 `total` 即反转权重和。原理：越深的层被累加的次数越多（权重越大）。

:::::: code-group

```java [Java]
class Solution {
    public int depthSumInverse(List<NestedInteger> nestedList) {
        int total = 0, levelSum = 0;
        Queue<List<NestedInteger>> q = new LinkedList<>();
        q.offer(nestedList);
        while (!q.isEmpty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                for (NestedInteger ni : q.poll()) {
                    if (ni.isInteger()) levelSum += ni.getInteger();
                    else q.offer(ni.getList());
                }
            }
            total += levelSum;     // 这一层整数被计入，且之后每更深一层再被累加一次（权重递增）
        }
        return total;
    }
}
```

```python [Python]
class Solution:
    def depthSumInverse(self, nestedList: List[NestedInteger]) -> int:
        total, levelSum = 0, 0
        q = deque(nestedList)
        while q:
            sz = len(q)
            for _ in range(sz):
                ni = q.popleft()
                if ni.isInteger(): levelSum += ni.getInteger()
                else: q.extend(ni.getList())
            total += levelSum
        return total
```

```cpp [C++]
class Solution {
public:
    int depthSumInverse(vector<NestedInteger>& nestedList) {
        int total=0, levelSum=0;
        queue<vector<NestedInteger>*> q;
        q.push(&nestedList);
        while(!q.empty()){
            int sz=q.size();
            for(int i=0;i<sz;i++){
                auto* lst=q.front(); q.pop();
                for(auto& ni:*lst){
                    if(ni.isInteger()) levelSum+=ni.getInteger();
                    else q.push(&ni.getList());
                }
            }
            total+=levelSum;
        }
        return total;
    }
};
```

```go [Go]
func depthSumInverse(nestedList []*NestedInteger) int {
    total, levelSum := 0, 0
    q := []*NestedInteger{}; q = append(q, nestedList...)
    for len(q) > 0 {
        sz := len(q)
        for i := 0; i < sz; i++ {
            ni := q[0]; q = q[1:]
            if ni.IsInteger() { levelSum += ni.GetInteger() } else { q = append(q, ni.GetList()...) }
        }
        total += levelSum
    }
    return total
}
```

```js [JavaScript]
var depthSumInverse = function (nestedList) {
    let total = 0, levelSum = 0;
    let q = nestedList.slice();
    while (q.length) {
        const sz = q.length;
        for (let i=0;i<sz;i++) {
            const ni = q.shift();
            if (ni.isInteger()) levelSum += ni.getInteger();
            else q.push(...ni.getList());
        }
        total += levelSum;
    }
    return total;
};
```

::::::

**复杂度：** 时间 `O(N)`，空间 `O(N)`（队列）。

## 三、总结

权重反转技巧：BFS 每层把 `levelSum` 累加进 `total`，**每深一层之前的层又被加一次**，自然实现「深层权重更大」。也可先 DFS 求最大深度 `D`，再按 `value*(D-depth+1)` 求和（两次遍历）。对比 `339 嵌套列表权重和`（正序权重，深度从 1）。本题 BFS 一次遍历更优雅。
