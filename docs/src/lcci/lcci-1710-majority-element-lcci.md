# [面试题 17.10. 主要元素](https://leetcode.cn/problems/find-majority-element-lcci/)

## 一、题目描述

数组中占比超过一半的元素称之为主要元素。给定一个整数数组，找到它的主要元素。若没有，返回 `-1`。

**示例 1：**

```
输入：[1,2,5,9,5,9,5,5,5]
输出：5
```

**示例 2：**

```
输入：[3,1,2,3,1,2,3]
输出：-1（无主要元素）
```

---

## 二、解答方法

### 2.1 方法一：摩尔投票法（Boyer-Moore）

**1. 思路**

摩尔投票法：维护候选 `candidate` 和计数 `count`。遍历数组，若 `count == 0` 则选当前元素为候选；若当前元素等于候选则 `count++`，否则 `count--`。遍历结束后若存在主要元素必为 `candidate`，最后再验证其出现次数是否超过一半。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int majorityElement(int[] nums) {
        int candidate = 0, count = 0;
        for (int x : nums) {
            if (count == 0) candidate = x;
            count += (x == candidate) ? 1 : -1;
        }
        int cnt = 0;
        for (int x : nums) if (x == candidate) cnt++;
        return cnt > nums.length / 2 ? candidate : -1;
    }
}
```

```python [Python]
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        candidate = cnt = 0
        for x in nums:
            if cnt == 0:
                candidate = x
            cnt += 1 if x == candidate else -1
        return candidate if nums.count(candidate) > len(nums) // 2 else -1
```

```go [Go]
func majorityElement(nums []int) int {
    candidate, count := 0, 0
    for _, x := range nums {
        if count == 0 { candidate = x }
        if x == candidate { count++ } else { count-- }
    }
    cnt := 0
    for _, x := range nums {
        if x == candidate { cnt++ }
    }
    if cnt > len(nums)/2 { return candidate }
    return -1
}
```

```c [C]
int majorityElement(int* nums, int numsSize) {
    int candidate = 0, count = 0;
    for (int i = 0; i < numsSize; i++) {
        if (count == 0) candidate = nums[i];
        if (nums[i] == candidate) count++; else count--;
    }
    int cnt = 0;
    for (int i = 0; i < numsSize; i++) if (nums[i] == candidate) cnt++;
    return cnt > numsSize / 2 ? candidate : -1;
}
```

```cpp [C++]
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int candidate = 0, count = 0;
        for (int x : nums) {
            if (count == 0) candidate = x;
            count += (x == candidate) ? 1 : -1;
        }
        int cnt = 0;
        for (int x : nums) if (x == candidate) cnt++;
        return cnt > nums.size() / 2 ? candidate : -1;
    }
};
```

```javascript [JavaScript]
var majorityElement = function(nums) {
    let candidate = 0, count = 0;
    for (const x of nums) {
        if (count === 0) candidate = x;
        count += (x === candidate) ? 1 : -1;
    }
    let cnt = 0;
    for (const x of nums) if (x === candidate) cnt++;
    return cnt > nums.length / 2 ? candidate : -1;
};
```

```typescript [TypeScript]
function majorityElement(nums: number[]): number {
    let candidate = 0, count = 0;
    for (const x of nums) {
        if (count === 0) candidate = x;
        count += (x === candidate) ? 1 : -1;
    }
    let cnt = 0;
    for (const x of nums) if (x === candidate) cnt++;
    return cnt > nums.length / 2 ? candidate : -1;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：哈希计数

**1. 思路**

用哈希表统计每个元素出现次数，超过 `n/2` 即返回，否则 `-1`。实现最简单。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int majorityElement(int[] nums) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int x : nums) {
            map.put(x, map.getOrDefault(x, 0) + 1);
            if (map.get(x) > nums.length / 2) return x;
        }
        return -1;
    }
}
```

```python [Python]
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        from collections import Counter
        cnt = Counter(nums)
        for k, v in cnt.items():
            if v > len(nums) // 2:
                return k
        return -1
```

```cpp [C++]
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) {
            if (++mp[x] > nums.size() / 2) return x;
        }
        return -1;
    }
};
```

```javascript [JavaScript]
var majorityElement = function(nums) {
    const mp = new Map();
    for (const x of nums) {
        mp.set(x, (mp.get(x) || 0) + 1);
        if (mp.get(x) > nums.length / 2) return x;
    }
    return -1;
};
```

```typescript [TypeScript]
function majorityElement(nums: number[]): number {
    const mp = new Map<number, number>();
    for (const x of nums) {
        mp.set(x, (mp.get(x) || 0) + 1);
        if (mp.get(x)! > nums.length / 2) return x;
    }
    return -1;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

---

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度 | 特点                       |
| -------------- | ---------- | ---------- | -------------------------- |
| 摩尔投票法     | `O(n)`     | `O(1)`     | 最优，推荐                 |
| 哈希计数       | `O(n)`     | `O(n)`     | 简单，需额外空间           |

**推荐**：使用摩尔投票法，空间 `O(1)`，但记得最后必须验证候选的真实频次是否过半。
