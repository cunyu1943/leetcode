# [339. 嵌套列表权重和](https://leetcode.cn/problems/nested-list-weight-sum/) [🔒 会员题]

## 一、题目描述

给定一个嵌套的整数列表（元素可能是整数，或整数列表，递归嵌套）。**深度** 从 1 开始（最外层深度 1），返回所有整数的「深度 × 值」之和。

**示例：**
```
输入：[[1,1],2,[1,1]]   输出：10（1*1 + 1*1 + 2*2 + 1*2 + 1*2 = 10）
输入：[1,[4,[6]]]       输出：27（1*1 + 4*2 + 6*3 = 27）
```

**提示：** 列表元素个数 `[0, 10⁴]`，值范围 `[-100, 100]`。

## 二、解答方法

### 方法一：DFS 带深度参数

**思路：** 遍历列表，对整数累加 `depth * val`；对子列表递归，`depth+1`。也可用 BFS（每层一组，深度递增）累加整层和。

:::::: code-group

```java [Java]
class Solution {
    public int depthSum(List<NestedInteger> nestedList) {
        return dfs(nestedList, 1);
    }
    int dfs(List<NestedInteger> list, int depth) {
        int sum = 0;
        for (NestedInteger ni : list) {
            if (ni.isInteger()) sum += depth * ni.getInteger();
            else sum += dfs(ni.getList(), depth + 1);
        }
        return sum;
    }
}
```

```python [Python]
class Solution:
    def depthSum(self, nestedList: List[NestedInteger]) -> int:
        def dfs(lst, depth):
            s = 0
            for ni in lst:
                if ni.isInteger(): s += depth * ni.getInteger()
                else: s += dfs(ni.getList(), depth+1)
            return s
        return dfs(nestedList, 1)
```

```cpp [C++]
class Solution {
public:
    int depthSum(vector<NestedInteger>& nestedList) {
        function<int(vector<NestedInteger>&,int)> dfs = [&](vector<NestedInteger>& lst, int d){
            int s=0;
            for(auto& ni:lst){
                if(ni.isInteger()) s+=d*ni.getInteger();
                else s+=dfs(ni.getList(), d+1);
            }
            return s;
        };
        return dfs(nestedList, 1);
    }
};
```

```go [Go]
func depthSum(nestedList []*NestedInteger) int {
    var dfs func([]*NestedInteger, int) int
    dfs = func(lst []*NestedInteger, d int) int {
        s := 0
        for _, ni := range lst {
            if ni.IsInteger() { s += d * ni.GetInteger() } else { s += dfs(ni.GetList(), d+1) }
        }
        return s
    }
    return dfs(nestedList, 1)
}
```

```js [JavaScript]
var depthSum = function (nestedList) {
    const dfs = (lst, depth) => {
        let s = 0;
        for (const ni of lst) {
            if (ni.isInteger()) s += depth * ni.getInteger();
            else s += dfs(ni.getList(), depth+1);
        }
        return s;
    };
    return dfs(nestedList, 1);
};
```

::::::

**复杂度：** 时间 `O(N)`（N=所有元素总数），空间 `O(D)`（D=最大深度）。

## 三、总结

嵌套列表遍历是递归/栈经典题。深度参数随递归 +1。BFS 也可：每次处理一层（同深度）后 depth++。进阶：`364 嵌套列表权重和 II`（深度反转：最深层权重 1），需两次遍历或先求最大深度。`385 迷你语法分析器` 是构造这类结构的前置题。
