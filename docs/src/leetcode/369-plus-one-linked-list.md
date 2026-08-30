# [369. 给单链表加一](https://leetcode.cn/problems/plus-one-linked-list/) [🔒 会员题]

## 一、题目描述

给定一个用 **非负整数** 各数位构成的单链表（最高位在表头），给该数 **加一**，返回新的链表头。链表节点不为 0 时不会出现前导零。

**示例：**
```
输入：1 -> 2 -> 3   输出：1 -> 2 -> 4
输入：9 -> 9        输出：1 -> 0 -> 0
```

**提示：** 链表长度 `[1, 100]`，`0 <= Node.val <= 9`，最高位不为 0（除数本身为 0）。

## 二、解答方法

### 方法一：反转链表 + 加一 + 反转

**思路：** 反转链表使个位在头，逐位加一（进位处理），再反转回来。简单直观。进位可能新增节点（如 99→100）。

:::::: code-group

```java [Java]
class Solution {
    public ListNode plusOne(ListNode head) {
        head = reverse(head);
        int carry = 1; ListNode cur = head;
        while (cur != null) {
            int sum = cur.val + carry;
            cur.val = sum % 10; carry = sum / 10;
            if (carry == 0) break;
            if (cur.next == null && carry == 1) { cur.next = new ListNode(1); break; }
            cur = cur.next;
        }
        return reverse(head);
    }
    ListNode reverse(ListNode h) {
        ListNode prev = null;
        while (h != null) { ListNode nxt = h.next; h.next = prev; prev = h; h = nxt; }
        return prev;
    }
}
```

```python [Python]
class Solution:
    def plusOne(self, head: ListNode) -> ListNode:
        def rev(h):
            prev = None
            while h: nxt = h.next; h.next = prev; prev = h; h = nxt
            return prev
        head = rev(head)
        carry = 1; cur = head
        while cur:
            s = cur.val + carry; cur.val = s % 10; carry = s // 10
            if carry == 0: break
            if not cur.next: cur.next = ListNode(1); break
            cur = cur.next
        return rev(head)
```

```cpp [C++]
class Solution {
public:
    ListNode* plusOne(ListNode* head) {
        auto rev = [](ListNode* h){
            ListNode* prev=nullptr;
            while(h){ ListNode* nxt=h->next; h->next=prev; prev=h; h=nxt; }
            return prev;
        };
        head = rev(head);
        int carry=1; ListNode* cur=head;
        while(cur){
            int s=cur->val+carry; cur->val=s%10; carry=s/10;
            if(carry==0) break;
            if(!cur->next){ cur->next=new ListNode(1); break; }
            cur=cur->next;
        }
        return rev(head);
    }
};
```

```go [Go]
func plusOne(head *ListNode) *ListNode {
    rev := func(h *ListNode) *ListNode {
        var prev *ListNode
        for h != nil { nxt := h.Next; h.Next = prev; prev = h; h = nxt }
        return prev
    }
    head = rev(head)
    carry := 1; cur := head
    for cur != nil {
        s := cur.Val + carry; cur.Val = s % 10; carry = s / 10
        if carry == 0 { break }
        if cur.Next == nil { cur.Next = &ListNode{Val:1}; break }
        cur = cur.Next
    }
    return rev(head)
}
```

```js [JavaScript]
var plusOne = function (head) {
    const rev = h => { let prev=null; while(h){ const nxt=h.next; h.next=prev; prev=h; h=nxt; } return prev; };
    head = rev(head);
    let carry=1, cur=head;
    while(cur){
        const s=cur.val+carry; cur.val=s%10; carry=Math.floor(s/10);
        if(carry===0) break;
        if(!cur.next){ cur.next=new ListNode(1); break; }
        cur=cur.next;
    }
    return rev(head);
};
```

::::::

### 方法二：递归（不反转）

**思路：** 递归到表尾加一，返回进位向上传递；若到头仍有进位则在最前插入 `1`。

:::::: code-group

```java [Java]
class Solution {
    public ListNode plusOne(ListNode head) {
        int carry = dfs(head);
        if (carry == 1) { ListNode nh = new ListNode(1); nh.next = head; head = nh; }
        return head;
    }
    int dfs(ListNode node) {
        if (node == null) return 1;
        int carry = dfs(node.next);
        int sum = node.val + carry;
        node.val = sum % 10;
        return sum / 10;
    }
}
```

```python [Python]
class Solution:
    def plusOne(self, head: ListNode) -> ListNode:
        def dfs(node):
            if not node: return 1
            carry = dfs(node.next)
            s = node.val + carry; node.val = s % 10
            return s // 10
        if dfs(head) == 1: return ListNode(1, head)
        return head
```

```cpp [C++]
class Solution {
public:
    ListNode* plusOne(ListNode* head) {
        function<int(ListNode*)> dfs = [&](ListNode* node){
            if(!node) return 1;
            int carry=dfs(node->next);
            int s=node->val+carry; node->val=s%10; return s/10;
        };
        if(dfs(head)==1){ ListNode* nh=new ListNode(1); nh->next=head; return nh; }
        return head;
    }
};
```

```go [Go]
func plusOne(head *ListNode) *ListNode {
    var dfs func(*ListNode) int
    dfs = func(node *ListNode) int {
        if node == nil { return 1 }
        carry := dfs(node.Next)
        s := node.Val + carry; node.Val = s % 10
        return s / 10
    }
    if dfs(head) == 1 { return &ListNode{Val:1, Next: head} }
    return head
}
```

```js [JavaScript]
var plusOne = function (head) {
    const dfs = (node) => {
        if (!node) return 1;
        const carry = dfs(node.next);
        const s = node.val + carry; node.val = s % 10;
        return Math.floor(s/10);
    };
    if (dfs(head) === 1) return new ListNode(1, head);
    return head;
};
```

::::::

**复杂度：** 反转法 `O(n)` 三次遍历，递归法 `O(n)`（递归栈）。空间反转 `O(1)`、递归 `O(n)` 栈。

## 三、总结

单链表加法类：因高位在前，要么「反转两次」要么「递归到尾再回传进位」。注意 `99→100` 需新增最高位节点。同类：`2 两数相加`（链表逆序加法，比本题简单，因个位本就在头）、`67 二进制求和`。
