# [面试题 10.01. 合并排序的数组](https://leetcode.cn/problems/sorted-merge-lcci/)

## 一、题目描述

给定两个排序后的数组 `A` 和 `B`，其中 `A` 的末端有足够的缓冲空间容纳 `B`。编写一个方法，将 `B` 合并入 `A` 并排序。

初始化 `A` 和 `B` 的元素数量分别为 `m` 和 `n`。

**示例：**

```
输入:
A = [1,2,3,0,0,0], m = 3
B = [2,5,6], n = 3

输出: [1,2,2,3,5,6]
```

**提示：**

- `A.length == n + m`

---

## 二、解答方法

### 2.1 方法一：双指针从后往前（原地合并）

**1. 思路**

由于 `A` 的尾部有足够的空位，我们可以从两个数组的尾部开始，每次取较大的元素放到 `A` 的末尾。这样避免了从前往前合并时数据被覆盖的问题，也无需额外空间。

维护两个指针 `i = m - 1`、`j = n - 1`，以及写入指针 `k = m + n - 1`。当 `A[i] > B[j]` 时把 `A[i]` 放到 `A[k]` 并 `i--`、`k--`，否则放 `B[j]` 并 `j--`、`k--`。最后若 `B` 还有剩余（`j >= 0`），将其依次填入 `A`。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public void merge(int[] A, int m, int[] B, int n) {
        int i = m - 1, j = n - 1, k = m + n - 1;
        while (i >= 0 && j >= 0) {
            A[k--] = A[i] > B[j] ? A[i--] : B[j--];
        }
        while (j >= 0) {
            A[k--] = B[j--];
        }
    }
}
```

```python [Python]
class Solution:
    def merge(self, A: List[int], m: int, B: List[int], n: int) -> None:
        i, j, k = m - 1, n - 1, m + n - 1
        while i >= 0 and j >= 0:
            if A[i] > B[j]:
                A[k] = A[i]
                i -= 1
            else:
                A[k] = B[j]
                j -= 1
            k -= 1
        while j >= 0:
            A[k] = B[j]
            j -= 1
            k -= 1
```

```go [Go]
func merge(A []int, m int, B []int, n int) {
    i, j, k := m-1, n-1, m+n-1
    for i >= 0 && j >= 0 {
        if A[i] > B[j] {
            A[k] = A[i]
            i--
        } else {
            A[k] = B[j]
            j--
        }
        k--
    }
    for j >= 0 {
        A[k] = B[j]
        j--
        k--
    }
}
```

```c [C]
void merge(int* A, int ASize, int m, int* B, int BSize, int n) {
    int i = m - 1, j = n - 1, k = m + n - 1;
    while (i >= 0 && j >= 0) {
        if (A[i] > B[j]) A[k--] = A[i--];
        else A[k--] = B[j--];
    }
    while (j >= 0) A[k--] = B[j--];
}
```

```cpp [C++]
class Solution {
public:
    void merge(vector<int>& A, int m, vector<int>& B, int n) {
        int i = m - 1, j = n - 1, k = m + n - 1;
        while (i >= 0 && j >= 0) {
            A[k--] = A[i] > B[j] ? A[i--] : B[j--];
        }
        while (j >= 0) A[k--] = B[j--];
    }
};
```

```javascript [JavaScript]
var merge = function(A, m, B, n) {
    let i = m - 1, j = n - 1, k = m + n - 1;
    while (i >= 0 && j >= 0) {
        A[k--] = A[i] > B[j] ? A[i--] : B[j--];
    }
    while (j >= 0) A[k--] = B[j--];
};
```

```typescript [TypeScript]
function merge(A: number[], m: number, B: number[], n: number): void {
    let i = m - 1, j = n - 1, k = m + n - 1;
    while (i >= 0 && j >= 0) {
        A[k--] = A[i] > B[j] ? A[i--] : B[j--];
    }
    while (j >= 0) A[k--] = B[j--];
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(m + n)`，每个元素最多被访问一次。
- **空间复杂度**：`O(1)`，原地合并，只使用常数个指针变量。

---

### 2.2 方法二：合并后排序（简单直观）

**1. 思路**

将 `B` 中的元素直接复制到 `A` 尾部的空位，然后对整个 `A` 排序。实现最简单，但效率不如双指针方法。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public void merge(int[] A, int m, int[] B, int n) {
        for (int i = 0; i < n; i++) {
            A[m + i] = B[i];
        }
        Arrays.sort(A);
    }
}
```

```python [Python]
class Solution:
    def merge(self, A: List[int], m: int, B: List[int], n: int) -> None:
        A[m:] = B
        A.sort()
```

```go [Go]
func merge(A []int, m int, B []int, n int) {
    copy(A[m:], B)
    sort.Ints(A)
}
```

```c [C]
int cmp(const void* a, const void* b) { return *(int*)a - *(int*)b; }
void merge(int* A, int ASize, int m, int* B, int BSize, int n) {
    for (int i = 0; i < n; i++) A[m + i] = B[i];
    qsort(A, m + n, sizeof(int), cmp);
}
```

```cpp [C++]
class Solution {
public:
    void merge(vector<int>& A, int m, vector<int>& B, int n) {
        for (int i = 0; i < n; i++) A[m + i] = B[i];
        sort(A.begin(), A.end());
    }
};
```

```javascript [JavaScript]
var merge = function(A, m, B, n) {
    for (let i = 0; i < n; i++) A[m + i] = B[i];
    A.sort((a, b) => a - b);
};
```

```typescript [TypeScript]
function merge(A: number[], m: number, B: number[], n: number): void {
    for (let i = 0; i < n; i++) A[m + i] = B[i];
    A.sort((a, b) => a - b);
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O((m + n) log(m + n))`，取决于排序。
- **空间复杂度**：`O(1)` 或 `O(log(m + n))`（排序递归栈）。

---

## 三、总结

| 方法           | 时间复杂度              | 空间复杂度        | 特点                       |
| -------------- | ----------------------- | ----------------- | -------------------------- |
| 双指针从后往前 | `O(m + n)`              | `O(1)`            | 最优，原地合并，推荐       |
| 合并后排序     | `O((m + n) log(m + n))` | `O(1)`/`O(log)`   | 实现简单，效率略低         |

**推荐**：优先使用双指针从后往前的方法，它在时间复杂度和空间复杂度上均达到最优，且避免了从前往前合并时的数据覆盖问题。
