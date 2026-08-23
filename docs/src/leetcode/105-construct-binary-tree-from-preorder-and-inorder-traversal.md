# [105. 从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)



## 一、题目描述

给定两个整数数组 `preorder` 和 `inorder`，其中 `preorder` 是二叉树的**先序遍历**，`inorder` 是同一棵树的**中序遍历**，请构造二叉树并返回其根节点。

**示例 1：**

```
输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
输出: [3,9,20,null,null,15,7]
```

**示例 2：**

```
输入: preorder = [-1], inorder = [-1]
输出: [-1]
```

**提示：**

-   `1 <= preorder.length <= 3000`
-   `inorder.length == preorder.length`
-   `-3000 <= preorder[i], inorder[i] <= 3000`
-   `preorder` 和 `inorder` 均无重复元素



## 二、解答方法

### 2.1 方法一：递归 + 哈希表

1. **思路**

先序遍历的第一个元素一定是根节点。在中序遍历中找到根节点的位置 `idx`，其左侧为左子树的中序、右侧为右子树的中序。根据左右子树节点个数，可在先序中切分出左右子树的先序区间。

用哈希表记录中序值到下标的映射，避免每次线性查找根节点位置。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private Map<Integer, Integer> map = new HashMap<>();
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) map.put(inorder[i], i);
        return dfs(preorder, inorder, 0, preorder.length - 1, 0, inorder.length - 1);
    }
    private TreeNode dfs(int[] pre, int[] in, int pl, int pr, int il, int ir) {
        if (pl > pr) return null;
        int rootVal = pre[pl];
        int idx = map.get(rootVal);
        int leftSize = idx - il;
        TreeNode root = new TreeNode(rootVal);
        root.left = dfs(pre, in, pl + 1, pl + leftSize, il, idx - 1);
        root.right = dfs(pre, in, pl + leftSize + 1, pr, idx + 1, ir);
        return root;
    }
}
```

```python [Python]
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        mp = {val: i for i, val in enumerate(inorder)}
        def dfs(pl, pr, il, ir):
            if pl > pr: return None
            root_val = preorder[pl]
            idx = mp[root_val]
            left_size = idx - il
            root = TreeNode(root_val)
            root.left = dfs(pl + 1, pl + left_size, il, idx - 1)
            root.right = dfs(pl + left_size + 1, pr, idx + 1, ir)
            return root
        return dfs(0, len(preorder) - 1, 0, len(inorder) - 1)
