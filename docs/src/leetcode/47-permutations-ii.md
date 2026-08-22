# [47. 全排列 II](https://leetcode.cn/problems/permutations-ii/)



## 一、题目描述

给定一个可包含重复数字的序列 `nums`，**按任意顺序** 返回所有不重复的全排列。



**示例 1：**

```
输入：nums = [1,1,2]
输出：
[[1,1,2],
 [1,2,1],
 [2,1,1]]
```

**示例 2：**

```
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**提示：**

-   `1 <= nums.length <= 8`
-   `-10 <= nums[i] <= 10`



## 二、解答方法

### 2.1 方法一：回溯 + 同层去重（排序 + used）

1. **思路**

在「全排列」基础上处理重复：先排序让相同数字相邻；用 `used` 数组记录已选位置。关键去重条件：若 `nums[i] == nums[i-1]` 且 `used[i-1] == false`，说明同一层已经用前一个相同数字尝试过，当前跳过，避免产生重复排列。

-   `used[i-1] == false` 表示前一个相同数字在「上一层」已被撤销，当前层再选会产生重复；
-   `used[i-1] == true` 表示它正在当前路径中（同一排列里允许重复使用）。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private List<List<Integer>> res = new ArrayList<>();
    private List<Integer> path = new ArrayList<>();
    private boolean[] used;

    public List<List<Integer>> permuteUnique(int[] nums) {
        Arrays.sort(nums);
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
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;
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
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res, path = [], []
        used = [False] * len(nums)

        def backtrack():
            if len(path) == len(nums):
                res.append(path[:])
                return
            for i in range(len(nums)):
                if used[i]:
                    continue
                if i > 0 and nums[i] == nums[i - 1] and not used[i - 1]:
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
func permuteUnique(nums []int) [][]int {
    sort.Ints(nums)
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
            if i > 0 && nums[i] == nums[i-1] && !used[i-1] {
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
/* 含重复的全排列在 C 中需手动去重与动态数组，推荐移植上述思路 */
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path;
    vector<bool> used;
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        sort(nums.begin(), nums.end());
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
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;
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
var permuteUnique = function (nums) {
    nums.sort((a, b) => a - b);
    const res = [], path = [], used = new Array(nums.length).fill(false);
    const backtrack = () => {
        if (path.length === nums.length) {
            res.push([...path]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
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
function permuteUnique(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const res: number[][] = [], path: number[] = [], used: boolean[] = new Array(nums.length).fill(false);
    const backtrack = (): void => {
        if (path.length === nums.length) {
            res.push([...path]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
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

- **时间复杂度**：`O(n * n!)`，剪枝后实际更少。
- **空间复杂度**：`O(n)`。

### 2.2 方法二：回溯 + 统计频次（计数法）

1. **思路**

用哈希表/数组统计每个数字剩余可用次数，每次从未用完的数字中挑选并递减计数。天然避免重复（同一数字只用一次频次），无需排序，但需要额外的频次结构。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private List<List<Integer>> res = new ArrayList<>();
    private List<Integer> path = new ArrayList<>();
    private int[] cnt;
    private int total;

    public List<List<Integer>> permuteUnique(int[] nums) {
        cnt = new int[21]; // -10..10 映射 0..20
        total = nums.length;
        for (int x : nums) cnt[x + 10]++;
        backtrack();
        return res;
    }

    private void backtrack() {
        if (path.size() == total) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int v = -10; v <= 10; v++) {
            int idx = v + 10;
            if (cnt[idx] == 0) continue;
            cnt[idx]--;
            path.add(v);
            backtrack();
            path.remove(path.size() - 1);
            cnt[idx]++;
        }
    }
}
```

```python [Python]
from collections import Counter
class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        cnt = Counter(nums)
        res, path = [], []
        n = len(nums)

        def backtrack():
            if len(path) == n:
                res.append(path[:])
                return
            for v in list(cnt.keys()):
                if cnt[v] == 0:
                    continue
                cnt[v] -= 1
                path.append(v)
                backtrack()
                path.pop()
                cnt[v] += 1

        backtrack()
        return res
```

```go [Go]
func permuteUnique(nums []int) [][]int {
    cnt := map[int]int{}
    for _, x := range nums {
        cnt[x]++
    }
    res := [][]int{}
    path := []int{}
    n := len(nums)
    var backtrack func()
    backtrack = func() {
        if len(path) == n {
            tmp := make([]int, len(path))
            copy(tmp, path)
            res = append(res, tmp)
            return
        }
        for v, c := range cnt {
            if c == 0 {
                continue
            }
            cnt[v]--
            path = append(path, v)
            backtrack()
            path = path[:len(path)-1]
            cnt[v]++
        }
    }
    backtrack()
    return res
}
```

```c [C]
/* 计数法在 C 中需手动管理哈希与动态数组，略去完整实现 */
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path;
    unordered_map<int, int> cnt;
    int n;
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        n = nums.size();
        for (int x : nums) cnt[x]++;
        backtrack();
        return res;
    }
    void backtrack() {
        if (path.size() == n) {
            res.push_back(path);
            return;
        }
        for (auto& kv : cnt) {
            int v = kv.first;
            if (cnt[v] == 0) continue;
            cnt[v]--;
            path.push_back(v);
            backtrack();
            path.pop_back();
            cnt[v]++;
        }
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
    const cnt = new Map();
    for (const x of nums) cnt.set(x, (cnt.get(x) || 0) + 1);
    const res = [], path = [], n = nums.length;
    const backtrack = () => {
        if (path.length === n) {
            res.push([...path]);
            return;
        }
        for (const [v, c] of cnt) {
            if (c === 0) continue;
            cnt.set(v, c - 1);
            path.push(v);
            backtrack();
            path.pop();
            cnt.set(v, c);
        }
    };
    backtrack();
    return res;
};
```

```ts [TypeScript]
function permuteUnique(nums: number[]): number[][] {
    const cnt = new Map<number, number>();
    for (const x of nums) cnt.set(x, (cnt.get(x) || 0) + 1);
    const res: number[][] = [], path: number[] = [], n = nums.length;
    const backtrack = (): void => {
        if (path.length === n) {
            res.push([...path]);
            return;
        }
        for (const [v, c] of cnt) {
            if (c === 0) continue;
            cnt.set(v, c - 1);
            path.push(v);
            backtrack();
            path.pop();
            cnt.set(v, c);
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
| 回溯 + 同层去重（排序 + used） | `O(n * n!)` | `O(n)` | 最通用，面试首选 |
| 回溯 + 统计频次（计数法） | `O(n * n!)` | `O(n)` | 无需排序，天然去重 |

