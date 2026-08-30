# [146. LRU 缓存](https://leetcode.cn/problems/lru-cache/)



## 一、题目描述

请你设计并实现一个满足 [LRU (最近最少使用) 缓存](https://baike.baidu.com/item/LRU) 约束的数据结构。

实现 `LRUCache` 类：

-   `LRUCache(int capacity)` 以 **正整数** 作为容量 `capacity` 初始化 LRU 缓存。
-   `int get(int key)` 如果关键字 `key` 存在于缓存中，则返回关键字的值，否则返回 `-1`。
-   `void put(int key, int value)` 如果关键字 `key` 已经存在，则变更其数据值；如果不存在，则向缓存中插入该组 `key-value` 。如果插入操作导致关键字数量超过 `capacity` ，则应该 **逐出** 最久未使用的关键字。

函数 `get` 和 `put` 必须以 `O(1)` 的平均时间复杂度运行。



**示例：**

```
输入
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
输出
[null, null, null, 1, null, -1, null, -1, 3, 4]
解释
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1);    // 返回 1
lRUCache.put(3, 3); // 该操作会让关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2);    // 返回 -1（未找到）
lRUCache.put(4, 4); // 该操作会让关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1);    // 返回 -1（未找到）
lRUCache.get(3);    // 返回 3
lRUCache.get(4);    // 返回 4
```

**提示：**

-   `1 <= capacity <= 3000`
-   `0 <= key <= 10⁴`
-   `0 <= value <= 10⁵`
-   最多调用 `2 * 10⁵` 次 `get` 和 `put`



## 二、解答方法

### 2.1 方法一：哈希表 + 双向链表

1. **思路**

- `get` / `put` 要 `O(1)`，用哈希表定位节点（O(1) 查找）。
- 需要快速移动节点到「最近使用」位置，并删除「最久未使用」节点，用双向链表实现 O(1) 插入删除。
- 使用**伪头、伪尾**哨兵节点，避免边界判断；最近使用的放链表头部，最久未使用的在尾部。

2. **代码实现**

:::::: code-group

```java [Java]
class LRUCache {
    class Node {
        int key, val;
        Node prev, next;
        Node() {}
        Node(int k, int v) { key = k; val = v; }
    }

    private Map<Integer, Node> map = new HashMap<>();
    private Node head = new Node(), tail = new Node();
    private int capacity, size = 0;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        Node node = map.get(key);
        if (node == null) return -1;
        moveToHead(node);
        return node.val;
    }

    public void put(int key, int value) {
        Node node = map.get(key);
        if (node != null) {
            node.val = value;
            moveToHead(node);
        } else {
            Node newNode = new Node(key, value);
            map.put(key, newNode);
            addToHead(newNode);
            size++;
            if (size > capacity) {
                Node removed = removeTail();
                map.remove(removed.key);
                size--;
            }
        }
    }

    private void addToHead(Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void moveToHead(Node node) {
        removeNode(node);
        addToHead(node);
    }

    private Node removeTail() {
        Node node = tail.prev;
        removeNode(node);
        return node;
    }
}
```

```python [Python]
class DLinkedNode:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None


class LRUCache:

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.size = 0
        self.cache = dict()
        self.head = DLinkedNode()
        self.tail = DLinkedNode()
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._move_to_head(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            node.val = value
            self._move_to_head(node)
        else:
            node = DLinkedNode(key, value)
            self.cache[key] = node
            self._add_to_head(node)
            self.size += 1
            if self.size > self.capacity:
                removed = self._remove_tail()
                del self.cache[removed.key]
                self.size -= 1

    def _add_to_head(self, node):
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _move_to_head(self, node):
        self._remove_node(node)
        self._add_to_head(node)

    def _remove_tail(self):
        node = self.tail.prev
        self._remove_node(node)
        return node
```

```go [Go]
type DLinkedNode struct {
    key, val   int
    prev, next *DLinkedNode
}

type LRUCache struct {
    capacity   int
    size       int
    cache      map[int]*DLinkedNode
    head, tail *DLinkedNode
}

func Constructor(capacity int) LRUCache {
    head, tail := &DLinkedNode{}, &DLinkedNode{}
    head.next = tail
    tail.prev = head
    return LRUCache{
        capacity: capacity,
        cache:    make(map[int]*DLinkedNode),
        head:     head,
        tail:     tail,
    }
}

func (c *LRUCache) Get(key int) int {
    node, ok := c.cache[key]
    if !ok {
        return -1
    }
    c.moveToHead(node)
    return node.val
}

func (c *LRUCache) Put(key int, value int) {
    if node, ok := c.cache[key]; ok {
        node.val = value
        c.moveToHead(node)
    } else {
        node := &DLinkedNode{key: key, val: value}
        c.cache[key] = node
        c.addToHead(node)
        c.size++
        if c.size > c.capacity {
            removed := c.removeTail()
            delete(c.cache, removed.key)
            c.size--
        }
    }
}

func (c *LRUCache) addToHead(node *DLinkedNode) {
    node.prev = c.head
    node.next = c.head.next
    c.head.next.prev = node
    c.head.next = node
}

func (c *LRUCache) removeNode(node *DLinkedNode) {
    node.prev.next = node.next
    node.next.prev = node.prev
}

func (c *LRUCache) moveToHead(node *DLinkedNode) {
    c.removeNode(node)
    c.addToHead(node)
}

func (c *LRUCache) removeTail() *DLinkedNode {
    node := c.tail.prev
    c.removeNode(node)
    return node
}
```

```cpp [C++]
class LRUCache {
    struct Node {
        int key, val;
        Node *prev, *next;
        Node() : key(0), val(0), prev(nullptr), next(nullptr) {}
        Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
    };

    int capacity, size;
    unordered_map<int, Node*> cache;
    Node *head, *tail;

    void addToHead(Node* node) {
        node->prev = head;
        node->next = head->next;
        head->next->prev = node;
        head->next = node;
    }
    void removeNode(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }
    void moveToHead(Node* node) {
        removeNode(node);
        addToHead(node);
    }
    Node* removeTail() {
        Node* node = tail->prev;
        removeNode(node);
        return node;
    }

public:
    LRUCache(int capacity) : capacity(capacity), size(0) {
        head = new Node();
        tail = new Node();
        head->next = tail;
        tail->prev = head;
    }

    int get(int key) {
        auto it = cache.find(key);
        if (it == cache.end()) return -1;
        moveToHead(it->second);
        return it->second->val;
    }

    void put(int key, int value) {
        auto it = cache.find(key);
        if (it != cache.end()) {
            it->second->val = value;
            moveToHead(it->second);
        } else {
            Node* node = new Node(key, value);
            cache[key] = node;
            addToHead(node);
            size++;
            if (size > capacity) {
                Node* removed = removeTail();
                cache.erase(removed->key);
                delete removed;
                size--;
            }
        }
    }
};
```

```js [JavaScript]
class DLinkedNode {
    constructor(key = 0, val = 0) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.cache = new Map();
    this.head = new DLinkedNode();
    this.tail = new DLinkedNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
};

LRUCache.prototype.get = function (key) {
    if (!this.cache.has(key)) return -1;
    const node = this.cache.get(key);
    this._moveToHead(node);
    return node.val;
};

LRUCache.prototype.put = function (key, value) {
    if (this.cache.has(key)) {
        const node = this.cache.get(key);
        node.val = value;
        this._moveToHead(node);
    } else {
        const node = new DLinkedNode(key, value);
        this.cache.set(key, node);
        this._addToHead(node);
        this.size++;
        if (this.size > this.capacity) {
            const removed = this._removeTail();
            this.cache.delete(removed.key);
            this.size--;
        }
    }
};

LRUCache.prototype._addToHead = function (node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
};

LRUCache.prototype._removeNode = function (node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
};

LRUCache.prototype._moveToHead = function (node) {
    this._removeNode(node);
    this._addToHead(node);
};

LRUCache.prototype._removeTail = function () {
    const node = this.tail.prev;
    this._removeNode(node);
    return node;
};
```

```ts [TypeScript]
class DLinkedNode {
    key: number;
    val: number;
    prev: DLinkedNode | null;
    next: DLinkedNode | null;
    constructor(key = 0, val = 0) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    private capacity: number;
    private size: number;
    private cache: Map<number, DLinkedNode>;
    private head: DLinkedNode;
    private tail: DLinkedNode;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.size = 0;
        this.cache = new Map();
        this.head = new DLinkedNode();
        this.tail = new DLinkedNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key: number): number {
        const node = this.cache.get(key);
        if (!node) return -1;
        this._moveToHead(node);
        return node.val;
    }

    put(key: number, value: number): void {
        const node = this.cache.get(key);
        if (node) {
            node.val = value;
            this._moveToHead(node);
        } else {
            const newNode = new DLinkedNode(key, value);
            this.cache.set(key, newNode);
            this._addToHead(newNode);
            this.size++;
            if (this.size > this.capacity) {
                const removed = this._removeTail();
                this.cache.delete(removed.key);
                this.size--;
            }
        }
    }

    private _addToHead(node: DLinkedNode): void {
        node.prev = this.head;
        node.next = this.head.next;
        (this.head.next as DLinkedNode).prev = node;
        this.head.next = node;
    }

    private _removeNode(node: DLinkedNode): void {
        (node.prev as DLinkedNode).next = node.next;
        (node.next as DLinkedNode).prev = node.prev;
    }

    private _moveToHead(node: DLinkedNode): void {
        this._removeNode(node);
        this._addToHead(node);
    }

    private _removeTail(): DLinkedNode {
        const node = this.tail.prev as DLinkedNode;
        this._removeNode(node);
        return node;
    }
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(1)`，`get` 与 `put` 均为常数级操作。
- **空间复杂度**：`O(capacity)`，哈希表与链表最多存储 `capacity + 1` 个节点。

## 三、总结

LRU 缓存经典实现 = **哈希表（O(1) 查找）+ 双向链表（O(1) 增删/移动）**。用哨兵头尾节点消除空指针边界判断，是面试高频题，务必熟练掌握。
