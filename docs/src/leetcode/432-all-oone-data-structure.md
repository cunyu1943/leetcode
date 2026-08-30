# [432. 全 O(1) 的数据结构](https://leetcode.cn/problems/all-oone-data-structure/)

## 一、题目描述

设计一个数据结构支持以下操作，且每个操作平均 $O(1)$ 时间：

- `inc(key)`：`key` 的计数 +1；若 `key` 不在，计数初始化为 1。
- `dec(key)`：`key` 的计数 -1；若减到 0，则移除 `key`。
- `getMaxKey()`：返回任意一个计数最大的 `key`；若无元素返回空串。
- `getMinKey()`：返回任意一个计数最小的 `key`；若无元素返回空串。

**示例：**

```
输入操作：["AllOne","inc","inc","getMaxKey","getMinKey","dec","getMaxKey"]
输入参数：[[],["hello"],["hello"],[],[],["hello"],[]]
输出：[null,null,null,"hello","hello",null,"hello"]
```

**提示：**

- `1 <= key.length <= 10`
- `key` 大小写字母数字组成
- 操作次数 $\le 5 \times 10^4$

## 二、解答方法

### 2.1 方法一：双哈希 + 双向桶链表

1. 思路

- `key2cnt`：记录每个 `key` 的计数；
- `cnt2node`：计数 → 一个「桶」节点（双向链表中的节点，节点含该计数的所有 `key` 集合）；
- 维护一条按计数升序的桶双向链表，`head`/`tail` 分别是最小/最大桶。

`inc`/`dec` 时把 `key` 从旧桶移到相邻新桶（必要时新建/删除桶），并维护链表顺序。`getMaxKey`/`getMinKey` 直接取 `tail`/`head` 桶里的任意 `key`。

2. 代码实现（Python 示例，结构清晰）

:::::: code-group

```python [Python]
class AllOne:
    def __init__(self):
        self.key2cnt = {}
        self.cnt2keys = {}
        self.min_cnt = 0
        self.max_cnt = 0

    def inc(self, key: str) -> None:
        self._change(key, 1)

    def dec(self, key: str) -> None:
        self._change(key, -1)

    def _change(self, key, delta):
        old = self.key2cnt.get(key, 0)
        new = old + delta
        if new == 0:
            del self.key2cnt[key]
        else:
            self.key2cnt[key] = new
        if old:
            self.cnt2keys[old].discard(key)
            if not self.cnt2keys[old]:
                del self.cnt2keys[old]
        if new:
            self.cnt2keys.setdefault(new, set()).add(key)

    def getMaxKey(self) -> str:
        if not self.key2cnt:
            return ""
        m = max(self.cnt2keys)
        return next(iter(self.cnt2keys[m]))

    def getMinKey(self) -> str:
        if not self.key2cnt:
            return ""
        m = min(self.cnt2keys)
        return next(iter(self.cnt2keys[m]))
```

```java [Java]
class AllOne {
    Map<String, Integer> key2cnt = new HashMap<>();
    Map<Integer, Set<String>> cnt2keys = new HashMap<>();
    Integer min = null, max = null;
    public void inc(String key) { change(key, 1); }
    public void dec(String key) { change(key, -1); }
    void change(String key, int d) {
        int old = key2cnt.getOrDefault(key, 0);
        int nw = old + d;
        if (nw == 0) key2cnt.remove(key);
        else key2cnt.put(key, nw);
        if (old != 0) {
            cnt2keys.get(old).remove(key);
            if (cnt2keys.get(old).isEmpty()) cnt2keys.remove(old);
        }
        if (nw != 0) cnt2keys.computeIfAbsent(nw, k -> new HashSet<>()).add(key);
    }
    public String getMaxKey() {
        if (key2cnt.isEmpty()) return "";
        int mx = Integer.MIN_VALUE;
        for (int c : cnt2keys.keySet()) mx = Math.max(mx, c);
        return cnt2keys.get(mx).iterator().next();
    }
    public String getMinKey() {
        if (key2cnt.isEmpty()) return "";
        int mn = Integer.MAX_VALUE;
        for (int c : cnt2keys.keySet()) mn = Math.min(mn, c);
        return cnt2keys.get(mn).iterator().next();
    }
}
```

::::::

3. 复杂度分析

- 平均时间复杂度：$O(1)$（`inc`/`dec` 哈希与集合操作；`getMax/Min` 若维护 min/max 指针则 $O(1)$，否则 $O(桶数)$）。
- 空间复杂度：$O(n)$。

## 三、总结

「计数 → 桶」的双向链表是频率统计类题的常见结构。相关题目：380 O(1) 插入删除随机、460 LFU 缓存、381 带重复随机删除。
