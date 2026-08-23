# [LCR 030. O(1) 时间插入、删除和获取随机元素](https://leetcode.cn/problems/FortPu/)



## 一、题目描述

设计一个支持在 **平均** 时间复杂度 `O(1)` 下，执行以下操作的数据结构。

- `insert(val)`：当元素 `val` 不存在时，向集合中插入该项。
- `remove(val)`：当元素 `val` 存在时，从集合中移除该项。
- `getRandom()`：随机返回现有集合中的一项。每个元素应该有 **相同的概率** 被返回。

**示例：**

```
输入: ["RandomizedSet","insert","remove","insert","getRandom","remove","insert","getRandom"]
[[],[1],[2],[2],[],[1],[2],[]]
输出: [null,true,false,true,2,true,false,2]
```

**解释:**

```
RandomizedSet randomSet = new RandomizedSet();
randomSet.insert(1);   // 向集合中插入 1 ，返回 true 表示 1 被成功地插入
randomSet.remove(2);   // 返回 false ，表示集合中不存在 2
randomSet.insert(2);   // 向集合中插入 2 ，返回 true
randomSet.getRandom(); // 返回 2（可随机返回集合中任意一个元素）
randomSet.remove(1);   // 从集合中移除 1 ，返回 true
randomSet.insert(2);   // 2 已在集合中，所以返回 false
randomSet.getRandom(); // 随机返回集合中的一个元素
```

**提示：**

- `-2³¹ <= val <= 2³¹ - 1`
- 最多调用 `insert`、`remove`、`getRandom` 函数 `2 * 10⁵` 次
- 在调用 `getRandom` 方法时，数据结构中至少存在一个元素



## 二、解答方法

### 2.1 方法一：哈希表 + 动态数组（末尾交换删除）

1. **思路**

- 用数组 `nums` 存储元素，保证 `getRandom` 可用下标 `O(1)` 等概率随机；
- 用哈希表 `idx` 记录「值 -> 在数组中的下标」；
- `insert`：哈希查重后 push 到数组末尾并记录下标；
- `remove`：把待删元素与数组末尾元素交换（或覆盖），再删除末尾，并更新末尾元素在哈希表中的下标；
- `getRandom`：`random(n)` 取数组下标。

删除时「与最后一个交换」避免了数组元素前移的 `O(n)` 开销。各操作均摊 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class RandomizedSet {
    private List<Integer> nums;
    private Map<Integer, Integer> idx;
    private Random rand;

    public RandomizedSet() {
        nums = new ArrayList<>();
        idx = new HashMap<>();
        rand = new Random();
    }

    public boolean insert(int val) {
        if (idx.containsKey(val)) return false;
        idx.put(val, nums.size());
        nums.add(val);
        return true;
    }

    public boolean remove(int val) {
        if (!idx.containsKey(val)) return false;
        int pos = idx.get(val);
        int last = nums.get(nums.size() - 1);
        nums.set(pos, last);        // 用末尾元素覆盖
        idx.put(last, pos);
        nums.remove(nums.size() - 1);
        idx.remove(val);
        return true;
    }

    public int getRandom() {
        return nums.get(rand.nextInt(nums.size()));
    }
}
```

```python [Python]
import random


class RandomizedSet:
    def __init__(self):
        self.nums = []
        self.idx = {}

    def insert(self, val: int) -> bool:
        if val in self.idx:
            return False
        self.idx[val] = len(self.nums)
        self.nums.append(val)
        return True

    def remove(self, val: int) -> bool:
        if val not in self.idx:
            return False
        pos = self.idx[val]
        last = self.nums[-1]
        self.nums[pos] = last
        self.idx[last] = pos
        self.nums.pop()
        del self.idx[val]
        return True

    def getRandom(self) -> int:
        return random.choice(self.nums)
```

```cpp [C++]
class RandomizedSet {
    vector<int> nums;
    unordered_map<int, int> idx;
public:
    RandomizedSet() {}

    bool insert(int val) {
        if (idx.count(val)) return false;
        idx[val] = nums.size();
        nums.push_back(val);
        return true;
    }

    bool remove(int val) {
        if (!idx.count(val)) return false;
        int pos = idx[val];
        int last = nums.back();
        nums[pos] = last;
        idx[last] = pos;
        nums.pop_back();
        idx.erase(val);
        return true;
    }

    int getRandom() {
        return nums[rand() % nums.size()];
    }
};
```

```go [Go]
type RandomizedSet struct {
    nums []int
    idx  map[int]int
}

func Constructor() RandomizedSet {
    return RandomizedSet{idx: map[int]int{}}
}

func (rs *RandomizedSet) Insert(val int) bool {
    if _, ok := rs.idx[val]; ok {
        return false
    }
    rs.idx[val] = len(rs.nums)
    rs.nums = append(rs.nums, val)
    return true
}

