# [89. 格雷编码](https://leetcode.cn/problems/gray-code/)



## 一、题目描述

`n` 位格雷码序列 是一个由 `2^n` 个整数组成的序列，其中：

-   每个整数都在范围 `[0, 2^n - 1]` 内（含 `0` 和 `2^n - 1`）
-   第一个整数是 `0`
-   一个整数在序列中出现 **不超过一次**
-   每对相邻 整数的二进制表示 **恰好一位不同**

给你一个整数 `n`，返回任一有效的 **n 位格雷码序列**。



**示例 1：**

```
输入：n = 2
输出：[0,1,3,2]
解释：[0,1,3,2] 的二进制表示是 [00,01,11,10]，相邻数恰好一位不同。
```

**示例 2：**

```
输入：n = 1
输出：[0,1]
```

**提示：**

-   `1 <= n <= 16`



## 二、解答方法

### 2.1 方法一：镜面反射（公式法）


1. **思路**

第 `i` 个格雷码为 `i ^ (i >> 1)`。直接生成 `0` 到 `2^n - 1` 的格雷码即可。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public List<Integer> grayCode(int n) {
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < (1 << n); i++) res.add(i ^ (i >> 1));
        return res;
    }
}
```

```python [Python]
class Solution:
    def grayCode(self, n: int) -> List[int]:
        return [i ^ (i >> 1) for i in range(1 << n)]
```

```go [Go]
func grayCode(n int) []int {
    res := make([]int, 1<<n)
    for i := 0; i < (1 << n); i++ { res[i] = i ^ (i >> 1) }
    return res
}
```

```c [C]
int* grayCode(int n, int* returnSize) {
    int size = 1 << n;
    int* res = (int*)malloc(sizeof(int) * size);
    for (int i = 0; i < size; i++) res[i] = i ^ (i >> 1);
    *returnSize = size;
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> grayCode(int n) {
        vector<int> res;
        for (int i = 0; i < (1 << n); i++) res.push_back(i ^ (i >> 1));
        return res;
    }
};
```

```javascript [JavaScript]
var grayCode = function(n) {
    const res = [];
    for (let i = 0; i < (1 << n); i++) res.push(i ^ (i >> 1));
    return res;
};
```

```typescript [TypeScript]
function grayCode(n: number): number[] {
    const res: number[] = [];
    for (let i = 0; i < (1 << n); i++) res.push(i ^ (i >> 1));
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(2^n)`，生成所有码。
- **空间复杂度**：`O(2^n)`，结果数组（不计返回则为 `O(1)`）。

### 2.2 方法二：递推构造（对称复制）


1. **思路**

从 `[0]` 开始，每轮把当前结果逆序，并在每个元素前加 `1`（即加 `1 << (k-1)`），拼接到原序列后，得到下一阶格雷码。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public List<Integer> grayCode(int n) {
        List<Integer> res = new ArrayList<>();
        res.add(0);
        for (int i = 1; i <= n; i++) {
            int add = 1 << (i - 1);
            for (int j = res.size() - 1; j >= 0; j--) res.add(res.get(j) + add);
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def grayCode(self, n: int) -> List[int]:
        res = [0]
        for i in range(1, n + 1):
            add = 1 << (i - 1)
            for x in reversed(res):
                res.append(x + add)
        return res
```

```go [Go]
func grayCode(n int) []int {
    res := []int{0}
    for i := 1; i <= n; i++ {
        add := 1 << (i - 1)
        size := len(res)
        for j := size - 1; j >= 0; j-- { res = append(res, res[j] + add) }
    }
    return res
}
```

```c [C]
int* grayCode(int n, int* returnSize) {
    int cap = 1;
    for (int i = 0; i < n; i++) cap <<= 1;
    int* res = (int*)malloc(sizeof(int) * cap);
    int size = 1;
    res[0] = 0;
    for (int i = 1; i <= n; i++) {
        int add = 1 << (i - 1);
        for (int j = size - 1; j >= 0; j--) res[size + (size - 1 - j)] = res[j] + add;
        size <<= 1;
    }
    *returnSize = cap;
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> grayCode(int n) {
        vector<int> res = {0};
        for (int i = 1; i <= n; i++) {
            int add = 1 << (i - 1);
            for (int j = res.size() - 1; j >= 0; j--) res.push_back(res[j] + add);
        }
        return res;
    }
};
```

```javascript [JavaScript]
var grayCode = function(n) {
    const res = [0];
    for (let i = 1; i <= n; i++) {
        const add = 1 << (i - 1);
        for (let j = res.length - 1; j >= 0; j--) res.push(res[j] + add);
    }
    return res;
};
```

```typescript [TypeScript]
function grayCode(n: number): number[] {
    const res: number[] = [0];
    for (let i = 1; i <= n; i++) {
        const add = 1 << (i - 1);
        for (let j = res.length - 1; j >= 0; j--) res.push(res[j] + add);
    }
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(2^n)`，每轮长度翻倍。
- **空间复杂度**：`O(2^n)`，结果数组。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 镜面反射（公式） | `O(2^n)` | `O(2^n)` | 一行公式，最简洁 |
| 递推构造（对称复制） | `O(2^n)` | `O(2^n)` | 体现格雷码生成原理 |
