# [202. 快乐数](https://leetcode.cn/problems/happy-number/)



## 一、题目描述

编写一个算法来判断一个数 `n` 是不是快乐数。

「快乐数」定义为：

-   对于一个正整数，每一次将该数替换为它每个位置上的数字的 **平方和**。
-   然后重复这个过程直到这个数变为 1，也可能是 **无限循环** 但始终变不到 1。
-   如果这个过程 **结果为 1**，那么这个数就是快乐数。

如果 `n` 是快乐数就返回 `true` ；不是，则返回 `false` 。



**示例 1：**

```
输入：n = 19
输出：true
解释：1² + 9² = 82，8² + 2² = 68，6² + 8² = 100，1² + 0² + 0² = 1。
```

**示例 2：**

```
输入：n = 2
输出：false
```

**提示：**

-   `1 <= n <= 2³¹ - 1`



## 二、解答方法

### 2.1 方法一：哈希集合检测循环

1. **思路**

用 `Set` 记录出现过的数。每次计算各位平方和，若得到 1 返回 `true`；若某个数重复出现（进入循环）则返回 `false`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isHappy(int n) {
        Set<Integer> seen = new HashSet<>();
        while (n != 1 && !seen.contains(n)) {
            seen.add(n);
            n = getNext(n);
        }
        return n == 1;
    }
    private int getNext(int n) {
        int sum = 0;
        while (n > 0) {
            int d = n % 10;
            sum += d * d;
            n /= 10;
        }
        return sum;
    }
}
```

```python [Python]
class Solution:
    def isHappy(self, n: int) -> bool:
        seen = set()
        while n != 1 and n not in seen:
            seen.add(n)
            n = sum(int(d) ** 2 for d in str(n))
        return n == 1
```

```go [Go]
func isHappy(n int) bool {
    seen := make(map[int]bool)
    for n != 1 && !seen[n] {
        seen[n] = true
        n = getNext(n)
    }
    return n == 1
}

func getNext(n int) int {
    sum := 0
    for n > 0 {
        d := n % 10
        sum += d * d
        n /= 10
    }
    return sum
}
```

```cpp [C++]
class Solution {
public:
    bool isHappy(int n) {
        unordered_set<int> seen;
        while (n != 1 && !seen.count(n)) {
            seen.insert(n);
            n = getNext(n);
        }
        return n == 1;
    }
private:
    int getNext(int n) {
        int sum = 0;
        while (n > 0) {
            int d = n % 10;
            sum += d * d;
            n /= 10;
        }
        return sum;
    }
};
```

```js [JavaScript]
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
    const seen = new Set();
    while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = String(n).split('').reduce((s, d) => s + d * d, 0);
    }
    return n === 1;
};
```

```ts [TypeScript]
/**
 * @param {number} n
 * @return {boolean}
 */
function isHappy(n: number): boolean {
    const seen = new Set<number>();
    while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = String(n).split('').reduce((s, d) => s + Number(d) ** 2, 0);
    }
    return n === 1;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(log n)`（数值快速收敛到常数范围）。
- **空间复杂度**：`O(log n)`。

### 2.2 方法二：快慢指针（Floyd 判圈，O(1) 空间）

1. **思路**

把「求平方和」看作链表 `next` 指针，若不是快乐数则必然成环。用快慢指针检测环：慢指针每步算一次，快指针每步算两次；若相遇且值为 1 则是快乐数，否则不是。

2. **代码实现（Python）**

```python
class Solution:
    def isHappy(self, n: int) -> bool:
        def get_next(x):
            return sum(int(d) ** 2 for d in str(x))
        slow, fast = n, get_next(n)
        while fast != 1 and slow != fast:
            slow = get_next(slow)
            fast = get_next(get_next(fast))
        return fast == 1
```

3. **复杂度分析**

- **时间复杂度**：`O(log n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 空间 | 特点 |
| ---- | ---- | ---- |
| 哈希集合 | `O(log n)` | 直观 |
| 快慢指针 | `O(1)` | 进阶要求，推荐 |

本质是「判断链表是否有环」的变形：非快乐数最终会进入 `4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4` 的循环，因此也可用硬编码「遇 1 或 4 结束」来剪枝。
