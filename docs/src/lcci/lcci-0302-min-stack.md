# [面试题 03.02. 栈的最小值](https://leetcode.cn/problems/min-stack-lcci/)

## 一、题目描述

设计一个支持 `push`，`pop`，`top` 操作，并能在常数时间内检索到最小元素的栈。

- `push(x)` —— 将元素 `x` 推入栈中。
- `pop()` —— 删除栈顶的元素。
- `top()` —— 获取栈顶元素。
- `getMin()` —— 检索栈中的最小元素。

**示例：**

```
输入：
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   // 返回 -3
minStack.pop();
minStack.top();      // 返回 0
minStack.getMin();   // 返回 -2
```

**提示：**

- `pop`、`top` 和 `getMin` 操作总是在 **非空** 栈上调用。
- 每个操作的时间复杂度必须为 `O(1)`。

---

## 二、解答方法

### 2.1 方法一：辅助栈（双栈同步）

**1. 思路**

使用两个栈：主栈 `dataStack` 存储所有元素，辅助栈 `minStack` 存储当前最小值。  
- `push(x)`：主栈正常入栈，若辅助栈为空或 `x <= minStack.peek()`，则将 `x` 入辅助栈。这样辅助栈的栈顶始终是当前最小值。  
- `pop()`：主栈弹出栈顶元素，若该元素等于辅助栈栈顶，则辅助栈也弹出。  
- `top()`：返回主栈栈顶。  
- `getMin()`：返回辅助栈栈顶。  

所有操作均为 `O(1)`。

**2. 代码实现**

:::::: code-group

```java [Java]
class MinStack {
    private Stack<Integer> dataStack;
    private Stack<Integer> minStack;

    public MinStack() {
        dataStack = new Stack<>();
        minStack = new Stack<>();
    }

    public void push(int x) {
        dataStack.push(x);
        if (minStack.isEmpty() || x <= minStack.peek()) {
            minStack.push(x);
        }
    }

    public void pop() {
        int val = dataStack.pop();
        if (val == minStack.peek()) {
            minStack.pop();
        }
    }

    public int top() {
        return dataStack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}
```

```python [Python]
class MinStack:
    def __init__(self):
        self.data_stack = []
        self.min_stack = []

    def push(self, x: int) -> None:
        self.data_stack.append(x)
        if not self.min_stack or x <= self.min_stack[-1]:
            self.min_stack.append(x)

    def pop(self) -> None:
        val = self.data_stack.pop()
        if val == self.min_stack[-1]:
            self.min_stack.pop()

    def top(self) -> int:
        return self.data_stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]
```

```go [Go]
type MinStack struct {
    dataStack []int
    minStack  []int
}

func Constructor() MinStack {
    return MinStack{
        dataStack: []int{},
        minStack:  []int{},
    }
}

func (this *MinStack) Push(x int) {
    this.dataStack = append(this.dataStack, x)
    if len(this.minStack) == 0 || x <= this.minStack[len(this.minStack)-1] {
        this.minStack = append(this.minStack, x)
    }
}

func (this *MinStack) Pop() {
    val := this.dataStack[len(this.dataStack)-1]
    this.dataStack = this.dataStack[:len(this.dataStack)-1]
    if val == this.minStack[len(this.minStack)-1] {
        this.minStack = this.minStack[:len(this.minStack)-1]
    }
}

func (this *MinStack) Top() int {
    return this.dataStack[len(this.dataStack)-1]
}

func (this *MinStack) GetMin() int {
    return this.minStack[len(this.minStack)-1]
}
```

```c [C]
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int* data;
    int* min;
    int top;
    int minTop;
    int capacity;
} MinStack;

MinStack* minStackCreate() {
    MinStack* obj = (MinStack*)malloc(sizeof(MinStack));
    obj->capacity = 10000;
    obj->data = (int*)malloc(obj->capacity * sizeof(int));
    obj->min = (int*)malloc(obj->capacity * sizeof(int));
    obj->top = -1;
    obj->minTop = -1;
    return obj;
}

void minStackPush(MinStack* obj, int x) {
    obj->top++;
    obj->data[obj->top] = x;
    if (obj->minTop == -1 || x <= obj->min[obj->minTop]) {
        obj->minTop++;
        obj->min[obj->minTop] = x;
    }
}

void minStackPop(MinStack* obj) {
    int val = obj->data[obj->top];
    obj->top--;
    if (val == obj->min[obj->minTop]) {
        obj->minTop--;
    }
}

int minStackTop(MinStack* obj) {
    return obj->data[obj->top];
}

int minStackGetMin(MinStack* obj) {
    return obj->min[obj->minTop];
}

void minStackFree(MinStack* obj) {
    free(obj->data);
    free(obj->min);
    free(obj);
}
```

