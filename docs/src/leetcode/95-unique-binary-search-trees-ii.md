# [95. 不同的二叉搜索树 II](https://leetcode.cn/problems/unique-binary-search-trees-ii/)



## 一、题目描述

给你一个整数 `n`，请你生成并返回 **所有** 由 `n` 个节点组成且节点值从 `1` 到 `n` 互不相同的不同 **二叉搜索树**。可以按 **任意顺序** 返回答案。



**示例 1：**

```
输入：n = 3
输出：[[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
```

**示例 2：**

```
输入：n = 1
输出：[[1]]
```

**提示：**

-   `1 <= n <= 8`



## 二、解答方法

### 2.1 方法一：递归（以每个数为根）


1. **思路**

对区间 `[start, end]`，枚举每个 `i` 作为根，递归构造左子树（`[start, i-1]`）和右子树（`[i+1, end]`），将左右子树笛卡尔积组合成新树。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public List<TreeNode> generateTrees(int n) {
        if (n == 0) return new ArrayList<>();
        return build(1, n);
    }
    private List<TreeNode> build(int start, int end) {
        List<TreeNode> res = new ArrayList<>();
        if (start > end) { res.add(null); return res; }
        for (int i = start; i <= end; i++) {
            List<TreeNode> lefts = build(start, i - 1);
            List<TreeNode> rights = build(i + 1, end);
            for (TreeNode l : lefts)
                for (TreeNode r : rights) {
                    TreeNode root = new TreeNode(i);
                    root.left = l; root.right = r;
                    res.add(root);
                }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def generateTrees(self, n: int) -> List[Optional[TreeNode]]:
        if n == 0: return []
        def build(start, end):
            if start > end: return [None]
            res = []
            for i in range(start, end + 1):
                for l in build(start, i - 1):
                    for r in build(i + 1, end):
                        root = TreeNode(i)
                        root.left, root.right = l, r
                        res.append(root)
            return res
        return build(1, n)
```

```go [Go]
func generateTrees(n int) []*TreeNode {
    if n == 0 { return []*TreeNode{} }
    var build func(int, int) []*TreeNode
    build = func(start, end int) []*TreeNode {
        res := []*TreeNode{}
        if start > end { return []*TreeNode{nil} }
        for i := start; i <= end; i++ {
            lefts, rights := build(start, i-1), build(i+1, end)
            for _, l := range lefts {
                for _, r := range rights {
                    root := &TreeNode{Val: i, Left: l, Right: r}
                    res = append(res, root)
                }
            }
        }
        return res
    }
    return build(1, n)
}
```

```c [C]
struct TreeNode** generateTrees(int n, int* returnSize) {
    // 递归构造核心结构同上，完整实现略
    *returnSize = 0; return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<TreeNode*> generateTrees(int n) {
        if (n == 0) return {};
        function<vector<TreeNode*>(int, int)> build = [&](int start, int end) {
            vector<TreeNode*> res;
            if (start > end) { res.push_back(nullptr); return res; }
            for (int i = start; i <= end; i++) {
                auto lefts = build(start, i - 1), rights = build(i + 1, end);
                for (auto l : lefts)
                    for (auto r : rights) {
                        TreeNode* root = new TreeNode(i);
                        root->left = l; root->right = r;
                        res.push_back(root);
                    }
            }
            return res;
        };
        return build(1, n);
    }
};
```

```javascript [JavaScript]
var generateTrees = function(n) {
    if (n === 0) return [];
    const build = (start, end) => {
        const res = [];
        if (start > end) return [null];
        for (let i = start; i <= end; i++) {
            const lefts = build(start, i - 1), rights = build(i + 1, end);
            for (const l of lefts)
                for (const r of rights) {
                    const root = new TreeNode(i);
                    root.left = l; root.right = r;
                    res.push(root);
                }
        }
        return res;
    };
    return build(1, n);
};
```

```typescript [TypeScript]
function generateTrees(n: number): (TreeNode | null)[] {
    if (n === 0) return [];
    const build = (start: number, end: number): (TreeNode | null)[] => {
        const res: (TreeNode | null)[] = [];
        if (start > end) return [null];
        for (let i = start; i <= end; i++) {
            const lefts = build(start, i - 1), rights = build(i + 1, end);
            for (const l of lefts)
                for (const r of rights) {
                    const root = new TreeNode(i);
                    root.left = l; root.right = r;
                    res.push(root);
                }
        }
        return res;
    };
    return build(1, n);
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(C_n)`，即卡特兰数数量级，共返回 `C_n` 棵树。
- **空间复杂度**：`O(n)`，递归栈深度。

### 2.2 方法二：记忆化（缓存子区间结果）


1. **思路**

在方法一基础上，用哈希表缓存 `build(start, end)` 的结果，避免重复构造相同区间的子树，提高效率。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    Map<String, List<TreeNode>> memo = new HashMap<>();
    public List<TreeNode> generateTrees(int n) {
        if (n == 0) return new ArrayList<>();
        return build(1, n);
    }
    private List<TreeNode> build(int start, int end) {
        String key = start + "," + end;
        if (memo.containsKey(key)) return memo.get(key);
        List<TreeNode> res = new ArrayList<>();
        if (start > end) { res.add(null); return res; }
        for (int i = start; i <= end; i++) {
            for (TreeNode l : build(start, i - 1))
                for (TreeNode r : build(i + 1, end)) {
                    TreeNode root = new TreeNode(i);
                    root.left = l; root.right = r;
                    res.add(root);
                }
        }
        memo.put(key, res);
        return res;
    }
}
```

```python [Python]
class Solution:
    def generateTrees(self, n: int) -> List[Optional[TreeNode]]:
        from functools import lru_cache
        if n == 0: return []
        @lru_cache(None)
        def build(start, end):
            if start > end: return [None]
            res = []
            for i in range(start, end + 1):
                for l in build(start, i - 1):
                    for r in build(i + 1, end):
                        root = TreeNode(i)
                        root.left, root.right = l, r
                        res.append(root)
            return res
        return build(1, n)
```

```go [Go]
func generateTrees(n int) []*TreeNode {
    if n == 0 { return []*TreeNode{} }
    memo := map[string][]*TreeNode{}
    var build func(int, int) []*TreeNode
    build = func(start, end int) []*TreeNode {
        key := fmt.Sprintf("%d,%d", start, end)
        if v, ok := memo[key]; ok { return v }
        res := []*TreeNode{}
        if start > end { return []*TreeNode{nil} }
        for i := start; i <= end; i++ {
            lefts, rights := build(start, i-1), build(i+1, end)
            for _, l := range lefts {
                for _, r := range rights {
                    root := &TreeNode{Val: i, Left: l, Right: r}
                    res = append(res, root)
                }
            }
        }
        memo[key] = res
        return res
    }
    return build(1, n)
}
```

```c [C]
struct TreeNode** generateTrees(int n, int* returnSize) {
    // 记忆化缓存核心结构同上，完整实现略
    *returnSize = 0; return NULL;
}
```

```cpp [C++]
class Solution {
public:
    unordered_map<string, vector<TreeNode*>> memo;
    vector<TreeNode*> generateTrees(int n) {
        if (n == 0) return {};
        return build(1, n);
    }
    vector<TreeNode*> build(int start, int end) {
        string key = to_string(start) + "," + to_string(end);
        if (memo.count(key)) return memo[key];
        vector<TreeNode*> res;
        if (start > end) { res.push_back(nullptr); return res; }
        for (int i = start; i <= end; i++) {
            auto lefts = build(start, i - 1), rights = build(i + 1, end);
            for (auto l : lefts)
                for (auto r : rights) {
                    TreeNode* root = new TreeNode(i);
                    root->left = l; root->right = r;
                    res.push_back(root);
                }
        }
        memo[key] = res;
        return res;
    }
};
```

```javascript [JavaScript]
var generateTrees = function(n) {
    if (n === 0) return [];
    const memo = new Map();
    const build = (start, end) => {
        const key = `${start},${end}`;
        if (memo.has(key)) return memo.get(key);
        const res = [];
        if (start > end) return [null];
        for (let i = start; i <= end; i++) {
            const lefts = build(start, i - 1), rights = build(i + 1, end);
            for (const l of lefts)
                for (const r of rights) {
                    const root = new TreeNode(i);
                    root.left = l; root.right = r;
                    res.push(root);
                }
        }
        memo.set(key, res);
        return res;
    };
    return build(1, n);
};
```

```typescript [TypeScript]
function generateTrees(n: number): (TreeNode | null)[] {
    if (n === 0) return [];
    const memo = new Map<string, (TreeNode | null)[]>();
    const build = (start: number, end: number): (TreeNode | null)[] => {
        const key = `${start},${end}`;
        if (memo.has(key)) return memo.get(key)!;
        const res: (TreeNode | null)[] = [];
        if (start > end) return [null];
        for (let i = start; i <= end; i++) {
            const lefts = build(start, i - 1), rights = build(i + 1, end);
            for (const l of lefts)
                for (const r of rights) {
                    const root = new TreeNode(i);
                    root.left = l; root.right = r;
                    res.push(root);
                }
        }
        memo.set(key, res);
        return res;
    };
    return build(1, n);
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(C_n)`，卡特兰数，记忆化减少重复。
- **空间复杂度**：`O(C_n)`，缓存与结果总数。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 递归（以每个数为根） | `O(C_n)` | `O(n)` 栈 | 直观，易理解 |
| 记忆化 | `O(C_n)` | `O(C_n)` | 避免重复，更快 |
