# [380. 常数时间插入、删除和获取随机元素](https://leetcode.cn/problems/insert-delete-getrandom-o1/)

## 一、题目描述

设计一个数据结构支持所有操作平均 `O(1)`：
- `insert(val)`：若 `val` 不存在则插入，返回 `true`；否则 `false`；
- `remove(val)`：若 `val` 存在则删除，返回 `true`；否则 `false`；
- `getRandom()`：等概率随机返回现有元素之一。

**示例：**
```
insert(1)→true; remove(2)→false; insert(2)→true; getRandom()→1或2; remove(1)→true; insert(2)→false（已存在）
```

**提示：** `-2³¹ <= val <= 2³¹-1`，最多 `2×10⁵` 次操作。`getRandom` 须真正等概率。

## 二、解答方法

### 方法一：动态数组 + 哈希（交换尾元素实现 O(1) 删除）

**思路：** 用 `ArrayList` 存元素（保证随机下标 `O(1)`），`HashMap<val, index>` 存值到下标。删除时：把待删元素与数组末尾元素交换，更新末尾元素的新下标，再 `pop` 末尾并删哈希——从而 `O(1)` 完成删除（不需移位）。`getRandom` 随机下标取值。

:::::: code-group

```java [Java]
class RandomizedSet {
    private List<Integer> list = new ArrayList<>();
    private Map<Integer, Integer> idx = new HashMap<>();
    private Random rnd = new Random();
    public boolean insert(int val) {
        if (idx.containsKey(val)) return false;
        idx.put(val, list.size()); list.add(val); return true;
    }
    public boolean remove(int val) {
        if (!idx.containsKey(val)) return false;
        int i = idx.get(val);
        int last = list.get(list.size()-1);
        list.set(i, last); idx.put(last, i);    // 末尾换到 i
        list.remove(list.size()-1); idx.remove(val);
        return true;
    }
    public int getRandom() { return list.get(rnd.nextInt(list.size())); }
}
```

```python [Python]
class RandomizedSet:
    def __init__(self):
        self.arr = []; self.idx = {}
    def insert(self, val: int) -> bool:
        if val in self.idx: return False
        self.idx[val] = len(self.arr); self.arr.append(val); return True
    def remove(self, val: int) -> bool:
        if val not in self.idx: return False
        i = self.idx[val]; last = self.arr[-1]
        self.arr[i] = last; self.idx[last] = i
        self.arr.pop(); del self.idx[val]; return True
    def getRandom(self) -> int:
        import random; return random.choice(self.arr)
```

```cpp [C++]
class RandomizedSet {
    vector<int> arr; unordered_map<int,int> idx;
public:
    bool insert(int val) {
        if(idx.count(val)) return false;
        idx[val]=arr.size(); arr.push_back(val); return true;
    }
    bool remove(int val) {
        if(!idx.count(val)) return false;
        int i=idx[val], last=arr.back();
        arr[i]=last; idx[last]=i;
        arr.pop_back(); idx.erase(val); return true;
    }
    int getRandom() { return arr[rand() % arr.size()]; }
};
```

```go [Go]
type RandomizedSet struct { arr []int; idx map[int]int }
func Constructor() RandomizedSet { return RandomizedSet{idx: map[int]int{}} }
func (rs *RandomizedSet) Insert(val int) bool {
    if _, ok := rs.idx[val]; ok { return false }
    rs.idx[val] = len(rs.arr); rs.arr = append(rs.arr, val); return true
}
func (rs *RandomizedSet) Remove(val int) bool {
    i, ok := rs.idx[val]; if !ok { return false }
    last := rs.arr[len(rs.arr)-1]
    rs.arr[i] = last; rs.idx[last] = i
    rs.arr = rs.arr[:len(rs.arr)-1]; delete(rs.idx, val); return true
}
func (rs *RandomizedSet) GetRandom() int {
    return rs.arr[rand.Intn(len(rs.arr))]
}
```

```js [JavaScript]
var RandomizedSet = function () { this.arr = []; this.idx = {}; };
RandomizedSet.prototype.insert = function (val) {
    if (val in this.idx) return false;
    this.idx[val] = this.arr.length; this.arr.push(val); return true;
};
RandomizedSet.prototype.remove = function (val) {
    if (!(val in this.idx)) return false;
    const i = this.idx[val], last = this.arr[this.arr.length-1];
    this.arr[i] = last; this.idx[last] = i;
    this.arr.pop(); delete this.idx[val]; return true;
};
RandomizedSet.prototype.getRandom = function () { return this.arr[Math.floor(Math.random()*this.arr.length)]; };
```

::::::

**复杂度：** 三个操作均摊 `O(1)`，空间 `O(n)`。

## 三、总结

经典设计：「数组 + 哈希」实现 `O(1)` 随机。关键是删除时 **与末尾交换** 避免数组整体移位（否则 `remove` 退化 `O(n)`）。哈希存下标、`getRandom` 借随机下标。进阶：`381 允许重复 Insert Delete GetRandom`（需用 `val → Set of indices`）。
