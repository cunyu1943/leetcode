# [109. 有序链表转换二叉搜索树](https://leetcode.cn/problems/convert-sorted-list-to-binary-search-tree/)

## 一、题目描述

给定一个单链表的头节点 `head`，其中的元素 **按升序排序**，将其转换为高度平衡的二叉搜索树。

高度平衡二叉树是指一棵二叉树，其中每个节点的左右两个子树的高度差的绝对值不超过 1。

**示例 1：**

```
输入：head = [-10,-3,0,5,9]
输出：[0,-3,9,-10,null,5]
```

**示例 2：**

```
输入：head = []
输出：[]
```

**提示：**

- `head` 中的节点数在 `[0, 2 * 10^4]` 范围内
- `-10^5 <= Node.val <= 10^5`

## 二、解答方法

### 2.1 方法一：递归 + 快慢指针找中点

1. **思路**

与数组类似，链表的中点是根节点。使用快慢指针（`slow` 每次走一步，`fast` 每次走两步）找到链表的中点，中点左侧为左子树链表，中点右侧为右子树链表。递归构建左右子树。

注意需要断开链表，防止循环。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public TreeNode sortedListToBST(ListNode head) {
        if (head == null) return null;
        if (head.next == null) return new TreeNode(head.val);
        // 快慢指针找中点，同时记录中点前驱
        ListNode slow = head, fast = head, pre = null;
        while (fast != null && fast.next != null) {
            pre = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        // slow 即为中点
        pre.next = null; // 断开左半部分
        TreeNode root = new TreeNode(slow.val);
        root.left = sortedListToBST(head);
        root.right = sortedListToBST(slow.next);
        return root;
    }
}
```

```python [Python]
class Solution:
    def sortedListToBST(self, head: ListNode) -> TreeNode:
        if not head: return None
        if not head.next: return TreeNode(head.val)
        # 快慢指针找中点
        slow = fast = head
        pre = None
        while fast and fast.next:
            pre = slow
            slow = slow.next
            fast = fast.next.next
        pre.next = None  # 断开
        root = TreeNode(slow.val)
        root.left = self.sortedListToBST(head)
        root.right = self.sortedListToBST(slow.next)
        return root
