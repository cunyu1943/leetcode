# [106. 从中序与后序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

## 一、题目描述

给定两个整数数组 `inorder` 和 `postorder`，其中 `inorder` 是二叉树的中序遍历，`postorder` 是同一棵树的后序遍历，请你构造并返回这颗二叉树。

**示例 1：**

```
输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
输出：[3,9,20,null,null,15,7]
```

**示例 2：**

```
输入：inorder = [-1], postorder = [-1]
输出：[-1]
```

**提示：**

- `1 <= inorder.length <= 3000`
- `postorder.length == inorder.length`
- `-3000 <= inorder[i], postorder[i] <= 3000`
- `inorder` 和 `postorder` 均无重复元素
- `postorder` 保证是 `inorder` 对应二叉树的后序遍历

## 二、解答方法

### 2.1 方法一：递归 + 哈希表

1. **思路**

后序遍历的最后一个元素一定是根节点。在中序遍历中找到根节点的位置，左侧为左子树中序，右侧为右子树中序。根据左右子树节点数量，在后序遍历中切分出对应的左右子树后序序列。递归构建子树。

为了快速定位根节点在中序中的位置，使用哈希表存储值到索引的映射（值无重复）。注意：后序遍历是 **左→右→根**，逆序遍历时先遇到右子树的根，所以递归时 **先构建右子树，再构建左子树**。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private int[] postorder;
    private Map<Integer, Integer> map = new HashMap<>();
    private int postIdx;

    public TreeNode buildTree(int[] inorder, int[] postorder) {
        this.postorder = postorder;
        postIdx = postorder.length - 1;
        for (int i = 0; i < inorder.length; i++) {
            map.put(inorder[i], i);
        }
        return build(0, inorder.length - 1);
    }

    private TreeNode build(int inLeft, int inRight) {
        if (inLeft > inRight) return null;
        int rootVal = postorder[postIdx--];
        TreeNode root = new TreeNode(rootVal);
        int inIdx = map.get(rootVal);
        root.right = build(inIdx + 1, inRight);
        root.left = build(inLeft, inIdx - 1);
        return root;
    }
}
```

```python [Python]
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> TreeNode:
        self.postorder = postorder
        self.map = {val: i for i, val in enumerate(inorder)}
        self.post_idx = len(postorder) - 1

        def build(in_left: int, in_right: int) -> TreeNode:
            if in_left > in_right:
                return None
            root_val = self.postorder[self.post_idx]
            self.post_idx -= 1
            root = TreeNode(root_val)
            in_idx = self.map[root_val]
            root.right = build(in_idx + 1, in_right)
            root.left = build(in_left, in_idx - 1)
            return root

        return build(0, len(inorder) - 1)
```

```go [Go]
func buildTree(inorder []int, postorder []int) *TreeNode {
    mapIdx := make(map[int]int)
    for i, v := range inorder {
        mapIdx[v] = i
    }
    postIdx := len(postorder) - 1
    var build func(int, int) *TreeNode
    build = func(inLeft, inRight int) *TreeNode {
        if inLeft > inRight {
            return nil
        }
        rootVal := postorder[postIdx]
        postIdx--
        root := &TreeNode{Val: rootVal}
        inIdx := mapIdx[rootVal]
        root.Right = build(inIdx+1, inRight)
        root.Left = build(inLeft, inIdx-1)
        return root
    }
    return build(0, len(inorder)-1)
}
```

```c [C]
typedef struct {
    int key;
    int val;
} MapEntry;

int search(MapEntry* map, int size, int key) {
    for (int i = 0; i < size; i++) {
        if (map[i].key == key) return map[i].val;
    }
    return -1;
}

struct TreeNode* build(int* inorder, int* postorder, int inLeft, int inRight, int* postIdx, MapEntry* map, int mapSize) {
    if (inLeft > inRight) return NULL;
    int rootVal = postorder[(*postIdx)--];
    struct TreeNode* root = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->val = rootVal;
    root->left = root->right = NULL;
    int inIdx = search(map, mapSize, rootVal);
    root->right = build(inorder, postorder, inIdx+1, inRight, postIdx, map, mapSize);
    root->left = build(inorder, postorder, inLeft, inIdx-1, postIdx, map, mapSize);
    return root;
}

