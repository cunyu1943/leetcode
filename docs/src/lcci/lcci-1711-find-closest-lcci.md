# [面试题 17.11. 单词距离](https://leetcode.cn/problems/find-closest-lcci/)

## 一、题目描述

有个内含单词的超大文本文件，给定任意两个单词，找出在这个文件中这两个单词的最短距离（相隔的单词数）。如果寻找过程在这个文件中会重复多次，而每次寻找的单词不同，你能对此优化吗？

**示例：**

```
输入：words = ["I","am","a","student","from","a","university","in","a","city"], word1 = "a", word2 = "student"
输出：1
```

---

## 二、解答方法

### 2.1 方法一：单次遍历（双指针）

**1. 思路**

遍历数组，记录 `word1` 与 `word2` 最近一次出现的位置 `i`、`j`，每当遇到其中一个词就更新对应位置并与另一个位置求距离，维护最小距离。时间 `O(n)`，适合一题一问。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int findClosest(String[] words, String word1, String word2) {
        int i = -1, j = -1, min = Integer.MAX_VALUE;
        for (int k = 0; k < words.length; k++) {
            if (words[k].equals(word1)) i = k;
            else if (words[k].equals(word2)) j = k;
            if (i != -1 && j != -1) min = Math.min(min, Math.abs(i - j));
        }
        return min;
    }
}
```

```python [Python]
class Solution:
    def findClosest(self, words: List[str], word1: str, word2: str) -> int:
        i = j = -1
        ans = len(words)
        for k, w in enumerate(words):
            if w == word1:
                i = k
            elif w == word2:
                j = k
            if i != -1 and j != -1:
                ans = min(ans, abs(i - j))
        return ans
