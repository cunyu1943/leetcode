# [212. 单词搜索 II](https://leetcode.cn/problems/word-search-ii/) [🔒 会员题]



## 一、题目描述

给定一个 `m x n` 二维字符网格 `board` 和一个单词（字符串）列表 `words`，返回 **所有** 在二维网格上的单词。

单词必须按照字母顺序，通过 **相邻的单元格** 内的字母构成，其中「相邻」单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母 **不允许被重复使用**。

**示例 1：**

```
输入：board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],
     words = ["oath","pea","eat","rain"]
输出：["eat","oath"]
```

**示例 2：**

```
输入：board = [["a","b"],["c","d"]], words = ["abcb"]
输出：[]
```

**提示：**

-   `m == board.length`
-   `n == board[i].length`
-   `1 <= m, n <= 12`
-   `board[i][j]` 是一个小写英文字母
-   `1 <= words.length <= 3 * 10⁴`
-   `1 <= words[i].length <= 10`
-   `words[i]` 由小写英文字母组成
-   `words` 中的所有字符串互不相同



## 二、解答方法

### 2.1 方法一：Trie + DFS 回溯 + 剪枝

1. **思路**

单词数量多（3 万），逐个单词做 DFS（79 题做法）会超时。优化：

1. 把所有单词插入 **Trie**；
2. 从网格每个格子出发做 DFS 回溯，沿 Trie 边走；若 Trie 中不存在该前缀则 **立即剪枝**；
3. 走到 `isEnd` 节点说明找到一个单词，加入结果并把该节点清空（避免重复搜索）。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    private static final int[][] DIRS = {{1,0},{-1,0},{0,1},{0,-1}};

    public List<String> findWords(char[][] board, String[] words) {
        Trie root = new Trie();
        for (String w : words) root.insert(w);
        Set<String> res = new HashSet<>();
        int m = board.length, n = board[0].length;
        boolean[][] visited = new boolean[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                dfs(board, i, j, root, res, visited);
            }
        }
        return new ArrayList<>(res);
    }

    private void dfs(char[][] board, int i, int j, Trie node, Set<String> res, boolean[][] visited) {
        if (i < 0 || j < 0 || i >= board.length || j >= board[0].length || visited[i][j]) return;
        char c = board[i][j];
        Trie child = node.children[c - 'a'];
        if (child == null) return;          // 前缀不存在，剪枝
        if (child.word != null) {           // 找到完整单词
            res.add(child.word);
        }
        visited[i][j] = true;
        for (int[] d : DIRS) {
            dfs(board, i + d[0], j + d[1], child, res, visited);
        }
        visited[i][j] = false;
    }

    static class Trie {
        Trie[] children = new Trie[26];
        String word;  // 该节点代表的完整单词（null 表示不是单词结尾）
        void insert(String w) {
            Trie node = this;
            for (char c : w.toCharArray()) {
                int idx = c - 'a';
                if (node.children[idx] == null) node.children[idx] = new Trie();
                node = node.children[idx];
            }
            node.word = w;
        }
    }
}
```

```python [Python]
class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        trie = {}
        for w in words:
            node = trie
            for ch in w:
                node = node.setdefault(ch, {})
            node['#'] = w          # 单词结束标记，值为完整单词

        res = set()
        m, n = len(board), len(board[0])

        def dfs(i, j, node):
            ch = board[i][j]
            child = node.get(ch)
            if child is None:
                return
            if '#' in child:
                res.add(child['#'])
            board[i][j] = '@'      # 标记已访问
            for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
                nx, ny = i + dx, j + dy
                if 0 <= nx < m and 0 <= ny < n and board[nx][ny] != '@':
                    dfs(nx, ny, child)
            board[i][j] = ch       # 回溯

        for i in range(m):
            for j in range(n):
                dfs(i, j, trie)
        return list(res)
```

```go [Go]
type TrieNode struct {
    children [26]*TrieNode
    word     string
}

