# [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)



## 一、题目描述

给定一个二叉树的根节点 `root`，返回 **它的中序遍历**。

**中序遍历** 顺序：左子树 → 根节点 → 右子树。



**示例 1：**

```
输入：root = [1,null,2,3]
输出：[1,3,2]
```

**示例 2：**

```
输入：root = []
输出：[]
```

**提示：**

-   树中节点数目在范围 `[0, 100]` 内
-   `-100 <= Node.val <= 100`



## 二、解答方法

### 2.1 方法一：递归


1. **思路**

递归遍历左子树、访问根、再遍历右子树，将节点值依次加入结果。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    List<Integer> res = new ArrayList<>();
    public List<Integer> inorderTraversal(TreeNode root) {
        dfs(root);
        return res;
    }
    private void dfs(TreeNode node) {
        if (node == null) return;
        dfs(node.left);
        res.add(node.val);
        dfs(node.right);
    }
}
```

```python [Python]
class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        def dfs(node):
            if not node: return
            dfs(node.left)
            res.append(node.val)
            dfs(node.right)
        dfs(root)
        return res
```

```go [Go]
func inorderTraversal(root *TreeNode) []int {
    res := []int{}
    var dfs func(*TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil { return }
        dfs(node.Left)
        res = append(res, node.Val)
        dfs(node.Right)
    }
    dfs(root)
    return res
}
```

```c [C]
int* inorderTraversal(struct TreeNode* root, int* returnSize) {
    int* res = (int*)malloc(sizeof(int) * 100);
    *returnSize = 0;
    void dfs(struct TreeNode* node) {
        if (!node) return;
        dfs(node->left);
        res[(*returnSize)++] = node->val;
        dfs(node->right);
    }
    dfs(root);
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        function<void(TreeNode*)> dfs = [&](TreeNode* node) {
            if (!node) return;
            dfs(node->left);
            res.push_back(node->val);
            dfs(node->right);
        };
        dfs(root);
        return res;
    }
};
```

```javascript [JavaScript]
var inorderTraversal = function(root) {
    const res = [];
    const dfs = (node) => {
        if (!node) return;
        dfs(node.left);
        res.push(node.val);
        dfs(node.right);
    };
    dfs(root);
    return res;
};
```

```typescript [TypeScript]
function inorderTraversal(root: TreeNode | null): number[] {
    const res: number[] = [];
    const dfs = (node: TreeNode | null): void => {
        if (!node) return;
        dfs(node.left);
        res.push(node.val);
        dfs(node.right);
    };
    dfs(root);
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(n)`，递归栈深度（最坏链状）。

### 2.2 方法二：迭代（显式栈）


1. **思路**

用栈模拟递归，先一路把左子节点压栈，出栈时访问节点并转向右子树。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Deque<TreeNode> st = new ArrayDeque<>();
        TreeNode cur = root;
        while (cur != null || !st.isEmpty()) {
            while (cur != null) { st.push(cur); cur = cur.left; }
            cur = st.pop();
            res.add(cur.val);
            cur = cur.right;
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res, st, cur = [], [], root
        while cur or st:
            while cur:
                st.append(cur)
                cur = cur.left
            cur = st.pop()
            res.append(cur.val)
            cur = cur.right
        return res
```

```go [Go]
func inorderTraversal(root *TreeNode) []int {
    res := []int{}
    st := []*TreeNode{}
    cur := root
    for cur != nil || len(st) > 0 {
        for cur != nil { st = append(st, cur); cur = cur.Left }
        cur = st[len(st)-1]
        st = st[:len(st)-1]
        res = append(res, cur.Val)
        cur = cur.Right
    }
    return res
}
```

```c [C]
int* inorderTraversal(struct TreeNode* root, int* returnSize) {
    int* res = (int*)malloc(sizeof(int) * 100);
    *returnSize = 0;
    struct TreeNode** st = (struct TreeNode**)malloc(sizeof(struct TreeNode*) * 100);
    int top = -1;
    struct TreeNode* cur = root;
    while (cur || top >= 0) {
        while (cur) { st[++top] = cur; cur = cur->left; }
        cur = st[top--];
        res[(*returnSize)++] = cur->val;
        cur = cur->right;
    }
    free(st);
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        vector<TreeNode*> st;
        TreeNode* cur = root;
        while (cur || !st.empty()) {
            while (cur) { st.push_back(cur); cur = cur->left; }
            cur = st.back(); st.pop_back();
            res.push_back(cur->val);
            cur = cur->right;
        }
        return res;
    }
};
```

```javascript [JavaScript]
var inorderTraversal = function(root) {
    const res = [];
    const st = [];
    let cur = root;
    while (cur || st.length) {
        while (cur) { st.push(cur); cur = cur.left; }
        cur = st.pop();
        res.push(cur.val);
        cur = cur.right;
    }
    return res;
};
```

```typescript [TypeScript]
function inorderTraversal(root: TreeNode | null): number[] {
    const res: number[] = [];
    const st: TreeNode[] = [];
    let cur: TreeNode | null = root;
    while (cur || st.length) {
        while (cur) { st.push(cur); cur = cur.left; }
        cur = st.pop()!;
        res.push(cur.val);
        cur = cur.right;
    }
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(n)`，栈与结果数组。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 递归 | `O(n)` | `O(n)` | 代码最简，推荐入门 |
| 迭代（显式栈） | `O(n)` | `O(n)` | 无递归，便于理解栈 |