struct TreeNode* buildTree(int* inorder, int inorderSize, int* postorder, int postorderSize) {
    MapEntry map[inorderSize];
    for (int i = 0; i < inorderSize; i++) {
        map[i].key = inorder[i];
        map[i].val = i;
    }
    int postIdx = postorderSize - 1;
    return build(inorder, postorder, 0, inorderSize-1, &postIdx, map, inorderSize);
}
```

```cpp [C++]
class Solution {
public:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        for (int i = 0; i < inorder.size(); i++) {
            map[inorder[i]] = i;
        }
        this->postorder = postorder;
        postIdx = postorder.size() - 1;
        return build(0, inorder.size() - 1);
    }

private:
    vector<int> postorder;
    unordered_map<int, int> map;
    int postIdx;

    TreeNode* build(int inLeft, int inRight) {
        if (inLeft > inRight) return nullptr;
        int rootVal = postorder[postIdx--];
        TreeNode* root = new TreeNode(rootVal);
        int inIdx = map[rootVal];
        root->right = build(inIdx + 1, inRight);
        root->left = build(inLeft, inIdx - 1);
        return root;
    }
};
```

```js [JavaScript]
var buildTree = function(inorder, postorder) {
    const map = new Map();
    for (let i = 0; i < inorder.length; i++) {
        map.set(inorder[i], i);
    }
    let postIdx = postorder.length - 1;

    function build(inLeft, inRight) {
        if (inLeft > inRight) return null;
        const rootVal = postorder[postIdx--];
        const root = new TreeNode(rootVal);
        const inIdx = map.get(rootVal);
        root.right = build(inIdx + 1, inRight);
        root.left = build(inLeft, inIdx - 1);
        return root;
    }

    return build(0, inorder.length - 1);
};
```

```ts [TypeScript]
function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    const map = new Map<number, number>();
    for (let i = 0; i < inorder.length; i++) {
        map.set(inorder[i], i);
    }
    let postIdx = postorder.length - 1;

    function build(inLeft: number, inRight: number): TreeNode | null {
        if (inLeft > inRight) return null;
        const rootVal = postorder[postIdx--];
        const root = new TreeNode(rootVal);
        const inIdx = map.get(rootVal)!;
        root.right = build(inIdx + 1, inRight);
        root.left = build(inLeft, inIdx - 1);
        return root;
    }

    return build(0, inorder.length - 1);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次，哈希表查找 `O(1)`。
- **空间复杂度**：`O(n)`，哈希表存储 `n` 个元素，递归栈深度 `O(height)`。

---

### 2.2 方法二：递归 + 线性查找

1. **思路**

与方法一逻辑相同，但每次在中序区间内线性扫描查找根节点位置，不使用哈希表。代码更简单，适合小数据或理解原理，时间复杂度 `O(n^2)`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private int[] postorder;
    private int postIdx;

    public TreeNode buildTree(int[] inorder, int[] postorder) {
        this.postorder = postorder;
        postIdx = postorder.length - 1;
        return build(inorder, 0, inorder.length - 1);
    }

    private TreeNode build(int[] inorder, int inLeft, int inRight) {
        if (inLeft > inRight) return null;
        int rootVal = postorder[postIdx--];
        int inIdx = inLeft;
        while (inorder[inIdx] != rootVal) inIdx++;
        TreeNode root = new TreeNode(rootVal);
        root.right = build(inorder, inIdx + 1, inRight);
        root.left = build(inorder, inLeft, inIdx - 1);
        return root;
    }
}
```

```python [Python]
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> TreeNode:
        self.postorder = postorder
        self.post_idx = len(postorder) - 1

        def build(in_left: int, in_right: int) -> TreeNode:
            if in_left > in_right:
                return None
            root_val = self.postorder[self.post_idx]
            self.post_idx -= 1
            in_idx = inorder.index(root_val)  # O(n) each
            root = TreeNode(root_val)
            root.right = build(in_idx + 1, in_right)
            root.left = build(in_left, in_idx - 1)
            return root

        return build(0, len(inorder) - 1)
