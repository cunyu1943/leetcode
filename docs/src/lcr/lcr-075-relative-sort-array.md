# [LCR 075. 数组的相对排序](https://leetcode.cn/problems/0H97ZC/)



## 一、题目描述

给你两个数组，`arr1` 和 `arr2`，`arr2` 中的元素各不相同，`arr2` 中的每个元素都出现在 `arr1` 中。

对 `arr1` 中的元素进行排序，使 `arr1` 中项的相对顺序和 `arr2` 中的相对顺序相同。未在 `arr2` 中出现过的元素需要按照升序放在 `arr1` 的末尾。



**示例 1：**

```
输入：arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
输出：[2,2,2,1,4,3,3,9,6,7,19]
```

**提示：**

- `1 <= arr1.length, arr2.length <= 1000`
- `0 <= arr1[i], arr2[i] <= 1000`
- `arr2` 中的元素 `arr2[i]` 各不相同
- `arr2` 中的每个元素 `arr2[i]` 都在 `arr1` 中



## 二、解答方法

### 2.1 方法一：计数排序

1. **思路**

数值范围 `[0, 1000]`，用计数数组 `cnt` 统计 `arr1` 中各值出现次数：

- 先按 `arr2` 的顺序依次输出 `cnt[arr2[i]]` 个该值；
- 再从 `0` 到 `1000` 输出剩余未在 `arr2` 中出现的值（升序）。

时间 `O(n + max)`，空间 `O(max)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] relativeSortArray(int[] arr1, int[] arr2) {
        int[] cnt = new int[1001];
        for (int x : arr1) cnt[x]++;
        int[] res = new int[arr1.length];
        int idx = 0;
        for (int x : arr2) {
            while (cnt[x]-- > 0) res[idx++] = x;
        }
        for (int v = 0; v <= 1000; v++) {
            while (cnt[v]-- > 0) res[idx++] = v;
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def relativeSortArray(self, arr1: List[int], arr2: List[int]) -> List[int]:
        cnt = [0] * 1001
        for x in arr1:
            cnt[x] += 1
        res = []
        for x in arr2:
            res += [x] * cnt[x]
            cnt[x] = 0
        for v in range(1001):
            res += [v] * cnt[v]
        return res
```

```cpp [C++]
class Solution {
public:
    vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {
        int cnt[1001] = {0};
        for (int x : arr1) cnt[x]++;
        vector<int> res;
        for (int x : arr2)
            while (cnt[x]--) res.push_back(x);
        for (int v = 0; v <= 1000; v++)
            while (cnt[v]--) res.push_back(v);
        return res;
    }
};
```

```go [Go]
func relativeSortArray(arr1 []int, arr2 []int) []int {
    cnt := [1001]int{}
    for _, x := range arr1 {
        cnt[x]++
    }
    res := make([]int, 0, len(arr1))
    for _, x := range arr2 {
        for cnt[x] > 0 {
            res = append(res, x)
            cnt[x]--
        }
    }
    for v := 0; v <= 1000; v++ {
        for cnt[v] > 0 {
            res = append(res, v)
            cnt[v]--
        }
    }
    return res
}
```

```js [JavaScript]
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function (arr1, arr2) {
    const cnt = new Array(1001).fill(0);
    for (const x of arr1) cnt[x]++;
    const res = [];
    for (const x of arr2) {
        while (cnt[x]-- > 0) res.push(x);
    }
    for (let v = 0; v <= 1000; v++) {
        while (cnt[v]-- > 0) res.push(v);
    }
    return res;
};
```

```c [C]
#include <stdlib.h>

int* relativeSortArray(int* arr1, int arr1Size, int* arr2, int arr2Size, int* returnSize) {
    int* cnt = (int*)calloc(1001, sizeof(int));
    for (int i = 0; i < arr1Size; i++) cnt[arr1[i]]++;
    int* res = (int*)malloc(arr1Size * sizeof(int));
    int idx = 0;
    for (int i = 0; i < arr2Size; i++) {
        while (cnt[arr2[i]]-- > 0) res[idx++] = arr2[i];
    }
    for (int v = 0; v <= 1000; v++) {
        while (cnt[v]-- > 0) res[idx++] = v;
    }
    free(cnt);
    *returnSize = idx;
    return res;
}
```

```ts [TypeScript]
function relativeSortArray(arr1: number[], arr2: number[]): number[] {
    const cnt: number[] = new Array(1001).fill(0);
    for (const x of arr1) cnt[x]++;
    const res: number[] = [];
    for (const x of arr2) {
        while (cnt[x]-- > 0) res.push(x);
    }
    for (let v = 0; v <= 1000; v++) {
        while (cnt[v]-- > 0) res.push(v);
    }
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n + 1001)`。
- **空间复杂度**：`O(1001)`，计数数组。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 计数排序 | `O(n + max)` | `O(max)` | 标准解法，推荐 |

数值范围有限时，计数排序天然支持「按指定顺序 + 升序」的双重排序要求：先按 arr2 顺序输出，再按数值升序输出剩余元素。

