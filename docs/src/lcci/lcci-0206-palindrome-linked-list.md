# [面试题 02.06. 回文链表](https://leetcode.cn/problems/palindrome-linked-list-lcci/)

## 一、题目描述

编写一个函数，检查输入的链表是否是回文的。

**示例 1：**

```
输入： 1->2
输出： false
```

**示例 2：**

```
输入： 1->2->2->1
输出： true
```

**进阶：**

你能否用 `O(n)` 时间复杂度和 `O(1)` 空间复杂度解决？

**提示：**

- 链表长度在 `[0, 100000]` 范围内。
- 节点值在 `[-1000000, 1000000]` 范围内。

---

## 二、解答方法

### 2.1 方法一：复制值到数组 + 双指针

**1. 思路**

遍历链表，将每个节点的值存入数组。然后使用双指针（一个指向数组头，一个指向数组尾）同时向中间移动，比较对应位置的值是否相等。若全部相等，则为回文链表。此方法时间复杂度 `O(n)`，空间复杂度 `O(n)`。

**2. 代码实现**

:::::: code-group

```java [Java]
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public boolean isPalindrome(ListNode head) {
        if (head == null) return true;
        List<Integer> vals = new ArrayList<>();
        ListNode cur = head;
        while (cur != null) {
            vals.add(cur.val);
            cur = cur.next;
        }
        int left = 0, right = vals.size() - 1;
        while (left < right) {
            if (!vals.get(left).equals(vals.get(right))) return false;
            left++;
            right--;
        }
        return true;
    }
}
```

```python [Python]
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def isPalindrome(self, head: ListNode) -> bool:
        if not head:
            return True
        vals = []
        cur = head
        while cur:
            vals.append(cur.val)
            cur = cur.next
        left, right = 0, len(vals) - 1
        while left < right:
            if vals[left] != vals[right]:
                return False
            left += 1
            right -= 1
        return True
```

```go [Go]
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func isPalindrome(head *ListNode) bool {
    if head == nil {
        return true
    }
    vals := []int{}
    for cur := head; cur != nil; cur = cur.Next {
        vals = append(vals, cur.Val)
    }
    left, right := 0, len(vals)-1
    for left < right {
        if vals[left] != vals[right] {
            return false
        }
        left++
        right--
    }
    return true
}
```

```c [C]
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
bool isPalindrome(struct ListNode* head) {
    if (!head) return true;
    // 先计算长度
    int len = 0;
    struct ListNode* cur = head;
    while (cur) {
        len++;
        cur = cur->next;
    }
    int* vals = (int*)malloc(len * sizeof(int));
    cur = head;
    for (int i = 0; i < len; i++) {
        vals[i] = cur->val;
        cur = cur->next;
    }
    int left = 0, right = len - 1;
    while (left < right) {
        if (vals[left] != vals[right]) {
            free(vals);
            return false;
        }
        left++;
        right--;
    }
    free(vals);
    return true;
}
```

```cpp [C++]
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
    bool isPalindrome(ListNode* head) {
        if (!head) return true;
        vector<int> vals;
        ListNode* cur = head;
        while (cur) {
            vals.push_back(cur->val);
            cur = cur->next;
        }
        int left = 0, right = vals.size() - 1;
        while (left < right) {
            if (vals[left] != vals[right]) return false;
            left++;
            right--;
        }
        return true;
    }
};
```

```javascript [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
var isPalindrome = function(head) {
    if (!head) return true;
    const vals = [];
    let cur = head;
    while (cur) {
        vals.push(cur.val);
        cur = cur.next;
    }
    let left = 0, right = vals.length - 1;
    while (left < right) {
        if (vals[left] !== vals[right]) return false;
        left++;
        right--;
    }
    return true;
};
```

