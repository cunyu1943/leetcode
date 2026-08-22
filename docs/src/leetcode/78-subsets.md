# [78. 子集](https://leetcode.cn/problems/subsets/)



## 一、题目描述

给你一个整数数组 `nums`，数组中的元素 **互不相同**。返回该数组所有可能的子集（幂集）。

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

-   `1 <= nums.length <= 10`
-   `-10 <= nums[i] <= 10`
-   `nums` 中的所有元素 **互不相同**



## 二、解答方法

### 2.1 方法一：回溯（按位选择）


1. **思路**

每个元素有"选"或"不选"两种可能，递归遍历所有位置，每到一个新位置就把当前路径加入结果。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    List<List<Integer>> res = new ArrayList<>();
    List<Integer> path = new ArrayList<>();
    public List<List<Integer>> subsets(int[] nums) {
        backtrack(0, nums);
        return res;
    }
    private void backtrack(int i, int[] nums) {
        if (i == nums.length) { res.add(new ArrayList<>(path)); return; }
        path.add(nums[i]);
        backtrack(i + 1, nums);
        path.remove(path.size() - 1);
        backtrack(i + 1, nums);
    }
}
```

```python [Python]
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res, path = [], []
        def backtrack(i):
            if i == len(nums):
                res.append(path[:]); return
            path.append(nums[i]); backtrack(i + 1); path.pop()
            backtrack(i + 1)
        backtrack(0)
        return res
```

```go [Go]
func subsets(nums []int) [][]int {
    res := [][]int{}
    path := []int{}
    var backtrack func(int)
    backtrack = func(i int) {
        if i == len(nums) {
            tmp := make([]int, len(path)); copy(tmp, path); res = append(res, tmp); return
        }
        path = append(path, nums[i])
        backtrack(i + 1)
        path = path[:len(path)-1]
        backtrack(i + 1)
    }
    backtrack(0)
    return res
}
```

```c [C]
int** subsets(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    // 回溯按位选择核心结构同上，完整实现略
    *returnSize = 0; return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> path;
        function<void(int)> backtrack = [&](int i) {
            if (i == nums.size()) { res.push_back(path); return; }
            path.push_back(nums[i]); backtrack(i + 1); path.pop_back();
            backtrack(i + 1);
        };
        backtrack(0);
        return res;
    }
};
```

```javascript [JavaScript]
var subsets = function(nums) {
    const res = [], path = [];
    const backtrack = (i) => {
        if (i === nums.length) { res.push([...path]); return; }
        path.push(nums[i]); backtrack(i + 1); path.pop();
        backtrack(i + 1);
    };
    backtrack(0);
    return res;
};
```

```typescript [TypeScript]
function subsets(nums: number[]): number[][] {
    const res: number[][] = [], path: number[] = [];
    const backtrack = (i: number): void => {
        if (i === nums.length) { res.push([...path]); return; }
        path.push(nums[i]); backtrack(i + 1); path.pop();
        backtrack(i + 1);
    };
    backtrack(0);
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(2^n * n)`，共 `2^n` 个子集，每个构造 `O(n)`。
- **空间复杂度**：`O(n)`，递归栈与路径。

### 2.2 方法二：迭代构造（逐个扩展）


1. **思路**

从空集开始，每遇到一个新元素，就把已有的所有子集各加上该元素，形成新子集加入结果。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        res.add(new ArrayList<>());
        for (int num : nums) {
            int size = res.size();
            for (int i = 0; i < size; i++) {
                List<Integer> ns = new ArrayList<>(res.get(i));
                ns.add(num);
                res.add(ns);
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
        for num in nums:
            res += [x + [num] for x in res]
        return res
```

```go [Go]
func subsets(nums []int) [][]int {
    res := [][]int{{}}
    for _, num := range nums {
        size := len(res)
        for i := 0; i < size; i++ {
            ns := make([]int, len(res[i])+1)
            copy(ns, res[i])
            ns[len(res[i])] = num
            res = append(res, ns)
        }
    }
    return res
}
```

```c [C]
int** subsets(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    // 迭代构造核心结构同上，完整实现略
    *returnSize = 0; return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res(1);
        for (int num : nums) {
            int size = res.size();
            for (int i = 0; i < size; i++) {
                vector<int> ns = res[i];
                ns.push_back(num);
                res.push_back(ns);
            }
        }
        return res;
    }
};
```

```javascript [JavaScript]
var subsets = function(nums) {
    let res = [[]];
    for (const num of nums) {
        const size = res.length;
        for (let i = 0; i < size; i++) {
            res.push([...res[i], num]);
        }
    }
    return res;
};
```

```typescript [TypeScript]
function subsets(nums: number[]): number[][] {
    let res: number[][] = [[]];
    for (const num of nums) {
        const size = res.length;
        for (let i = 0; i < size; i++) {
            res.push([...res[i], num]);
        }
    }
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(2^n * n)`，共 `2^n` 个子集。
- **空间复杂度**：`O(2^n * n)`，结果存储（不计返回结果则为 `O(n)`）。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯（按位选择） | `O(2^n * n)` | `O(n)` | 递归直观，推荐 |
| 迭代构造 | `O(2^n * n)` | `O(2^n * n)` | 思路巧妙，无递归 |
