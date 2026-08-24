# [面试题 03.01. 三合一](https://leetcode.cn/problems/three-in-one-lcci/)

## 一、题目描述

三合一。描述如何只用一个数组来实现三个栈。

你应该实现 `push(stackNum, value)`、`pop(stackNum)`、`peek(stackNum)` 和 `isEmpty(stackNum)` 方法。`stackNum` 是栈的编号（0、1 或 2），`value` 是入栈的值。

构造函数的参数 `stackSize` 表示每个栈的容量（即每个栈最多能存放 `stackSize` 个元素）。你应当尽量使用数组，并在数组未满时允许入栈。

**示例：**

```
输入：
["TripleInOne", "push", "push", "pop", "pop", "pop", "isEmpty"]
[[1], [0, 1], [0, 2], [0], [0], [0], [0]]
输出：
[null, null, null, 1, 2, -1, true]
解释：当栈为空时，pop 和 peek 返回 -1。
```

**提示：**

- `0 <= stackSize <= 100000`
- `0 <= stackNum <= 2`
- `push`、`pop`、`peek` 和 `isEmpty` 的调用次数总和不超过 `100000`
- 所有操作均在单个数组上实现

---

## 二、解答方法

### 2.1 方法一：固定分割法（标准实现）

**1. 思路**

使用一个长度为 `3 * stackSize` 的整型数组 `arr`，将数组划分为三个等长的区域，每个区域对应一个栈：

- 栈 0：索引范围 `[0, stackSize-1]`
- 栈 1：索引范围 `[stackSize, 2*stackSize-1]`
- 栈 2：索引范围 `[2*stackSize, 3*stackSize-1]`

对于每个栈，维护一个独立的栈顶指针 `top[i]`，初始值为该栈的起始索引减去 1（即 `i * stackSize - 1`）。`push` 时，先检查当前栈是否已满（`top[i] >= (i+1)*stackSize - 1`），若未满则 `top[i]++` 并赋值；`pop` 和 `peek` 时，检查是否为空，若不为空则返回对应位置的值。

此方法简单高效，满足 `O(1)` 时间复杂度和 `O(1)` 空间复杂度（除数组外）。

**2. 代码实现**

:::::: code-group

```java [Java]
class TripleInOne {
    private int[] arr;
    private int[] top;
    private int stackSize;

    public TripleInOne(int stackSize) {
        this.stackSize = stackSize;
        arr = new int[3 * stackSize];
        top = new int[3];
        for (int i = 0; i < 3; i++) {
            top[i] = i * stackSize - 1;
        }
    }

    public void push(int stackNum, int value) {
        if (top[stackNum] < (stackNum + 1) * stackSize - 1) {
            arr[++top[stackNum]] = value;
        }
    }

    public int pop(int stackNum) {
        if (isEmpty(stackNum)) return -1;
        return arr[top[stackNum]--];
    }

    public int peek(int stackNum) {
        if (isEmpty(stackNum)) return -1;
        return arr[top[stackNum]];
    }

    public boolean isEmpty(int stackNum) {
        return top[stackNum] == stackNum * stackSize - 1;
    }
}
```

```python [Python]
class TripleInOne:
    def __init__(self, stackSize: int):
        self.stackSize = stackSize
        self.arr = [0] * (3 * stackSize)
        self.top = [i * stackSize - 1 for i in range(3)]

    def push(self, stackNum: int, value: int) -> None:
        if self.top[stackNum] < (stackNum + 1) * self.stackSize - 1:
            self.top[stackNum] += 1
            self.arr[self.top[stackNum]] = value

    def pop(self, stackNum: int) -> int:
        if self.isEmpty(stackNum):
            return -1
        val = self.arr[self.top[stackNum]]
        self.top[stackNum] -= 1
        return val

    def peek(self, stackNum: int) -> int:
        if self.isEmpty(stackNum):
            return -1
        return self.arr[self.top[stackNum]]

    def isEmpty(self, stackNum: int) -> bool:
        return self.top[stackNum] == stackNum * self.stackSize - 1
```

