# [46. 全排列](https://leetcode.cn/problems/permutations/)



## 一、题目描述

给定一个不含重复数字的数组 `nums`，返回其 **所有可能的全排列**。你可以按任意顺序返回答案。



**示例 1：**

```
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**示例 2：**

```
输入：nums = [0,1]
输出：[[0,1],[1,0]]
```

**示例 3：**

```
输入：nums = [1]
输出：[[1]]
```

**提示：**

-   `1 <= nums.length <= 6`
-   `-10 <= nums[i] <= 10`
-   `nums` 中的所有整数 **互不相同**



## 二、解答方法

### 2.1 方法一：回溯（交换法，原地生成）

1. **思路**

递归地在位置 `idx` 上尝试填入「尚未使用」的每个数字：把候选数字与 `idx` 位置交换，递归处理 `idx+1`，回溯时换回。无需额外 `used` 数组，靠交换保证每个位置只用一次。

-   当 `idx == n` 时收集当前排列；
-   对 `i` 从 `idx` 到 `n-1` 交换 `nums[idx]` 与 `nums[i]`，递归，再换回。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private List<List<Integer>> res = new ArrayList<>();
    private int[] nums;

    public List<List<Integer>> permute(int[] nums) {
        this.nums = nums;
        backtrack(0);
        return res;
    }

    private void backtrack(int idx) {
        if (idx == nums.length) {
            List<Integer> cur = new ArrayList<>();
            for (int x : nums) cur.add(x);
            res.add(cur);
            return;
        }
        for (int i = idx; i < nums.length; i++) {
            swap(idx, i);
            backtrack(idx + 1);
            swap(idx, i);
        }
    }

    private void swap(int i, int j) {
        int t = nums[i]; nums[i] = nums[j]; nums[j] = t;
    }
}
```

```python [Python]
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        res = []
        nums = nums[:]

        def backtrack(idx):
            if idx == len(nums):
                res.append(nums[:])
                return
            for i in range(idx, len(nums)):
                nums[idx], nums[i] = nums[i], nums[idx]
                backtrack(idx + 1)
                nums[idx], nums[i] = nums[i], nums[idx]

        backtrack(0)
        return res
```

```go [Go]
func permute(nums []int) [][]int {
    res := [][]int{}
    var backtrack func(int)
    backtrack = func(idx int) {
        if idx == len(nums) {
            tmp := make([]int, len(nums))
            copy(tmp, nums)
            res = append(res, tmp)
            return
        }
        for i := idx; i < len(nums); i++ {
            nums[idx], nums[i] = nums[i], nums[idx]
            backtrack(idx + 1)
            nums[idx], nums[i] = nums[i], nums[idx]
        }
    }
    backtrack(0)
    return res
}
```

```c [C]
/* 全排列在 C 中需手动管理动态数组，推荐移植上述交换回溯思路 */
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> res;
    vector<int> nums;

    vector<vector<int>> permute(vector<int>& nums) {
        this->nums = nums;
        backtrack(0);
        return res;
    }

    void backtrack(int idx) {
        if (idx == nums.size()) {
            res.push_back(nums);
            return;
        }
        for (int i = idx; i < nums.size(); i++) {
            swap(nums[idx], nums[i]);
            backtrack(idx + 1);
            swap(nums[idx], nums[i]);
        }
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const res = [];
    const backtrack = (idx) => {
        if (idx === nums.length) {
            res.push([...nums]);
            return;
        }
        for (let i = idx; i < nums.length; i++) {
            [nums[idx], nums[i]] = [nums[i], nums[idx]];
            backtrack(idx + 1);
            [nums[idx], nums[i]] = [nums[i], nums[idx]];
        }
    };
    backtrack(0);
    return res;
};
```

```ts [TypeScript]
function permute(nums: number[]): number[][] {
    const res: number[][] = [];
    const backtrack = (idx: number): void => {
        if (idx === nums.length) {
            res.push([...nums]);
            return;
        }
        for (let i = idx; i < nums.length; i++) {
            [nums[idx], nums[i]] = [nums[i], nums[idx]];
            backtrack(idx + 1);
            [nums[idx], nums[i]] = [nums[i], nums[idx]];
        }
    };
    backtrack(0);
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n * n!)`，共 `n!` 个排列，每个复制 `O(n)`。
- **空间复杂度**：`O(n)`，递归栈与路径。

### 2.2 方法二：回溯（used 标记法）

1. **思路**

用 `used` 布尔数组记录哪些数字已选入当前路径，每次从未使用的数字中挑选。逻辑更直观，不修改原数组顺序，适合需要保持原数组不变的场景。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private List<List<Integer>> res = new ArrayList<>();
    private List<Integer> path = new ArrayList<>();
    private boolean[] used;

    public List<List<Integer>> permute(int[] nums) {
        used = new boolean[nums.length];
        backtrack(nums);
        return res;
    }

    private void backtrack(int[] nums) {
        if (path.size() == nums.length) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            path.add(nums[i]);
            backtrack(nums);
            path.remove(path.size() - 1);
            used[i] = false;
        }
    }
}
```

```python [Python]
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        res, path = [], []
        used = [False] * len(nums)

        def backtrack():
            if len(path) == len(nums):
                res.append(path[:])
                return
            for i in range(len(nums)):
                if used[i]:
                    continue
                used[i] = True
                path.append(nums[i])
                backtrack()
                path.pop()
                used[i] = False

        backtrack()
        return res
```

```go [Go]
func permute(nums []int) [][]int {
    res := [][]int{}
    path := []int{}
    used := make([]bool, len(nums))
    var backtrack func()
    backtrack = func() {
        if len(path) == len(nums) {
            tmp := make([]int, len(path))
            copy(tmp, path)
            res = append(res, tmp)
            return
        }
        for i := 0; i < len(nums); i++ {
            if used[i] {
                continue
            }
            used[i] = true
            path = append(path, nums[i])
            backtrack()
            path = path[:len(path)-1]
            used[i] = false
        }
    }
    backtrack()
    return res
}
```

```c [C]
/* used 标记法在 C 中实现较繁琐，推荐方法一交换法 */
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path;
    vector<bool> used;
    vector<vector<int>> permute(vector<int>& nums) {
        used.assign(nums.size(), false);
        backtrack(nums);
        return res;
    }
    void backtrack(vector<int>& nums) {
        if (path.size() == nums.size()) {
            res.push_back(path);
            return;
        }
        for (int i = 0; i < nums.size(); i++) {
            if (used[i]) continue;
            used[i] = true;
            path.push_back(nums[i]);
            backtrack(nums);
            path.pop_back();
            used[i] = false;
        }
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const res = [], path = [], used = new Array(nums.length).fill(false);
    const backtrack = () => {
        if (path.length === nums.length) {
            res.push([...path]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            path.push(nums[i]);
            backtrack();
            path.pop();
            used[i] = false;
        }
    };
    backtrack();
    return res;
};
```

```ts [TypeScript]
function permute(nums: number[]): number[][] {
    const res: number[][] = [], path: number[] = [], used: boolean[] = new Array(nums.length).fill(false);
    const backtrack = (): void => {
        if (path.length === nums.length) {
            res.push([...path]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            path.push(nums[i]);
            backtrack();
            path.pop();
            used[i] = false;
        }
    };
    backtrack();
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n * n!)`。
- **空间复杂度**：`O(n)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯（交换法，原地生成） | `O(n * n!)` | `O(n)` | 不占额外 used 数组，推荐 |
| 回溯（used 标记法） | `O(n * n!)` | `O(n)` | 不改原数组，逻辑直观 |

