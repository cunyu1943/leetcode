# [338. 比特位计数](https://leetcode.cn/problems/counting-bits/)

## 一、题目描述

给你一个整数 `n`，对 `0 ~ n` 的每个数，计算其二进制表示中 `1` 的个数，返回长度为 `n+1` 的数组 `ans`，`ans[i]` 为 `i` 的二进制 1 的个数。

**示例：**
```
输入：n = 5   输出：[0,1,1,2,1,2]
解释：0→0,1→1,2→1,3→2(11),4→1,5→2(101)
```

**提示：** `0 <= n <= 10⁵`。

## 二、解答方法

### 方法一：动态规划（最低位 / 去掉最低位）

**思路：** 观察：`ans[i] = ans[i >> 1] + (i & 1)`（i 的 1 个数 = 右移一位的 1 个数 + 末位）。或 `ans[i] = ans[i & (i-1)] + 1`（`i & (i-1)` 消掉最低位的 1）。两者均 `O(n)`。

:::::: code-group

```java [Java]
class Solution {
    public int[] countBits(int n) {
        int[] ans = new int[n + 1];
        for (int i = 1; i <= n; i++) ans[i] = ans[i >> 1] + (i & 1);
        return ans;
    }
}
```

```python [Python]
class Solution:
    def countBits(self, n: int) -> List[int]:
        ans = [0] * (n+1)
        for i in range(1, n+1): ans[i] = ans[i >> 1] + (i & 1)
        return ans
```

```cpp [C++]
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> ans(n+1, 0);
        for (int i=1;i<=n;i++) ans[i] = ans[i>>1] + (i&1);
        return ans;
    }
};
```

```go [Go]
func countBits(n int) []int {
    ans := make([]int, n+1)
    for i := 1; i <= n; i++ { ans[i] = ans[i>>1] + (i & 1) }
    return ans
}
```

```js [JavaScript]
var countBits = function (n) {
    const ans = new Array(n+1).fill(0);
    for (let i=1;i<=n;i++) ans[i] = ans[i>>1] + (i & 1);
    return ans;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(n)`。

## 三、总结

Brian Kernighan 思想：「`i & (i-1)` 消去最低位 1」，故 `bits[i] = bits[i & (i-1)] + 1`。也可用 `i>>1` 转移。本题是 `191 位 1 的个数` 的批量版，必须用 DP 而非逐个数 `O(n log n)`。进阶：`汉明距离` 也基于位计数。
