# [138. 随机链表的复制](https://leetcode.cn/problems/copy-list-with-random-pointer/)



## 一、题目描述

给你一个长度为 `n` 的链表，每个节点包含一个额外增加的随机指针 `random`，该指针可以指向链表中的任何节点或空节点。

构造这个链表的 **深拷贝**。深拷贝应该正好由 `n` 个 **全新** 节点组成，其中每个新节点的值都设为其对应的原节点的值。新节点的 `next` 和 `random` 指针也都应指向复制链表中的新节点，并使原链表和复制链表中的这些指针能够表示相同的链表状态。**复制链表中的指针都不应指向原链表中的节点**。

例如，如果原链表中有 `X` 和 `Y` 两个节点，其中 `X.random --> Y`。那么在复制链表中对应的两个节点 `x` 和 `y`，同样有 `x.random --> y`。

返回复制链表的头节点。

用一个由 `n` 个节点组成的链表来表示输入/输出。每个节点用一个 `[val, random_index]` 表示。

```
class Node {
    int val;
    Node next;
    Node random;
    public Node(int val) { this.val = val; }
}
```



**示例 1：**

```
输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
```

**示例 2：**

```
输入：head = [[1,1],[2,1]]
输出：[[1,1],[2,1]]
```

**示例 3：**

```
输入：head = [[3,null],[3,0],[3,null]]
输出：[[3,null],[3,0],[3,null]]
```

**提示：**

- `0 <= n <= 1000`
- `-10⁴ <= Node.val <= 10⁴`
- `Node.random` 为 `null` 或指向链表中的节点。



## 二、解答方法

### 2.1 方法一：哈希表（两次遍历）

1. **思路**

`random` 指针指向的节点可能在前面也可能在后面，需要先建立「原节点 -> 克隆节点」的映射，再填充指针。

- 第一遍遍历：为每个原节点创建克隆节点（只设 `val`），并建立 `map[原] = 克隆`；
- 第二遍遍历：对每个原节点，设 `map[原].next = map[原.next]`，`map[原].random = map[原.random]`；
- 返回 `map[head]`。

2. **代码实现**

::::: code-group

```java [Java]
/**
 * Definition for a Node.
 * class Node {
 *     int val;
 *     Node next;
 *     Node random;
 *     public Node(int val) { this.val = val; this.next = null; this.random = null; }
 * }
 */
class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;
        Map<Node, Node> map = new HashMap<>();
        Node cur = head;
        while (cur != null) {
            map.put(cur, new Node(cur.val));
            cur = cur.next;
        }
        cur = head;
        while (cur != null) {
            map.get(cur).next = map.get(cur.next);
            map.get(cur).random = map.get(cur.random);
            cur = cur.next;
        }
        return map.get(head);
    }
}
```

```python [Python]
# Definition for a Node.
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random

class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        if not head:
            return None
        map_ = {}
        cur = head
        while cur:
            map_[cur] = Node(cur.val)
            cur = cur.next
        cur = head
        while cur:
            map_[cur].next = map_.get(cur.next)
            map_[cur].random = map_.get(cur.random)
            cur = cur.next
        return map_[head]
```

```cpp [C++]
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* next;
    Node* random;
    Node(int _val) { val = _val; next = NULL; random = NULL; }
};
*/
class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return nullptr;
        unordered_map<Node*, Node*> mp;
        Node* cur = head;
        while (cur) {
            mp[cur] = new Node(cur->val);
            cur = cur->next;
        }
        cur = head;
        while (cur) {
            mp[cur]->next = mp[cur->next];
            mp[cur]->random = mp[cur->random];
            cur = cur->next;
        }
        return mp[head];
    }
};
```

```go [Go]
/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Next *Node
 *     Random *Node
 * }
 */
func copyRandomList(head *Node) *Node {
    if head == nil {
        return nil
    }
    mp := make(map[*Node]*Node)
    cur := head
    for cur != nil {
        mp[cur] = &Node{Val: cur.Val}
        cur = cur.Next
    }
    cur = head
    for cur != nil {
        mp[cur].Next = mp[cur.Next]
        mp[cur].Random = mp[cur.Random]
        cur = cur.Next
    }
    return mp[head]
}
```

