# [460. LFU 缓存](https://leetcode.cn/problems/lfu-cache/)

## 一、题目描述

设计并实现 **LFU（最不经常使用）缓存**。支持 `get(key)` 和 `put(key, value)`：

- `get(key)`：若 `key` 存在返回其值，并将其**使用频率 +1**；否则返回 -1（时间 $O(1)$）。
- `put(key, value)`：若 `key` 存在更新值并频率 +1；否则插入，若超容量 `capacity` 则**淘汰使用频率最低**的 key（频率相同则淘汰最久未使用的）。

**示例：**

```
输入：["LFUCache","put","put","get","put","get","get","put","get","get","get"]
[[2],[1,1],[2,2],[1],[3,3],[2],[1],[4,4],[1],[3],[4]]
输出：[null,null,null,1,null,-1,1,null,-1,3,4]
```

**提示：**

- `0 <= capacity, key, value <= 10^4`
- 操作数 $\le 10^5$

## 二、解答方法

### 2.1 方法一：双哈希 + 频率桶双向链表

1. 思路

- `key2node`：`key → 节点`（节点含 `key, value, freq`）；
- 每个频率 `f` 对应一条双向链表（按使用时间排序，头新尾旧），存该频率的所有节点；
- `minFreq` 记录当前最小频率；
- `get`/`put` 命中时把节点移到 `f+1` 频率链表，若该频率链表空且 `f == minFreq` 则 `minFreq++`；
- `put` 超容：从 `minFreq` 链表尾部（最久未用）删除节点，`minFreq` 重置为 1。

2. 代码实现（Python，用 `OrderedDict` 充当按插入序的链表）

:::::: code-group

```python [Python]
from collections import defaultdict, OrderedDict
class LFUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.key2node = {}
        self.freq2list = defaultdict(OrderedDict)
        self.minFreq = 0

    def _touch(self, key, node):
        f = node[2]
        del self.freq2list[f][key]
        if not self.freq2list[f]:
            del self.freq2list[f]
            if f == self.minFreq:
                self.minFreq = f + 1
        node[2] = f + 1
        self.freq2list[f + 1][key] = node

    def get(self, key: int) -> int:
        if key not in self.key2node:
            return -1
        node = self.key2node[key]
        self._touch(key, node)
        return node[1]

    def put(self, key: int, value: int) -> None:
        if self.cap == 0:
            return
        if key in self.key2node:
            node = self.key2node[key]
            node[1] = value
            self._touch(key, node)
            return
        if len(self.key2node) >= self.cap:
            oldkey, _ = self.freq2list[self.minFreq].popitem(last=False)
            del self.key2node[oldkey]
        node = [key, value, 1]
        self.key2node[key] = node
        self.freq2list[1][key] = node
        self.minFreq = 1
```

```java [Java]
class LFUCache {
    class Node { int key, val, freq; Node prev, next; Node(int k, int v){key=k;val=v;freq=1;} }
    class DL { Node head = new Node(0,0), tail = new Node(0,0);
        DL(){ head.next = tail; tail.prev = head; }
        void add(Node n){ n.prev = head; n.next = head.next; head.next.prev = n; head.next = n; }
        void remove(Node n){ n.prev.next = n.next; n.next.prev = n.prev; }
        Node pop(){ Node n = tail.prev; if (n == head) return null; remove(n); return n; }
    }
    int cap, size, minFreq;
    Map<Integer, Node> key2node = new HashMap<>();
    Map<Integer, DL> freq2list = new HashMap<>();
    public LFUCache(int capacity) { cap = capacity; }
    void touch(Node n) {
        int f = n.freq;
        DL dl = freq2list.get(f); dl.remove(n);
        if (dl.head.next == dl.tail && f == minFreq) minFreq = f + 1;
        n.freq++;
        freq2list.computeIfAbsent(n.freq, k -> new DL()).add(n);
    }
    public int get(int key) {
        if (!key2node.containsKey(key)) return -1;
        Node n = key2node.get(key); touch(n); return n.val;
    }
    public void put(int key, int value) {
        if (cap == 0) return;
        if (key2node.containsKey(key)) {
            Node n = key2node.get(key); n.val = value; touch(n); return;
        }
        if (size == cap) {
            DL dl = freq2list.get(minFreq);
            Node n = dl.pop(); key2node.remove(n.key); size--;
        }
        Node n = new Node(key, value);
        key2node.put(key, n);
        freq2list.computeIfAbsent(1, k -> new DL()).add(n);
        minFreq = 1; size++;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：均摊 $O(1)$。
- 空间复杂度：$O(capacity)$。

## 三、总结

LFU 用「频率桶 + 桶内 LRU」实现 $O(1)$ 操作，是高级数据结构设计的集大成题。相关题目：146 LRU 缓存、432 全 O(1) 数据结构、380 随机删除。
