# [245. 最短单词距离 III](https://leetcode.cn/problems/shortest-word-distance-iii/) [🔒 会员题]



## 一、题目描述

给定一个字符串数组 `wordsDict` 和两个字符串 `word1` 和 `word2` ，返回列表中这两个单词之间的最短距离。

注意：`word1` 和 `word2` **可能相同** ，并且它们将分别表示为列表中 **两个独立的单词** 。



**示例 1：**

```
输入：wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "coding"
输出：1
```

**示例 2：**

```
输入：wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "makes"
输出：3
解释：两个 "makes" 分别位于下标 1 和 4，距离为 3。
```

**提示：**

-   `1 <= wordsDict.length <= 10⁵`
-   `1 <= wordsDict[i].length <= 10`
-   `wordsDict[i]` 由小写英文字母组成
-   `word1` 和 `word2` 都在 `wordsDict` 中



## 二、解答方法

### 2.1 方法一：一次遍历（分情况处理）

1. **思路**

与 243 题相同的一次遍历思路，但需处理 `word1 == word2` 的情况：

- **若 `word1 != word2`**：维护 `p1`、`p2` 两个最近位置，遇到就更新，计算 `|p1 - p2|`；
- **若 `word1 == word2`**：只需维护一个「上一次出现位置」`prev`，每次遇到该单词就计算 `i - prev` 并更新 `prev = i`（即相邻两次出现的距离）。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int shortestWordDistance(String[] wordsDict, String word1, String word2) {
        if (word1.equals(word2)) {
            // 相同单词：比较相邻两次出现的距离
            int prev = -1, minDist = Integer.MAX_VALUE;
            for (int i = 0; i < wordsDict.length; i++) {
                if (wordsDict[i].equals(word1)) {
                    if (prev != -1) {
                        minDist = Math.min(minDist, i - prev);
                    }
                    prev = i;
                }
            }
            return minDist;
        }
        // 不同单词：同 243 题
        int p1 = -1, p2 = -1, minDist = Integer.MAX_VALUE;
        for (int i = 0; i < wordsDict.length; i++) {
            if (wordsDict[i].equals(word1)) {
                p1 = i;
            } else if (wordsDict[i].equals(word2)) {
                p2 = i;
            }
            if (p1 != -1 && p2 != -1) {
                minDist = Math.min(minDist, Math.abs(p1 - p2));
            }
        }
        return minDist;
    }
}
```

```python [Python]
class Solution:
    def shortestWordDistance(self, wordsDict: List[str], word1: str, word2: str) -> int:
        if word1 == word2:
            prev = -1
            min_dist = float('inf')
            for i, word in enumerate(wordsDict):
                if word == word1:
                    if prev != -1:
                        min_dist = min(min_dist, i - prev)
                    prev = i
            return min_dist

        p1 = p2 = -1
        min_dist = float('inf')
        for i, word in enumerate(wordsDict):
            if word == word1:
                p1 = i
            elif word == word2:
                p2 = i
            if p1 != -1 and p2 != -1:
                min_dist = min(min_dist, abs(p1 - p2))
        return min_dist
```

```go [Go]
func shortestWordDistance(wordsDict []string, word1 string, word2 string) int {
    if word1 == word2 {
        prev, minDist := -1, len(wordsDict)
        for i, word := range wordsDict {
            if word == word1 {
                if prev != -1 && i-prev < minDist {
                    minDist = i - prev
                }
                prev = i
            }
        }
        return minDist
    }
    p1, p2 := -1, -1
    minDist := len(wordsDict)
    for i, word := range wordsDict {
        if word == word1 {
            p1 = i
        } else if word == word2 {
            p2 = i
        }
        if p1 != -1 && p2 != -1 {
            if d := abs(p1 - p2); d < minDist {
                minDist = d
            }
        }
    }
    return minDist
}

