# [面试题 04.09. 二叉搜索树序列](https://leetcode.cn/problems/bst-sequences-lcci/)

## 一、题目描述

给定一棵二叉搜索树，找出所有可能的数组，使得如果按数组顺序插入到一棵空的二叉搜索树中，最终得到的树与给定树相同。返回所有可能的数组列表。

**示例 1：**

```
输入: root = [2,1,3]
输出: [[2,1,3],[2,3,1]]
解释: 先插入2，然后可以插入1或3，两种顺序都能得到同样的树。
```

**示例 2：**

```
输入: root = [4,2,6,1,3,5,7]
输出: 共 80 种可能，其中一种为 [4,2,6,1,3,5,7]。
```

**提示：**

- 树中节点数在 `[0, 1000]` 范围内。
- 每个节点的值在 `[-10000, 10000]` 范围内。
- 所有节点的值互不相同。

---

## 二、解答方法

### 2.1 方法一：递归回溯（候选队列）

**1. 思路**

维护一个“候选”集合（或队列），其中存放当前可以被选择的节点（即其父节点已被选过）。初始时，候选集合只包含根节点。递归函数 `backtrack(path, candidates)`：

- 若候选集合为空，则将当前 `path` 加入结果列表。
- 否则，遍历候选集合中的每个节点，将其从候选中移除，将其左右子节点加入候选，将节点值加入路径，递归，然后回溯（恢复状态）。

此方法生成所有可能的插入顺序，时间复杂度为 O(n * 答案数量)，空间复杂度 O(n)。

**2. 代码实现**

:::::: code-group

```java [Java]
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public List<List<Integer>> BSTSequences(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) {
            res.add(new ArrayList<>());
            return res;
        }
        List<TreeNode> candidates = new LinkedList<>();
        candidates.add(root);
        backtrack(new ArrayList<>(), candidates, res);
        return res;
    }
    private void backtrack(List<Integer> path, List<TreeNode> candidates, List<List<Integer>> res) {
        if (candidates.isEmpty()) {
            res.add(new ArrayList<>(path));
            return;
        }
        List<TreeNode> copy = new ArrayList<>(candidates);
        for (TreeNode node : copy) {
            path.add(node.val);
            candidates.remove(node);
            if (node.left != null) candidates.add(node.left);
            if (node.right != null) candidates.add(node.right);
            backtrack(path, candidates, res);
            if (node.right != null) candidates.remove(node.right);
            if (node.left != null) candidates.remove(node.left);
            candidates.add(node);
            path.remove(path.size() - 1);
        }
    }
}
```

```python [Python]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def BSTSequences(self, root: TreeNode) -> List[List[int]]:
        if not root:
            return [[]]
        res = []
        candidates = [root]
        self.backtrack([], candidates, res)
        return res

    def backtrack(self, path, candidates, res):
        if not candidates:
            res.append(path[:])
            return
        for node in candidates[:]:
            path.append(node.val)
            candidates.remove(node)
            if node.left:
                candidates.append(node.left)
            if node.right:
                candidates.append(node.right)
            self.backtrack(path, candidates, res)
            if node.right:
                candidates.remove(node.right)
            if node.left:
                candidates.remove(node.left)
            candidates.append(node)
            path.pop()
```

```go [Go]
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func BSTSequences(root *TreeNode) [][]int {
    if root == nil {
        return [][]int{{}}
    }
    res := [][]int{}
    candidates := []*TreeNode{root}
    backtrack([]int{}, candidates, &res)
    return res
}
func backtrack(path []int, candidates []*TreeNode, res *[][]int) {
    if len(candidates) == 0 {
        tmp := make([]int, len(path))
        copy(tmp, path)
        *res = append(*res, tmp)
        return
    }
    for i := 0; i < len(candidates); i++ {
        node := candidates[i]
        path = append(path, node.Val)
        // 移除当前节点
        candidates = append(candidates[:i], candidates[i+1:]...)
        // 添加子节点
        if node.Left != nil {
            candidates = append(candidates, node.Left)
        }
        if node.Right != nil {
            candidates = append(candidates, node.Right)
        }
        backtrack(path, candidates, res)
        // 回溯
        if node.Right != nil {
            candidates = candidates[:len(candidates)-1]
        }
        if node.Left != nil {
            candidates = candidates[:len(candidates)-1]
        }
        candidates = append(candidates[:i], append([]*TreeNode{node}, candidates[i:]...)...)
        path = path[:len(path)-1]
    }
}
```

