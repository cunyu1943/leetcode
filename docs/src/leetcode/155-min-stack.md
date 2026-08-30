# [155. 最小栈](https://leetcode.cn/problems/min-stack/)



## 一、题目描述

设计一个支持 `push` ，`pop` ，`top` 操作，并能在常数时间内检索到最小元素的栈。

实现 `MinStack` 类：

-   `MinStack()` 初始化堆栈对象。
-   `void push(int val)` 将元素 `val` 推入堆栈。
-   `void pop()` 删除堆栈顶部的元素。
-   `int top()` 获取堆栈顶部的元素。
-   `int getMin()` 获取堆栈中的最小元素。

**要求：** `pop`、`push`、`top` 和 `getMin` 操作的时间复杂度都是 `O(1)` 。



**示例：**

```
输入
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]
输出
[null,null,null,null,-3,null,0,-2]
解释
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

-   `-2³¹ <= val <= 2³¹ - 1`
-   `pop`、`top` 和 `getMin` 操作总是在 **非空栈** 上调用
-   `push`、`pop`、`top` 和 `getMin` 最多被调用 `3 * 10⁴` 次



## 二、解答方法

### 2.1 方法一：辅助栈

1. **思路**

用一个普通栈存数据，再用一个「单调栈」`minStack` 存当前最小值：每次 `push` 时若新值 `<=` 当前最小值则同步入辅助栈；`pop` 时若弹出值等于当前最小值则同步弹出辅助栈栈顶。`getMin` 即辅助栈栈顶。

2. **代码实现**

:::::: code-group

```java [Java]
class MinStack {
    private Deque<Integer> stack;
    private Deque<Integer> minStack;

    public MinStack() {
        stack = new ArrayDeque<>();
        minStack = new ArrayDeque<>();
    }

    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        }
    }

    public void pop() {
        int val = stack.pop();
        if (val == minStack.peek()) {
            minStack.pop();
        }
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}
```

```python [Python]
class MinStack:

    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self) -> None:
        val = self.stack.pop()
        if val == self.min_stack[-1]:
            self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]
```

```go [Go]
type MinStack struct {
    stack    []int
    minStack []int
}

func Constructor() MinStack {
    return MinStack{}
}

func (m *MinStack) Push(val int) {
    m.stack = append(m.stack, val)
    if len(m.minStack) == 0 || val <= m.minStack[len(m.minStack)-1] {
        m.minStack = append(m.minStack, val)
    }
}

func (m *MinStack) Pop() {
    val := m.stack[len(m.stack)-1]
    m.stack = m.stack[:len(m.stack)-1]
    if val == m.minStack[len(m.minStack)-1] {
        m.minStack = m.minStack[:len(m.minStack)-1]
    }
}

func (m *MinStack) Top() int {
    return m.stack[len(m.stack)-1]
}

func (m *MinStack) GetMin() int {
    return m.minStack[len(m.minStack)-1]
}
```

```cpp [C++]
class MinStack {
    stack<int> st;
    stack<int> minSt;
public:
    MinStack() {}

    void push(int val) {
        st.push(val);
        if (minSt.empty() || val <= minSt.top()) {
            minSt.push(val);
        }
    }

    void pop() {
        if (st.top() == minSt.top()) {
            minSt.pop();
        }
        st.pop();
    }

    int top() {
        return st.top();
    }

    int getMin() {
        return minSt.top();
    }
};
```

```js [JavaScript]
var MinStack = function () {
    this.stack = [];
    this.minStack = [];
};

MinStack.prototype.push = function (val) {
    this.stack.push(val);
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
        this.minStack.push(val);
    }
};

MinStack.prototype.pop = function () {
    const val = this.stack.pop();
    if (val === this.minStack[this.minStack.length - 1]) {
        this.minStack.pop();
    }
};

MinStack.prototype.top = function () {
    return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function () {
    return this.minStack[this.minStack.length - 1];
};
```

```ts [TypeScript]
class MinStack {
    private stack: number[];
    private minStack: number[];

    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    push(val: number): void {
        this.stack.push(val);
        if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
        }
    }

    pop(): void {
        const val = this.stack.pop()!;
        if (val === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
    }

    top(): number {
        return this.stack[this.stack.length - 1];
    }

    getMin(): number {
        return this.minStack[this.minStack.length - 1];
    }
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：所有操作 `O(1)`。
- **空间复杂度**：`O(n)`。

### 2.2 方法二：单栈 + 差值编码（进阶）

1. **思路**

只用一个栈，同时记录「当前最小值 `minVal`」。入栈时若 `val < minVal`，则压入 `val - minVal`（负数标记），并更新 `minVal = val`；出栈时若弹出值 `< 0`，说明弹出了历史最小，需用 `minVal - 弹出值` 恢复上一最小值。`getMin` 直接返回 `minVal`。空间更省。

2. **代码实现（Java）**

```java
class MinStack {
    private Deque<Long> stack = new ArrayDeque<>();
    private long minVal;

    public MinStack() {}

    public void push(int val) {
        if (stack.isEmpty()) {
            stack.push(0L);
            minVal = val;
        } else {
            stack.push((long) val - minVal);
            if (val < minVal) minVal = val;
        }
    }

    public void pop() {
        long diff = stack.pop();
        if (diff < 0) {
            minVal = minVal - diff;
        }
    }

    public int top() {
        long diff = stack.peek();
        return (int) (diff < 0 ? minVal : minVal + diff);
    }

    public int getMin() {
        return (int) minVal;
    }
}
```

3. **复杂度分析**

- **时间复杂度**：`O(1)`。
- **空间复杂度**：`O(n)`，但仅一个栈。

## 三、总结

| 方法 | 优点 | 缺点 |
| ---- | ---- | ---- |
| 辅助栈 | 思路清晰 | 额外一个栈 |
| 单栈差值 | 节省空间 | 实现稍复杂 |

辅助栈是最直观、面试中推荐的解法；单栈编码法则在真实工程中更省内存。