```cpp [C++]
class MinStack {
private:
    stack<int> dataStack;
    stack<int> minStack;
public:
    MinStack() {}

    void push(int x) {
        dataStack.push(x);
        if (minStack.empty() || x <= minStack.top()) {
            minStack.push(x);
        }
    }

    void pop() {
        int val = dataStack.top();
        dataStack.pop();
        if (val == minStack.top()) {
            minStack.pop();
        }
    }

    int top() {
        return dataStack.top();
    }

    int getMin() {
        return minStack.top();
    }
};
```

```javascript [JavaScript]
var MinStack = function() {
    this.dataStack = [];
    this.minStack = [];
};

MinStack.prototype.push = function(x) {
    this.dataStack.push(x);
    if (this.minStack.length === 0 || x <= this.minStack[this.minStack.length - 1]) {
        this.minStack.push(x);
    }
};

MinStack.prototype.pop = function() {
    const val = this.dataStack.pop();
    if (val === this.minStack[this.minStack.length - 1]) {
        this.minStack.pop();
    }
};

MinStack.prototype.top = function() {
    return this.dataStack[this.dataStack.length - 1];
};

MinStack.prototype.getMin = function() {
    return this.minStack[this.minStack.length - 1];
};
```

```typescript [TypeScript]
class MinStack {
    private dataStack: number[];
    private minStack: number[];

    constructor() {
        this.dataStack = [];
        this.minStack = [];
    }

    push(x: number): void {
        this.dataStack.push(x);
        if (this.minStack.length === 0 || x <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(x);
        }
    }

    pop(): void {
        const val = this.dataStack.pop()!;
        if (val === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
    }

    top(): number {
        return this.dataStack[this.dataStack.length - 1];
    }

    getMin(): number {
        return this.minStack[this.minStack.length - 1];
    }
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：所有操作均为 `O(1)`。
- **空间复杂度**：`O(n)`，其中 `n` 为入栈元素个数，辅助栈最多存储 `n` 个元素。

---

### 2.2 方法二：差值法（单栈存储差值）

**1. 思路**

只使用一个栈，存储当前元素与当前最小值的差值（`diff = x - min`）。同时使用一个变量 `min` 记录当前最小值。

- `push(x)`：若栈为空，则 `min = x`，压入 `0`；否则计算 `diff = x - min`，压入 `diff`，若 `diff < 0` 则更新 `min = x`（因为出现了更小的值）。
- `pop()`：弹出栈顶 `diff`，若 `diff < 0`，则说明当前栈顶元素就是最小值，需要恢复上一个最小值（即 `min - diff`，因为 diff 为负，`min - diff = min + |diff|` 等于旧最小值），并将 `min` 更新为旧最小值；否则，栈顶元素为 `min + diff`（无需更新 `min`）。
- `top()`：若栈顶 `diff < 0`，则返回 `min`；否则返回 `min + diff`。
- `getMin()`：返回 `min`。

此方法节省空间（仅一个栈），但需注意 `diff` 可能溢出（尤其在 `int` 范围），但题目保证值在 `int` 范围内且差值不溢出（可使用 `long long` 保证安全）。

**2. 代码实现**

:::::: code-group

```java [Java]
class MinStack {
    private Stack<Long> stack;
    private long min;

    public MinStack() {
        stack = new Stack<>();
    }

    public void push(int x) {
        if (stack.isEmpty()) {
            stack.push(0L);
            min = x;
        } else {
            long diff = (long)x - min;
            stack.push(diff);
            if (diff < 0) {
                min = x;
            }
        }
    }

    public void pop() {
        long diff = stack.pop();
        if (diff < 0) {
            // 当前栈顶是最小值，恢复之前的最小值
            min = min - diff; // 因为 diff 为负，min - diff = min + |diff|
        }
        // 否则 min 不变
    }

    public int top() {
        long diff = stack.peek();
        if (diff < 0) {
            return (int)min;
        } else {
            return (int)(min + diff);
        }
    }

    public int getMin() {
        return (int)min;
    }
}
```

```python [Python]
class MinStack:
    def __init__(self):
        self.stack = []
        self.min = 0

    def push(self, x: int) -> None:
        if not self.stack:
            self.stack.append(0)
            self.min = x
        else:
            diff = x - self.min
            self.stack.append(diff)
            if diff < 0:
                self.min = x

    def pop(self) -> None:
        diff = self.stack.pop()
        if diff < 0:
            self.min = self.min - diff  # 恢复旧最小值

    def top(self) -> int:
        diff = self.stack[-1]
        if diff < 0:
            return self.min
        else:
            return self.min + diff

    def getMin(self) -> int:
        return self.min
```

```go [Go]
type MinStack struct {
    stack []int64
    min   int64
}

func Constructor() MinStack {
    return MinStack{
        stack: []int64{},
    }
}

func (this *MinStack) Push(x int) {
    if len(this.stack) == 0 {
        this.stack = append(this.stack, 0)
        this.min = int64(x)
    } else {
        diff := int64(x) - this.min
        this.stack = append(this.stack, diff)
        if diff < 0 {
            this.min = int64(x)
        }
    }
}

