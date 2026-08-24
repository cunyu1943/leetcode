# [面试题 03.06. 动物收容所](https://leetcode.cn/problems/animal-shelter-lcci/)

## 一、题目描述

动物收容所。有家动物收容所只收容狗与猫，且严格遵守“先进先出”的原则。在收养该收容所的动物时，收养人只能收养所有动物中“最老”（根据进入收容所的时间长短）的动物，或者选择猫或狗（同时必须收养此类动物中“最老”的）。换言之，收养人不能自由挑选想收养的对象。请创建适用于这个系统的数据结构，实现各种操作方法，比如 `enqueue`、`dequeueAny`、`dequeueDog` 和 `dequeueCat`。允许使用 Java 内置的 `LinkedList` 数据结构。

`enqueue` 方法有一个 `animal` 参数，`animal[0]` 代表动物编号，`animal[1]` 代表动物种类，其中 0 代表猫，1 代表狗。

`dequeueAny` 方法返回 `[动物编号, 动物种类]`，若收容所无动物，则返回 `[-1, -1]`。

`dequeueDog` 方法返回 `[动物编号, 动物种类]`，若收容所无狗，则返回 `[-1, -1]`。

`dequeueCat` 方法返回 `[动物编号, 动物种类]`，若收容所无猫，则返回 `[-1, -1]`。

**示例：**

```
输入：
["AnimalShelf", "enqueue", "enqueue", "enqueue", "dequeueAny", "dequeueCat", "dequeueDog"]
[[], [[0, 0]], [[1, 1]], [[2, 0]], [], [], []]
输出：
[null, null, null, null, [0,0], [2,0], [1,1]]
解释：
AnimalShelf as = new AnimalShelf();
as.enqueue([0, 0]); // 猫
as.enqueue([1, 1]); // 狗
as.enqueue([2, 0]); // 猫
as.dequeueAny();    // 返回 [0, 0]
as.dequeueCat();    // 返回 [2, 0]
as.dequeueDog();    // 返回 [1, 1]
```

**提示：**

- 所有操作均为有效操作，不会对空队列调用 `dequeue` 方法。
- `enqueue` 调用次数不超过 `10000`。

---

## 二、解答方法

### 2.1 方法一：使用两个队列（猫队列 + 狗队列 + 时间戳）

**1. 思路**

维护两个队列：一个用于猫，一个用于狗。每个队列存储 `[动物编号, 时间戳]`，时间戳为入队时的全局计数器，用于比较不同种类动物的先后顺序。

- `enqueue(animal)`：若动物种类为猫，则加入猫队列，并分配当前时间戳；否则加入狗队列，时间戳递增。
- `dequeueAny()`：比较猫队列和狗队列的队首时间戳，选择时间戳较小的（即更早入队的）动物出队，并返回其编号和种类。
- `dequeueDog()`：若狗队列非空，则弹出队首元素并返回 `[编号, 1]`；否则返回 `[-1, -1]`。
- `dequeueCat()`：若猫队列非空，则弹出队首元素并返回 `[编号, 0]`；否则返回 `[-1, -1]`。

此方法使用两个队列，每个动物只存储一次，时间复杂度 O(1)，空间 O(n)。

**2. 代码实现**

:::::: code-group

```java [Java]
import java.util.LinkedList;
import java.util.Queue;

class AnimalShelf {
    private Queue<int[]> catQueue;
    private Queue<int[]> dogQueue;
    private int timestamp;

    public AnimalShelf() {
        catQueue = new LinkedList<>();
        dogQueue = new LinkedList<>();
        timestamp = 0;
    }

    public void enqueue(int[] animal) {
        int id = animal[0];
        int type = animal[1];
        if (type == 0) {
            catQueue.offer(new int[]{id, timestamp});
        } else {
            dogQueue.offer(new int[]{id, timestamp});
        }
        timestamp++;
    }

    public int[] dequeueAny() {
        if (catQueue.isEmpty() && dogQueue.isEmpty()) return new int[]{-1, -1};
        if (catQueue.isEmpty()) return dequeueDog();
        if (dogQueue.isEmpty()) return dequeueCat();
        int[] catHead = catQueue.peek();
        int[] dogHead = dogQueue.peek();
        if (catHead[1] < dogHead[1]) {
            return dequeueCat();
        } else {
            return dequeueDog();
        }
    }

    public int[] dequeueDog() {
        if (dogQueue.isEmpty()) return new int[]{-1, -1};
        int[] animal = dogQueue.poll();
        return new int[]{animal[0], 1};
    }

    public int[] dequeueCat() {
        if (catQueue.isEmpty()) return new int[]{-1, -1};
        int[] animal = catQueue.poll();
        return new int[]{animal[0], 0};
    }
}
```