```js [JavaScript]
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *     this.val = val;
 *     this.next = next;
 *     this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
    if (!head) return null;
    const map = new Map();
    let cur = head;
    while (cur) {
        map.set(cur, new Node(cur.val));
        cur = cur.next;
    }
    cur = head;
    while (cur) {
        map.get(cur).next = map.get(cur.next) || null;
        map.get(cur).random = map.get(cur.random) || null;
        cur = cur.next;
    }
    return map.get(head);
};
```

```c [C]
#include <stdlib.h>

struct Node {
    int val;
    struct Node *next;
    struct Node *random;
};

struct Node* copyRandomList(struct Node* head) {
    if (!head) return NULL;
    struct Node** orig = (struct Node**)malloc(2001 * sizeof(struct Node*));
    struct Node** clone = (struct Node**)malloc(2001 * sizeof(struct Node*));
    int cnt = 0;
    struct Node* cur = head;
    while (cur) {
        struct Node* c = (struct Node*)malloc(sizeof(struct Node));
        c->val = cur->val; c->next = NULL; c->random = NULL;
        orig[cnt] = cur; clone[cnt] = c; cnt++;
        cur = cur->next;
    }
    for (int i = 0; i < cnt; i++) {
        if (orig[i]->next)
            for (int j = 0; j < cnt; j++)
                if (orig[j] == orig[i]->next) { clone[i]->next = clone[j]; break; }
        if (orig[i]->random)
            for (int j = 0; j < cnt; j++)
                if (orig[j] == orig[i]->random) { clone[i]->random = clone[j]; break; }
    }
    struct Node* res = clone[0];
    free(orig); free(clone);
    return res;
}
```

```ts [TypeScript]
class Node {
    val: number;
    next: Node | null;
    random: Node | null;
    constructor(val?: number, next?: Node | null, random?: Node | null) {
        this.val = val ?? 0;
        this.next = next ?? null;
        this.random = random ?? null;
    }
}

function copyRandomList(head: Node | null): Node | null {
    if (!head) return null;
    const map = new Map<Node, Node>();
    let cur = head;
    while (cur) {
        map.set(cur, new Node(cur.val));
        cur = cur.next;
    }
    cur = head;
    while (cur) {
        map.get(cur)!.next = cur.next ? map.get(cur.next) ?? null : null;
        map.get(cur)!.random = cur.random ? map.get(cur.random) ?? null : null;
        cur = cur.next;
    }
    return map.get(head) ?? null;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，两次遍历。
- **空间复杂度**：`O(n)`，哈希表存储映射。

### 2.2 方法二：原地复制（拼接 + 拆分）

1. **思路**

在 `O(1)` 额外空间下完成：把克隆节点 **插在原节点之后**，形成 `A -> A' -> B -> B' ...` 的链表。

- 第一遍：在每个原节点后插入克隆节点（克隆的 `val` 相同，`next` 暂指向原 `next`）；
- 第二遍：根据原节点的 `random` 设置克隆节点的 `random`：`clone.random = origin.random.next`（注意判空）；
- 第三遍：把链表拆分成原链表与克隆链表，恢复原结构。

不借助哈希表，空间复杂度降为 `O(1)`。

2. **代码实现**

::::: code-group

```java [Java]
/**
 * Definition for a Node.
 * class Node {
 *     int val;
 *     Node next;
 *     Node random;
 *     public Node(int val) { this.val = val; this.next = null; this.random = null; }
 * }
 */
class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;

        // 1. 插入克隆节点
        Node cur = head;
        while (cur != null) {
            Node clone = new Node(cur.val);
            clone.next = cur.next;
            cur.next = clone;
            cur = clone.next;
        }

        // 2. 设置 random
        cur = head;
        while (cur != null) {
            if (cur.random != null) cur.next.random = cur.random.next;
            cur = cur.next.next;
        }

        // 3. 拆分
        cur = head;
        Node cloneHead = head.next;
        while (cur != null) {
            Node clone = cur.next;
            cur.next = clone.next;
            if (clone.next != null) clone.next = clone.next.next;
            cur = cur.next;
        }
        return cloneHead;
    }
}
```

```python [Python]
# Definition for a Node.
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random

class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        if not head:
            return None

        cur = head
        while cur:
            clone = Node(cur.val)
            clone.next = cur.next
            cur.next = clone
            cur = clone.next

        cur = head
        while cur:
            if cur.random:
                cur.next.random = cur.random.next
            cur = cur.next.next

        cur = head
        clone_head = head.next
        while cur:
            clone = cur.next
            cur.next = clone.next
            if clone.next:
                clone.next = clone.next.next
            cur = cur.next
        return clone_head
