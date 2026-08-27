# [面试题 17.19. 消失的两个数字](https://leetcode.cn/problems/missing-two-lcci/)

## 一、题目描述

给定一个数组，包含从 `1` 到 `N` 所有的整数，但其中缺了两个数字。请在 `O(N)` 时间内找出这两个缺失的数字。返回的数组顺序任意。

**示例：**

```
输入: [1]
输出: [2,3]（N=3，数组长度本应为 3，缺 2、3）

输入: [2,3]
输出: [1,4]（N=4，缺 1、4）
```

**提示：**

- `nums.length <= 30000`

---

## 二、解答方法

### 2.1 方法一：位掩码（原地标记）

**1. 思路**

由于 `N = nums.length + 2`，可用 `nums` 数组本身作为标记（值 `x` 出现则把下标 `x-1` 处的元素置负），剩余仍为正的位置即缺失数字。注意元素可能被标负，访问时需取绝对值。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] missingTwo(int[] nums) {
        int n = nums.length + 2;
        for (int x : nums) {
            int idx = Math.abs(x) - 1;
            if (idx < nums.length) nums[idx] = -Math.abs(nums[idx]);
        }
        int[] res = new int[2]; int k = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0) res[k++] = i + 1;
        }
        res[k] = n; // 最后一个必为 n 或 n-1（当 n 超出数组索引范围时）
        // 注意 n 可能大于 nums.length，单独判断
        boolean hasN = false;
        for (int x : nums) if (Math.abs(x) == n) hasN = true;
        if (!hasN) { /* 占位，下面统一处理 */ }
        // 修正：缺失的两个数都可能 > nums.length
        return fix(nums, n);
    }
    private int[] fix(int[] nums, int n) {
        boolean[] seen = new boolean[n + 1];
        for (int x : nums) seen[Math.abs(x)] = true;
        int[] res = new int[2]; int k = 0;
        for (int i = 1; i <= n; i++) if (!seen[i]) res[k++] = i;
        return res;
    }
}
```

```python [Python]
class Solution:
    def missingTwo(self, nums: List[int]) -> List[int]:
        n = len(nums) + 2
        seen = [False] * (n + 1)
        for x in nums:
            seen[x] = True
        return [i for i in range(1, n + 1) if not seen[i]]
```

```go [Go]
func missingTwo(nums []int) []int {
    n := len(nums) + 2
    seen := make([]bool, n+1)
    for _, x := range nums {
        seen[x] = true
    }
    res := []int{}
    for i := 1; i <= n; i++ {
        if !seen[i] { res = append(res, i) }
    }
    return res
}
```

```c [C]
// 位图法在 C 中用数组标记，逻辑同 Python
```

```cpp [C++]
class Solution {
public:
    vector<int> missingTwo(vector<int>& nums) {
        int n = nums.size() + 2;
        vector<bool> seen(n + 1, false);
        for (int x : nums) seen[x] = true;
        vector<int> res;
        for (int i = 1; i <= n; i++) if (!seen[i]) res.push_back(i);
        return res;
    }
};
```

```javascript [JavaScript]
var missingTwo = function(nums) {
    const n = nums.length + 2;
    const seen = new Array(n + 1).fill(false);
    for (const x of nums) seen[x] = true;
    const res = [];
    for (let i = 1; i <= n; i++) if (!seen[i]) res.push(i);
    return res;
};
```

```typescript [TypeScript]
function missingTwo(nums: number[]): number[] {
    const n = nums.length + 2;
    const seen = new Array(n + 1).fill(false);
    for (const x of nums) seen[x] = true;
    const res: number[] = [];
    for (let i = 1; i <= n; i++) if (!seen[i]) res.push(i);
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，其中 `n = N`。
- **空间复杂度**：`O(n)`（seen 数组）。可原地用正负号压到 `O(1)` 额外。

---

### 2.2 方法二：异或 + 分组（O(1) 空间）

**1. 思路**

先对所有 `1..N` 与 `nums` 异或，得到两缺失数异或值 `xor`。取 `xor` 任意为 1 的位，将数字按该位分成两组，分别异或得到两个数。无需额外数组，真正 `O(1)` 空间。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] missingTwo(int[] nums) {
        int n = nums.length + 2;
        int xor = 0;
        for (int i = 1; i <= n; i++) xor ^= i;
        for (int x : nums) xor ^= x;
        int bit = xor & -xor; // 最低位 1
        int a = 0, b = 0;
        for (int i = 1; i <= n; i++) {
            if ((i & bit) != 0) a ^= i; else b ^= i;
        }
        for (int x : nums) {
            if ((x & bit) != 0) a ^= x; else b ^= x;
        }
        return new int[]{a, b};
    }
}
```

```python [Python]
class Solution:
    def missingTwo(self, nums: List[int]) -> List[int]:
        n = len(nums) + 2
        xor = 0
        for i in range(1, n + 1): xor ^= i
        for x in nums: xor ^= x
        bit = xor & -xor
        a = b = 0
        for i in range(1, n + 1):
            if i & bit: a ^= i
            else: b ^= i
        for x in nums:
            if x & bit: a ^= x
            else: b ^= x
        return [a, b]
```

```cpp [C++]
class Solution {
public:
    vector<int> missingTwo(vector<int>& nums) {
        int n = nums.size() + 2;
        int xorv = 0;
        for (int i = 1; i <= n; i++) xorv ^= i;
        for (int x : nums) xorv ^= x;
        int bit = xorv & -xorv;
        int a = 0, b = 0;
        for (int i = 1; i <= n; i++) {
            if (i & bit) a ^= i; else b ^= i;
        }
        for (int x : nums) {
            if (x & bit) a ^= x; else b ^= x;
        }
        return {a, b};
    }
};
```

```javascript [JavaScript]
var missingTwo = function(nums) {
    const n = nums.length + 2;
    let xor = 0;
    for (let i = 1; i <= n; i++) xor ^= i;
    for (const x of nums) xor ^= x;
    const bit = xor & -xor;
    let a = 0, b = 0;
    for (let i = 1; i <= n; i++) {
        if (i & bit) a ^= i; else b ^= i;
    }
    for (const x of nums) {
        if (x & bit) a ^= x; else b ^= x;
    }
    return [a, b];
};
```

```typescript [TypeScript]
function missingTwo(nums: number[]): number[] {
    const n = nums.length + 2;
    let xor = 0;
    for (let i = 1; i <= n; i++) xor ^= i;
    for (const x of nums) xor ^= x;
    const bit = xor & -xor;
    let a = 0, b = 0;
    for (let i = 1; i <= n; i++) {
        if (i & bit) a ^= i; else b ^= i;
    }
    for (const x of nums) {
        if (x & bit) a ^= x; else b ^= x;
    }
    return [a, b];
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度 | 特点                       |
| -------------- | ---------- | ---------- | -------------------------- |
| 位掩码标记     | `O(n)`     | `O(n)`     | 直观，易实现               |
| 异或 + 分组    | `O(n)`     | `O(1)`     | 最优空间，推荐             |

**推荐**：追求 `O(1)` 空间用异或分组法；否则位图标记法更直观。
