# [面试题 03.04. 化栈为队](https://leetcode.cn/problems/implement-queue-using-stacks-lcci/)

## 一、题目描述

实现一个 `MyQueue` 类，该类用两个栈来实现一个队列。

**示例：**

```
MyQueue queue = new MyQueue();
queue.push(1);
queue.push(2);
queue.peek();  // 返回 1
queue.pop();   // 返回 1
queue.empty(); // 返回 false
```

**说明：**

- 你只能使用标准的栈操作 —— 也就是只有 `push to top`，`peek/pop from top`，`size` 和 `is empty` 操作是合法的。
- 你所使用的语言也许不支持栈。你可以使用 `list` 或者 `deque`（双端队列）来模拟一个栈，只要是标准的栈操作即可。
- 假设所有操作都是有效的（例如，一个空的队列不会调用 `pop` 或者 `peek` 操作）。

---

## 二、解答方法

### 2.1 方法一：双栈（入队 O(1)，出队均摊 O(1)）

**1. 思路**

使用两个栈 `stackIn` 和 `stackOut`：

- `push(x)`：直接将元素压入 `stackIn`，时间复杂度 O(1)。
- `pop()`：若 `stackOut` 不为空，则直接从 `stackOut` 弹出栈顶元素；否则将 `stackIn` 中所有元素弹出并依次压入 `stackOut`，然后再从 `stackOut` 弹出栈顶元素。均摊时间复杂度 O(1)。
- `peek()`：与 `pop` 类似，但只返回栈顶元素而不弹出。
- `empty()`：若 `stackIn` 和 `stackOut` 都为空，则队列为空。

此方法是最标准的双栈实现，每个元素最多被转移一次，总体效率高。

**2. 代码实现**

:::::: code-group

```java [Java]
import java.util.Stack;

class MyQueue {
    private Stack<Integer> stackIn;
    private Stack<Integer> stackOut;

    public MyQueue() {
        stackIn = new Stack<>();
        stackOut = new Stack<>();
    }

    public void push(int x) {
        stackIn.push(x);
    }

    public int pop() {
        if (stackOut.isEmpty()) {
            while (!stackIn.isEmpty()) {
                stackOut.push(stackIn.pop());
            }
        }
        return stackOut.pop();
    }

    public int peek() {
        if (stackOut.isEmpty()) {
            while (!stackIn.isEmpty()) {
                stackOut.push(stackIn.pop());
            }
        }
        return stackOut.peek();
    }

    public boolean empty() {
        return stackIn.isEmpty() && stackOut.isEmpty();
    }
}
```

```python [Python]
class MyQueue:
    def __init__(self):
        self.stack_in = []
        self.stack_out = []

    def push(self, x: int) -> None:
        self.stack_in.append(x)

    def pop(self) -> int:
        if not self.stack_out:
            while self.stack_in:
                self.stack_out.append(self.stack_in.pop())
        return self.stack_out.pop()

    def peek(self) -> int:
        if not self.stack_out:
            while self.stack_in:
                self.stack_out.append(self.stack_in.pop())
        return self.stack_out[-1]

    def empty(self) -> bool:
        return not self.stack_in and not self.stack_out
```

```go [Go]
type MyQueue struct {
    stackIn  []int
    stackOut []int
}

func Constructor() MyQueue {
    return MyQueue{
        stackIn:  []int{},
        stackOut: []int{},
    }
}

func (this *MyQueue) Push(x int) {
    this.stackIn = append(this.stackIn, x)
}

func (this *MyQueue) Pop() int {
    if len(this.stackOut) == 0 {
        for len(this.stackIn) > 0 {
            n := len(this.stackIn) - 1
            this.stackOut = append(this.stackOut, this.stackIn[n])
            this.stackIn = this.stackIn[:n]
        }
    }
    n := len(this.stackOut) - 1
    val := this.stackOut[n]
    this.stackOut = this.stackOut[:n]
    return val
}

func (this *MyQueue) Peek() int {
    if len(this.stackOut) == 0 {
        for len(this.stackIn) > 0 {
            n := len(this.stackIn) - 1
            this.stackOut = append(this.stackOut, this.stackIn[n])
            this.stackIn = this.stackIn[:n]
        }
    }
    return this.stackOut[len(this.stackOut)-1]
}

func (this *MyQueue) Empty() bool {
    return len(this.stackIn) == 0 && len(this.stackOut) == 0
}
```

