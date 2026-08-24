# [面试题 03.05. 栈排序](https://leetcode.cn/problems/sort-of-stacks-lcci/)

## 一、题目描述

编写程序，对栈进行排序，使最小元素位于栈顶。最多只能使用一个额外的临时栈存放数据，但不得将元素复制到别的数据结构（如数组）。该栈支持 `push`、`pop`、`peek` 和 `isEmpty` 操作。实现一个 `SortedStack` 类，使得每次 `push` 后栈保持升序（栈顶为最小值）。

**示例：**

```
输入：
["SortedStack", "push", "push", "peek", "pop", "peek"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 1, null, 2]
解释：
SortedStack stack = new SortedStack();
stack.push(1);
stack.push(2);
stack.peek(); // 返回 1
stack.pop();  // 弹出 1
stack.peek(); // 返回 2
```

**提示：**

- 栈中的元素数目在 `[0, 5000]` 范围内。
- `push`、`pop`、`peek` 和 `isEmpty` 的调用次数总和不超过 `10000`。
- 所有操作均为有效操作（例如，不会对空栈调用 `pop` 或 `peek`）。

---

## 二、解答方法

### 2.1 方法一：迭代辅助栈（标准实现）

**1. 思路**

使用两个栈：主栈 `stack` 存储已排序的元素（升序，栈顶最小），辅助栈 `tmp` 用于临时存放。  
- `push(x)`：若主栈为空或 `x <= stack.peek()`，则直接入主栈；否则将主栈中所有大于 `x` 的元素逐个弹出并压入辅助栈，然后将 `x` 入主栈，最后将辅助栈中所有元素弹回主栈。这样主栈始终保持升序。  
- `pop()`：从主栈弹出栈顶元素。  
- `peek()`：返回主栈栈顶元素（最小元素）。  
- `isEmpty()`：检查主栈是否为空。

此方法每次 `push` 的均摊时间复杂度为 O(n)（每个元素最多被移动两次），但实际运行效率良好。

**2. 代码实现**

:::::: code-group

```java [Java]
import java.util.Stack;

class SortedStack {
    private Stack<Integer> stack;
    private Stack<Integer> tmp;

    public SortedStack() {
        stack = new Stack<>();
        tmp = new Stack<>();
    }

    public void push(int val) {
        if (stack.isEmpty() || val <= stack.peek()) {
            stack.push(val);
        } else {
            while (!stack.isEmpty() && stack.peek() < val) {
                tmp.push(stack.pop());
            }
            stack.push(val);
            while (!tmp.isEmpty()) {
                stack.push(tmp.pop());
            }
        }
    }

    public void pop() {
        if (!stack.isEmpty()) stack.pop();
    }

    public int peek() {
        return stack.isEmpty() ? -1 : stack.peek();
    }

    public boolean isEmpty() {
        return stack.isEmpty();
    }
}
```

```python [Python]
class SortedStack:
    def __init__(self):
        self.stack = []
        self.tmp = []

    def push(self, val: int) -> None:
        if not self.stack or val <= self.stack[-1]:
            self.stack.append(val)
        else:
            while self.stack and self.stack[-1] < val:
                self.tmp.append(self.stack.pop())
            self.stack.append(val)
            while self.tmp:
                self.stack.append(self.tmp.pop())

    def pop(self) -> None:
        if self.stack:
            self.stack.pop()

    def peek(self) -> int:
        return self.stack[-1] if self.stack else -1

    def isEmpty(self) -> bool:
        return not self.stack
```

