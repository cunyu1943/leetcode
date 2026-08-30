# [241. 为运算表达式设计优先级](https://leetcode.cn/problems/different-ways-to-add-parentheses/)



## 一、题目描述

给你一个由数字和运算符组成的字符串 `expression` ，按不同优先级组合数字和运算符，计算并返回所有可能组合的结果。你可以 **按任意顺序** 返回答案。

生成的测试用例满足其对应输出值符合 32 位整数范围，不同结果的数量不超过 `10⁴` 。

**示例 1：**

```
输入：expression = "2-1-1"
输出：[0,2]
解释：
((2-1)-1) = 0
(2-(1-1)) = 2
```

**示例 2：**

```
输入：expression = "2*3-4*5"
输出：[-34,-14,-10,-10,10]
解释：
(2*(3-(4*5))) = -34
((2*3)-(4*5)) = -14
((2*(3-4))*5) = -10
(2*((3-4)*5)) = -10
(((2*3)-4)*5) = 10
```

**提示：**

-   `1 <= expression.length <= 20`
-   `expression` 由数字和算符 `'+'`、`'-'` 和 `'*'` 组成。
-   输入表达式中的所有整数值在范围 `[0, 99]`



## 二、解答方法

### 2.1 方法一：分治（递归枚举运算符）

1. **思路**

对每个运算符，把它作为「最后执行的运算」，把表达式分成左右两半，分别递归求出所有可能结果，再两两组合。

- 递归基线：若子表达式不含运算符（纯数字），直接返回该数字。
- 组合：对左右结果集合做笛卡尔积并按当前运算符计算。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public List<Integer> diffWaysToCompute(String expression) {
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            if (c == '+' || c == '-' || c == '*') {
                List<Integer> left = diffWaysToCompute(expression.substring(0, i));
                List<Integer> right = diffWaysToCompute(expression.substring(i + 1));
                for (int a : left) {
                    for (int b : right) {
                        switch (c) {
                            case '+': res.add(a + b); break;
                            case '-': res.add(a - b); break;
                            case '*': res.add(a * b); break;
                        }
                    }
                }
            }
        }
        if (res.isEmpty()) {
            res.add(Integer.parseInt(expression));   // 纯数字
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def diffWaysToCompute(self, expression: str) -> List[int]:
        # 记忆化：避免重复计算子表达式
        memo = {}

        def dfs(expr):
            if expr in memo:
                return memo[expr]
            res = []
            for i, ch in enumerate(expr):
                if ch in '+-*':
                    for a in dfs(expr[:i]):
                        for b in dfs(expr[i + 1:]):
                            if ch == '+':
                                res.append(a + b)
                            elif ch == '-':
                                res.append(a - b)
                            else:
                                res.append(a * b)
            if not res:                          # 纯数字
                res.append(int(expr))
            memo[expr] = res
            return res

        return dfs(expression)
```

```go [Go]
func diffWaysToCompute(expression string) []int {
    memo := make(map[string][]int)
    var dfs func(expr string) []int
    dfs = func(expr string) []int {
        if v, ok := memo[expr]; ok {
            return v
        }
        var res []int
        for i, ch := range expr {
            if ch == '+' || ch == '-' || ch == '*' {
                left := dfs(expr[:i])
                right := dfs(expr[i+1:])
                for _, a := range left {
                    for _, b := range right {
                        switch ch {
                        case '+':
                            res = append(res, a+b)
                        case '-':
                            res = append(res, a-b)
                        case '*':
                            res = append(res, a*b)
                        }
                    }
                }
            }
        }
        if len(res) == 0 {
            num, _ := strconv.Atoi(expr)
            res = append(res, num)
        }
        memo[expr] = res
        return res
    }
    return dfs(expression)
}
```

```cpp [C++]
class Solution {
public:
    unordered_map<string, vector<int>> memo;

    vector<int> diffWaysToCompute(string expression) {
        return dfs(expression);
    }

    vector<int> dfs(string expr) {
        if (memo.count(expr)) return memo[expr];
        vector<int> res;
        for (int i = 0; i < expr.size(); i++) {
            char c = expr[i];
            if (c == '+' || c == '-' || c == '*') {
                auto left = dfs(expr.substr(0, i));
                auto right = dfs(expr.substr(i + 1));
                for (int a : left) {
                    for (int b : right) {
                        if (c == '+') res.push_back(a + b);
                        else if (c == '-') res.push_back(a - b);
                        else res.push_back(a * b);
                    }
                }
            }
        }
        if (res.empty()) res.push_back(stoi(expr));
        memo[expr] = res;
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {string} expression
 * @return {number[]}
 */
var diffWaysToCompute = function (expression) {
    const memo = new Map();
    const dfs = (expr) => {
        if (memo.has(expr)) return memo.get(expr);
        const res = [];
        for (let i = 0; i < expr.length; i++) {
            const ch = expr[i];
            if (ch === '+' || ch === '-' || ch === '*') {
                const left = dfs(expr.slice(0, i));
                const right = dfs(expr.slice(i + 1));
                for (const a of left) {
                    for (const b of right) {
                        if (ch === '+') res.push(a + b);
                        else if (ch === '-') res.push(a - b);
                        else res.push(a * b);
                    }
                }
            }
        }
        if (res.length === 0) res.push(Number(expr));
        memo.set(expr, res);
        return res;
    };
    return dfs(expression);
};
```

```ts [TypeScript]
/**
 * @param {string} expression
 * @return {number[]}
 */
function diffWaysToCompute(expression: string): number[] {
    const memo = new Map<string, number[]>();
    const dfs = (expr: string): number[] => {
        if (memo.has(expr)) return memo.get(expr)!;
        const res: number[] = [];
        for (let i = 0; i < expr.length; i++) {
            const ch = expr[i];
            if (ch === '+' || ch === '-' || ch === '*') {
                const left = dfs(expr.slice(0, i));
                const right = dfs(expr.slice(i + 1));
                for (const a of left) {
                    for (const b of right) {
                        if (ch === '+') res.push(a + b);
                        else if (ch === '-') res.push(a - b);
                        else res.push(a * b);
                    }
                }
            }
        }
        if (res.length === 0) res.push(Number(expr));
        memo.set(expr, res);
        return res;
    };
    return dfs(expression);
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：结果数为 **卡塔兰数** `C(n)`，约为 `O(4ⁿ / n^(3/2))`；加记忆化后子问题为 `O(n²)` 个。
- **空间复杂度**：`O(C(n))`（存储所有结果）。

## 三、总结

本题是 **分治（Divide and Conquer）** 的经典应用：

```
对每个运算符：  左边所有可能 × 右边所有可能  →  组合结果
              （递归）            （递归）
```

关键点：
1. 递归基线是「子表达式不含运算符」→ 直接返回数字；
2. 不同括号方案可能产生相同结果（如示例 2 中的 `-10` 出现两次），题目允许重复；
3. 加 **记忆化**（`memo[expr]`）可避免重复计算相同子表达式，显著提升效率。

同类思路：`95. 不同的二叉搜索树 II`（枚举根节点的 Catalan 结构）。
