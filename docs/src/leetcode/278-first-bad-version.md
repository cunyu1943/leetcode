# [278. 第一个错误的版本](https://leetcode.cn/problems/first-bad-version/)

## 一、题目描述

你是产品经理，目前正在带领一个团队开发新的产品。不幸的是，你的产品的最新版本没有通过质量检测。由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。

假设你有 `n` 个版本 `[1, 2, ..., n]`，你想找出 **导致所有错误版本的第一个错误版本**。

你可以通过调用 `boolean isBadVersion(version)` 接口来判断版本号 `version` 是否在单元测试中出错。实现一个函数来查找第一个错误的版本。你应该尽量减少对 API 的调用次数。

**示例：**

```
输入：n = 5, bad = 4   输出：4
解释：isBadVersion(3)=false, isBadVersion(4)=true → 4 是第一个错误版本
```

**提示：** `1 <= bad <= n <= 2³¹ - 1`

## 二、解答方法

### 方法一：二分查找（O(log n)）

**思路：** 版本具有单调性：错误版本之后的所有版本都错。即存在分界点，左侧 `isBadVersion = false`，右侧 `= true`。二分查找最左为 `true` 的位置（F 到 T 的转折点）。

:::::: code-group

```java [Java]
public class Solution extends VersionControl {
    public int firstBadVersion(int n) {
        int lo = 1, hi = n;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;   // 防溢出，勿用 (lo+hi)/2
            if (isBadVersion(mid)) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }
}
```

```python [Python]
class Solution:
    def firstBadVersion(self, n: int) -> int:
        lo, hi = 1, n
        while lo < hi:
            mid = (lo + hi) // 2
            if isBadVersion(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
```

```cpp [C++]
class Solution {
public:
    int firstBadVersion(int n) {
        int lo = 1, hi = n;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;   // 防整数溢出
            if (isBadVersion(mid)) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }
};
```

```go [Go]
func firstBadVersion(n int) int {
    lo, hi := 1, n
    for lo < hi {
        mid := lo + (hi-lo)/2
        if isBadVersion(mid) {
            hi = mid
        } else {
            lo = mid + 1
        }
    }
    return lo
}
```

```js [JavaScript]
var solution = function (isBadVersion) {
    return function (n) {
        let lo = 1, hi = n;
        while (lo < hi) {
            const mid = lo + Math.floor((hi - lo) / 2);
            if (isBadVersion(mid)) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    };
};
```

::::::

**复杂度：** 时间 `O(log n)`，空间 `O(1)`。

## 三、总结

经典 **「找第一个满足条件的元素」** 二分模板（左闭右开，lo=hi 时退出）。关键陷阱：**`mid = (lo + hi) / 2` 在 lo+hi 超过 int 最大值时会溢出**（n 可达 2³¹-1），务必写成 `lo + (hi - lo) / 2`。这题与 `275` H 指数 II 同构。
