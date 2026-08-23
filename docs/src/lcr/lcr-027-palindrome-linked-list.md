# [LCR 027. 回文链表](https://leetcode.cn/problems/aMhZSa/)



## 一、题目描述

给定一个链表的 **头节点** `head` ，请判断其是否为回文链表。

如果一个链表是回文，那么链表节点序列从前往后看和从后往前看是相同的。



**示例 1：**

```
输入: head = [1,2,3,3,2,1]
输出: true
```

**示例 2：**

```
输入: head = [1,2]
输出: false
```

**提示：**

- 链表 L 的长度范围为 `[1, 10⁵]`
- `0 <= node.val <= 9`



## 二、解答方法

### 2.1 方法一：快慢指针 + 反转后半段

1. **思路**

1. **找中点**：快慢指针，`slow` 走到中点（偶数长度时停在前半段末尾）；
2. **反转后半段**：把 `slow.next` 起的后半段反转；
3. **逐一比较**：前半段与反转后的后半段逐节点比较，相等即为回文。

时间 `O(n)`，空间 `O(1)`。比较结束后可再把后半段反转回去以还原链表（题目通常不要求）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public boolean isPalindrome(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode l2 = reverse(slow); // 从 slow 开始反转（含中点）
        ListNode l1 = head;
        while (l2 != null) {
            if (l1.val != l2.val) return false;
            l1 = l1.next;
            l2 = l2.next;
        }
        return true;
    }
    private ListNode reverse(ListNode head) {
        ListNode prev = null, cur = head;
        while (cur != null) {
            ListNode nxt = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
    }
}
```

```python [Python]
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        def reverse(h):
            prev, cur = None, h
            while cur:
                nxt = cur.next
                cur.next = prev
                prev = cur
                cur = nxt
            return prev
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        l2 = reverse(slow)
        l1 = head
        while l2:
            if l1.val != l2.val:
                return False
            l1 = l1.next
            l2 = l2.next
        return True
```

```cpp [C++]
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        ListNode* l2 = reverseList(slow);
        ListNode* l1 = head;
        while (l2) {
            if (l1->val != l2->val) return false;
            l1 = l1->next;
            l2 = l2->next;
        }
        return true;
    }
private:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        while (head) {
            ListNode* nxt = head->next;
            head->next = prev;
            prev = head;
            head = nxt;
        }
        return prev;
    }
};
```

```go [Go]
func isPalindrome(head *ListNode) bool {
    slow, fast := head, head
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
    }
    l2 := reverse(slow)
    l1 := head
    for l2 != nil {
        if l1.Val != l2.Val {
            return false
        }
        l1 = l1.Next
        l2 = l2.Next
    }
    return true
}

func reverse(head *ListNode) *ListNode {
    var prev *ListNode
    for head != nil {
        nxt := head.Next
        head.Next = prev
        prev = head
        head = nxt
    }
    return prev
}
```

```js [JavaScript]
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    const reverse = (h) => {
        let prev = null, cur = h;
        while (cur) {
            const nxt = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
    };
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    let l2 = reverse(slow);
    let l1 = head;
    while (l2) {
        if (l1.val !== l2.val) return false;
        l1 = l1.next;
        l2 = l2.next;
    }
    return true;
};
```

```c [C]
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

static struct ListNode* reverse(struct ListNode* head) {
    struct ListNode* prev = NULL;
    while (head) {
        struct ListNode* nxt = head->next;
        head->next = prev;
        prev = head;
        head = nxt;
    }
    return prev;
}

int isPalindrome(struct ListNode* head) {
    struct ListNode* slow = head;
    struct ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    struct ListNode* l2 = reverse(slow);
    struct ListNode* l1 = head;
    while (l2) {
        if (l1->val != l2->val) return 0;
        l1 = l1->next;
        l2 = l2->next;
    }
    return 1;
}
```

```ts [TypeScript]
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val ?? 0;
        this.next = next ?? null;
    }
}

function isPalindrome(head: ListNode | null): boolean {
    const reverse = (h: ListNode | null): ListNode | null => {
        let prev: ListNode | null = null;
        let cur = h;
        while (cur) {
            const nxt = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
    };
    let slow: ListNode | null = head, fast: ListNode | null = head;
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }
    let l2 = reverse(slow);
    let l1: ListNode | null = head;
    while (l2) {
        if (l1!.val !== l2.val) return false;
        l1 = l1!.next;
        l2 = l2.next;
    }
    return true;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：复制到数组后双指针

1. **思路**

先遍历链表把值存入数组，再用左右指针判断数组是否回文。实现简单，但空间 `O(n)`。适合对空间没有额外要求或需要保留原链表结构的场景。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public boolean isPalindrome(ListNode head) {
        List<Integer> vals = new ArrayList<>();
        for (ListNode p = head; p != null; p = p.next) vals.add(p.val);
        int l = 0, r = vals.size() - 1;
        while (l < r) {
            if (!vals.get(l++).equals(vals.get(r--))) return false;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        vals = []
        while head:
            vals.append(head.val)
            head = head.next
        return vals == vals[::-1]
```

```cpp [C++]
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        vector<int> vals;
        for (ListNode* p = head; p; p = p->next) vals.push_back(p->val);
        int l = 0, r = vals.size() - 1;
        while (l < r) {
            if (vals[l++] != vals[r--]) return false;
        }
        return true;
    }
};
```

```go [Go]
func isPalindrome(head *ListNode) bool {
    var vals []int
    for p := head; p != nil; p = p.Next {
        vals = append(vals, p.Val)
    }
    l, r := 0, len(vals)-1
    for l < r {
        if vals[l] != vals[r] {
            return false
        }
        l++
        r--
    }
    return true
}
```

```js [JavaScript]
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    const vals = [];
    for (let p = head; p; p = p.next) vals.push(p.val);
    let l = 0, r = vals.length - 1;
    while (l < r) {
        if (vals[l++] !== vals[r--]) return false;
    }
    return true;
};
```

```c [C]
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

int isPalindrome(struct ListNode* head) {
    int vals[100000], cnt = 0;
    for (struct ListNode* p = head; p; p = p->next) vals[cnt++] = p->val;
    int l = 0, r = cnt - 1;
    while (l < r) {
        if (vals[l++] != vals[r--]) return 0;
    }
    return 1;
}
```

```ts [TypeScript]
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val ?? 0;
        this.next = next ?? null;
    }
}

function isPalindrome(head: ListNode | null): boolean {
    const vals: number[] = [];
    for (let p = head; p; p = p.next) vals.push(p.val);
    let l = 0, r = vals.length - 1;
    while (l < r) {
        if (vals[l++] !== vals[r--]) return false;
    }
    return true;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 快慢指针 + 反转 | `O(n)` | `O(1)` | 最优，空间常数 |
| 数组双指针 | `O(n)` | `O(n)` | 简单直观 |

链表回文判断的进阶要求是 `O(1)` 空间，通过「找中点 + 反转后半段 + 比较」实现，是链表常见考法。

