# [LCR 066. 键值映射](https://leetcode.cn/problems/z1R5dt/)



## 一、题目描述

实现一个 `MapSum` 类，支持两个方法，`insert` 和 `sum`：

- `MapSum()` 初始化 `MapSum` 对象
- `void insert(String key, int val)` 插入 `key-val` 键值对，字符串表示键 `key` ，整数表示值 `val` 。如果键 `key` 已经存在，那么原来的键值对将被替代成新的键值对。
- `int sum(string prefix)` 返回所有以该前缀 `prefix` 开头的键 `key` 的值的总和。



**示例 1：**

```
输入：
["MapSum", "insert", "sum", "insert", "sum"]
[[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
输出：
[null, null, 3, null, 5]
解释：
MapSum mapSum = new MapSum();
mapSum.insert("apple", 3);
mapSum.sum("ap");           // 返回 3 (apple = 3)
mapSum.insert("app", 2);
mapSum.sum("ap");           // 返回 5 (apple + app = 3 + 2 = 5)
```

**提示：**

- `1 <= key.length, prefix.length <= 50`
- `key` 和 `prefix` 仅由小写英文字母组成
- `1 <= val <= 1000`
- 最多调用 `50` 次 `insert` 和 `sum`



## 二、解答方法

### 2.1 方法一：前缀树（节点存子树和）

1. **思路**

Trie 每个节点维护 `sum`，表示「以根到该节点路径为前缀的所有键的值之和」：

- `insert(key, val)`：若 key 已存在，需要把旧值替换成新值——记录每个 key 的旧值，沿路径把节点 sum 增加 `val - old`；
- `sum(prefix)`：沿 Trie 走到 prefix 末尾节点，返回其 sum。

时间：`insert` / `sum` 均为 `O(len)`。

2. **代码实现**

::::::: code-group

```java [Java]
class MapSum {
    private static class Node {
        Node[] children = new Node[26];
        int sum;
    }
    private Node root = new Node();
    private Map<String, Integer> val = new HashMap<>();

    public void insert(String key, int val) {
        int diff = val - val.getOrDefault(key, 0);
        val.put(key, val);
        Node cur = root;
        for (char c : key.toCharArray()) {
            if (cur.children[c - 'a'] == null) cur.children[c - 'a'] = new Node();
            cur = cur.children[c - 'a'];
            cur.sum += diff;
        }
    }

    public int sum(String prefix) {
        Node cur = root;
        for (char c : prefix.toCharArray()) {
            cur = cur.children[c - 'a'];
            if (cur == null) return 0;
        }
        return cur.sum;
    }
}
```

```python [Python]
class MapSum:
    def __init__(self):
        self.children = {}
        self.sum = 0
        self.val = {}

    def insert(self, key: str, val: int) -> None:
        diff = val - self.val.get(key, 0)
        self.val[key] = val
        node = self
        for ch in key:
            if ch not in node.children:
                node.children[ch] = MapSum()
            node = node.children[ch]
            node.sum += diff

    def sum(self, prefix: str) -> int:
        node = self
        for ch in prefix:
            if ch not in node.children:
                return 0
            node = node.children[ch]
        return node.sum
```

```cpp [C++]
class MapSum {
    struct Node {
        Node* children[26];
        int sum;
        Node() : sum(0) {
            for (int i = 0; i < 26; i++) children[i] = nullptr;
        }
    };
    Node* root = new Node();
    unordered_map<string, int> val;
public:
    MapSum() {}

    void insert(string key, int val) {
        int diff = val - val[key];
        val[key] = val;
        Node* cur = root;
        for (char c : key) {
            if (!cur->children[c - 'a']) cur->children[c - 'a'] = new Node();
            cur = cur->children[c - 'a'];
            cur->sum += diff;
        }
    }

    int sum(string prefix) {
        Node* cur = root;
        for (char c : prefix) {
            cur = cur->children[c - 'a'];
            if (!cur) return 0;
        }
        return cur->sum;
    }
};
```