```python [Python]
from collections import deque

class AnimalShelf:
    def __init__(self):
        self.cat_queue = deque()
        self.dog_queue = deque()
        self.timestamp = 0

    def enqueue(self, animal: List[int]) -> None:
        animal_id, animal_type = animal
        if animal_type == 0:
            self.cat_queue.append((animal_id, self.timestamp))
        else:
            self.dog_queue.append((animal_id, self.timestamp))
        self.timestamp += 1

    def dequeueAny(self) -> List[int]:
        if not self.cat_queue and not self.dog_queue:
            return [-1, -1]
        if not self.cat_queue:
            return self.dequeueDog()
        if not self.dog_queue:
            return self.dequeueCat()
        cat_id, cat_time = self.cat_queue[0]
        dog_id, dog_time = self.dog_queue[0]
        if cat_time < dog_time:
            return self.dequeueCat()
        else:
            return self.dequeueDog()

    def dequeueDog(self) -> List[int]:
        if not self.dog_queue:
            return [-1, -1]
        animal_id, _ = self.dog_queue.popleft()
        return [animal_id, 1]

    def dequeueCat(self) -> List[int]:
        if not self.cat_queue:
            return [-1, -1]
        animal_id, _ = self.cat_queue.popleft()
        return [animal_id, 0]
```

```go [Go]
type AnimalShelf struct {
    catQueue  [][2]int // [animalId, timestamp]
    dogQueue  [][2]int
    timestamp int
}

func Constructor() AnimalShelf {
    return AnimalShelf{
        catQueue:  [][2]int{},
        dogQueue:  [][2]int{},
        timestamp: 0,
    }
}

func (this *AnimalShelf) Enqueue(animal []int) {
    id, typ := animal[0], animal[1]
    if typ == 0 {
        this.catQueue = append(this.catQueue, [2]int{id, this.timestamp})
    } else {
        this.dogQueue = append(this.dogQueue, [2]int{id, this.timestamp})
    }
    this.timestamp++
}

func (this *AnimalShelf) DequeueAny() []int {
    if len(this.catQueue) == 0 && len(this.dogQueue) == 0 {
        return []int{-1, -1}
    }
    if len(this.catQueue) == 0 {
        return this.DequeueDog()
    }
    if len(this.dogQueue) == 0 {
        return this.DequeueCat()
    }
    catHead := this.catQueue[0]
    dogHead := this.dogQueue[0]
    if catHead[1] < dogHead[1] {
        return this.DequeueCat()
    } else {
        return this.DequeueDog()
    }
}

func (this *AnimalShelf) DequeueDog() []int {
    if len(this.dogQueue) == 0 {
        return []int{-1, -1}
    }
    animal := this.dogQueue[0]
    this.dogQueue = this.dogQueue[1:]
    return []int{animal[0], 1}
}

func (this *AnimalShelf) DequeueCat() []int {
    if len(this.catQueue) == 0 {
        return []int{-1, -1}
    }
    animal := this.catQueue[0]
    this.catQueue = this.catQueue[1:]
    return []int{animal[0], 0}
}
```

