# [349. 两个数组的交集](https://leetcode.cn/problems/intersection-of-two-arrays/)

## 一、题目描述

给定两个整数数组 `nums1` 和 `nums2`，返回它们的 **交集**。结果中每个元素唯一（去重），顺序不限。

**示例：**
```
输入：nums1 = [1,2,2,1], nums2 = [2,2]   输出：[2]
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]  输出：[9,4]
```

**提示：** `0 <= nums1.length, nums2.length <= 1000`，`-10⁹ <= nums[i] <= 10⁹`。

## 二、解答方法

### 方法一：哈希集合

**思路：** 把 `nums1` 放入 `Set`，遍历 `nums2`，若元素在 Set 中则加入结果集（再去重一次）。或两集合求交。

:::::: code-group

```java [Java]
class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> set = new HashSet<>(), res = new HashSet<>();
        for (int x : nums1) set.add(x);
        for (int x : nums2) if (set.contains(x)) res.add(x);
        return res.stream().mapToInt(Integer::intValue).toArray();
    }
}
```

```python [Python]
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        return list(set(nums1) & set(nums2))
```

```cpp [C++]
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> s(nums1.begin(), nums1.end()), res;
        for (int x : nums2) if (s.count(x)) res.insert(x);
        return vector<int>(res.begin(), res.end());
    }
};
```

```go [Go]
func intersection(nums1, nums2 []int) []int {
    s := map[int]bool{}; res := map[int]bool{}
    for _, x := range nums1 { s[x] = true }
    for _, x := range nums2 { if s[x] { res[x] = true } }
    out := []int{}
    for k := range res { out = append(out, k) }
    return out
}
```

```js [JavaScript]
var intersection = function (nums1, nums2) {
    const s = new Set(nums1), res = new Set();
    for (const x of nums2) if (s.has(x)) res.add(x);
    return [...res];
};
```

::::::

**复杂度：** 时间 `O(n+m)`，空间 `O(min(n,m))`。

## 三、总结

用 Set 去重 + 判交最简单。若两数组已排序可用「双指针」（`O(n+m)` 不额外空间）。对比 `350 两个数组的交集 II`：本题只要去重元素，那题要求「出现次数按较少的」（带频次）。注意结果要去重。
