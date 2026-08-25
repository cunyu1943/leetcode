# [面试题 08.04. 幂集](https://leetcode.cn/problems/power-set-lcci/)

## 一、题目描述

幂集。编写一种方法，返回某集合的所有子集。集合中 **不包含重复的元素**。

说明：解集不能包含重复的子集。

**示例：**

```
输入：nums = [1,2,3]
输出：
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
（注：解集顺序可不定，但不能含重复子集）
```

---

## 二、解答方法

### 2.1 方法一：回溯（逐位抉择）

**1. 思路**

对集合中的每个元素，都有「选」与「不选」两种选择。从第一个元素开始递归，每到一个元素就分两条支路：包含它或不包含它，直到处理完所有元素，当前路径就是一个子集。这是最直观的「子集树」写法。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), res);
        return res;
    }
    private void backtrack(int[] nums, int i, List<Integer> path, List<List<Integer>> res) {
        if (i == nums.length) {
            res.add(new ArrayList<>(path));
            return;
        }
        // 不选 nums[i]
        backtrack(nums, i + 1, path, res);
        // 选 nums[i]
        path.add(nums[i]);
        backtrack(nums, i + 1, path, res);
        path.remove(path.size() - 1);
    }
}
```

```python [Python]
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res = []
        def backtrack(i, path):
            if i == len(nums):
                res.append(path[:])
                return
            backtrack(i + 1, path)          # 不选
            backtrack(i + 1, path + [nums[i]])  # 选
        backtrack(0, [])
        return res
```

```go [Go]
func subsets(nums []int) [][]int {
	var res [][]int
	var path []int
	var backtrack func(int)
	backtrack = func(i int) {
		if i == len(nums) {
			tmp := make([]int, len(path))
			copy(tmp, path)
			res = append(res, tmp)
			return
		}
		backtrack(i + 1)            // 不选
		path = append(path, nums[i])
		backtrack(i + 1)            // 选
		path = path[:len(path)-1]
	}
	backtrack(0)
	return res
}
```

```c [C]
// 返回二维数组，*returnSize 为子集个数，*returnColumnSizes 为每个子集长度
int** subsets(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    int total = 1 << numsSize;
    int** res = (int**)malloc(total * sizeof(int*));
    int* cols = (int*)malloc(total * sizeof(int));
    int idx = 0;
    for (int mask = 0; mask < total; mask++) {
        int cnt = 0;
        for (int k = 0; k < numsSize; k++) if (mask & (1 << k)) cnt++;
        int* sub = (int*)malloc(cnt * sizeof(int));
        int p = 0;
        for (int k = 0; k < numsSize; k++) if (mask & (1 << k)) sub[p++] = nums[k];
        res[idx] = sub;
        cols[idx] = cnt;
        idx++;
    }
    *returnSize = total;
    *returnColumnSizes = cols;
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> path;
        function<void(int)> backtrack = [&](int i) {
            if (i == nums.size()) {
                res.push_back(path);
                return;
            }
            backtrack(i + 1);
            path.push_back(nums[i]);
            backtrack(i + 1);
            path.pop_back();
        };
        backtrack(0);
        return res;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    const res = [];
    const backtrack = (i, path) => {
        if (i === nums.length) {
            res.push(path.slice());
            return;
        }
        backtrack(i + 1, path);              // 不选
        backtrack(i + 1, path.concat(nums[i])); // 选
    };
    backtrack(0, []);
    return res;
};
```

```typescript [TypeScript]
function subsets(nums: number[]): number[][] {
    const res: number[][] = [];
    const backtrack = (i: number, path: number[]): void => {
        if (i === nums.length) {
            res.push([...path]);
            return;
        }
        backtrack(i + 1, path);
        backtrack(i + 1, path.concat(nums[i]));
    };
    backtrack(0, []);
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n * 2^n)`，共 `2^n` 个子集，每个子集平均长度 `O(n)`。
- **空间复杂度**：`O(n)` 递归栈（不含结果存储）。

---

### 2.2 方法二：位运算（二进制枚举）

**1. 思路**

`n` 个元素的集合共有 `2^n` 个子集，恰好对应从 `0` 到 `2^n - 1` 的所有二进制数：第 `k` 位为 1 表示选第 `k` 个元素，为 0 表示不选。枚举所有掩码即可一次性生成全部子集，代码极简。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        int n = nums.length;
        for (int mask = 0; mask < (1 << n); mask++) {
            List<Integer> sub = new ArrayList<>();
            for (int k = 0; k < n; k++) {
                if ((mask & (1 << k)) != 0) sub.add(nums[k]);
            }
            res.add(sub);
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        res = []
        for mask in range(1 << n):
            sub = [nums[k] for k in range(n) if mask & (1 << k)]
            res.append(sub)
        return res
```

```go [Go]
func subsets(nums []int) [][]int {
	n := len(nums)
	res := make([][]int, 0, 1<<n)
	for mask := 0; mask < (1 << n); mask++ {
		sub := []int{}
		for k := 0; k < n; k++ {
			if mask&(1<<k) != 0 {
				sub = append(sub, nums[k])
			}
		}
		res = append(res, sub)
	}
	return res
}
```

```c [C]
int** subsets(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    int total = 1 << numsSize;
    int** res = (int**)malloc(total * sizeof(int*));
    int* cols = (int*)malloc(total * sizeof(int));
    int idx = 0;
    for (int mask = 0; mask < total; mask++) {
        int cnt = 0;
        for (int k = 0; k < numsSize; k++) if (mask & (1 << k)) cnt++;
        int* sub = (int*)malloc(cnt * sizeof(int));
        int p = 0;
        for (int k = 0; k < numsSize; k++) if (mask & (1 << k)) sub[p++] = nums[k];
        res[idx] = sub;
        cols[idx] = cnt;
        idx++;
    }
    *returnSize = total;
    *returnColumnSizes = cols;
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        int n = nums.size();
        for (int mask = 0; mask < (1 << n); mask++) {
            vector<int> sub;
            for (int k = 0; k < n; k++) {
                if (mask & (1 << k)) sub.push_back(nums[k]);
            }
            res.push_back(sub);
        }
        return res;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    const n = nums.length;
    const res = [];
    for (let mask = 0; mask < (1 << n); mask++) {
        const sub = [];
        for (let k = 0; k < n; k++) {
            if (mask & (1 << k)) sub.push(nums[k]);
        }
        res.push(sub);
    }
    return res;
};
```

```typescript [TypeScript]
function subsets(nums: number[]): number[][] {
    const n = nums.length;
    const res: number[][] = [];
    for (let mask = 0; mask < (1 << n); mask++) {
        const sub: number[] = [];
        for (let k = 0; k < n; k++) {
            if (mask & (1 << k)) sub.push(nums[k]);
        }
        res.push(sub);
    }
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n * 2^n)`。
- **空间复杂度**：`O(n)`，不含结果存储。

---

## 三、总结

| 方法     | 时间复杂度 | 空间复杂度 | 特点                             |
| -------- | ---------- | ---------- | -------------------------------- |
| 回溯     | `O(n*2^n)` | `O(n)`     | 思路直观，易扩展去重/排序，推荐   |
| 位运算   | `O(n*2^n)` | `O(n)`     | 代码最短，适合无重复元素子集     |

**推荐解法**：两种方法都可行。回溯法更能体现「选/不选」的决策结构，也方便扩展到有重复元素（先排序 + 剪枝）；位运算写法最简洁，本题「无重复」前提下是首选。注意结果要包含空集 `[]`，且共 `2^n` 个子集。
