# [135. 分发糖果](https://leetcode.cn/problems/candy/)



## 一、题目描述

`n` 个孩子站成一排。给你一个整数数组 `ratings` 表示每个孩子的评分。

你需要按照以下要求，给这些孩子分发糖果：

- 每个孩子至少分配 `1` 个糖果。
- 相邻两个孩子中，评分更高的孩子必须获得比相邻孩子 **更多的** 糖果。

请返回分发所需准备的 **最少糖果数目**。



**示例 1：**

```
输入：ratings = [1,0,2]
输出：5
解释：可以分别给三个孩子 [2,1,2] 颗糖果，共需 5 颗。
```

**示例 2：**

```
输入：ratings = [1,2,2]
输出：4
解释：可以分别给 [1,2,1] 颗糖果，共需 4 颗。
```

**提示：**

- `n == ratings.length`
- `1 <= n <= 2 × 10⁴`
- `0 <= ratings[i] <= 2 × 10⁴`



## 二、解答方法

### 2.1 方法一：两次遍历（左规则 + 右规则）

1. **思路**

评分规则包含「左邻」与「右邻」两个方向的约束，单次遍历难以同时满足。采用 **两次遍历**：

- 从左到右遍历：若 `ratings[i] > ratings[i-1]`，则 `left[i] = left[i-1] + 1`；否则 `left[i] = 1`。这满足了「比左邻评分高则糖果更多」。
- 从右到左遍历：若 `ratings[i] > ratings[i+1]`，则 `right[i] = right[i+1] + 1`；否则 `right[i] = 1`。这满足右邻约束。
- 每个孩子最终糖果数必须 **同时** 满足两个方向，因此取 `candy[i] = max(left[i], right[i])`。
- 把数组求和即为最少糖果总数。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int candy(int[] ratings) {
        int n = ratings.length;
        int[] left = new int[n];
        int[] right = new int[n];
        Arrays.fill(left, 1);
        Arrays.fill(right, 1);

        for (int i = 1; i < n; i++)
            if (ratings[i] > ratings[i - 1]) left[i] = left[i - 1] + 1;

        for (int i = n - 2; i >= 0; i--)
            if (ratings[i] > ratings[i + 1]) right[i] = right[i + 1] + 1;

        int sum = 0;
        for (int i = 0; i < n; i++) sum += Math.max(left[i], right[i]);
        return sum;
    }
}
```

```python [Python]
class Solution:
    def candy(self, ratings: List[int]) -> int:
        n = len(ratings)
        left = [1] * n
        right = [1] * n

        for i in range(1, n):
            if ratings[i] > ratings[i - 1]:
                left[i] = left[i - 1] + 1

        for i in range(n - 2, -1, -1):
            if ratings[i] > ratings[i + 1]:
                right[i] = right[i + 1] + 1

        return sum(max(left[i], right[i]) for i in range(n))
```

```cpp [C++]
class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        vector<int> left(n, 1), right(n, 1);

        for (int i = 1; i < n; i++)
            if (ratings[i] > ratings[i - 1]) left[i] = left[i - 1] + 1;

        for (int i = n - 2; i >= 0; i--)
            if (ratings[i] > ratings[i + 1]) right[i] = right[i + 1] + 1;

        int sum = 0;
        for (int i = 0; i < n; i++) sum += max(left[i], right[i]);
        return sum;
    }
};
```

```go [Go]
func candy(ratings []int) int {
    n := len(ratings)
    left := make([]int, n)
    right := make([]int, n)
    for i := range left {
        left[i], right[i] = 1, 1
    }

    for i := 1; i < n; i++ {
        if ratings[i] > ratings[i-1] {
            left[i] = left[i-1] + 1
        }
    }
    for i := n - 2; i >= 0; i-- {
        if ratings[i] > ratings[i+1] {
            right[i] = right[i+1] + 1
        }
    }

    sum := 0
    for i := 0; i < n; i++ {
        if left[i] > right[i] {
            sum += left[i]
        } else {
            sum += right[i]
        }
    }
    return sum
}
```

```js [JavaScript]
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
    const n = ratings.length;
    const left = new Array(n).fill(1);
    const right = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) left[i] = left[i - 1] + 1;
    }
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) right[i] = right[i + 1] + 1;
    }

    let sum = 0;
    for (let i = 0; i < n; i++) sum += Math.max(left[i], right[i]);
    return sum;
};
```

```c [C]
int candy(int* ratings, int ratingsSize) {
    int n = ratingsSize;
    int* left = (int*)malloc(n * sizeof(int));
    int* right = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) left[i] = right[i] = 1;
    for (int i = 1; i < n; i++)
        if (ratings[i] > ratings[i - 1]) left[i] = left[i - 1] + 1;
    for (int i = n - 2; i >= 0; i--)
        if (ratings[i] > ratings[i + 1]) right[i] = right[i + 1] + 1;
    int sum = 0;
    for (int i = 0; i < n; i++) sum += left[i] > right[i] ? left[i] : right[i];
    free(left); free(right);
    return sum;
}
```

```ts [TypeScript]
function candy(ratings: number[]): number {
    const n = ratings.length;
    const left: number[] = new Array(n).fill(1);
    const right: number[] = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) left[i] = left[i - 1] + 1;
    }
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) right[i] = right[i + 1] + 1;
    }

    let sum = 0;
    for (let i = 0; i < n; i++) sum += Math.max(left[i], right[i]);
    return sum;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，三次线性遍历。
