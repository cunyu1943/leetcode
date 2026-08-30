# [247. 中心对称数 II](https://leetcode.cn/problems/strobogrammatic-number-ii/)



## 一、题目描述

给你一个整数 `n` ，请你找出并返回长度为 `n` 的所有 **中心对称数** 。你可以以 **任何顺序** 返回答案。

**中心对称数** 是一个数字在旋转 **180°** 之后看起来依旧相同的数字。

**示例 1：**

```
输入：n = 2
输出：["11","69","88","96"]
```

**示例 2：**

```
输入：n = 1
输出：["0","1","8"]
```

**提示：**

-   `1 <= n <= 14`



## 二、解答方法

### 2.1 方法一：递归构造（由外向内）

1. **思路**

从两端向中间逐层添加合法的对称对 `{0,0}, {1,1}, {8,8}, {6,9}, {9,6}`：

- 递归函数 `dfs(m, total)`：构造长度为 `m` 的中心对称数；
- **基线**：
  - `m == 0` → 返回 `[""]`；
  - `m == 1` → 返回 `["0","1","8"]`（中间位只能是自对称数字）；
- **递归**：对长度为 `m-2` 的每个结果，在两侧包裹一层对称对；
- **关键剪枝**：最外层（即 `m == total`）**不能加 `0` 开头**（否则产生前导零，如 `"00"`、`"0690"`）。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    private static final char[][] PAIRS = {{'0','0'},{'1','1'},{'8','8'},{'6','9'},{'9','6'}};

    public List<String> findStrobogrammatic(int n) {
        return dfs(n, n);
    }

    private List<String> dfs(int m, int total) {
        if (m == 0) return Collections.singletonList("");
        if (m == 1) return Arrays.asList("0", "1", "8");

        List<String> inner = dfs(m - 2, total);
        List<String> res = new ArrayList<>();
        for (String mid : inner) {
            for (char[] p : PAIRS) {
                if (m == total && p[0] == '0') continue;   // 最外层禁止前导零
                res.add(p[0] + mid + p[1]);
            }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def findStrobogrammatic(self, n: int) -> List[str]:
        def dfs(m):
            if m == 0:
                return ['']
            if m == 1:
                return ['0', '1', '8']
            res = []
            for mid in dfs(m - 2):
                for a, b in [('0','0'), ('1','1'), ('8','8'), ('6','9'), ('9','6')]:
                    if m == n and a == '0':
                        continue                      # 最外层禁止前导零
                    res.append(a + mid + b)
            return res
        return dfs(n)
```

```go [Go]
func findStrobogrammatic(n int) []string {
    pairs := [][2]byte{{'0','0'}, {'1','1'}, {'8','8'}, {'6','9'}, {'9','6'}}
    var dfs func(m int) []string
    dfs = func(m int) []string {
        if m == 0 {
            return []string{""}
        }
        if m == 1 {
            return []string{"0", "1", "8"}
        }
        res := []string{}
        for _, mid := range dfs(m - 2) {
            for _, p := range pairs {
                if m == n && p[0] == '0' {
                    continue
                }
                res = append(res, string(p[0])+mid+string(p[1]))
            }
        }
        return res
    }
    return dfs(n)
}
```

```cpp [C++]
class Solution {
public:
    vector<string> findStrobogrammatic(int n) {
        vector<pair<char, char>> pairs = {{'0','0'},{'1','1'},{'8','8'},{'6','9'},{'9','6'}};
        function<vector<string>(int)> dfs = [&](int m) -> vector<string> {
            if (m == 0) return {""};
            if (m == 1) return {"0", "1", "8"};
            vector<string> res;
            for (const string& mid : dfs(m - 2)) {
                for (auto& p : pairs) {
                    if (m == n && p.first == '0') continue;
                    res.push_back(string(1, p.first) + mid + string(1, p.second));
                }
            }
            return res;
        };
        return dfs(n);
    }
};
```

```js [JavaScript]
/**
 * @param {number} n
 * @return {string[]}
 */
var findStrobogrammatic = function (n) {
    const pairs = [['0','0'], ['1','1'], ['8','8'], ['6','9'], ['9','6']];
    const dfs = (m) => {
        if (m === 0) return [''];
        if (m === 1) return ['0', '1', '8'];
        const res = [];
        for (const mid of dfs(m - 2)) {
            for (const [a, b] of pairs) {
                if (m === n && a === '0') continue;   // 禁止前导零
                res.push(a + mid + b);
            }
        }
        return res;
    };
    return dfs(n);
};
```

```ts [TypeScript]
/**
 * @param {number} n
 * @return {string[]}
 */
function findStrobogrammatic(n: number): string[] {
    const pairs: [string, string][] = [['0','0'], ['1','1'], ['8','8'], ['6','9'], ['9','6']];
    const dfs = (m: number): string[] => {
        if (m === 0) return [''];
        if (m === 1) return ['0', '1', '8'];
        const res: string[] = [];
        for (const mid of dfs(m - 2)) {
            for (const [a, b] of pairs) {
                if (m === n && a === '0') continue;
                res.push(a + mid + b);
            }
        }
        return res;
    };
    return dfs(n);
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(5^(n/2))`（每层 5 种选择，共 `n/2` 层，等于结果数量级）。
- **空间复杂度**：`O(5^(n/2))`（结果集）。

### 2.2 方法二：迭代（由内向外扩展）

1. **思路**

从最内层开始，逐层向外包裹对称对：

- n 为奇数：初始 `["0","1","8"]`；
- n 为偶数：初始 `[""]`；
- 每次迭代，对每个已有结果包裹 5 种对称对（除最后一次迭代外，可以包含 `0` 包裹）。

2. **代码实现（Python）**

```python
class Solution:
    def findStrobogrammatic(self, n: int) -> List[str]:
        res = ['0', '1', '8'] if n % 2 else ['']
        for m in range(n % 2 + 2, n + 1, 2):      # 逐层向外加 2
            new_res = []
            for mid in res:
                for a, b in [('0','0'), ('1','1'), ('8','8'), ('6','9'), ('9','6')]:
                    if m == n and a == '0':
                        continue
                    new_res.append(a + mid + b)
            res = new_res
        return res
```

3. **复杂度分析**

- **时间复杂度**：`O(5^(n/2))`。
- **空间复杂度**：`O(5^(n/2))`。

## 三、总结

| 方法 | 特点 |
| ---- | ---- |
| 递归（由外向内） | 思路自然，需传 `total` 判断最外层 |
| 迭代（由内向外） | 无递归栈，循环控制层数 |

两个关键细节：

1. **最外层不能是 `0`** —— 否则产生前导零（如 n=2 时不应出现 `"00"`）；
2. **中间位（n 为奇数）只能是 `0/1/8`** —— 因为 `6`/`9` 旋转后互换，不能自己对自己。

结果数量：n 为偶数时 `4 × 5^(n/2 - 1)`，n 为奇数时 `4 × 3 × 5^((n-3)/2)`（最外层 4 种：1/8/6/9；中间层 5 种）。
