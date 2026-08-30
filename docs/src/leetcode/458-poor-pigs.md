# [458. 可怜的小猪](https://leetcode.cn/problems/poor-pigs/)

## 一、题目描述

有 `buckets` 个桶，其中恰好一个桶的水有毒，其余无毒。毒水会让猪在 `minutesToDie` 分钟后死亡，且毒发前检测不到。给你 `minutesToTest` 分钟的总检测时间（可多次喂水，喂水后立即观察），求最少需要多少只猪才能在给定时间内**必然**找出毒桶。

**示例 1：**

```
输入：buckets = 1000, minutesToDie = 15, minutesToTest = 60
输出：5
```

**示例 2：**

```
输入：buckets = 4, minutesToDie = 15, minutesToTest = 15
输出：2
```

**提示：**

- `1 <= buckets <= 1000`
- `1 <= minutesToDie <= minutesToTest <= 100`

## 二、解答方法

### 2.1 方法一：信息论 / 进制编码

1. 思路

每只猪在测试时间内可经历 `T = minutesToTest / minutesToDie + 1` 种状态（第 0 轮死、第 1 轮死、……、或者存活）。`p` 只猪能区分 `T^p` 种情况，因此满足 `T^p >= buckets` 的最小 `p` 即答案：`p = ceil(log_T(buckets))`。把桶用 `T` 进制编码，第 `k` 只猪在第 `d` 轮喝下所有「第 k 位编码为 d」的桶的混合水。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int poorPigs(int buckets, int minutesToDie, int minutesToTest) {
        int states = minutesToTest / minutesToDie + 1;
        return (int) Math.ceil(Math.log(buckets) / Math.log(states));
    }
}
```

```python [Python]
class Solution:
    def poorPigs(self, buckets: int, minutesToDie: int, minutesToTest: int) -> int:
        import math
        states = minutesToTest // minutesToDie + 1
        return math.ceil(math.log(buckets) / math.log(states))
```

```cpp [C++]
class Solution {
public:
    int poorPigs(int buckets, int minutesToDie, int minutesToTest) {
        int states = minutesToTest / minutesToDie + 1;
        return ceil(log(buckets) / log(states));
    }
};
```

```go [Go]
func poorPigs(buckets int, minutesToDie int, minutesToTest int) int {
	states := minutesToTest/minutesToDie + 1
	// 求 ceil(log_states(buckets))
	p := 0
	cur := 1
	for cur < buckets {
		cur *= states
		p++
	}
	return p
}
```

```javascript [JavaScript]
var poorPigs = function (buckets, minutesToDie, minutesToTest) {
    const states = Math.floor(minutesToTest / minutesToDie) + 1;
    let p = 0, cur = 1;
    while (cur < buckets) { cur *= states; p++; }
    return p;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(\log_{states} buckets)$。
- 空间复杂度：$O(1)$。

## 三、总结

经典信息论题：每只猪多一种「死亡时间」状态，相当于多一位 `T` 进制。相关题目：LCP 系列、面试题（概率/编码）。
