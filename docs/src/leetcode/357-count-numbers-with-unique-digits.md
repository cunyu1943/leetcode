# [357. 统计各位数字都不同的数字个数](https://leetcode.cn/problems/count-numbers-with-unique-digits/)

## 一、题目描述

给定一个 **非负** 整数 `n`，统计在 `[0, 10ⁿ)` 范围内（即所有 **最多 n 位** 的数字中），**各位数字互不相同** 的数字个数。

**示例：**
```
输入：n = 2   输出：91
解释：0~99 共 100 个，去掉 11,22,...,99（9 个重复）剩 91 个
```

**提示：** `0 <= n <= 8`。

## 二、解答方法

### 方法一：排列组合

**思路：** 按位数统计：
- 1 位数（`0~9`）：10 个（含 0）；
- k 位（k≥2）：首位不能 0 → 9 种；第二位 9 种（含 0 排除首位）；第三位 8 种……即 `9 × 9 × 8 × 7 × ...`（共 k-1 个因子，从 9 递减）。
累加 `1 位 + 2 位 + ... + min(n,10) 位`。n≥10 时实际只有 10 位内数字（0~9 全不同最多 10 位，但 n≤8 限制），直接算到 min(n,10)。

:::::: code-group

```java [Java]
class Solution {
    public int countNumbersWithUniqueDigits(int n) {
        if (n == 0) return 1;
        int ans = 10, cur = 9 * 9;   // 1 位=10，2 位=81 起
        int avail = 9;
        for (int k = 2; k <= n && k <= 10; k++) {
            ans += cur;
            cur *= (--avail);        // 每多一位可用数字 -1
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def countNumbersWithUniqueDigits(self, n: int) -> int:
        if n == 0: return 1
        ans, cur, avail = 10, 9*9, 9
        for k in range(2, min(n,10)+1):
            ans += cur
            cur *= (avail - 1)
            avail -= 1
        return ans
```

```cpp [C++]
class Solution {
public:
    int countNumbersWithUniqueDigits(int n) {
        if (n == 0) return 1;
        int ans = 10, cur = 81, avail = 9;
        for (int k = 2; k <= n && k <= 10; k++) { ans += cur; cur *= (--avail); }
        return ans;
    }
};
```

```go [Go]
func countNumbersWithUniqueDigits(n int) int {
    if n == 0 { return 1 }
    ans, cur, avail := 10, 81, 9
    for k := 2; k <= n && k <= 10; k++ { ans += cur; cur *= (avail-1); avail-- }
    return ans
}
```

```js [JavaScript]
var countNumbersWithUniqueDigits = function (n) {
    if (n === 0) return 1;
    let ans = 10, cur = 81, avail = 9;
    for (let k=2; k<=n && k<=10; k++) { ans += cur; cur *= (avail-1); avail--; }
    return ans;
};
```

::::::

**复杂度：** 时间 `O(min(n,10))`，空间 `O(1)`。

## 三、总结

排列组合题：按位累加。首位 9 种（无 0），后续每位从剩余数字选。n≤8 时答案上限固定（10 位数字最多 `9×9×8×...×1`）。注意 `n==0` 返回 1（只有数字 0）。同类：`108 将有序数组转换为二叉搜索树` 无关，但本题是计数 DP/组合经典入门。也可回溯逐位生成（n 小）。
