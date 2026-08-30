# [267. 回文排列 II](https://leetcode.cn/problems/palindrome-permutation-ii/) [🔒 会员题]



## 一、题目描述

给定一个字符串 `s` ，返回其 **重新排列** 组合后可能构成的 **所有回文字符串** ，并去除重复的组合。

你可以按 **任意顺序** 返回答案。如果 `s` 不能形成任何回文排列时，则返回一个 **空列表** 。

**示例 1：**

```
输入: s = "aabb"
输出: ["abba", "baab"]
```

**示例 2：**

```
输入: s = "abc"
输出: []
```

**提示：**

-   `1 <= s.length <= 16`
-   `s` 仅由小写英文字母组成



## 二、解答方法

### 2.1 方法一：统计 + 回溯生成半边

1. **思路**

1. **可行性判断与预处理**：统计每个字符的出现次数。若出现奇数次的字符 `> 1`，直接返回空列表。
2. **构造半边**：把每个字符出现次数的一半（`count // 2`）作为「左半部分」的字符池。若存在出现奇数次的字符，把它作为 **中心字符** `mid`。
3. **回溯全排列生成左半部分**（注意去重：同一字符可能重复出现，需在每层循环内对同一字符只选一次）：
   - 生成一个排列 `half` 后，拼成 `half + mid + reverse(half)` 加入结果。

