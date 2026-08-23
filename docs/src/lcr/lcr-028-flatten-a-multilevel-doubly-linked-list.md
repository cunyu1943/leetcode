# [LCR 028. 扁平化多级双向链表](https://leetcode.cn/problems/Qv1Da2/)



## 一、题目描述

多级双向链表中，除了指向下一个节点和前一个节点之外，它还有一个子链表指针，可能指向单独的双向链表。这些子列表也可能有一个或多个自己的子项，依此类推，生成多级数据结构，如下面的示例。

给你位于列表第一级的头节点，请你扁平化列表，使所有结点出现在单级双链表中。



**示例 1：**

```
输入：head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
输出：[1,2,3,7,8,11,12,9,10,4,5,6]
```

**示例 2：**

```
输入：head = [1,2,null,3]
输出：[1,3,2]
```

**提示：**

- 节点数目不超过 `1000`
- `1 <= Node.val <= 10⁵`



## 二、解答方法

### 2.1 方法一：深度优先（递归展平）

1. **思路**

每个节点若有 `child`，则先处理它的子链表：

- 递归调用 `flatten(node.child)` 得到展平后的子链表头；
- 把子链表头接到 `node.next` 之前，即 `node.next = childHead, childHead.prev = node`；
- 找到子链表尾 `tail`，把原 `next` 接到 `tail.next`，并置 `node.child = null`。

也可以写成「先序遍历」的形式：遇到有 child 的节点，先把 child 链表整体插入到当前节点与 next 之间，再继续向下遍历。时间 `O(n)`，空间 `O(n)`（递归栈，最坏链状）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public Node flatten(Node head) {
        dfs(head);
        return head;
    }
    private Node dfs(Node node) {
        Node cur = node, last = node;
        while (cur != null) {
            Node next = cur.next;
            if (cur.child != null) {
                Node childTail = dfs(cur.child);
                // 把 child 链插入 cur 与 next 之间
                cur.next = cur.child;
                cur.child.prev = cur;
                if (next != null) {
                    childTail.next = next;
                    next.prev = childTail;
                }
                cur.child = null;
                last = childTail;
            } else {
                last = cur;
            }
            cur = next;
        }
        return last;
    }
}
```

```python [Python]
class Solution:
    def flatten(self, head: 'Node') -> 'Node':
        def dfs(node):
            cur = node
            last = node
            while cur:
                nxt = cur.next
                if cur.child:
                    child_tail = dfs(cur.child)
                    cur.next = cur.child
                    cur.child.prev = cur
                    if nxt:
                        child_tail.next = nxt
                        nxt.prev = child_tail
                    cur.child = None
                    last = child_tail
                else:
                    last = cur
                cur = nxt
            return last
        dfs(head)
        return head
```

```cpp [C++]
class Solution {
public:
    Node* flatten(Node* head) {
        dfs(head);
        return head;
    }
private:
    Node* dfs(Node* node) {
        Node* cur = node;
        Node* last = node;
        while (cur) {
            Node* next = cur->next;
            if (cur->child) {
                Node* childTail = dfs(cur->child);
                cur->next = cur->child;
                cur->child->prev = cur;
                if (next) {
                    childTail->next = next;
                    next->prev = childTail;
                }
                cur->child = nullptr;
                last = childTail;
            } else {
                last = cur;
            }
            cur = next;
        }
        return last;
    }
};
```

```go [Go]
func flatten(head *Node) *Node {
    var dfs func(node *Node) *Node
    dfs = func(node *Node) *Node {
        cur := node
        last := node
        for cur != nil {
            nxt := cur.Next
            if cur.Child != nil {
                childTail := dfs(cur.Child)
                cur.Next = cur.Child
                cur.Child.Prev = cur
                if nxt != nil {
                    childTail.Next = nxt
                    nxt.Prev = childTail
                }
                cur.Child = nil
                last = childTail
            } else {
                last = cur
            }
            cur = nxt
        }
        return last
    }
    dfs(head)
    return head
}
```

```js [JavaScript]
/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function (head) {
    const dfs = (node) => {
        let cur = node, last = node;
        while (cur) {
            const nxt = cur.next;
            if (cur.child) {
                const childTail = dfs(cur.child);
                cur.next = cur.child;
                cur.child.prev = cur;
                if (nxt) {
                    childTail.next = nxt;
                    nxt.prev = childTail;
                }
                cur.child = null;
                last = childTail;
            } else {
                last = cur;
            }
            cur = nxt;
        }
        return last;
    };
    dfs(head);
    return head;
};
```

```c [C]
#include <stdlib.h>

struct Node {
    int val;
    struct Node* prev;
    struct Node* next;
    struct Node* child;
};

static struct Node* dfs(struct Node* node) {
    struct Node* cur = node;
    struct Node* last = node;
    while (cur) {
        struct Node* nxt = cur->next;
        if (cur->child) {
            struct Node* childTail = dfs(cur->child);
            cur->next = cur->child;
            cur->child->prev = cur;
            if (nxt) {
                childTail->next = nxt;
                nxt->prev = childTail;
            }
            cur->child = NULL;
            last = childTail;
        } else {
            last = cur;
        }
        cur = nxt;
    }
    return last;
}

struct Node* flatten(struct Node* head) {
    dfs(head);
    return head;
}
```

```ts [TypeScript]
class Node {
    val: number;
    prev: Node | null;
    next: Node | null;
    child: Node | null;
    constructor(val?: number, prev?: Node, next?: Node, child?: Node) {
        this.val = val ?? 0;
        this.prev = prev ?? null;
        this.next = next ?? null;
        this.child = child ?? null;
    }
}