```go [Go]
type SortedStack struct {
    stack []int
    tmp   []int
}

func Constructor() SortedStack {
    return SortedStack{
        stack: []int{},
        tmp:   []int{},
    }
}

func (this *SortedStack) Push(val int) {
    if len(this.stack) == 0 || val <= this.stack[len(this.stack)-1] {
        this.stack = append(this.stack, val)
    } else {
        for len(this.stack) > 0 && this.stack[len(this.stack)-1] < val {
            this.tmp = append(this.tmp, this.stack[len(this.stack)-1])
            this.stack = this.stack[:len(this.stack)-1]
        }
        this.stack = append(this.stack, val)
        for len(this.tmp) > 0 {
            this.stack = append(this.stack, this.tmp[len(this.tmp)-1])
            this.tmp = this.tmp[:len(this.tmp)-1]
        }
    }
}

func (this *SortedStack) Pop() {
    if len(this.stack) > 0 {
        this.stack = this.stack[:len(this.stack)-1]
    }
}

func (this *SortedStack) Peek() int {
    if len(this.stack) == 0 {
        return -1
    }
    return this.stack[len(this.stack)-1]
}

func (this *SortedStack) IsEmpty() bool {
    return len(this.stack) == 0
}
```

```c [C]
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int* stack;
    int* tmp;
    int top;
    int tmpTop;
    int capacity;
} SortedStack;

SortedStack* sortedStackCreate() {
    SortedStack* obj = (SortedStack*)malloc(sizeof(SortedStack));
    obj->capacity = 5000;
    obj->stack = (int*)malloc(obj->capacity * sizeof(int));
    obj->tmp = (int*)malloc(obj->capacity * sizeof(int));
    obj->top = -1;
    obj->tmpTop = -1;
    return obj;
}

void sortedStackPush(SortedStack* obj, int val) {
    if (obj->top == -1 || val <= obj->stack[obj->top]) {
        obj->top++;
        obj->stack[obj->top] = val;
    } else {
        while (obj->top >= 0 && obj->stack[obj->top] < val) {
            obj->tmpTop++;
            obj->tmp[obj->tmpTop] = obj->stack[obj->top];
            obj->top--;
        }
        obj->top++;
        obj->stack[obj->top] = val;
        while (obj->tmpTop >= 0) {
            obj->top++;
            obj->stack[obj->top] = obj->tmp[obj->tmpTop];
            obj->tmpTop--;
        }
    }
}

void sortedStackPop(SortedStack* obj) {
    if (obj->top >= 0) obj->top--;
}

int sortedStackPeek(SortedStack* obj) {
    return obj->top == -1 ? -1 : obj->stack[obj->top];
}

bool sortedStackIsEmpty(SortedStack* obj) {
    return obj->top == -1;
}

void sortedStackFree(SortedStack* obj) {
    free(obj->stack);
    free(obj->tmp);
    free(obj);
}
```

```cpp [C++]
class SortedStack {
private:
    stack<int> stack;
    stack<int> tmp;
public:
    SortedStack() {}

    void push(int val) {
        if (stack.empty() || val <= stack.top()) {
            stack.push(val);
        } else {
            while (!stack.empty() && stack.top() < val) {
                tmp.push(stack.top());
                stack.pop();
            }
            stack.push(val);
            while (!tmp.empty()) {
                stack.push(tmp.top());
                tmp.pop();
            }
        }
    }

    void pop() {
        if (!stack.empty()) stack.pop();
    }

    int peek() {
        return stack.empty() ? -1 : stack.top();
    }

    bool isEmpty() {
        return stack.empty();
    }
};
```

```javascript [JavaScript]
var SortedStack = function() {
    this.stack = [];
    this.tmp = [];
};

SortedStack.prototype.push = function(val) {
    if (this.stack.length === 0 || val <= this.stack[this.stack.length - 1]) {
        this.stack.push(val);
    } else {
        while (this.stack.length > 0 && this.stack[this.stack.length - 1] < val) {
            this.tmp.push(this.stack.pop());
        }
        this.stack.push(val);
        while (this.tmp.length > 0) {
            this.stack.push(this.tmp.pop());
        }
    }
};

SortedStack.prototype.pop = function() {
    if (this.stack.length > 0) this.stack.pop();
};

SortedStack.prototype.peek = function() {
    return this.stack.length === 0 ? -1 : this.stack[this.stack.length - 1];
};

SortedStack.prototype.isEmpty = function() {
    return this.stack.length === 0;
};
```