func (rs *RandomizedSet) Remove(val int) bool {
    pos, ok := rs.idx[val]
    if !ok {
        return false
    }
    last := rs.nums[len(rs.nums)-1]
    rs.nums[pos] = last
    rs.idx[last] = pos
    rs.nums = rs.nums[:len(rs.nums)-1]
    delete(rs.idx, val)
    return true
}

func (rs *RandomizedSet) GetRandom() int {
    return rs.nums[rand.Intn(len(rs.nums))]
}
```

```js [JavaScript]
var RandomizedSet = function () {
    this.nums = [];
    this.idx = new Map();
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
    if (this.idx.has(val)) return false;
    this.idx.set(val, this.nums.length);
    this.nums.push(val);
    return true;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
    if (!this.idx.has(val)) return false;
    const pos = this.idx.get(val);
    const last = this.nums[this.nums.length - 1];
    this.nums[pos] = last;
    this.idx.set(last, pos);
    this.nums.pop();
    this.idx.delete(val);
    return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
    return this.nums[Math.floor(Math.random() * this.nums.length)];
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

typedef struct {
    int* nums;      // 动态数组
    int size;
    int cap;
    int* idxVal;    // 哈希：值 -> 下标（由于值范围大，这里用最简单的线性探测哈希）
    int* idxKey;
    int hashSize;
} RandomizedSet;

#define HSIZE 1000003

static int hashGet(RandomizedSet* obj, int key) {
    int h = ((unsigned)key % HSIZE + HSIZE) % HSIZE;
    while (obj->idxKey[h] != 0 && obj->idxKey[h] != key) h = (h + 1) % HSIZE;
    return h;
}

RandomizedSet* randomizedSetCreate() {
    RandomizedSet* obj = (RandomizedSet*)calloc(1, sizeof(RandomizedSet));
    obj->cap = 16;
    obj->nums = (int*)malloc(obj->cap * sizeof(int));
    obj->idxKey = (int*)calloc(HSIZE, sizeof(int));
    obj->idxVal = (int*)calloc(HSIZE, sizeof(int));
    obj->hashSize = HSIZE;
    return obj;
}

bool randomizedSetInsert(RandomizedSet* obj, int val) {
    int h = hashGet(obj, val);
    if (obj->idxKey[h] == val) return false;
    obj->idxKey[h] = val;
    obj->idxVal[h] = obj->size;
    if (obj->size == obj->cap) {
        obj->cap *= 2;
        obj->nums = (int*)realloc(obj->nums, obj->cap * sizeof(int));
    }
    obj->nums[obj->size++] = val;
    return true;
}

bool randomizedSetRemove(RandomizedSet* obj, int val) {
    int h = hashGet(obj, val);
    if (obj->idxKey[h] != val) return false;
    int pos = obj->idxVal[h];
    int last = obj->nums[obj->size - 1];
    obj->nums[pos] = last;
    int hLast = hashGet(obj, last);
    obj->idxVal[hLast] = pos;
    obj->size--;
    obj->idxKey[h] = 0;   // 删除标记（简化版，存在键冲突时可用墓碑标记）
    return true;
}

int randomizedSetGetRandom(RandomizedSet* obj) {
    return obj->nums[rand() % obj->size];
}

void randomizedSetFree(RandomizedSet* obj) {
    free(obj->nums);
    free(obj->idxKey);
    free(obj->idxVal);
    free(obj);
}
```

```ts [TypeScript]
class RandomizedSet {
    private nums: number[] = [];
    private idx: Map<number, number> = new Map();

    insert(val: number): boolean {
        if (this.idx.has(val)) return false;
        this.idx.set(val, this.nums.length);
        this.nums.push(val);
        return true;
    }

    remove(val: number): boolean {
        if (!this.idx.has(val)) return false;
        const pos = this.idx.get(val)!;
        const last = this.nums[this.nums.length - 1];
        this.nums[pos] = last;
        this.idx.set(last, pos);
        this.nums.pop();
        this.idx.delete(val);
        return true;
    }

    getRandom(): number {
        return this.nums[Math.floor(Math.random() * this.nums.length)];
    }
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`insert` / `remove` / `getRandom` 均摊 `O(1)`。
- **空间复杂度**：`O(n)`，数组 + 哈希表。

## 三、总结

| 方法 | insert | remove | getRandom | 空间 |
| ---- | ---------- | ---------- | ---------- | ---------- |
| 哈希表 + 动态数组 | `O(1)` | `O(1)` | `O(1)` | `O(n)` |

「动态数组 + 值到下标的哈希」是 O(1) 随机容器设计的黄金组合：数组保证等概率随机取，哈希保证快速定位，删除时与末尾元素交换避免整体移动。