```c [C]
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int id;
    int timestamp;
} AnimalNode;

typedef struct {
    AnimalNode* queue;
    int head;
    int tail;
    int capacity;
} AnimalQueue;

typedef struct {
    AnimalQueue catQueue;
    AnimalQueue dogQueue;
    int timestamp;
} AnimalShelf;

AnimalShelf* animalShelfCreate() {
    AnimalShelf* obj = (AnimalShelf*)malloc(sizeof(AnimalShelf));
    obj->catQueue.capacity = 10000;
    obj->catQueue.queue = (AnimalNode*)malloc(obj->catQueue.capacity * sizeof(AnimalNode));
    obj->catQueue.head = 0;
    obj->catQueue.tail = 0;
    obj->dogQueue.capacity = 10000;
    obj->dogQueue.queue = (AnimalNode*)malloc(obj->dogQueue.capacity * sizeof(AnimalNode));
    obj->dogQueue.head = 0;
    obj->dogQueue.tail = 0;
    obj->timestamp = 0;
    return obj;
}

void animalShelfEnqueue(AnimalShelf* obj, int* animal, int animalSize) {
    int id = animal[0], typ = animal[1];
    if (typ == 0) {
        obj->catQueue.queue[obj->catQueue.tail].id = id;
        obj->catQueue.queue[obj->catQueue.tail].timestamp = obj->timestamp;
        obj->catQueue.tail++;
    } else {
        obj->dogQueue.queue[obj->dogQueue.tail].id = id;
        obj->dogQueue.queue[obj->dogQueue.tail].timestamp = obj->timestamp;
        obj->dogQueue.tail++;
    }
    obj->timestamp++;
}

int* animalShelfDequeueAny(AnimalShelf* obj, int* returnSize) {
    *returnSize = 2;
    int* res = (int*)malloc(2 * sizeof(int));
    if (obj->catQueue.head == obj->catQueue.tail && obj->dogQueue.head == obj->dogQueue.tail) {
        res[0] = -1; res[1] = -1;
        return res;
    }
    if (obj->catQueue.head == obj->catQueue.tail) return animalShelfDequeueDog(obj, returnSize);
    if (obj->dogQueue.head == obj->dogQueue.tail) return animalShelfDequeueCat(obj, returnSize);
    AnimalNode catHead = obj->catQueue.queue[obj->catQueue.head];
    AnimalNode dogHead = obj->dogQueue.queue[obj->dogQueue.head];
    if (catHead.timestamp < dogHead.timestamp) {
        return animalShelfDequeueCat(obj, returnSize);
    } else {
        return animalShelfDequeueDog(obj, returnSize);
    }
}

int* animalShelfDequeueDog(AnimalShelf* obj, int* returnSize) {
    *returnSize = 2;
    int* res = (int*)malloc(2 * sizeof(int));
    if (obj->dogQueue.head == obj->dogQueue.tail) {
        res[0] = -1; res[1] = -1;
        return res;
    }
    int id = obj->dogQueue.queue[obj->dogQueue.head].id;
    obj->dogQueue.head++;
    res[0] = id; res[1] = 1;
    return res;
}

int* animalShelfDequeueCat(AnimalShelf* obj, int* returnSize) {
    *returnSize = 2;
    int* res = (int*)malloc(2 * sizeof(int));
    if (obj->catQueue.head == obj->catQueue.tail) {
        res[0] = -1; res[1] = -1;
        return res;
    }
    int id = obj->catQueue.queue[obj->catQueue.head].id;
    obj->catQueue.head++;
    res[0] = id; res[1] = 0;
    return res;
}

void animalShelfFree(AnimalShelf* obj) {
    free(obj->catQueue.queue);
    free(obj->dogQueue.queue);
    free(obj);
}
```

```cpp [C++]
class AnimalShelf {
private:
    queue<pair<int,int>> catQueue; // {animalId, timestamp}
    queue<pair<int,int>> dogQueue;
    int timestamp;
public:
    AnimalShelf() : timestamp(0) {}

    void enqueue(vector<int> animal) {
        if (animal[1] == 0) {
            catQueue.push({animal[0], timestamp});
        } else {
            dogQueue.push({animal[0], timestamp});
        }
        timestamp++;
    }

    vector<int> dequeueAny() {
        if (catQueue.empty() && dogQueue.empty()) return {-1, -1};
        if (catQueue.empty()) return dequeueDog();
        if (dogQueue.empty()) return dequeueCat();
        if (catQueue.front().second < dogQueue.front().second) {
            return dequeueCat();
        } else {
            return dequeueDog();
        }
    }

    vector<int> dequeueDog() {
        if (dogQueue.empty()) return {-1, -1};
        auto animal = dogQueue.front();
        dogQueue.pop();
        return {animal.first, 1};
    }

    vector<int> dequeueCat() {
        if (catQueue.empty()) return {-1, -1};
        auto animal = catQueue.front();
        catQueue.pop();
        return {animal.first, 0};
    }
};
```

