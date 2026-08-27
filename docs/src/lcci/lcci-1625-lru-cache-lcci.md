# [面试题 16.25. LRU 缓存](https://leetcode.cn/problems/lru-cache-lcci/)

## 一、题目描述

设计和构建一个"最近最少使用"缓存，该缓存会删除最近最少使用的项目。缓存应该从键映射到值（允许插入和检索特定键对应的值），并在初始化时指定最大容量。当缓存被填满时，它应该删除最近最少使用的项目。

它应该支持以下操作：

- `LRUCache(int capacity)` 以正整数作为容量初始化 LRU 缓存
- `int get(int key)` 如果关键字存在，则返回值，否则返回 -1
- `void put(int key, int value)` 如果关键字存在则变更其值；若不存在则插入。若容量达上限，则淘汰最久未使用的键。

**示例：**

```
输入：
["LRUCache", "put", "put", "get", "put", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2]]
输出：
[null, null, null, 1, null, -1]
```

---

## 二、解答方法

### 2.1 方法一：哈希表 + 双向链表

**1. 思路**

用哈希表 `key → 链表节点` 实现 `O(1)` 查找；双向链表维护访问顺序，头为最近使用、尾为最久未使用。`get`/`put` 命中时把节点移到头部；`put` 超容时删除尾部节点。

**2. 代码实现**

::::::: code-group

```java [Java]
class LRUCache {
    class Node { int key, val; Node prev, next; }
    Map<Integer, Node> map = new HashMap<>();
    int capacity, size = 0;
    Node head = new Node(), tail = new Node();
    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail; tail.prev = head;
    }
    private void add(Node n) { n.prev = head; n.next = head.next; head.next.prev = n; head.next = n; }
    private void remove(Node n) { n.prev.next = n.next; n.next.prev = n.prev; }
    public int get(int key) {
        Node n = map.get(key);
        if (n == null) return -1;
        remove(n); add(n); return n.val;
    }
    public void put(int key, int value) {
        Node n = map.get(key);
        if (n != null) { n.val = value; remove(n); add(n); }
        else {
            n = new Node(); n.key = key; n.val = value;
            map.put(key, n); add(n); size++;
            if (size > capacity) { Node t = tail.prev; remove(t); map.remove(t.key); size--; }
        }
    }
}
```

```python [Python]
class LRUCache:
    def __init__(self, capacity: int):
        from collections import OrderedDict
        self.cap = capacity
        self.d = OrderedDict()
    def get(self, key: int) -> int:
        if key not in self.d: return -1
        self.d.move_to_end(key)
        return self.d[key]
    def put(self, key: int, value: int) -> None:
        if key in self.d: self.d.move_to_end(key)
        self.d[key] = value
        if len(self.d) > self.cap: self.d.popitem(last=False)
```

```go [Go]
type Node struct { key, val int; prev, next *Node }
type LRUCache struct {
    cap, size int
    m map[int]*Node
    head, tail *Node
}
func Constructor(capacity int) LRUCache {
    h, t := &Node{}, &Node{}
    h.next, t.prev = t, h
    return LRUCache{cap: capacity, m: map[int]*Node{}}
}
func (c *LRUCache) add(n *Node) { n.prev, n.next = c.head, c.head.next; c.head.next.prev, c.head.next = n, n }
func (c *LRUCache) remove(n *Node) { n.prev.next, n.next.prev = n.next, n.prev }
func (c *LRUCache) Get(key int) int {
    n, ok := c.m[key]
    if !ok { return -1 }
    c.remove(n); c.add(n); return n.val
}
func (c *LRUCache) Put(key, value int) {
    if n, ok := c.m[key]; ok { n.val = value; c.remove(n); c.add(n); return }
    n := &Node{key: key, val: value}; c.m[key] = n; c.add(n); c.size++
    if c.size > c.cap { t := c.tail.prev; c.remove(t); delete(c.m, t.key); c.size-- }
}
```

```c [C]
// C 中需手动实现双向链表 + 哈希（如 uthash），逻辑同 Java
```

