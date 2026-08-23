# [134. 加油站](https://leetcode.cn/problems/gas-station/)



## 一、题目描述

在一条环路上有 `n` 个加油站，其中第 `i` 个加油站有汽油 `gas[i]` 升，从第 `i` 个加油站开往第 `i+1` 个加油站需要消耗汽油 `cost[i]` 升。

你有一辆油箱容量无限大的汽车，出发时油箱为空。若你可以绕环路行驶一周，则返回出发时加油站的编号，否则返回 `-1`。如果存在解，则 **保证** 它是 **唯一** 的。



**示例 1：**

```
输入：gas = [1,2,3,4,5], cost = [3,4,5,1,2]
输出：3
解释：从 3 号加油站（索引为 3 处）出发，可获得 4 升汽油。开到 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升。开到 0 号，油箱 8 - 2 + 1 = 7 升……最终绕行一周油箱剩余 0 升，可以绕行一周。
```

**示例 2：**

```
输入：gas = [2,3,4], cost = [3,4,3]
输出：-1
解释：从 0 号和 1 号出发都无法绕行一周；从 2 号出发油量 4，到 0 号剩 4-3+2=3，到 1 号剩 3-3+3=3，再到 2 号需 4，不够。无法绕行。
```

**提示：**

- `gas.length == n`
- `cost.length == n`
- `1 <= n <= 10⁵`
- `0 <= gas[i], cost[i] <= 10⁴`



## 二、解答方法

### 2.1 方法一：贪心（一次遍历）

1. **思路**

关键结论：**如果所有加油站的油量之和 `sum(gas) >= sum(cost)`，那么一定存在一个起点可以绕行一周**。

用贪心策略一次遍历求得起点：

- 维护 `tank` 表示「从当前候选起点出发，到达当前站时油箱剩余的油量」；
- 维护 `total` 表示「全程油量净收支总和」；
- 从 `i = 0` 开始累加，若到达某站后 `tank < 0`，说明从当前候选起点到不了这一站，把候选起点改为 `i + 1`，`tank` 清零重新累计；
- 遍历结束后，若 `total >= 0` 则 `start` 是合法起点，否则无解返回 `-1`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int n = gas.length;
        int tank = 0, total = 0, start = 0;
        for (int i = 0; i < n; i++) {
            int diff = gas[i] - cost[i];
            tank += diff;
            total += diff;
            if (tank < 0) {
                start = i + 1;
                tank = 0;
            }
        }
        return total >= 0 ? start : -1;
    }
}
```

```python [Python]
class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        tank = total = 0
        start = 0
        for i in range(len(gas)):
            diff = gas[i] - cost[i]
            tank += diff
            total += diff
            if tank < 0:
                start = i + 1
                tank = 0
        return start if total >= 0 else -1
