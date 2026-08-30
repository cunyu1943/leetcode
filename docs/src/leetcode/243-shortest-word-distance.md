# [243. 最短单词距离](https://leetcode.cn/problems/shortest-word-distance/) [🔒 会员题]



## 一、题目描述

给定一个字符串数组 `wordDict` 和两个 **已经存在于该数组中的不同** 字符串 `word1` 和 `word2` 。返回列表中这两个单词之间的 **最短距离** 。

**示例 1：**

```
输入：wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "coding", word2 = "practice"
输出：3
```

**示例 2：**

```
输入：wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "coding"
输出：1
```

**提示：**

-   `1 <= wordsDict.length <= 3 * 10⁴`
-   `1 <= wordsDict[i].length <= 10`
-   `wordsDict[i]` 由小写英文字母组成
-   `word1` 和 `word2` 在 `wordsDict` 中
-   `word1 != word2`



## 二、解答方法

### 2.1 方法一：一次遍历 + 双指针

1. **思路**

遍历数组，用两个变量 `p1`、`p2` 分别记录 `word1` 和 `word2` **最近一次出现的位置**。每当遇到其中一个单词时更新对应位置，并计算 `|p1 - p2|` 更新最小值。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int shortestDistance(String[] wordsDict, String word1, String word2) {
        int p1 = -1, p2 = -1;
        int minDist = Integer.MAX_VALUE;
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
    def shortestDistance(self, wordsDict: List[str], word1: str, word2: str) -> int:
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
func shortestDistance(wordsDict []string, word1 string, word2 string) int {
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
    int shortestDistance(vector<string>& wordsDict, string word1, string word2) {
        int p1 = -1, p2 = -1, minDist = wordsDict.size();
        for (int i = 0; i < wordsDict.size(); i++) {
            if (wordsDict[i] == word1) p1 = i;
            else if (wordsDict[i] == word2) p2 = i;
            if (p1 != -1 && p2 != -1) {
                minDist = min(minDist, abs(p1 - p2));
            }
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
var shortestDistance = function (wordsDict, word1, word2) {
    let p1 = -1, p2 = -1;
    let minDist = Infinity;
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
function shortestDistance(wordsDict: string[], word1: string, word2: string): number {
    let p1 = -1, p2 = -1;
    let minDist = Infinity;
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

### 2.2 方法二：记录位置列表 + 双指针归并

1. **思路**

先遍历一遍，把 `word1` 和 `word2` 的所有出现位置分别存入两个有序数组；再用双指针在两个有序数组上归并求最小差。

适合 **需要多次查询** 的场景（见 244 题）。

2. **代码实现（Python）**

```python
class Solution:
    def shortestDistance(self, wordsDict: List[str], word1: str, word2: str) -> int:
        pos1 = [i for i, w in enumerate(wordsDict) if w == word1]
        pos2 = [i for i, w in enumerate(wordsDict) if w == word2]
        i = j = 0
        min_dist = float('inf')
        while i < len(pos1) and j < len(pos2):
            min_dist = min(min_dist, abs(pos1[i] - pos2[j]))
            if pos1[i] < pos2[j]:
                i += 1
            else:
                j += 1
        return min_dist
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 空间 | 适用 |
| ---- | ---- | ---- |
| 一次遍历双指针 | `O(1)` | 单次查询，推荐 |
| 位置列表 + 归并 | `O(n)` | 为多次查询预处理（244 题） |

本题是「最短单词距离」系列的第一题（单次查询）。后续：
- **244 题**：同一对单词被 **反复查询** → 预处理成位置哈希表；
- **245 题**：`word1` 可能 **等于** `word2` → 需特判，此时只需比较同一单词相邻出现位置之差。
