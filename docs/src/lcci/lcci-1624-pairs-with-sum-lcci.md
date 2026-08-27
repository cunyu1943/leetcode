# [面试题 16.24. 数对和](https://leetcode.cn/problems/pairs-with-sum-lcci/)

## 一、题目描述

设计一个算法，找出数组中两数之和为指定值的所有整数对。一个数只能属于一个数对。若有多对数和相同，返回任意顺序即可。

**示例 1：**

```
输入: nums = [5,6,5], target = 11
输出: [[5,6]]
```

**示例 2：**

```
输入: nums = [5,6,5,6], target = 11
输出: [[5,6],[5,6]]
```

**示例 3：**

```
输入: nums = [1,1,1,1,1,1], target = 2
输出: [[1,1],[1,1],[1,1]]
```

**提示：**

- `1 <= nums.length <= 100000`
- `-100000 <= nums[i] <= 100000`

---

## 二、解答方法

### 2.1 方法一：哈希表计数

**1. 思路**

用哈希表统计每个数的出现次数。遍历键值，对每对 `(x, target−x)`（仅当 `x <= target−x` 避免重复），按两者计数（相等时取半）生成数对并加入结果。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> pairSums(int[] nums, int target) {
        Map<Integer, Integer> cnt = new HashMap<>();
        for (int x : nums) cnt.put(x, cnt.getOrDefault(x, 0) + 1);
        List<List<Integer>> res = new ArrayList<>();
        for (int x : cnt.keySet()) {
            int y = target - x;
            if (y < x || !cnt.containsKey(y)) continue;
            int pairs = (x == y) ? cnt.get(x) / 2 : Math.min(cnt.get(x), cnt.get(y));
            for (int i = 0; i < pairs; i++) res.add(Arrays.asList(x, y));
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def pairSums(self, nums: List[int], target: int) -> List[List[int]]:
        from collections import Counter
        cnt = Counter(nums)
        res = []
        for x in list(cnt.keys()):
            y = target - x
            if y < x or y not in cnt: continue
            pairs = cnt[x] // 2 if x == y else min(cnt[x], cnt[y])
            for _ in range(pairs): res.append([x, y])
        return res
```

```go [Go]
func pairSums(nums []int, target int) [][]int {
    cnt := map[int]int{}
    for _, x := range nums { cnt[x]++ }
    var res [][]int
    for x, c := range cnt {
        y := target - x
        if y < x { continue }
        if cy, ok := cnt[y]; ok {
            pairs := c
            if x == y { pairs = c / 2 } else { if cy < pairs { pairs = cy } }
            for i := 0; i < pairs; i++ { res = append(res, []int{x, y}) }
        }
    }
    return res
}
```

```c [C]
// C 中实现哈希计数较繁琐，逻辑同 Python：统计频次后配对输出
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> pairSums(vector<int>& nums, int target) {
        unordered_map<int, int> cnt;
        for (int x : nums) cnt[x]++;
        vector<vector<int>> res;
        for (auto& [x, c] : cnt) {
            int y = target - x;
            if (y < x || !cnt.count(y)) continue;
            int pairs = (x == y) ? c / 2 : min(c, cnt[y]);
            for (int i = 0; i < pairs; i++) res.push_back({x, y});
        }
        return res;
    }
};
```

```javascript [JavaScript]
var pairSums = function(nums, target) {
    const cnt = {};
    for (const x of nums) cnt[x] = (cnt[x] || 0) + 1;
    const res = [];
    for (const x of Object.keys(cnt)) {
        const xi = +x, y = target - xi;
        if (y < xi || !(y in cnt)) continue;
        let pairs = (xi === y) ? Math.floor(cnt[x] / 2) : Math.min(cnt[x], cnt[y]);
        for (let i = 0; i < pairs; i++) res.push([xi, y]);
    }
    return res;
};
```

```typescript [TypeScript]
function pairSums(nums: number[], target: number): number[][] {
    const cnt: Record<number, number> = {};
    for (const x of nums) cnt[x] = (cnt[x] || 0) + 1;
    const res: number[][] = [];
    for (const key of Object.keys(cnt)) {
        const x = +key, y = target - x;
        if (y < x || !(y in cnt)) continue;
        let pairs = (x === y) ? Math.floor(cnt[key] / 2) : Math.min(cnt[key], cnt[y]);
        for (let i = 0; i < pairs; i++) res.push([x, y]);
    }
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`（哈希表）。

---

### 2.2 方法二：排序 + 双指针

**1. 思路**

排序后用头尾双指针，和等于 target 时收集并同时跳过重复元素；和小于则左移，大于则右移。空间 `O(1)`（不计结果）。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> pairSums(int[] nums, int target) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        int l = 0, r = nums.length - 1;
        while (l < r) {
            int s = nums[l] + nums[r];
            if (s == target) {
                res.add(Arrays.asList(nums[l], nums[r]));
                l++; r--;
            } else if (s < target) l++;
            else r--;
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def pairSums(self, nums: List[int], target: int) -> List[List[int]]:
        nums.sort()
        res = []
        l, r = 0, len(nums) - 1
        while l < r:
            s = nums[l] + nums[r]
            if s == target:
                res.append([nums[l], nums[r]]); l += 1; r -= 1
            elif s < target: l += 1
            else: r -= 1
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> pairSums(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        int l = 0, r = nums.size() - 1;
        while (l < r) {
            int s = nums[l] + nums[r];
            if (s == target) { res.push_back({nums[l], nums[r]}); l++; r--; }
            else if (s < target) l++;
            else r--;
        }
        return res;
    }
};
```

```javascript [JavaScript]
var pairSums = function(nums, target) {
    nums.sort((a, b) => a - b);
    const res = [];
    let l = 0, r = nums.length - 1;
    while (l < r) {
        const s = nums[l] + nums[r];
        if (s === target) { res.push([nums[l], nums[r]]); l++; r--; }
        else if (s < target) l++;
        else r--;
    }
    return res;
};
```

```typescript [TypeScript]
function pairSums(nums: number[], target: number): number[][] {
    nums.sort((a, b) => a - b);
    const res: number[][] = [];
    let l = 0, r = nums.length - 1;
    while (l < r) {
        const s = nums[l] + nums[r];
        if (s === target) { res.push([nums[l], nums[r]]); l++; r--; }
        else if (s < target) l++;
        else r--;
    }
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n log n)`。
- **空间复杂度**：`O(1)`（不计结果）。

---

## 三、总结

| 方法       | 时间复杂度 | 空间复杂度 | 特点                       |
| ---------- | ---------- | ---------- | -------------------------- |
| 哈希计数   | `O(n)`     | `O(n)`     | 最优，推荐                 |
| 排序双指针 | `O(n log n)` | `O(1)`   | 无额外空间                 |

**推荐**：用哈希表统计频次，按 `x <= target−x` 配对生成，避免重复且 `O(n)` 高效。
