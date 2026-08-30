# [350. 两个数组的交集 II](https://leetcode.cn/problems/intersection-of-two-arrays-ii/)

## 一、题目描述

给定两个整数数组 `nums1` 和 `nums2`，返回它们的 **交集 II**。结果中每个元素出现的次数应与它在两个数组中都出现的 **最小次数** 一致，顺序任意。

**示例：**
```
输入：nums1 = [1,2,2,1], nums2 = [2,2]   输出：[2,2]
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]  输出：[4,9]（或 [9,4]）
```

**提示：** `0 <= nums1.length, nums2.length <= 10⁵`，`-10⁹ <= nums[i] <= 10⁹`。进阶：若数组已排序？若一个远大于另一个？

## 二、解答方法

### 方法一：哈希计数（频次）

**思路：** 统计 `nums1` 各元素频次。遍历 `nums2`，若元素频次 > 0，则加入结果并频次 -1。`nums1` 频次用 `HashMap` 或数组（值范围小且非负时）。

:::::: code-group

```java [Java]
class Solution {
    public int[] intersect(int[] nums1, int[] nums2) {
        Map<Integer, Integer> cnt = new HashMap<>();
        for (int x : nums1) cnt.put(x, cnt.getOrDefault(x, 0) + 1);
        List<Integer> res = new ArrayList<>();
        for (int x : nums2) {
            if (cnt.getOrDefault(x, 0) > 0) { res.add(x); cnt.put(x, cnt.get(x) - 1); }
        }
        return res.stream().mapToInt(Integer::intValue).toArray();
    }
}
```

```python [Python]
class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        from collections import Counter
        c = Counter(nums1); res = []
        for x in nums2:
            if c[x] > 0: res.append(x); c[x] -= 1
        return res
```

```cpp [C++]
class Solution {
public:
    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int,int> cnt;
        for (int x : nums1) cnt[x]++;
        vector<int> res;
        for (int x : nums2) if (cnt[x] > 0) { res.push_back(x); cnt[x]--; }
        return res;
    }
};
```

```go [Go]
func intersect(nums1, nums2 []int) []int {
    cnt := map[int]int{}
    for _, x := range nums1 { cnt[x]++ }
    res := []int{}
    for _, x := range nums2 { if cnt[x] > 0 { res = append(res, x); cnt[x]-- } }
    return res
}
```

```js [JavaScript]
var intersect = function (nums1, nums2) {
    const cnt = new Map();
    for (const x of nums1) cnt.set(x, (cnt.get(x) || 0) + 1);
    const res = [];
    for (const x of nums2) { if (cnt.get(x) > 0) { res.push(x); cnt.set(x, cnt.get(x)-1); } }
    return res;
};
```

::::::

### 方法二：排序 + 双指针（进阶，O(1) 额外空间）

**思路：** 两数组排序后，双指针 `i,j` 比较：`nums1[i]==nums2[j]` 加入并双移；否则小的一端右移。

:::::: code-group

```java [Java]
class Solution {
    public int[] intersect(int[] nums1, int[] nums2) {
        Arrays.sort(nums1); Arrays.sort(nums2);
        int i=0,j=0,k=0;
        int[] res = new int[Math.min(nums1.length, nums2.length)];
        while (i<nums1.length && j<nums2.length) {
            if (nums1[i]==nums2[j]) { res[k++]=nums1[i]; i++; j++; }
            else if (nums1[i]<nums2[j]) i++; else j++;
        }
        return Arrays.copyOf(res, k);
    }
}
```

```python [Python]
class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        nums1.sort(); nums2.sort()
        i=j=0; res=[]
        while i<len(nums1) and j<len(nums2):
            if nums1[i]==nums2[j]: res.append(nums1[i]); i+=1; j+=1
            elif nums1[i]<nums2[j]: i+=1
            else: j+=1
        return res
```

```cpp [C++]
class Solution {
public:
    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {
        sort(nums1.begin(),nums1.end()); sort(nums2.begin(),nums2.end());
        int i=0,j=0; vector<int> res;
        while(i<nums1.size()&&j<nums2.size()){
            if(nums1[i]==nums2[j]){res.push_back(nums1[i]);i++;j++;}
            else if(nums1[i]<nums2[j]) i++; else j++;
        }
        return res;
    }
};
```

```go [Go]
func intersect(nums1, nums2 []int) []int {
    sort.Ints(nums1); sort.Ints(nums2)
    i, j := 0, 0; res := []int{}
    for i < len(nums1) && j < len(nums2) {
        if nums1[i] == nums2[j] { res = append(res, nums1[i]); i++; j++ }
        else if nums1[i] < nums2[j] { i++ } else { j++ }
    }
    return res
}
```

```js [JavaScript]
var intersect = function (nums1, nums2) {
    nums1.sort((a,b)=>a-b); nums2.sort((a,b)=>a-b);
    let i=0,j=0; const res=[];
    while(i<nums1.length&&j<nums2.length){
        if(nums1[i]===nums2[j]){res.push(nums1[i]);i++;j++;}
        else if(nums1[i]<nums2[j]) i++; else j++;
    }
    return res;
};
```

::::::

**复杂度：** 方法一 `O(n+m)`，方法二 `O(n log n + m log m)` 空间 `O(1)`（输出除外）。

## 三、总结

交集 II 关键是「带频次」——结果元素出现次数 = 两数组中的较小频次。哈希法直观；排序双指针法省空间（进阶要求）。若一数组远小于另一数组，把小的建哈希、遍历大的最优。对比 `349`（去重交集）本题保留频次。若数组已排序且需流式，双指针更合适。
