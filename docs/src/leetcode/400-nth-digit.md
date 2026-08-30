# [400. 第 N 位数字](https://leetcode.cn/problems/nth-digit/)

## 一、题目描述

给你一个整数 `n`，请返回在无限整数序列 `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...]` 中第 `n` 位上的数字（下标从 1 开始）。

**示例 1：**

```
输入：n = 3
输出：3
解释：第 3 位是数字 3（序列 123...）。
```

**示例 2：**

```
输入：n = 11
输出：0
解释：第 11 位数字在序列 1 2 3 4 5 6 7 8 9 10 11... 中是 10 的 '0'。
```

**提示：**

- `1 <= n <= 10^9`

## 二、解答方法

### 2.1 方法一：按位长分段定位

1. 思路

序列按数字位数分组：

- 1 位数（1~9）：9 个数，共 9 位；
- 2 位数（10~99）：90 个数，共 180 位；
- `k` 位数：$9 \times 10^{k-1}$ 个数，共 $9 \times 10^{k-1} \times k$ 位。

先用 `n` 减去各段长度定位到落在几位数区间，再求出具体的数与其中第几位数字。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int findNthDigit(int n) {
        int k = 1;
        long cnt = 9, start = 1;
        while (n > k * cnt) {
            n -= k * cnt;
            k++;
            cnt *= 10;
            start *= 10;
        }
        long num = start + (n - 1) / k;
        return Long.toString(num).charAt((n - 1) % k) - '0';
    }
}
```

```python [Python]
class Solution:
    def findNthDigit(self, n: int) -> int:
        k, cnt, start = 1, 9, 1
        while n > k * cnt:
            n -= k * cnt
            k += 1
            cnt *= 10
            start *= 10
        num = start + (n - 1) // k
        return int(str(num)[(n - 1) % k])
```

```cpp [C++]
class Solution {
public:
    int findNthDigit(int n) {
        int k = 1;
        long long cnt = 9, start = 1;
        while (n > k * cnt) {
            n -= k * cnt;
            k++;
            cnt *= 10;
            start *= 10;
        }
        long long num = start + (n - 1) / k;
        return to_string(num)[(n - 1) % k] - '0';
    }
};
```

```go [Go]
func findNthDigit(n int) int {
	k, cnt, start := 1, 9, 1
	for n > k*cnt {
		n -= k * cnt
		k++
		cnt *= 10
		start *= 10
	}
	num := start + (n-1)/k
	s := strconv.Itoa(num)
	return int(s[(n-1)%k] - '0')
}
```

```javascript [JavaScript]
var findNthDigit = function (n) {
    let k = 1, cnt = 9, start = 1;
    while (n > k * cnt) {
        n -= k * cnt;
        k++;
        cnt *= 10;
        start *= 10;
    }
    const num = start + Math.floor((n - 1) / k);
    return String(num)[(n - 1) % k] - '0';
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(\log n)$，最多循环约 9 次（因 $n \le 10^9$）。
- 空间复杂度：$O(1)$。

## 三、总结

本题是典型「数位分组 + 偏移定位」题，关键是分段推算落在哪个位长的区间以及区间内第几个数、第几位。类似按位长/进制分段的题目还有 168、171、233、357 等。
