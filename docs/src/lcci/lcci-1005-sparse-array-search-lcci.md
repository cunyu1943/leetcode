# [面试题 10.05. 稀疏数组搜索](https://leetcode.cn/problems/sparse-array-search-lcci/)

## 一、题目描述

稀疏数组搜索。有个排好序的字符串数组，其中散布着一些空字符串，编写一种方法，找出给定字符串的位置。

**示例 1：**

```
输入: words = ["at", "", "", "", "ball", "", "", "car", "", "", "dad", "", ""], s = "ta"
输出: -1
说明: 不存在返回 -1。
```

**示例 2：**

```
输入: words = ["at", "", "", "", "ball", "", "", "car", "", "", "dad", "", ""], s = "ball"
输出: 4
```

**提示：**

- `words` 的长度在 `[1, 1000000]` 之间。

---

## 二、解答方法

### 2.1 方法一：二分查找（跳过空串）

**1. 思路**

数组整体有序（空串视为小于任何非空串），可用二分查找。当 `mid` 位置为空串时，左右移动指针直到遇到非空串，再进行比较。若找到非空 `mid` 且 `words[mid] == s` 则返回索引，否则按字典序缩小区间。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int findString(String[] words, String s) {
        int left = 0, right = words.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            while (mid <= right && words[mid].equals("")) mid++;
            if (mid > right) { right = left + (mid - left) / 2 - 1; continue; }
            int cmp = words[mid].compareTo(s);
            if (cmp == 0) return mid;
            else if (cmp < 0) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}
```

```python [Python]
class Solution:
    def findString(self, words: List[str], s: str) -> int:
        left, right = 0, len(words) - 1
        while left <= right:
            mid = (left + right) // 2
            while mid <= right and words[mid] == "":
                mid += 1
            if mid > right:
                right = (left + right) // 2 - 1
                continue
            if words[mid] == s:
                return mid
            elif words[mid] < s:
                left = mid + 1
            else:
                right = mid - 1
        return -1
```

```go [Go]
func findString(words []string, s string) int {
    left, right := 0, len(words)-1
    for left <= right {
        mid := left + (right-left)/2
        for mid <= right && words[mid] == "" {
            mid++
        }
        if mid > right {
            right = (left+right)/2 - 1
            continue
        }
        if words[mid] == s {
            return mid
        } else if words[mid] < s {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -1
}
```

```c [C]
int findString(char** words, int wordsSize, int* returnSize, char* s) {
    int left = 0, right = wordsSize - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        while (mid <= right && strcmp(words[mid], "") == 0) mid++;
        if (mid > right) { right = (left + right) / 2 - 1; continue; }
        int cmp = strcmp(words[mid], s);
        if (cmp == 0) return mid;
        else if (cmp < 0) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```

```cpp [C++]
class Solution {
public:
    int findString(vector<string>& words, string s) {
        int left = 0, right = words.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            while (mid <= right && words[mid] == "") mid++;
            if (mid > right) { right = (left + right) / 2 - 1; continue; }
            if (words[mid] == s) return mid;
            else if (words[mid] < s) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
};
```

```javascript [JavaScript]
var findString = function(words, s) {
    let left = 0, right = words.length - 1;
    while (left <= right) {
        let mid = left + Math.floor((right - left) / 2);
        while (mid <= right && words[mid] === "") mid++;
        if (mid > right) { right = Math.floor((left + right) / 2) - 1; continue; }
        if (words[mid] === s) return mid;
        else if (words[mid] < s) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
};
```

```typescript [TypeScript]
function findString(words: string[], s: string): number {
    let left = 0, right = words.length - 1;
    while (left <= right) {
        let mid = left + Math.floor((right - left) / 2);
        while (mid <= right && words[mid] === "") mid++;
        if (mid > right) { right = Math.floor((left + right) / 2) - 1; continue; }
        if (words[mid] === s) return mid;
        else if (words[mid] < s) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：平均 `O(log n)`，最坏 `O(n)`（大量空串时退化）。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：顺序遍历

**1. 思路**

直接遍历数组，跳过空串，找到与目标相等的非空字符串即返回下标。实现最简单，适合数据量较小的情况。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int findString(String[] words, String s) {
        for (int i = 0; i < words.length; i++) {
            if (words[i].equals(s)) return i;
        }
        return -1;
    }
}
```

```python [Python]
class Solution:
    def findString(self, words: List[str], s: str) -> int:
        for i, w in enumerate(words):
            if w == s:
                return i
        return -1
```

```cpp [C++]
class Solution {
public:
    int findString(vector<string>& words, string s) {
        for (int i = 0; i < words.size(); i++) {
            if (words[i] == s) return i;
        }
        return -1;
    }
};
```

```javascript [JavaScript]
var findString = function(words, s) {
    for (let i = 0; i < words.length; i++) {
        if (words[i] === s) return i;
    }
    return -1;
};
```

```typescript [TypeScript]
function findString(words: string[], s: string): number {
    for (let i = 0; i < words.length; i++) {
        if (words[i] === s) return i;
    }
    return -1;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法           | 时间复杂度      | 空间复杂度 | 特点                       |
| -------------- | --------------- | ---------- | -------------------------- |
| 二分查找       | `O(log n)`~`O(n)` | `O(1)`     | 平均高效，需处理空串       |
| 顺序遍历       | `O(n)`          | `O(1)`     | 实现简单，最坏一致         |

**推荐**：使用二分查找。遇到空串时向一侧收缩指针即可，注意边界条件避免越界。
