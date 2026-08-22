# [45. 跳跃游戏 II](https://leetcode.cn/problems/jump-game-ii/)



## 一、题目描述

给定一个长度为 `n` 的 **0 索引** 整数数组 `nums`。初始位置在下标 0。每个元素 `nums[i]` 表示从索引 `i` 向后跳转的最大长度。

返回到达 `n - 1` 的最小跳跃次数。测试用例保证可以到达 `n - 1`。



**示例 1：**

```
输入：nums = [2,3,1,1,4]
输出：2
解释：跳到最后一个位置的最小跳跃数是 2。从下标 0 跳到下标 1（跳 1 步），然后跳 3 步到末尾。
```

**示例 2：**

```
输入：nums = [2,3,0,1,4]
输出：2
```

**提示：**

-   `1 <= nums.length <= 10^4`
-   `0 <= nums[i] <= 1000`
-   题目保证可以到达 `n - 1`



## 二、解答方法

### 2.1 方法一：贪心（覆盖范围跳跃）

1. **思路**

维护「当前这一步能覆盖的最远位置 `curEnd`」和「下一步能到达的最远位置 `farthest`」。从左向右遍历：

-   每到一个位置都更新 `farthest = max(farthest, i + nums[i])`；
-   当遍历到 `curEnd` 时，说明「当前这一步走完了」，必须再跳一次，步数 `+1`，并把 `curEnd` 更新为 `farthest`；
-   若 `curEnd >= n - 1` 可提前结束。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int jump(int[] nums) {
        int n = nums.length;
        int curEnd = 0, farthest = 0, steps = 0;
        for (int i = 0; i < n - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == curEnd) {
                steps++;
                curEnd = farthest;
            }
        }
        return steps;
    }
}
```

```python [Python]
class Solution:
    def jump(self, nums: List[int]) -> int:
        n = len(nums)
        cur_end = farthest = steps = 0
        for i in range(n - 1):
            farthest = max(farthest, i + nums[i])
            if i == cur_end:
                steps += 1
                cur_end = farthest
        return steps
```

```go [Go]
func jump(nums []int) int {
    n := len(nums)
    curEnd, farthest, steps := 0, 0, 0
    for i := 0; i < n-1; i++ {
        if i+nums[i] > farthest {
            farthest = i + nums[i]
        }
        if i == curEnd {
            steps++
            curEnd = farthest
        }
    }
    return steps
}
```

```c [C]
int jump(int* nums, int numsSize) {
    int curEnd = 0, farthest = 0, steps = 0;
    for (int i = 0; i < numsSize - 1; i++) {
        if (i + nums[i] > farthest) farthest = i + nums[i];
        if (i == curEnd) {
            steps++;
            curEnd = farthest;
        }
    }
    return steps;
}
```

```cpp [C++]
class Solution {
public:
    int jump(vector<int>& nums) {
        int n = nums.size();
        int curEnd = 0, farthest = 0, steps = 0;
        for (int i = 0; i < n - 1; i++) {
            farthest = max(farthest, i + nums[i]);
            if (i == curEnd) {
                steps++;
                curEnd = farthest;
            }
        }
        return steps;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    const n = nums.length;
    let curEnd = 0, farthest = 0, steps = 0;
    for (let i = 0; i < n - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i === curEnd) {
            steps++;
            curEnd = farthest;
        }
    }
    return steps;
};
```

```ts [TypeScript]
function jump(nums: number[]): number {
    const n = nums.length;
    let curEnd = 0, farthest = 0, steps = 0;
    for (let i = 0; i < n - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i === curEnd) {
            steps++;
            curEnd = farthest;
        }
    }
    return steps;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，一次线性扫描。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：BFS（层序跳跃）

1. **思路**

把数组看作图，每层是当前步能到达的所有下标，BFS 一层一层扩展，层数即最小跳跃数。实现上等价于「覆盖范围」的逐层扩张，与贪心法本质相同。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int jump(int[] nums) {
        int n = nums.length;
        if (n <= 1) return 0;
        int level = 0, i = 0;
        while (i < n - 1) {
            int reach = i + nums[i];
            if (reach >= n - 1) return level + 1;
            int nextReach = i;
            for (int j = i + 1; j <= reach; j++) {
                if (i + nums[j] > nextReach + nums[nextReach]) nextReach = j;
            }
            i = nextReach;
            level++;
        }
        return level;
    }
}
```

```python [Python]
class Solution:
    def jump(self, nums: List[int]) -> int:
        n = len(nums)
        if n <= 1:
            return 0
        level = i = 0
        while i < n - 1:
            reach = i + nums[i]
            if reach >= n - 1:
                return level + 1
            next_reach = i
            for j in range(i + 1, reach + 1):
                if j + nums[j] > next_reach + nums[next_reach]:
                    next_reach = j
            i = next_reach
            level += 1
        return level
```

```go [Go]
func jump(nums []int) int {
    n := len(nums)
    if n <= 1 {
        return 0
    }
    level, i := 0, 0
    for i < n-1 {
        reach := i + nums[i]
        if reach >= n-1 {
            return level + 1
        }
        nextReach := i
        for j := i + 1; j <= reach; j++ {
            if j+nums[j] > nextReach+nums[nextReach] {
                nextReach = j
            }
        }
        i = nextReach
        level++
    }
    return level
}
```

```c [C]
int jump(int* nums, int numsSize) {
    if (numsSize <= 1) return 0;
    int level = 0, i = 0;
    while (i < numsSize - 1) {
        int reach = i + nums[i];
        if (reach >= numsSize - 1) return level + 1;
        int nextReach = i;
        for (int j = i + 1; j <= reach; j++) {
            if (j + nums[j] > nextReach + nums[nextReach]) nextReach = j;
        }
        i = nextReach;
        level++;
    }
    return level;
}
```

```cpp [C++]
class Solution {
public:
    int jump(vector<int>& nums) {
        int n = nums.size();
        if (n <= 1) return 0;
        int level = 0, i = 0;
        while (i < n - 1) {
            int reach = i + nums[i];
            if (reach >= n - 1) return level + 1;
            int nextReach = i;
            for (int j = i + 1; j <= reach; j++) {
                if (j + nums[j] > nextReach + nums[nextReach]) nextReach = j;
            }
            i = nextReach;
            level++;
        }
        return level;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    const n = nums.length;
    if (n <= 1) return 0;
    let level = 0, i = 0;
    while (i < n - 1) {
        const reach = i + nums[i];
        if (reach >= n - 1) return level + 1;
        let nextReach = i;
        for (let j = i + 1; j <= reach; j++) {
            if (j + nums[j] > nextReach + nums[nextReach]) nextReach = j;
        }
        i = nextReach;
        level++;
    }
    return level;
};
```

```ts [TypeScript]
function jump(nums: number[]): number {
    const n = nums.length;
    if (n <= 1) return 0;
    let level = 0, i = 0;
    while (i < n - 1) {
        const reach = i + nums[i];
        if (reach >= n - 1) return level + 1;
        let nextReach = i;
        for (let j = i + 1; j <= reach; j++) {
            if (j + nums[j] > nextReach + nums[nextReach]) nextReach = j;
        }
        i = nextReach;
        level++;
    }
    return level;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个元素最多被访问两次。
- **空间复杂度**：`O(1)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 贪心（覆盖范围跳跃） | `O(n)` | `O(1)` | 最简洁，推荐 |
| BFS（层序跳跃） | `O(n)` | `O(1)` | 概念清晰，选最远跳点 |