```

```go [Go]
func buildTree(preorder []int, inorder []int) *TreeNode {
    mp := make(map[int]int)
    for i, v := range inorder { mp[v] = i }
    var dfs func(int, int, int, int) *TreeNode
    dfs = func(pl, pr, il, ir int) *TreeNode {
        if pl > pr { return nil }
        rootVal := preorder[pl]
        idx := mp[rootVal]
        leftSize := idx - il
        root := &TreeNode{Val: rootVal}
        root.Left = dfs(pl+1, pl+leftSize, il, idx-1)
        root.Right = dfs(pl+leftSize+1, pr, idx+1, ir)
        return root
    }
    return dfs(0, len(preorder)-1, 0, len(inorder)-1)
}
```

```c [C]
struct TreeNode* dfs(int* pre, int* in, int pl, int pr, int il, int ir, int* map) {
    if (pl > pr) return NULL;
    int rootVal = pre[pl];
    int idx = map[rootVal + 3000];
    int leftSize = idx - il;
    struct TreeNode* root = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->val = rootVal; root->left = root->right = NULL;
    root->left = dfs(pre, in, pl + 1, pl + leftSize, il, idx - 1, map);
    root->right = dfs(pre, in, pl + leftSize + 1, pr, idx + 1, ir, map);
    return root;
}
struct TreeNode* buildTree(int* preorder, int preorderSize, int* inorder, int inorderSize) {
    int map[6000];
    for (int i = 0; i < inorderSize; i++) map[inorder[i] + 3000] = i;
    return dfs(preorder, inorder, 0, preorderSize - 1, 0, inorderSize - 1, map);
}
```

```cpp [C++]
class Solution {
public:
    unordered_map<int, int> map;
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        for (int i = 0; i < inorder.size(); i++) map[inorder[i]] = i;
        return dfs(preorder, inorder, 0, preorder.size() - 1, 0, inorder.size() - 1);
    }
    TreeNode* dfs(vector<int>& pre, vector<int>& in, int pl, int pr, int il, int ir) {
        if (pl > pr) return nullptr;
        int rootVal = pre[pl];
        int idx = map[rootVal];
        int leftSize = idx - il;
        TreeNode* root = new TreeNode(rootVal);
        root->left = dfs(pre, in, pl + 1, pl + leftSize, il, idx - 1);
        root->right = dfs(pre, in, pl + leftSize + 1, pr, idx + 1, ir);
        return root;
    }
};
```

```js [JavaScript]
var buildTree = function (preorder, inorder) {
    const map = new Map();
    inorder.forEach((v, i) => map.set(v, i));
    const dfs = (pl, pr, il, ir) => {
        if (pl > pr) return null;
        const rootVal = preorder[pl];
        const idx = map.get(rootVal);
        const leftSize = idx - il;
        const root = new TreeNode(rootVal);
        root.left = dfs(pl + 1, pl + leftSize, il, idx - 1);
        root.right = dfs(pl + leftSize + 1, pr, idx + 1, ir);
        return root;
    };
    return dfs(0, preorder.length - 1, 0, inorder.length - 1);
};
```

```ts [TypeScript]
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    const map = new Map<number, number>();
    inorder.forEach((v, i) => map.set(v, i));
    const dfs = (pl: number, pr: number, il: number, ir: number): TreeNode | null => {
        if (pl > pr) return null;
        const rootVal = preorder[pl];
        const idx = map.get(rootVal)!;
        const leftSize = idx - il;
        const root = new TreeNode(rootVal);
        root.left = dfs(pl + 1, pl + leftSize, il, idx - 1);
        root.right = dfs(pl + leftSize + 1, pr, idx + 1, ir);
        return root;
    };
    return dfs(0, preorder.length - 1, 0, inorder.length - 1);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(n)`，哈希表与递归栈。

### 2.2 方法二：递归 + 线性查找

1. **思路**

不借助哈希表，直接在中序数组中线性查找根节点位置。代码更短，但每次查找为 `O(n)`，整体退化为 `O(n^2)`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return dfs(preorder, inorder, 0, preorder.length - 1, 0, inorder.length - 1);
    }
    private TreeNode dfs(int[] pre, int[] in, int pl, int pr, int il, int ir) {
        if (pl > pr) return null;
        int rootVal = pre[pl];
        int idx = il;
        while (in[idx] != rootVal) idx++;
        int leftSize = idx - il;
        TreeNode root = new TreeNode(rootVal);
        root.left = dfs(pre, in, pl + 1, pl + leftSize, il, idx - 1);
        root.right = dfs(pre, in, pl + leftSize + 1, pr, idx + 1, ir);
        return root;
    }
}
```

```python [Python]
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        def dfs(pl, pr, il, ir):
            if pl > pr: return None
            root_val = preorder[pl]
            idx = inorder.index(root_val)
            left_size = idx - il
            root = TreeNode(root_val)
            root.left = dfs(pl + 1, pl + left_size, il, idx - 1)
            root.right = dfs(pl + left_size + 1, pr, idx + 1, ir)
            return root
        return dfs(0, len(preorder) - 1, 0, len(inorder) - 1)
```

```go [Go]
func buildTree(preorder []int, inorder []int) *TreeNode {
    var dfs func(int, int, int, int) *TreeNode
    dfs = func(pl, pr, il, ir int) *TreeNode {
        if pl > pr { return nil }
        rootVal := preorder[pl]
        idx := il
        for inorder[idx] != rootVal { idx++ }
        leftSize := idx - il
        root := &TreeNode{Val: rootVal}
        root.Left = dfs(pl+1, pl+leftSize, il, idx-1)
        root.Right = dfs(pl+leftSize+1, pr, idx+1, ir)
        return root
    }
    return dfs(0, len(preorder)-1, 0, len(inorder)-1)
}
```