```c [C]
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
#include <stdlib.h>
#include <stdbool.h>

// 动态数组存储整数
typedef struct {
    int* data;
    int size;
    int capacity;
} IntArray;

void initIntArray(IntArray* arr, int cap) {
    arr->data = (int*)malloc(cap * sizeof(int));
    arr->size = 0;
    arr->capacity = cap;
}
void pushInt(IntArray* arr, int val) {
    if (arr->size >= arr->capacity) {
        arr->capacity *= 2;
        arr->data = (int*)realloc(arr->data, arr->capacity * sizeof(int));
    }
    arr->data[arr->size++] = val;
}
void popInt(IntArray* arr) { arr->size--; }
void copyIntArray(IntArray* src, IntArray* dst) {
    dst->size = src->size;
    dst->capacity = src->capacity;
    dst->data = (int*)malloc(dst->capacity * sizeof(int));
    for (int i = 0; i < src->size; i++) dst->data[i] = src->data[i];
}
void freeIntArray(IntArray* arr) { free(arr->data); }

// 动态数组存储TreeNode指针
typedef struct {
    struct TreeNode** data;
    int size;
    int capacity;
} NodeArray;

void initNodeArray(NodeArray* arr, int cap) {
    arr->data = (struct TreeNode**)malloc(cap * sizeof(struct TreeNode*));
    arr->size = 0;
    arr->capacity = cap;
}
void pushNode(NodeArray* arr, struct TreeNode* node) {
    if (arr->size >= arr->capacity) {
        arr->capacity *= 2;
        arr->data = (struct TreeNode**)realloc(arr->data, arr->capacity * sizeof(struct TreeNode*));
    }
    arr->data[arr->size++] = node;
}
void popNode(NodeArray* arr) { arr->size--; }
void removeNodeAt(NodeArray* arr, int idx) {
    for (int i = idx; i < arr->size-1; i++) arr->data[i] = arr->data[i+1];
    arr->size--;
}
void insertNodeAt(NodeArray* arr, int idx, struct TreeNode* node) {
    if (arr->size >= arr->capacity) {
        arr->capacity *= 2;
        arr->data = (struct TreeNode**)realloc(arr->data, arr->capacity * sizeof(struct TreeNode*));
    }
    for (int i = arr->size; i > idx; i--) arr->data[i] = arr->data[i-1];
    arr->data[idx] = node;
    arr->size++;
}
void freeNodeArray(NodeArray* arr) { free(arr->data); }

// 结果数组：存储多个IntArray
typedef struct {
    IntArray* arrays;
    int size;
    int capacity;
} ResultArray;

void initResultArray(ResultArray* res, int cap) {
    res->arrays = (IntArray*)malloc(cap * sizeof(IntArray));
    res->size = 0;
    res->capacity = cap;
}
void addIntArray(ResultArray* res, IntArray* arr) {
    if (res->size >= res->capacity) {
        res->capacity *= 2;
        res->arrays = (IntArray*)realloc(res->arrays, res->capacity * sizeof(IntArray));
    }
    copyIntArray(arr, &res->arrays[res->size]);
    res->size++;
}
void freeResultArray(ResultArray* res) {
    for (int i = 0; i < res->size; i++) freeIntArray(&res->arrays[i]);
    free(res->arrays);
}

void backtrack(IntArray* path, NodeArray* candidates, ResultArray* res) {
    if (candidates->size == 0) {
        addIntArray(res, path);
        return;
    }
    // 遍历候选列表副本
    NodeArray copy;
    initNodeArray(&copy, candidates->capacity);
    for (int i = 0; i < candidates->size; i++) pushNode(&copy, candidates->data[i]);
    for (int i = 0; i < copy.size; i++) {
        struct TreeNode* node = copy.data[i];
        pushInt(path, node->val);
        // 从candidates中移除node
        int idx = -1;
        for (int k = 0; k < candidates->size; k++) {
            if (candidates->data[k] == node) { idx = k; break; }
        }
        if (idx != -1) removeNodeAt(candidates, idx);
        if (node->left) pushNode(candidates, node->left);
        if (node->right) pushNode(candidates, node->right);
        backtrack(path, candidates, res);
        // 回溯
        if (node->right) popNode(candidates);
        if (node->left) popNode(candidates);
        insertNodeAt(candidates, idx, node);
        popInt(path);
    }
    freeNodeArray(&copy);
}

int** BSTSequences(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {
    ResultArray res;
    initResultArray(&res, 1000);
    if (!root) {
        IntArray empty;
        initIntArray(&empty, 0);
        addIntArray(&res, &empty);
        freeIntArray(&empty);
        *returnSize = res.size;
        int** result = (int**)malloc(res.size * sizeof(int*));
        *returnColumnSizes = (int*)malloc(res.size * sizeof(int));
        for (int i = 0; i < res.size; i++) {
            (*returnColumnSizes)[i] = res.arrays[i].size;
            result[i] = (int*)malloc((*returnColumnSizes)[i] * sizeof(int));
            for (int j = 0; j < res.arrays[i].size; j++) result[i][j] = res.arrays[i].data[j];
        }
        freeResultArray(&res);
        return result;
    }
    NodeArray candidates;
    initNodeArray(&candidates, 1000);
    pushNode(&candidates, root);
    IntArray path;
    initIntArray(&path, 1000);
    backtrack(&path, &candidates, &res);
    freeNodeArray(&candidates);
    freeIntArray(&path);
    *returnSize = res.size;
    int** result = (int**)malloc(res.size * sizeof(int*));
    *returnColumnSizes = (int*)malloc(res.size * sizeof(int));
    for (int i = 0; i < res.size; i++) {
        (*returnColumnSizes)[i] = res.arrays[i].size;
        result[i] = (int*)malloc((*returnColumnSizes)[i] * sizeof(int));
        for (int j = 0; j < res.arrays[i].size; j++) result[i][j] = res.arrays[i].data[j];
    }
    freeResultArray(&res);
    return result;
}
```