```

```go [Go]
func buildTree(inorder []int, postorder []int) *TreeNode {
    postIdx := len(postorder) - 1
    var build func(int, int) *TreeNode
    build = func(inLeft, inRight int) *TreeNode {
        if inLeft > inRight {
            return nil
        }
        rootVal := postorder[postIdx]
        postIdx--
        inIdx := inLeft
        for inorder[inIdx] != rootVal {
            inIdx++
        }
        root := &TreeNode{Val: rootVal}
        root.Right = build(inIdx+1, inRight)
        root.Left = build(inLeft, inIdx-1)
        return root
    }
    return build(0, len(inorder)-1)
}
```

```c [C]
struct TreeNode* build(int* inorder, int* postorder, int inLeft, int inRight, int* postIdx) {
    if (inLeft > inRight) return NULL;
    int rootVal = postorder[(*postIdx)--];
    int inIdx = inLeft;
    while (inorder[inIdx] != rootVal) inIdx++;
    struct TreeNode* root = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->val = rootVal;
    root->left = root->right = NULL;
    root->right = build(inorder, postorder, inIdx+1, inRight, postIdx);
    root->left = build(inorder, postorder, inLeft, inIdx-1, postIdx);
    return root;
}
struct TreeNode* buildTree(int* inorder, int inorderSize, int* postorder, int postorderSize) {
    int postIdx = postorderSize - 1;
    return build(inorder, postorder, 0, inorderSize-1, &postIdx);
}
```

```cpp [C++]
class Solution {
public:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        int postIdx = postorder.size() - 1;
        return build(inorder, postorder, 0, inorder.size()-1, postIdx);
    }
    TreeNode* build(vector<int>& inorder, vector<int>& postorder, int inLeft, int inRight, int& postIdx) {
        if (inLeft > inRight) return nullptr;
        int rootVal = postorder[postIdx--];
        int inIdx = inLeft;
        while (inorder[inIdx] != rootVal) inIdx++;
        TreeNode* root = new TreeNode(rootVal);
        root->right = build(inorder, postorder, inIdx+1, inRight, postIdx);
        root->left = build(inorder, postorder, inLeft, inIdx-1, postIdx);
        return root;
    }
};
```

```js [JavaScript]
var buildTree = function(inorder, postorder) {
    let postIdx = postorder.length - 1;
    function build(inLeft, inRight) {
        if (inLeft > inRight) return null;
        const rootVal = postorder[postIdx--];
        const inIdx = inorder.indexOf(rootVal);
        const root = new TreeNode(rootVal);
        root.right = build(inIdx + 1, inRight);
        root.left = build(inLeft, inIdx - 1);
        return root;
    }
    return build(0, inorder.length - 1);
};
```

```ts [TypeScript]
function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    let postIdx = postorder.length - 1;
    function build(inLeft: number, inRight: number): TreeNode | null {
        if (inLeft > inRight) return null;
        const rootVal = postorder[postIdx--];
        const inIdx = inorder.indexOf(rootVal);
        const root = new TreeNode(rootVal);
        root.right = build(inIdx + 1, inRight);
        root.left = build(inLeft, inIdx - 1);
        return root;
    }
    return build(0, inorder.length - 1);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n^2)`，每次查找根节点位置平均 `O(n)`。
- **空间复杂度**：`O(n)`，递归栈深度。

---

### 2.3 方法三：迭代（栈）

1. **思路**

使用栈模拟递归。后序遍历的最后一个节点是根，入栈。然后从后序遍历倒数第二个开始向前遍历，根据中序数组的当前指针判断当前节点是栈顶节点的右孩子还是左孩子。

- 若栈顶节点的值不等于 `inorder[inIdx]`，则当前节点是栈顶的右孩子。
- 否则，不断弹出栈顶直到栈顶值不等于 `inorder[inIdx]`，此时最后一个弹出的节点即为当前节点的父节点，当前节点为其左孩子。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        if (postorder.length == 0) return null;
        TreeNode root = new TreeNode(postorder[postorder.length - 1]);
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        int inIdx = inorder.length - 1;
        for (int i = postorder.length - 2; i >= 0; i--) {
            TreeNode cur = new TreeNode(postorder[i]);
            TreeNode top = stack.peek();
            if (top.val != inorder[inIdx]) {
                top.right = cur;
            } else {
                while (!stack.isEmpty() && stack.peek().val == inorder[inIdx]) {
                    top = stack.pop();
                    inIdx--;
                }
                top.left = cur;
            }
            stack.push(cur);
        }
        return root;
    }
}
```

```python [Python]
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> TreeNode:
        if not postorder:
            return None
        root = TreeNode(postorder[-1])
        stack = [root]
        in_idx = len(inorder) - 1
        for i in range(len(postorder) - 2, -1, -1):
            cur = TreeNode(postorder[i])
            top = stack[-1]
            if top.val != inorder[in_idx]:
                top.right = cur
            else:
                while stack and stack[-1].val == inorder[in_idx]:
                    top = stack.pop()
                    in_idx -= 1
                top.left = cur
            stack.append(cur)
        return root
```

