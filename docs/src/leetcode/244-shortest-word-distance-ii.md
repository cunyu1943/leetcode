# [244. 最短单词距离 II](https://leetcode.cn/problems/shortest-word-distance-ii/) [🔒 会员题]



## 一、题目描述

请你设计一个类，接收一个 **字符串数组** `wordsDict`，并可以用方法 `shortest(word1, word2)` 找出数组中 `word1` 和 `word2` 之间的最短距离。

实现类 `WordDistance` ：

-   `WordDistance(String[] wordsDict)` 用字符串数组 `wordsDict` 初始化对象。
-   `int shortest(String word1, String word2)` 返回数组 `wordsDict` 中 `word1` 和 `word2` 之间的最短距离。

**示例：**

```
输入：
["WordDistance", "shortest", "shortest"]
[[["practice", "makes", "perfect", "coding", "makes"]], ["coding", "practice"], ["makes", "coding"]]
输出：
[null, 3, 1]

解释：
WordDistance wordDistance = new WordDistance(["practice", "makes", "perfect", "coding", "makes"]);
wordDistance.shortest("coding", "practice"); // 返回 3
wordDistance.shortest("makes", "coding");    // 返回 1
```

**提示：**

-   `1 <= wordsDict.length <= 3 * 10⁴`
-   `1 <= wordsDict[i].length <= 10`
-   `wordsDict[i]` 由小写英文字母组成
-   `word1` 和 `word2` 在数组 `wordsDict` 中
-   `word1 != word2`
-   `shortest` 的调用次数不超过 `10⁴` 次



## 二、解答方法

### 2.1 方法一：预处理位置哈希表 + 双指针归并

1. **思路**

由于 `shortest` 会被 **多次调用**，不能在每次查询时遍历整个数组（否则 `O(n × q)` 超时）。

预处理：遍历一次数组，用哈希表 `Map<单词, 有序下标列表>` 记录每个单词的所有出现位置。

查询：取出两个单词的有序位置列表，用 **双指针归并** 求最小差值（`O(k1 + k2)`）。

2. **代码实现**

:::::: code-group

```java [Java]
class WordDistance {
    private Map<String, List<Integer>> positions;

    public WordDistance(String[] wordsDict) {
        positions = new HashMap<>();
        for (int i = 0; i < wordsDict.length; i++) {
            positions.computeIfAbsent(wordsDict[i], k -> new ArrayList<>()).add(i);
        }
    }

    public int shortest(String word1, String word2) {
        List<Integer> p1 = positions.get(word1);
        List<Integer> p2 = positions.get(word2);
        int i = 0, j = 0, minDist = Integer.MAX_VALUE;
        while (i < p1.size() && j < p2.size()) {
            minDist = Math.min(minDist, Math.abs(p1.get(i) - p2.get(j)));
            if (p1.get(i) < p2.get(j)) {
                i++;                       // 移动较小的一边，才可能缩小差距
            } else {
                j++;
            }
        }
        return minDist;
    }
}
```

```python [Python]
class WordDistance:

    def __init__(self, wordsDict: List[str]):
        self.positions = {}
        for i, word in enumerate(wordsDict):
            self.positions.setdefault(word, []).append(i)

    def shortest(self, word1: str, word2: str) -> int:
        p1 = self.positions[word1]
        p2 = self.positions[word2]
        i = j = 0
        min_dist = float('inf')
        while i < len(p1) and j < len(p2):
            min_dist = min(min_dist, abs(p1[i] - p2[j]))
            if p1[i] < p2[j]:
                i += 1
            else:
                j += 1
        return min_dist
```

```go [Go]
type WordDistance struct {
    positions map[string][]int
}

func Constructor(wordsDict []string) WordDistance {
    positions := make(map[string][]int)
    for i, word := range wordsDict {
        positions[word] = append(positions[word], i)
    }
    return WordDistance{positions}
}

func (w *WordDistance) Shortest(word1 string, word2 string) int {
    p1, p2 := w.positions[word1], w.positions[word2]
    i, j := 0, 0
    minDist := 1 << 30
    for i < len(p1) && j < len(p2) {
        if d := abs(p1[i] - p2[j]); d < minDist {
            minDist = d
        }
        if p1[i] < p2[j] {
            i++
        } else {
            j++
        }
    }
    return minDist
}

func abs(x int) int { if x < 0 { return -x }; return x }
```

```cpp [C++]
class WordDistance {
private:
    unordered_map<string, vector<int>> positions;
public:
    WordDistance(vector<string>& wordsDict) {
        for (int i = 0; i < wordsDict.size(); i++) {
            positions[wordsDict[i]].push_back(i);
        }
    }

    int shortest(string word1, string word2) {
        const vector<int>& p1 = positions[word1];
        const vector<int>& p2 = positions[word2];
        int i = 0, j = 0, minDist = INT_MAX;
        while (i < p1.size() && j < p2.size()) {
            minDist = min(minDist, abs(p1[i] - p2[j]));
            if (p1[i] < p2[j]) i++;
            else j++;
        }
        return minDist;
    }
};
```

```js [JavaScript]
/**
 * @param {string[]} wordsDict
 */
var WordDistance = function (wordsDict) {
    this.positions = new Map();
    for (let i = 0; i < wordsDict.length; i++) {
        if (!this.positions.has(wordsDict[i])) {
            this.positions.set(wordsDict[i], []);
        }
        this.positions.get(wordsDict[i]).push(i);
    }
};

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
WordDistance.prototype.shortest = function (word1, word2) {
    const p1 = this.positions.get(word1);
    const p2 = this.positions.get(word2);
    let i = 0, j = 0;
    let minDist = Infinity;
    while (i < p1.length && j < p2.length) {
        minDist = Math.min(minDist, Math.abs(p1[i] - p2[j]));
        if (p1[i] < p2[j]) i++;
        else j++;
    }
    return minDist;
};
```

```ts [TypeScript]
class WordDistance {
    private positions: Map<string, number[]>;

    constructor(wordsDict: string[]) {
        this.positions = new Map();
        for (let i = 0; i < wordsDict.length; i++) {
            if (!this.positions.has(wordsDict[i])) {
                this.positions.set(wordsDict[i], []);
            }
            this.positions.get(wordsDict[i])!.push(i);
        }
    }

    shortest(word1: string, word2: string): number {
        const p1 = this.positions.get(word1)!;
        const p2 = this.positions.get(word2)!;
        let i = 0, j = 0;
        let minDist = Infinity;
        while (i < p1.length && j < p2.length) {
            minDist = Math.min(minDist, Math.abs(p1[i] - p2[j]));
            if (p1[i] < p2[j]) i++;
            else j++;
        }
        return minDist;
    }
}
```

::::::

3. **复杂度分析**

- **初始化**：`O(n)` 时间、`O(n)` 空间。
- **单次查询**：`O(k1 + k2)`，k 为对应单词出现次数（可进一步优化为 `O(log k)` 二分）。

## 三、总结

| 阶段 | 复杂度 |
| ---- | ------ |
| 构造（预处理） | `O(n)` |
| 单次 `shortest` | `O(k1 + k2)` |

相比 243 题（单次查询，一次遍历 `O(n)` 即可），本题因为 **查询次数多达 10⁴**，必须做 **预处理**（空间换时间）。

双指针归并的技巧：**总是移动较小位置的那个指针** —— 因为移动较大的只会让差距更大，移动较小的才有可能缩小差距。

进阶优化：若某个单词出现极频繁，可对较短的列表在较长的列表中做 **二分查找**，把查询降到 `O(k log k)`。