- **空间复杂度**：`O(n)`，两个辅助数组。

### 2.2 方法二：常数空间（一次遍历 + 峰谷计数）

1. **思路**

可以用一次遍历在 `O(1)` 空间内求解，核心是把评分序列看作「先递减后递增」的山谷-山峰结构：

- 维护 `up`（当前连续上升长度）、`down`（当前连续下降长度）、`peak`（最近一个上升段的峰值长度）；
- 当序列上升时累加 `up`；下降时累加 `down`，并用 `peak` 记录下降前峰值；
- 下降结束后，整段「上升+下降」需要的糖果为 `up + down + max(peak, down) - ...`（具体用 `2*down + up + 1 - ...` 计数）；
- 细节较复杂，工程上更推荐方法一以可读性为先。

这里给出可读性更好的「两次遍历」扩展版（无额外 O(n) 数组的变体较为繁琐，故不展开），实际面试中方法一已是最优实践。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int candy(int[] ratings) {
        int n = ratings.length;
        int ret = 1;
        int up = 0, down = 0, peak = 0;
        for (int i = 1; i < n; i++) {
            if (ratings[i - 1] < ratings[i]) {
                up++; down = 0; peak = up;
            } else if (ratings[i - 1] == ratings[i]) {
                up = down = peak = 0;
            } else {
                up = 0; down++;
            }
            ret += 1 + Math.max(up, down) + (down >= peak ? 1 : 0);
        }
        return ret;
    }
}
```

```python [Python]
class Solution:
    def candy(self, ratings: List[int]) -> int:
        n = len(ratings)
        ret = 1
        up = down = peak = 0
        for i in range(1, n):
            if ratings[i - 1] < ratings[i]:
                up += 1
                down = 0
                peak = up
            elif ratings[i - 1] == ratings[i]:
                up = down = peak = 0
            else:
                up = 0
                down += 1
            ret += 1 + max(up, down) + (1 if down >= peak else 0)
        return ret
```

```cpp [C++]
class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        int ret = 1, up = 0, down = 0, peak = 0;
        for (int i = 1; i < n; i++) {
            if (ratings[i - 1] < ratings[i]) {
                up++; down = 0; peak = up;
            } else if (ratings[i - 1] == ratings[i]) {
                up = down = peak = 0;
            } else {
                up = 0; down++;
            }
            ret += 1 + max(up, down) + (down >= peak ? 1 : 0);
        }
        return ret;
    }
};
```

```go [Go]
func candy(ratings []int) int {
    n := len(ratings)
    ret, up, down, peak := 1, 0, 0, 0
    for i := 1; i < n; i++ {
        if ratings[i-1] < ratings[i] {
            up++
            down = 0
            peak = up
        } else if ratings[i-1] == ratings[i] {
            up, down, peak = 0, 0, 0
        } else {
            up = 0
            down++
        }
        extra := 0
        if down >= peak {
            extra = 1
        }
        ret += 1 + max(up, down) + extra
    }
    return ret
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```js [JavaScript]
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
    const n = ratings.length;
    let ret = 1, up = 0, down = 0, peak = 0;
    for (let i = 1; i < n; i++) {
        if (ratings[i - 1] < ratings[i]) {
            up++; down = 0; peak = up;
        } else if (ratings[i - 1] === ratings[i]) {
            up = down = peak = 0;
        } else {
            up = 0; down++;
        }
        ret += 1 + Math.max(up, down) + (down >= peak ? 1 : 0);
    }
    return ret;
};
```

```c [C]
int candy(int* ratings, int ratingsSize) {
    int n = ratingsSize;
    int ret = 1, up = 0, down = 0, peak = 0;
    for (int i = 1; i < n; i++) {
        if (ratings[i - 1] < ratings[i]) { up++; down = 0; peak = up; }
        else if (ratings[i - 1] == ratings[i]) { up = down = peak = 0; }
        else { up = 0; down++; }
        ret += 1 + (up > down ? up : down) + (down >= peak ? 1 : 0);
    }
    return ret;
}
```

```ts [TypeScript]
function candy(ratings: number[]): number {
    const n = ratings.length;
    let ret = 1, up = 0, down = 0, peak = 0;
    for (let i = 1; i < n; i++) {
        if (ratings[i - 1] < ratings[i]) {
            up++; down = 0; peak = up;
        } else if (ratings[i - 1] === ratings[i]) {
            up = down = peak = 0;
        } else {
            up = 0; down++;
        }
        ret += 1 + Math.max(up, down) + (down >= peak ? 1 : 0);
    }
    return ret;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，一次遍历。
- **空间复杂度**：`O(1)`，只使用常数变量。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 两次遍历 | `O(n)` | `O(n)` | 思路清晰，强烈推荐 |
| 一次遍历常数空间 | `O(n)` | `O(1)` | 空间更优，但逻辑易错 |

实际工程中优先使用「两次遍历」写法，可读性与正确性最佳；对空间有极致要求时再考虑一次遍历解法。