```go [Go]
type TripleInOne struct {
    arr      []int
    top      [3]int
    stackSize int
}

func Constructor(stackSize int) TripleInOne {
    t := TripleInOne{
        arr:      make([]int, 3*stackSize),
        stackSize: stackSize,
    }
    for i := 0; i < 3; i++ {
        t.top[i] = i*stackSize - 1
    }
    return t
}

func (this *TripleInOne) Push(stackNum int, value int) {
    if this.top[stackNum] < (stackNum+1)*this.stackSize-1 {
        this.top[stackNum]++
        this.arr[this.top[stackNum]] = value
    }
}

func (this *TripleInOne) Pop(stackNum int) int {
    if this.IsEmpty(stackNum) {
        return -1
    }
    val := this.arr[this.top[stackNum]]
    this.top[stackNum]--
    return val
}

func (this *TripleInOne) Peek(stackNum int) int {
    if this.IsEmpty(stackNum) {
        return -1
    }
    return this.arr[this.top[stackNum]]
}

func (this *TripleInOne) IsEmpty(stackNum int) bool {
    return this.top[stackNum] == stackNum*this.stackSize-1
}
```

```c [C]
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int* arr;
    int top[3];
    int stackSize;
} TripleInOne;

TripleInOne* tripleInOneCreate(int stackSize) {
    TripleInOne* obj = (TripleInOne*)malloc(sizeof(TripleInOne));
    obj->stackSize = stackSize;
    obj->arr = (int*)malloc(3 * stackSize * sizeof(int));
    for (int i = 0; i < 3; i++) {
        obj->top[i] = i * stackSize - 1;
    }
    return obj;
}

void tripleInOnePush(TripleInOne* obj, int stackNum, int value) {
    if (obj->top[stackNum] < (stackNum+1)*obj->stackSize - 1) {
        obj->top[stackNum]++;
        obj->arr[obj->top[stackNum]] = value;
    }
}

int tripleInOnePop(TripleInOne* obj, int stackNum) {
    if (tripleInOneIsEmpty(obj, stackNum)) return -1;
    int val = obj->arr[obj->top[stackNum]];
    obj->top[stackNum]--;
    return val;
}

int tripleInOnePeek(TripleInOne* obj, int stackNum) {
    if (tripleInOneIsEmpty(obj, stackNum)) return -1;
    return obj->arr[obj->top[stackNum]];
}

bool tripleInOneIsEmpty(TripleInOne* obj, int stackNum) {
    return obj->top[stackNum] == stackNum * obj->stackSize - 1;
}

void tripleInOneFree(TripleInOne* obj) {
    free(obj->arr);
    free(obj);
}
```

```cpp [C++]
class TripleInOne {
private:
    vector<int> arr;
    vector<int> top;
    int stackSize;
public:
    TripleInOne(int stackSize) : stackSize(stackSize) {
        arr.resize(3 * stackSize);
        top.resize(3);
        for (int i = 0; i < 3; i++) {
            top[i] = i * stackSize - 1;
        }
    }

    void push(int stackNum, int value) {
        if (top[stackNum] < (stackNum + 1) * stackSize - 1) {
            arr[++top[stackNum]] = value;
        }
    }

    int pop(int stackNum) {
        if (isEmpty(stackNum)) return -1;
        return arr[top[stackNum]--];
    }

    int peek(int stackNum) {
        if (isEmpty(stackNum)) return -1;
        return arr[top[stackNum]];
    }

    bool isEmpty(int stackNum) {
        return top[stackNum] == stackNum * stackSize - 1;
    }
};
```