```go [Go]
type MapSum struct {
    children [26]*MapSum
    sum      int
    values   map[string]int
}

func Constructor() MapSum {
    return MapSum{values: map[string]int{}}
}

func (ms *MapSum) Insert(key string, val int) {
    diff := val - ms.values[key]
    ms.values[key] = val
    cur := ms
    for i := 0; i < len(key); i++ {
        idx := key[i] - 'a'
        if cur.children[idx] == nil {
            cur.children[idx] = &MapSum{values: ms.values}
        }
        cur = cur.children[idx]
        cur.sum += diff
    }
}

func (ms *MapSum) Sum(prefix string) int {
    cur := ms
    for i := 0; i < len(prefix); i++ {
        cur = cur.children[prefix[i]-'a']
        if cur == nil {
            return 0
        }
    }
    return cur.sum
}
```

```js [JavaScript]
var MapSum = function () {
    this.children = new Array(26).fill(null);
    this.sum = 0;
    this.val = new Map();
};

/**
 * @param {string} key
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function (key, val) {
    const diff = val - (this.val.get(key) || 0);
    this.val.set(key, val);
    let cur = this;
    for (const ch of key) {
        const idx = ch.charCodeAt(0) - 97;
        if (!cur.children[idx]) cur.children[idx] = new MapSum();
        cur = cur.children[idx];
        cur.sum += diff;
    }
};

/**
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function (prefix) {
    let cur = this;
    for (const ch of prefix) {
        cur = cur.children[ch.charCodeAt(0) - 97];
        if (!cur) return 0;
    }
    return cur.sum;
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

typedef struct Node {
    struct Node* children[26];
    int sum;
} Node;

typedef struct {
    Node* root;
    char keys[50][51];
    int vals[50];
    int keyCnt;
} MapSum;

MapSum* mapSumCreate() {
    MapSum* obj = (MapSum*)calloc(1, sizeof(MapSum));
    obj->root = (Node*)calloc(1, sizeof(Node));
    return obj;
}

static int getVal(MapSum* obj, char* key) {
    for (int i = 0; i < obj->keyCnt; i++)
        if (strcmp(obj->keys[i], key) == 0) return obj->vals[i];
    return 0;
}

void mapSumInsert(MapSum* obj, char* key, int val) {
    int old = getVal(obj, key);
    int diff = val - old;
    strcpy(obj->keys[obj->keyCnt], key);
    obj->vals[obj->keyCnt] = val;
    obj->keyCnt++;
    Node* cur = obj->root;
    for (int i = 0; key[i]; i++) {
        int idx = key[i] - 'a';
        if (!cur->children[idx]) cur->children[idx] = (Node*)calloc(1, sizeof(Node));
        cur = cur->children[idx];
        cur->sum += diff;
    }
}

int mapSumSum(MapSum* obj, char* prefix) {
    Node* cur = obj->root;
    for (int i = 0; prefix[i]; i++) {
        cur = cur->children[prefix[i] - 'a'];
        if (!cur) return 0;
    }
    return cur->sum;
}

void mapSumFree(MapSum* obj) {
    free(obj->root);
    free(obj);
}
```

```ts [TypeScript]
class MapSum {
    private children: (MapSum | null)[] = new Array(26).fill(null);
    private sum = 0;
    private val = new Map<string, number>();

    insert(key: string, val: number): void {
        const diff = val - (this.val.get(key) || 0);
        this.val.set(key, val);
        let cur: MapSum = this;
        for (const ch of key) {
            const idx = ch.charCodeAt(0) - 97;
            if (!cur.children[idx]) cur.children[idx] = new MapSum();
            cur = cur.children[idx]!;
            cur.sum += diff;
        }
    }

    sum(prefix: string): number {
        let cur: MapSum = this;
        for (const ch of prefix) {
            const node = cur.children[ch.charCodeAt(0) - 97];
            if (!node) return 0;
            cur = node;
        }
        return cur.sum;
    }
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`insert` 与 `sum` 均为 `O(len)`。
- **空间复杂度**：`O(总字符数)`，Trie 节点。

## 三、总结

| 方法 | insert | sum | 空间 |
| ---- | ---------- | ---------- | ---------- |
| 前缀树存子树和 | `O(len)` | `O(len)` | `O(总字符数)` |

Trie 节点直接维护「该前缀下的值总和」，使 `sum` 查询与键长成正比；`insert` 时用「新旧值之差」增量更新路径上所有节点。

