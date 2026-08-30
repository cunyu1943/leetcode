# [457. 环形数组循环](https://leetcode.cn/problems/circular-array-loop/)

## 一、题目描述

给定下标 `0` 到 `n-1` 的数组 `nums`，每个元素代表从该位置向前（正）或向后（负）移动的步数。形成一个循环需满足：

- 从某下标 `i` 出发，按规则无限走，能回到 `i`（形成环）；
- 环的长度 $> 1$；
- 环内所有移动**方向一致**（全正或全负）。

判断数组中是否存在这样的循环。

**示例 1：**

```
输入：nums = [2,-1,1,2,2]
输出：true
解释：从 0 出发 0->2->3->0，环长 3 且方向一致。
```

**示例 2：**

```
输入：nums = [-1,2]
输出：false
```

**提示：**

- `1 <= nums.length <= 5000`
- `-1000 <= nums[i] <= 1000`
- `nums[i] != 0`

## 二、解答方法

### 2.1 方法一：快慢指针（Floyd 判环）

1. 思路

把每个位置视为图节点，边为「按规则移动一步」。对每个起点用快慢指针找环；找到环后检查：环长 > 1（慢指针下一步不是自己）且整圈方向一致（环内所有节点移动方向相同）。用 `visited` 数组避免重复访问已确定无环的起点。

2. 代码实现（Python，快慢指针 + 方向检查）

:::::: code-group

```python [Python]
class Solution:
    def circularArrayLoop(self, nums: List[int]) -> bool:
        n = len(nums)
        def next_idx(i):
            return (i + nums[i]) % n
        for i in range(n):
            if nums[i] == 0:
                continue
            slow, fast = i, next_idx(i)
            while nums[slow] * nums[fast] > 0 and nums[slow] * nums[next_idx(fast)] > 0:
                if slow == fast:
                    if slow == next_idx(slow):
                        break  # 自环（长度1），不合法
                    return True
                slow = next_idx(slow)
                fast = next_idx(next_idx(fast))
        return False
```

```java [Java]
class Solution {
    public boolean circularArrayLoop(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            if (nums[i] == 0) continue;
            int slow = i, fast = nextIdx(i, nums);
            while (nums[slow] * nums[fast] > 0 && nums[slow] * nums[nextIdx(fast, nums)] > 0) {
                if (slow == fast) {
                    if (slow == nextIdx(slow, nums)) break;
                    return true;
                }
                slow = nextIdx(slow, nums);
                fast = nextIdx(nextIdx(fast, nums), nums);
            }
        }
        return false;
    }
    int nextIdx(int i, int[] nums) {
        int n = nums.length;
        return ((i + nums[i]) % n + n) % n;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(1)$。

## 三、总结

环形结构检测用快慢指针（Floyd），方向一致性用符号乘积判定。相关题目：142 环形链表 II、287 寻找重复数、202 快乐数。