```javascript [JavaScript]
var TripleInOne = function(stackSize) {
    this.stackSize = stackSize;
    this.arr = new Array(3 * stackSize);
    this.top = [];
    for (let i = 0; i < 3; i++) {
        this.top[i] = i * stackSize - 1;
    }
};

TripleInOne.prototype.push = function(stackNum, value) {
    if (this.top[stackNum] < (stackNum + 1) * this.stackSize - 1) {
        this.top[stackNum]++;
        this.arr[this.top[stackNum]] = value;
    }
};

TripleInOne.prototype.pop = function(stackNum) {
    if (this.isEmpty(stackNum)) return -1;
    const val = this.arr[this.top[stackNum]];
    this.top[stackNum]--;
    return val;
};

TripleInOne.prototype.peek = function(stackNum) {
    if (this.isEmpty(stackNum)) return -1;
    return this.arr[this.top[stackNum]];
};

TripleInOne.prototype.isEmpty = function(stackNum) {
    return this.top[stackNum] === stackNum * this.stackSize - 1;
};
```

```typescript [TypeScript]
class TripleInOne {
    private arr: number[];
    private top: number[];
    private stackSize: number;

    constructor(stackSize: number) {
        this.stackSize = stackSize;
        this.arr = new Array(3 * stackSize);
        this.top = [];
        for (let i = 0; i < 3; i++) {
            this.top[i] = i * stackSize - 1;
        }
    }

    push(stackNum: number, value: number): void {
        if (this.top[stackNum] < (stackNum + 1) * this.stackSize - 1) {
            this.top[stackNum]++;
            this.arr[this.top[stackNum]] = value;
        }
    }

    pop(stackNum: number): number {
        if (this.isEmpty(stackNum)) return -1;
        const val = this.arr[this.top[stackNum]];
        this.top[stackNum]--;
        return val;
    }

    peek(stackNum: number): number {
        if (this.isEmpty(stackNum)) return -1;
        return this.arr[this.top[stackNum]];
    }

    isEmpty(stackNum: number): boolean {
        return this.top[stackNum] === stackNum * this.stackSize - 1;
    }
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：所有操作（`push`、`pop`、`peek`、`isEmpty`）均为 `O(1)`。
- **空间复杂度**：`O(stackSize)`，用于存储数组和栈顶指针（固定为3个）。

---

### 2.2 方法二：边界显式版本（使用起始和结束索引）

**1. 思路**

与方法一核心逻辑完全相同，但使用 `start` 和 `end` 数组分别存储每个栈的起始和结束位置，使得边界检查更直观：

- 栈 0：`start[0] = 0`，`end[0] = stackSize - 1`
- 栈 1：`start[1] = stackSize`，`end[1] = 2*stackSize - 1`
- 栈 2：`start[2] = 2*stackSize`，`end[2] = 3*stackSize - 1`

栈顶指针 `top[i]` 初始为 `start[i] - 1`。`push` 时检查 `top[i] < end[i]`；`isEmpty` 时检查 `top[i] < start[i]`。此方法与方法一本质相同，但代码可读性略有提升。

**2. 代码实现**

:::::: code-group

```java [Java]
class TripleInOne {
    private int[] arr;
    private int[] top;
    private int[] start;
    private int[] end;

    public TripleInOne(int stackSize) {
        arr = new int[3 * stackSize];
        top = new int[3];
        start = new int[3];
        end = new int[3];
        for (int i = 0; i < 3; i++) {
            start[i] = i * stackSize;
            end[i] = (i + 1) * stackSize - 1;
            top[i] = start[i] - 1;
        }
    }

    public void push(int stackNum, int value) {
        if (top[stackNum] < end[stackNum]) {
            arr[++top[stackNum]] = value;
        }
    }

    public int pop(int stackNum) {
        if (isEmpty(stackNum)) return -1;
        return arr[top[stackNum]--];
    }

    public int peek(int stackNum) {
        if (isEmpty(stackNum)) return -1;
        return arr[top[stackNum]];
    }

