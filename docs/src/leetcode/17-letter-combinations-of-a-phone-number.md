# [17. 电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/)



## 一、题目描述

给定一个仅包含数字 `2-9` 的字符串，返回所有它能表示的字母组合。答案可以按 **任意顺序** 返回。

数字到字母的映射（与电话按键相同）：`2`→`abc`，`3`→`def`，`4`→`ghi`，`5`→`jkl`，`6`→`mno`，`7`→`pqrs`，`8`→`tuv`，`9`→`wxyz`。注意 `1` 不对应任何字母。



**示例 1：**

```
输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

**示例 2：**

```
输入：digits = "2"
输出：["a","b","c"]
```

**提示：**

-   `1 <= digits.length <= 4`
-   `digits[i]` 是范围 `['2', '9']` 的一个数字



## 二、解答方法

### 2.1 方法一：回溯（DFS）

1. **思路**

本质是求多个集合的笛卡尔积。用递归逐位选择：

-   用 `index` 表示当前处理到 `digits` 的第几位；
-   取出该位对应字母集合，依次把每个字母加入当前组合 `path`；
-   递归进入下一位；当 `index == digits.length` 时，得到一个完整组合，加入结果；
-   回溯时移除最后加入的字母。

注意空输入应返回空列表（非包含空串）。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private String[] map = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    private List<String> res = new ArrayList<>();

    public List<String> letterCombinations(String digits) {
        if (digits.isEmpty()) return res;
        backtrack(digits, 0, new StringBuilder());
        return res;
    }

    private void backtrack(String digits, int index, StringBuilder path) {
        if (index == digits.length()) {
            res.add(path.toString());
            return;
        }
        String letters = map[digits.charAt(index) - '0'];
        for (char c : letters.toCharArray()) {
            path.append(c);
            backtrack(digits, index + 1, path);
            path.deleteCharAt(path.length() - 1);
        }
    }
}
```

```python [Python]
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []
        mp = {
            "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
            "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
        }
        res = []

        def backtrack(index, path):
            if index == len(digits):
                res.append("".join(path))
                return
            for c in mp[digits[index]]:
                backtrack(index + 1, path + [c])

        backtrack(0, [])
        return res
```

```go [Go]
func letterCombinations(digits string) []string {
    if digits == "" {
        return []string{}
    }
    mp := []string{"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"}
    res := []string{}
    var backtrack func(int, string)
    backtrack = func(index int, path string) {
        if index == len(digits) {
            res = append(res, path)
            return
        }
        letters := mp[digits[index]-'0']
        for _, c := range letters {
            backtrack(index+1, path+string(c))
        }
    }
    backtrack(0, "")
    return res
}
```

```c [C]
/* 回溯返回动态字符串数组在 C 中需手动管理内存，逻辑同下，此处给出思路说明 */
```

```cpp [C++]
class Solution {
public:
    vector<string> letterCombinations(string digits) {
        vector<string> res;
        if (digits.empty()) return res;
        string map[10] = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        string path;
        function<void(int)> backtrack = [&](int index) {
            if (index == digits.size()) {
                res.push_back(path);
                return;
            }
            for (char c : map[digits[index] - '0']) {
                path.push_back(c);
                backtrack(index + 1);
                path.pop_back();
            }
        };
        backtrack(0);
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    if (digits === '') return [];
    const map = { 2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz' };
    const res = [];
    const backtrack = (index, path) => {
        if (index === digits.length) {
            res.push(path);
            return;
        }
        for (const c of map[digits[index]]) {
            backtrack(index + 1, path + c);
        }
    };
    backtrack(0, '');
    return res;
};
```

```ts [TypeScript]
function letterCombinations(digits: string): string[] {
    if (digits === '') return [];
    const map: Record<string, string> = { 2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz' };
    const res: string[] = [];
    const backtrack = (index: number, path: string): void => {
        if (index === digits.length) {
            res.push(path);
            return;
        }
        for (const c of map[digits[index]]) {
            backtrack(index + 1, path + c);
        }
    };
    backtrack(0, '');
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(3^m * 4^n)`，其中 `m` 为对应 3 字母的数字个数，`n` 为对应 4 字母（7、9）的数字个数，即所有组合总数。
- **空间复杂度**：`O(m + n)`，递归栈深度与 `digits` 长度成正比，结果存储不计。

### 2.2 方法二：队列迭代（BFS / 逐个拼接）

1. **思路**

用队列（或列表）保存「当前已组合的前缀」，每遇到一个新的数字，就把队列里所有前缀分别拼上该数字对应的每个字母，生成新前缀。无需递归。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<String> letterCombinations(String digits) {
        List<String> res = new ArrayList<>();
        if (digits.isEmpty()) return res;
        String[] map = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        res.add("");
        for (char d : digits.toCharArray()) {
            String letters = map[d - '0'];
            List<String> next = new ArrayList<>();
            for (String prefix : res) {
                for (char c : letters.toCharArray()) {
                    next.add(prefix + c);
                }
            }
            res = next;
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []
        mp = {
            "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
            "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
        }
        res = [""]
        for d in digits:
            res = [prefix + c for prefix in res for c in mp[d]]
        return res
```

```go [Go]
func letterCombinations(digits string) []string {
    if digits == "" {
        return []string{}
    }
    mp := []string{"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"}
    res := []string{""}
    for _, d := range digits {
        letters := mp[d-'0']
        next := []string{}
        for _, prefix := range res {
            for _, c := range letters {
                next = append(next, prefix+string(c))
            }
        }
        res = next
    }
    return res
}
```

```c [C]
/* 队列迭代法同样需要动态数组管理，C 中实现较繁琐，推荐回溯法 */
```

```cpp [C++]
class Solution {
public:
    vector<string> letterCombinations(string digits) {
        vector<string> res;
        if (digits.empty()) return res;
        string map[10] = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        res.push_back("");
        for (char d : digits) {
            string letters = map[d - '0'];
            vector<string> next;
            for (string& prefix : res) {
                for (char c : letters) {
                    next.push_back(prefix + c);
                }
            }
            res = next;
        }
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    if (digits === '') return [];
    const map = { 2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz' };
    let res = [''];
    for (const d of digits) {
        const letters = map[d];
        const next = [];
        for (const prefix of res) {
            for (const c of letters) {
                next.push(prefix + c);
            }
        }
        res = next;
    }
    return res;
};
```

```ts [TypeScript]
function letterCombinations(digits: string): string[] {
    if (digits === '') return [];
    const map: Record<string, string> = { 2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz' };
    let res: string[] = [''];
    for (const d of digits) {
        const letters = map[d];
        const next: string[] = [];
        for (const prefix of res) {
            for (const c of letters) {
                next.push(prefix + c);
            }
        }
        res = next;
    }
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(3^m * 4^n)`，与回溯法相同，生成全部组合。
- **空间复杂度**：`O(3^m * 4^n)`，队列/列表保存所有组合（不计则为 `O(m + n)` 当前层）。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯（DFS） | `O(3^m * 4^n)` | `O(m + n)` | 暴力枚举所有可能 |
| 队列迭代（BFS / 逐个拼接） | `O(3^m * 4^n)` | `O(3^m * 4^n)` | 无递归栈，空间更优 |

