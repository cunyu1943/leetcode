# [248. 中心对称数 III](https://leetcode.cn/problems/strobogrammatic-number-iii/) [🔒 会员题]



## 一、题目描述

给定两个字符串 `low` 和 `high` 表示两个整数 `low` 和 `high` ，其中 `low <= high` ，返回区间 `[low, high]` 内的 **中心对称数的总数** 。

**中心对称数** 是一个数字在旋转 **180°** 之后看起来依旧相同的数字。

由于答案可能非常大，请返回它对 `10⁹ + 7` **取模** 后的结果。

**示例 1：**

```
输入：low = "50", high = "100"
输出：3
解释：69、88 和 96 是区间内三个中心对称数。
```

**示例 2：**

```
输入：low = "0", high = "0"
输出：1
```

**提示：**

-   `1 <= low.length, high.length <= 15`
-   `low` 和 `high` 只包含数字
-   `low <= high`
-   `low` 和 `high` 不包含任何前导零，除了零本身



## 二、解答方法

### 2.1 方法一：按长度枚举 + 计数公式

1. **思路**

分两部分统计：

1. **长度在 `len(low)+1 ~ len(high)-1` 之间** 的所有中心对称数（这些数一定落在区间内），用公式直接计算；
2. **长度等于 `len(low)` 或 `len(high)`** 的，用 247 题的递归生成所有候选，再逐个比较大小筛选。

计数公式（长度 n 的中心对称数个数）：
- 最外层有 4 种选择（`1/8/6/9`，不能是 0）；
- 若 n 为奇数，中间位有 3 种选择（`0/1/8`）；
- 其余每对有 5 种选择（`00/11/88/69/96`）。