```typescript [TypeScript]
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
function isPalindrome(head: ListNode | null): boolean {
    if (!head) return true;
    const vals: number[] = [];
    let cur = head;
    while (cur) {
        vals.push(cur.val);
        cur = cur.next;
    }
    let left = 0, right = vals.length - 1;
    while (left < right) {
        if (vals[left] !== vals[right]) return false;
        left++;
        right--;
    }
    return true;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，需要遍历链表一次填充数组，再遍历数组一次比较。
- **空间复杂度**：`O(n)`，需要存储所有节点的值。

---

### 2.2 方法二：快慢指针 + 反转后半部分（空间 O(1)）

**1. 思路**

1. 使用快慢指针找到链表的中点。慢指针每次走一步，快指针每次走两步。当快指针到达末尾时，慢指针指向中点（若链表长度为奇数，慢指针指向中间节点；为偶数，慢指针指向后半部分第一个节点）。
2. 将后半部分链表反转。
3. 然后从链表的头和反转后的后半部分同时遍历，比较对应节点的值是否相等。
4. 最后可选择恢复链表结构（但通常不要求，本题不要求恢复）。

此方法时间 `O(n)`，空间 `O(1)`。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) return true;
        // 找中点
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        // 反转后半部分
        ListNode secondHalf = reverse(slow);
        ListNode firstHalf = head;
        // 比较
        while (secondHalf != null) {
            if (firstHalf.val != secondHalf.val) return false;
            firstHalf = firstHalf.next;
            secondHalf = secondHalf.next;
        }
        return true;
    }
    private ListNode reverse(ListNode head) {
        ListNode prev = null;
        ListNode cur = head;
        while (cur != null) {
            ListNode next = cur.next;
            cur.next = prev;
            prev = cur;
            cur = next;
        }
        return prev;
    }
}
```

```python [Python]
class Solution:
    def isPalindrome(self, head: ListNode) -> bool:
        if not head or not head.next:
            return True
        # 找中点
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        # 反转后半部分
        def reverse(node):
            prev = None
            cur = node
            while cur:
                nxt = cur.next
                cur.next = prev
                prev = cur
                cur = nxt
            return prev
        second = reverse(slow)
        first = head
        # 比较
        while second:
            if first.val != second.val:
                return False
            first = first.next
            second = second.next
        return True
```

```go [Go]
func isPalindrome(head *ListNode) bool {
    if head == nil || head.Next == nil {
        return true
    }
    // 找中点
    slow, fast := head, head
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
    }
    // 反转后半部分
    var prev *ListNode
    cur := slow
    for cur != nil {
        nxt := cur.Next
        cur.Next = prev
        prev = cur
        cur = nxt
    }
    // 比较
    first := head
    second := prev
    for second != nil {
        if first.Val != second.Val {
            return false
        }
        first = first.Next
        second = second.Next
    }
    return true
}
```

```c [C]
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* reverse(struct ListNode* head) {
    struct ListNode* prev = NULL;
    struct ListNode* cur = head;
    while (cur) {
        struct ListNode* nxt = cur->next;
        cur->next = prev;
        prev = cur;
        cur = nxt;
    }
    return prev;
}
bool isPalindrome(struct ListNode* head) {
    if (!head || !head->next) return true;
    // 找中点
    struct ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    // 反转后半部分
    struct ListNode* second = reverse(slow);
    struct ListNode* first = head;
    while (second) {
        if (first->val != second->val) return false;
        first = first->next;
        second = second->next;
    }
    return true;
}
```

```cpp [C++]
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        if (!head || !head->next) return true;
        // 找中点
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        // 反转后半部分
        ListNode* second = reverse(slow);
        ListNode* first = head;
        while (second) {
            if (first->val != second->val) return false;
            first = first->next;
            second = second->next;
        }
        return true;
    }
private:
    ListNode* reverse(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* cur = head;
        while (cur) {
            ListNode* nxt = cur->next;
            cur->next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
    }
};
```

```javascript [JavaScript]
var isPalindrome = function(head) {
    if (!head || !head.next) return true;
    // 找中点
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    // 反转后半部分
    const reverse = (node) => {
        let prev = null;
        let cur = node;
        while (cur) {
            const nxt = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
    };
    let second = reverse(slow);
    let first = head;
    while (second) {
        if (first.val !== second.val) return false;
        first = first.next;
        second = second.next;
    }
    return true;
};
```

