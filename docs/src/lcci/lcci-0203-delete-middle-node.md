# [面试题 02.03. 删除中间节点](https://leetcode.cn/problems/delete-middle-node-lcci/)

## 一、题目描述

实现一种算法，删除单向链表中间的某个节点（即不是第一个或最后一个节点），假定你只能访问该节点。

**示例：**

```
输入：单向链表 a->b->c->d->e->f 中的节点 c
结果：不返回任何数据，但该链表变为 a->b->d->e->f
```

**说明：**

- 传入的 `node` 不会是链表的头节点或尾节点。
- 你只能访问该节点及其后继节点，无法访问头节点或前驱节点。

---

## 二、解答方法

### 2.1 方法一：复制后继节点值（覆盖删除）

**1. 思路**

由于无法访问前驱节点，我们无法直接删除当前节点。但我们可以将当前节点的值修改为下一个节点的值，然后删除下一个节点。这样就相当于“删除”了当前节点。具体步骤：

1. 将 `node.val` 赋值为 `node.next.val`。
2. 将 `node.next` 指向 `node.next.next`。

此方法时间复杂度 `O(1)`，空间复杂度 `O(1)`。

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
    public void deleteNode(ListNode node) {
        node.val = node.next.val;
        node.next = node.next.next;
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
    def deleteNode(self, node):
        node.val = node.next.val
        node.next = node.next.next
```

```go [Go]
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func deleteNode(node *ListNode) {
    node.Val = node.Next.Val
    node.Next = node.Next.Next
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
void deleteNode(struct ListNode* node) {
    node->val = node->next->val;
    node->next = node->next->next;
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
    void deleteNode(ListNode* node) {
        node->val = node->next->val;
        node->next = node->next->next;
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
var deleteNode = function(node) {
    node.val = node.next.val;
    node.next = node.next.next;
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
function deleteNode(node: ListNode | null): void {
    if (!node || !node.next) return;
    node.val = node.next.val;
    node.next = node.next.next;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`，只进行了常数次赋值操作。
- **空间复杂度**：`O(1)`，没有使用额外空间。

---

## 三、总结

由于本题限制只能访问待删除节点，唯一可行的解法是**复制后继节点值并跳过后继**，因此只有一种有效方法。

| 方法     | 时间复杂度 | 空间复杂度 | 特点                           |
| -------- | ---------- | ---------- | ------------------------------ |
| 复制后继 | `O(1)`     | `O(1)`     | 巧妙利用节点值覆盖，实现“删除” |

**推荐**：此解法是本题的标准答案，务必掌握。注意题目保证传入的节点不是尾节点，因此 `node.next` 一定存在。