所以：`count(n) = 4 × 3^(n%2) × 5^(floor((n-2)/2))`（n ≥ 2）；`count(1) = 3`（`0/1/8`）。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    private static final int MOD = 1_000_000_007;
    private static final char[][] PAIRS = {{'0','0'},{'1','1'},{'8','8'},{'6','9'},{'9','6'}};

    public int strobogrammaticInRange(String low, String high) {
        int lo = low.length(), hi = high.length();
        long total = 0;
        // 1. 长度严格位于中间的：直接按公式累加
        for (int n = lo + 1; n < hi; n++) {
            total = (total + countOfLength(n)) % MOD;
        }
        // 2. 长度等于 lo 或 hi 的：生成后比较
        for (int n : new int[]{lo, hi}) {
            for (String s : generate(n, n)) {
                if (n == lo && compare(s, low) < 0) continue;     // s < low
                if (n == hi && compare(s, high) > 0) continue;    // s > high
                total = (total + 1) % MOD;
            }
        }
        return (int) total;
    }

    // 长度 n 的中心对称数个数
    private long countOfLength(int n) {
        if (n == 1) return 3;
        long res = 4;
        if (n % 2 == 1) res = res * 3 % MOD;
        for (int i = 0; i < (n - 2) / 2; i++) {
            res = res * 5 % MOD;
        }
        return res;
    }

    // 生成长度为 m 的所有中心对称数（total 用于判断是否最外层）
    private List<String> generate(int m, int total) {
        if (m == 0) return Collections.singletonList("");
        if (m == 1) return Arrays.asList("0", "1", "8");
        List<String> res = new ArrayList<>();
        for (String mid : generate(m - 2, total)) {
            for (char[] p : PAIRS) {
                if (m == total && p[0] == '0') continue;
                res.add(p[0] + mid + p[1]);
            }
        }
        return res;
    }

    // 比较两个等长数字串
    private int compare(String a, String b) {
        return a.compareTo(b);
    }
}
```

```python [Python]
class Solution:
    MOD = 10 ** 9 + 7

    def strobogrammaticInRange(self, low: str, high: str) -> int:
        lo, hi = len(low), len(high)
        total = 0
        # 1. 中间长度：公式累加
        for n in range(lo + 1, hi):
            total = (total + self.count_of_length(n)) % self.MOD
        # 2. 边界长度：生成后比较
        for n in {lo, hi}:
            for s in self.generate(n, n):
                if n == lo and len(s) == len(low) and s < low:
                    continue
                if n == hi and len(s) == len(high) and s > high:
                    continue
                total = (total + 1) % self.MOD
        return total

    def count_of_length(self, n: int) -> int:
        if n == 1:
            return 3
        res = 4
        if n % 2 == 1:
            res = res * 3 % self.MOD
        for _ in range((n - 2) // 2):
            res = res * 5 % self.MOD
        return res

    def generate(self, m: int, total: int):
        if m == 0:
            return ['']
        if m == 1:
            return ['0', '1', '8']
        res = []
        for mid in self.generate(m - 2, total):
            for a, b in [('0','0'), ('1','1'), ('8','8'), ('6','9'), ('9','6')]:
                if m == total and a == '0':
                    continue
                res.append(a + mid + b)
        return res
```

```go [Go]
const MOD = 1_000_000_007

func strobogrammaticInRange(low string, high string) int {
    lo, hi := len(low), len(high)
    total := 0
    for n := lo + 1; n < hi; n++ {
        total = (total + countOfLength(n)) % MOD
    }
    for _, n := range []int{lo, hi} {
        for _, s := range generate(n, n) {
            if n == lo && len(s) == len(low) && s < low {
                continue
            }
            if n == hi && len(s) == len(high) && s > high {
                continue
            }
            total = (total + 1) % MOD
        }
    }
    return total
}

func countOfLength(n int) int {
    if n == 1 {
        return 3
    }
    res := 4
    if n%2 == 1 {
        res = res * 3 % MOD
    }
    for i := 0; i < (n-2)/2; i++ {
        res = res * 5 % MOD
    }
    return res
}

func generate(m, total int) []string {
    if m == 0 {
        return []string{""}
    }
    if m == 1 {
        return []string{"0", "1", "8"}
    }
    pairs := [][2]byte{{'0','0'}, {'1','1'}, {'8','8'}, {'6','9'}, {'9','6'}}
    res := []string{}
    for _, mid := range generate(m-2, total) {
        for _, p := range pairs {
            if m == total && p[0] == '0' {
                continue
            }
            res = append(res, string(p[0])+mid+string(p[1]))
        }
    }
    return res
}
```

```cpp [C++]
class Solution {
public:
    static const int MOD = 1e9 + 7;

    int strobogrammaticInRange(string low, string high) {
        int lo = low.size(), hi = high.size();
        long long total = 0;
        for (int n = lo + 1; n < hi; n++) {
            total = (total + countOfLength(n)) % MOD;
        }
        for (int n : {lo, hi}) {
            for (const string& s : generate(n, n)) {
                if (n == lo && s.size() == low.size() && s < low) continue;
                if (n == hi && s.size() == high.size() && s > high) continue;
                total = (total + 1) % MOD;
            }
        }
        return total;
    }
private:
    long long countOfLength(int n) {
        if (n == 1) return 3;
        long long res = 4;
        if (n % 2) res = res * 3 % MOD;
        for (int i = 0; i < (n - 2) / 2; i++) res = res * 5 % MOD;
        return res;
    }

    vector<string> generate(int m, int total) {
        if (m == 0) return {""};
        if (m == 1) return {"0", "1", "8"};
        vector<pair<char, char>> pairs = {{'0','0'},{'1','1'},{'8','8'},{'6','9'},{'9','6'}};
        vector<string> res;
        for (const string& mid : generate(m - 2, total)) {
            for (auto& p : pairs) {
                if (m == total && p.first == '0') continue;
                res.push_back(string(1, p.first) + mid + string(1, p.second));
            }
        }
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {string} low
 * @param {string} high
 * @return {number}
 */
var strobogrammaticInRange = function (low, high) {
    const MOD = 1e9 + 7;
    const lo = low.length, hi = high.length;
    let total = 0;

    const countOfLength = (n) => {
        if (n === 1) return 3;
        let res = 4n;
        if (n % 2 === 1) res = (res * 3n) % BigInt(MOD);
        for (let i = 0; i < Math.floor((n - 2) / 2); i++) {
            res = (res * 5n) % BigInt(MOD);
        }
        return Number(res);
    };

    const generate = (m, total) => {
        if (m === 0) return [''];
        if (m === 1) return ['0', '1', '8'];
        const pairs = [['0','0'], ['1','1'], ['8','8'], ['6','9'], ['9','6']];
        const res = [];
        for (const mid of generate(m - 2, total)) {
            for (const [a, b] of pairs) {
                if (m === total && a === '0') continue;
                res.push(a + mid + b);
            }
        }
        return res;
    };

    for (let n = lo + 1; n < hi; n++) {
        total = (total + countOfLength(n)) % MOD;
    }
    for (const n of new Set([lo, hi])) {
        for (const s of generate(n, n)) {
            if (n === lo && s.length === low.length && s < low) continue;
            if (n === hi && s.length === high.length && s > high) continue;
            total = (total + 1) % MOD;
        }
    }
    return total;
};
```

```ts [TypeScript]
/**
 * @param {string} low
 * @param {string} high
 * @return {number}
 */
function strobogrammaticInRange(low: string, high: string): number {
    const MOD = 1e9 + 7;
    const lo = low.length, hi = high.length;
    let total = 0;

    const countOfLength = (n: number): number => {
        if (n === 1) return 3;
        let res = 4n;
        if (n % 2 === 1) res = (res * 3n) % BigInt(MOD);
        for (let i = 0; i < Math.floor((n - 2) / 2); i++) {
            res = (res * 5n) % BigInt(MOD);
        }
        return Number(res);
    };

    const generate = (m: number, total: number): string[] => {
        if (m === 0) return [''];
        if (m === 1) return ['0', '1', '8'];
        const pairs: [string, string][] = [['0','0'], ['1','1'], ['8','8'], ['6','9'], ['9','6']];
        const res: string[] = [];
        for (const mid of generate(m - 2, total)) {
            for (const [a, b] of pairs) {
                if (m === total && a === '0') continue;
                res.push(a + mid + b);
            }
        }
        return res;
    };

    for (let n = lo + 1; n < hi; n++) {
        total = (total + countOfLength(n)) % MOD;
    }
    for (const n of new Set([lo, hi])) {
        for (const s of generate(n, n)) {
            if (n === lo && s.length === low.length && s < low) continue;
            if (n === hi && s.length === high.length && s > high) continue;
            total = (total + 1) % MOD;
        }
    }
    return total;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(5^(L/2))`，L 为 `high` 的长度（主要开销在生成边界长度的候选数）。
- **空间复杂度**：`O(5^(L/2))`。

## 三、总结

本题是中心对称数系列的收尾，结合了 246（判断）与 247（生成）：

| 部分 | 策略 |
| ---- | ---- |
| 中间长度 `lo+1 ~ hi-1` | 公式直算：`4 × 3^(n%2) × 5^((n-2)/2)` |
| 边界长度 `lo` / `hi` | 生成全部候选，再用字符串比较筛选 |

关键细节：
1. **比较前先比长度** —— 等长时才能直接用字符串字典序比较数字大小；
2. **注意去重** —— 当 `lo == hi` 时，用 `Set` 避免同一长度被统计两次；
3. 结果需对 `10⁹ + 7` 取模，中间乘法用 `long`/`BigInt` 防溢出。