function flatten(head: Node | null): Node | null {
    const dfs = (node: Node | null): Node | null => {
        let cur = node, last = node;
        while (cur) {
            const nxt = cur.next;
            if (cur.child) {
                const childTail = dfs(cur.child);
                cur.next = cur.child;
                cur.child.prev = cur;
                if (nxt) {
                    childTail!.next = nxt;
                    nxt.prev = childTail;
                }
                cur.child = null;
                last = childTail;
            } else {
                last = cur;
            }
            cur = nxt;
        }
        return last;
    };
    dfs(head);
    return head;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(n)`，最坏情况下递归栈深度为链状多级深度（节点数）。

### 2.2 方法二：迭代 + 栈

1. **思路**

用栈模拟 DFS。遇到有 `child` 的节点时：

- 把当前节点的 `next` 压栈（若存在），以便展平完子链表后回来接上；
- 然后把 `child` 接到 `cur.next`；
- 一直沿 `next` 向下走；当走到某节点 `next` 为 `null` 且栈不空时，弹栈接上。

时间 `O(n)`，空间 `O(n)`（栈）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public Node flatten(Node head) {
        Node cur = head;
        Deque<Node> stack = new ArrayDeque<>();
        while (cur != null) {
            if (cur.child != null) {
                if (cur.next != null) stack.push(cur.next);
                cur.next = cur.child;
                cur.child.prev = cur;
                cur.child = null;
            } else if (cur.next == null && !stack.isEmpty()) {
                cur.next = stack.pop();
                cur.next.prev = cur;
            }
            cur = cur.next;
        }
        return head;
    }
}
```

```python [Python]
class Solution:
    def flatten(self, head: 'Node') -> 'Node':
        cur = head
        stack = []
        while cur:
            if cur.child:
                if cur.next:
                    stack.append(cur.next)
                cur.next = cur.child
                cur.child.prev = cur
                cur.child = None
            elif not cur.next and stack:
                cur.next = stack.pop()
                cur.next.prev = cur
            cur = cur.next
        return head
```

```cpp [C++]
class Solution {
public:
    Node* flatten(Node* head) {
        Node* cur = head;
        stack<Node*> stk;
        while (cur) {
            if (cur->child) {
                if (cur->next) stk.push(cur->next);
                cur->next = cur->child;
                cur->child->prev = cur;
                cur->child = nullptr;
            } else if (!cur->next && !stk.empty()) {
                cur->next = stk.top();
                stk.pop();
                cur->next->prev = cur;
            }
            cur = cur->next;
        }
        return head;
    }
};
```

```go [Go]
func flatten(head *Node) *Node {
    cur := head
    var stack []*Node
    for cur != nil {
        if cur.Child != nil {
            if cur.Next != nil {
                stack = append(stack, cur.Next)
            }
            cur.Next = cur.Child
            cur.Child.Prev = cur
            cur.Child = nil
        } else if cur.Next == nil && len(stack) > 0 {
            cur.Next = stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            cur.Next.Prev = cur
        }
        cur = cur.Next
    }
    return head
}
```

```js [JavaScript]
/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function (head) {
    let cur = head;
    const stack = [];
    while (cur) {
        if (cur.child) {
            if (cur.next) stack.push(cur.next);
            cur.next = cur.child;
            cur.child.prev = cur;
            cur.child = null;
        } else if (!cur.next && stack.length) {
            cur.next = stack.pop();
            cur.next.prev = cur;
        }
        cur = cur.next;
    }
    return head;
};
```

```c [C]
#include <stdlib.h>

struct Node {
    int val;
    struct Node* prev;
    struct Node* next;
    struct Node* child;
};

struct Node* flatten(struct Node* head) {
    struct Node* cur = head;
    struct Node* stack[1000];
    int top = 0;
    while (cur) {
        if (cur->child) {
            if (cur->next) stack[top++] = cur->next;
            cur->next = cur->child;
            cur->child->prev = cur;
            cur->child = NULL;
        } else if (!cur->next && top > 0) {
            cur->next = stack[--top];
            cur->next->prev = cur;
        }
        cur = cur->next;
    }
    return head;
}
```

```ts [TypeScript]
class Node {
    val: number;
    prev: Node | null;
    next: Node | null;
    child: Node | null;
    constructor(val?: number, prev?: Node, next?: Node, child?: Node) {
        this.val = val ?? 0;
        this.prev = prev ?? null;
        this.next = next ?? null;
        this.child = child ?? null;
    }
}

function flatten(head: Node | null): Node | null {
    let cur = head;
    const stack: Node[] = [];
    while (cur) {
        if (cur.child) {
            if (cur.next) stack.push(cur.next);
            cur.next = cur.child;
            cur.child.prev = cur;
            cur.child = null;
        } else if (!cur.next && stack.length) {
            cur.next = stack.pop()!;
            cur.next.prev = cur;
        }
        cur = cur.next;
    }
    return head;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`，栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 递归 DFS | `O(n)` | `O(n)` | 思路清晰，推荐 |
| 迭代 + 栈 | `O(n)` | `O(n)` | 显式栈，避免递归栈溢出风险 |

多级双向链表展平本质是深度优先遍历：遇到子链表先深入展平，再回接原后继。核心是维护好四根指针（prev/next/child）的连接关系。

