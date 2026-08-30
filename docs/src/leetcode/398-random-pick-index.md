# [398. 随机数索引](https://leetcode.cn/problems/random-pick-index/)

## 一、题目描述

给定一个可能含有重复元素的整数数组 `nums`，要求实现一个类，在调用 `pick(target)` 时等概率地返回 `target` 在 `nums` 中出现的一个下标。

可以假设对 `pick` 的调用无法事先预知（即不能预先把所有下标存好再随机——当然存好也是可行的；进阶优化强调流式/常数空间）。

**示例：**

```
输入
["Solution", "pick", "pick", "pick"]
[[[1,2,3,3,3]], [3], [1], [3]]
输出
[null, 4, 0, 2]
解释：
solution.pick(3) 随机返回 2、3 或 4（索引 3 出现三次，索引 2 出现两次？注意示例为 [1,2,3,3,3]，下标 2、3、4），每个概率为 1/3。
```

**提示：**

- `1 <= nums.length <= 2 * 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `target` 一定存在于 `nums` 中。
- 最多调用 `pick` 函数 $10^4$ 次。

## 二、解答方法

### 2.1 方法一：水塘抽样（Reservoir Sampling）

1. 思路

当不能预存所有下标（或追求 $O(1)$ 空间）时，使用水塘抽样：遍历数组，遇到第 `count` 个等于 `target` 的位置时，以概率 `1/count` 选中它作为当前结果。数学上可证每个下标被选中的概率均为 `1/总个数`，满足等概率。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    private int[] nums;
    private Random rand = new Random();
    public Solution(int[] nums) { this.nums = nums; }
    public int pick(int target) {
        int ans = -1, count = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                count++;
                if (rand.nextInt(count) == 0) ans = i;
            }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def __init__(self, nums: List[int]):
        self.nums = nums

    def pick(self, target: int) -> int:
        import random
        ans, count = -1, 0
        for i, x in enumerate(self.nums):
            if x == target:
                count += 1
                if random.randint(0, count - 1) == 0:
                    ans = i
        return ans
```

```cpp [C++]
class Solution {
    vector<int> nums;
public:
    Solution(vector<int>& nums) : nums(nums) {}
    int pick(int target) {
        int ans = -1, count = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == target) {
                count++;
                if (rand() % count == 0) ans = i;
            }
        }
        return ans;
    }
};
```

```go [Go]
type Solution struct{ nums []int }
func Constructor(nums []int) Solution { return Solution{nums: nums} }
func (s *Solution) Pick(target int) int {
	ans, count := -1, 0
	for i, x := range s.nums {
		if x == target {
			count++
			if rand.Intn(count) == 0 {
				ans = i
			}
		}
	}
	return ans
}
```

```javascript [JavaScript]
var Solution = function (nums) {
    this.nums = nums;
};
Solution.prototype.pick = function (target) {
    let ans = -1, count = 0;
    for (let i = 0; i < this.nums.length; i++) {
        if (this.nums[i] === target) {
            count++;
            if (Math.floor(Math.random() * count) === 0) ans = i;
        }
    }
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：`pick` 为 $O(n)$。
- 空间复杂度：$O(1)$（不额外存储下标）。

### 2.2 方法二：哈希预存下标

1. 思路

构造时把每个值对应的所有下标存入哈希表，`pick` 时在该值对应的下标列表中随机取一个。空间换时间，`pick` 为 $O(1)$。

2. 代码实现（Python 示例）

:::::: code-group

```python [Python]
class Solution:
    def __init__(self, nums: List[int]):
        from collections import defaultdict
        self.pos = defaultdict(list)
        for i, x in enumerate(nums):
            self.pos[x].append(i)

    def pick(self, target: int) -> int:
        import random
        lst = self.pos[target]
        return lst[random.randint(0, len(lst) - 1)]
```

```java [Java]
class Solution {
    private Map<Integer, List<Integer>> pos = new HashMap<>();
    private Random rand = new Random();
    public Solution(int[] nums) {
        for (int i = 0; i < nums.length; i++)
            pos.computeIfAbsent(nums[i], k -> new ArrayList<>()).add(i);
    }
    public int pick(int target) {
        List<Integer> lst = pos.get(target);
        return lst.get(rand.nextInt(lst.size()));
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：构造 $O(n)$，`pick` $O(1)$。
- 空间复杂度：$O(n)$。

## 三、总结

水塘抽样是处理「数据流中等概率抽样」的经典算法，空间 $O(1)$。本题是 382 链表随机节点的姊妹题（链表版用步数计数，数组版用值计数），进阶可延伸到 384 打乱数组（Fisher-Yates）。
