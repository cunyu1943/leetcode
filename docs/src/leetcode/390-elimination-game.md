# [390. 消除游戏](https://leetcode.cn/problems/elimination-game/)

## 一、题目描述

给定一个从 `1` 到 `n` 的整数数组。从左到右每隔一个删除一个（先删 1,3,5...），再从右到左隔一个删除（此时从右端开始），交替进行直到剩一个数。返回最后剩下的数。

**示例：**
```
输入：n = 9
过程：1 2 3 4 5 6 7 8 9
左→删：[2,4,6,8]
右→删：[2,6]
左→删：[6]
输出：6
```

**提示：** `1 <= n <= 10⁹`。

## 二、解答方法

### 方法一：数学规律（步长翻倍）

**思路：** 维护「当前剩余序列的首项 `head`、项数 `n`、步长 `step`、方向 `leftToRight`」。每轮删除：
- 若从左到右 或 `n` 为奇数（从右删时尾也会被删）：`head += step`；
- `step *= 2`（间隔翻倍），`n /= 2`（向下取整），方向翻转。
直到 `n == 1` 返回 `head`。规律：被删后序列「首项的偏移」与「剩余个数奇偶」相关。

:::::: code-group

```java [Java]
class Solution {
    public int lastRemaining(int n) {
        int head = 1, step = 1, remaining = n;
        boolean leftToRight = true;
        while (remaining > 1) {
            if (leftToRight || remaining % 2 == 1) head += step;   // 右删且奇数个时，尾项被删，head 也需前进
            step *= 2;
            remaining /= 2;
            leftToRight = !leftToRight;
        }
        return head;
    }
}
```

```python [Python]
class Solution:
    def lastRemaining(self, n: int) -> int:
        head, step, remaining, left = 1, 1, n, True
        while remaining > 1:
            if left or remaining % 2 == 1: head += step
            step *= 2; remaining //= 2; left = not left
        return head
```

```cpp [C++]
class Solution {
public:
    int lastRemaining(int n) {
        int head=1, step=1, remaining=n; bool left=true;
        while(remaining>1){
            if(left || remaining%2==1) head+=step;
            step*=2; remaining/=2; left=!left;
        }
        return head;
    }
};
```

```go [Go]
func lastRemaining(n int) int {
    head, step, remaining := 1, 1, n
    left := true
    for remaining > 1 {
        if left || remaining%2 == 1 { head += step }
        step *= 2; remaining /= 2; left = !left
    }
    return head
}
```

```js [JavaScript]
var lastRemaining = function (n) {
    let head=1, step=1, remaining=n, left=true;
    while (remaining > 1) {
        if (left || remaining%2===1) head += step;
        step *= 2; remaining = Math.floor(remaining/2); left = !left;
    }
    return head;
};
```

::::::

**复杂度：** 时间 `O(log n)`，空间 `O(1)`。

## 三、总结

约瑟夫环变体，用「首项的偏移规律」`O(log n)` 解（模拟会 `O(n)` 且 n 达 1e9 必超时）。关键：每轮步长翻倍；从左到右必删首项，从右到左仅当剩余个数为奇数时也删首项（因尾项恰好被删，首项才需前进）。同类：`390` 进阶版无，但思路与 `62 不同路径`、递推规律题一致。记住「交替 + 步长翻倍 + 奇偶判首项」三要素。