```go [Go]
func buildTree(inorder []int, postorder []int) *TreeNode {
    if len(postorder) == 0 {
        return nil
    }
    root := &TreeNode{Val: postorder[len(postorder)-1]}
    stack := []*TreeNode{root}
    inIdx := len(inorder) - 1
    for i := len(postorder) - 2; i >= 0; i-- {
        cur := &TreeNode{Val: postorder[i]}
        top := stack[len(stack)-1]
        if top.Val != inorder[inIdx] {
            top.Right = cur
        } else {
            for len(stack) > 0 && stack[len(stack)-1].Val == inorder[inIdx] {
                top = stack[len(stack)-1]
                stack = stack[:len(stack)-1]
                inIdx--
            }
            top.Left = cur
        }
        stack = append(stack, cur)
    }
    return root
}
```

```c [C]
struct TreeNode* buildTree(int* inorder, int inorderSize, int* postorder, int postorderSize) {
    if (postorderSize == 0) return NULL;
    struct TreeNode* root = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->val = postorder[postorderSize-1];
    root->left = root->right = NULL;
    struct TreeNode* stack[postorderSize];
    int top = 0;
    stack[top++] = root;
    int inIdx = inorderSize - 1;
    for (int i = postorderSize - 2; i >= 0; i--) {
        struct TreeNode* cur = (struct TreeNode*)malloc(sizeof(struct TreeNode));
        cur->val = postorder[i];
        cur->left = cur->right = NULL;
        struct TreeNode* topNode = stack[top-1];
        if (topNode->val != inorder[inIdx]) {
            topNode->right = cur;
        } else {
            while (top > 0 && stack[top-1]->val == inorder[inIdx]) {
                topNode = stack[--top];
                inIdx--;
            }
            topNode->left = cur;
        }
        stack[top++] = cur;
    }
    return root;
}
```

```cpp [C++]
class Solution {
public:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        if (postorder.empty()) return nullptr;
        TreeNode* root = new TreeNode(postorder.back());
        stack<TreeNode*> st;
        st.push(root);
        int inIdx = inorder.size() - 1;
        for (int i = postorder.size() - 2; i >= 0; i--) {
            TreeNode* cur = new TreeNode(postorder[i]);
            TreeNode* top = st.top();
            if (top->val != inorder[inIdx]) {
                top->right = cur;
            } else {
                while (!st.empty() && st.top()->val == inorder[inIdx]) {
                    top = st.top();
                    st.pop();
                    inIdx--;
                }
                top->left = cur;
            }
            st.push(cur);
        }
        return root;
    }
};
```

```js [JavaScript]
var buildTree = function(inorder, postorder) {
    if (postorder.length === 0) return null;
    const root = new TreeNode(postorder[postorder.length - 1]);
    const stack = [root];
    let inIdx = inorder.length - 1;
    for (let i = postorder.length - 2; i >= 0; i--) {
        const cur = new TreeNode(postorder[i]);
        let top = stack[stack.length - 1];
        if (top.val !== inorder[inIdx]) {
            top.right = cur;
        } else {
            while (stack.length && stack[stack.length - 1].val === inorder[inIdx]) {
                top = stack.pop();
                inIdx--;
            }
            top.left = cur;
        }
        stack.push(cur);
    }
    return root;
};
```

```ts [TypeScript]
function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    if (postorder.length === 0) return null;
    const root = new TreeNode(postorder[postorder.length - 1]);
    const stack: TreeNode[] = [root];
    let inIdx = inorder.length - 1;
    for (let i = postorder.length - 2; i >= 0; i--) {
        const cur = new TreeNode(postorder[i]);
        let top = stack[stack.length - 1];
        if (top.val !== inorder[inIdx]) {
            top.right = cur;
        } else {
            while (stack.length && stack[stack.length - 1].val === inorder[inIdx]) {
                top = stack.pop()!;
                inIdx--;
            }
            top.left = cur;
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

---

### 2.4 方法四：递归 + 数组复制

1. **思路**

每次递归时，直接从中序和后序数组中切分出左右子树的子数组，然后递归构建。代码最直观，但复制数组带来 `O(n^2)` 的时间和空间开销，不推荐用于大型输入。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        if (postorder.length == 0) return null;
        int rootVal = postorder[postorder.length - 1];
        int inIdx = 0;
        for (int i = 0; i < inorder.length; i++) {
            if (inorder[i] == rootVal) { inIdx = i; break; }
        }
        TreeNode root = new TreeNode(rootVal);
        root.left = buildTree(Arrays.copyOfRange(inorder, 0, inIdx),
                              Arrays.copyOfRange(postorder, 0, inIdx));
        root.right = buildTree(Arrays.copyOfRange(inorder, inIdx + 1, inorder.length),
                               Arrays.copyOfRange(postorder, inIdx, postorder.length - 1));
        return root;
    }
}
```

