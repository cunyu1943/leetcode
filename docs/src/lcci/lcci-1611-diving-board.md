# [面试题 16.11. 跳水板](https://leetcode.cn/problems/diving-board-lcci/)

## 一、题目描述

你正在使用一堆木板建造跳水板。有两种类型的木板，其中长度较短的木板长度为 `shorter`，长度较长的木板长度为 `longer`。你必须正好使用 `k` 块木板。编写一个方法，生成跳水板所有可能的长度。

返回的长度需要从小到大排列。

**示例 1：**

```
输入：shorter = 1, longer = 2, k = 3
输出： [3,4,5,6]
解释：可以使用 3 块 1 和 2 组成：3,4,5,6
```

**示例 2：**

```
输入：shorter = 1, longer = 2, k = 1
输出：[1,2]
```

**示例 3：**

```
输入：shorter = 2, longer = 4, k = 3
输出：[6,8,10,12]
```

**提示：**

- `0 <= k <= 100000`
- `0 <= shorter <= longer`
- 结果在 32 位整数范围内

## 二、解答方法

### 2.1 方法一：哈希集合去重（通用）

**1. 思路**

枚举长木板的数量 `i`（从 0 到 k），则短木板数量为 `k-i`，总长度为 `longer*i + shorter*(k-i)`。将所有可能长度存入哈希集合去重（当 `shorter == longer` 时重复），最后排序输出。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int[] divingBoard(int shorter, int longer, int k) {
        if (k == 0) return new int[0];
        Set<Integer> set = new HashSet<>();
        for (int i = 0; i <= k; i++) {
            set.add(shorter * (k - i) + longer * i);
        }
        int[] res = new int[set.size()];
        int idx = 0;
        for (int val : set) res[idx++] = val;
        Arrays.sort(res);
        return res;
    }
}
```

```python [Python]
class Solution:
    def divingBoard(self, shorter: int, longer: int, k: int) -> List[int]:
        if k == 0: return []
        return sorted({shorter * (k - i) + longer * i for i in range(k + 1)})