```c [C]
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int* stackIn;
    int* stackOut;
    int topIn;
    int topOut;
    int capacity;
} MyQueue;

MyQueue* myQueueCreate() {
    MyQueue* obj = (MyQueue*)malloc(sizeof(MyQueue));
    obj->capacity = 10000;
    obj->stackIn = (int*)malloc(obj->capacity * sizeof(int));
    obj->stackOut = (int*)malloc(obj->capacity * sizeof(int));
    obj->topIn = -1;
    obj->topOut = -1;
    return obj;
}

void myQueuePush(MyQueue* obj, int x) {
    obj->topIn++;
    obj->stackIn[obj->topIn] = x;
}

int myQueuePop(MyQueue* obj) {
    if (obj->topOut == -1) {
        while (obj->topIn >= 0) {
            obj->topOut++;
            obj->stackOut[obj->topOut] = obj->stackIn[obj->topIn];
            obj->topIn--;
        }
    }
    int val = obj->stackOut[obj->topOut];
    obj->topOut--;
    return val;
}

int myQueuePeek(MyQueue* obj) {
    if (obj->topOut == -1) {
        while (obj->topIn >= 0) {
            obj->topOut++;
            obj->stackOut[obj->topOut] = obj->stackIn[obj->topIn];
            obj->topIn--;
        }
    }
    return obj->stackOut[obj->topOut];
}

bool myQueueEmpty(MyQueue* obj) {
    return obj->topIn == -1 && obj->topOut == -1;
}

void myQueueFree(MyQueue* obj) {
    free(obj->stackIn);
    free(obj->stackOut);
    free(obj);
}
```

```cpp [C++]
class MyQueue {
private:
    stack<int> stackIn;
    stack<int> stackOut;
public:
    MyQueue() {}

    void push(int x) {
        stackIn.push(x);
    }

    int pop() {
        if (stackOut.empty()) {
            while (!stackIn.empty()) {
                stackOut.push(stackIn.top());
                stackIn.pop();
            }
        }
        int val = stackOut.top();
        stackOut.pop();
        return val;
    }

    int peek() {
        if (stackOut.empty()) {
            while (!stackIn.empty()) {
                stackOut.push(stackIn.top());
                stackIn.pop();
            }
        }
        return stackOut.top();
    }

    bool empty() {
        return stackIn.empty() && stackOut.empty();
    }
};
```

```javascript [JavaScript]
var MyQueue = function() {
    this.stackIn = [];
    this.stackOut = [];
};

MyQueue.prototype.push = function(x) {
    this.stackIn.push(x);
};

MyQueue.prototype.pop = function() {
    if (this.stackOut.length === 0) {
        while (this.stackIn.length) {
            this.stackOut.push(this.stackIn.pop());
        }
    }
    return this.stackOut.pop();
};

MyQueue.prototype.peek = function() {
    if (this.stackOut.length === 0) {
        while (this.stackIn.length) {
            this.stackOut.push(this.stackIn.pop());
        }
    }
    return this.stackOut[this.stackOut.length - 1];
};

MyQueue.prototype.empty = function() {
    return this.stackIn.length === 0 && this.stackOut.length === 0;
};
```