```typescript [TypeScript]
function isPalindrome(head: ListNode | null): boolean {
    if (!head || !head.next) return true;
    // 找中点
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    // 反转后半部分
    const reverse = (node: ListNode | null): ListNode | null => {
        let prev: ListNode | null = null;
        let cur = node;
        while (cur) {
            const nxt = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
    };
    let second = reverse(slow);
    let first = head;
    while (second) {
        if (first.val !== second.val) return false;
        first = first.next;
        second = second.next;
    }
    return true;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，找中点、反转、比较各需一次遍历。
- **空间复杂度**：`O(1)`，只使用了常数个指针变量。

---

### 2.3 方法三：递归（利用函数栈）

**1. 思路**

利用递归的回溯特性，用一个指针指向头节点，递归到链表末尾，然后比较头节点与尾节点的值，再逐步向内比较。此方法代码简洁，但空间复杂度为 `O(n)`（递归栈），且递归深度受栈大小限制，不推荐在生产环境使用。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    private ListNode left;
    public boolean isPalindrome(ListNode head) {
        left = head;
        return traverse(head);
    }
    private boolean traverse(ListNode right) {
        if (right == null) return true;
        boolean res = traverse(right.next);
        if (!res) return false;
        if (left.val != right.val) return false;
        left = left.next;
        return true;
    }
}
```

```python [Python]
class Solution:
    def isPalindrome(self, head: ListNode) -> bool:
        self.left = head
        def traverse(right):
            if not right:
                return True
            res = traverse(right.next)
            if not res:
                return False
            if self.left.val != right.val:
                return False
            self.left = self.left.next
            return True
        return traverse(head)
```

```go [Go]
func isPalindrome(head *ListNode) bool {
    var left *ListNode
    left = head
    var traverse func(*ListNode) bool
    traverse = func(right *ListNode) bool {
        if right == nil {
            return true
        }
        res := traverse(right.Next)
        if !res {
            return false
        }
        if left.Val != right.Val {
            return false
        }
        left = left.Next
        return true
    }
    return traverse(head)
}
```

```c [C]
struct ListNode* left;
bool traverse(struct ListNode* right) {
    if (!right) return true;
    bool res = traverse(right->next);
    if (!res) return false;
    if (left->val != right->val) return false;
    left = left->next;
    return true;
}
bool isPalindrome(struct ListNode* head) {
    left = head;
    return traverse(head);
}
```

```cpp [C++]
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        left = head;
        return traverse(head);
    }
private:
    ListNode* left;
    bool traverse(ListNode* right) {
        if (!right) return true;
        bool res = traverse(right->next);
        if (!res) return false;
        if (left->val != right->val) return false;
        left = left->next;
        return true;
    }
};
```

```javascript [JavaScript]
var isPalindrome = function(head) {
    let left = head;
    function traverse(right) {
        if (!right) return true;
        const res = traverse(right.next);
        if (!res) return false;
        if (left.val !== right.val) return false;
        left = left.next;
        return true;
    }
    return traverse(head);
};
```

```typescript [TypeScript]
function isPalindrome(head: ListNode | null): boolean {
    let left: ListNode | null = head;
    function traverse(right: ListNode | null): boolean {
        if (!right) return true;
        const res = traverse(right.next);
        if (!res) return false;
        if (left!.val !== right.val) return false;
        left = left!.next;
        return true;
    }
    return traverse(head);
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，递归遍历所有节点。
- **空间复杂度**：`O(n)`，递归栈深度。

---

## 三、总结

| 方法                    | 时间复杂度 | 空间复杂度 | 特点                         |
| ----------------------- | ---------- | ---------- | ---------------------------- |
| 复制到数组 + 双指针     | `O(n)`     | `O(n)`     | 简单直观，但需要额外空间     |
| 快慢指针 + 反转后半部分 | `O(n)`     | `O(1)`     | **推荐**，满足进阶要求       |
| 递归                    | `O(n)`     | `O(n)`     | 代码简洁，但栈风险高，不推荐 |

**推荐**：面试和实际生产中使用 **方法二（快慢指针 + 反转）**，时间 `O(n)`，空间 `O(1)`，是最优解。方法一可作为快速实现的备选，方法三仅用于理解递归思想。