    public boolean isEmpty(int stackNum) {
        return top[stackNum] < start[stackNum];
    }
}
```

```python [Python]
class TripleInOne:
    def __init__(self, stackSize: int):
        self.stackSize = stackSize
        self.arr = [0] * (3 * stackSize)
        self.start = [i * stackSize for i in range(3)]
        self.end = [(i + 1) * stackSize - 1 for i in range(3)]
        self.top = [self.start[i] - 1 for i in range(3)]

    def push(self, stackNum: int, value: int) -> None:
        if self.top[stackNum] < self.end[stackNum]:
            self.top[stackNum] += 1
            self.arr[self.top[stackNum]] = value

    def pop(self, stackNum: int) -> int:
        if self.isEmpty(stackNum):
            return -1
        val = self.arr[self.top[stackNum]]
        self.top[stackNum] -= 1
        return val

    def peek(self, stackNum: int) -> int:
        if self.isEmpty(stackNum):
            return -1
        return self.arr[self.top[stackNum]]

    def isEmpty(self, stackNum: int) -> bool:
        return self.top[stackNum] < self.start[stackNum]
```

```go [Go]
type TripleInOne struct {
    arr   []int
    top   [3]int
    start [3]int
    end   [3]int
}

func Constructor(stackSize int) TripleInOne {
    t := TripleInOne{
        arr: make([]int, 3*stackSize),
    }
    for i := 0; i < 3; i++ {
        t.start[i] = i * stackSize
        t.end[i] = (i+1)*stackSize - 1
        t.top[i] = t.start[i] - 1
    }
    return t
}

func (this *TripleInOne) Push(stackNum int, value int) {
    if this.top[stackNum] < this.end[stackNum] {
        this.top[stackNum]++
        this.arr[this.top[stackNum]] = value
    }
}

func (this *TripleInOne) Pop(stackNum int) int {
    if this.IsEmpty(stackNum) {
        return -1
    }
    val := this.arr[this.top[stackNum]]
    this.top[stackNum]--
    return val
}

func (this *TripleInOne) Peek(stackNum int) int {
    if this.IsEmpty(stackNum) {
        return -1
    }
    return this.arr[this.top[stackNum]]
}

func (this *TripleInOne) IsEmpty(stackNum int) bool {
    return this.top[stackNum] < this.start[stackNum]
}
```

```c [C]
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int* arr;
    int top[3];
    int start[3];
    int end[3];
} TripleInOne;

TripleInOne* tripleInOneCreate(int stackSize) {
    TripleInOne* obj = (TripleInOne*)malloc(sizeof(TripleInOne));
    obj->arr = (int*)malloc(3 * stackSize * sizeof(int));
    for (int i = 0; i < 3; i++) {
        obj->start[i] = i * stackSize;
        obj->end[i] = (i+1)*stackSize - 1;
        obj->top[i] = obj->start[i] - 1;
    }
    return obj;
}

void tripleInOnePush(TripleInOne* obj, int stackNum, int value) {
    if (obj->top[stackNum] < obj->end[stackNum]) {
        obj->top[stackNum]++;
        obj->arr[obj->top[stackNum]] = value;
    }
}

int tripleInOnePop(TripleInOne* obj, int stackNum) {
    if (tripleInOneIsEmpty(obj, stackNum)) return -1;
    int val = obj->arr[obj->top[stackNum]];
    obj->top[stackNum]--;
    return val;
}

int tripleInOnePeek(TripleInOne* obj, int stackNum) {
    if (tripleInOneIsEmpty(obj, stackNum)) return -1;
    return obj->arr[obj->top[stackNum]];
}

bool tripleInOneIsEmpty(TripleInOne* obj, int stackNum) {
    return obj->top[stackNum] < obj->start[stackNum];
}

