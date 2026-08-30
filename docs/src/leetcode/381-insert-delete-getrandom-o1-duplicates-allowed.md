# [381. O(1) 时间插入、删除和获取随机元素 - 允许重复](https://leetcode.cn/problems/insert-delete-getrandom-o1-duplicates-allowed/)

## 一、题目描述

`380` 的扩展：允许插入 **重复** 元素，且 `getRandom` 须对所有插入（含重复）等概率返回。`remove(val)` 只删除 **一个** 该值的副本。

**示例：**
```
insert(1)→true; insert(1)→true; insert(2)→true; getRandom()→1(2/3)或2(1/3); remove(1)→true（还剩一个1）
```

**提示：** 最多 `10⁵` 次操作。

## 二、解答方法

### 方法一：数组 + 哈希（值 → 下标集合）

**思路：** 数组 `arr` 存所有元素（含重复）。哈希 `idx: val → Set of 下标`（该值在数组中的所有位置）。插入：下标 = `arr.length`，加入 `arr` 和 `idx[val]` 集合。删除：从 `idx[val]` 取一个位置 `i`，把数组末尾元素 `last` 换到 `i`（并更新 `idx[last]` 集合），移除末尾，并从 `idx[val]` 删 `i`（集合空则删键）。随机：随机下标取值。

:::::: code-group

```java [Java]
class RandomizedCollection {
    private List<Integer> arr = new ArrayList<>();
    private Map<Integer, Set<Integer>> idx = new HashMap<>();
    private Random rnd = new Random();
    public boolean insert(int val) {
        boolean absent = !idx.containsKey(val) || idx.get(val).isEmpty();
        idx.computeIfAbsent(val, k -> new HashSet<>()).add(arr.size());
        arr.add(val);
        return absent;
    }
    public boolean remove(int val) {
        if (!idx.containsKey(val) || idx.get(val).isEmpty()) return false;
        Set<Integer> set = idx.get(val);
        int i = set.iterator().next(); set.remove(i);
        int last = arr.get(arr.size()-1);
        arr.set(i, last);
        idx.get(last).remove(arr.size()-1); idx.get(last).add(i);
        arr.remove(arr.size()-1);
        if (set.isEmpty()) idx.remove(val);
        return true;
    }
    public int getRandom() { return arr.get(rnd.nextInt(arr.size())); }
}
```

```python [Python]
class RandomizedCollection:
    def __init__(self):
        self.arr = []; self.idx = defaultdict(set)
    def insert(self, val: int) -> bool:
        absent = len(self.idx[val]) == 0
        self.idx[val].add(len(self.arr)); self.arr.append(val); return absent
    def remove(self, val: int) -> bool:
        if not self.idx[val]: return False
        i = self.idx[val].pop(); last = self.arr[-1]
        self.arr[i] = last; self.idx[last].discard(len(self.arr)-1); self.idx[last].add(i)
        self.arr.pop()
        if not self.idx[val]: del self.idx[val]
        return True
    def getRandom(self) -> int:
        return random.choice(self.arr)
```

```cpp [C++]
class RandomizedCollection {
    vector<int> arr; unordered_map<int, unordered_set<int>> idx;
public:
    bool insert(int val) {
        bool absent = idx[val].empty();
        idx[val].insert(arr.size()); arr.push_back(val); return absent;
    }
    bool remove(int val) {
        if(idx.find(val)==idx.end() || idx[val].empty()) return false;
        int i = *idx[val].begin(); idx[val].erase(i);
        int last = arr.back();
        arr[i] = last; idx[last].erase(arr.size()-1); idx[last].insert(i);
        arr.pop_back();
        if(idx[val].empty()) idx.erase(val);
        return true;
    }
    int getRandom() { return arr[rand()%arr.size()]; }
};
```

```go [Go]
type RandomizedCollection struct { arr []int; idx map[int]map[int]bool }
func Constructor() RandomizedCollection { return RandomizedCollection{idx: map[int]map[int]bool{}} }
func (rc *RandomizedCollection) Insert(val int) bool {
    absent := len(rc.idx[val]) == 0
    if rc.idx[val] == nil { rc.idx[val] = map[int]bool{} }
    rc.idx[val][len(rc.arr)] = true; rc.arr = append(rc.arr, val); return absent
}
func (rc *RandomizedCollection) Remove(val int) bool {
    if len(rc.idx[val]) == 0 { return false }
    var i int; for k := range rc.idx[val] { i = k; break }
    delete(rc.idx[val], i)
    last := rc.arr[len(rc.arr)-1]
    rc.arr[i] = last; delete(rc.idx[last], len(rc.arr)-1); rc.idx[last][i] = true
    rc.arr = rc.arr[:len(rc.arr)-1]
    if len(rc.idx[val]) == 0 { delete(rc.idx, val) }
    return true
}
func (rc *RandomizedCollection) GetRandom() int { return rc.arr[rand.Intn(len(rc.arr))] }
```

```js [JavaScript]
var RandomizedCollection = function () { this.arr = []; this.idx = {}; };
RandomizedCollection.prototype.insert = function (val) {
    const absent = !this.idx[val] || this.idx[val].size === 0;
    if (!this.idx[val]) this.idx[val] = new Set();
    this.idx[val].add(this.arr.length); this.arr.push(val); return absent;
};
RandomizedCollection.prototype.remove = function (val) {
    if (!this.idx[val] || this.idx[val].size === 0) return false;
    const i = this.idx[val].values().next().value; this.idx[val].delete(i);
    const last = this.arr[this.arr.length-1];
    this.arr[i] = last; this.idx[last].delete(this.arr.length-1); this.idx[last].add(i);
    this.arr.pop();
    if (this.idx[val].size === 0) delete this.idx[val];
    return true;
};
RandomizedCollection.prototype.getRandom = function () { return this.arr[Math.floor(Math.random()*this.arr.length)]; };
```

::::::

**复杂度：** 均摊 `O(1)`，空间 `O(n)`。

## 三、总结

`380` 的扩展：用「值 → 下标集合」支持重复。删除时仍需与末尾交换（保持 `O(1)`），但要维护该值的下标集合与末尾值的下标集合。注意 `remove` 后若集合空需删哈希键，否则 `insert` 判断 `absent` 出错。`getRandom` 借数组随机下标，重复元素自然按出现次数等概率。
