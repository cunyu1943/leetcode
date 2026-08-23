# [LCR 079. 子集](https://leetcode.cn/problems/TVdhkn/)



## 一、题目描述

给定一个整数数组 `nums` ，数组中的元素 **互不相同** 。返回该数组所有可能的子集（幂集）。

解集 **不能** 包含重复的子集。你可以按 **任意顺序** 返回解集。



**示例 1：**

```
输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

**示例 2：**

```
输入：nums = [0]
输出：[[],[0]]
```

**提示：**

- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`
- `nums` 中的所有元素 **互不相同**



## 二、解答方法

### 2.1 方法一：回溯（选/不选）

1. **思路**

对每个元素都有「选入当前子集」和「不选」两种决策，递归生成所有子集：

- 到达数组末尾时记录当前子集；
- 每个位置先「选」，再「不选」，回溯恢复状态。

时间 `O(2ⁿ)`，空间 `O(n)`（递归深度）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(nums, 0, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int[] nums, int idx, List<Integer> cur, List<List<Integer>> res) {
        if (idx == nums.length) {
            res.add(new ArrayList<>(cur));
            return;
        }
        dfs(nums, idx + 1, cur, res);          // 不选
        cur.add(nums[idx]);
        dfs(nums, idx + 1, cur, res);          // 选
        cur.remove(cur.size() - 1);
    }
}
```

```python [Python]
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res = []

        def dfs(idx, cur):
            if idx == len(nums):
                res.append(cur[:])
                return
            dfs(idx + 1, cur)
            cur.append(nums[idx])
            dfs(idx + 1, cur)
            cur.pop()

        dfs(0, [])
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> cur;
        dfs(nums, 0, cur, res);
        return res;
    }
private:
    void dfs(vector<int>& nums, int idx, vector<int>& cur, vector<vector<int>>& res) {
        if (idx == nums.size()) { res.push_back(cur); return; }
        dfs(nums, idx + 1, cur);
        cur.push_back(nums[idx]);
        dfs(nums, idx + 1, cur);
        cur.pop_back();
    }
};
```

```go [Go]
func subsets(nums []int) [][]int {
    var res [][]int
    cur := []int{}
    var dfs func(idx int)
    dfs = func(idx int) {
        if idx == len(nums) {
            tmp := make([]int, len(cur))
            copy(tmp, cur)
            res = append(res, tmp)
            return
        }
        dfs(idx + 1)
        cur = append(cur, nums[idx])
        dfs(idx + 1)
        cur = cur[:len(cur)-1]
    }
    dfs(0)
    return res
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    const res = [];
    const cur = [];
    const dfs = (idx) => {
        if (idx === nums.length) {
            res.push([...cur]);
            return;
        }
        dfs(idx + 1);
        cur.push(nums[idx]);
        dfs(idx + 1);
        cur.pop();
    };
    dfs(0);
    return res;
};
```

```c [C]
#include <stdlib.h>

int** subsets(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    int total = 1 << numsSize;
    int** res = (int**)malloc(total * sizeof(int*));
    int* cols = (int*)malloc(total * sizeof(int));
    int cnt = 0;
    for (int mask = 0; mask < total; mask++) {
        int* cur = (int*)malloc(numsSize * sizeof(int));
        int len = 0;
        for (int i = 0; i < numsSize; i++) {
            if (mask & (1 << i)) cur[len++] = nums[i];
        }
        res[cnt] = cur;
        cols[cnt] = len;
        cnt++;
    }
    *returnSize = cnt;
    *returnColumnSizes = cols;
    return res;
}
```

```ts [TypeScript]
function subsets(nums: number[]): number[][] {
    const res: number[][] = [];
    const cur: number[] = [];
    const dfs = (idx: number) => {
        if (idx === nums.length) {
            res.push([...cur]);
            return;
        }
        dfs(idx + 1);
        cur.push(nums[idx]);
        dfs(idx + 1);
        cur.pop();
    };
    dfs(0);
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(2ⁿ)`，共 `2ⁿ` 个子集。
- **空间复杂度**：`O(n)`，递归栈。

### 2.2 方法二：迭代（增量构造/位掩码）

1. **思路**

- **增量法**：初始 `res = [[]]`，每来一个元素，给已有所有子集追加该元素生成新子集；
- **位掩码**：`0..2ⁿ-1` 的每个二进制位表示是否选取对应元素。

这里给出增量构造法。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        res.add(new ArrayList<>());
        for (int x : nums) {
            int n = res.size();
            for (int i = 0; i < n; i++) {
                List<Integer> cur = new ArrayList<>(res.get(i));
                cur.add(x);
                res.add(cur);
            }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res = [[]]
        for x in nums:
            res += [cur + [x] for cur in res]
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res(1);
        for (int x : nums) {
            int n = res.size();
            for (int i = 0; i < n; i++) {
                res.push_back(res[i]);
                res.back().push_back(x);
            }
        }
        return res;
    }
};
```

```go [Go]
func subsets(nums []int) [][]int {
    res := [][]int{{}}
    for _, x := range nums {
        n := len(res)
        for i := 0; i < n; i++ {
            cur := make([]int, len(res[i]), len(res[i])+1)
            copy(cur, res[i])
            cur = append(cur, x)
            res = append(res, cur)
        }
    }
    return res
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    let res = [[]];
    for (const x of nums) {
        res = res.concat(res.map((cur) => [...cur, x]));
    }
    return res;
};
```

```c [C]
#include <stdlib.h>

int** subsets(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    int total = 1 << numsSize;
    int** res = (int**)malloc(total * sizeof(int*));
    int* cols = (int*)malloc(total * sizeof(int));
    res[0] = NULL;
    cols[0] = 0;
    int cnt = 1;
    for (int i = 0; i < numsSize; i++) {
        int n = cnt;
        for (int j = 0; j < n; j++) {
            int* cur = (int*)malloc((cols[j] + 1) * sizeof(int));
            for (int k = 0; k < cols[j]; k++) cur[k] = res[j][k];
            cur[cols[j]] = nums[i];
            res[cnt] = cur;
            cols[cnt] = cols[j] + 1;
            cnt++;
        }
    }
    *returnSize = cnt;
    *returnColumnSizes = cols;
    return res;
}
```

```ts [TypeScript]
function subsets(nums: number[]): number[][] {
    let res: number[][] = [[]];
    for (const x of nums) {
        res = res.concat(res.map((cur) => [...cur, x]));
    }
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(2ⁿ)`。
- **空间复杂度**：`O(2ⁿ)`，结果集。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯 | `O(2ⁿ)` | `O(n)` | 通用，可扩展剪枝 |
| 增量构造 | `O(2ⁿ)` | `O(2ⁿ)` | 简洁，无需递归 |

求子集是最基础的「选/不选」回溯问题；增量法把新元素追加到所有已有子集上也能生成完整幂集，二者本质等价。

