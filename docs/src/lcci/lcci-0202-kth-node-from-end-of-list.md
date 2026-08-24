# [面试题 02.02. 返回倒数第 k 个节点](https://leetcode.cn/problems/kth-node-from-end-of-list-lcci/)

## 一、题目描述

实现一种算法，找出单向链表中倒数第 `k` 个节点。返回该节点的值。

**示例：**

```
输入： 1->2->3->4->5 和 k = 2
输出： 4
```

**说明：**

- 给定的 `k` 保证是有效的，即 `1 <= k <= 链表长度`。

---

## 二、解答方法

### 2.1 方法一：快慢指针（一次遍历）

**1. 思路**

使用两个指针 `fast` 和 `slow`，初始都指向头节点。先将 `fast` 向前移动 `k` 步，然后 `fast` 和 `slow` 同时向前移动。当 `fast` 到达链表末尾时，`slow` 正好指向倒数第 `k` 个节点。此方法只需一次遍历，时间复杂度 `O(n)`，空间复杂度 `O(1)`。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int kthToLast(ListNode head, int k) {
        ListNode fast = head, slow = head;
        for (int i = 0; i < k; i++) {
            fast = fast.next;
        }
        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }
        return slow.val;
    }
}
```

```python [Python]
class Solution:
    def kthToLast(self, head: ListNode, k: int) -> int:
        fast = slow = head
        for _ in range(k):
            fast = fast.next
        while fast:
            fast = fast.next
            slow = slow.next
        return slow.val
```

```go [Go]
func kthToLast(head *ListNode, k int) int {
    fast, slow := head, head
    for i := 0; i < k; i++ {
        fast = fast.Next
    }
    for fast != nil {
        fast = fast.Next
        slow = slow.Next
    }
    return slow.Val
}
```

```c [C]
int kthToLast(struct ListNode* head, int k) {
    struct ListNode* fast = head;
    struct ListNode* slow = head;
    for (int i = 0; i < k; i++) {
        fast = fast->next;
    }
    while (fast) {
        fast = fast->next;
        slow = slow->next;
    }
    return slow->val;
}
```

```cpp [C++]
class Solution {
public:
    int kthToLast(ListNode* head, int k) {
        ListNode* fast = head;
        ListNode* slow = head;
        for (int i = 0; i < k; i++) {
            fast = fast->next;
        }
        while (fast) {
            fast = fast->next;
            slow = slow->next;
        }
        return slow->val;
    }
};
```

```javascript [JavaScript]
var kthToLast = function(head, k) {
    let fast = head, slow = head;
    for (let i = 0; i < k; i++) {
        fast = fast.next;
    }
    while (fast) {
        fast = fast.next;
        slow = slow.next;
    }
    return slow.val;
};
```

```typescript [TypeScript]
function kthToLast(head: ListNode | null, k: number): number {
    let fast = head, slow = head;
    for (let i = 0; i < k; i++) {
        fast = fast!.next;
    }
    while (fast) {
        fast = fast.next;
        slow = slow!.next;
    }
    return slow!.val;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，其中 `n` 为链表长度，只需遍历一次。
- **空间复杂度**：`O(1)`，只使用两个指针。

---

### 2.2 方法二：先计算长度再遍历

**1. 思路**

先遍历一次链表，计算出链表总长度 `len`，则倒数第 `k` 个节点即为正数第 `len - k + 1` 个节点（从 1 开始计数）。然后再次遍历到该节点并返回其值。需要两次遍历，但思路直观。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int kthToLast(ListNode head, int k) {
        int len = 0;
        ListNode cur = head;
        while (cur != null) {
            len++;
            cur = cur.next;
        }
        cur = head;
        for (int i = 0; i < len - k; i++) {
            cur = cur.next;
        }
        return cur.val;
    }
}
```

```python [Python]
class Solution:
    def kthToLast(self, head: ListNode, k: int) -> int:
        length = 0
        cur = head
        while cur:
            length += 1
            cur = cur.next
        cur = head
        for _ in range(length - k):
            cur = cur.next
        return cur.val
