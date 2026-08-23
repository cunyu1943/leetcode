# [LCR 031. LRU 缓存](https://leetcode.cn/problems/OrIXps/)



## 一、题目描述

请设计并实现一个满足 LRU (最近最少使用) 缓存 **约束** 的数据结构。

实现 `LRUCache` 类：

- `LRUCache(int capacity)` 以 **正整数** 作为容量 `capacity` 初始化 LRU 缓存
- `int get(int key)` 如果关键字 `key` 存在于缓存中，则返回关键字的值，否则返回 `-1`
- `void put(int key, int value)` 如果关键字 `key` 已经存在，则变更其数据值 `value`；如果不存在，则向缓存中插入该组 `key-value`。如果插入操作导致关键字数量超过 `capacity` ，则应该 **逐出** 最久未使用的关键字

函数 `get` 和 `put` 必须以 `O(1)` 的平均时间复杂度运行。



**示例 1：**

```
输入:
["LRUCache","put","put","get","put","get","put","get","get","get"]
[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]
输出:
[null,null,null,1,null,-1,null,-1,3,4]
解释:
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1);       // 缓存是 {1=1}
lRUCache.put(2, 2);       // 缓存是 {1=1, 2=2}
lRUCache.get(1);          // 返回 1
lRUCache.put(3, 3);       // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2);          // 返回 -1 (未找到)
lRUCache.put(4, 4);       // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1);          // 返回 -1 (未找到)
lRUCache.get(3);          // 返回 3
lRUCache.get(4);          // 返回 4
```

**提示：**

- `1 <= capacity <= 3000`
- `0 <= key <= 10000`
- `0 <= value <= 10⁵`
- 最多调用 `2 * 10⁵` 次 `get` 和 `put`



## 二、解答方法

### 2.1 方法一：哈希表 + 双向链表

1. **思路**

LRU 需要「O(1) 查找」和「O(1) 移动/删除」，二者结合即 **哈希表 + 双向链表**：

- 双向链表按「最近使用」排序，越靠近头部越新；
- `get`：命中则把节点移到头部，返回 value；
- `put`：命中则更新值并移到头部；未命中则插入头部；若超容量，删除链表尾部节点（最久未使用）并同步删除哈希项。