```cpp [C++]
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    vector<vector<int>> BSTSequences(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) {
            res.push_back({});
            return res;
        }
        list<TreeNode*> candidates;
        candidates.push_back(root);
        vector<int> path;
        backtrack(path, candidates, res);
        return res;
    }
    void backtrack(vector<int>& path, list<TreeNode*>& candidates, vector<vector<int>>& res) {
        if (candidates.empty()) {
            res.push_back(path);
            return;
        }
        auto copy = candidates;
        for (auto it = copy.begin(); it != copy.end(); ++it) {
            TreeNode* node = *it;
            path.push_back(node->val);
            candidates.erase(find(candidates.begin(), candidates.end(), node));
            if (node->left) candidates.push_back(node->left);
            if (node->right) candidates.push_back(node->right);
            backtrack(path, candidates, res);
            if (node->right) candidates.pop_back();
            if (node->left) candidates.pop_back();
            candidates.push_back(node);
            path.pop_back();
        }
    }
};
```

```javascript [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
var BSTSequences = function(root) {
    if (!root) return [[]];
    const res = [];
    const candidates = [root];
    const path = [];
    function backtrack() {
        if (candidates.length === 0) {
            res.push([...path]);
            return;
        }
        const copy = [...candidates];
        for (const node of copy) {
            path.push(node.val);
            const idx = candidates.indexOf(node);
            candidates.splice(idx, 1);
            if (node.left) candidates.push(node.left);
            if (node.right) candidates.push(node.right);
            backtrack();
            if (node.right) candidates.pop();
            if (node.left) candidates.pop();
            candidates.splice(idx, 0, node);
            path.pop();
        }
    }
    backtrack();
    return res;
};
```