```python [Python]
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> TreeNode:
        if not postorder:
            return None
        root_val = postorder[-1]
        in_idx = inorder.index(root_val)
        root = TreeNode(root_val)
        root.left = self.buildTree(inorder[:in_idx], postorder[:in_idx])
        root.right = self.buildTree(inorder[in_idx+1:], postorder[in_idx:-1])
        return root
```

```go [Go]
func buildTree(inorder []int, postorder []int) *TreeNode {
    if len(postorder) == 0 {
        return nil
    }
    rootVal := postorder[len(postorder)-1]
    inIdx := 0
    for inorder[inIdx] != rootVal {
        inIdx++
    }
    root := &TreeNode{Val: rootVal}
    root.Left = buildTree(inorder[:inIdx], postorder[:inIdx])
    root.Right = buildTree(inorder[inIdx+1:], postorder[inIdx:len(postorder)-1])
    return root
}
```

```c [C]
// C语言复制数组较为繁琐，此处省略，不建议使用该方法
```

```cpp [C++]
class Solution {
public:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        if (postorder.empty()) return nullptr;
        int rootVal = postorder.back();
        int inIdx = 0;
        while (inorder[inIdx] != rootVal) inIdx++;
        TreeNode* root = new TreeNode(rootVal);
        vector<int> leftIn(inorder.begin(), inorder.begin()+inIdx);
        vector<int> leftPost(postorder.begin(), postorder.begin()+inIdx);
        vector<int> rightIn(inorder.begin()+inIdx+1, inorder.end());
        vector<int> rightPost(postorder.begin()+inIdx, postorder.end()-1);
        root->left = buildTree(leftIn, leftPost);
        root->right = buildTree(rightIn, rightPost);
        return root;
    }
};
```

```js [JavaScript]
var buildTree = function(inorder, postorder) {
    if (postorder.length === 0) return null;
    const rootVal = postorder[postorder.length - 1];
    const inIdx = inorder.indexOf(rootVal);
    const root = new TreeNode(rootVal);
    root.left = buildTree(inorder.slice(0, inIdx), postorder.slice(0, inIdx));
    root.right = buildTree(inorder.slice(inIdx + 1), postorder.slice(inIdx, postorder.length - 1));
    return root;
};
```

```ts [TypeScript]
function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    if (postorder.length === 0) return null;
    const rootVal = postorder[postorder.length - 1];
    const inIdx = inorder.indexOf(rootVal);
    const root = new TreeNode(rootVal);
    root.left = buildTree(inorder.slice(0, inIdx), postorder.slice(0, inIdx));
    root.right = buildTree(inorder.slice(inIdx + 1), postorder.slice(inIdx, postorder.length - 1));
    return root;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n^2)`，每层递归复制数组。
- **空间复杂度**：`O(n^2)`，复制数组占用额外空间。

---

## 三、总结

四种方法对比：

| 方法            | 时间复杂度 | 空间复杂度 | 特点                 |
| --------------- | ---------- | ---------- | -------------------- |
| 递归 + 哈希表   | `O(n)`     | `O(n)`     | **推荐**，高效且易懂 |
| 递归 + 线性查找 | `O(n^2)`   | `O(n)`     | 简单但效率低         |
| 迭代（栈）      | `O(n)`     | `O(n)`     | 避免递归，逻辑稍复杂 |
| 递归 + 数组复制 | `O(n^2)`   | `O(n^2)`   | 最直观但最差         |

**推荐**：面试中首选**方法一（递归+哈希表）**，时间 `O(n)`，空间 `O(n)`，代码清晰。注意与第 105 题（前序+中序）的区别：后序遍历中根在最后，递归时**先构建右子树再构建左子树**，因为逆序访问后序数组时，先遇到的是右子树的根节点。
