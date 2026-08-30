# [454. 四数相加 II](https://leetcode.cn/problems/4sum-ii/)

## 一、题目描述

给定四个长度为 `n` 的整数数组 `nums1, nums2, nums3, nums4`，计算满足 `nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0` 的**四元组** `(i, j, k, l)` 的个数。

**示例 1：**

```
输入：nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
输出：2
解释：(1,-2,-1,2) 和 (2,-1,-2,1)。
```

**示例 2：**

```
输入：nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
输出：1
```

**提示：**

- `n == nums1.length == nums2.length == nums3.length == nums4.length`
- `1 <= n <= 200`
- `-2^28 <= nums[i][j] <= 2^28`

## 二、解答方法

### 2.1 方法一：分组 + 哈希计数

1. 思路

把四数之和拆成两组：统计 `A = nums1[i] + nums2[j]` 的所有和及其出现次数存哈希表；再枚举 `nums3[k] + nums4[l]` 的和 `s`，看 `-s` 在 A 中出现了多少次，累加即可。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int fourSumCount(int[] A, int[] B, int[] C, int[] D) {
        Map<Integer, Integer> ab = new HashMap<>();
        for (int a : A) for (int b : B) ab.merge(a + b, 1, Integer::sum);
        int ans = 0;
        for (int c : C) for (int d : D) ans += ab.getOrDefault(-(c + d), 0);
        return ans;
    }
}
```

```python [Python]
class Solution:
    def fourSumCount(self, A: List[int], B: List[int], C: List[int], D: List[int]) -> int:
        from collections import Counter
        ab = Counter(a + b for a in A for b in B)
        return sum(ab[-(c + d)] for c in C for d in D)
```

```cpp [C++]
class Solution {
public:
    int fourSumCount(vector<int>& A, vector<int>& B, vector<int>& C, vector<int>& D) {
        unordered_map<int, int> ab;
        for (int a : A) for (int b : B) ab[a + b]++;
        int ans = 0;
        for (int c : C) for (int d : D) ans += ab[-(c + d)];
        return ans;
    }
};
```

```go [Go]
func fourSumCount(A, B, C, D []int) int {
	ab := map[int]int{}
	for _, a := range A {
		for _, b := range B {
			ab[a+b]++
		}
	}
	ans := 0
	for _, c := range C {
		for _, d := range D {
			ans += ab[-(c + d)]
		}
	}
	return ans
}
```

```javascript [JavaScript]
var fourSumCount = function (A, B, C, D) {
    const ab = {};
    for (const a of A) for (const b of B) { const k = a + b; ab[k] = (ab[k] || 0) + 1; }
    let ans = 0;
    for (const c of C) for (const d of D) ans += ab[-(c + d)] || 0;
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n^2)$。
- 空间复杂度：$O(n^2)$。

## 三、总结

「拆半 + 哈希」把 $O(n^4)$ 降到 $O(n^2)$，是计数类求和的经典套路。相关题目：1 两数之和、18 四数之和、560 和为 K 的子数组、15 三数之和。
