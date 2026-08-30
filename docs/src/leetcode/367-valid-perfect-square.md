# [367. 有效的完全平方数](https://leetcode.cn/problems/valid-perfect-square/)

## 一、题目描述

给定一个正整数 `num`，判断它是否为一个 **完全平方数**（存在整数 `x` 使 `x² = num`）。**不能使用任何内置的平方根函数**。

**示例：**
```
输入：num = 16   输出：true
输入：num = 14   输出：false
```

**提示：** `1 <= num <= 2³¹ - 1`。

## 二、解答方法

### 方法一：二分查找

**思路：** 在 `[1, num]`（或 `[1, num/2+1]`）二分找 `mid`，比较 `mid*mid` 与 `num`（用 `mid <= num/mid` 防溢出，避免直接 `mid*mid` 溢出）。

:::::: code-group

```java [Java]
class Solution {
    public boolean isPerfectSquare(int num) {
        int l = 1, r = num;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (mid <= num / mid) {              // mid*mid <= num，避免溢出
                if (mid == num / mid && num % mid == 0) return true;
                l = mid + 1;
            } else r = mid - 1;
        }
        return false;
    }
}
```

```python [Python]
class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        l, r = 1, num
        while l <= r:
            mid = (l+r)//2
            if mid*mid == num: return True
            elif mid*mid < num: l = mid+1
            else: r = mid-1
        return False
```

```cpp [C++]
class Solution {
public:
    bool isPerfectSquare(int num) {
        long l=1, r=num;
        while(l<=r){
            long mid=l+(r-l)/2;
            if(mid*mid==num) return true;
            if(mid*mid<num) l=mid+1; else r=mid-1;
        }
        return false;
    }
};
```

```go [Go]
func isPerfectSquare(num int) bool {
    l, r := 1, num
    for l <= r {
        mid := l + (r-l)/2
        if mid*mid == num { return true }
        if mid*mid < num { l = mid+1 } else { r = mid-1 }
    }
    return false
}
```

```js [JavaScript]
var isPerfectSquare = function (num) {
    let l=1, r=num;
    while(l<=r){
        const mid=Math.floor((l+r)/2);
        if(mid*mid===num) return true;
        else if(mid*mid<num) l=mid+1; else r=mid-1;
    }
    return false;
};
```

::::::

### 方法二：完全平方数性质（奇数和）

**思路：** 完全平方数 = 从 1 开始的连续奇数之和（`1+3+5+...`）。不断减奇数 `1,3,5,...`，减到 0 即为平方数，减成负则不是。

:::::: code-group

```java [Java]
class Solution {
    public boolean isPerfectSquare(int num) {
        int odd = 1;
        while (num > 0) { num -= odd; odd += 2; }
        return num == 0;
    }
}
```

```python [Python]
class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        odd = 1
        while num > 0:
            num -= odd; odd += 2
        return num == 0
```

```cpp [C++]
class Solution {
public:
    bool isPerfectSquare(int num) {
        int odd=1;
        while(num>0){ num-=odd; odd+=2; }
        return num==0;
    }
};
```

```go [Go]
func isPerfectSquare(num int) bool {
    odd := 1
    for num > 0 { num -= odd; odd += 2 }
    return num == 0
}
```

```js [JavaScript]
var isPerfectSquare = function (num) {
    let odd = 1;
    while (num > 0) { num -= odd; odd += 2; }
    return num === 0;
};
```

::::::

**复杂度：** 二分 `O(log num)`，奇数和 `O(√num)`，均空间 `O(1)`。

## 三、总结

不能开根号时的判断法：二分最稳（用 `mid <= num/mid` 防溢出）。进阶：`69 求 x 的平方根` 也是二分。完全平方数性质（`1+3+5+...`）也可做，但 `O(√n)` 略慢于二分。注意 `num=1` 是平方数（边界）。同类：`367`、`69` 是平方根/平方数孪生题。
