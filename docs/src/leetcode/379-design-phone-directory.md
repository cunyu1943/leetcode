# [379. 电话目录管理系统](https://leetcode.cn/problems/design-phone-directory/) [🔒 会员题]

## 一、题目描述

设计一个电话目录管理系统，初始有 `maxNumbers` 个号码（`0 ~ maxNumbers-1`）。支持：
- `get()`：分配一个 **未使用** 的号码，返回该号码；若无可用返回 -1；
- `check(number)`：若 `number` 当前未被分配返回 `true`；
- `release(number)`：释放 `number`，使其可再次被 `get` 分配。

**示例：**
```
PhoneDirectory(3): get()→0, get()→1, check(1)→false, get()→2, get()→-1, release(2), get()→2
```

**提示：** `1 <= maxNumbers <= 10⁴`，`get/check/release` 调用约 `2×10⁴` 次。

## 二、解答方法

### 方法一：集合 + 双端队列（保证 get 顺序）

**思路：** 用 `Set` 记录已分配号码（用于 `check`/`release` 校验），用 `Queue` 或数组存「可用号码」保证 `get` 按顺序分配（`get` 时从可用队列取一个、加入已分配集；`release` 时若号码确实已分配则移出已分配集、放回可用队列）。

:::::: code-group

```java [Java]
class PhoneDirectory {
    private Queue<Integer> available = new LinkedList<>();
    private Set<Integer> used = new HashSet<>();
    public PhoneDirectory(int maxNumbers) {
        for (int i = 0; i < maxNumbers; i++) available.offer(i);
    }
    public int get() {
        if (available.isEmpty()) return -1;
        int x = available.poll();
        used.add(x);
        return x;
    }
    public boolean check(int number) { return !used.contains(number); }
    public void release(int number) {
        if (used.remove(number)) available.offer(number);
    }
}
```

```python [Python]
class PhoneDirectory:
    def __init__(self, maxNumbers: int):
        self.used = set()
        self.available = deque(range(maxNumbers))
    def get(self) -> int:
        if not self.available: return -1
        x = self.available.popleft(); self.used.add(x); return x
    def check(self, number: int) -> bool:
        return number not in self.used
    def release(self, number: int) -> None:
        if number in self.used:
            self.used.discard(number); self.available.append(number)
```

```cpp [C++]
class PhoneDirectory {
    queue<int> available; unordered_set<int> used;
public:
    PhoneDirectory(int maxNumbers) { for(int i=0;i<maxNumbers;i++) available.push(i); }
    int get() {
        if(available.empty()) return -1;
        int x=available.front(); available.pop(); used.insert(x); return x;
    }
    bool check(int number) { return used.find(number)==used.end(); }
    void release(int number) { if(used.erase(number)) available.push(number); }
};
```

```go [Go]
type PhoneDirectory struct { available []int; used map[int]bool }
func Constructor(maxNumbers int) PhoneDirectory {
    av := make([]int, maxNumbers); for i := range av { av[i] = i }
    return PhoneDirectory{available: av, used: map[int]bool{}}
}
func (p *PhoneDirectory) Get() int {
    if len(p.available) == 0 { return -1 }
    x := p.available[0]; p.available = p.available[1:]; p.used[x] = true; return x
}
func (p *PhoneDirectory) Check(number int) bool { return !p.used[number] }
func (p *PhoneDirectory) Release(number int) {
    if p.used[number] { delete(p.used, number); p.available = append(p.available, number) }
}
```

```js [JavaScript]
var PhoneDirectory = function (maxNumbers) {
    this.used = new Set();
    this.available = []; for (let i=0;i<maxNumbers;i++) this.available.push(i);
};
PhoneDirectory.prototype.get = function () {
    if (this.available.length === 0) return -1;
    const x = this.available.shift(); this.used.add(x); return x;
};
PhoneDirectory.prototype.check = function (number) { return !this.used.has(number); };
PhoneDirectory.prototype.release = function (number) {
    if (this.used.delete(number)) this.available.push(number);
};
```

::::::

**复杂度：** `get/check/release` 均 `O(1)`，空间 `O(maxNumbers)`。

## 三、总结

资源管理设计题：用「可用队列 + 已用集合」双结构，保证 `get` 顺序分配且 `O(1)`。`release` 必须校验「确实已分配」再回收，避免重复放入可用队列（否则同一号码会重复分配）。同类：`355 推特`、`359 限流`、`281 锯齿迭代器` 等设计题。注意 `check` 只看是否已用，不看是否在可用队列。