```

```go [Go]
func divingBoard(shorter int, longer int, k int) []int {
    if k == 0 { return []int{} }
    set := make(map[int]bool)
    for i := 0; i <= k; i++ {
        set[shorter*(k-i)+longer*i] = true
    }
    res := make([]int, 0, len(set))
    for v := range set {
        res = append(res, v)
    }
    sort.Ints(res)
    return res
}
```

```c [C]
#include <stdlib.h>
#include <stdbool.h>
int cmp(const void* a, const void* b) { return *(int*)a - *(int*)b; }
int* divingBoard(int shorter, int longer, int k, int* returnSize) {
    if (k == 0) { *returnSize = 0; return NULL; }
    int* arr = (int*)malloc((k+1) * sizeof(int));
    int count = 0;
    for (int i = 0; i <= k; i++) {
        arr[count++] = shorter * (k - i) + longer * i;
    }
    qsort(arr, count, sizeof(int), cmp);
    int* res = (int*)malloc(count * sizeof(int));
    int j = 0;
    for (int i = 0; i < count; i++) {
        if (i == 0 || arr[i] != arr[i-1]) res[j++] = arr[i];
    }
    free(arr);
    *returnSize = j;
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> divingBoard(int shorter, int longer, int k) {
        if (k == 0) return {};
        unordered_set<int> set;
        for (int i = 0; i <= k; i++) {
            set.insert(shorter * (k - i) + longer * i);
        }
        vector<int> res(set.begin(), set.end());
        sort(res.begin(), res.end());
        return res;
    }
};
```

```javascript [JavaScript]
var divingBoard = function(shorter, longer, k) {
    if (k === 0) return [];
    const set = new Set();
    for (let i = 0; i <= k; i++) {
        set.add(shorter * (k - i) + longer * i);
    }
    return Array.from(set).sort((a, b) => a - b);
};
```

```typescript [TypeScript]
function divingBoard(shorter: number, longer: number, k: number): number[] {
    if (k === 0) return [];
    const set = new Set<number>();
    for (let i = 0; i <= k; i++) {
        set.add(shorter * (k - i) + longer * i);
    }
    return Array.from(set).sort((a, b) => a - b);
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(k log k)`，遍历 `k+1` 次，排序需要 `O(k log k)`。
- **空间复杂度**：`O(k)`，存储集合和结果。

---

### 2.2 方法二：数学推导（等差数列，最优）

**1. 思路**

总长度只取决于长木板的数量 `i`。当 `shorter == longer` 时，所有组合长度相同，只有一种结果 `[shorter * k]`。否则，长度构成等差数列，从 `shorter * k` 到 `longer * k`，公差 `longer - shorter`，共 `k+1` 项。直接构造结果，无需排序或去重。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int[] divingBoard(int shorter, int longer, int k) {
        if (k == 0) return new int[0];
        if (shorter == longer) return new int[]{shorter * k};
        int diff = longer - shorter;
        int[] res = new int[k + 1];
        for (int i = 0; i <= k; i++) {
            res[i] = shorter * k + i * diff;
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def divingBoard(self, shorter: int, longer: int, k: int) -> List[int]:
        if k == 0: return []
        if shorter == longer: return [shorter * k]
        diff = longer - shorter
        return [shorter * k + i * diff for i in range(k + 1)]
```

```go [Go]
func divingBoard(shorter int, longer int, k int) []int {
    if k == 0 { return []int{} }
    if shorter == longer { return []int{shorter * k} }
    diff := longer - shorter
    res := make([]int, k+1)
    for i := 0; i <= k; i++ {
        res[i] = shorter*k + i*diff
    }
    return res
}
```

```c [C]
int* divingBoard(int shorter, int longer, int k, int* returnSize) {
    if (k == 0) { *returnSize = 0; return NULL; }
    if (shorter == longer) {
        int* res = (int*)malloc(sizeof(int));
        res[0] = shorter * k;
        *returnSize = 1;
        return res;
    }
    *returnSize = k + 1;
    int* res = (int*)malloc((k+1) * sizeof(int));
    int diff = longer - shorter;
    for (int i = 0; i <= k; i++) {
        res[i] = shorter * k + i * diff;
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> divingBoard(int shorter, int longer, int k) {
        if (k == 0) return {};
        if (shorter == longer) return {shorter * k};
        int diff = longer - shorter;
        vector<int> res(k + 1);
        for (int i = 0; i <= k; i++) {
            res[i] = shorter * k + i * diff;
        }
        return res;
    }
};
```

```javascript [JavaScript]
var divingBoard = function(shorter, longer, k) {
    if (k === 0) return [];
    if (shorter === longer) return [shorter * k];
    const diff = longer - shorter;
    const res = new Array(k + 1);
    for (let i = 0; i <= k; i++) {
        res[i] = shorter * k + i * diff;
    }
    return res;
};
```

```typescript [TypeScript]
function divingBoard(shorter: number, longer: number, k: number): number[] {
    if (k === 0) return [];
    if (shorter === longer) return [shorter * k];
    const diff = longer - shorter;
    const res: number[] = new Array(k + 1);
    for (let i = 0; i <= k; i++) {
        res[i] = shorter * k + i * diff;
    }
    return res;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(k)`，直接构造结果。
- **空间复杂度**：`O(k)`，存储结果数组。

---

## 三、总结

| 方法                 | 时间复杂度   | 空间复杂度 | 特点           |
| -------------------- | ------------ | ---------- | -------------- |
| 哈希集合去重         | `O(k log k)` | `O(k)`     | 通用但较慢     |
| 数学推导（等差数列） | `O(k)`       | `O(k)`     | **最优**，推荐 |

**推荐**：面试中首选 **方法二（数学推导）**，直接利用等差数列特性，避免排序和哈希表，效率更高。注意 `k=0` 返回空数组，`shorter==longer` 时只有一种长度。

---

如果需要继续解答该列表中的下一题，请告知题目名称或编号。