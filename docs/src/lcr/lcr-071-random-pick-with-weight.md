# [LCR 071. 按权重生成随机数](https://leetcode.cn/problems/cuyjEf/)



## 一、题目描述

给定一个正整数数组 `w` ，其中 `w[i]` 代表下标 `i` 的权重（下标从 `0` 开始），请写一个函数 `pickIndex` ，它可以随机地获取下标 `i`，选取下标 `i` 的概率与 `w[i]` 成正比。

- 例如，对于 `w = [1, 3]`，挑选下标 `0` 的概率为 `1 / (1 + 3) = 0.25`（即，25%），而选取下标 `1` 的概率为 `3 / (1 + 3) = 0.75`（即，75%）。

也就是说，选取下标 `i` 的概率为 `w[i] / sum(w)` 。



**示例 1：**

```
输入：
["Solution","pickIndex"]
[[[1]],[]]
输出：
[null,0]
```

**示例 2：**

```
输入：
["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]
[[[1,3]],[],[],[],[],[]]
输出：
[null,1,1,1,1,0]
```

**提示：**

- `1 <= w.length <= 10⁴`
- `1 <= w[i] <= 10⁵`
- `pickIndex` 最多调用 `10⁴` 次



## 二、解答方法

### 2.1 方法一：前缀和 + 二分查找

1. **思路**

把权重看成「区间长度」，构造前缀和数组 `pre[i]`（`pre[i] = Σ w[0..i-1]`）。总权重为 `total`：

- 随机生成 `[1, total]` 内的整数 `x`；
- 二分找到第一个满足 `pre[i] >= x` 的 `i`，即选中下标 `i - 1`。

时间：构造 `O(n)`，`pickIndex` `O(log n)`；空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    private int[] pre;
    private int total;
    private Random rand = new Random();

    public Solution(int[] w) {
        pre = new int[w.length + 1];
        for (int i = 0; i < w.length; i++) pre[i + 1] = pre[i] + w[i];
        total = pre[w.length];
    }

    public int pickIndex() {
        int x = rand.nextInt(total) + 1; // [1, total]
        int l = 1, r = pre.length - 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (pre[m] >= x) r = m;
            else l = m + 1;
        }
        return l - 1;
    }
}
```

```python [Python]
import random
import bisect


class Solution:
    def __init__(self, w: List[int]):
        self.pre = [0]
        for x in w:
            self.pre.append(self.pre[-1] + x)
        self.total = self.pre[-1]

    def pickIndex(self) -> int:
        x = random.randint(1, self.total)
        return bisect.bisect_left(self.pre, x) - 1
```

```cpp [C++]
class Solution {
    vector<int> pre;
    int total;
public:
    Solution(vector<int>& w) {
        pre.resize(w.size() + 1);
        for (int i = 0; i < w.size(); i++) pre[i + 1] = pre[i] + w[i];
        total = pre.back();
    }

    int pickIndex() {
        int x = rand() % total + 1;
        int l = 1, r = pre.size() - 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (pre[m] >= x) r = m;
            else l = m + 1;
        }
        return l - 1;
    }
};
```

```go [Go]
type Solution struct {
    pre   []int
    total int
}

func Constructor(w []int) Solution {
    pre := make([]int, len(w)+1)
    for i, x := range w {
        pre[i+1] = pre[i] + x
    }
    return Solution{pre: pre, total: pre[len(w)]}
}

func (s *Solution) PickIndex() int {
    x := rand.Intn(s.total) + 1
    l, r := 1, len(s.pre)-1
    for l < r {
        m := l + (r-l)/2
        if s.pre[m] >= x {
            r = m
        } else {
            l = m + 1
        }
    }
    return l - 1
}
```

```js [JavaScript]
/**
 * @param {number[]} w
 */
var Solution = function (w) {
    this.pre = new Array(w.length + 1);
    this.pre[0] = 0;
    for (let i = 0; i < w.length; i++) this.pre[i + 1] = this.pre[i] + w[i];
    this.total = this.pre[w.length];
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function () {
    const x = Math.floor(Math.random() * this.total) + 1;
    let l = 1, r = this.pre.length - 1;
    while (l < r) {
        const m = (l + r) >> 1;
        if (this.pre[m] >= x) r = m;
        else l = m + 1;
    }
    return l - 1;
};
```

```c [C]
#include <stdlib.h>

typedef struct {
    int* pre;
    int size;
    int total;
} Solution;

Solution* solutionCreate(int* w, int wSize) {
    Solution* obj = (Solution*)calloc(1, sizeof(Solution));
    obj->pre = (int*)malloc((wSize + 1) * sizeof(int));
    obj->pre[0] = 0;
    for (int i = 0; i < wSize; i++) obj->pre[i + 1] = obj->pre[i] + w[i];
    obj->size = wSize + 1;
    obj->total = obj->pre[wSize];
    return obj;
}

int solutionPickIndex(Solution* obj) {
    int x = rand() % obj->total + 1;
    int l = 1, r = obj->size - 1;
    while (l < r) {
        int m = l + (r - l) / 2;
        if (obj->pre[m] >= x) r = m;
        else l = m + 1;
    }
    return l - 1;
}

void solutionFree(Solution* obj) {
    free(obj->pre);
    free(obj);
}
```

```ts [TypeScript]
class Solution {
    private pre: number[];
    private total: number;

    constructor(w: number[]) {
        this.pre = new Array(w.length + 1);
        this.pre[0] = 0;
        for (let i = 0; i < w.length; i++) this.pre[i + 1] = this.pre[i] + w[i];
        this.total = this.pre[w.length];
    }

    pickIndex(): number {
        const x = Math.floor(Math.random() * this.total) + 1;
        let l = 1, r = this.pre.length - 1;
        while (l < r) {
            const m = (l + r) >> 1;
            if (this.pre[m] >= x) r = m;
            else l = m + 1;
        }
        return l - 1;
    }
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：构造 `O(n)`；`pickIndex` `O(log n)`。
- **空间复杂度**：`O(n)`，前缀和数组。

## 三、总结

| 方法 | 构造 | pickIndex | 空间 |
| ---- | ---------- | ---------- | ---------- |
| 前缀和 + 二分 | `O(n)` | `O(log n)` | `O(n)` |

按权重随机选择的本质是把权重映射为「区间长度」，随机落在某个区间即选中该下标。前缀和 + 二分让每次选取降到对数复杂度。