```

```go [Go]
func findClosest(words []string, word1 string, word2 string) int {
    i, j, ans := -1, -1, len(words)
    for k, w := range words {
        if w == word1 { i = k } else if w == word2 { j = k }
        if i != -1 && j != -1 {
            if d := abs(i - j); d < ans { ans = d }
        }
    }
    return ans
}
func abs(x int) int { if x < 0 { return -x }; return x }
```

```c [C]
int findClosest(char** words, int wordsSize, char* word1, char* word2) {
    int i = -1, j = -1, ans = wordsSize;
    for (int k = 0; k < wordsSize; k++) {
        if (strcmp(words[k], word1) == 0) i = k;
        else if (strcmp(words[k], word2) == 0) j = k;
        if (i != -1 && j != -1) {
            int d = abs(i - j);
            if (d < ans) ans = d;
        }
    }
    return ans;
}
```

```cpp [C++]
class Solution {
public:
    int findClosest(vector<string>& words, string word1, string word2) {
        int i = -1, j = -1, ans = words.size();
        for (int k = 0; k < words.size(); k++) {
            if (words[k] == word1) i = k;
            else if (words[k] == word2) j = k;
            if (i != -1 && j != -1) ans = min(ans, abs(i - j));
        }
        return ans;
    }
};
```

```javascript [JavaScript]
var findClosest = function(words, word1, word2) {
    let i = -1, j = -1, ans = words.length;
    for (let k = 0; k < words.length; k++) {
        if (words[k] === word1) i = k;
        else if (words[k] === word2) j = k;
        if (i !== -1 && j !== -1) ans = Math.min(ans, Math.abs(i - j));
    }
    return ans;
};
```

```typescript [TypeScript]
function findClosest(words: string[], word1: string, word2: string): number {
    let i = -1, j = -1, ans = words.length;
    for (let k = 0; k < words.length; k++) {
        if (words[k] === word1) i = k;
        else if (words[k] === word2) j = k;
        if (i !== -1 && j !== -1) ans = Math.min(ans, Math.abs(i - j));
    }
    return ans;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：预处理索引（多次查询优化）

**1. 思路**

若查询会重复多次且单词不同，可预先把每个单词出现的所有下标存入哈希表，查询时对两个单词的下标列表做双指针归并，求最小差。预处理 `O(n)`，每次查询 `O(a + b)`（a、b 为两词出现次数）。

**2. 代码实现**

::::::: code-group

```java [Java]
class WordDistance {
    Map<String, List<Integer>> map = new HashMap<>();
    public WordDistance(String[] words) {
        for (int i = 0; i < words.length; i++) {
            map.computeIfAbsent(words[i], k -> new ArrayList<>()).add(i);
        }
    }
    public int findClosest(String word1, String word2) {
        List<Integer> l1 = map.get(word1), l2 = map.get(word2);
        int i = 0, j = 0, min = Integer.MAX_VALUE;
        while (i < l1.size() && j < l2.size()) {
            min = Math.min(min, Math.abs(l1.get(i) - l2.get(j)));
            if (l1.get(i) < l2.get(j)) i++; else j++;
        }
        return min;
    }
}
```

```python [Python]
class WordDistance:
    def __init__(self, words: List[str]):
        from collections import defaultdict
        self.mp = defaultdict(list)
        for i, w in enumerate(words):
            self.mp[w].append(i)
    def findClosest(self, word1: str, word2: str) -> int:
        l1, l2 = self.mp[word1], self.mp[word2]
        i = j = 0
        ans = float('inf')
        while i < len(l1) and j < len(l2):
            ans = min(ans, abs(l1[i] - l2[j]))
            if l1[i] < l2[j]: i += 1
            else: j += 1
        return ans
```

```cpp [C++]
class WordDistance {
    unordered_map<string, vector<int>> mp;
public:
    WordDistance(vector<string>& words) {
        for (int i = 0; i < words.size(); i++) mp[words[i]].push_back(i);
    }
    int findClosest(string word1, string word2) {
        vector<int>& l1 = mp[word1]; vector<int>& l2 = mp[word2];
        int i = 0, j = 0, ans = INT_MAX;
        while (i < l1.size() && j < l2.size()) {
            ans = min(ans, abs(l1[i] - l2[j]));
            if (l1[i] < l2[j]) i++; else j++;
        }
        return ans;
    }
};
```

```javascript [JavaScript]
var WordDistance = function(words) {
    this.mp = {};
    for (let i = 0; i < words.length; i++) {
        (this.mp[words[i]] = this.mp[words[i]] || []).push(i);
    }
};
WordDistance.prototype.findClosest = function(word1, word2) {
    const l1 = this.mp[word1], l2 = this.mp[word2];
    let i = 0, j = 0, ans = Infinity;
    while (i < l1.length && j < l2.length) {
        ans = Math.min(ans, Math.abs(l1[i] - l2[j]));
        if (l1[i] < l2[j]) i++; else j++;
    }
    return ans;
};
```

```typescript [TypeScript]
class WordDistance {
    private mp: Record<string, number[]> = {};
    constructor(words: string[]) {
        for (let i = 0; i < words.length; i++) {
            (this.mp[words[i]] = this.mp[words[i]] || []).push(i);
        }
    }
    findClosest(word1: string, word2: string): number {
        const l1 = this.mp[word1], l2 = this.mp[word2];
        let i = 0, j = 0, ans = Infinity;
        while (i < l1.length && j < l2.length) {
            ans = Math.min(ans, Math.abs(l1[i] - l2[j]));
            if (l1[i] < l2[j]) i++; else j++;
        }
        return ans;
    }
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：预处理 `O(n)`，每次查询 `O(a + b)`。
- **空间复杂度**：`O(n)`。

---

## 三、总结

| 方法           | 时间复杂度        | 空间复杂度 | 特点                       |
| -------------- | ----------------- | ---------- | -------------------------- |
| 单次遍历       | `O(n)`            | `O(1)`     | 一次查询最优               |
| 预处理索引     | 预处理 `O(n)`, 查 `O(a+b)` | `O(n)` | 多次查询高效，推荐         |

**推荐**：单次查询用双指针；多次不同单词查询用预处理索引 + 归并。
