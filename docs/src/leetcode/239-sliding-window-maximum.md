# [239. 滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/)



## 一、题目描述

给你一个整数数组 `nums`，有一个大小为 `k` 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 `k` 个数字。滑动窗口每次只向右移动一位。

返回 **滑动窗口中的最大值** 。

**示例 1：**

```
输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
解释：
滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

**示例 2：**

```
输入：nums = [1], k = 1
输出：[1]
```

**提示：**

-   `1 <= nums.length <= 10⁵`
-   `-10⁴ <= nums[i] <= 10⁴`
-   `1 <= k <= nums.length`

**进阶：** 你能在线性时间复杂度内解决此题吗？



## 二、解答方法

### 2.1 方法一：单调队列（最优 O(n)）

1. **思路**

维护一个 **单调递减的双端队列**，队首始终是当前窗口的最大值。队列中存 **下标**（便于判断元素是否已滑出窗口）。

遍历每个元素 `nums[i]`：

1. **队尾出队**：当队尾元素 `< nums[i]` 时，弹出队尾（因为它永远不可能成为后续窗口的最大值）；
2. **入队**：把下标 `i` 加入队尾；
3. **移除过期元素**：若队首下标 `<= i - k`，说明已滑出窗口，弹出队首；
4. 当 `i >= k - 1` 时，队首对应的值即当前窗口最大值，加入结果。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] res = new int[n - k + 1];
        Deque<Integer> deque = new ArrayDeque<>();   // 存下标，保持对应值单调递减
        for (int i = 0; i < n; i++) {
            // 1. 队尾元素小于当前值，弹出
            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }
            deque.offerLast(i);
            // 2. 移除滑出窗口的队首
            if (deque.peekFirst() <= i - k) {
                deque.pollFirst();
            }
            // 3. 记录当前窗口最大值
            if (i >= k - 1) {
                res[i - k + 1] = nums[deque.peekFirst()];
            }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        from collections import deque
        q = deque()          # 存下标，对应值单调递减
        res = []
        for i, num in enumerate(nums):
            while q and nums[q[-1]] < num:
                q.pop()
            q.append(i)
            if q[0] <= i - k:
                q.popleft()
            if i >= k - 1:
                res.append(nums[q[0]])
        return res
```

```go [Go]
func maxSlidingWindow(nums []int, k int) []int {
    deque := []int{}        // 存下标
    res := []int{}
    for i, num := range nums {
        for len(deque) > 0 && nums[deque[len(deque)-1]] < num {
            deque = deque[:len(deque)-1]
        }
        deque = append(deque, i)
        if deque[0] <= i-k {
            deque = deque[1:]
        }
        if i >= k-1 {
            res = append(res, nums[deque[0]])
        }
    }
    return res
}
```

```cpp [C++]
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> dq;       // 存下标
        vector<int> res;
        for (int i = 0; i < nums.size(); i++) {
            while (!dq.empty() && nums[dq.back()] < nums[i]) {
                dq.pop_back();
            }
            dq.push_back(i);
            if (dq.front() <= i - k) {
                dq.pop_front();
            }
            if (i >= k - 1) {
                res.push_back(nums[dq.front()]);
            }
        }
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    const deque = [];        // 存下标，对应值单调递减
    const res = [];
    for (let i = 0; i < nums.length; i++) {
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        deque.push(i);
        if (deque[0] <= i - k) {
            deque.shift();
        }
        if (i >= k - 1) {
            res.push(nums[deque[0]]);
        }
    }
    return res;
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function maxSlidingWindow(nums: number[], k: number): number[] {
    const deque: number[] = [];
    const res: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        deque.push(i);
        if (deque[0] <= i - k) {
            deque.shift();
        }
        if (i >= k - 1) {
            res.push(nums[deque[0]]);
        }
    }
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`（每个元素最多入队出队各一次）。
- **空间复杂度**：`O(k)`（队列最多存 k 个元素）。

### 2.2 方法二：优先队列（大顶堆，O(n log n)）

1. **思路**

用大顶堆存 `(值, 下标)`。每次把当前元素入堆，然后检查堆顶下标是否已滑出窗口（`<= i - k`），若是则弹出；堆顶即当前窗口最大值。

2. **代码实现（Python）**

```python
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        import heapq
        heap = []
        res = []
        for i, num in enumerate(nums):
            heapq.heappush(heap, (-num, i))          # Python 默认小顶堆，取负模拟大顶堆
            while heap[0][1] <= i - k:               # 弹出过期元素
                heapq.heappop(heap)
            if i >= k - 1:
                res.append(-heap[0][0])
        return res
```

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 时间 | 特点 |
| ---- | ---- | ---- |
| 单调队列 | `O(n)` | 最优，推荐 |
| 大顶堆 | `O(n log n)` | 思路简单 |

单调队列是本题精髓：**队列保持递减，队首即最大值**。入队时把「比自己小且在自己前面」的元素全部淘汰（它们永远不可能成为最大值），出队时判断下标是否过期。

两个易错点：
1. 队列中存 **下标** 而非值，否则无法判断是否滑出窗口；
2. 先入队再判断过期（或先判断过期再入队均可，但要保证 `q[0]` 始终有效）。

同类题：`155. 最小栈`（单调辅助栈）、`剑指 Offer 59 - I. 滑动窗口的最大值`。