```c [C]
struct TreeNode* dfs(int* pre, int* in, int pl, int pr, int il, int ir) {
    if (pl > pr) return NULL;
    int rootVal = pre[pl];
    int idx = il;
    while (in[idx] != rootVal) idx++;
    int leftSize = idx - il;
    struct TreeNode* root = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->val = rootVal; root->left = root->right = NULL;
    root->left = dfs(pre, in, pl + 1, pl + leftSize, il, idx - 1);
    root->right = dfs(pre, in, pl + leftSize + 1, pr, idx + 1, ir);
    return root;
}
struct TreeNode* buildTree(int* preorder, int preorderSize, int* inorder, int inorderSize) {
    return dfs(preorder, inorder, 0, preorderSize - 1, 0, inorderSize - 1);
}
```

```cpp [C++]
class Solution {
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        return dfs(preorder, inorder, 0, preorder.size() - 1, 0, inorder.size() - 1);
    }
    TreeNode* dfs(vector<int>& pre, vector<int>& in, int pl, int pr, int il, int ir) {
        if (pl > pr) return nullptr;
        int rootVal = pre[pl];
        int idx = il;
        while (in[idx] != rootVal) idx++;
        int leftSize = idx - il;
        TreeNode* root = new TreeNode(rootVal);
        root->left = dfs(pre, in, pl + 1, pl + leftSize, il, idx - 1);
        root->right = dfs(pre, in, pl + leftSize + 1, pr, idx + 1, ir);
        return root;
    }
};
```

```js [JavaScript]
var buildTree = function (preorder, inorder) {
    const dfs = (pl, pr, il, ir) => {
        if (pl > pr) return null;
        const rootVal = preorder[pl];
        let idx = il;
        while (inorder[idx] !== rootVal) idx++;
        const leftSize = idx - il;
        const root = new TreeNode(rootVal);
        root.left = dfs(pl + 1, pl + leftSize, il, idx - 1);
        root.right = dfs(pl + leftSize + 1, pr, idx + 1, ir);
        return root;
    };
    return dfs(0, preorder.length - 1, 0, inorder.length - 1);
};
```

```ts [TypeScript]
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    const dfs = (pl: number, pr: number, il: number, ir: number): TreeNode | null => {
        if (pl > pr) return null;
        const rootVal = preorder[pl];
        let idx = il;
        while (inorder[idx] !== rootVal) idx++;
        const leftSize = idx - il;
        const root = new TreeNode(rootVal);
        root.left = dfs(pl + 1, pl + leftSize, il, idx - 1);
        root.right = dfs(pl + leftSize + 1, pr, idx + 1, ir);
        return root;
    };
    return dfs(0, preorder.length - 1, 0, inorder.length - 1);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n^2)`，每层递归线性查找根。
- **空间复杂度**：`O(n)`，递归栈。

### 2.3 方法三：迭代（栈）

1. **思路**

用栈模拟递归。先序第一个节点是根，入栈。遍历先序（从第二个起），每次取当前节点 `cur`，依据中序当前指针判断 `cur` 是栈顶的左孩子还是右孩子：

- 若栈顶值不等于 `inorder[inIdx]`，`cur` 是栈顶的左孩子；
- 否则不断弹出栈顶，直到栈顶值不等于 `inorder[inIdx]`，最后弹出的节点是 `cur` 的父节点，`cur` 为其右孩子。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        if (preorder.length == 0) return null;
        TreeNode root = new TreeNode(preorder[0]);
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        int inIdx = 0;
        for (int i = 1; i < preorder.length; i++) {
            TreeNode cur = new TreeNode(preorder[i]);
            TreeNode top = stack.peek();
            if (top.val != inorder[inIdx]) {
                top.left = cur;
            } else {
                while (!stack.isEmpty() && stack.peek().val == inorder[inIdx]) {
                    top = stack.pop();
                    inIdx++;
                }
                top.right = cur;
            }
            stack.push(cur);
        }
        return root;
    }
}
```

```python [Python]
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        if not preorder: return None
        root = TreeNode(preorder[0])
        stack = [root]
        in_idx = 0
        for i in range(1, len(preorder)):
            cur = TreeNode(preorder[i])
            top = stack[-1]
            if top.val != inorder[in_idx]:
                top.left = cur
            else:
                while stack and stack[-1].val == inorder[in_idx]:
                    top = stack.pop()
                    in_idx += 1
                top.right = cur
            stack.append(cur)
        return root
