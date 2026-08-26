# [面试题 08.06. 汉诺塔问题](https://leetcode.cn/problems/hanota-lcci/)

## 一、题目描述

在经典汉诺塔问题中，有 3 根柱子及 N 个不同大小的穿孔圆盘，盘子可以滑入任意一根柱子。一开始，所有盘子自上而下按升序依次套在第一根柱子上（即每一个盘子只能放在更大的盘子上面）。移动圆盘时受到以下限制：

1. 每次只能移动一个盘子；
2. 盘子只能从柱子顶端滑出移到下一根柱子；
3. 盘子只能叠在比它大的盘子上。

请编写程序，用栈将所有盘子从第一根柱子移到最后一根柱子。你需要原地修改栈。

**示例 1：**

```
输入：A = [2, 1, 0], B = [], C = []
输出：C = [2, 1, 0]
```

**示例 2：**

```
输入：A = [1, 0], B = [], C = []
输出：C = [1, 0]
```

**提示：**

- A 中盘子的数目不大于 14 个。

---

## 二、解答方法

### 2.1 方法一：递归（经典汉诺塔）

**1. 思路**

设要将 `n` 个盘子从源柱 `src` 移到目标柱 `dst`，借助辅助柱 `aux`：

1. 先把上面 `n-1` 个盘子从 `src` 移到 `aux`（借助 `dst`）；
2. 把最大的第 `n` 个盘子从 `src` 移到 `dst`；
3. 再把 `n-1` 个盘子从 `aux` 移到 `dst`（借助 `src`）。

递归基线为 `n == 1` 时直接移动。栈用数组模拟：`pop` 取末尾（顶端）、`push` 到末尾。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public void hanota(List<Integer> A, List<Integer> B, List<Integer> C) {
        dfs(A.size(), A, B, C);
    }
    private void dfs(int n, List<Integer> src, List<Integer> aux, List<Integer> dst) {
        if (n == 1) {
            dst.add(src.remove(src.size() - 1));
            return;
        }
        dfs(n - 1, src, dst, aux);
        dst.add(src.remove(src.size() - 1));
        dfs(n - 1, aux, src, dst);
    }
}
```

```python [Python]
class Solution:
    def hanota(self, A: List[int], B: List[int], C: List[int]) -> None:
        def dfs(n, src, aux, dst):
            if n == 1:
                dst.append(src.pop())
                return
            dfs(n - 1, src, dst, aux)
            dst.append(src.pop())
            dfs(n - 1, aux, src, dst)
        dfs(len(A), A, B, C)
```

```go [Go]
func hanota(A *[]int, B *[]int, C *[]int) {
	var dfs func(n int, src, aux, dst *[]int)
	dfs = func(n int, src, aux, dst *[]int) {
		if n == 1 {
			*dst = append(*dst, (*src)[len(*src)-1])
			*src = (*src)[:len(*src)-1]
			return
		}
		dfs(n-1, src, dst, aux)
		*dst = append(*dst, (*src)[len(*src)-1])
		*src = (*src)[:len(*src)-1]
		dfs(n-1, aux, src, dst)
	}
	dfs(len(*A), A, B, C)
}
```

```c [C]
// 题目以栈语义给出，这里直接操作数组：A、B、C 为动态数组，*ASize 等为当前长度
void dfs(int n, int* A, int* ASize, int* B, int* BSize, int* C, int* CSize) {
    if (n == 1) {
        C[(*CSize)++] = A[--(*ASize)];
        return;
    }
    dfs(n - 1, A, ASize, C, CSize, B, BSize);
    C[(*CSize)++] = A[--(*ASize)];
    dfs(n - 1, B, BSize, A, ASize, C, CSize);
}
void hanota(int* A, int ASize, int* B, int BSize, int* C, int CSize) {
    dfs(ASize, A, &ASize, B, &BSize, C, &CSize);
}
```

```cpp [C++]
class Solution {
public:
    void hanota(vector<int>& A, vector<int>& B, vector<int>& C) {
        function<void(int, vector<int>&, vector<int>&, vector<int>&)> dfs =
            [&](int n, vector<int>& src, vector<int>& aux, vector<int>& dst) {
                if (n == 1) {
                    dst.push_back(src.back());
                    src.pop_back();
                    return;
                }
                dfs(n - 1, src, dst, aux);
                dst.push_back(src.back());
                src.pop_back();
                dfs(n - 1, aux, src, dst);
            };
        dfs(A.size(), A, B, C);
    }
};
```

```javascript [JavaScript]
/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @return {void} Do not return anything, modify C in-place instead.
 */
var hanota = function (A, B, C) {
    const dfs = (n, src, aux, dst) => {
        if (n === 1) {
            dst.push(src.pop());
            return;
        }
        dfs(n - 1, src, dst, aux);
        dst.push(src.pop());
        dfs(n - 1, aux, src, dst);
    };
    dfs(A.length, A, B, C);
};
```

```typescript [TypeScript]
function hanota(A: number[], B: number[], C: number[]): void {
    const dfs = (n: number, src: number[], aux: number[], dst: number[]): void => {
        if (n === 1) {
            dst.push(src.pop()!);
            return;
        }
        dfs(n - 1, src, dst, aux);
        dst.push(src.pop()!);
        dfs(n - 1, aux, src, dst);
    };
    dfs(A.length, A, B, C);
}
```

:::::::

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(2^n)`，经典汉诺塔需要 `2^n - 1` 次移动。
- **空间复杂度**：`O(n)` 递归栈。

---

### 2.2 方法二：迭代（显式栈模拟）

**1. 思路**

