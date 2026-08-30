# [440. 字典序的第 K 小数字](https://leetcode.cn/problems/k-th-smallest-in-lexicographical-order/)

## 一、题目描述

给定整数 `n` 和 `k`，返回 `[1, n]` 范围内按**字典序**升序排列后的第 `k` 小的数字。

**示例 1：**

```
输入：n = 13, k = 2
输出：10
解释：字典序为 [1,10,11,12,13,2,3,4,5,6,7,8,9]，第 2 个是 10。
```

**示例 2：**

```
输入：n = 1, k = 1
输出：1
```

**提示：**

- `1 <= k <= n <= 10^9`

## 二、解答方法

### 2.1 方法一：十叉树前缀计数（逐步下移）

1. 思路

把 1~n 视为一棵「十叉前缀树」。从当前前缀 `prefix` 出发，计算以 `prefix` 为根的子树中 $\le n$ 的节点数 `count`（即该前缀在 [1,n] 内的字典序跨度）。若 `count < k`，说明第 k 小在更右侧兄弟，跳过这棵子树（`prefix++`，`k -= count`）；否则第 k 小就在这棵子树内，下移一层（`prefix *= 10`，`k--`）。当 `k == 1` 时 `prefix` 即答案。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int findKthNumber(int n, int k) {
        int prefix = 1;
        k--;
        while (k > 0) {
            int cnt = countPrefix(n, prefix);
            if (cnt <= k) { k -= cnt; prefix++; }
            else { prefix *= 10; k--; }
        }
        return prefix;
    }
    int countPrefix(long n, long prefix) {
        long cur = prefix, nxt = prefix + 1, cnt = 0;
        while (cur <= n) {
            cnt += Math.min(n + 1, nxt) - cur;
            cur *= 10; nxt *= 10;
        }
        return cnt;
    }
}
```

```python [Python]
class Solution:
    def findKthNumber(self, n: int, k: int) -> int:
        prefix = 1
        k -= 1
        while k > 0:
            cnt = self.count_prefix(n, prefix)
            if cnt <= k:
                k -= cnt
                prefix += 1
            else:
                prefix *= 10
                k -= 1
        return prefix

    def count_prefix(self, n, prefix):
        cur, nxt, cnt = prefix, prefix + 1, 0
        while cur <= n:
            cnt += min(n + 1, nxt) - cur
            cur *= 10
            nxt *= 10
        return cnt
```

```cpp [C++]
class Solution {
public:
    int findKthNumber(int n, int k) {
        long long prefix = 1;
        k--;
        while (k > 0) {
            long long cnt = countPrefix(n, prefix);
            if (cnt <= k) { k -= cnt; prefix++; }
            else { prefix *= 10; k--; }
        }
        return prefix;
    }
    long long countPrefix(long long n, long long prefix) {
        long long cur = prefix, nxt = prefix + 1, cnt = 0;
        while (cur <= n) {
            cnt += min(n + 1, nxt) - cur;
            cur *= 10; nxt *= 10;
        }
        return cnt;
    }
};
```

```go [Go]
func findKthNumber(n int, k int) int {
	prefix := 1
	k--
	count := func(prefix int) int {
		cur, nxt, cnt := prefix, prefix+1, 0
		for cur <= n {
			if nxt > n+1 {
				cnt += n + 1 - cur
			} else {
				cnt += nxt - cur
			}
			cur *= 10
			nxt *= 10
		}
		return cnt
	}
	for k > 0 {
		c := count(prefix)
		if c <= k {
			k -= c
			prefix++
		} else {
			prefix *= 10
			k--
		}
	}
	return prefix
}
```

```javascript [JavaScript]
var findKthNumber = function (n, k) {
    let prefix = 1;
    k--;
    const count = (prefix) => {
        let cur = prefix, nxt = prefix + 1, cnt = 0;
        while (cur <= n) {
            cnt += Math.min(n + 1, nxt) - cur;
            cur *= 10; nxt *= 10;
        }
        return cnt;
    };
    while (k > 0) {
        const c = count(prefix);
        if (c <= k) { k -= c; prefix++; }
        else { prefix *= 10; k--; }
    }
    return prefix;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(\log_{10} n \cdot \log_{10} n)$，每次下移一层并计数前缀。
- 空间复杂度：$O(1)$。

## 三、总结

「十叉树前缀计数」是把字典序问题转化为「子树大小 + 跳过」的经典框架。相关题目：386 字典序排数、2415、LCR 系列。