```typescript [TypeScript]
class SortedStack {
    private stack: number[];
    private tmp: number[];

    constructor() {
        this.stack = [];
        this.tmp = [];
    }

    push(val: number): void {
        if (this.stack.length === 0 || val <= this.stack[this.stack.length - 1]) {
            this.stack.push(val);
        } else {
            while (this.stack.length > 0 && this.stack[this.stack.length - 1] < val) {
                this.tmp.push(this.stack.pop()!);
            }
            this.stack.push(val);
            while (this.tmp.length > 0) {
                this.stack.push(this.tmp.pop()!);
            }
        }
    }

    pop(): void {
        if (this.stack.length > 0) this.stack.pop();
    }

    peek(): number {
        return this.stack.length === 0 ? -1 : this.stack[this.stack.length - 1];
    }

    isEmpty(): boolean {
        return this.stack.length === 0;
    }
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`push` 均摊 O(n)，`pop`、`peek`、`isEmpty` 均为 O(1)。每个元素最多被移动两次（一次移入辅助栈，一次移回主栈）。
- **空间复杂度**：O(n)，使用两个栈存储所有元素。

---

### 2.2 方法二：递归辅助栈（利用系统栈）

**1. 思路**

与方法一逻辑相同，但将“将大于 `val` 的元素移到辅助栈”这一过程用递归实现。递归函数会反复将主栈栈顶元素弹出，直到栈顶小于等于 `val` 或栈空，然后入 `val`，再在递归返回时将弹出的元素重新压回主栈。此方法利用系统调用栈作为临时存储，但代码更加简洁。

**2. 代码实现**

（注意：递归深度受系统栈限制，但题目数据规模较小（≤5000），可以安全运行。）

:::::: code-group

```java [Java]
class SortedStack {
    private Stack<Integer> stack;

    public SortedStack() {
        stack = new Stack<>();
    }

    public void push(int val) {
        if (stack.isEmpty() || val <= stack.peek()) {
            stack.push(val);
        } else {
            int top = stack.pop();
            push(val);
            stack.push(top);
        }
    }

    public void pop() {
        if (!stack.isEmpty()) stack.pop();
    }

    public int peek() {
        return stack.isEmpty() ? -1 : stack.peek();
    }

    public boolean isEmpty() {
        return stack.isEmpty();
    }
}
```

```python [Python]
class SortedStack:
    def __init__(self):
        self.stack = []

    def push(self, val: int) -> None:
        if not self.stack or val <= self.stack[-1]:
            self.stack.append(val)
        else:
            top = self.stack.pop()
            self.push(val)
            self.stack.append(top)

    def pop(self) -> None:
        if self.stack:
            self.stack.pop()

    def peek(self) -> int:
        return self.stack[-1] if self.stack else -1

    def isEmpty(self) -> bool:
        return not self.stack
```

```go [Go]
type SortedStack struct {
    stack []int
}

func Constructor() SortedStack {
    return SortedStack{stack: []int{}}
}

func (this *SortedStack) Push(val int) {
    if len(this.stack) == 0 || val <= this.stack[len(this.stack)-1] {
        this.stack = append(this.stack, val)
    } else {
        top := this.stack[len(this.stack)-1]
        this.stack = this.stack[:len(this.stack)-1]
        this.Push(val)
        this.stack = append(this.stack, top)
    }
}

func (this *SortedStack) Pop() {
    if len(this.stack) > 0 {
        this.stack = this.stack[:len(this.stack)-1]
    }
}

func (this *SortedStack) Peek() int {
    if len(this.stack) == 0 {
        return -1
    }
    return this.stack[len(this.stack)-1]
}

func (this *SortedStack) IsEmpty() bool {
    return len(this.stack) == 0
}
```

```c [C]
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int* stack;
    int top;
    int capacity;
} SortedStack;