递归本质就是系统栈。用显式栈保存每次调用的 `(n, src, aux, dst)` 状态，把递归「展开」成循环：每次弹出栈顶，若 `n == 1` 直接移动；否则按「先压入第二步（aux→dst）、再压入移动操作、最后压入第一步（src→aux）」的逆序入栈，模拟递归的调用顺序。结果与方法一完全一致，但无递归深度限制（栈由数组实现）。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    private static class Frame { int n; List<Integer> src, aux, dst;
        Frame(int n, List<Integer> s, List<Integer> a, List<Integer> d) {
            this.n = n; this.src = s; this.aux = a; this.dst = d;
        }
    }
    public void hanota(List<Integer> A, List<Integer> B, List<Integer> C) {
        java.util.Deque<Frame> st = new java.util.ArrayDeque<>();
        st.push(new Frame(A.size(), A, B, C));
        while (!st.isEmpty()) {
            Frame f = st.pop();
            if (f.n == 1) {
                f.dst.add(f.src.remove(f.src.size() - 1));
                continue;
            }
            // 逆序入栈：先 f.n-1 从 aux 移到 dst（借助 src）
            st.push(new Frame(f.n - 1, f.aux, f.src, f.dst));
            // 再移动最大盘 src -> dst
            st.push(new Frame(1, f.src, f.aux, f.dst));
            // 先 f.n-1 从 src 移到 aux（借助 dst）
            st.push(new Frame(f.n - 1, f.src, f.dst, f.aux));
        }
    }
}
```

```python [Python]
class Solution:
    def hanota(self, A: List[int], B: List[int], C: List[int]) -> None:
        st = [(len(A), A, B, C)]
        while st:
            n, src, aux, dst = st.pop()
            if n == 1:
                dst.append(src.pop())
                continue
            st.append((n - 1, aux, src, dst))
            st.append((1, src, aux, dst))
            st.append((n - 1, src, dst, aux))
```

```go [Go]
func hanota(A *[]int, B *[]int, C *[]int) {
	type frame struct{ n int; src, aux, dst *[]int }
	st := []frame{{len(*A), A, B, C}}
	for len(st) > 0 {
		f := st[len(st)-1]
		st = st[:len(st)-1]
		if f.n == 1 {
			*f.dst = append(*f.dst, (*f.src)[len(*f.src)-1])
			*f.src = (*f.src)[:len(*f.src)-1]
			continue
		}
		st = append(st, frame{f.n - 1, f.aux, f.src, f.dst})
		st = append(st, frame{1, f.src, f.aux, f.dst})
		st = append(st, frame{f.n - 1, f.src, f.dst, f.aux})
	}
}
```

```c [C]
// 迭代版需自行实现栈结构，较繁琐；思路同 Java：用显式栈按逆序压入三步
void hanota(int* A, int ASize, int* B, int BSize, int* C, int CSize) {
    // 递归版已满足题意，迭代版此处省略
}
```

```cpp [C++]
class Solution {
public:
    struct Frame { int n; vector<int>* src; vector<int>* aux; vector<int>* dst; };
    void hanota(vector<int>& A, vector<int>& B, vector<int>& C) {
        vector<Frame> st = {{ (int)A.size(), &A, &B, &C }};
        while (!st.empty()) {
            Frame f = st.back(); st.pop_back();
            if (f.n == 1) {
                f.dst->push_back(f.src->back());
                f.src->pop_back();
                continue;
            }
            st.push_back({ f.n - 1, f.aux, f.src, f.dst });
            st.push_back({ 1, f.src, f.aux, f.dst });
            st.push_back({ f.n - 1, f.src, f.dst, f.aux });
        }
    }
};
```

```javascript [JavaScript]
/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @return {void} Do not return anything, modify C in-place instead.
 */
var hanota = function (A, B, C) {
    const st = [[A.length, A, B, C]];
    while (st.length) {
        const [n, src, aux, dst] = st.pop();
        if (n === 1) {
            dst.push(src.pop());
            continue;
        }
        st.push([n - 1, aux, src, dst]);
        st.push([1, src, aux, dst]);
        st.push([n - 1, src, dst, aux]);
    }
};
```

```typescript [TypeScript]
function hanota(A: number[], B: number[], C: number[]): void {
    const st: [number, number[], number[], number[]][] = [[A.length, A, B, C]];
    while (st.length) {
        const [n, src, aux, dst] = st.pop()!;
        if (n === 1) {
            dst.push(src.pop()!);
            continue;
        }
        st.push([n - 1, aux, src, dst]);
        st.push([1, src, aux, dst]);
        st.push([n - 1, src, dst, aux]);
    }
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(2^n)`。
- **空间复杂度**：`O(n)`，显式栈深度。

---

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| --- | --- | --- | --- |
| 递归 | `O(2^n)` | `O(n)` | 经典解法，思路清晰，推荐 |
| 迭代（显式栈） | `O(2^n)` | `O(n)` | 无递归深度限制，等价实现 |

**推荐解法**：递归解法。核心在于「相信递归」——把 `n-1` 个盘子整体当作一个可移动的子问题，分三步完成转移。注意栈的语义：顶端是数组末尾，用 `pop`/`remove` 操作。

---

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| --- | --- | --- | --- |
| 递归 | `O(2^n)` | `O(n)` | 经典解法，思路清晰，推荐 |

**推荐解法**：递归解法。核心在于「相信递归」——把 `n-1` 个盘子整体当作一个可移动的子问题，分三步完成转移。注意栈的语义：顶端是数组末尾，用 `pop`/`remove` 操作。
