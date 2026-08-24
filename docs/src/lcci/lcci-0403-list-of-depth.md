# [面试题 04.03. 特定深度节点链表](https://leetcode.cn/problems/list-of-depth-lcci/)

## 一、题目描述

给定一棵二叉树，设计一个算法，创建含有某一深度上所有节点的链表（比如，若一棵树的深度为 `D`，则会创建出 `D` 个链表）。返回一个包含所有深度的链表的数组。

**示例：**

```
输入：[1,2,3,4,5,null,7,8]

        1
       /  \
      2    3
     / \    \
    4   5    7
   /
  8

输出：[[1],[2,3],[4,5,7],[8]]
```

**提示：**

- 二叉树节点数在 `[0, 1000]` 范围内。
- 每个节点的值在 `[-1000, 1000]` 范围内。

---

## 二、解答方法

### 2.1 方法一：广度优先搜索（BFS，层序遍历）

**1. 思路**

使用队列进行层序遍历。在遍历每一层时，记录当前层的节点数，然后依次取出这些节点，将它们按顺序连接成一个链表，并将该链表的头节点加入结果数组。同时将它们的左右子节点（非空）加入队列，以便处理下一层。此方法时间复杂度 O(n)，空间复杂度 O(n)。

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
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode[] listOfDepth(TreeNode root) {
        if (root == null) return new ListNode[0];
        List<ListNode> res = new ArrayList<>();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            ListNode dummy = new ListNode(0);
            ListNode tail = dummy;
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                tail.next = new ListNode(node.val);
                tail = tail.next;
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            res.add(dummy.next);
        }
        return res.toArray(new ListNode[0]);
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

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def listOfDepth(self, root: TreeNode) -> List[ListNode]:
        if not root:
            return []
        res = []
        from collections import deque
        q = deque([root])
        while q:
            size = len(q)
            dummy = ListNode(0)
            tail = dummy
            for _ in range(size):
                node = q.popleft()
                tail.next = ListNode(node.val)
                tail = tail.next
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            res.append(dummy.next)
        return res
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
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func listOfDepth(root *TreeNode) []*ListNode {
    if root == nil {
        return []*ListNode{}
    }
    res := []*ListNode{}
    queue := []*TreeNode{root}
    for len(queue) > 0 {
        size := len(queue)
        dummy := &ListNode{}
        tail := dummy
        for i := 0; i < size; i++ {
            node := queue[0]
            queue = queue[1:]
            tail.Next = &ListNode{Val: node.Val}
            tail = tail.Next
            if node.Left != nil {
                queue = append(queue, node.Left)
            }
            if node.Right != nil {
                queue = append(queue, node.Right)
            }
        }
        res = append(res, dummy.Next)
    }
    return res
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
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
#include <stdlib.h>
#include <stdbool.h>

struct ListNode** listOfDepth(struct TreeNode* root, int* returnSize) {
    if (!root) {
        *returnSize = 0;
        return NULL;
    }
    struct TreeNode** queue = (struct TreeNode**)malloc(1000 * sizeof(struct TreeNode*));
    int head = 0, tail = 0;
    queue[tail++] = root;
    struct ListNode** res = (struct ListNode**)malloc(1000 * sizeof(struct ListNode*));
    int count = 0;
    while (head < tail) {
        int size = tail - head;
        struct ListNode* dummy = (struct ListNode*)malloc(sizeof(struct ListNode));
        dummy->next = NULL;
        struct ListNode* cur = dummy;
        for (int i = 0; i < size; i++) {
            struct TreeNode* node = queue[head++];
            struct ListNode* newNode = (struct ListNode*)malloc(sizeof(struct ListNode));
            newNode->val = node->val;
            newNode->next = NULL;
            cur->next = newNode;
            cur = cur->next;
            if (node->left) queue[tail++] = node->left;
            if (node->right) queue[tail++] = node->right;
        }
        res[count++] = dummy->next;
        free(dummy);
    }
    *returnSize = count;
    free(queue);
    return res;
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
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    vector<ListNode*> listOfDepth(TreeNode* root) {
        vector<ListNode*> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int size = q.size();
            ListNode* dummy = new ListNode(0);
            ListNode* tail = dummy;
            for (int i = 0; i < size; i++) {
                TreeNode* node = q.front();
                q.pop();
                tail->next = new ListNode(node->val);
                tail = tail->next;
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(dummy->next);
        }
        return res;
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
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
var listOfDepth = function(root) {
    if (!root) return [];
    const res = [];
    const queue = [root];
    while (queue.length) {
        const size = queue.length;
        const dummy = new ListNode(0);
        let tail = dummy;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            tail.next = new ListNode(node.val);
            tail = tail.next;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        res.push(dummy.next);
    }
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
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
function listOfDepth(root: TreeNode | null): Array<ListNode | null> {
    if (!root) return [];
    const res: ListNode[] = [];
    const queue: TreeNode[] = [root];
    while (queue.length) {
        const size = queue.length;
        const dummy = new ListNode(0);
        let tail = dummy;
        for (let i = 0; i < size; i++) {
            const node = queue.shift()!;
            tail.next = new ListNode(node.val);
            tail = tail.next;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        res.push(dummy.next!);
    }
    return res;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(n)`，队列和结果链表。

---

### 2.2 方法二：深度优先搜索（DFS）+ 层级记录

**1. 思路**

使用前序遍历（或其他顺序）递归遍历二叉树，同时记录当前节点的深度。在遍历过程中，如果当前深度大于结果数组长度，则新建一个链表节点并存入数组；否则，将当前节点值追加到该深度对应的链表尾部。由于 DFS 访问顺序并非严格从左到右，但我们可以通过前序遍历（根→左→右）保证同一层节点按从左到右的顺序追加（因为左子树先被遍历）。此方法时间复杂度 O(n)，空间复杂度 O(h)（递归栈） + O(n)（结果）。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    private List<ListNode> res = new ArrayList<>();

    public ListNode[] listOfDepth(TreeNode root) {
        dfs(root, 0);
        return res.toArray(new ListNode[0]);
    }

    private void dfs(TreeNode node, int depth) {
        if (node == null) return;
        if (depth == res.size()) {
            res.add(new ListNode(node.val));
        } else {
            // 找到该深度链表的尾部并追加
            ListNode tail = res.get(depth);
            while (tail.next != null) tail = tail.next;
            tail.next = new ListNode(node.val);
        }
        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    }
}
```

```python [Python]
class Solution:
    def listOfDepth(self, root: TreeNode) -> List[ListNode]:
        res = []
        def dfs(node, depth):
            if not node:
                return
            if depth == len(res):
                res.append(ListNode(node.val))
            else:
                tail = res[depth]
                while tail.next:
                    tail = tail.next
                tail.next = ListNode(node.val)
            dfs(node.left, depth + 1)
            dfs(node.right, depth + 1)
        dfs(root, 0)
        return res
```

```go [Go]
func listOfDepth(root *TreeNode) []*ListNode {
    res := []*ListNode{}
    var dfs func(*TreeNode, int)
    dfs = func(node *TreeNode, depth int) {
        if node == nil {
            return
        }
        if depth == len(res) {
            res = append(res, &ListNode{Val: node.Val})
        } else {
            tail := res[depth]
            for tail.Next != nil {
                tail = tail.Next
            }
            tail.Next = &ListNode{Val: node.Val}
        }
        dfs(node.Left, depth+1)
        dfs(node.Right, depth+1)
    }
    dfs(root, 0)
    return res
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
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
#include <stdlib.h>

void dfs(struct TreeNode* node, int depth, struct ListNode*** res, int* size) {
    if (!node) return;
    if (depth == *size) {
        struct ListNode* newHead = (struct ListNode*)malloc(sizeof(struct ListNode));
        newHead->val = node->val;
        newHead->next = NULL;
        (*res)[*size] = newHead;
        (*size)++;
    } else {
        struct ListNode* tail = (*res)[depth];
        while (tail->next) tail = tail->next;
        tail->next = (struct ListNode*)malloc(sizeof(struct ListNode));
        tail->next->val = node->val;
        tail->next->next = NULL;
    }
    dfs(node->left, depth+1, res, size);
    dfs(node->right, depth+1, res, size);
}

struct ListNode** listOfDepth(struct TreeNode* root, int* returnSize) {
    struct ListNode** res = (struct ListNode**)malloc(1000 * sizeof(struct ListNode*));
    *returnSize = 0;
    dfs(root, 0, &res, returnSize);
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<ListNode*> listOfDepth(TreeNode* root) {
        vector<ListNode*> res;
        dfs(root, 0, res);
        return res;
    }
    void dfs(TreeNode* node, int depth, vector<ListNode*>& res) {
        if (!node) return;
        if (depth == res.size()) {
            res.push_back(new ListNode(node->val));
        } else {
            ListNode* tail = res[depth];
            while (tail->next) tail = tail->next;
            tail->next = new ListNode(node->val);
        }
        dfs(node->left, depth+1, res);
        dfs(node->right, depth+1, res);
    }
};
```

```javascript [JavaScript]
var listOfDepth = function(root) {
    const res = [];
    function dfs(node, depth) {
        if (!node) return;
        if (depth === res.length) {
            res.push(new ListNode(node.val));
        } else {
            let tail = res[depth];
            while (tail.next) tail = tail.next;
            tail.next = new ListNode(node.val);
        }
        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    }
    dfs(root, 0);
    return res;
};
```

```typescript [TypeScript]
function listOfDepth(root: TreeNode | null): Array<ListNode | null> {
    const res: ListNode[] = [];
    function dfs(node: TreeNode | null, depth: number): void {
        if (!node) return;
        if (depth === res.length) {
            res.push(new ListNode(node.val));
        } else {
            let tail = res[depth];
            while (tail.next) tail = tail.next;
            tail.next = new ListNode(node.val);
        }
        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    }
    dfs(root, 0);
    return res;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次，但寻找尾部需要遍历链表，最坏情况下总复杂度为 `O(n^2)`（例如每条链都需从头到尾遍历），但实际由于链表长度总和为 `n`，总体均摊仍为 `O(n)`（可通过记录尾指针优化）。不过为了与 BFS 区分，这里作为思路展示。
- **空间复杂度**：`O(h)`（递归栈）+ `O(n)`（结果）。

---

## 三、总结

| 方法        | 时间复杂度     | 空间复杂度    | 特点                             |
| ----------- | -------------- | ------------- | -------------------------------- |
| BFS（层序） | `O(n)`         | `O(n)`        | 推荐，逻辑清晰，直接构建链表     |
| DFS（前序） | `O(n)`（均摊） | `O(h) + O(n)` | 递归，代码简洁，但尾部查找略繁琐 |

**推荐**：在实际生产环境中，**BFS 方法**是最佳选择，它直接按层处理，易于理解且效率高。DFS 方法虽然可行，但需要额外处理链表尾部，不如 BFS 直观。两种方法均能正确输出结果。