void tripleInOneFree(TripleInOne* obj) {
    free(obj->arr);
    free(obj);
}
```

```cpp [C++]
class TripleInOne {
private:
    vector<int> arr;
    vector<int> top;
    vector<int> start;
    vector<int> end;
public:
    TripleInOne(int stackSize) {
        arr.resize(3 * stackSize);
        top.resize(3);
        start.resize(3);
        end.resize(3);
        for (int i = 0; i < 3; i++) {
            start[i] = i * stackSize;
            end[i] = (i+1)*stackSize - 1;
            top[i] = start[i] - 1;
        }
    }

    void push(int stackNum, int value) {
        if (top[stackNum] < end[stackNum]) {
            arr[++top[stackNum]] = value;
        }
    }

    int pop(int stackNum) {
        if (isEmpty(stackNum)) return -1;
        return arr[top[stackNum]--];
    }

    int peek(int stackNum) {
        if (isEmpty(stackNum)) return -1;
        return arr[top[stackNum]];
    }

    bool isEmpty(int stackNum) {
        return top[stackNum] < start[stackNum];
    }
};
```

```javascript [JavaScript]
var TripleInOne = function(stackSize) {
    this.arr = new Array(3 * stackSize);
    this.start = [0, stackSize, 2 * stackSize];
    this.end = [stackSize - 1, 2 * stackSize - 1, 3 * stackSize - 1];
    this.top = [this.start[0] - 1, this.start[1] - 1, this.start[2] - 1];
};

TripleInOne.prototype.push = function(stackNum, value) {
    if (this.top[stackNum] < this.end[stackNum]) {
        this.top[stackNum]++;
        this.arr[this.top[stackNum]] = value;
    }
};

TripleInOne.prototype.pop = function(stackNum) {
    if (this.isEmpty(stackNum)) return -1;
    const val = this.arr[this.top[stackNum]];
    this.top[stackNum]--;
    return val;
};

TripleInOne.prototype.peek = function(stackNum) {
    if (this.isEmpty(stackNum)) return -1;
    return this.arr[this.top[stackNum]];
};

TripleInOne.prototype.isEmpty = function(stackNum) {
    return this.top[stackNum] < this.start[stackNum];
};
```

```typescript [TypeScript]
class TripleInOne {
    private arr: number[];
    private top: number[];
    private start: number[];
    private end: number[];

    constructor(stackSize: number) {
        this.arr = new Array(3 * stackSize);
        this.start = [0, stackSize, 2 * stackSize];
        this.end = [stackSize - 1, 2 * stackSize - 1, 3 * stackSize - 1];
        this.top = [this.start[0] - 1, this.start[1] - 1, this.start[2] - 1];
    }

    push(stackNum: number, value: number): void {
        if (this.top[stackNum] < this.end[stackNum]) {
            this.top[stackNum]++;
            this.arr[this.top[stackNum]] = value;
        }
    }

    pop(stackNum: number): number {
        if (this.isEmpty(stackNum)) return -1;
        const val = this.arr[this.top[stackNum]];
        this.top[stackNum]--;
        return val;
    }

    peek(stackNum: number): number {
        if (this.isEmpty(stackNum)) return -1;
        return this.arr[this.top[stackNum]];
    }

    isEmpty(stackNum: number): boolean {
        return this.top[stackNum] < this.start[stackNum];
    }
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：所有操作为 `O(1)`。
- **空间复杂度**：`O(stackSize)`。

---

## 三、总结

| 方法       | 时间复杂度 | 空间复杂度     | 特点                 |
| ---------- | ---------- | -------------- | -------------------- |
| 固定分割法 | `O(1)`     | `O(stackSize)` | 简洁高效，标准实现   |
| 边界显式版 | `O(1)`     | `O(stackSize)` | 可读性更高，本质相同 |

**推荐**：两种方法均可安全用于生产环境，选择哪种取决于编码偏好。方法一更紧凑，方法二更易读。务必注意 `stackSize` 为 0 时的边界情况（此时数组长度为 0，所有栈均为空，所有 `push` 操作均无效，`pop` 和 `peek` 返回 -1）。以上代码已正确处理。
