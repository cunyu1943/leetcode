# [225. 用队列实现栈](https://leetcode.cn/problems/implement-stack-using-queues/)



## 一、题目描述

请你仅使用 **两个队列** 实现一个 **后入先出（LIFO）** 的栈，并支持普通栈的全部四种操作（`push`、`top`、`pop` 和 `empty`）。

实现 `MyStack` 类：

-   `void push(int x)` 将元素 x 压入栈顶。
-   `int pop()` 移除并返回栈顶元素。
-   `int top()` 返回栈顶元素。
-   `boolean empty()` 如果栈是空的，返回 `true` ；否则，返回 `false` 。

**注意：**

-   你只能使用队列的基本操作 —— 也就是 `push to back`、`peek/pop from front`、`size` 和 `is empty` 这些操作。
-   你所使用的语言也许不支持队列。你可以使用 list（列表）或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。

**示例：**

```
输入：
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 2, 2, false]

解释：
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // 返回 2
myStack.pop(); // 返回 2
myStack.empty(); // 返回 False
```

**提示：**

-   `1 <= x <= 9`
-   最多调用 `100` 次 `push`、`pop`、`top` 和 `empty`
-   每次调用 `pop` 和 `top` 都保证栈不为空

**进阶：** 你能否仅用 **一个队列** 实现栈？



## 二、解答方法

### 2.1 方法一：双队列（push 时调整顺序）

1. **思路**

用 `q1` 为主队列，`q2` 为辅助队列。每次 `push(x)`：

1. 先把 `x` 加入 `q2`；
2. 再把 `q1` 中所有元素依次出队加入 `q2`；
3. 交换 `q1` 与 `q2`。

这样 `q1` 的 **队首始终是栈顶**，`pop`/`top` 均为 `O(1)`。

2. **代码实现**

:::::: code-group

```java [Java]
class MyStack {
    private Queue<Integer> q1;
    private Queue<Integer> q2;

    public MyStack() {
        q1 = new LinkedList<>();
        q2 = new LinkedList<>();
    }

    public void push(int x) {
        q2.offer(x);
        while (!q1.isEmpty()) {
            q2.offer(q1.poll());
        }
        Queue<Integer> temp = q1;
        q1 = q2;
        q2 = temp;
    }

    public int pop() {
        return q1.poll();
    }

    public int top() {
        return q1.peek();
    }

    public boolean empty() {
        return q1.isEmpty();
    }
}
```

```python [Python]
class MyStack:

    def __init__(self):
        self.q1 = collections.deque()
        self.q2 = collections.deque()

    def push(self, x: int) -> None:
        self.q2.append(x)
        while self.q1:
            self.q2.append(self.q1.popleft())
        self.q1, self.q2 = self.q2, self.q1

    def pop(self) -> int:
        return self.q1.popleft()

    def top(self) -> int:
        return self.q1[0]

    def empty(self) -> bool:
        return not self.q1
```

```go [Go]
type MyStack struct {
    q1 []int
    q2 []int
}

func Constructor() MyStack {
    return MyStack{}
}

func (s *MyStack) Push(x int) {
    s.q2 = append(s.q2, x)
    for len(s.q1) > 0 {
        s.q2 = append(s.q2, s.q1[0])
        s.q1 = s.q1[1:]
    }
    s.q1, s.q2 = s.q2, s.q1
}

func (s *MyStack) Pop() int {
    x := s.q1[0]
    s.q1 = s.q1[1:]
    return x
}

func (s *MyStack) Top() int {
    return s.q1[0]
}

func (s *MyStack) Empty() bool {
    return len(s.q1) == 0
}
```

```cpp [C++]
class MyStack {
private:
    queue<int> q1, q2;
public:
    MyStack() {}

    void push(int x) {
        q2.push(x);
        while (!q1.empty()) {
            q2.push(q1.front());
            q1.pop();
        }
        swap(q1, q2);
    }

    int pop() {
        int x = q1.front();
        q1.pop();
        return x;
    }

    int top() {
        return q1.front();
    }

    bool empty() {
        return q1.empty();
    }
};
```

```js [JavaScript]
/**
 * Initialize your data structure here.
 */
var MyStack = function () {
    this.q1 = [];
    this.q2 = [];
};

/**
 * Push element x onto stack.
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
    this.q2.push(x);
    while (this.q1.length) {
        this.q2.push(this.q1.shift());
    }
    [this.q1, this.q2] = [this.q2, this.q1];
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function () {
    return this.q1.shift();
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function () {
    return this.q1[0];
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
    return this.q1.length === 0;
};
```

```ts [TypeScript]
class MyStack {
    private q1: number[];
    private q2: number[];

    constructor() {
        this.q1 = [];
        this.q2 = [];
    }

    push(x: number): void {
        this.q2.push(x);
        while (this.q1.length) {
            this.q2.push(this.q1.shift()!);
        }
        [this.q1, this.q2] = [this.q2, this.q1];
    }

    pop(): number {
        return this.q1.shift()!;
    }

    top(): number {
        return this.q1[0];
    }

    empty(): boolean {
        return this.q1.length === 0;
    }
}
```

::::::

3. **复杂度分析**

- `push`：`O(n)`；`pop`/`top`/`empty`：`O(1)`。
- **空间复杂度**：`O(n)`。

### 2.2 方法二：单队列（进阶，pop 时旋转）

1. **思路**

只用一个队列。`push` 时直接入队；`pop` 时把 **除最后一个元素外的所有元素** 依次出队再入队（旋转一圈），此时原队尾元素来到队首，出队即为栈顶。

2. **代码实现（Python）**

```python
class MyStack:

    def __init__(self):
        self.q = collections.deque()

    def push(self, x: int) -> None:
        self.q.append(x)

    def pop(self) -> int:
        for _ in range(len(self.q) - 1):
            self.q.append(self.q.popleft())
        return self.q.popleft()

    def top(self) -> int:
        for _ in range(len(self.q) - 1):
            self.q.append(self.q.popleft())
        x = self.q.popleft()
        self.q.append(x)
        return x

    def empty(self) -> bool:
        return not self.q
```

3. **复杂度分析**

- `push`：`O(1)`；`pop`/`top`：`O(n)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | push | pop | 特点 |
| ---- | ---- | --- | ---- |
| 双队列 | `O(n)` | `O(1)` | 每次入栈都把新元素「搬到队首」 |
| 单队列 | `O(1)` | `O(n)` | 每次出栈前把队列「旋转一圈」 |

核心思想：**队列是 FIFO，栈是 LIFO**，必须通过元素搬移来反转顺序 —— 双队列在入栈时反转，单队列在出栈时反转。对比 `232. 用栈实现队列`（用输入栈 + 输出栈，摊还 `O(1)`）。
