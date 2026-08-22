# [55. 跳跃游戏](https://leetcode.cn/problems/jump-game/)



## 一、题目描述

给你一个非负整数数组 `nums`，你最初位于数组的 **第一个下标**。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标，如果可以，返回 `true`；否则，返回 `false`。



**示例 1：**

```
输入：nums = [2,3,1,1,4]
输出：true
解释：可以先跳 1 步（到达下标 1），再跳 3 步到达最后一个下标。
```

**示例 2：**

```
输入：nums = [3,2,1,0,4]
输出：false
解释：无论怎样都会到达下标 3，但该位置最大跳跃长度为 0，无法到达末尾。
```

**提示：**

-   `1 <= nums.length <= 10^4`
-   `0 <= nums[i] <= 10^5`



## 二、解答方法

### 2.1 方法一：贪心（维护最远可达位置）


1. **思路**

从左到右遍历，用 `maxReach` 记录当前能到达的最远下标。若遍历过程中 `i > maxReach` 说明到达不了 `i`，返回 `false`；否则不断更新 `maxReach = max(maxReach, i + nums[i])`，若其能覆盖末尾则成功。


2. **代码实现**

:::::: code-group
```java [Java]
class Solution {
    public boolean canJump(int[] nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > maxReach) return false;
            maxReach = Math.max(maxReach, i + nums[i]);
            if (maxReach >= nums.length - 1) return true;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        max_reach = 0
        for i, x in enumerate(nums):
            if i > max_reach:
                return False
            max_reach = max(max_reach, i + x)
            if max_reach >= len(nums) - 1:
                return True
        return True
```

```go [Go]
func canJump(nums []int) bool {
    maxReach := 0
    for i, x := range nums {
        if i > maxReach {
            return false
        }
        if i+x > maxReach {
            maxReach = i + x
        }
        if maxReach >= len(nums)-1 {
            return true
        }
    }
    return true
}
```

```c [C]
bool canJump(int* nums, int numsSize) {
    int maxReach = 0;
    for (int i = 0; i < numsSize; i++) {
        if (i > maxReach) return false;
        if (i + nums[i] > maxReach) maxReach = i + nums[i];
        if (maxReach >= numsSize - 1) return true;
    }
    return true;
}
```

```cpp [C++]
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (i > maxReach) return false;
            maxReach = max(maxReach, i + nums[i]);
            if (maxReach >= nums.size() - 1) return true;
        }
        return true;
    }
};
```

```javascript [JavaScript]
var canJump = function(nums) {
    let maxReach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
        if (maxReach >= nums.length - 1) return true;
    }
    return true;
};
```

```typescript [TypeScript]
function canJump(nums: number[]): boolean {
    let maxReach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
        if (maxReach >= nums.length - 1) return true;
    }
    return true;
}
```

::::::
3. **复杂度分析**

- **时间复杂度**：`O(n)`**，只需遍历一次数组。
- **空间复杂度**：`O(1)`**，只用到常数变量。

### 2.2 方法二：反向贪心（从末尾向前）


1. **思路**

从最后一个下标开始，维护一个「目标位置」`last`，初始为末尾。从后往前遍历，若某位置 `i + nums[i] >= last`，说明从 `i` 能跳到目标，于是把目标更新为 `i`。遍历结束后，若目标位置回到下标 0，说明可达。


2. **代码实现**

:::::: code-group
```java [Java]
class Solution {
    public boolean canJump(int[] nums) {
        int last = nums.length - 1;
        for (int i = nums.length - 2; i >= 0; i--) {
            if (i + nums[i] >= last) last = i;
        }
        return last == 0;
    }
}
```

```python [Python]
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        last = len(nums) - 1
        for i in range(len(nums) - 2, -1, -1):
            if i + nums[i] >= last:
                last = i
        return last == 0
```

```go [Go]
func canJump(nums []int) bool {
    last := len(nums) - 1
    for i := len(nums) - 2; i >= 0; i-- {
        if i+nums[i] >= last {
            last = i
        }
    }
    return last == 0
}
```

```c [C]
bool canJump(int* nums, int numsSize) {
    int last = numsSize - 1;
    for (int i = numsSize - 2; i >= 0; i--) {
        if (i + nums[i] >= last) last = i;
    }
    return last == 0;
}
```

```cpp [C++]
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int last = nums.size() - 1;
        for (int i = nums.size() - 2; i >= 0; i--) {
            if (i + nums[i] >= last) last = i;
        }
        return last == 0;
    }
};
```

```javascript [JavaScript]
var canJump = function(nums) {
    let last = nums.length - 1;
    for (let i = nums.length - 2; i >= 0; i--) {
        if (i + nums[i] >= last) last = i;
    }
    return last === 0;
};
```

```typescript [TypeScript]
function canJump(nums: number[]): boolean {
    let last = nums.length - 1;
    for (let i = nums.length - 2; i >= 0; i--) {
        if (i + nums[i] >= last) last = i;
    }
    return last === 0;
}
```

::::::
3. **复杂度分析**

- **时间复杂度**：`O(n)`**，一次反向遍历。
- **空间复杂度**：`O(1)`**，只用到常数变量。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 贪心（正向最远可达） | `O(n)` | `O(1)` | 直观高效，面试首选 |
| 反向贪心（目标回退） | `O(n)` | `O(1)` | 思路巧妙，更易证明 |