```typescript [TypeScript]
class MyQueue {
    private stackIn: number[];
    private stackOut: number[];

    constructor() {
        this.stackIn = [];
        this.stackOut = [];
    }

    push(x: number): void {
        this.stackIn.push(x);
    }

    pop(): number {
        if (this.stackOut.length === 0) {
            while (this.stackIn.length) {
                this.stackOut.push(this.stackIn.pop()!);
            }
        }
        return this.stackOut.pop()!;
    }

    peek(): number {
        if (this.stackOut.length === 0) {
            while (this.stackIn.length) {
                this.stackOut.push(this.stackIn.pop()!);
            }
        }
        return this.stackOut[this.stackOut.length - 1];
    }

    empty(): boolean {
        return this.stackIn.length === 0 && this.stackOut.length === 0;
    }
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`push` 为 O(1)，`pop` 和 `peek` 均摊 O(1)（每个元素最多被转移一次），`empty` 为 O(1)。
- **空间复杂度**：O(n)，用于存储所有元素。

---

### 2.2 方法二：双栈（入队 O(n)，出队 O(1)）

**1. 思路**

使用两个栈 `stack1` 和 `stack2`，其中 `stack1` 始终存储当前队列的所有元素，且栈顶为队首元素。

- `push(x)`：先将 `stack1` 中所有元素弹出并压入 `stack2`，然后将 `x` 压入 `stack1`，再将 `stack2` 中所有元素弹出并压回 `stack1`。这样 `stack1` 的栈顶始终为队首，时间复杂度 O(n)。
- `pop()`：直接从 `stack1` 弹出栈顶元素，O(1)。
- `peek()`：返回 `stack1` 栈顶元素，O(1)。
- `empty()`：检查 `stack1` 是否为空。

此方法虽然 `push` 操作耗时较高，但实现思路简单，适用于入队较少、出队较多的场景。

**2. 代码实现**

（以下代码在逻辑上与方法一不同，但所有语言均提供完整实现。）

:::::: code-group

```java [Java]
class MyQueue {
    private Stack<Integer> stack1;
    private Stack<Integer> stack2;

    public MyQueue() {
        stack1 = new Stack<>();
        stack2 = new Stack<>();
    }

    public void push(int x) {
        while (!stack1.isEmpty()) {
            stack2.push(stack1.pop());
        }
        stack1.push(x);
        while (!stack2.isEmpty()) {
            stack1.push(stack2.pop());
        }
    }

    public int pop() {
        return stack1.pop();
    }

    public int peek() {
        return stack1.peek();
    }

    public boolean empty() {
        return stack1.isEmpty();
    }
}
```

```python [Python]
class MyQueue:
    def __init__(self):
        self.stack1 = []
        self.stack2 = []

    def push(self, x: int) -> None:
        while self.stack1:
            self.stack2.append(self.stack1.pop())
        self.stack1.append(x)
        while self.stack2:
            self.stack1.append(self.stack2.pop())

    def pop(self) -> int:
        return self.stack1.pop()

    def peek(self) -> int:
        return self.stack1[-1]

    def empty(self) -> bool:
        return not self.stack1
```

```go [Go]
type MyQueue struct {
    stack1 []int
    stack2 []int
}

func Constructor() MyQueue {
    return MyQueue{
        stack1: []int{},
        stack2: []int{},
    }
}

func (this *MyQueue) Push(x int) {
    for len(this.stack1) > 0 {
        n := len(this.stack1) - 1
        this.stack2 = append(this.stack2, this.stack1[n])
        this.stack1 = this.stack1[:n]
    }
    this.stack1 = append(this.stack1, x)
    for len(this.stack2) > 0 {
        n := len(this.stack2) - 1
        this.stack1 = append(this.stack1, this.stack2[n])
        this.stack2 = this.stack2[:n]
    }
}

func (this *MyQueue) Pop() int {
    n := len(this.stack1) - 1
    val := this.stack1[n]
    this.stack1 = this.stack1[:n]
    return val
}

func (this *MyQueue) Peek() int {
    return this.stack1[len(this.stack1)-1]
}

func (this *MyQueue) Empty() bool {
    return len(this.stack1) == 0
}
```

```c [C]
typedef struct {
    int* stack1;
    int* stack2;
    int top1;
    int top2;
    int capacity;
} MyQueue;