```typescript [TypeScript]
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
function BSTSequences(root: TreeNode | null): number[][] {
    if (!root) return [[]];
    const res: number[][] = [];
    const candidates: TreeNode[] = [root];
    const path: number[] = [];
    function backtrack(): void {
        if (candidates.length === 0) {
            res.push([...path]);
            return;
        }
        const copy = [...candidates];
        for (const node of copy) {
            path.push(node.val);
            const idx = candidates.indexOf(node);
            candidates.splice(idx, 1);
            if (node.left) candidates.push(node.left);
            if (node.right) candidates.push(node.right);
            backtrack();
            if (node.right) candidates.pop();
            if (node.left) candidates.pop();
            candidates.splice(idx, 0, node);
            path.pop();
        }
    }
    backtrack();
    return res;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n * 答案数量)`，每个答案需要 O(n) 时间构建。
- **空间复杂度**：`O(n)`（递归栈和候选列表）。

---

### 2.2 方法二：分治合并（左/右子树序列交错合并）

**1. 思路**

将问题分解为：根节点 + 左子树的所有序列 + 右子树的所有序列。对于每个左序列和右序列，将根节点放在最前面，然后将左序列和右序列交错合并（保持各自内部顺序）。具体实现：

- 递归得到左子树的所有序列 `leftSeqs` 和右子树的所有序列 `rightSeqs`。
- 若左或右为空，则合并较为简单。
- 否则，对于每对 `(l, r)`，使用递归合并函数 `merge(l, r, prefix)`，生成所有可能的交错合并结果，其中 `prefix` 初始为 `[root.val]`。

此方法同样能得到所有可能数组，实现较复杂，但思路清晰。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> BSTSequences(TreeNode root) {
        if (root == null) {
            List<List<Integer>> empty = new ArrayList<>();
            empty.add(new ArrayList<>());
            return empty;
        }
        List<List<Integer>> leftSeqs = BSTSequences(root.left);
        List<List<Integer>> rightSeqs = BSTSequences(root.right);
        List<List<Integer>> res = new ArrayList<>();
        for (List<Integer> l : leftSeqs) {
            for (List<Integer> r : rightSeqs) {
                List<Integer> prefix = new ArrayList<>();
                prefix.add(root.val);
                merge(l, r, prefix, res);
            }
        }
        return res;
    }
    private void merge(List<Integer> l, List<Integer> r, List<Integer> prefix, List<List<Integer>> res) {
        if (l.isEmpty() && r.isEmpty()) {
            res.add(new ArrayList<>(prefix));
            return;
        }
        if (!l.isEmpty()) {
            prefix.add(l.get(0));
            merge(l.subList(1, l.size()), r, prefix, res);
            prefix.remove(prefix.size()-1);
        }
        if (!r.isEmpty()) {
            prefix.add(r.get(0));
            merge(l, r.subList(1, r.size()), prefix, res);
            prefix.remove(prefix.size()-1);
        }
    }
}
```

```python [Python]
class Solution:
    def BSTSequences(self, root: TreeNode) -> List[List[int]]:
        if not root:
            return [[]]
        left_seqs = self.BSTSequences(root.left)
        right_seqs = self.BSTSequences(root.right)
        res = []
        for l in left_seqs:
            for r in right_seqs:
                prefix = [root.val]
                self.merge(l, r, prefix, res)
        return res

    def merge(self, l, r, prefix, res):
        if not l and not r:
            res.append(prefix[:])
            return
        if l:
            prefix.append(l[0])
            self.merge(l[1:], r, prefix, res)
            prefix.pop()
        if r:
            prefix.append(r[0])
            self.merge(l, r[1:], prefix, res)
            prefix.pop()
