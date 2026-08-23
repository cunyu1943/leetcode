# [LCR 084. 全排列 II](https://leetcode.cn/problems/7p8L0Z/)



## 一、题目描述

给定一个可包含重复数字的整数集合 `nums` ，按任意顺序返回它所有不重复的全排列。



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

- `1 <= nums.length <= 8`
- `-10 <= nums[i] <= 10`



## 二、解答方法

### 2.1 方法一：排序 + 回溯去重

1. **思路**

与全排列 I 相比，数组可能含重复数字。先排序，然后在「同一层」跳过重复值：

```
if (used[i] || (i > 0 && nums[i] == nums[i-1] && !used[i-1])) continue;
```

`!used[i-1]` 表示前一个相同元素尚未被本层使用（即这是同层的重复选择），跳过即可去重。

时间 `O(n × n!)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        Arrays.sort(nums);
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
            if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1])) continue;
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
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        used = [False] * len(nums)

        def dfs(cur):
            if len(cur) == len(nums):
                res.append(cur[:])
                return
            for i in range(len(nums)):
                if used[i] or (i > 0 and nums[i] == nums[i - 1] and not used[i - 1]):
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
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        sort(nums.begin(), nums.end());
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
            if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1])) continue;
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
func permuteUnique(nums []int) [][]int {
    sort.Ints(nums)
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
            if used[i] || (i > 0 && nums[i] == nums[i-1] && !used[i-1]) {
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
var permuteUnique = function (nums) {
    nums.sort((a, b) => a - b);
    const res = [];
    const used = new Array(nums.length).fill(false);
    const cur = [];
    const dfs = () => {
        if (cur.length === nums.length) {
            res.push([...cur]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i] || (i > 0 && nums[i] === nums[i - 1] && !used[i - 1])) continue;
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

int cmp(const void* a, const void* b) { return *(int*)a - *(int*)b; }

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
        if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1])) continue;
        used[i] = 1;
        cur[len] = nums[i];
        dfs(nums, n, used, cur, len + 1);
        used[i] = 0;
    }
}

int** permuteUnique(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    qsort(nums, numsSize, sizeof(int), cmp);
    res = (int**)malloc(5000 * sizeof(int*));
    cols = (int*)malloc(5000 * sizeof(int));
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
function permuteUnique(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const res: number[][] = [];
    const used: boolean[] = new Array(nums.length).fill(false);
    const cur: number[] = [];
    const dfs = () => {
        if (cur.length === nums.length) {
            res.push([...cur]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i] || (i > 0 && nums[i] === nums[i - 1] && !used[i - 1])) continue;
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
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 排序 + 回溯去重 | `O(n·n!)` | `O(n)` | 标准解法 |

重复元素去重的关键是「同层相同值只选一次」：排序后，若当前元素与前一个相等且前一个未在本层使用（`!used[i-1]`），跳过。配合 `used[]` 即可生成不重复全排列。