```

```cpp [C++]
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int n = gas.size();
        int tank = 0, total = 0, start = 0;
        for (int i = 0; i < n; i++) {
            int diff = gas[i] - cost[i];
            tank += diff;
            total += diff;
            if (tank < 0) {
                start = i + 1;
                tank = 0;
            }
        }
        return total >= 0 ? start : -1;
    }
};
```

```go [Go]
func canCompleteCircuit(gas []int, cost []int) int {
    tank, total, start := 0, 0, 0
    for i := 0; i < len(gas); i++ {
        diff := gas[i] - cost[i]
        tank += diff
        total += diff
        if tank < 0 {
            start = i + 1
            tank = 0
        }
    }
    if total >= 0 {
        return start
    }
    return -1
}
```

```js [JavaScript]
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
    let tank = 0, total = 0, start = 0;
    for (let i = 0; i < gas.length; i++) {
        const diff = gas[i] - cost[i];
        tank += diff;
        total += diff;
        if (tank < 0) {
            start = i + 1;
            tank = 0;
        }
    }
    return total >= 0 ? start : -1;
};
```

```c [C]
int canCompleteCircuit(int* gas, int gasSize, int* cost, int costSize) {
    int tank = 0, total = 0, start = 0;
    for (int i = 0; i < gasSize; i++) {
        int diff = gas[i] - cost[i];
        tank += diff;
        total += diff;
        if (tank < 0) { start = i + 1; tank = 0; }
    }
    return total >= 0 ? start : -1;
}
```

```ts [TypeScript]
function canCompleteCircuit(gas: number[], cost: number[]): number {
    let tank = 0, total = 0, start = 0;
    for (let i = 0; i < gas.length; i++) {
        const diff = gas[i] - cost[i];
        tank += diff;
        total += diff;
        if (tank < 0) {
            start = i + 1;
            tank = 0;
        }
    }
    return total >= 0 ? start : -1;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，只遍历一次。
- **空间复杂度**：`O(1)`，只用常数变量。

### 2.2 方法二：暴力模拟（不推荐）

1. **思路**

以每个加油站作为起点，模拟行驶过程，检查是否能绕行一周。最直观但效率最低。

- 对每个起点 `s`，从 `s` 出发累加 `gas - cost`，若中途油量 < 0 则失败，换下一个起点；
- 若某个起点能完整绕行一周，返回该起点；
- 全部失败返回 `-1`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int n = gas.length;
        for (int s = 0; s < n; s++) {
            int tank = 0, i = 0;
            while (i < n) {
                int idx = (s + i) % n;
                tank += gas[idx] - cost[idx];
                if (tank < 0) break;
                i++;
            }
            if (i == n) return s;
        }
        return -1;
    }
}
```

```python [Python]
class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        n = len(gas)
        for s in range(n):
            tank, i = 0, 0
            while i < n:
                idx = (s + i) % n
                tank += gas[idx] - cost[idx]
                if tank < 0:
                    break
                i += 1
            if i == n:
                return s
        return -1
```

```cpp [C++]
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int n = gas.size();
        for (int s = 0; s < n; s++) {
            int tank = 0, i = 0;
            while (i < n) {
                int idx = (s + i) % n;
                tank += gas[idx] - cost[idx];
                if (tank < 0) break;
                i++;
            }
            if (i == n) return s;
        }
        return -1;
    }
};
```

```go [Go]
func canCompleteCircuit(gas []int, cost []int) int {
    n := len(gas)
    for s := 0; s < n; s++ {
        tank, i := 0, 0
        for i < n {
            idx := (s + i) % n
            tank += gas[idx] - cost[idx]
            if tank < 0 {
                break
            }
            i++
        }
        if i == n {
            return s
        }
    }
    return -1
}
```

```js [JavaScript]
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
    const n = gas.length;
    for (let s = 0; s < n; s++) {
        let tank = 0, i = 0;
        while (i < n) {
            const idx = (s + i) % n;
            tank += gas[idx] - cost[idx];
            if (tank < 0) break;
            i++;
        }
        if (i === n) return s;
    }
    return -1;
};
```

```c [C]
int canCompleteCircuit(int* gas, int gasSize, int* cost, int costSize) {
    int n = gasSize;
    for (int s = 0; s < n; s++) {
        int tank = 0, i = 0;
        while (i < n) {
            int idx = (s + i) % n;
            tank += gas[idx] - cost[idx];
            if (tank < 0) break;
            i++;
        }
        if (i == n) return s;
    }
    return -1;
}
```

```ts [TypeScript]
function canCompleteCircuit(gas: number[], cost: number[]): number {
    const n = gas.length;
    for (let s = 0; s < n; s++) {
        let tank = 0, i = 0;
        while (i < n) {
            const idx = (s + i) % n;
            tank += gas[idx] - cost[idx];
            if (tank < 0) break;
            i++;
        }
        if (i === n) return s;
    }
    return -1;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`，每个起点最多模拟 `O(n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 贪心一次遍历 | `O(n)` | `O(1)` | 最优解，强烈推荐 |
| 暴力模拟 | `O(n²)` | `O(1)` | 仅用于理解题意 |

贪心法借助「若从 `s` 到 `i` 失败，则 `s~i` 间任意点都不能作为起点」的结论，把起点候选快速跳过，达到线性时间。
