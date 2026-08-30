# [281. 锯齿迭代器](https://leetcode.cn/problems/zigzag-iterator/) [🔒 会员题]

## 一、题目描述

给出若干个一维的向量，请你实现一个迭代器，能以 **之字形（zagzag）顺序** 遍历所有向量中的元素。

例如，给定输入 `v1 = [1,2]`，`v2 = [3,4,5,6]`，`v3 = [7,8,9]`。以之字形顺序迭代将依次返回 `[1,3,7,2,4,8,5,9,6]`。

**进阶：** 如果能处理任意数量的输入向量呢？（本题 `v1, v2` 两个向量，进阶为 k 个）

**示例：**

```
输入：v1 = [1,2], v2 = [3,4,5,6]
输出迭代顺序：[1,3,2,4,5,6]
```

**提示：** 输入向量总非空数量 `1 <= total <= 10⁵`，各向量长度合计 `1 <= total <= 10⁵`。

## 二、解答方法

### 方法一：循环取列（按列轮转）

**思路：** 之字形 = 按「列」遍历：第 1 列取各向量第 0 个元素，第 2 列取各向量第 1 个元素……直到所有向量取完。

维护指针列表 `ptrs[k]`（记录每个向量当前取到的下标），以及向量列表。每次 `next()` 找到下一个仍有元素的向量，返回其当前元素并将指针 +1。

:::::: code-group

```java [Java]
public class ZigzagIterator {
    private List<List<Integer>> vectors;
    private int[] ptrs;       // 每个向量当前列下标
    private int k;            // 向量个数
    private int col;          // 当前列

    public ZigzagIterator(List<Integer> v1, List<Integer> v2) {
        vectors = new ArrayList<>();
        vectors.add(v1); vectors.add(v2);
        ptrs = new int[2];
        k = 2; col = 0;
    }
    public int next() {
        // 找到当前列下一个有效的向量
        while (col < 100000 && ptrs[col % k] >= vectors.get(col % k).size()) {
            col++;
        }
        int idx = col % k;
        int val = vectors.get(idx).get(ptrs[idx]);
        ptrs[idx]++;
        col++;
        return val;
    }
    public boolean hasNext() {
        for (int i = 0; i < k; i++)
            if (ptrs[i] < vectors.get(i).size()) return true;
        return false;
    }
}
```

```python [Python]
class ZigzagIterator:
    def __init__(self, v1: List[int], v2: List[int]):
        self.vectors = [v1, v2]
        self.ptrs = [0, 0]
        self.k = 2
        self.col = 0

    def next(self) -> int:
        while self.ptrs[self.col % self.k] >= len(self.vectors[self.col % self.k]):
            self.col += 1
        idx = self.col % self.k
        val = self.vectors[idx][self.ptrs[idx]]
        self.ptrs[idx] += 1
        self.col += 1
        return val

    def hasNext(self) -> bool:
        return any(self.ptrs[i] < len(self.vectors[i]) for i in range(self.k))
```

```cpp [C++]
class ZigzagIterator {
    vector<vector<int>> vectors;
    vector<int> ptrs;
    int k, col;
public:
    ZigzagIterator(vector<int>& v1, vector<int>& v2) {
        vectors = {v1, v2};
        ptrs = {0, 0};
        k = 2; col = 0;
    }
    int next() {
        while (col < 100000 && ptrs[col % k] >= vectors[col % k].size()) col++;
        int idx = col % k;
        int val = vectors[idx][ptrs[idx]];
        ptrs[idx]++; col++;
        return val;
    }
    bool hasNext() {
        for (int i = 0; i < k; i++)
            if (ptrs[i] < vectors[i].size()) return true;
        return false;
    }
};
```

```go [Go]
type ZigzagIterator struct {
    vectors [][]int
    ptrs    []int
    k, col  int
}
func Constructor(v1, v2 []int) *ZigzagIterator {
    return &ZigzagIterator{vectors: [][]int{v1, v2}, ptrs: []int{0, 0}, k: 2}
}
func (z *ZigzagIterator) Next() int {
    for z.ptrs[z.col%z.k] >= len(z.vectors[z.col%z.k]) {
        z.col++
    }
    idx := z.col % z.k
    val := z.vectors[idx][z.ptrs[idx]]
    z.ptrs[idx]++
    z.col++
    return val
}
func (z *ZigzagIterator) HasNext() bool {
    for i := 0; i < z.k; i++ {
        if z.ptrs[i] < len(z.vectors[i]) { return true }
    }
    return false
}
```

```js [JavaScript]
var ZigzagIterator = function (v1, v2) {
    this.vectors = [v1, v2];
    this.ptrs = [0, 0];
    this.k = 2;
    this.col = 0;
};
ZigzagIterator.prototype.next = function () {
    while (this.ptrs[this.col % this.k] >= this.vectors[this.col % this.k].length) this.col++;
    const idx = this.col % this.k;
    const val = this.vectors[idx][this.ptrs[idx]];
    this.ptrs[idx]++;
    this.col++;
    return val;
};
ZigzagIterator.prototype.hasNext = function () {
    for (let i = 0; i < this.k; i++)
        if (this.ptrs[i] < this.vectors[i].length) return true;
    return false;
};
```

::::::

**复杂度：** 时间 `O(total)`（每个元素访问一次），空间 `O(k)`。

## 三、总结

「之字形」遍历的本质是 **按列优先** 取元素：第 `col` 步取向量 `col % k` 的第 `col` 个元素。难点在于向量长度不等，需要跳过已耗尽的向量（用 `while` 找下一个有效列）。空间优化可只存「有效向量及其指针」的列表，每取一个就从队头移到队尾（队列轮转法），更优雅。
