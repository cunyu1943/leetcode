# [251. 展开二维向量](https://leetcode.cn/problems/flatten-2d-vector/)



## 一、题目描述

请设计并实现一个能够展开二维向量的迭代器。该迭代器需要支持 `next` 和 `hasNext` 两种操作。

实现 `Vector2D` 类：

-   `Vector2D(int[][] vec)` 构造函数传入二维向量 `vec`
-   `next()` 函数返回二维向量中的下一个元素，并移动指针到下一个元素
-   `hasNext()` 函数返回 `true` 如果二维向量中还有下一个元素，否则返回 `false`

**示例：**

```
输入：
["Vector2D", "next", "next", "next", "hasNext", "hasNext", "next", "hasNext"]
[[[[1,2],[3],[4]]], [], [], [], [], [], [], []]
输出：
[null, 1, 2, 3, true, false, false]

解释：
Vector2D vector2D = new Vector2D([[1,2],[3],[4]]);
vector2D.next();    // 返回 1
vector2D.next();    // 返回 2
vector2D.next();    // 返回 3
vector2D.hasNext(); // 返回 True
vector2D.next();    // 返回 4
vector2D.hasNext(); // 返回 False
```

**提示：**

-   `0 <= vec.length <= 200`
-   `0 <= vec[i].length <= 200`
-   `-2³¹ <= vec[i][j] <= 2³¹ - 1`
-   最多调用 `next` 和 `hasNext` `10⁵` 次

**进阶：** 尝试仅使用 `O(1)` 额外空间复杂度实现。你可以假设 `next()` 的调用总是合法的，即当 `next()` 被调用时，二维向量总是存在下一个元素。



## 二、解答方法

### 2.1 方法一：双指针（行指针 + 列指针，O(1) 空间）

1. **思路**

维护 `row`（当前行下标）和 `col`（当前列下标）。关键在于处理 **空行**：

- `hasNext()`：从当前位置开始，若 `col` 已越过当前行末尾（或当前行为空），就跳到下一个非空行并重置 `col = 0`。这个「跳过空行」的辅助函数记作 `advanceToNext()`；
- `next()`：先确保位置有效（调用 `advanceToNext()`），返回 `vec[row][col]`，然后 `col++`。

预先调用 `advanceToNext()` 使指针停在第一个有效元素上。

2. **代码实现**

:::::: code-group

```java [Java]
class Vector2D {
    private int[][] vec;
    private int row = 0;
    private int col = 0;

    public Vector2D(int[][] vec) {
        this.vec = vec;
        advanceToNext();
    }

    public int next() {
        int value = vec[row][col];
        col++;
        advanceToNext();          // 预先跳到下一个有效位置
        return value;
    }

    public boolean hasNext() {
        return row < vec.length;
    }

    // 跳过空行 / 越界的列，使 (row, col) 指向有效元素
    private void advanceToNext() {
        while (row < vec.length && col >= vec[row].length) {
            row++;
            col = 0;
        }
    }
}
```

```python [Python]
class Vector2D:

    def __init__(self, vec: List[List[int]]):
        self.vec = vec
        self.row = 0
        self.col = 0
        self._advance()

    def next(self) -> int:
        value = self.vec[self.row][self.col]
        self.col += 1
        self._advance()
        return value

    def hasNext(self) -> bool:
        return self.row < len(self.vec)

    def _advance(self) -> None:
        # 跳过空行与越界的列
        while self.row < len(self.vec) and self.col >= len(self.vec[self.row]):
            self.row += 1
            self.col = 0
```

```go [Go]
type Vector2D struct {
    vec [][]int
    row int
    col int
}

func Constructor(vec [][]int) Vector2D {
    v := Vector2D{vec: vec}
    v.advance()
    return v
}

func (v *Vector2D) Next() int {
    value := v.vec[v.row][v.col]
    v.col++
    v.advance()
    return value
}

func (v *Vector2D) HasNext() bool {
    return v.row < len(v.vec)
}

func (v *Vector2D) advance() {
    for v.row < len(v.vec) && v.col >= len(v.vec[v.row]) {
        v.row++
        v.col = 0
    }
}
```

```cpp [C++]
class Vector2D {
private:
    vector<vector<int>>& vec;
    int row = 0, col = 0;

    void advance() {
        while (row < vec.size() && col >= vec[row].size()) {
            row++;
            col = 0;
        }
    }
public:
    Vector2D(vector<vector<int>>& v) : vec(v) {
        advance();
    }

    int next() {
        int value = vec[row][col];
        col++;
        advance();
        return value;
    }

    bool hasNext() {
        return row < vec.size();
    }
};
```

```js [JavaScript]
/**
 * @param {number[][]} vec
 */
var Vector2D = function (vec) {
    this.vec = vec;
    this.row = 0;
    this.col = 0;
    this.advance();
};

/**
 * @return {number}
 */
Vector2D.prototype.next = function () {
    const value = this.vec[this.row][this.col];
    this.col++;
    this.advance();
    return value;
};

/**
 * @return {boolean}
 */
Vector2D.prototype.hasNext = function () {
    return this.row < this.vec.length;
};

Vector2D.prototype.advance = function () {
    while (this.row < this.vec.length && this.col >= this.vec[this.row].length) {
        this.row++;
        this.col = 0;
    }
};
```

```ts [TypeScript]
class Vector2D {
    private vec: number[][];
    private row: number = 0;
    private col: number = 0;

    constructor(vec: number[][]) {
        this.vec = vec;
        this.advance();
    }

    next(): number {
        const value = this.vec[this.row][this.col];
        this.col++;
        this.advance();
        return value;
    }

    hasNext(): boolean {
        return this.row < this.vec.length;
    }

    private advance(): void {
        while (this.row < this.vec.length && this.col >= this.vec[this.row].length) {
            this.row++;
            this.col = 0;
        }
    }
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`next()` 和 `hasNext()` 均为 **摊还 `O(1)`**（`advance` 中的 while 循环最多把 `row` 推进到末尾，总额外操作 `O(行数)`）。
- **空间复杂度**：`O(1)`（满足进阶要求）。

### 2.2 方法二：预先扁平化（O(n) 空间）

1. **思路**

构造时把所有元素展开存入一维数组，用单个指针遍历。实现最简单，但需要 `O(n)` 额外空间，且若二维向量很大会有内存开销。

2. **代码实现（Python）**

```python
class Vector2D:

    def __init__(self, vec: List[List[int]]):
        self.data = [x for row in vec for x in row]
        self.index = 0

    def next(self) -> int:
        value = self.data[self.index]
        self.index += 1
        return value

    def hasNext(self) -> bool:
        return self.index < len(self.data)
```

3. **复杂度分析**

- **时间复杂度**：构造 `O(n)`，`next`/`hasNext` 均为 `O(1)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 额外空间 | 特点 |
| ---- | -------- | ---- |
| 双指针（行 + 列） | `O(1)` | 满足进阶，推荐 |
| 预先扁平化 | `O(n)` | 简单但费空间 |

**关键细节：空行的处理**。不能简单地用 `col >= vec[row].length` 判断后直接前进，因为可能存在 **连续的空行**（如 `[[], [], [1]]`）。必须用 `while` 循环持续跳过，而不是 `if`。

另一个设计选择：`next()` 中在返回值后 **立即调用 `advance()`**，把「跳过空行」的开销提前，使 `hasNext()` 只需 `O(1)` 判断 `row < vec.length`。这比在 `hasNext()` 中做跳跃更符合直觉。