```

```go [Go]
func sortedListToBST(head *ListNode) *TreeNode {
    if head == nil { return nil }
    if head.Next == nil { return &TreeNode{Val: head.Val} }
    // 快慢指针找中点
    slow, fast := head, head
    var pre *ListNode
    for fast != nil && fast.Next != nil {
        pre = slow
        slow = slow.Next
        fast = fast.Next.Next
    }
    pre.Next = nil // 断开
    root := &TreeNode{Val: slow.Val}
    root.Left = sortedListToBST(head)
    root.Right = sortedListToBST(slow.Next)
    return root
}
```

```c [C]
struct TreeNode* sortedListToBST(struct ListNode* head) {
    if (!head) return NULL;
    if (!head->next) {
        struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
        node->val = head->val; node->left = node->right = NULL;
        return node;
    }
    struct ListNode *slow = head, *fast = head, *pre = NULL;
    while (fast && fast->next) {
        pre = slow;
        slow = slow->next;
        fast = fast->next->next;
    }
    pre->next = NULL;
    struct TreeNode* root = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->val = slow->val;
    root->left = sortedListToBST(head);
    root->right = sortedListToBST(slow->next);
    return root;
}
```

```cpp [C++]
class Solution {
public:
    TreeNode* sortedListToBST(ListNode* head) {
        if (!head) return nullptr;
        if (!head->next) return new TreeNode(head->val);
        ListNode *slow = head, *fast = head, *pre = nullptr;
        while (fast && fast->next) {
            pre = slow;
            slow = slow->next;
            fast = fast->next->next;
        }
        pre->next = nullptr;
        TreeNode* root = new TreeNode(slow->val);
        root->left = sortedListToBST(head);
        root->right = sortedListToBST(slow->next);
        return root;
    }
};
```

```js [JavaScript]
var sortedListToBST = function(head) {
    if (!head) return null;
    if (!head.next) return new TreeNode(head.val);
    let slow = head, fast = head, pre = null;
    while (fast && fast.next) {
        pre = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    pre.next = null;
    const root = new TreeNode(slow.val);
    root.left = sortedListToBST(head);
    root.right = sortedListToBST(slow.next);
    return root;
};
```

```ts [TypeScript]
function sortedListToBST(head: ListNode | null): TreeNode | null {
    if (!head) return null;
    if (!head.next) return new TreeNode(head.val);
    let slow: ListNode | null = head, fast: ListNode | null = head, pre: ListNode | null = null;
    while (fast && fast.next) {
        pre = slow;
        slow = slow!.next;
        fast = fast.next.next;
    }
    pre!.next = null;
    const root = new TreeNode(slow!.val);
    root.left = sortedListToBST(head);
    root.right = sortedListToBST(slow!.next);
    return root;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`，每次找中点需要 `O(n)`，共 `log n` 层递归。
- **空间复杂度**：`O(log n)`，递归栈深度（平衡树高度）。

---

### 2.2 方法二：递归 + 中序遍历模拟（优化）

1. **思路**

方法一的瓶颈在于每次递归找中点需要 `O(n)`。更优的做法是：先遍历链表得到总长度 `n`，然后利用 BST 的中序遍历（左→根→右）恰好对应链表顺序这一特性，递归构建节点，同时移动链表指针。这样每个节点只访问一次，时间复杂度 `O(n)`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private ListNode cur;
    public TreeNode sortedListToBST(ListNode head) {
        int n = 0;
        ListNode p = head;
        while (p != null) { n++; p = p.next; }
        cur = head;
        return build(0, n - 1);
    }
    private TreeNode build(int left, int right) {
        if (left > right) return null;
        int mid = left + (right - left) / 2;
        TreeNode leftChild = build(left, mid - 1);
        TreeNode root = new TreeNode(cur.val);
        cur = cur.next;
        root.left = leftChild;
        root.right = build(mid + 1, right);
        return root;
    }
}
```

```python [Python]
class Solution:
    def sortedListToBST(self, head: ListNode) -> TreeNode:
        n = 0
        p = head
        while p:
            n += 1
            p = p.next
        self.cur = head
        def build(left: int, right: int) -> TreeNode:
            if left > right: return None
            mid = (left + right) // 2
            left_child = build(left, mid - 1)
            root = TreeNode(self.cur.val)
            self.cur = self.cur.next
            root.left = left_child
            root.right = build(mid + 1, right)
            return root
        return build(0, n - 1)
```

```go [Go]
func sortedListToBST(head *ListNode) *TreeNode {
    n := 0
    for p := head; p != nil; p = p.Next { n++ }
    cur := head
    var build func(int, int) *TreeNode
    build = func(left, right int) *TreeNode {
        if left > right { return nil }
        mid := left + (right-left)/2
        leftChild := build(left, mid-1)
        root := &TreeNode{Val: cur.Val}
        cur = cur.Next
        root.Left = leftChild
        root.Right = build(mid+1, right)
        return root
    }
    return build(0, n-1)
}
```

```c [C]
struct TreeNode* build(struct ListNode** cur, int left, int right) {
    if (left > right) return NULL;
    int mid = left + (right - left) / 2;
    struct TreeNode* leftChild = build(cur, left, mid - 1);
    struct TreeNode* root = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->val = (*cur)->val;
    *cur = (*cur)->next;
    root->left = leftChild;
    root->right = build(cur, mid + 1, right);
    return root;
}
struct TreeNode* sortedListToBST(struct ListNode* head) {
    int n = 0;
    struct ListNode* p = head;
    while (p) { n++; p = p->next; }
    struct ListNode* cur = head;
    return build(&cur, 0, n - 1);
}
```

```cpp [C++]
class Solution {
public:
    TreeNode* sortedListToBST(ListNode* head) {
        int n = 0;
        ListNode* p = head;
        while (p) { n++; p = p->next; }
        cur = head;
        return build(0, n - 1);
    }
private:
    ListNode* cur;
    TreeNode* build(int left, int right) {
        if (left > right) return nullptr;
        int mid = left + (right - left) / 2;
        TreeNode* leftChild = build(left, mid - 1);
        TreeNode* root = new TreeNode(cur->val);
        cur = cur->next;
        root->left = leftChild;
        root->right = build(mid + 1, right);
        return root;
    }
};
```

```js [JavaScript]
var sortedListToBST = function(head) {
    let n = 0, p = head;
    while (p) { n++; p = p.next; }
    let cur = head;
    function build(left, right) {
        if (left > right) return null;
        const mid = left + Math.floor((right - left) / 2);
        const leftChild = build(left, mid - 1);
        const root = new TreeNode(cur.val);
        cur = cur.next;
        root.left = leftChild;
        root.right = build(mid + 1, right);
        return root;
    }
    return build(0, n - 1);
};
```

```ts [TypeScript]
function sortedListToBST(head: ListNode | null): TreeNode | null {
    let n = 0;
    let p = head;
    while (p) { n++; p = p.next; }
    let cur = head;
    function build(left: number, right: number): TreeNode | null {
        if (left > right) return null;
        const mid = left + Math.floor((right - left) / 2);
        const leftChild = build(left, mid - 1);
        const root = new TreeNode(cur!.val);
        cur = cur!.next;
        root.left = leftChild;
        root.right = build(mid + 1, right);
        return root;
    }
    return build(0, n - 1);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点只访问一次。
- **空间复杂度**：`O(log n)`，递归栈深度。

---

## 三、总结

| 方法                  | 时间复杂度   | 空间复杂度 | 特点         |
| --------------------- | ------------ | ---------- | ------------ |
| 递归 + 快慢指针找中点 | `O(n log n)` | `O(log n)` | 直观，但较慢 |
| 中序遍历模拟          | `O(n)`       | `O(log n)` | 更优，推荐   |

**推荐**：面试中优先使用 **方法二（中序遍历模拟）**，时间复杂度 `O(n)`，效率更高。方法一虽然直观，但在链表长度较大时可能超时。