func abs(x int) int { if x < 0 { return -x }; return x }
```

```cpp [C++]
class Solution {
public:
    int shortestWordDistance(vector<string>& wordsDict, string word1, string word2) {
        int n = wordsDict.size(), minDist = n;
        if (word1 == word2) {
            int prev = -1;
            for (int i = 0; i < n; i++) {
                if (wordsDict[i] == word1) {
                    if (prev != -1) minDist = min(minDist, i - prev);
                    prev = i;
                }
            }
            return minDist;
        }
        int p1 = -1, p2 = -1;
        for (int i = 0; i < n; i++) {
            if (wordsDict[i] == word1) p1 = i;
            else if (wordsDict[i] == word2) p2 = i;
            if (p1 != -1 && p2 != -1) minDist = min(minDist, abs(p1 - p2));
        }
        return minDist;
    }
};
```

```js [JavaScript]
/**
 * @param {string[]} wordsDict
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var shortestWordDistance = function (wordsDict, word1, word2) {
    let minDist = Infinity;
    if (word1 === word2) {
        let prev = -1;
        for (let i = 0; i < wordsDict.length; i++) {
            if (wordsDict[i] === word1) {
                if (prev !== -1) minDist = Math.min(minDist, i - prev);
                prev = i;
            }
        }
        return minDist;
    }
    let p1 = -1, p2 = -1;
    for (let i = 0; i < wordsDict.length; i++) {
        if (wordsDict[i] === word1) p1 = i;
        else if (wordsDict[i] === word2) p2 = i;
        if (p1 !== -1 && p2 !== -1) {
            minDist = Math.min(minDist, Math.abs(p1 - p2));
        }
    }
    return minDist;
};
```

```ts [TypeScript]
/**
 * @param {string[]} wordsDict
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
function shortestWordDistance(wordsDict: string[], word1: string, word2: string): number {
    let minDist = Infinity;
    if (word1 === word2) {
        let prev = -1;
        for (let i = 0; i < wordsDict.length; i++) {
            if (wordsDict[i] === word1) {
                if (prev !== -1) minDist = Math.min(minDist, i - prev);
                prev = i;
            }
        }
        return minDist;
    }
    let p1 = -1, p2 = -1;
    for (let i = 0; i < wordsDict.length; i++) {
        if (wordsDict[i] === word1) p1 = i;
        else if (wordsDict[i] === word2) p2 = i;
        if (p1 !== -1 && p2 !== -1) {
            minDist = Math.min(minDist, Math.abs(p1 - p2));
        }
    }
    return minDist;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：统一处理（一次遍历，单分支）

1. **思路**

可把两种情况合并：维护 `p1`、`p2`。遍历时若当前词等于 `word1`，则 `p1 = i`；**同时**若当前词也等于 `word2`，则 `p2` 也需要考虑。技巧是：当 `word1 == word2` 时，把 `p1` 赋给 `p2`（即把上一次出现位置作为「另一个」位置）。

2. **代码实现（Python）**

```python
class Solution:
    def shortestWordDistance(self, wordsDict: List[str], word1: str, word2: str) -> int:
        p1 = p2 = -1
        min_dist = float('inf')
        for i, word in enumerate(wordsDict):
            if word == word1:
                p1 = i
            if word == word2:
                if word1 == word2:
                    p1 = p2      # 关键：把上一次位置让给 p1，当前位置记到 p2
                p2 = i
            if p1 != -1 and p2 != -1:
                min_dist = min(min_dist, abs(p1 - p2))
        return min_dist
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 情况 | 处理方式 |
| ---- | -------- |
| `word1 != word2` | 双指针记录各自最近位置 |
| `word1 == word2` | 记录上一次出现位置，比较相邻距离 |

**关键陷阱**：`word1 == word2` 时，不能用同一个变量既当 `p1` 又当 `p2`（那样距离为 0，违反「两个独立单词」的题意）。必须区分「上一次出现」与「本次出现」。

注意两个 `if`（而非 `if-else`）—— 当 `word1 == word2` 时，同一个位置需要同时更新两者，这正是合并写法中 `p1 = p2` 技巧的由来。