func findWords(board [][]byte, words []string) []string {
    root := &TrieNode{}
    for _, w := range words {
        node := root
        for _, ch := range w {
            idx := ch - 'a'
            if node.children[idx] == nil {
                node.children[idx] = &TrieNode{}
            }
            node = node.children[idx]
        }
        node.word = w
    }
    res := []string{}
    m, n := len(board), len(board[0])
    dirs := [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
    var dfs func(i, j int, node *TrieNode)
    dfs = func(i, j int, node *TrieNode) {
        if i < 0 || j < 0 || i >= m || j >= n || board[i][j] == '@' {
            return
        }
        child := node.children[board[i][j]-'a']
        if child == nil {
            return
        }
        if child.word != "" {
            res = append(res, child.word)
            child.word = "" // 去重
        }
        c := board[i][j]
        board[i][j] = '@'
        for _, d := range dirs {
            dfs(i+d[0], j+d[1], child)
        }
        board[i][j] = c
    }
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            dfs(i, j, root)
        }
    }
    return res
}
```

```cpp [C++]
struct TrieNode {
    vector<TrieNode*> children;
    string word;
    TrieNode() : children(26, nullptr), word("") {}
};

class Solution {
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        TrieNode* root = new TrieNode();
        for (const string& w : words) {
            TrieNode* node = root;
            for (char c : w) {
                int idx = c - 'a';
                if (!node->children[idx]) node->children[idx] = new TrieNode();
                node = node->children[idx];
            }
            node->word = w;
        }
        vector<string> res;
        int m = board.size(), n = board[0].size();
        vector<vector<int>> dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        function<void(int,int,TrieNode*)> dfs = [&](int i, int j, TrieNode* node) {
            if (i < 0 || j < 0 || i >= m || j >= n || board[i][j] == '@') return;
            TrieNode* child = node->children[board[i][j] - 'a'];
            if (!child) return;
            if (!child->word.empty()) {
                res.push_back(child->word);
                child->word = "";
            }
            char c = board[i][j];
            board[i][j] = '@';
            for (auto& d : dirs) dfs(i + d[0], j + d[1], child);
            board[i][j] = c;
        };
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) dfs(i, j, root);
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
    // 用嵌套对象实现 Trie
    const root = {};
    for (const w of words) {
        let node = root;
        for (const ch of w) {
            if (!node[ch]) node[ch] = {};
            node = node[ch];
        }
        node['#'] = w;
    }
    const res = new Set();
    const m = board.length, n = board[0].length;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    const dfs = (i, j, node) => {
        if (i < 0 || j < 0 || i >= m || j >= n || board[i][j] === '@') return;
        const ch = board[i][j];
        const child = node[ch];
        if (!child) return;
        if (child['#'] !== undefined) res.add(child['#']);
        board[i][j] = '@';
        for (const [dx, dy] of dirs) dfs(i + dx, j + dy, child);
        board[i][j] = ch;
    };

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) dfs(i, j, root);
    }
    return [...res];
};
```

```ts [TypeScript]
/**
 * @param {string[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
function findWords(board: string[][], words: string[]): string[] {
    type Trie = { [key: string]: any };
    const root: Trie = {};
    for (const w of words) {
        let node = root;
        for (const ch of w) {
            if (!node[ch]) node[ch] = {};
            node = node[ch];
        }
        node['#'] = w;
    }
    const res = new Set<string>();
    const m = board.length, n = board[0].length;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    const dfs = (i: number, j: number, node: Trie): void => {
        if (i < 0 || j < 0 || i >= m || j >= n || board[i][j] === '@') return;
        const ch = board[i][j];
        const child = node[ch];
        if (!child) return;
        if (child['#'] !== undefined) res.add(child['#']);
        board[i][j] = '@';
        for (const [dx, dy] of dirs) dfs(i + dx, j + dy, child);
        board[i][j] = ch;
    };

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) dfs(i, j, root);
    }
    return [...res];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(m × n × 4 × 3^(L-1))`，L 为单词最大长度，Trie 剪枝后远小于暴力。
- **空间复杂度**：`O(T)`，T 为所有单词的字符总数。

## 三、总结

| 方法 | 复杂度 |
| ---- | ------ |
| 逐词 DFS（79 题做法） | `O(k × m × n × 4^L)`，超时 |
| Trie + DFS 剪枝 | 前缀不存在即停止，推荐 |

优化要点：
1. **Trie 前缀剪枝** —— 网格当前路径不在 Trie 中立即返回；
2. **找到即清空** —— 命中单词后把 `word` 置空或删除节点，避免重复搜索；
3. **原地标记** —— 用 `'@'` 覆盖已访问格子，省去 `visited` 数组。
