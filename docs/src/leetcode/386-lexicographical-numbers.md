# [386. 字典序的第 K 小数字](https://leetcode.cn/problems/lexicographical-numbers/)

## 一、题目描述

给定整数 `n` 和 `k`，返回 `1 ~ n` 中按 **字典序（lexicographical）** 排列后的第 `k` 个数。

**示例：**
```
输入：n = 13, k = 2   输出：10
解释：字典序为 [1,10,11,12,13,2,3,4,5,6,7,8,9]，第 2 个是 10
```

**提示：** `1 <= k <= n <= 10⁹`。

## 二、解答方法

### 方法一：十叉树前缀计数

**思路：** 把 `1~n` 看成十叉树（`x` 的子节点是 `10x, 10x+1, ... 10x+9`）。从 `1` 开始逐位「走字典序」：计算以 `curr` 为前缀的、在 `1~n` 范围内的数字个数 `steps`（用左右边界前缀数相减）。若 `steps < k`：跳过整棵子树 `k -= steps, curr++`；否则第 `k` 个就在子树内 `k--, curr *= 10`；当 `k==1` 返回 `curr`。

:::::: code-group

```java [Java]
class Solution {
    public int findKthNumber(int n, int k) {
        int curr = 1; k--;
        while (k > 0) {
            int steps = count(n, curr, curr + 1);
            if (steps <= k) { k -= steps; curr++; }      // 跳过该前缀子树
            else { curr *= 10; k--; }                     // 进入子树
        }
        return curr;
    }
    int count(long n, long left, long right) {            // 统计 [left, right) 前缀范围内 ≤ n 的个数
        int steps = 0;
        while (left <= n) {
            steps += Math.min(n + 1, right) - left;
            left *= 10; right *= 10;
        }
        return steps;
    }
}
```

```python [Python]
class Solution:
    def findKthNumber(self, n: int, k: int) -> int:
        curr = 1; k -= 1
        def count(left, right):
            steps = 0
            while left <= n:
                steps += min(n+1, right) - left
                left *= 10; right *= 10
            return steps
        while k > 0:
            steps = count(curr, curr+1)
            if steps <= k: k -= steps; curr += 1
            else: curr *= 10; k -= 1
        return curr
```

```cpp [C++]
class Solution {
public:
    int findKthNumber(int n, int k) {
        long curr=1; k--;
        auto count=[&](long l,long r){
            long steps=0;
            while(l<=n){ steps+=min((long)n+1,r)-l; l*=10; r*=10; }
            return steps;
        };
        while(k>0){
            long steps=count(curr,curr+1);
            if(steps<=k){ k-=steps; curr++; }
            else { curr*=10; k--; }
        }
        return (int)curr;
    }
};
```

```go [Go]
func findKthNumber(n, k int) int {
    curr := 1; k--
    count := func(l, r int64) int64 {
        var steps int64 = 0
        for l <= int64(n) {
            steps += min(int64(n)+1, r) - l; l *= 10; r *= 10
        }
        return steps
    }
    for k > 0 {
        steps := count(int64(curr), int64(curr)+1)
        if int64(k) >= steps { k -= int(steps); curr++ } else { curr *= 10; k-- }
    }
    return curr
}
func min(a, b int64) int64 { if a<b { return a }; return b }
```

```js [JavaScript]
var findKthNumber = function (n, k) {
    let curr = 1; k--;
    const count = (l, r) => {
        let steps = 0;
        while (l <= n) { steps += Math.min(n+1, r) - l; l *= 10; r *= 10; }
        return steps;
    };
    while (k > 0) {
        const steps = count(curr, curr+1);
        if (steps <= k) { k -= steps; curr++; }
        else { curr *= 10; k--; }
    }
    return curr;
};
```

::::::

**复杂度：** 时间 `O(log₁₀ n · log₁₀ n)`（每步十叉树深度，共 k 步但 k 大时受 n 限制），空间 `O(1)`。

## 三、总结

字典序 = 十叉树前序遍历。核心 `count` 用「前缀边界相减」数出某前缀子树在 `1~n` 内的节点数，从而跳转而不必真生成序列。对比 `440 字典序的第 K 小数字`（本题同题，`440` 为会员版但完全一样）。同类：`78 子集` 无关，但「前缀树计数」技巧在 `677 键值映射` 也用。
