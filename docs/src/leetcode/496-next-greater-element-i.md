# [496. 下一个更大元素 I](https://leetcode.cn/problems/next-greater-element-i/)

## 一、题目描述

给定两个没有重复元素的数组 `nums1` 和 `nums2`，其中 `nums1` 是 `nums2` 的子集。对 `nums1` 中每个元素，在 `nums2` 中找它**右侧第一个比它大**的元素；不存在则返回 -1。返回与 `nums1` 等长的结果数组。

**示例 1：**

```
输入：nums1 = [4,1,2], nums2 = [1,3,4,2]
输出：[-1,3,-1]
解释：4 右侧无更大；1 右侧 3；2 右侧无更大。
```

**示例 2：**

```
输入：nums1 = [2,4], nums2 = [1,2,3,4]
输出：[3,-1]
```

**提示：**

- `1 <= nums1.length <= nums2.length <= 1000`
- `0 <= nums1[i], nums2[i] <= 10^4`
- 所有整数互不相同

## 二、解答方法

### 2.1 方法一：单调栈 + 哈希

1. 思路

先对 `nums2` 用单调递减栈求「每个元素右侧第一个更大元素」，存哈希表 `nxt`。再按 `nums1` 查表输出。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        Map<Integer, Integer> nxt = new HashMap<>();
        Deque<Integer> st = new ArrayDeque<>();
        for (int x : nums2) {
            while (!st.isEmpty() && st.peek() < x) nxt.put(st.pop(), x);
            st.push(x);
        }
        int[] res = new int[nums1.length];
        for (int i = 0; i < nums1.length; i++) res[i] = nxt.getOrDefault(nums1[i], -1);
        return res;
    }
}
```

```python [Python]
class Solution:
    def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:
        nxt = {}
        st = []
        for x in nums2:
            while st and st[-1] < x:
                nxt[st.pop()] = x
            st.append(x)
        return [nxt.get(x, -1) for x in nums1]
```

```cpp [C++]
class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> nxt;
        stack<int> st;
        for (int x : nums2) {
            while (!st.empty() && st.top() < x) { nxt[st.top()] = x; st.pop(); }
            st.push(x);
        }
        vector<int> res;
        for (int x : nums1) res.push_back(nxt.count(x) ? nxt[x] : -1);
        return res;
    }
};
```

```go [Go]
func nextGreaterElement(nums1 []int, nums2 []int) []int {
	nxt := map[int]int{}
	st := []int{}
	for _, x := range nums2 {
		for len(st) > 0 && st[len(st)-1] < x {
			nxt[st[len(st)-1]] = x
			st = st[:len(st)-1]
		}
		st = append(st, x)
	}
	res := make([]int, len(nums1))
	for i, x := range nums1 {
		if v, ok := nxt[x]; ok {
			res[i] = v
		} else {
			res[i] = -1
		}
	}
	return res
}
```

```javascript [JavaScript]
var nextGreaterElement = function (nums1, nums2) {
    const nxt = {};
    const st = [];
    for (const x of nums2) {
        while (st.length && st[st.length - 1] < x) nxt[st.pop()] = x;
        st.push(x);
    }
    return nums1.map(x => (x in nxt ? nxt[x] : -1));
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n + m)$。
- 空间复杂度：$O(n)$。

## 三、总结

单调栈求「下一个更大元素」是经典模板。相关题目：503 下一个更大元素 II、739 每日温度、556 下一个更大元素 III。
