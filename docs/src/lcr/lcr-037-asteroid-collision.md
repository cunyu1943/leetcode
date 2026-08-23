# [LCR 037. 行星碰撞](https://leetcode.cn/problems/XagZNi/)



## 一、题目描述

给定一个整数数组 `asteroids`，表示在同一行的行星。

对于数组中的每一个元素，其绝对值表示行星的大小，正负表示行星的移动方向（正表示向右移动，负表示向左移动）。每一颗行星以相同的速度移动。

找出碰撞后剩下的所有行星。碰撞规则：两个行星相互碰撞，较小的行星会爆炸。如果两颗行星大小相同，则两颗行星都会爆炸。两颗移动方向相同的行星，永远不会发生碰撞。



**示例 1：**

```
输入：asteroids = [5,10,-5]
输出：[5,10]
解释：10 和 -5 碰撞后只剩下 10。5 和 10 永远不会发生碰撞。
```

**示例 2：**

```
输入：asteroids = [8,-8]
输出：[]
解释：8 和 -8 碰撞后，两者都发生爆炸。
```

**示例 3：**

```
输入：asteroids = [10,2,-5]
输出：[10]
解释：2 和 -5 发生碰撞后只剩下 -5。10 和 -5 发生碰撞后只剩下 10。
```

**提示：**

- `2 <= asteroids.length <= 10⁴`
- `-1000 <= asteroids[i] <= 1000`
- `asteroids[i] != 0`



## 二、解答方法

### 2.1 方法一：栈模拟

1. **思路**

只有「栈顶行星向右（正数）且新行星向左（负数）」时才会碰撞。用栈维护存活的向右行星：

- 遇到正数直接入栈；
- 遇到负数 `-x`：不断与栈顶正数比较——
  - 若栈空或栈顶为负，直接入栈；
  - 若栈顶绝对值更小，栈顶爆炸（弹出），继续比较；
  - 若相等，两者都爆炸（弹出且不入栈）；
  - 若栈顶绝对值更大，当前行星爆炸（不入栈）。

时间 `O(n)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        Deque<Integer> stk = new ArrayDeque<>();
        for (int x : asteroids) {
            boolean alive = true;
            while (alive && x < 0 && !stk.isEmpty() && stk.peek() > 0) {
                if (stk.peek() < -x) {
                    stk.pop();
                } else if (stk.peek() == -x) {
                    stk.pop();
                    alive = false;
                } else {
                    alive = false;
                }
            }
            if (alive) stk.push(x);
        }
        int[] res = new int[stk.size()];
        for (int i = res.length - 1; i >= 0; i--) res[i] = stk.pop();
        return res;
    }
}
```

```python [Python]
class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        stk = []
        for x in asteroids:
            alive = True
            while alive and x < 0 and stk and stk[-1] > 0:
                if stk[-1] < -x:
                    stk.pop()
                elif stk[-1] == -x:
                    stk.pop()
                    alive = False
                else:
                    alive = False
            if alive:
                stk.append(x)
        return stk
```

```cpp [C++]
class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        vector<int> stk;
        for (int x : asteroids) {
            bool alive = true;
            while (alive && x < 0 && !stk.empty() && stk.back() > 0) {
                if (stk.back() < -x) stk.pop_back();
                else if (stk.back() == -x) { stk.pop_back(); alive = false; }
                else alive = false;
            }
            if (alive) stk.push_back(x);
        }
        return stk;
    }
};
```

```go [Go]
func asteroidCollision(asteroids []int) []int {
    var stk []int
    for _, x := range asteroids {
        alive := true
        for alive && x < 0 && len(stk) > 0 && stk[len(stk)-1] > 0 {
            top := stk[len(stk)-1]
            if top < -x {
                stk = stk[:len(stk)-1]
            } else if top == -x {
                stk = stk[:len(stk)-1]
                alive = false
            } else {
                alive = false
            }
        }
        if alive {
            stk = append(stk, x)
        }
    }
    return stk
}
```

```js [JavaScript]
/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function (asteroids) {
    const stk = [];
    for (const x of asteroids) {
        let alive = true;
        while (alive && x < 0 && stk.length && stk[stk.length - 1] > 0) {
            const top = stk[stk.length - 1];
            if (top < -x) stk.pop();
            else if (top === -x) { stk.pop(); alive = false; }
            else alive = false;
        }
        if (alive) stk.push(x);
    }
    return stk;
};
```

```c [C]
#include <stdlib.h>

int* asteroidCollision(int* asteroids, int asteroidsSize, int* returnSize) {
    int* stk = (int*)malloc(asteroidsSize * sizeof(int));
    int top = 0;
    for (int i = 0; i < asteroidsSize; i++) {
        int x = asteroids[i];
        int alive = 1;
        while (alive && x < 0 && top > 0 && stk[top - 1] > 0) {
            int t = stk[top - 1];
            if (t < -x) top--;
            else if (t == -x) { top--; alive = 0; }
            else alive = 0;
        }
        if (alive) stk[top++] = x;
    }
    *returnSize = top;
    return stk;
}
```

```ts [TypeScript]
function asteroidCollision(asteroids: number[]): number[] {
    const stk: number[] = [];
    for (const x of asteroids) {
        let alive = true;
        while (alive && x < 0 && stk.length && stk[stk.length - 1] > 0) {
            const top = stk[stk.length - 1];
            if (top < -x) stk.pop();
            else if (top === -x) { stk.pop(); alive = false; }
            else alive = false;
        }
        if (alive) stk.push(x);
    }
    return stk;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个行星最多入栈出栈一次。
- **空间复杂度**：`O(n)`，栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 栈模拟 | `O(n)` | `O(n)` | 标准做法，判断碰撞方向 |

行星碰撞是典型的「栈 + 消消乐」问题：只有右行星在前、左行星在后才可能碰撞，用栈维护存活行星并逐层消解即可。

