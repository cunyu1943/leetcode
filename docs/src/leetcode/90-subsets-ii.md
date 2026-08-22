# [90. 子集 II](https://leetcode.cn/problems/subsets-ii/)



## 一、题目描述

给你一个整数数组 `nums`，其中可能包含重复元素，请你返回该数组所有可能的 **子集（幂集）**。

解集 **不能** 包含重复的子集。返回的解集中，子集可以按 **任意顺序** 排列。



**示例 1：**

```
输入：nums = [1,2,2]
输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
```

**示例 2：**

```
输入：nums = [0]
输出：[[],[0]]
```

**提示：**

-   `1 <= nums.length <= 10`
-   `-10 <= nums[i] <= 10`
-   `nums` 可能包含重复元素



## 二、解答方法

### 2.1 方法一：排序 + 回溯（同层去重）


1. **思路**

先排序，回溯时若当前元素与前一个相同且前一个未被选用（`i > start` 且 `nums[i]==nums[i-1]`），则跳过，避免生成重复子集。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    List<List<Integer>> res = new ArrayList<>();
    List<Integer> path = new ArrayList<>();
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        backtrack(nums, 0);
        return res;
    }
    private void backtrack(int[] nums, int start) {
        res.add(new ArrayList<>(path));
        for (int i = start; i < nums.length; i++) {
            if (i > start && nums[i] == nums[i - 1]) continue;
            path.add(nums[i]);
            backtrack(nums, i + 1);
            path.remove(path.size() - 1);
        }
    }
}
```

```python [Python]
class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res, path = [], []
        def backtrack(start):
            res.append(path[:])
            for i in range(start, len(nums)):
                if i > start and nums[i] == nums[i - 1]: continue
                path.append(nums[i]); backtrack(i + 1); path.pop()
        backtrack(0)
        return res
```

```go [Go]
func subsetsWithDup(nums []int) [][]int {
    sort.Ints(nums)
    res := [][]int{}
    path := []int{}
    var backtrack func(int)
    backtrack = func(start int) {
        tmp := make([]int, len(path)); copy(tmp, path); res = append(res, tmp)
        for i := start; i < len(nums); i++ {
            if i > start && nums[i] == nums[i-1] { continue }
            path = append(path, nums[i])
            backtrack(i + 1)
            path = path[:len(path)-1]
        }
    }
    backtrack(0)
    return res
}
```

```c [C]
int** subsetsWithDup(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    // 排序 + 回溯同层去重核心结构同上，完整实现略
    *returnSize = 0; return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        vector<int> path;
        function<void(int)> backtrack = [&](int start) {
            res.push_back(path);
            for (int i = start; i < nums.size(); i++) {
                if (i > start && nums[i] == nums[i - 1]) continue;
                path.push_back(nums[i]);
                backtrack(i + 1);
                path.pop_back();
            }
        };
        backtrack(0);
        return res;
    }
};
```

```javascript [JavaScript]
var subsetsWithDup = function(nums) {
    nums.sort((a, b) => a - b);
    const res = [], path = [];
    const backtrack = (start) => {
        res.push([...path]);
        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) continue;
            path.push(nums[i]); backtrack(i + 1); path.pop();
        }
    };
    backtrack(0);
    return res;
};
```

```typescript [TypeScript]
function subsetsWithDup(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const res: number[][] = [], path: number[] = [];
    const backtrack = (start: number): void => {
        res.push([...path]);
        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) continue;
            path.push(nums[i]); backtrack(i + 1); path.pop();
        }
    };
    backtrack(0);
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(2^n * n)`，子集数乘构造长度。
- **空间复杂度**：`O(n)`，递归栈与路径。

### 2.2 方法二：计数 + 迭代扩展


1. **思路**

统计每个元素的出现次数，对每个不同元素，按出现次数 0..cnt 扩展已有子集，天然去重。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        res.add(new ArrayList<>());
        int i = 0;
        while (i < nums.length) {
            int cnt = 0;
            while (i + cnt < nums.length && nums[i + cnt] == nums[i]) cnt++;
            int size = res.size();
            for (int k = 0; k < cnt; k++) {
                for (int j = 0; j < size; j++) {
                    List<Integer> ns = new ArrayList<>(res.get(j));
                    for (int t = 0; t <= k; t++) ns.add(nums[i]);
                    res.add(ns);
                }
            }
            i += cnt;
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        from collections import Counter
        cnt = Counter(nums)
        res = [[]]
        for v, c in cnt.items():
            size = len(res)
            for _ in range(c):
                for comb in res[:size]:
                    res.append(comb + [v])
        return res
```

```go [Go]
func subsetsWithDup(nums []int) [][]int {
    sort.Ints(nums)
    res := [][]int{{}}
    i := 0
    for i < len(nums) {
        cnt := 0
        for i+cnt < len(nums) && nums[i+cnt] == nums[i] { cnt++ }
        size := len(res)
        for k := 0; k < cnt; k++ {
            for j := 0; j < size; j++ {
                ns := make([]int, len(res[j])+k+1)
                copy(ns, res[j])
                for t := 0; t <= k; t++ { ns[len(res[j])+t] = nums[i] }
                res = append(res, ns)
            }
        }
        i += cnt
    }
    return res
}
```

```c [C]
int** subsetsWithDup(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    // 计数 + 迭代扩展核心结构同上，完整实现略
    *returnSize = 0; return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res = {{}};
        int i = 0;
        while (i < nums.size()) {
            int cnt = 0;
            while (i + cnt < nums.size() && nums[i + cnt] == nums[i]) cnt++;
            int size = res.size();
            for (int k = 0; k < cnt; k++) {
                for (int j = 0; j < size; j++) {
                    vector<int> ns = res[j];
                    for (int t = 0; t <= k; t++) ns.push_back(nums[i]);
                    res.push_back(ns);
                }
            }
            i += cnt;
        }
        return res;
    }
};
```

```javascript [JavaScript]
var subsetsWithDup = function(nums) {
    nums.sort((a, b) => a - b);
    let res = [[]];
    let i = 0;
    while (i < nums.length) {
        let cnt = 0;
        while (i + cnt < nums.length && nums[i + cnt] === nums[i]) cnt++;
        const size = res.length;
        for (let k = 0; k < cnt; k++) {
            for (let j = 0; j < size; j++) {
                res.push([...res[j], nums[i]]);
            }
        }
        i += cnt;
    }
    return res;
};
```

```typescript [TypeScript]
function subsetsWithDup(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    let res: number[][] = [[]];
    let i = 0;
    while (i < nums.length) {
        let cnt = 0;
        while (i + cnt < nums.length && nums[i + cnt] === nums[i]) cnt++;
        const size = res.length;
        for (let k = 0; k < cnt; k++) {
            for (let j = 0; j < size; j++) {
                res.push([...res[j], nums[i]]);
            }
        }
        i += cnt;
    }
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(2^n * n)`，子集数乘构造长度。
- **空间复杂度**：`O(2^n * n)`，结果存储。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 排序 + 回溯（同层去重） | `O(2^n * n)` | `O(n)` | 经典模板，推荐 |
| 计数 + 迭代扩展 | `O(2^n * n)` | `O(2^n * n)` | 思路直观，天然去重 |
