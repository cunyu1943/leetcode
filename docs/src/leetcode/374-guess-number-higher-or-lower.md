# [374. 猜数字大小](https://leetcode.cn/problems/guess-number-higher-or-lower/)

## 一、题目描述

猜数字游戏：我选 `1 ~ n` 中一个数字，你通过 `guess(num)` 函数猜测：返回 `-1` 表示我选的数更小、`1` 表示更大、`0` 表示猜中。实现 `guessNumber(n)` 返回我选的数字。

**示例：**
```
输入：n = 10, pick = 6   输出：6
```

**提示：** `1 <= n <= 2³¹-1`。进阶：用最少次数（二分）。

## 二、解答方法

### 方法一：二分查找

**思路：** 在 `[1, n]` 二分，每次 `mid`，根据 `guess(mid)` 调整边界。注意中间值用 `lo + (hi-lo)/2` 防溢出；`hi` 初值 `n`（闭区间）。

:::::: code-group

```java [Java]
public class Solution extends GuessGame {
    public int guessNumber(int n) {
        int lo = 1, hi = n;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            int g = guess(mid);
            if (g == 0) return mid;
            else if (g < 0) hi = mid - 1;   // 目标更小
            else lo = mid + 1;              // 目标更大
        }
        return lo;
    }
}
```

```python [Python]
class Solution:
    def guessNumber(self, n: int) -> int:
        lo, hi = 1, n
        while lo < hi:
            mid = (lo + hi) // 2
            g = guess(mid)
            if g == 0: return mid
            elif g < 0: hi = mid - 1
            else: lo = mid + 1
        return lo
```

```cpp [C++]
class Solution {
public:
    int guessNumber(int n) {
        int lo=1, hi=n;
        while(lo<hi){
            int mid=lo+(hi-lo)/2;
            int g=guess(mid);
            if(g==0) return mid;
            else if(g<0) hi=mid-1; else lo=mid+1;
        }
        return lo;
    }
};
```

```go [Go]
func guessNumber(n int) int {
    lo, hi := 1, n
    for lo < hi {
        mid := lo + (hi-lo)/2
        g := guess(mid)
        if g == 0 { return mid }
        if g < 0 { hi = mid-1 } else { lo = mid+1 }
    }
    return lo
}
```

```js [JavaScript]
var guessNumber = function (n) {
    let lo = 1, hi = n;
    while (lo < hi) {
        const mid = Math.floor(lo + (hi-lo)/2);
        const g = guess(mid);
        if (g === 0) return mid;
        else if (g < 0) hi = mid-1;
        else lo = mid+1;
    }
    return lo;
};
```

::::::

**复杂度：** 时间 `O(log n)`，空间 `O(1)`。

## 三、总结

标准二分模板题，注意 `guess` 返回值语义（`-1` 表示 `pick < mid` 即目标更小，故收缩右边界）。同类：`278 第一个错误版本`（也是二分 + 隐藏 `isBad` 函数）、`875 爱吃香蕉`、`1011 在 D 天内送达包裹`（二分答案）。
