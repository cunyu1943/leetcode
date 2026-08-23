# [LCR 119. 最长连续序列](https://leetcode.cn/problems/WhsWhI/)



## 一、题目描述

给定一个未排序的整数数组 `nums` ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 `O(n)` 的算法解决此问题。



**示例 1：**

```
输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
```

**示例 2：**

```
输入：nums = [0,3,7,2,5,8,4,6,0,1]
输出：9
```

**提示：**

- `0 <= nums.length <= 10⁵`
- `-10⁹ <= nums[i] <= 10⁹`



## 二、解答方法

### 2.1 方法一：哈希集合

1. **思路**

把所有数放入哈希集合去重。对每个数 `x`，**只有当 `x-1` 不在集合中**（即它是连续段的起点）时才向后扩展：

- 从 `x` 开始，`while (set.contains(x+1))` 计数并前进；
- 更新最长长度。

每个数最多被访问两次（起点 + 扩展），整体 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int x : nums) set.add(x);
        int ans = 0;
        for (int x : set) {
            if (set.contains(x - 1)) continue; // 只从起点开始
            int len = 1;
            while (set.contains(x + len)) len++;
            ans = Math.max(ans, len);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        s = set(nums)
        ans = 0
        for x in s:
            if x - 1 in s:
                continue
            length = 1
            while x + length in s:
                length += 1
            ans = max(ans, length)
        return ans
```

```cpp [C++]
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> s(nums.begin(), nums.end());
        int ans = 0;
        for (int x : s) {
            if (s.count(x - 1)) continue;
            int len = 1;
            while (s.count(x + len)) len++;
            ans = max(ans, len);
        }
        return ans;
    }
};
```

```go [Go]
func longestConsecutive(nums []int) int {
    s := map[int]bool{}
    for _, x := range nums {
        s[x] = true
    }
    ans := 0
    for x := range s {
        if s[x-1] {
            continue
        }
        length := 1
        for s[x+length] {
            length++
        }
        if length > ans {
            ans = length
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
    const s = new Set(nums);
    let ans = 0;
    for (const x of s) {
        if (s.has(x - 1)) continue;
        let length = 1;
        while (s.has(x + length)) length++;
        ans = Math.max(ans, length);
    }
    return ans;
};
```

```c [C]
#include <stdlib.h>

#define HSIZE 200011

typedef struct { int key; int used; } HashSet;

static int hget(HashSet* hs, int key) {
    int h = ((unsigned)key * 31 + 1000000007) % HSIZE;
    while (hs[h].used && hs[h].key != key) h = (h + 1) % HSIZE;
    return h;
}

int longestConsecutive(int* nums, int numsSize) {
    HashSet* hs = (HashSet*)calloc(HSIZE, sizeof(HashSet));
    for (int i = 0; i < numsSize; i++) {
        int h = hget(hs, nums[i]);
        hs[h].key = nums[i];
        hs[h].used = 1;
    }
    int ans = 0;
    for (int i = 0; i < HSIZE; i++) {
        if (!hs[i].used) continue;
        int x = hs[i].key;
        int h = hget(hs, x - 1);
        if (hs[h].used && hs[h].key == x - 1) continue; // 非起点
        int len = 1;
        while (1) {
            int hn = hget(hs, x + len);
            if (!(hs[hn].used && hs[hn].key == x + len)) break;
            len++;
        }
        if (len > ans) ans = len;
    }
    free(hs);
    return ans;
}
```

```ts [TypeScript]
function longestConsecutive(nums: number[]): number {
    const s = new Set(nums);
    let ans = 0;
    for (const x of s) {
        if (s.has(x - 1)) continue;
        let length = 1;
        while (s.has(x + length)) length++;
        ans = Math.max(ans, length);
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个元素最多访问两次。
- **空间复杂度**：`O(n)`，哈希集合。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 哈希集合 | `O(n)` | `O(n)` | 标准解法 |

去重后只从「连续段起点」（无前驱的数）开始向右扩展，避免重复扫描，达到 `O(n)`。这是「最长连续序列」的经典 O(n) 解法。

