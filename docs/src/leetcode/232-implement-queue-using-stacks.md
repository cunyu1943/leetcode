# [232. 用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks/)



## 一、题目描述

请你仅使用 **两个栈** 实现 **先入先出队列**。队列应当支持一般队列支持的所有操作（`push`、`pop`、`peek`、`empty`）：

实现 `MyQueue` 类：

-   `void push(int x)` 将元素 x 推到队列的末尾
-   `int pop()` 从队列的开头移除并返回元素
-   `int peek()` 返回队列开头的元素
-   `boolean empty()` 如果队列为空，返回 `true` ；否则，返回 `false`

**说明：**

-   你 **只能** 使用标准的栈操作 —— 也就是只有 `push to top`, `peek/pop from top`, `size`, 和 `is empty` 操作是合法的。
-   你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。

**示例：**

```
输入：
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 1, 1, false]

解释：
MyQueue myQueue = new MyQueue();
myQueue.push(1);
myQueue.push(2);
myQueue.peek();  // 返回 1
myQueue.pop();   // 返回 1
myQueue.empty(); // 返回 false
```

**提示：**

-   `1 <= x <= 9`
-   最多调用 `100` 次 `push`、`pop`、`peek` 和 `empty`
-   假设所有操作都是有效的 （例如，一个空的队列不会调用 `pop` 或者 `peek` 操作）

**进阶：** 你能否实现每个操作均摊时间复杂度为 `O(1)` 的队列？



## 二、解答方法

### 2.1 方法一：双栈（输入栈 + 输出栈，摊还 O(1)）

1. **思路**

用 `inStack` 接收入队元素，用 `outStack` 提供出队：

- **push**：直接压入 `inStack`，`O(1)`；
- **pop / peek**：若 `outStack` 为空，把 `inStack` 的所有元素 **依次弹出并压入 `outStack`**（顺序反转，此时 `outStack` 栈顶即队首）；然后从 `outStack` 弹出/查看。

每个元素最多被搬运一次，因此 **摊还复杂度为 O(1)**。

2. **代码实现**

:::::: code-group

```java [Java]
class MyQueue {
    private Deque<Integer> inStack;
    private Deque<Integer> outStack;

    public MyQueue() {
        inStack = new ArrayDeque<>();
        outStack = new ArrayDeque<>();
    }

    public void push(int x) {
        inStack.push(x);
    }

    public int pop() {
        transferIfEmpty();
        return outStack.pop();
    }

    public int peek() {
        transferIfEmpty();
        return outStack.peek();
    }

    public boolean empty() {
        return inStack.isEmpty() && outStack.isEmpty();
    }

    private void transferIfEmpty() {
        if (outStack.isEmpty()) {
            while (!inStack.isEmpty()) {
                outStack.push(inStack.pop());
            }
        }
    }
}
```

```python [Python]
class MyQueue:

    def __init__(self):
        self.in_stack = []
        self.out_stack = []

    def push(self, x: int) -> None:
        self.in_stack.append(x)

    def pop(self) -> int:
        self._transfer()
        return self.out_stack.pop()

    def peek(self) -> int:
        self._transfer()
        return self.out_stack[-1]

    def empty(self) -> bool:
        return not self.in_stack and not self.out_stack

    def _transfer(self) -> None:
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
```

```go [Go]
type MyQueue struct {
    inStack  []int
    outStack []int
}

func Constructor() MyQueue {
    return MyQueue{}
}

func (q *MyQueue) Push(x int) {
    q.inStack = append(q.inStack, x)
}

func (q *MyQueue) Pop() int {
    q.transfer()
    x := q.outStack[len(q.outStack)-1]
    q.outStack = q.outStack[:len(q.outStack)-1]
    return x
}

func (q *MyQueue) Peek() int {
    q.transfer()
    return q.outStack[len(q.outStack)-1]
}

func (q *MyQueue) Empty() bool {
    return len(q.inStack) == 0 && len(q.outStack) == 0
}

func (q *MyQueue) transfer() {
    if len(q.outStack) == 0 {
        for len(q.inStack) > 0 {
            n := len(q.inStack)
            q.outStack = append(q.outStack, q.inStack[n-1])
            q.inStack = q.inStack[:n-1]
        }
    }
}
```

```cpp [C++]
class MyQueue {
private:
    stack<int> inStack, outStack;

    void transfer() {
        if (outStack.empty()) {
            while (!inStack.empty()) {
                outStack.push(inStack.top());
                inStack.pop();
            }
        }
    }
public:
    MyQueue() {}

    void push(int x) {
        inStack.push(x);
    }

    int pop() {
        transfer();
        int x = outStack.top();
        outStack.pop();
        return x;
    }

    int peek() {
        transfer();
        return outStack.top();
    }

    bool empty() {
        return inStack.empty() && outStack.empty();
    }
};
```

```js [JavaScript]
/**
 * Initialize your data structure here.
 */
var MyQueue = function () {
    this.inStack = [];
    this.outStack = [];
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
    this.inStack.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
    this.transfer();
    return this.outStack.pop();
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
    this.transfer();
    return this.outStack[this.outStack.length - 1];
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
    return this.inStack.length === 0 && this.outStack.length === 0;
};

MyQueue.prototype.transfer = function () {
    if (this.outStack.length === 0) {
        while (this.inStack.length) {
            this.outStack.push(this.inStack.pop());
        }
    }
};
```

```ts [TypeScript]
class MyQueue {
    private inStack: number[];
    private outStack: number[];

    constructor() {
        this.inStack = [];
        this.outStack = [];
    }

    push(x: number): void {
        this.inStack.push(x);
    }

    pop(): number {
        this.transfer();
        return this.outStack.pop()!;
    }

    peek(): number {
        this.transfer();
        return this.outStack[this.outStack.length - 1];
    }

    empty(): boolean {
        return this.inStack.length === 0 && this.outStack.length === 0;
    }

    private transfer(): void {
        if (this.outStack.length === 0) {
            while (this.inStack.length) {
                this.outStack.push(this.inStack.pop()!);
            }
        }
    }
}
```

::::::

3. **复杂度分析**

- `push`：`O(1)`。
- `pop` / `peek`：**摊还 `O(1)`**（单次最坏 `O(n)`，但每个元素一生只被搬运一次）。
- **空间复杂度**：`O(n)`。

## 三、总结

| 操作 | 复杂度 |
| ---- | ------ |
| push | `O(1)` |
| pop / peek | 摊还 `O(1)` |
| empty | `O(1)` |

核心思想：**两次反转 = 原顺序**。元素从 `inStack` 倒入 `outStack` 后，LIFO 顺序被翻转成 FIFO 顺序。关键点：

1. **仅在 `outStack` 为空时才搬运**，否则会打乱顺序；
2. `empty()` 需 **两个栈都为空**；
3. 摊还分析保证整体 `O(1)` —— 这满足进阶要求。

对比 `225. 用队列实现栈`：那边必须在 push 或 pop 时反转，无法做到所有操作都摊还 `O(1)`。