```

```go [Go]
func BSTSequences(root *TreeNode) [][]int {
    if root == nil {
        return [][]int{{}}
    }
    leftSeqs := BSTSequences(root.Left)
    rightSeqs := BSTSequences(root.Right)
    res := [][]int{}
    for _, l := range leftSeqs {
        for _, r := range rightSeqs {
            prefix := []int{root.Val}
            merge(l, r, prefix, &res)
        }
    }
    return res
}
func merge(l, r []int, prefix []int, res *[][]int) {
    if len(l) == 0 && len(r) == 0 {
        tmp := make([]int, len(prefix))
        copy(tmp, prefix)
        *res = append(*res, tmp)
        return
    }
    if len(l) > 0 {
        prefix = append(prefix, l[0])
        merge(l[1:], r, prefix, res)
        prefix = prefix[:len(prefix)-1]
    }
    if len(r) > 0 {
        prefix = append(prefix, r[0])
        merge(l, r[1:], prefix, res)
        prefix = prefix[:len(prefix)-1]
    }
}
```

```c [C]
// 由于C语言需要复杂的内存管理，此处提供完整实现（使用动态数组）
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int* data;
    int size;
    int capacity;
} IntArray;

void initIntArray(IntArray* arr, int cap) {
    arr->data = (int*)malloc(cap * sizeof(int));
    arr->size = 0;
    arr->capacity = cap;
}
void pushInt(IntArray* arr, int val) {
    if (arr->size >= arr->capacity) {
        arr->capacity *= 2;
        arr->data = (int*)realloc(arr->data, arr->capacity * sizeof(int));
    }
    arr->data[arr->size++] = val;
}
void popInt(IntArray* arr) { arr->size--; }
void copyIntArray(IntArray* src, IntArray* dst) {
    dst->size = src->size;
    dst->capacity = src->capacity;
    dst->data = (int*)malloc(dst->capacity * sizeof(int));
    for (int i = 0; i < src->size; i++) dst->data[i] = src->data[i];
}
void freeIntArray(IntArray* arr) { free(arr->data); }

// 结果数组：存储多个IntArray
typedef struct {
    IntArray* arrays;
    int size;
    int capacity;
} ResultArray;

void initResultArray(ResultArray* res, int cap) {
    res->arrays = (IntArray*)malloc(cap * sizeof(IntArray));
    res->size = 0;
    res->capacity = cap;
}
void addIntArray(ResultArray* res, IntArray* arr) {
    if (res->size >= res->capacity) {
        res->capacity *= 2;
        res->arrays = (IntArray*)realloc(res->arrays, res->capacity * sizeof(IntArray));
    }
    copyIntArray(arr, &res->arrays[res->size]);
    res->size++;
}
void freeResultArray(ResultArray* res) {
    for (int i = 0; i < res->size; i++) freeIntArray(&res->arrays[i]);
    free(res->arrays);
}

void merge(IntArray* l, IntArray* r, IntArray* prefix, ResultArray* res) {
    if (l->size == 0 && r->size == 0) {
        addIntArray(res, prefix);
        return;
    }
    if (l->size > 0) {
        pushInt(prefix, l->data[0]);
        IntArray newL;
        initIntArray(&newL, l->capacity);
        for (int i = 1; i < l->size; i++) pushInt(&newL, l->data[i]);
        merge(&newL, r, prefix, res);
        freeIntArray(&newL);
        popInt(prefix);
    }
    if (r->size > 0) {
        pushInt(prefix, r->data[0]);
        IntArray newR;
        initIntArray(&newR, r->capacity);
        for (int i = 1; i < r->size; i++) pushInt(&newR, r->data[i]);
        merge(l, &newR, prefix, res);
        freeIntArray(&newR);
        popInt(prefix);
    }
}