```

```go [Go]
func buildTree(preorder []int, inorder []int) *TreeNode {
    if len(preorder) == 0 { return nil }
    root := &TreeNode{Val: preorder[0]}
    stack := []*TreeNode{root}
    inIdx := 0
    for i := 1; i < len(preorder); i++ {
        cur := &TreeNode{Val: preorder[i]}
        top := stack[len(stack)-1]
        if top.Val != inorder[inIdx] {
            top.Left = cur
        } else {
            for len(stack) > 0 && stack[len(stack)-1].Val == inorder[inIdx] {
                top = stack[len(stack)-1]
                stack = stack[:len(stack)-1]
                inIdx++
            }
            top.Right = cur
        }
        stack = append(stack, cur)
    }
    return root
}
```

```c [C]
struct TreeNode* buildTree(int* preorder, int preorderSize, int* inorder, int inorderSize) {
    if (preorderSize == 0) return NULL;
    struct TreeNode* root = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->val = preorder[0]; root->left = root->right = NULL;
    struct TreeNode* stack[preorderSize];
    int top = 0; stack[top++] = root;
    int inIdx = 0;
    for (int i = 1; i < preorderSize; i++) {
        struct TreeNode* cur = (struct TreeNode*)malloc(sizeof(struct TreeNode));
        cur->val = preorder[i]; cur->left = cur->right = NULL;
        struct TreeNode* topNode = stack[top-1];
        if (topNode->val != inorder[inIdx]) {
            topNode->left = cur;
        } else {
            while (top > 0 && stack[top-1]->val == inorder[inIdx]) {
                topNode = stack[--top]; inIdx++;
            }
            topNode->right = cur;
        }
        stack[top++] = cur;
    }
    return root;
}
```

```cpp [C++]
class Solution {
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        if (preorder.empty()) return nullptr;
        TreeNode* root = new TreeNode(preorder[0]);
        stack<TreeNode*> st;
        st.push(root);
        int inIdx = 0;
        for (int i = 1; i < preorder.size(); i++) {
            TreeNode* cur = new TreeNode(preorder[i]);
            TreeNode* top = st.top();
            if (top->val != inorder[inIdx]) {
                top->left = cur;
            } else {
                while (!st.empty() && st.top()->val == inorder[inIdx]) {
                    top = st.top(); st.pop(); inIdx++;
                }
                top->right = cur;
            }
            st.push(cur);
        }
        return root;
    }
};
```

```js [JavaScript]
var buildTree = function (preorder, inorder) {
    if (preorder.length === 0) return null;
    const root = new TreeNode(preorder[0]);
    const stack = [root];
    let inIdx = 0;
    for (let i = 1; i < preorder.length; i++) {
        const cur = new TreeNode(preorder[i]);
        let top = stack[stack.length - 1];
        if (top.val !== inorder[inIdx]) {
            top.left = cur;
        } else {
            while (stack.length && stack[stack.length - 1].val === inorder[inIdx]) {
                top = stack.pop(); inIdx++;
            }
            top.right = cur;
        }
        stack.push(cur);
    }
    return root;
};
```

```ts [TypeScript]
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (preorder.length === 0) return null;
    const root = new TreeNode(preorder[0]);
    const stack: TreeNode[] = [root];
    let inIdx = 0;
    for (let i = 1; i < preorder.length; i++) {
        const cur = new TreeNode(preorder[i]);
        let top = stack[stack.length - 1];
        if (top.val !== inorder[inIdx]) {
            top.left = cur;
        } else {
            while (stack.length && stack[stack.length - 1].val === inorder[inIdx]) {
                top = stack.pop()!; inIdx++;
            }
            top.right = cur;
        }
        stack.push(cur);
    }
    return root;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点入栈出栈一次。
- **空间复杂度**：`O(n)`，栈最多存储所有节点。

### 2.4 方法四：递归 + 数组复制

1. **思路**

每次递归直接从中序和先序中切分出左右子树的子数组，再递归构建。代码最直观，但复制数组带来 `O(n^2)` 时间与空间开销，不推荐用于大型输入。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        if (preorder.length == 0) return null;
        int rootVal = preorder[0];
        int inIdx = 0;
        for (int i = 0; i < inorder.length; i++) {
            if (inorder[i] == rootVal) { inIdx = i; break; }
        }
        TreeNode root = new TreeNode(rootVal);
        root.left = buildTree(Arrays.copyOfRange(preorder, 1, 1 + inIdx),
                              Arrays.copyOfRange(inorder, 0, inIdx));
        root.right = buildTree(Arrays.copyOfRange(preorder, 1 + inIdx, preorder.length),
                               Arrays.copyOfRange(inorder, inIdx + 1, inorder.length));
        return root;
    }
}
```

```python [Python]
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        if not preorder: return None
        root_val = preorder[0]
        in_idx = inorder.index(root_val)
        root = TreeNode(root_val)
        root.left = self.buildTree(preorder[1:1+in_idx], inorder[:in_idx])
        root.right = self.buildTree(preorder[1+in_idx:], inorder[in_idx+1:])
        return root
