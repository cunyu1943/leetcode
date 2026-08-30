# [170. 两数之和 III - 数据结构设计](https://leetcode.cn/problems/two-sum-iii-data-structure-design/) [🔒 会员题]



## 一、题目描述

设计一个接收整数流的数据结构，该数据结构支持如下操作：

-   `void add(int number)` 向数据结构添加一个数 `number` 。
-   `boolean find(int value)` 寻找数据结构中是否存在一对整数，使得两数之和是整数 `value` 。如果存在，返回 `true` ；否则，返回 `false` 。



**示例：**

```
输入：
add(1); add(3); add(5);
find(4) -> true
find(7) -> false
```

**提示：**

-   `-10⁵ <= number <= 10⁵`
-   `-2³¹ <= value <= 2³¹ - 1`
-   最多调用 `add` 和 `find` 操作 `10⁴` 次



## 二、解答方法

### 2.1 方法一：哈希表计数

1. **思路**

用一个哈希表记录每个数字出现的次数。查找时遍历所有键 `k`：若 `value - k` 存在于表中，且（`k != value - k` 或该数字出现次数 ≥ 2）则返回 `true`。

2. **代码实现**

:::::: code-group

```java [Java]
class TwoSum {
    private Map<Integer, Integer> cnt = new HashMap<>();

    public void add(int number) {
        cnt.put(number, cnt.getOrDefault(number, 0) + 1);
    }

    public boolean find(int value) {
        for (int k : cnt.keySet()) {
            int target = value - k;
            if (target == k) {
                if (cnt.get(k) >= 2) return true;
            } else if (cnt.containsKey(target)) {
                return true;
            }
        }
        return false;
    }
}
```

```python [Python]
class TwoSum:

    def __init__(self):
        self.cnt = {}

    def add(self, number: int) -> None:
        self.cnt[number] = self.cnt.get(number, 0) + 1

    def find(self, value: int) -> bool:
        for k in self.cnt:
            target = value - k
            if target == k:
                if self.cnt[k] >= 2:
                    return True
            elif target in self.cnt:
                return True
        return False
```

```go [Go]
type TwoSum struct {
    cnt map[int]int
}

func Constructor() TwoSum {
    return TwoSum{cnt: make(map[int]int)}
}

func (t *TwoSum) Add(number int) {
    t.cnt[number]++
}

func (t *TwoSum) Find(value int) bool {
    for k, c := range t.cnt {
        target := value - k
        if target == k {
            if c >= 2 {
                return true
            }
        } else if _, ok := t.cnt[target]; ok {
            return true
        }
    }
    return false
}
```

```cpp [C++]
class TwoSum {
    unordered_map<int, int> cnt;
public:
    void add(int number) {
        cnt[number]++;
    }

    bool find(int value) {
        for (auto& [k, c] : cnt) {
            int target = value - k;
            if (target == k) {
                if (c >= 2) return true;
            } else if (cnt.count(target)) {
                return true;
            }
        }
        return false;
    }
};
```

```js [JavaScript]
var TwoSum = function () {
    this.cnt = new Map();
};

TwoSum.prototype.add = function (number) {
    this.cnt.set(number, (this.cnt.get(number) || 0) + 1);
};

TwoSum.prototype.find = function (value) {
    for (const [k, c] of this.cnt) {
        const target = value - k;
        if (target === k) {
            if (c >= 2) return true;
        } else if (this.cnt.has(target)) {
            return true;
        }
    }
    return false;
};
```

```ts [TypeScript]
class TwoSum {
    private cnt: Map<number, number>;

    constructor() {
        this.cnt = new Map();
    }

    add(number: number): void {
        this.cnt.set(number, (this.cnt.get(number) || 0) + 1);
    }

    find(value: number): boolean {
        for (const [k, c] of this.cnt) {
            const target = value - k;
            if (target === k) {
                if (c >= 2) return true;
            } else if (this.cnt.has(target)) {
                return true;
            }
        }
        return false;
    }
}
```

::::::

3. **复杂度分析**

- `add`：时间 `O(1)`，空间 `O(n)`。
- `find`：时间 `O(n)`。
- 若 `add` 远多于 `find`，可优化为用两个哈希表维护「已存在的和」，使 `find` 降到 `O(1)`（但 `add` 升到 `O(n)`）。

## 三、总结

与 1 题/167 题不同，本题是**动态数据流**：`add` 持续插入，需边存边查。哈希表计数 + `find` 遍历是最直接解法，注意处理「同一数字用两次」（`cnt>=2`）的情况。
