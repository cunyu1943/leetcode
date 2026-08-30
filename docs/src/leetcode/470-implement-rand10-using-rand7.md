# [470. 用 Rand7() 实现 Rand10()](https://leetcode.cn/problems/implement-rand10-using-rand7/)

## 一、题目描述

给定「等概率生成 1~7 的随机数」函数 `rand7()`，请用它实现「等概率生成 1~10 的随机数」函数 `rand10()`，且**期望调用 `rand7()` 的次数尽量少**。

**提示：**

- `rand7()` 已定义，返回 1~7 等概率整数；
- `rand10()` 的返回应在 1~10 等概率。

## 二、解答方法

### 2.1 方法一： rejection sampling（拒绝采样）

1. 思路

两次 `rand7()` 可生成 `1~49` 的等概率数：`val = (rand7()-1)*7 + rand7()`。把 `1~40` 映射到 `1~10`（即 `val <= 40` 时返回 `(val-1)%10 + 1`），`41~49` 丢弃重试。这样 1~10 每个数概率相等。`40/49` 的接受率使期望调用最少（也可用更优组合，但此法为标准解）。

2. 代码实现

:::::: code-group

```java [Java]
class Solution extends SolBase {
    public int rand10() {
        while (true) {
            int val = (rand7() - 1) * 7 + rand7(); // 1..49 等概率
            if (val <= 40) return (val - 1) % 10 + 1;
        }
    }
}
```

```python [Python]
class Solution:
    def rand10(self):
        while True:
            val = (rand7() - 1) * 7 + rand7()
            if val <= 40:
                return (val - 1) % 10 + 1
```

```cpp [C++]
class Solution : SolBase {
public:
    int rand10() {
        while (true) {
            int val = (rand7() - 1) * 7 + rand7();
            if (val <= 40) return (val - 1) % 10 + 1;
        }
    }
};
```

```go [Go]
func rand10() int {
	for {
		val := (rand7() - 1) * 7 + rand7()
		if val <= 40 {
			return (val-1)%10 + 1
		}
	}
}
```

```javascript [JavaScript]
var rand10 = function () {
    while (true) {
        const val = (rand7() - 1) * 7 + rand7();
        if (val <= 40) return (val - 1) % 10 + 1;
    }
};
```

::::::

3. 复杂度分析

- 时间复杂度：期望 $O(1)$（约 $49/40 \approx 1.225$ 轮）。
- 空间复杂度：$O(1)$。

### 2.2 方法二：更优采样（利用丢弃段）

思路：`41~49` 还能再展开一次（减 40 后继续组合），进一步提高接受率。实现略复杂，标准解用拒绝采样即可。

## 三、总结

「拒绝采样」是用小范围随机构造大范围等概率随机的通用技巧。相关题目：478 在圆内随机生成点、398 随机数索引、382 链表随机节点。