```

```go [Go]
func buildTree(preorder []int, inorder []int) *TreeNode {
    if len(preorder) == 0 { return nil }
    rootVal := preorder[0]
    inIdx := 0
    for inorder[inIdx] != rootVal { inIdx++ }
    root := &TreeNode{Val: rootVal}
    root.Left = buildTree(preorder[1:1+inIdx], inorder[:inIdx])
    root.Right = buildTree(preorder[1+inIdx:], inorder[inIdx+1:])
    return root
}
```

```c [C]
struct TreeNode* buildTree(int* preorder, int preorderSize, int* inorder, int inorderSize) {
    if (preorderSize == 0) return NULL;
    int rootVal = preorder[0];
    int inIdx = 0;
    while (inorder[inIdx] != rootVal) inIdx++;
    struct TreeNode* root = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->val = rootVal; root->left = root->right = NULL;
    int ls = inIdx, rs = preorderSize - inIdx - 1;
    int* lp = (int*)malloc(sizeof(int) * (ls + rs));
    int* li = (int*)malloc(sizeof(int) * (ls + rs));
    int* rp = lp + ls; int* ri = li + ls;
    for (int i = 0; i < ls; i++) { lp[i] = preorder[1 + i]; li[i] = inorder[i]; }
    for (int i = 0; i < rs; i++) { rp[i] = preorder[1 + ls + i]; ri[i] = inorder[inIdx + 1 + i]; }
    root->left = buildTree(lp, ls, li, ls);
    root->right = buildTree(rp, rs, ri, rs);
    free(lp); free(li);
    return root;
}
```

```cpp [C++]
class Solution {
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        if (preorder.empty()) return nullptr;
        int rootVal = preorder[0];
        int inIdx = 0;
        while (inorder[inIdx] != rootVal) inIdx++;
        TreeNode* root = new TreeNode(rootVal);
        vector<int> leftPre(preorder.begin()+1, preorder.begin()+1+inIdx);
        vector<int> leftIn(inorder.begin(), inorder.begin()+inIdx);
        vector<int> rightPre(preorder.begin()+1+inIdx, preorder.end());
        vector<int> rightIn(inorder.begin()+inIdx+1, inorder.end());
        root->left = buildTree(leftPre, leftIn);
        root->right = buildTree(rightPre, rightIn);
        return root;
    }
};
```

```js [JavaScript]
var buildTree = function (preorder, inorder) {
    if (preorder.length === 0) return null;
    const rootVal = preorder[0];
    const inIdx = inorder.indexOf(rootVal);
    const root = new TreeNode(rootVal);
    root.left = buildTree(preorder.slice(1, 1 + inIdx), inorder.slice(0, inIdx));
    root.right = buildTree(preorder.slice(1 + inIdx), inorder.slice(inIdx + 1));
    return root;
};
```

```ts [TypeScript]
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (preorder.length === 0) return null;
    const rootVal = preorder[0];
    const inIdx = inorder.indexOf(rootVal);
    const root = new TreeNode(rootVal);
    root.left = buildTree(preorder.slice(1, 1 + inIdx), inorder.slice(0, inIdx));
    root.right = buildTree(preorder.slice(1 + inIdx), inorder.slice(inIdx + 1));
    return root;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n^2)`，每层递归复制数组。
- **空间复杂度**：`O(n^2)`，复制数组占用额外空间。



## 三、总结

四种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 递归 + 哈希表 | `O(n)` | `O(n)` | **推荐**，高效且易懂 |
| 递归 + 线性查找 | `O(n^2)` | `O(n)` | 简单但效率低 |
| 迭代（栈） | `O(n)` | `O(n)` | 避免递归，逻辑稍复杂 |
| 递归 + 数组复制 | `O(n^2)` | `O(n^2)` | 最直观但最差 |
