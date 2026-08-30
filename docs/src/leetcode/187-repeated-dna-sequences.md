# [187. 重复的 DNA 序列](https://leetcode.cn/problems/repeated-dna-sequences/)



## 一、题目描述

DNA 序列由核苷酸 `A`、`C`、`G` 和 `T` 组成，研究 DNA 时，识别在 DNA 分子中重复出现的序列很有用。

给定字符串 `s` ，找出所有长度为 `10` 的 **子串** 中，在 DNA 字符串 `s` 中出现 **超过一次** 的序列。你可以按 **任意顺序** 返回结果。

**示例 1：**

```
输入：s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
输出：["AAAAACCCCC","CCCCCAAAAA"]
解释：子串 "AAAAACCCCC" 和 "CCCCCAAAAA" 均出现两次。
```

**示例 2：**

```
输入：s = "AAAAAAAAAAAAA"
输出：["AAAAAAAAAA"]
解释："AAAAAAAAAA" 出现 3 次。
```

**提示：**

-   `1 <= s.length <= 10⁵`
-   `s` 由 `'A'`、`'C'`、`'G'`、`'T'` 组成

**进阶：** 若直接枚举所有子串并用字符串做哈希表键，空间开销大；可用 **位编码** 将 10 位序列压缩成 20 bit 整数来优化。



## 二、解答方法

### 2.1 方法一：哈希表计数（字符串键）

1. **思路**

滑动窗口枚举所有长度为 10 的子串，用哈希表统计出现次数，出现 ≥ 2 次即加入结果（去重）。

2. **代码实现（Python）**

```python
class Solution:
    def findRepeatedDnaSequences(self, s: str) -> List[str]:
        from collections import Counter
        cnt = Counter(s[i:i + 10] for i in range(len(s) - 9))
        return [k for k, v in cnt.items() if v > 1]
```

### 2.2 方法二：位编码 + 滚动哈希（O(1) 空间优化）

1. **思路**

每个字符用 2 bit 编码（`A=0,C=1,G=2,T=3`），10 位共 20 bit，可用 `int` 表示。用「滚动哈希」：每次左移 2 位并或上新的 2 bit，低 20 位即为当前窗口编码。哈希表存编码计数，避免长字符串键。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public List<String> findRepeatedDnaSequences(String s) {
        List<String> res = new ArrayList<>();
        if (s.length() < 10) return res;
        Map<Character, Integer> map = Map.of('A', 0, 'C', 1, 'G', 2, 'T', 3);
        Map<Integer, Integer> cnt = new HashMap<>();
        int window = 0;
        for (int i = 0; i < s.length(); i++) {
            window = ((window << 2) | map.get(s.charAt(i))) & 0xFFFFF; // 保留低 20 位
            if (i >= 9) {
                cnt.put(window, cnt.getOrDefault(window, 0) + 1);
                if (cnt.get(window) == 2) {
                    res.add(s.substring(i - 9, i + 1));
                }
            }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def findRepeatedDnaSequences(self, s: str) -> List[str]:
        if len(s) < 10:
            return []
        mp = {'A': 0, 'C': 1, 'G': 2, 'T': 3}
        res, cnt, window = [], {}, 0
        for i, ch in enumerate(s):
            window = ((window << 2) | mp[ch]) & 0xFFFFF
            if i >= 9:
                cnt[window] = cnt.get(window, 0) + 1
                if cnt[window] == 2:
                    res.append(s[i - 9:i + 1])
        return res
```

```cpp [C++]
class Solution {
public:
    vector<string> findRepeatedDnaSequences(string s) {
        vector<string> res;
        if (s.size() < 10) return res;
        unordered_map<char, int> mp{{'A',0},{'C',1},{'G',2},{'T',3}};
        unordered_map<int, int> cnt;
        int window = 0;
        for (int i = 0; i < s.size(); i++) {
            window = ((window << 2) | mp[s[i]]) & 0xFFFFF;
            if (i >= 9) {
                if (++cnt[window] == 2) {
                    res.push_back(s.substr(i - 9, 10));
                }
            }
        }
        return res;
    }
};
```

```go [Go]
func findRepeatedDnaSequences(s string) []string {
    res := []string{}
    if len(s) < 10 {
        return res
    }
    mp := map[byte]int{'A': 0, 'C': 1, 'G': 2, 'T': 3}
    cnt := make(map[int]int)
    window := 0
    for i := 0; i < len(s); i++ {
        window = ((window << 2) | mp[s[i]]) & 0xFFFFF
        if i >= 9 {
            cnt[window]++
            if cnt[window] == 2 {
                res = append(res, s[i-9:i+1])
            }
        }
    }
    return res
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function (s) {
    const res = [];
    if (s.length < 10) return res;
    const mp = { A: 0, C: 1, G: 2, T: 3 };
    const cnt = new Map();
    let window = 0;
    for (let i = 0; i < s.length; i++) {
        window = ((window << 2) | mp[s[i]]) & 0xfffff;
        if (i >= 9) {
            cnt.set(window, (cnt.get(window) || 0) + 1);
            if (cnt.get(window) === 2) {
                res.push(s.substring(i - 9, i + 1));
            }
        }
    }
    return res;
};
```

```ts [TypeScript]
/**
 * @param {string} s
 * @return {string[]}
 */
function findRepeatedDnaSequences(s: string): string[] {
    const res: string[] = [];
    if (s.length < 10) return res;
    const mp: Record<string, number> = { A: 0, C: 1, G: 2, T: 3 };
    const cnt = new Map<number, number>();
    let window = 0;
    for (let i = 0; i < s.length; i++) {
        window = ((window << 2) | mp[s[i]]) & 0xfffff;
        if (i >= 9) {
            cnt.set(window, (cnt.get(window) || 0) + 1);
            if (cnt.get(window) === 2) {
                res.push(s.substring(i - 9, i + 1));
            }
        }
    }
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：哈希表 `O(n)`；位编码省去长字符串键存储。

## 三、总结

枚举所有长度为 10 的子串是基础解法；**位编码（2 bit/字符）** 将 20 bit 整数作为哈希键，是本题进阶优化点，面试常考「如何压缩 DNA 序列存储」。
