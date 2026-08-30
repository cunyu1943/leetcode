# [384. 打乱数组](https://leetcode.cn/problems/shuffle-an-array/)

## 一、题目描述

给定整数数组 `nums`，设计类 `Solution`：
- `Solution(int[] nums)`：用原数组初始化；
- `reset()`：恢复原数组并返回；
- `shuffle()`：返回数组的 **随机打乱** 结果（每个排列等概率，Fisher-Yates）。

**示例：**
```
输入：["Solution","shuffle","reset","shuffle"]
     [[[1,2,3]],[],[],[]]
输出：[[],[3,1,2],[1,2,3],[1,3,2]]（随机结果可能不同）
```

**提示：** `1 <= nums.length <= 200`，`-10⁶ <= nums[i] <= 10⁶`，`shuffle` 最多 `10⁴` 次。

## 二、解答方法

### 方法一：Fisher-Yates 洗牌

**思路：** 保存原始数组副本（用于 `reset`）。`shuffle` 时复制一份，从后往前遍历，每次随机选 `[0, i]` 的一个位置 `j` 与 `i` 交换。该算法保证每个排列等概率（逆均匀）。`reset` 返回原副本。

:::::: code-group

```java [Java]
class Solution {
    private int[] original;
    private Random rnd = new Random();
    public Solution(int[] nums) { original = nums.clone(); }
    public int[] reset() { return original.clone(); }
    public int[] shuffle() {
        int[] a = original.clone();
        for (int i = a.length - 1; i > 0; i--) {
            int j = rnd.nextInt(i + 1);
            int t = a[i]; a[i] = a[j]; a[j] = t;
        }
        return a;
    }
}
```

```python [Python]
class Solution:
    def __init__(self, nums: List[int]):
        self.original = nums[:]
    def reset(self) -> List[int]:
        return self.original[:]
    def shuffle(self) -> List[int]:
        import random
        a = self.original[:]
        for i in range(len(a)-1, 0, -1):
            j = random.randint(0, i)
            a[i], a[j] = a[j], a[i]
        return a
```

```cpp [C++]
class Solution {
    vector<int> original;
public:
    Solution(vector<int>& nums): original(nums) {}
    vector<int> reset() { return original; }
    vector<int> shuffle() {
        vector<int> a = original;
        for(int i=a.size()-1;i>0;i--){ int j=rand()%(i+1); swap(a[i],a[j]); }
        return a;
    }
};
```

```go [Go]
type Solution struct { original []int }
func Constructor(nums []int) Solution { cp := make([]int, len(nums)); copy(cp, nums); return Solution{original: cp} }
func (s *Solution) Reset() []int { cp := make([]int, len(s.original)); copy(cp, s.original); return cp }
func (s *Solution) Shuffle() []int {
    a := make([]int, len(s.original)); copy(a, s.original)
    for i := len(a)-1; i > 0; i-- { j := rand.Intn(i+1); a[i], a[j] = a[j], a[i] }
    return a
}
```

```js [JavaScript]
var Solution = function (nums) { this.original = nums.slice(); };
Solution.prototype.reset = function () { return this.original.slice(); };
Solution.prototype.shuffle = function () {
    const a = this.original.slice();
    for (let i=a.length-1; i>0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};
```

::::::

**复杂度：** `shuffle` `O(n)`，`reset` `O(n)`，空间 `O(n)`（存原数组）。

## 三、总结

Fisher-Yates 洗牌是「等概率随机排列」标准算法：从后往前，每次与 `[0,i]` 随机交换。注意 `reset` 必须返回 **初始数组**（不被 shuffle 修改），所以要保存副本。`random.randint(0,i)` 范围含 i 很关键，否则不是均匀。同类：`382 随机节点`（水塘抽样）、`380`。