这样既避免生成所有 `n!` 排列再逐一判断是否为回文（会超时），也天然去重。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    private List<String> res = new ArrayList<>();
    private StringBuilder path = new StringBuilder();
    private int[] count = new int[26];
    private String mid = "";
    private int halfLen = 0;

    public List<String> generatePalindromes(String s) {
        // 1. 统计频次并检查可行性
        for (char c : s.toCharArray()) count[c - 'a']++;
        int odd = 0;
        for (int i = 0; i < 26; i++) {
            if (count[i] % 2 == 1) {
                odd++;
                mid = String.valueOf((char) ('a' + i));
            }
            if (odd > 1) return res;        // 无法构成回文
            halfLen += count[i] / 2;
        }
        // 2. 回溯生成左半部分
        backtrack();
        return res;
    }

    private void backtrack() {
        if (path.length() == halfLen) {
            String half = path.toString();
            res.add(half + mid + new StringBuilder(half).reverse());
            return;
        }
        for (int i = 0; i < 26; i++) {
            if (count[i] / 2 > 0) {         // 该字符在半边还有剩余
                count[i] -= 2;              // 用掉一对其中的半个
                path.append((char) ('a' + i));
                backtrack();
                path.deleteCharAt(path.length() - 1);
                count[i] += 2;              // 回溯
            }
        }
    }
}
```

```python [Python]
class Solution:
    def generatePalindromes(self, s: str) -> List[str]:
        from collections import Counter
        count = Counter(s)

        # 1. 可行性判断 + 取中心字符
        mid = ''
        for ch, v in count.items():
            if v % 2 == 1:
                if mid:                     # 已有奇数字符 → 无法构成回文
                    return []
                mid = ch

        # 2. 构造半边字符池（每个字符取一半）
        half_pool = []
        for ch, v in count.items():
            half_pool.extend([ch] * (v // 2))

        res = []
        used = [False] * len(half_pool)

        # 3. 回溯生成半边全排列（按层去重）
        def backtrack(path):
            if len(path) == len(half_pool):
                half = ''.join(path)
                res.append(half + mid + half[::-1])
                return
            prev = None
            for i in range(len(half_pool)):
                if used[i] or half_pool[i] == prev:
                    continue                # 同层跳过重复字符
                used[i] = True
                prev = half_pool[i]
                path.append(half_pool[i])
                backtrack(path)
                path.pop()
                used[i] = False

        backtrack([])
        return res
```

```go [Go]
func generatePalindromes(s string) []string {
    count := make([]int, 26)
    for _, c := range s {
        count[c-'a']++
    }
    mid := ""
    halfLen := 0
    odd := 0
    for i := 0; i < 26; i++ {
        if count[i]%2 == 1 {
            odd++
            mid = string(rune('a' + i))
        }
        if odd > 1 {
            return []string{}
        }
        halfLen += count[i] / 2
    }
    res := []string{}
    path := []byte{}
    var backtrack func()
    backtrack = func() {
        if len(path) == halfLen {
            half := string(path)
            // 反转 half
            rev := []byte(half)
            for i, j := 0, len(rev)-1; i < j; i, j = i+1, j-1 {
                rev[i], rev[j] = rev[j], rev[i]
            }
            res = append(res, half+mid+string(rev))
            return
        }
        for i := 0; i < 26; i++ {
            if count[i]/2 > 0 {
                count[i] -= 2
                path = append(path, byte('a'+i))
                backtrack()
                path = path[:len(path)-1]
                count[i] += 2
            }
        }
    }
    backtrack()
    return res
}
```

```cpp [C++]
class Solution {
public:
    vector<string> generatePalindromes(string s) {
        vector<int> count(26, 0);
        for (char c : s) count[c - 'a']++;
        string mid = "";
        int halfLen = 0, odd = 0;
        for (int i = 0; i < 26; i++) {
            if (count[i] % 2) {
                odd++;
                mid = string(1, 'a' + i);
            }
            if (odd > 1) return {};
            halfLen += count[i] / 2;
        }
        vector<string> res;
        string path;
        function<void()> backtrack = [&]() {
            if ((int)path.size() == halfLen) {
                string half = path;
                string rev = half;
                reverse(rev.begin(), rev.end());
                res.push_back(half + mid + rev);
                return;
            }
            for (int i = 0; i < 26; i++) {
                if (count[i] / 2 > 0) {
                    count[i] -= 2;
                    path.push_back('a' + i);
                    backtrack();
                    path.pop_back();
                    count[i] += 2;
                }
            }
        };
        backtrack();
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {string[]}
 */
var generatePalindromes = function (s) {
    const count = new Array(26).fill(0);
    for (const c of s) count[c.charCodeAt(0) - 97]++;
    let mid = '';
    let halfLen = 0, odd = 0;
    for (let i = 0; i < 26; i++) {
        if (count[i] % 2 === 1) {
            odd++;
            mid = String.fromCharCode(97 + i);
        }
        if (odd > 1) return [];
        halfLen += Math.floor(count[i] / 2);
    }
    const res = [];
    let path = '';
    const backtrack = () => {
        if (path.length === halfLen) {
            res.push(path + mid + path.split('').reverse().join(''));
            return;
        }
        for (let i = 0; i < 26; i++) {
            if (Math.floor(count[i] / 2) > 0) {
                count[i] -= 2;
                path += String.fromCharCode(97 + i);
                backtrack();
                path = path.slice(0, -1);
                count[i] += 2;
            }
        }
    };
    backtrack();
    return res;
};
```

```ts [TypeScript]
/**
 * @param {string} s
 * @return {string[]}
 */
function generatePalindromes(s: string): string[] {
    const count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) count[s.charCodeAt(i) - 97]++;
    let mid = '';
    let halfLen = 0, odd = 0;
    for (let i = 0; i < 26; i++) {
        if (count[i] % 2 === 1) {
            odd++;
            mid = String.fromCharCode(97 + i);
        }
        if (odd > 1) return [];
        halfLen += Math.floor(count[i] / 2);
    }
    const res: string[] = [];
    let path = '';
    const backtrack = (): void => {
        if (path.length === halfLen) {
            res.push(path + mid + path.split('').reverse().join(''));
            return;
        }
        for (let i = 0; i < 26; i++) {
            if (Math.floor(count[i] / 2) > 0) {
                count[i] -= 2;
                path += String.fromCharCode(97 + i);
                backtrack();
                path = path.slice(0, -1);
                count[i] += 2;
            }
        }
    };
    backtrack();
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O((n/2)! × n)`，即半边全排列数量级（比全串排列 `n!` 少得多）。
- **空间复杂度**：`O(n)`（递归栈与 path）。

## 三、总结

本题是 `266. 回文排列`（判断可行性）的升级版，核心优化是 **「只排列半边 + 镜像补全」**：

| 步骤 | 说明 |
| ---- | ---- |
| 1. 频次统计 | 奇数次字符 > 1 → 返回空列表 |
| 2. 取中心字符 | 唯一的奇数次字符（若有）作为 `mid` |
| 3. 构造半边池 | 每个字符取 `count // 2` 个 |
| 4. 回溯全排列 | 生成半边排列 `half`，拼成 `half + mid + reverse(half)` |

两个关键细节：

1. **去重**：半边中可能有重复字符（如 `"aabb"` 的半边是 `['a','b']`，但 `"aaaabb"` 的半边是 `['a','a','b']`），回溯时必须 **在同层跳过已用过的相同字符**，否则产生重复结果；
2. **不要生成全排列再筛选回文** —— `n` 达 16 时 `16!` 会超时，直接构造半边是唯一可行方案。
