# [LCR 038. 每日温度](https://leetcode.cn/problems/6CE719/)



## 一、题目描述

请根据每日 `气温` 列表 `temperatures`，重新生成一个列表，要求列表对应位置为：需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 `0` 来代替。



**示例 1：**

```
输入: temperatures = [73,74,75,71,69,72,76,73]
输出: [1,1,4,2,1,1,0,0]
```

**示例 2：**

```
输入: temperatures = [30,40,50,60]
输出: [1,1,1,0]
```

**示例 3：**

```
输入: temperatures = [30,60,90]
输出: [1,1,0]
```

**提示：**

- `1 <= temperatures.length <= 10⁵`
- `30 <= temperatures[i] <= 100`



## 二、解答方法

### 2.1 方法一：单调递减栈

1. **思路**

维护一个「温度单调递减」的下标栈（从栈底到栈顶温度递减）：

- 遍历每一天 `i`，若 `temperatures[i] > temperatures[栈顶]`，说明栈顶那天的「下一个更高温度」就是今天，弹出栈顶并计算天数差；
- 重复弹出直到栈空或栈顶温度 `>=` 当前温度；
- 把当前下标 `i` 入栈。

栈内元素始终是「还没找到下一个更高温度」的日期。时间 `O(n)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] res = new int[n];
        Deque<Integer> stk = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!stk.isEmpty() && temperatures[i] > temperatures[stk.peek()]) {
                int j = stk.pop();
                res[j] = i - j;
            }
            stk.push(i);
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)
        res = [0] * n
        stk = []
        for i in range(n):
            while stk and temperatures[i] > temperatures[stk[-1]]:
                j = stk.pop()
                res[j] = i - j
            stk.append(i)
        return res
```

```cpp [C++]
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> res(n, 0);
        vector<int> stk;
        for (int i = 0; i < n; i++) {
            while (!stk.empty() && temperatures[i] > temperatures[stk.back()]) {
                int j = stk.back();
                stk.pop_back();
                res[j] = i - j;
            }
            stk.push_back(i);
        }
        return res;
    }
};
```

```go [Go]
func dailyTemperatures(temperatures []int) []int {
    n := len(temperatures)
    res := make([]int, n)
    var stk []int
    for i := 0; i < n; i++ {
        for len(stk) > 0 && temperatures[i] > temperatures[stk[len(stk)-1]] {
            j := stk[len(stk)-1]
            stk = stk[:len(stk)-1]
            res[j] = i - j
        }
        stk = append(stk, i)
    }
    return res
}
```

```js [JavaScript]
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
    const n = temperatures.length;
    const res = new Array(n).fill(0);
    const stk = [];
    for (let i = 0; i < n; i++) {
        while (stk.length && temperatures[i] > temperatures[stk[stk.length - 1]]) {
            const j = stk.pop();
            res[j] = i - j;
        }
        stk.push(i);
    }
    return res;
};
```

```c [C]
#include <stdlib.h>

int* dailyTemperatures(int* temperatures, int temperaturesSize, int* returnSize) {
    int* res = (int*)calloc(temperaturesSize, sizeof(int));
    int* stk = (int*)malloc(temperaturesSize * sizeof(int));
    int top = 0;
    for (int i = 0; i < temperaturesSize; i++) {
        while (top > 0 && temperatures[i] > temperatures[stk[top - 1]]) {
            int j = stk[--top];
            res[j] = i - j;
        }
        stk[top++] = i;
    }
    free(stk);
    *returnSize = temperaturesSize;
    return res;
}
```

```ts [TypeScript]
function dailyTemperatures(temperatures: number[]): number[] {
    const n = temperatures.length;
    const res: number[] = new Array(n).fill(0);
    const stk: number[] = [];
    for (let i = 0; i < n; i++) {
        while (stk.length && temperatures[i] > temperatures[stk[stk.length - 1]]) {
            const j = stk.pop()!;
            res[j] = i - j;
        }
        stk.push(i);
    }
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个下标进出栈一次。
- **空间复杂度**：`O(n)`，栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 单调递减栈 | `O(n)` | `O(n)` | 标准解法，推荐 |

「下一个更大元素」是单调栈的经典应用场景：栈内维护未决答案的下标，新元素到来时批量结算栈顶，避免暴力二重循环。

