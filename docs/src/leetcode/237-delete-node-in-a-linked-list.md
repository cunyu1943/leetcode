# [237. 删除链表中的节点](https://leetcode.cn/problems/delete-node-in-a-linked-list/)



## 一、题目描述

有一个单链表的 `head`，我们想删除它其中的一个节点 `node`。

给你一个需要删除的节点 `node` 。你将 **无法访问** 第一个节点 `head`。

链表的所有值都是 **唯一的**，并且保证给定的节点 `node` 不是链表中的最后一个节点。

删除链表的节点需要让该节点的前一个节点指向该节点的下一个节点。但是因为无法访问 `head`，所以我们 **不能直接得到** 被删除节点的前一个节点。我们需要想出一种方法，使删除操作可以在不访问 `head` 的情况下完成。

请你 **删除** 给定的节点。注意，删除节点并不是指从内存中删除它，而是：

-   给定节点的值不应该存在于链表中。
-   链表中的节点数应该减少 1。
-   `node` 前面的所有值顺序相同。
-   `node` 后面的所有值顺序相同。

**示例 1：**

```
输入：head = [4,5,1,9], node = 5
输出：[4,1,9]
解释：给定你链表中值为 5 的第二个节点，在调用了你的函数之后，该链表应变为 4 -> 1 -> 9。
```

**示例 2：**

```
输入：head = [4,5,1,9], node = 1
输出：[4,5,9]
```

**提示：**

-   链表中节点的数目范围是 `[2, 1000]`
-   `-1000 <= Node.val <= 1000`
-   链表中每个节点的值都是 **唯一** 的
-   需要删除的节点 `node` 是 **链表中的节点** ，且 **不是末尾节点**



## 二、解答方法

### 2.1 方法一：与后继节点交换（「借尸还魂」）

1. **思路**

无法访问前驱节点，但可以访问后继节点。做法：

1. 把 **后继节点的值** 复制到当前节点：`node.val = node.next.val`；
2. 把当前节点的 `next` 指向后继的后继：`node.next = node.next.next`。

效果上等价于「删除了当前节点」—— 链表长度减 1，且当前节点原来的值不再存在。

2. **代码实现**

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
        node.val = node.next.val;        // 用后继的值覆盖自己
        node.next = node.next.next;      // 跳过后继
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
        """
        :type node: ListNode
        :rtype: void Do not return anything, modify node in-place instead.
        """
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

```cpp [C++]
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(nullptr) {}
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

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
    node.val = node.next.val;
    node.next = node.next.next;
};
```

```ts [TypeScript]
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
/**
 * @param {ListNode | null} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
function deleteNode(node: ListNode | null): void {
    if (!node || !node.next) return;
    node.val = node.next.val;
    node.next = node.next.next;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(1)`。
- **空间复杂度**：`O(1)`。

## 三、总结

这是一道 **脑筋急转弯** 题。常规删除需要前驱节点，但题目只给了「待删节点本身」——于是换个角度：**不删自己，而是把自己伪装成后继节点，再删掉真正的后继**。

前提条件（题目保证）：
1. `node` **不是尾节点**（否则没有后继可借）；
2. 链表值唯一（保证复制值不会产生歧义）。

严格来说，被「删除」的是 `node.next` 这个对象，`node` 对象本身仍在，只是值被覆盖了。若节点持有外部引用或含复杂数据，这种技巧需谨慎使用。