MyQueue* myQueueCreate() {
    MyQueue* obj = (MyQueue*)malloc(sizeof(MyQueue));
    obj->capacity = 10000;
    obj->stack1 = (int*)malloc(obj->capacity * sizeof(int));
    obj->stack2 = (int*)malloc(obj->capacity * sizeof(int));
    obj->top1 = -1;
    obj->top2 = -1;
    return obj;
}

void myQueuePush(MyQueue* obj, int x) {
    while (obj->top1 >= 0) {
        obj->top2++;
        obj->stack2[obj->top2] = obj->stack1[obj->top1];
        obj->top1--;
    }
    obj->top1++;
    obj->stack1[obj->top1] = x;
    while (obj->top2 >= 0) {
        obj->top1++;
        obj->stack1[obj->top1] = obj->stack2[obj->top2];
        obj->top2--;
    }
}

int myQueuePop(MyQueue* obj) {
    int val = obj->stack1[obj->top1];
    obj->top1--;
    return val;
}

int myQueuePeek(MyQueue* obj) {
    return obj->stack1[obj->top1];
}

bool myQueueEmpty(MyQueue* obj) {
    return obj->top1 == -1;
}

void myQueueFree(MyQueue* obj) {
    free(obj->stack1);
    free(obj->stack2);
    free(obj);
}
```

```cpp [C++]
class MyQueue {
private:
    stack<int> stack1, stack2;
public:
    MyQueue() {}

    void push(int x) {
        while (!stack1.empty()) {
            stack2.push(stack1.top());
            stack1.pop();
        }
        stack1.push(x);
        while (!stack2.empty()) {
            stack1.push(stack2.top());
            stack2.pop();
        }
    }

    int pop() {
        int val = stack1.top();
        stack1.pop();
        return val;
    }

    int peek() {
        return stack1.top();
    }

    bool empty() {
        return stack1.empty();
    }
};
```

```javascript [JavaScript]
var MyQueue = function() {
    this.stack1 = [];
    this.stack2 = [];
};

MyQueue.prototype.push = function(x) {
    while (this.stack1.length) {
        this.stack2.push(this.stack1.pop());
    }
    this.stack1.push(x);
    while (this.stack2.length) {
        this.stack1.push(this.stack2.pop());
    }
};

MyQueue.prototype.pop = function() {
    return this.stack1.pop();
};

MyQueue.prototype.peek = function() {
    return this.stack1[this.stack1.length - 1];
};

MyQueue.prototype.empty = function() {
    return this.stack1.length === 0;
};
```

```typescript [TypeScript]
class MyQueue {
    private stack1: number[];
    private stack2: number[];

    constructor() {
        this.stack1 = [];
        this.stack2 = [];
    }

    push(x: number): void {
        while (this.stack1.length) {
            this.stack2.push(this.stack1.pop()!);
        }
        this.stack1.push(x);
        while (this.stack2.length) {
            this.stack1.push(this.stack2.pop()!);
        }
    }

    pop(): number {
        return this.stack1.pop()!;
    }

    peek(): number {
        return this.stack1[this.stack1.length - 1];
    }

    empty(): boolean {
        return this.stack1.length === 0;
    }
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`push` 为 O(n)，`pop` 和 `peek` 为 O(1)，`empty` 为 O(1)。
- **空间复杂度**：O(n)，存储所有元素。

---

## 三、总结

| 方法                 | `push` 时间复杂度 | `pop` / `peek` 时间复杂度 | 空间复杂度 | 特点                         |
| -------------------- | ----------------- | ------------------------- | ---------- | ---------------------------- |
| 方法一（标准双栈）   | O(1)              | 均摊 O(1)                 | O(n)       | **推荐**，整体效率高         |
| 方法二（入队时调整） | O(n)              | O(1)                      | O(n)       | 入队慢，出队快，适用特殊场景 |

**推荐**：在日常生产环境中，**方法一（标准双栈）** 是最优选择，其均摊时间复杂度为 O(1)，适用于绝大多数场景。方法二虽然简单，但在频繁入队时性能较差，一般不推荐。两种方法均能正确实现队列功能，可根据实际业务场景选择。
