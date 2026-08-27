# [面试题 16.21. 交换和](https://leetcode.cn/problems/sum-swap-lcci/)

## 一、题目描述

给定两个整数数组，交换一对数值（每个数组中取出一个），使得两个数组所有元素的和相等。返回一个数组，第一个元素是第一个数组中要交换的元素，第二个元素是第二个数组中要交换的元素。若有多个答案，返回任意一个。若无法满足条件，返回空数组。

**示例：**

```
输入：array1 = [4, 1, 2, 1, 1, 2], array2 = [3, 6, 3, 3]
输出：[1, 3]
```

**提示：**

- `1 <= array1.length, array2.length <= 100000`
- `0 <= array1[i], array2[i] <= 100000`

---

## 二、解答方法

### 2.1 方法一：集合查找

**1. 思路**

设 `diff = (sum1 − sum2) / 2`，我们需要在 `array1` 中找 `x`、在 `array2` 中找 `y`，满足 `x − y = diff`（即交换 `x`、`y` 后两和相等）。将 `array2` 放入集合，遍历 `array1` 找 `x`，检查 `x − diff` 是否在 `array2` 中。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] findSwapValues(int[] array1, int[] array2) {
        int sum1 = 0, sum2 = 0;
        Set<Integer> set2 = new HashSet<>();
        for (int x : array1) sum1 += x;
        for (int x : array2) { sum2 += x; set2.add(x); }
        int diff = (sum1 - sum2) / 2;
        if ((sum1 - sum2) % 2 != 0) return new int[]{};
        for (int x : array1) {
            if (set2.contains(x - diff)) return new int[]{x, x - diff};
        }
        return new int[]{};
    }
}
```

```python [Python]
class Solution:
    def findSwapValues(self, array1: List[int], array2: List[int]) -> List[int]:
        s1, s2 = sum(array1), sum(array2)
        if (s1 - s2) % 2 != 0:
            return []
        diff = (s1 - s2) // 2
        set2 = set(array2)
        for x in array1:
            if x - diff in set2:
                return [x, x - diff]
        return []
```

```go [Go]
func findSwapValues(array1 []int, array2 []int) []int {
    s1, s2 := 0, 0
    set2 := map[int]bool{}
    for _, x := range array1 { s1 += x }
    for _, x := range array2 { s2 += x; set2[x] = true }
    if (s1 - s2) % 2 != 0 { return []int{} }
    diff := (s1 - s2) / 2
    for _, x := range array1 {
        if set2[x - diff] { return []int{x, x - diff} }
    }
    return []int{}
}
```

```c [C]
// C 中需手动建哈希表存 array2，逻辑同 Python
```

```cpp [C++]
class Solution {
public:
    vector<int> findSwapValues(vector<int>& array1, vector<int>& array2) {
        int s1 = 0, s2 = 0;
        unordered_set<int> set2(array2.begin(), array2.end());
        for (int x : array1) s1 += x;
        for (int x : array2) s2 += x;
        if ((s1 - s2) % 2 != 0) return {};
        int diff = (s1 - s2) / 2;
        for (int x : array1) {
            if (set2.count(x - diff)) return {x, x - diff};
        }
        return {};
    }
};
```

```javascript [JavaScript]
var findSwapValues = function(array1, array2) {
    let s1 = 0, s2 = 0;
    const set2 = new Set(array2);
    for (const x of array1) s1 += x;
    for (const x of array2) s2 += x;
    if ((s1 - s2) % 2 !== 0) return [];
    const diff = (s1 - s2) / 2;
    for (const x of array1) {
        if (set2.has(x - diff)) return [x, x - diff];
    }
    return [];
};
```

```typescript [TypeScript]
function findSwapValues(array1: number[], array2: number[]): number[] {
    let s1 = 0, s2 = 0;
    const set2 = new Set(array2);
    for (const x of array1) s1 += x;
    for (const x of array2) s2 += x;
    if ((s1 - s2) % 2 !== 0) return [];
    const diff = (s1 - s2) / 2;
    for (const x of array1) {
        if (set2.has(x - diff)) return [x, x - diff];
    }
    return [];
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n + m)`。
- **空间复杂度**：`O(m)`（array2 集合）。

---

### 2.2 方法二：排序双指针

**1. 思路**

排序后用双指针找满足 `x − y = diff` 的数对。无需额外哈希表，但需排序 `O(n log n)`。

**2. 代码实现**

::::::: code-group

```python [Python]
class Solution:
    def findSwapValues(self, array1: List[int], array2: List[int]) -> List[int]:
        s1, s2 = sum(array1), sum(array2)
        if (s1 - s2) % 2 != 0: return []
        diff = (s1 - s2) // 2
        a = sorted(array1); b = sorted(array2)
        i = j = 0
        while i < len(a) and j < len(b):
            d = a[i] - b[j]
            if d == diff: return [a[i], b[j]]
            elif d < diff: i += 1
            else: j += 1
        return []
```

```cpp [C++]
class Solution {
public:
    vector<int> findSwapValues(vector<int>& array1, vector<int>& array2) {
        int s1 = accumulate(array1.begin(), array1.end(), 0);
        int s2 = accumulate(array2.begin(), array2.end(), 0);
        if ((s1 - s2) % 2 != 0) return {};
        int diff = (s1 - s2) / 2;
        sort(array1.begin(), array1.end());
        sort(array2.begin(), array2.end());
        int i = 0, j = 0;
        while (i < array1.size() && j < array2.size()) {
            int d = array1[i] - array2[j];
            if (d == diff) return {array1[i], array2[j]};
            else if (d < diff) i++; else j++;
        }
        return {};
    }
};
```

```javascript [JavaScript]
var findSwapValues = function(array1, array2) {
    const s1 = array1.reduce((a,b)=>a+b,0);
    const s2 = array2.reduce((a,b)=>a+b,0);
    if ((s1 - s2) % 2 !== 0) return [];
    const diff = (s1 - s2) / 2;
    const a = [...array1].sort((x,y)=>x-y);
    const b = [...array2].sort((x,y)=>x-y);
    let i = 0, j = 0;
    while (i < a.length && j < b.length) {
        const d = a[i] - b[j];
        if (d === diff) return [a[i], b[j]];
        else if (d < diff) i++; else j++;
    }
    return [];
};
```

```typescript [TypeScript]
function findSwapValues(array1: number[], array2: number[]): number[] {
    const s1 = array1.reduce((a,b)=>a+b,0);
    const s2 = array2.reduce((a,b)=>a+b,0);
    if ((s1 - s2) % 2 !== 0) return [];
    const diff = (s1 - s2) / 2;
    const a = [...array1].sort((x,y)=>x-y);
    const b = [...array2].sort((x,y)=>x-y);
    let i = 0, j = 0;
    while (i < a.length && j < b.length) {
        const d = a[i] - b[j];
        if (d === diff) return [a[i], b[j]];
        else if (d < diff) i++; else j++;
    }
    return [];
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n log n + m log m)`。
- **空间复杂度**：`O(1)`（排序原地）。

---

## 三、总结

| 方法       | 时间复杂度    | 空间复杂度 | 特点                       |
| ---------- | ------------- | ---------- | -------------------------- |
| 集合查找   | `O(n + m)`    | `O(m)`     | 最优，推荐                 |
| 排序双指针 | `O(n log n)`  | `O(1)`     | 无额外空间                 |

**推荐**：用哈希集合存 `array2`，遍历 `array1` 找 `x` 使 `x − diff ∈ array2`，`O(n+m)` 完成。