SortedStack* sortedStackCreate() {
    SortedStack* obj = (SortedStack*)malloc(sizeof(SortedStack));
    obj->capacity = 5000;
    obj->stack = (int*)malloc(obj->capacity * sizeof(int));
    obj->top = -1;
    return obj;
}

void pushHelper(SortedStack* obj, int val) {
    if (obj->top == -1 || val <= obj->stack[obj->top]) {
        obj->top++;
        obj->stack[obj->top] = val;
    } else {
        int top = obj->stack[obj->top];
        obj->top--;
        pushHelper(obj, val);
        obj->top++;
        obj->stack[obj->top] = top;
    }
}

void sortedStackPush(SortedStack* obj, int val) {
    pushHelper(obj, val);
}

void sortedStackPop(SortedStack* obj) {
    if (obj->top >= 0) obj->top--;
}

int sortedStackPeek(SortedStack* obj) {
    return obj->top == -1 ? -1 : obj->stack[obj->top];
}

bool sortedStackIsEmpty(SortedStack* obj) {
    return obj->top == -1;
}

void sortedStackFree(SortedStack* obj) {
    free(obj->stack);
    free(obj);
}
```

```cpp [C++]
class SortedStack {
private:
    stack<int> st;
public:
    SortedStack() {}

    void push(int val) {
        if (st.empty() || val <= st.top()) {
            st.push(val);
        } else {
            int top = st.top();
            st.pop();
            push(val);
            st.push(top);
        }
    }

    void pop() {
        if (!st.empty()) st.pop();
    }

    int peek() {
        return st.empty() ? -1 : st.top();
    }

    bool isEmpty() {
        return st.empty();
    }
};
```

```javascript [JavaScript]
var SortedStack = function() {
    this.stack = [];
};

SortedStack.prototype.push = function(val) {
    if (this.stack.length === 0 || val <= this.stack[this.stack.length - 1]) {
        this.stack.push(val);
    } else {
        const top = this.stack.pop();
        this.push(val);
        this.stack.push(top);
    }
};

SortedStack.prototype.pop = function() {
    if (this.stack.length > 0) this.stack.pop();
};

SortedStack.prototype.peek = function() {
    return this.stack.length === 0 ? -1 : this.stack[this.stack.length - 1];
};

SortedStack.prototype.isEmpty = function() {
    return this.stack.length === 0;
};
```

```typescript [TypeScript]
class SortedStack {
    private stack: number[];

    constructor() {
        this.stack = [];
    }

    push(val: number): void {
        if (this.stack.length === 0 || val <= this.stack[this.stack.length - 1]) {
            this.stack.push(val);
        } else {
            const top = this.stack.pop()!;
            this.push(val);
            this.stack.push(top);
        }
    }

    pop(): void {
        if (this.stack.length > 0) this.stack.pop();
    }

    peek(): number {
        return this.stack.length === 0 ? -1 : this.stack[this.stack.length - 1];
    }

    isEmpty(): boolean {
        return this.stack.length === 0;
    }
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`push` 均摊 O(n)，`pop`、`peek`、`isEmpty` 为 O(1)。
- **空间复杂度**：O(n)（递归栈深度，最坏 O(n)），但实际仍然使用系统调用栈，可视为常数空间（但理论上仍为 O(n)）。

---

## 三、总结

| 方法                 | 时间复杂度（push） | 空间复杂度     | 特点                           |
| -------------------- | ------------------ | -------------- | ------------------------------ |
| 方法一（迭代辅助栈） | 均摊 O(n)          | O(n)           | 显式辅助栈，逻辑清晰，推荐     |
| 方法二（递归辅助）   | 均摊 O(n)          | O(n)（递归栈） | 代码简洁，但递归可能受深度限制 |

**推荐**：在实际生产环境中，**方法一（迭代辅助栈）** 更为安全，不受递归深度限制，且易于调试。方法二代码更简洁，但需确保递归深度不超过系统限制（本题数据规模较小，两种均可）。