```

```go [Go]
func kthToLast(head *ListNode, k int) int {
    length := 0
    cur := head
    for cur != nil {
        length++
        cur = cur.Next
    }
    cur = head
    for i := 0; i < length-k; i++ {
        cur = cur.Next
    }
    return cur.Val
}
```

```c [C]
int kthToLast(struct ListNode* head, int k) {
    int length = 0;
    struct ListNode* cur = head;
    while (cur) {
        length++;
        cur = cur->next;
    }
    cur = head;
    for (int i = 0; i < length - k; i++) {
        cur = cur->next;
    }
    return cur->val;
}
```

```cpp [C++]
class Solution {
public:
    int kthToLast(ListNode* head, int k) {
        int length = 0;
        ListNode* cur = head;
        while (cur) {
            length++;
            cur = cur->next;
        }
        cur = head;
        for (int i = 0; i < length - k; i++) {
            cur = cur->next;
        }
        return cur->val;
    }
};
```

```javascript [JavaScript]
var kthToLast = function(head, k) {
    let length = 0;
    let cur = head;
    while (cur) {
        length++;
        cur = cur.next;
    }
    cur = head;
    for (let i = 0; i < length - k; i++) {
        cur = cur.next;
    }
    return cur.val;
};
```

```typescript [TypeScript]
function kthToLast(head: ListNode | null, k: number): number {
    let length = 0;
    let cur = head;
    while (cur) {
        length++;
        cur = cur.next;
    }
    cur = head;
    for (let i = 0; i < length - k; i++) {
        cur = cur!.next;
    }
    return cur!.val;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，需要两次遍历，总次数为 `n + (n-k)`，仍为 `O(n)`。
- **空间复杂度**：`O(1)`，只使用常数空间。

---

### 2.3 方法三：递归

**1. 思路**

使用递归回溯，每层递归返回当前节点是倒数第几个。当 `count == k` 时，记录当前节点的值。此方法利用了递归栈的天然回溯特性，但需注意链表过长时可能栈溢出，且需要借助外部变量或返回值来传递结果。代码相对简洁，但不如迭代方法高效。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    private int count = 0;
    private int result = 0;

    public int kthToLast(ListNode head, int k) {
        helper(head, k);
        return result;
    }

    private void helper(ListNode node, int k) {
        if (node == null) return;
        helper(node.next, k);
        count++;
        if (count == k) {
            result = node.val;
        }
    }
}
```

```python [Python]
class Solution:
    def kthToLast(self, head: ListNode, k: int) -> int:
        self.count = 0
        self.result = 0

        def helper(node):
            if not node:
                return
            helper(node.next)
            self.count += 1
            if self.count == k:
                self.result = node.val

        helper(head)
        return self.result
```

```go [Go]
func kthToLast(head *ListNode, k int) int {
    count := 0
    result := 0
    var helper func(*ListNode)
    helper = func(node *ListNode) {
        if node == nil {
            return
        }
        helper(node.Next)
        count++
        if count == k {
            result = node.Val
        }
    }
    helper(head)
    return result
}
```

```c [C]
int count = 0;
int result = 0;

void helper(struct ListNode* node, int k) {
    if (!node) return;
    helper(node->next, k);
    count++;
    if (count == k) {
        result = node->val;
    }
}

int kthToLast(struct ListNode* head, int k) {
    count = 0;
    result = 0;
    helper(head, k);
    return result;
}
```

```cpp [C++]
class Solution {
public:
    int kthToLast(ListNode* head, int k) {
        count = 0;
        result = 0;
        helper(head, k);
        return result;
    }

private:
    int count;
    int result;
    void helper(ListNode* node, int k) {
        if (!node) return;
        helper(node->next, k);
        count++;
        if (count == k) {
            result = node->val;
        }
    }
};
```

```javascript [JavaScript]
var kthToLast = function(head, k) {
    let count = 0;
    let result = 0;
    function helper(node) {
        if (!node) return;
        helper(node.next);
        count++;
        if (count === k) {
            result = node.val;
        }
    }
    helper(head);
    return result;
};
```

```typescript [TypeScript]
function kthToLast(head: ListNode | null, k: number): number {
    let count = 0;
    let result = 0;
    function helper(node: ListNode | null): void {
        if (!node) return;
        helper(node.next);
        count++;
        if (count === k) {
            result = node.val;
        }
    }
    helper(head);
    return result;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，需要递归遍历所有节点。
- **空间复杂度**：`O(n)`，递归栈深度为链表长度，最坏情况 `O(n)`。

---

## 三、总结

| 方法       | 时间复杂度 | 空间复杂度 | 特点                         |
| ---------- | ---------- | ---------- | ---------------------------- |
| 快慢指针   | `O(n)`     | `O(1)`     | **推荐**，一次遍历，空间最优 |
| 先计算长度 | `O(n)`     | `O(1)`     | 直观，但需两次遍历           |
| 递归       | `O(n)`     | `O(n)`     | 简洁，但有栈溢出风险         |

**推荐**：面试中首选 **方法一（快慢指针）**，时间 `O(n)`，空间 `O(1)`，且只需一次遍历，是本题的最优解法。递归方法虽然代码简洁，但空间开销较大，且链表长度不确定时可能栈溢出，不推荐在生产环境或大数据情况下使用。