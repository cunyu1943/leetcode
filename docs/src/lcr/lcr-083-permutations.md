# [LCR 083. 全排列](https://leetcode.cn/problems/VvJkup/)



## 一、题目描述

给定一个不含重复数字的整数数组 `nums` ，返回其 **所有可能的全排列** 。你可以 **按任意顺序** 返回答案。



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

- `1 <= nums.length <= 6`
- `-10 <= nums[i] <= 10`
- `nums` 中的所有整数 **互不相同**



## 二、解答方法

### 2.1 方法一：回溯（标记已用）

1. **思路**

与组合不同，排列关心顺序，每层都要从所有「未使用」的数字中选择：

- 用 `used[]` 标记已选元素；
- 当前排列长度等于 `n` 时记录；
- 每层遍历 `i`，若 `used[i]` 跳过，否则选 `nums[i]`、标记、递归、回溯。

时间 `O(n × n!)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(nums, new boolean[nums.length], new ArrayList<>(), res);
        return res;
    }
    private void dfs(int[] nums, boolean[] used, List<Integer> cur, List<List<Integer>> res) {
        if (cur.size() == nums.length) {
            res.add(new ArrayList<>(cur));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            cur.add(nums[i]);
            dfs(nums, used, cur, res);
            cur.remove(cur.size() - 1);
            used[i] = false;
        }
    }
}
```

```python [Python]
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        res = []
        used = [False] * len(nums)

        def dfs(cur):
            if len(cur) == len(nums):
                res.append(cur[:])
                return
            for i in range(len(nums)):
                if used[i]:
                    continue
                used[i] = True
                cur.append(nums[i])
                dfs(cur)
                cur.pop()
                used[i] = False

        dfs([])
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> cur;
        vector<bool> used(nums.size(), false);
        dfs(nums, used, cur, res);
        return res;
    }
private:
    void dfs(vector<int>& nums, vector<bool>& used, vector<int>& cur, vector<vector<int>>& res) {
        if (cur.size() == nums.size()) { res.push_back(cur); return; }
        for (int i = 0; i < nums.size(); i++) {
            if (used[i]) continue;
            used[i] = true;
            cur.push_back(nums[i]);
            dfs(nums, used, cur, res);
            cur.pop_back();
            used[i] = false;
        }
    }
};
```

```go [Go]
func permute(nums []int) [][]int {
    var res [][]int
    used := make([]bool, len(nums))
    cur := []int{}
    var dfs func()
    dfs = func() {
        if len(cur) == len(nums) {
            tmp := make([]int, len(cur))
            copy(tmp, cur)
            res = append(res, tmp)
            return
        }
        for i := 0; i < len(nums); i++ {
            if used[i] {
                continue
            }
            used[i] = true
            cur = append(cur, nums[i])
            dfs()
            cur = cur[:len(cur)-1]
            used[i] = false
        }
    }
    dfs()
    return res
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const res = [];
    const used = new Array(nums.length).fill(false);
    const cur = [];
    const dfs = () => {
        if (cur.length === nums.length) {
            res.push([...cur]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            cur.push(nums[i]);
            dfs();
            cur.pop();
            used[i] = false;
        }
    };
    dfs();
    return res;
};
```

```c [C]
#include <stdlib.h>

int** res;
int* cols;
int cnt;

static void dfs(int* nums, int n, int* used, int* cur, int len) {
    if (len == n) {
        res[cnt] = (int*)malloc(n * sizeof(int));
        for (int i = 0; i < n; i++) res[cnt][i] = cur[i];
        cols[cnt] = n;
        cnt++;
        return;
    }
    for (int i = 0; i < n; i++) {
        if (used[i]) continue;
        used[i] = 1;
        cur[len] = nums[i];
        dfs(nums, n, used, cur, len + 1);
        used[i] = 0;
    }
}

int** permute(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    res = (int**)malloc(1000 * sizeof(int*));
    cols = (int*)malloc(1000 * sizeof(int));
    cnt = 0;
    int* used = (int*)calloc(numsSize, sizeof(int));
    int* cur = (int*)malloc(numsSize * sizeof(int));
    dfs(nums, numsSize, used, cur, 0);
    free(used);
    free(cur);
    *returnSize = cnt;
    *returnColumnSizes = cols;
    return res;
}
```

```ts [TypeScript]
function permute(nums: number[]): number[][] {
    const res: number[][] = [];
    const used: boolean[] = new Array(nums.length).fill(false);
    const cur: number[] = [];
    const dfs = () => {
        if (cur.length === nums.length) {
            res.push([...cur]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            cur.push(nums[i]);
            dfs();
            cur.pop();
            used[i] = false;
        }
    };
    dfs();
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n × n!)`。
- **空间复杂度**：`O(n)`，递归栈与 `used` 数组。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯 | `O(n·n!)` | `O(n)` | 标准解法 |

排列与组合的关键区别：每层都可选「任意未使用」的数字（而非只从 start 之后选），用 `used[]` 标记避免重复选取。