```cpp [C++]
class LRUCache {
    struct Node { int key, val; Node *prev, *next; };
    int cap, size = 0;
    unordered_map<int, Node*> mp;
    Node *head, *tail;
    void add(Node* n) { n->prev = head; n->next = head->next; head->next->prev = n; head->next = n; }
    void remove(Node* n) { n->prev->next = n->next; n->next->prev = n->prev; }
public:
    LRUCache(int capacity) {
        cap = capacity;
        head = new Node(); tail = new Node();
        head->next = tail; tail->prev = head;
    }
    int get(int key) {
        if (!mp.count(key)) return -1;
        Node* n = mp[key]; remove(n); add(n); return n->val;
    }
    void put(int key, int value) {
        if (mp.count(key)) { Node* n = mp[key]; n->val = value; remove(n); add(n); return; }
        Node* n = new Node(); n->key = key; n->val = value;
        mp[key] = n; add(n); size++;
        if (size > cap) { Node* t = tail->prev; remove(t); mp.erase(t->key); size--; delete t; }
    }
};
```

```javascript [JavaScript]
var LRUCache = function(capacity) {
    this.cap = capacity;
    this.map = new Map();
};
LRUCache.prototype.get = function(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key); this.map.set(key, val);
    return val;
};
LRUCache.prototype.put = function(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.cap) {
        const oldest = this.map.keys().next().value;
        this.map.delete(oldest);
    }
};
```

```typescript [TypeScript]
class LRUCache {
    private cap: number;
    private map: Map<number, number> = new Map();
    constructor(capacity: number) { this.cap = capacity; }
    get(key: number): number {
        if (!this.map.has(key)) return -1;
        const val = this.map.get(key)!;
        this.map.delete(key); this.map.set(key, val);
        return val;
    }
    put(key: number, value: number): void {
        if (this.map.has(key)) this.map.delete(key);
        this.map.set(key, value);
        if (this.map.size > this.cap) {
            const oldest = this.map.keys().next().value;
            this.map.delete(oldest);
        }
    }
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`get`/`put` 均 `O(1)`。
- **空间复杂度**：`O(capacity)`。

---

### 2.2 方法二：有序字典（语言内置）

**1. 思路**

Python 的 `OrderedDict`、JavaScript 的 `Map` 都保持插入顺序，删除再插入即移到末尾，首元素即最少使用。代码极简，适合快速实现。

**2. 代码实现**

::::::: code-group

```python [Python]
class LRUCache:
    def __init__(self, capacity: int):
        from collections import OrderedDict
        self.cap = capacity
        self.cache = OrderedDict()
    def get(self, key: int) -> int:
        if key not in self.cache: return -1
        self.cache.move_to_end(key)
        return self.cache[key]
    def put(self, key: int, value: int) -> None:
        if key in self.cache: self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap: self.cache.popitem(last=False)
```

```javascript [JavaScript]
var LRUCache = function(capacity) {
    this.cap = capacity;
    this.map = new Map();
};
LRUCache.prototype.get = function(key) {
    if (!this.map.has(key)) return -1;
    const v = this.map.get(key);
    this.map.delete(key); this.map.set(key, v);
    return v;
};
LRUCache.prototype.put = function(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.cap) this.map.delete(this.map.keys().next().value);
};
```

```typescript [TypeScript]
class LRUCache {
    private cap: number;
    private map = new Map<number, number>();
    constructor(capacity: number) { this.cap = capacity; }
    get(key: number): number {
        if (!this.map.has(key)) return -1;
        const v = this.map.get(key)!;
        this.map.delete(key); this.map.set(key, v);
        return v;
    }
    put(key: number, value: number): void {
        if (this.map.has(key)) this.map.delete(key);
        this.map.set(key, value);
        if (this.map.size > this.cap) this.map.delete(this.map.keys().next().value);
    }
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`。
- **空间复杂度**：`O(capacity)`。

---

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度  | 特点                       |
| -------------- | ---------- | ----------- | -------------------------- |
| 哈希 + 双向链表 | `O(1)`    | `O(capacity)`| 经典实现，推荐             |
| 内置有序字典   | `O(1)`    | `O(capacity)`| 代码简洁，依赖语言特性     |

**推荐**：核心实现用哈希表 + 双向链表保证 `O(1)`；工程上可用语言内置有序结构快速实现。