哨兵头尾节点简化边界处理。各操作 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class LRUCache {
    private static class DLinkedNode {
        int key, value;
        DLinkedNode prev, next;
        DLinkedNode() {}
        DLinkedNode(int k, int v) { key = k; value = v; }
    }
    private Map<Integer, DLinkedNode> cache = new HashMap<>();
    private int capacity, size;
    private DLinkedNode head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head = new DLinkedNode();
        tail = new DLinkedNode();
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        DLinkedNode node = cache.get(key);
        if (node == null) return -1;
        moveToHead(node);
        return node.value;
    }

    public void put(int key, int value) {
        DLinkedNode node = cache.get(key);
        if (node == null) {
            DLinkedNode newNode = new DLinkedNode(key, value);
            cache.put(key, newNode);
            addToHead(newNode);
            size++;
            if (size > capacity) {
                DLinkedNode removed = removeTail();
                cache.remove(removed.key);
                size--;
            }
        } else {
            node.value = value;
            moveToHead(node);
        }
    }

    private void addToHead(DLinkedNode node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }
    private void removeNode(DLinkedNode node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    private void moveToHead(DLinkedNode node) {
        removeNode(node);
        addToHead(node);
    }
    private DLinkedNode removeTail() {
        DLinkedNode res = tail.prev;
        removeNode(res);
        return res;
    }
}
```

```python [Python]
class DLinkedNode:
    def __init__(self, key=0, value=0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None


class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.size = 0
        self.cache = {}
        self.head = DLinkedNode()
        self.tail = DLinkedNode()
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self.move_to_head(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key not in self.cache:
            node = DLinkedNode(key, value)
            self.cache[key] = node
            self.add_to_head(node)
            self.size += 1
            if self.size > self.capacity:
                removed = self.remove_tail()
                del self.cache[removed.key]
                self.size -= 1
        else:
            node = self.cache[key]
            node.value = value
            self.move_to_head(node)

    def add_to_head(self, node):
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def move_to_head(self, node):
        self.remove_node(node)
        self.add_to_head(node)

    def remove_tail(self):
        node = self.tail.prev
        self.remove_node(node)
        return node
```

```cpp [C++]
struct DLinkedNode {
    int key, value;
    DLinkedNode* prev;
    DLinkedNode* next;
    DLinkedNode() : key(0), value(0), prev(nullptr), next(nullptr) {}
    DLinkedNode(int k, int v) : key(k), value(v), prev(nullptr), next(nullptr) {}
};

class LRUCache {
private:
    unordered_map<int, DLinkedNode*> cache;
    DLinkedNode* head;
    DLinkedNode* tail;
    int size, capacity;

    void addToHead(DLinkedNode* node) {
        node->prev = head;
        node->next = head->next;
        head->next->prev = node;
        head->next = node;
    }
    void removeNode(DLinkedNode* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }
    void moveToHead(DLinkedNode* node) {
        removeNode(node);
        addToHead(node);
    }
    DLinkedNode* removeTail() {
        DLinkedNode* res = tail->prev;
        removeNode(res);
        return res;
    }

public:
    LRUCache(int capacity) : capacity(capacity), size(0) {
        head = new DLinkedNode();
        tail = new DLinkedNode();
        head->next = tail;
        tail->prev = head;
    }

    int get(int key) {
        if (!cache.count(key)) return -1;
        DLinkedNode* node = cache[key];
        moveToHead(node);
        return node->value;
    }

    void put(int key, int value) {
        if (!cache.count(key)) {
            DLinkedNode* node = new DLinkedNode(key, value);
            cache[key] = node;
            addToHead(node);
            size++;
            if (size > capacity) {
                DLinkedNode* removed = removeTail();
                cache.erase(removed->key);
                delete removed;
                size--;
            }
        } else {
            DLinkedNode* node = cache[key];
            node->value = value;
            moveToHead(node);
        }
    }
};
```

```go [Go]
type DLinkedNode struct {
    key, value int
    prev, next *DLinkedNode
}

type LRUCache struct {
    capacity int
    size     int
    cache    map[int]*DLinkedNode
    head     *DLinkedNode
    tail     *DLinkedNode
}

func Constructor(capacity int) LRUCache {
    lru := LRUCache{
        capacity: capacity,
        cache:    make(map[int]*DLinkedNode),
        head:     &DLinkedNode{},
        tail:     &DLinkedNode{},
    }
    lru.head.next = lru.tail
    lru.tail.prev = lru.head
    return lru
}

func (lru *LRUCache) Get(key int) int {
    if node, ok := lru.cache[key]; ok {
        lru.moveToHead(node)
        return node.value
    }
    return -1
}

func (lru *LRUCache) Put(key int, value int) {
    if node, ok := lru.cache[key]; ok {
        node.value = value
        lru.moveToHead(node)
        return
    }
    node := &DLinkedNode{key: key, value: value}
    lru.cache[key] = node
    lru.addToHead(node)
    lru.size++
    if lru.size > lru.capacity {
        removed := lru.removeTail()
        delete(lru.cache, removed.key)
        lru.size--
    }
}

func (lru *LRUCache) addToHead(node *DLinkedNode) {
    node.prev = lru.head
    node.next = lru.head.next
    lru.head.next.prev = node
    lru.head.next = node
}

func (lru *LRUCache) removeNode(node *DLinkedNode) {
    node.prev.next = node.next
    node.next.prev = node.prev
}

func (lru *LRUCache) moveToHead(node *DLinkedNode) {
    lru.removeNode(node)
    lru.addToHead(node)
}

func (lru *LRUCache) removeTail() *DLinkedNode {
    node := lru.tail.prev
    lru.removeNode(node)
    return node
}
```

```js [JavaScript]
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.cache = new Map();
    this.head = { key: 0, value: 0, prev: null, next: null };
    this.tail = { key: 0, value: 0, prev: null, next: null };
    this.head.next = this.tail;
    this.tail.prev = this.head;
};

LRUCache.prototype.addToHead = function (node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
};
LRUCache.prototype.removeNode = function (node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
};
LRUCache.prototype.moveToHead = function (node) {
    this.removeNode(node);
    this.addToHead(node);
};
LRUCache.prototype.removeTail = function () {
    const node = this.tail.prev;
    this.removeNode(node);
    return node;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    const node = this.cache.get(key);
    if (!node) return -1;
    this.moveToHead(node);
    return node.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    const node = this.cache.get(key);
    if (!node) {
        const newNode = { key, value, prev: null, next: null };
        this.cache.set(key, newNode);
        this.addToHead(newNode);
        this.size++;
        if (this.size > this.capacity) {
            const removed = this.removeTail();
            this.cache.delete(removed.key);
            this.size--;
        }
    } else {
        node.value = value;
        this.moveToHead(node);
    }
};
```

```c [C]
#include <stdlib.h>

typedef struct Node {
    int key, value;
    struct Node *prev, *next;
} Node;

typedef struct {
    int capacity, size;
    Node* head;
    Node* tail;
    Node** map;  // 简易哈希：key -> node（key 范围 0..10000）
} LRUCache;

LRUCache* lRUCacheCreate(int capacity) {
    LRUCache* obj = (LRUCache*)calloc(1, sizeof(LRUCache));
    obj->capacity = capacity;
    obj->head = (Node*)calloc(1, sizeof(Node));
    obj->tail = (Node*)calloc(1, sizeof(Node));
    obj->head->next = obj->tail;
    obj->tail->prev = obj->head;
    obj->map = (Node**)calloc(10001, sizeof(Node*));
    return obj;
}

static void removeNode(Node* node) {
    node->prev->next = node->next;
    node->next->prev = node->prev;
}

static void addToHead(LRUCache* obj, Node* node) {
    node->prev = obj->head;
    node->next = obj->head->next;
    obj->head->next->prev = node;
    obj->head->next = node;
}

static void moveToHead(LRUCache* obj, Node* node) {
    removeNode(node);
    addToHead(obj, node);
}

static Node* removeTail(LRUCache* obj) {
    Node* node = obj->tail->prev;
    removeNode(node);
    return node;
}

int lRUCacheGet(LRUCache* obj, int key) {
    Node* node = obj->map[key];
    if (!node) return -1;
    moveToHead(obj, node);
    return node->value;
}

void lRUCachePut(LRUCache* obj, int key, int value) {
    Node* node = obj->map[key];
    if (!node) {
        node = (Node*)calloc(1, sizeof(Node));
        node->key = key;
        node->value = value;
        obj->map[key] = node;
        addToHead(obj, node);
        obj->size++;
        if (obj->size > obj->capacity) {
            Node* removed = removeTail(obj);
            obj->map[removed->key] = NULL;
            free(removed);
            obj->size--;
        }
    } else {
        node->value = value;
        moveToHead(obj, node);
    }
}

void lRUCacheFree(LRUCache* obj) {
    Node* cur = obj->head;
    while (cur) {
        Node* nxt = cur->next;
        free(cur);
        cur = nxt;
    }
    free(obj->map);
    free(obj);
}
```

```ts [TypeScript]
interface DLinkedNode {
    key: number;
    value: number;
    prev: DLinkedNode | null;
    next: DLinkedNode | null;
}

class LRUCache {
    private capacity: number;
    private size = 0;
    private cache = new Map<number, DLinkedNode>();
    private head: DLinkedNode;
    private tail: DLinkedNode;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.head = { key: 0, value: 0, prev: null, next: null };
        this.tail = { key: 0, value: 0, prev: null, next: null };
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key: number): number {
        const node = this.cache.get(key);
        if (!node) return -1;
        this.moveToHead(node);
        return node.value;
    }

    put(key: number, value: number): void {
        const node = this.cache.get(key);
        if (!node) {
            const newNode: DLinkedNode = { key, value, prev: null, next: null };
            this.cache.set(key, newNode);
            this.addToHead(newNode);
            this.size++;
            if (this.size > this.capacity) {
                const removed = this.removeTail();
                this.cache.delete(removed.key);
                this.size--;
            }
        } else {
            node.value = value;
            this.moveToHead(node);
        }
    }

    private addToHead(node: DLinkedNode): void {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next!.prev = node;
        this.head.next = node;
    }
    private removeNode(node: DLinkedNode): void {
        node.prev!.next = node.next;
        node.next!.prev = node.prev;
    }
    private moveToHead(node: DLinkedNode): void {
        this.removeNode(node);
        this.addToHead(node);
    }
    private removeTail(): DLinkedNode {
        const node = this.tail.prev!;
        this.removeNode(node);
        return node;
    }
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`get` / `put` 均为 `O(1)`。
- **空间复杂度**：`O(capacity)`。

## 三、总结

| 方法 | get | put | 空间 |
| ---- | ---------- | ---------- | ---------- |
| 哈希表 + 双向链表 | `O(1)` | `O(1)` | `O(capacity)` |

LRU 是操作系统与缓存设计中的经典问题，「哈希表快速定位 + 双向链表维护访问顺序」的组合缺一不可：删除、移动、插入节点都是链表指针操作，配合哨兵节点实现 `O(1)`。

