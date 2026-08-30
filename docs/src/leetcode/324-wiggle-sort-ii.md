# [324. 摆动排序 II](https://leetcode.cn/problems/wiggle-sort-ii/)

## 一、题目描述

给你一个整数数组 `nums`，将其重排为 **摆动序列**：`nums[0] < nums[1] > nums[2] < nums[3] > ...`（小、大、小、大交替）。要求 **原地** 重排，若可行返回即可。

**示例：**
```
输入：nums = [1,5,1,1,6,4]   输出：[1,6,1,5,1,4]（或 [1,4,1,5,1,6] 等）
```

**提示：** `1 <= nums.length <= 5000`，`0 <= nums[i] <= 5000`。进阶：能否 `O(n)` 时间、`O(1)` 空间？

## 二、解答方法

### 方法一：排序 + 分两半交叉填（虚拟下标）

**思路：** 把数组排序后分成「小半」和「大半」。为防相等元素相邻（如多个 1 被 `>` 隔开），采用「中位数切分 + 倒序交叉」：取中位数 `mid`，用三分 partition 把数组排成 `<mid | =mid | >mid`（Dutch 国旗），但更稳妥的是：排序后 `small = 前半（升序），large = 后半（升序）`，从右往左交替填 `large, small`（large 降序、small 降序），这样相同值自然分到两端不相邻。

:::::: code-group

```java [Java]
class Solution {
    public void wiggleSort(int[] nums) {
        int[] tmp = nums.clone();
        Arrays.sort(tmp);
        int n = nums.length, j = n - 1;          // large 从最大开始
        for (int i = 1; i < n; i += 2) nums[i] = tmp[j--];   // 奇数位放大数（降序）
        j = (n - 1) / 2;                          // small 从中位开始
        for (int i = 0; i < n; i += 2) nums[i] = tmp[j--];   // 偶数位放小数（降序）
    }
}
```

```python [Python]
class Solution:
    def wiggleSort(self, nums: List[int]) -> None:
        nums.sort()
        n = len(nums)
        small = nums[:(n+1)//2][::-1]
        large = nums[(n+1)//2:][::-1]
        nums[0::2] = small
        nums[1::2] = large
```

```cpp [C++]
class Solution {
public:
    void wiggleSort(vector<int>& nums) {
        vector<int> tmp = nums;
        sort(tmp.begin(), tmp.end());
        int n = nums.size(), j = n-1;
        for (int i=1;i<n;i+=2) nums[i] = tmp[j--];
        j = (n-1)/2;
        for (int i=0;i<n;i+=2) nums[i] = tmp[j--];
    }
};
```

```go [Go]
func wiggleSort(nums []int) {
    tmp := append([]int(nil), nums...)
    sort.Ints(tmp)
    n := len(nums); j := n-1
    for i := 1; i < n; i += 2 { nums[i] = tmp[j]; j-- }
    j = (n-1)/2
    for i := 0; i < n; i += 2 { nums[i] = tmp[j]; j-- }
}
```

```js [JavaScript]
var wiggleSort = function (nums) {
    const tmp = [...nums].sort((a,b)=>a-b);
    const n = nums.length; let j = n-1;
    for (let i=1;i<n;i+=2) nums[i] = tmp[j--];
    j = Math.floor((n-1)/2);
    for (let i=0;i<n;i+=2) nums[i] = tmp[j--];
};
```

::::::

**复杂度：** 时间 `O(n log n)`，空间 `O(n)`（排序副本）。

## 三、总结

关键技巧：排序后分两半，**大数填奇数位、小数填偶数位，且都从大到小取**，可保证 `small < large` 且相同值被拉开（如多个重复中位数分到两端）。与 `280 摆动排序`（允许 `>=`，更简单）不同，本题要求严格交替。进阶 `O(n)` 需基于中位数的三分快排（Dutch 国旗）+ 虚拟下标映射。