```

```cpp [C++]
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* next;
    Node* random;
    Node(int _val) { val = _val; next = NULL; random = NULL; }
};
*/
class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return nullptr;

        Node* cur = head;
        while (cur) {
            Node* clone = new Node(cur->val);
            clone->next = cur->next;
            cur->next = clone;
            cur = clone->next;
        }

        cur = head;
        while (cur) {
            if (cur->random) cur->next->random = cur->random->next;
            cur = cur->next->next;
        }

        cur = head;
        Node* cloneHead = head->next;
        while (cur) {
            Node* clone = cur->next;
            cur->next = clone->next;
            if (clone->next) clone->next = clone->next->next;
            cur = cur->next;
        }
        return cloneHead;
    }
};
```

```go [Go]
/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Next *Node
 *     Random *Node
 * }
 */
func copyRandomList(head *Node) *Node {
    if head == nil {
        return nil
    }

    cur := head
    for cur != nil {
        clone := &Node{Val: cur.Val}
        clone.Next = cur.Next
        cur.Next = clone
        cur = clone.Next
    }

    cur = head
    for cur != nil {
        if cur.Random != nil {
            cur.Next.Random = cur.Random.Next
        }
        cur = cur.Next.Next
    }

    cur = head
    cloneHead := head.Next
    for cur != nil {
        clone := cur.Next
        cur.Next = clone.Next
        if clone.Next != nil {
            clone.Next = clone.Next.Next
        }
        cur = cur.Next
    }
    return cloneHead
}
```

```js [JavaScript]
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *     this.val = val;
 *     this.next = next;
 *     this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
    if (!head) return null;

    let cur = head;
    while (cur) {
        const clone = new Node(cur.val);
        clone.next = cur.next;
        cur.next = clone;
        cur = clone.next;
    }

    cur = head;
    while (cur) {
        if (cur.random) cur.next.random = cur.random.next;
        cur = cur.next.next;
    }

    cur = head;
    const cloneHead = head.next;
    while (cur) {
        const clone = cur.next;
        cur.next = clone.next;
        if (clone.next) clone.next = clone.next.next;
        cur = cur.next;
    }
    return cloneHead;
};
```

```c [C]
#include <stdlib.h>

struct Node {
    int val;
    struct Node *next;
    struct Node *random;
};

struct Node* copyRandomList(struct Node* head) {
    if (!head) return NULL;
    struct Node* cur = head;
    while (cur) {
        struct Node* c = (struct Node*)malloc(sizeof(struct Node));
        c->val = cur->val;
        c->next = cur->next;
        c->random = NULL;
        cur->next = c;
        cur = c->next;
    }
    cur = head;
    while (cur) {
        if (cur->random) cur->next->random = cur->random->next;
        cur = cur->next->next;
    }
    cur = head;
    struct Node* cloneHead = head->next;
    while (cur) {
        struct Node* c = cur->next;
        cur->next = c->next;
        if (c->next) c->next = c->next->next;
        cur = cur->next;
    }
    return cloneHead;
}
```

```ts [TypeScript]
class Node {
    val: number;
    next: Node | null;
    random: Node | null;
    constructor(val?: number, next?: Node | null, random?: Node | null) {
        this.val = val ?? 0;
        this.next = next ?? null;
        this.random = random ?? null;
    }
}

function copyRandomList(head: Node | null): Node | null {
    if (!head) return null;

    let cur = head;
    while (cur) {
        const clone = new Node(cur.val);
        clone.next = cur.next;
        cur.next = clone;
        cur = clone.next;
    }

    cur = head;
    while (cur) {
        if (cur.random) cur.next!.random = cur.random.next;
        cur = cur.next!.next;
    }

    cur = head;
    const cloneHead = head.next!;
    while (cur) {
        const clone = cur.next!;
        cur.next = clone.next;
        if (clone.next) clone.next = clone.next.next;
        cur = cur.next;
    }
    return cloneHead;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，三次线性遍历。
- **空间复杂度**：`O(1)`，原地操作，不依赖额外数据结构。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 哈希表 | `O(n)` | `O(n)` | 思路清晰，推荐 |
| 原地复制拆分 | `O(n)` | `O(1)` | 空间最优，但易写错 |

哈希表法最易理解且不易出错；原地复制法满足 `O(1)` 空间进阶要求，但需要小心处理拆分时的指针链接。
