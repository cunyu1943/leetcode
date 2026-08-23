# [LCR 029. 循环有序列表的插入](https://leetcode.cn/problems/4ueAj6/)



## 一、题目描述

给定 **循环单调非递减列表** 中的一个点，写一个函数向这个列表中插入一个新元素 `insertVal` ，使这个列表仍然是循环非递减列表。

给定的可以是这个列表中任意一个顶点的指针，不一定一定是这个列表中最小元素的指针。

如果有多个满足条件的插入位置，可以选择任意一个位置插入新值，插入后整个列表仍然保持有序。如果列表为空（给定的节点是 `null`），需要创建一个循环有序列表并返回这个节点。否则，请返回原先给定的节点。



**示例 1：**

```
输入：head = [3,4,1], insertVal = 2
输出：[3,4,1,2]
```

**示例 2：**

```
输入：head = [], insertVal = 1
输出：[1]
```

**示例 3：**

```
输入：head = [1], insertVal = 0
输出：[1,0]
```

**提示：**

- `0 <= Number of Nodes <= 5 * 10⁴`
- `-10⁶ <= Node.val <= 10⁶`
- `-10⁶ <= insertVal <= 10⁶`



## 二、解答方法

### 2.1 方法一：一次遍历（找插入点）

1. **思路**

遍历循环链表，找到插入位置，分三种情况：

- **链表为空**：新建节点，`next` 指向自己，直接返回；
- **一般情况**：找到相邻两节点 `prev`、`cur` 满足 `prev.val <= insertVal <= cur.val`，插入在 `prev` 之后；
- **拐点（最大值↘最小值）**：当遍历发现 `prev.val > cur.val`（即越过降序断点），说明已绕一整圈。此时若 `insertVal >= prev.val` 或 `insertVal <= cur.val`，就插在 `prev` 之后（在最大值之后或最小值之前）。

遍历一圈未找到则插在任意位置（例如 `head` 之前）。时间 `O(n)`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public Node insert(Node head, int insertVal) {
        Node node = new Node(insertVal);
        if (head == null) {
            node.next = node;
            return node;
        }
        Node prev = head, cur = head.next;
        while (cur != head) {
            if (prev.val <= insertVal && insertVal <= cur.val) {
                break; // 情况一：在升序区间内
            } else if (prev.val > cur.val) {
                // 情况二：跨过拐点（最大值 -> 最小值）
                if (insertVal >= prev.val || insertVal <= cur.val) break;
            }
            prev = cur;
            cur = cur.next;
        }
        // 情况三：绕完一整圈未找到合适位置，插在 prev 之后
        prev.next = node;
        node.next = cur;
        return head;
    }
}
```

```python [Python]
class Solution:
    def insert(self, head: 'Node', insertVal: int) -> 'Node':
        node = Node(insertVal)
        if not head:
            node.next = node
            return node
        prev, cur = head, head.next
        while cur != head:
            if prev.val <= insertVal <= cur.val:
                break
            elif prev.val > cur.val:
                if insertVal >= prev.val or insertVal <= cur.val:
                    break
            prev, cur = cur, cur.next
        prev.next = node
        node.next = cur
        return head
```

```cpp [C++]
class Solution {
public:
    Node* insert(Node* head, int insertVal) {
        Node* node = new Node(insertVal);
        if (!head) { node->next = node; return node; }
        Node* prev = head;
        Node* cur = head->next;
        while (cur != head) {
            if (prev->val <= insertVal && insertVal <= cur->val) break;
            else if (prev->val > cur->val) {
                if (insertVal >= prev->val || insertVal <= cur->val) break;
            }
            prev = cur;
            cur = cur->next;
        }
        prev->next = node;
        node->next = cur;
        return head;
    }
};
```

```go [Go]
func insert(head *Node, insertVal int) *Node {
    node := &Node{Val: insertVal}
    if head == nil {
        node.Next = node
        return node
    }
    prev, cur := head, head.Next
    for cur != head {
        if prev.Val <= insertVal && insertVal <= cur.Val {
            break
        } else if prev.Val > cur.Val {
            if insertVal >= prev.Val || insertVal <= cur.Val {
                break
            }
        }
        prev = cur
        cur = cur.Next
    }
    prev.Next = node
    node.Next = cur
    return head
}
```

```js [JavaScript]
/**
 * @param {Node} head
 * @param {number} insertVal
 * @return {Node}
 */
var insert = function (head, insertVal) {
    const node = new Node(insertVal);
    if (!head) { node.next = node; return node; }
    let prev = head, cur = head.next;
    while (cur !== head) {
        if (prev.val <= insertVal && insertVal <= cur.val) break;
        else if (prev.val > cur.val) {
            if (insertVal >= prev.val || insertVal <= cur.val) break;
        }
        prev = cur;
        cur = cur.next;
    }
    prev.next = node;
    node.next = cur;
    return head;
};
```

```c [C]
#include <stdlib.h>

struct Node {
    int val;
    struct Node* next;
};

struct Node* insert(struct Node* head, int insertVal) {
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->val = insertVal;
    if (!head) {
        node->next = node;
        return node;
    }
    struct Node* prev = head;
    struct Node* cur = head->next;
    while (cur != head) {
        if (prev->val <= insertVal && insertVal <= cur->val) break;
        else if (prev->val > cur->val) {
            if (insertVal >= prev->val || insertVal <= cur->val) break;
        }
        prev = cur;
        cur = cur->next;
    }
    prev->next = node;
    node->next = cur;
    return head;
}
```

```ts [TypeScript]
class Node {
    val: number;
    next: Node | null;
    constructor(val?: number, next?: Node) {
        this.val = val ?? 0;
        this.next = next ?? null;
    }
}

function insert(head: Node | null, insertVal: number): Node | null {
    const node = new Node(insertVal);
    if (!head) { node.next = node; return node; }
    let prev: Node = head, cur: Node = head.next!;
    while (cur !== head) {
        if (prev.val <= insertVal && insertVal <= cur.val) break;
        else if (prev.val > cur.val) {
            if (insertVal >= prev.val || insertVal <= cur.val) break;
        }
        prev = cur;
        cur = cur.next!;
    }
    prev.next = node;
    node.next = cur;
    return head;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，最多绕一圈。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 一次遍历找插入点 | `O(n)` | `O(1)` | 关键在拐点处的判断 |

循环链表插入的关键是识别「升序断点」（最大值之后接最小值）：普通值插入到升序区间内，极值则插入到拐点处，保证插入后仍整体非递减。