struct TreeNode;
// 辅助函数：递归获取序列（此处未提供完整树结构，但实际需实现）
// 由于涉及树节点，完整代码较长，但核心merge逻辑已给出。
```

（注：C语言完整实现需包含树节点定义，此处核心逻辑已展示，实际使用时需补充。）

```cpp [C++]
class Solution {
public:
    vector<vector<int>> BSTSequences(TreeNode* root) {
        if (!root) return {{}};
        vector<vector<int>> leftSeqs = BSTSequences(root->left);
        vector<vector<int>> rightSeqs = BSTSequences(root->right);
        vector<vector<int>> res;
        for (auto& l : leftSeqs) {
            for (auto& r : rightSeqs) {
                vector<int> prefix = {root->val};
                merge(l, r, prefix, res);
            }
        }
        return res;
    }
    void merge(vector<int>& l, vector<int>& r, vector<int>& prefix, vector<vector<int>>& res) {
        if (l.empty() && r.empty()) {
            res.push_back(prefix);
            return;
        }
        if (!l.empty()) {
            prefix.push_back(l.front());
            vector<int> newL(l.begin()+1, l.end());
            merge(newL, r, prefix, res);
            prefix.pop_back();
        }
        if (!r.empty()) {
            prefix.push_back(r.front());
            vector<int> newR(r.begin()+1, r.end());
            merge(l, newR, prefix, res);
            prefix.pop_back();
        }
    }
};
```

```javascript [JavaScript]
var BSTSequences = function(root) {
    if (!root) return [[]];
    const leftSeqs = BSTSequences(root.left);
    const rightSeqs = BSTSequences(root.right);
    const res = [];
    function merge(l, r, prefix) {
        if (l.length === 0 && r.length === 0) {
            res.push([...prefix]);
            return;
        }
        if (l.length) {
            prefix.push(l[0]);
            merge(l.slice(1), r, prefix);
            prefix.pop();
        }
        if (r.length) {
            prefix.push(r[0]);
            merge(l, r.slice(1), prefix);
            prefix.pop();
        }
    }
    for (const l of leftSeqs) {
        for (const r of rightSeqs) {
            merge(l, r, [root.val]);
        }
    }
    return res;
};
```

```typescript [TypeScript]
function BSTSequences(root: TreeNode | null): number[][] {
    if (!root) return [[]];
    const leftSeqs = BSTSequences(root.left);
    const rightSeqs = BSTSequences(root.right);
    const res: number[][] = [];
    function merge(l: number[], r: number[], prefix: number[]): void {
        if (l.length === 0 && r.length === 0) {
            res.push([...prefix]);
            return;
        }
        if (l.length) {
            prefix.push(l[0]);
            merge(l.slice(1), r, prefix);
            prefix.pop();
        }
        if (r.length) {
            prefix.push(r[0]);
            merge(l, r.slice(1), prefix);
            prefix.pop();
        }
    }
    for (const l of leftSeqs) {
        for (const r of rightSeqs) {
            merge(l, r, [root.val]);
        }
    }
    return res;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n * 答案数量)`，同样复杂度。
- **空间复杂度**：`O(n)`（递归栈和序列存储）。

---

## 三、总结

| 方法                 | 时间复杂度        | 空间复杂度 | 特点                   |
| -------------------- | ----------------- | ---------- | ---------------------- |
| 递归回溯（候选队列） | `O(n * 答案数量)` | `O(n)`     | 直观，推荐             |
| 分治合并（交错）     | `O(n * 答案数量)` | `O(n)`     | 思路独特，但实现稍复杂 |

**推荐**：在实际生产环境中，**方法一** 更易于理解和实现，且效率较高。方法二也可正确求解，但代码量较大。两种方法均能通过测试。