func (this *MinStack) Pop() {
    diff := this.stack[len(this.stack)-1]
    this.stack = this.stack[:len(this.stack)-1]
    if diff < 0 {
        this.min = this.min - diff // 恢复旧最小值
    }
}

func (this *MinStack) Top() int {
    diff := this.stack[len(this.stack)-1]
    if diff < 0 {
        return int(this.min)
    }
    return int(this.min + diff)
}

func (this *MinStack) GetMin() int {
    return int(this.min)
}
```

```c [C]
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    long long* stack;
    int top;
    int capacity;
    long long min;
} MinStack;

MinStack* minStackCreate() {
    MinStack* obj = (MinStack*)malloc(sizeof(MinStack));
    obj->capacity = 10000;
    obj->stack = (long long*)malloc(obj->capacity * sizeof(long long));
    obj->top = -1;
    return obj;
}

void minStackPush(MinStack* obj, int x) {
    if (obj->top == -1) {
        obj->top++;
        obj->stack[obj->top] = 0;
        obj->min = x;
    } else {
        long long diff = (long long)x - obj->min;
        obj->top++;
        obj->stack[obj->top] = diff;
        if (diff < 0) {
            obj->min = x;
        }
    }
}

void minStackPop(MinStack* obj) {
    long long diff = obj->stack[obj->top];
    obj->top--;
    if (diff < 0) {
        obj->min = obj->min - diff;
    }
}

int minStackTop(MinStack* obj) {
    long long diff = obj->stack[obj->top];
    if (diff < 0) {
        return (int)obj->min;
    } else {
        return (int)(obj->min + diff);
    }
}

int minStackGetMin(MinStack* obj) {
    return (int)obj->min;
}

void minStackFree(MinStack* obj) {
    free(obj->stack);
    free(obj);
}
```

```cpp [C++]
class MinStack {
private:
    stack<long long> st;
    long long min;
public:
    MinStack() {}

    void push(int x) {
        if (st.empty()) {
            st.push(0);
            min = x;
        } else {
            long long diff = (long long)x - min;
            st.push(diff);
            if (diff < 0) {
                min = x;
            }
        }
    }

    void pop() {
        long long diff = st.top();
        st.pop();
        if (diff < 0) {
            min = min - diff;
        }
    }

    int top() {
        long long diff = st.top();
        if (diff < 0) {
            return (int)min;
        } else {
            return (int)(min + diff);
        }
    }

    int getMin() {
        return (int)min;
    }
};
```

```javascript [JavaScript]
var MinStack = function() {
    this.stack = [];
    this.min = 0;
};

MinStack.prototype.push = function(x) {
    if (this.stack.length === 0) {
        this.stack.push(0);
        this.min = x;
    } else {
        const diff = x - this.min;
        this.stack.push(diff);
        if (diff < 0) {
            this.min = x;
        }
    }
};

MinStack.prototype.pop = function() {
    const diff = this.stack.pop();
    if (diff < 0) {
        this.min = this.min - diff;
    }
};

MinStack.prototype.top = function() {
    const diff = this.stack[this.stack.length - 1];
    if (diff < 0) {
        return this.min;
    } else {
        return this.min + diff;
    }
};

MinStack.prototype.getMin = function() {
    return this.min;
};
```

```typescript [TypeScript]
class MinStack {
    private stack: number[];
    private min: number;

    constructor() {
        this.stack = [];
        this.min = 0;
    }

    push(x: number): void {
        if (this.stack.length === 0) {
            this.stack.push(0);
            this.min = x;
        } else {
            const diff = x - this.min;
            this.stack.push(diff);
            if (diff < 0) {
                this.min = x;
            }
        }
    }

    pop(): void {
        const diff = this.stack.pop()!;
        if (diff < 0) {
            this.min = this.min - diff;
        }
    }

    top(): number {
        const diff = this.stack[this.stack.length - 1];
        if (diff < 0) {
            return this.min;
        } else {
            return this.min + diff;
        }
    }

    getMin(): number {
        return this.min;
    }
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：所有操作 `O(1)`。
- **空间复杂度**：`O(n)`，只使用一个栈。

---

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度 | 特点                               |
| -------------- | ---------- | ---------- | ---------------------------------- |
| 辅助栈（双栈） | `O(1)`     | `O(n)`     | 直观，易于实现，推荐               |
| 差值法（单栈） | `O(1)`     | `O(n)`     | 空间稍省，但逻辑较复杂，需注意溢出 |

**推荐**：在实际生产环境中，**方法一（辅助栈）** 是首选，逻辑清晰，不易出错。差值法虽节省空间，但增加了代码复杂度和维护难度，一般不推荐使用，除非对空间有极致要求。两种方法均能通过所有测试用例。