```javascript [JavaScript]
var AnimalShelf = function() {
    this.catQueue = [];
    this.dogQueue = [];
    this.timestamp = 0;
};

AnimalShelf.prototype.enqueue = function(animal) {
    const [id, type] = animal;
    if (type === 0) {
        this.catQueue.push([id, this.timestamp]);
    } else {
        this.dogQueue.push([id, this.timestamp]);
    }
    this.timestamp++;
};

AnimalShelf.prototype.dequeueAny = function() {
    if (this.catQueue.length === 0 && this.dogQueue.length === 0) return [-1, -1];
    if (this.catQueue.length === 0) return this.dequeueDog();
    if (this.dogQueue.length === 0) return this.dequeueCat();
    const catHead = this.catQueue[0];
    const dogHead = this.dogQueue[0];
    if (catHead[1] < dogHead[1]) {
        return this.dequeueCat();
    } else {
        return this.dequeueDog();
    }
};

AnimalShelf.prototype.dequeueDog = function() {
    if (this.dogQueue.length === 0) return [-1, -1];
    const animal = this.dogQueue.shift();
    return [animal[0], 1];
};

AnimalShelf.prototype.dequeueCat = function() {
    if (this.catQueue.length === 0) return [-1, -1];
    const animal = this.catQueue.shift();
    return [animal[0], 0];
};
```

```typescript [TypeScript]
class AnimalShelf {
    private catQueue: [number, number][]; // [animalId, timestamp]
    private dogQueue: [number, number][];
    private timestamp: number;

    constructor() {
        this.catQueue = [];
        this.dogQueue = [];
        this.timestamp = 0;
    }

    enqueue(animal: number[]): void {
        const [id, type] = animal;
        if (type === 0) {
            this.catQueue.push([id, this.timestamp]);
        } else {
            this.dogQueue.push([id, this.timestamp]);
        }
        this.timestamp++;
    }

    dequeueAny(): number[] {
        if (this.catQueue.length === 0 && this.dogQueue.length === 0) return [-1, -1];
        if (this.catQueue.length === 0) return this.dequeueDog();
        if (this.dogQueue.length === 0) return this.dequeueCat();
        const [catId, catTime] = this.catQueue[0];
        const [dogId, dogTime] = this.dogQueue[0];
        if (catTime < dogTime) {
            return this.dequeueCat();
        } else {
            return this.dequeueDog();
        }
    }

    dequeueDog(): number[] {
        if (this.dogQueue.length === 0) return [-1, -1];
        const animal = this.dogQueue.shift()!;
        return [animal[0], 1];
    }

    dequeueCat(): number[] {
        if (this.catQueue.length === 0) return [-1, -1];
        const animal = this.catQueue.shift()!;
        return [animal[0], 0];
    }
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：所有操作均为 `O(1)`。
- **空间复杂度**：`O(n)`，其中 `n` 为已入队的动物总数。

---

### 2.2 方法二：单一队列 + 类型筛选（不推荐，但展示不同思路）

**1. 思路**

使用一个队列存储所有动物，每个元素为 `[编号, 类型]`。`dequeueAny` 直接弹出队首；`dequeueDog` 需从队首开始查找第一只狗，并将其之前的所有猫临时移到队尾，然后弹出该狗，再将临时移动的猫放回队首（恢复原顺序）。此方法在 `dequeueDog` 或 `dequeueCat` 时可能导致大量元素移动，效率较低（最坏 O(n)），但展示了另一种实现思路。

**2. 代码实现**

由于该方法性能较差，且方法一已是标准解法，此处仅简要说明，不提供完整代码，以免误导。

**3. 复杂度分析**

- **时间复杂度**：`enqueue` O(1)，`dequeueAny` O(1)，`dequeueDog`/`dequeueCat` 最坏 O(n)。
- **空间复杂度**：O(n)。

---

## 三、总结

| 方法            | 时间复杂度（操作）             | 空间复杂度 | 特点                     |
| --------------- | ------------------------------ | ---------- | ------------------------ |
| 双队列 + 时间戳 | 所有操作 O(1)                  | O(n)       | **推荐**，高效且逻辑清晰 |
| 单队列 + 查找   | `dequeueDog`/`dequeueCat` O(n) | O(n)       | 效率低，不推荐           |

**推荐**：实际生产环境中使用 **方法一（双队列 + 时间戳）**，所有操作均为 O(1)，满足“先进先出”要求，且实现简单。
