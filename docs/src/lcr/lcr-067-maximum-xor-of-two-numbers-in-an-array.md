# [LCR 067. 数组中两个数的最大异或值](https://leetcode.cn/problems/ms70jA/)



## 一、题目描述

给定一个整数数组 `nums` ，返回 `nums[i] XOR nums[j]` 的最大运算结果，其中 `0 ≤ i ≤ j < n` 。



**示例 1：**

```
输入：nums = [3,10,5,25,2,8]
输出：28
解释：最大运算结果是 5 XOR 25 = 28.
```

**示例 2：**

```
输入：nums = [0]
输出：0
```

**示例 3：**

```
输入：nums = [2,4]
输出：6
```

**提示：**

- `1 <= nums.length <= 2 * 10⁴`
- `0 <= nums[i] <= 2³¹ - 1`



## 二、解答方法

### 2.1 方法一：二进制前缀树

1. **思路**

把每个数的二进制（从最高位第 31 位到第 0 位）插入 Trie。对每个数 `x`，在 Trie 中「尽量走相反位」来最大化异或值：

- 若当前位存在相反分支，走相反分支（该位异或为 1）；
- 否则走相同分支。

每个数查询后更新全局最大值。时间 `O(32n)`，空间 `O(32n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    private static class Node {
        Node[] children = new Node[2];
    }
    public int findMaximumXOR(int[] nums) {
        Node root = new Node();
        for (int x : nums) {
            Node cur = root;
            for (int k = 31; k >= 0; k--) {
                int bit = (x >> k) & 1;
                if (cur.children[bit] == null) cur.children[bit] = new Node();
                cur = cur.children[bit];
            }
        }
        int ans = 0;
        for (int x : nums) {
            Node cur = root;
            int val = 0;
            for (int k = 31; k >= 0; k--) {
                int bit = (x >> k) & 1;
                int want = bit ^ 1; // 期望相反位
                if (cur.children[want] != null) {
                    val |= (1 << k);
                    cur = cur.children[want];
                } else {
                    cur = cur.children[bit];
                }
            }
            ans = Math.max(ans, val);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def findMaximumXOR(self, nums: List[int]) -> int:
        root = {}

        def insert(x):
            cur = root
            for k in range(31, -1, -1):
                bit = (x >> k) & 1
                cur = cur.setdefault(bit, {})

        for x in nums:
            insert(x)

        ans = 0
        for x in nums:
            cur = root
            val = 0
            for k in range(31, -1, -1):
                bit = (x >> k) & 1
                want = bit ^ 1
                if want in cur:
                    val |= (1 << k)
                    cur = cur[want]
                else:
                    cur = cur[bit]
            ans = max(ans, val)
        return ans
```

```cpp [C++]
class Solution {
    struct Node {
        Node* children[2];
        Node() { children[0] = nullptr; children[1] = nullptr; }
    };
public:
    int findMaximumXOR(vector<int>& nums) {
        Node* root = new Node();
        for (int x : nums) {
            Node* cur = root;
            for (int k = 31; k >= 0; k--) {
                int bit = (x >> k) & 1;
                if (!cur->children[bit]) cur->children[bit] = new Node();
                cur = cur->children[bit];
            }
        }
        int ans = 0;
        for (int x : nums) {
            Node* cur = root;
            int val = 0;
            for (int k = 31; k >= 0; k--) {
                int bit = (x >> k) & 1;
                int want = bit ^ 1;
                if (cur->children[want]) {
                    val |= (1 << k);
                    cur = cur->children[want];
                } else {
                    cur = cur->children[bit];
                }
            }
            ans = max(ans, val);
        }
        return ans;
    }
};
```

```go [Go]
type node struct {
    children [2]*node
}

func findMaximumXOR(nums []int) int {
    root := &node{}
    for _, x := range nums {
        cur := root
        for k := 31; k >= 0; k-- {
            bit := (x >> k) & 1
            if cur.children[bit] == nil {
                cur.children[bit] = &node{}
            }
            cur = cur.children[bit]
        }
    }
    ans := 0
    for _, x := range nums {
        cur := root
        val := 0
        for k := 31; k >= 0; k-- {
            bit := (x >> k) & 1
            want := bit ^ 1
            if cur.children[want] != nil {
                val |= (1 << k)
                cur = cur.children[want]
            } else {
                cur = cur.children[bit]
            }
        }
        if val > ans {
            ans = val
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaximumXOR = function (nums) {
    const root = { children: [null, null] };
    for (const x of nums) {
        let cur = root;
        for (let k = 31; k >= 0; k--) {
            const bit = (x >> k) & 1;
            if (!cur.children[bit]) cur.children[bit] = { children: [null, null] };
            cur = cur.children[bit];
        }
    }
    let ans = 0;
    for (const x of nums) {
        let cur = root, val = 0;
        for (let k = 31; k >= 0; k--) {
            const bit = (x >> k) & 1;
            const want = bit ^ 1;
            if (cur.children[want]) {
                val |= (1 << k);
                cur = cur.children[want];
            } else {
                cur = cur.children[bit];
            }
        }
        ans = Math.max(ans, val);
    }
    return ans;
};
```

```c [C]
#include <stdlib.h>

typedef struct Node {
    struct Node* children[2];
} Node;

int findMaximumXOR(int* nums, int numsSize) {
    Node* root = (Node*)calloc(1, sizeof(Node));
    for (int i = 0; i < numsSize; i++) {
        Node* cur = root;
        for (int k = 31; k >= 0; k--) {
            int bit = (nums[i] >> k) & 1;
            if (!cur->children[bit]) cur->children[bit] = (Node*)calloc(1, sizeof(Node));
            cur = cur->children[bit];
        }
    }
    int ans = 0;
    for (int i = 0; i < numsSize; i++) {
        Node* cur = root;
        int val = 0;
        for (int k = 31; k >= 0; k--) {
            int bit = (nums[i] >> k) & 1;
            int want = bit ^ 1;
            if (cur->children[want]) {
                val |= (1 << k);
                cur = cur->children[want];
            } else {
                cur = cur->children[bit];
            }
        }
        if (val > ans) ans = val;
    }
    return ans;
}
```

```ts [TypeScript]
interface XorNode {
    children: (XorNode | null)[];
}

function findMaximumXOR(nums: number[]): number {
    const root: XorNode = { children: [null, null] };
    for (const x of nums) {
        let cur = root;
        for (let k = 31; k >= 0; k--) {
            const bit = (x >> k) & 1;
            if (!cur.children[bit]) cur.children[bit] = { children: [null, null] };
            cur = cur.children[bit]!;
        }
    }
    let ans = 0;
    for (const x of nums) {
        let cur = root, val = 0;
        for (let k = 31; k >= 0; k--) {
            const bit = (x >> k) & 1;
            const want = bit ^ 1;
            if (cur.children[want]) {
                val |= (1 << k);
                cur = cur.children[want]!;
            } else {
                cur = cur.children[bit]!;
            }
        }
        ans = Math.max(ans, val);
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(32n)`，每个数插入 + 查询各 32 位。
- **空间复杂度**：`O(32n)`，Trie 节点。

### 2.2 方法二：哈希集合 + 逐位贪心

1. **思路**

假设答案的前 `k` 位已经确定，判断是否能再让第 `k` 位为 1：

- 把每个数的前 `k` 位（含新位）放入集合；
- 尝试 `candidate = ans | (1 << k)`，若存在 `x` 使得 `(x ^ (x的前缀))` 能在集合中找到……即对每个前缀 `p`，检查 `p ^ candidate` 是否在集合中。

时间 `O(32n)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int findMaximumXOR(int[] nums) {
        int ans = 0;
        for (int k = 31; k >= 0; k--) {
            Set<Integer> set = new HashSet<>();
            for (int x : nums) set.add(x >> k);
            int candidate = ans | (1 << k);
            boolean ok = false;
            for (int p : set) {
                if (set.contains(p ^ candidate)) { ok = true; break; }
            }
            if (ok) ans = candidate;
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def findMaximumXOR(self, nums: List[int]) -> int:
        ans = 0
        for k in range(31, -1, -1):
            s = set(x >> k for x in nums)
            candidate = ans | (1 << k)
            if any(p ^ candidate in s for p in s):
                ans = candidate
        return ans
```

```cpp [C++]
class Solution {
public:
    int findMaximumXOR(vector<int>& nums) {
        int ans = 0;
        for (int k = 31; k >= 0; k--) {
            unordered_set<int> s;
            for (int x : nums) s.insert(x >> k);
            int candidate = ans | (1 << k);
            bool ok = false;
            for (int p : s) {
                if (s.count(p ^ candidate)) { ok = true; break; }
            }
            if (ok) ans = candidate;
        }
        return ans;
    }
};
```

```go [Go]
func findMaximumXOR(nums []int) int {
    ans := 0
    for k := 31; k >= 0; k-- {
        s := map[int]bool{}
        for _, x := range nums {
            s[x>>k] = true
        }
        candidate := ans | (1 << k)
        ok := false
        for p := range s {
            if s[p^candidate] {
                ok = true
                break
            }
        }
        if ok {
            ans = candidate
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaximumXOR = function (nums) {
    let ans = 0;
    for (let k = 31; k >= 0; k--) {
        const s = new Set(nums.map((x) => x >> k));
        const candidate = ans | (1 << k);
        let ok = false;
        for (const p of s) {
            if (s.has(p ^ candidate)) { ok = true; break; }
        }
        if (ok) ans = candidate;
    }
    return ans;
};
```

```c [C]
#include <stdlib.h>

#define HSIZE 40003

int findMaximumXOR(int* nums, int numsSize) {
    int ans = 0;
    int* set = (int*)malloc(HSIZE * sizeof(int));
    for (int k = 31; k >= 0; k--) {
        for (int i = 0; i < HSIZE; i++) set[i] = -1;
        for (int i = 0; i < numsSize; i++) {
            int v = nums[i] >> k;
            int h = ((unsigned)v * 31) % HSIZE;
            while (set[h] != -1 && set[h] != v) h = (h + 1) % HSIZE;
            set[h] = v;
        }
        int candidate = ans | (1 << k);
        int ok = 0;
        for (int i = 0; i < numsSize; i++) {
            int target = (nums[i] >> k) ^ candidate;
            int h = ((unsigned)target * 31) % HSIZE;
            while (set[h] != -1 && set[h] != target) h = (h + 1) % HSIZE;
            if (set[h] == target) { ok = 1; break; }
        }
        if (ok) ans = candidate;
    }
    free(set);
    return ans;
}
```

```ts [TypeScript]
function findMaximumXOR(nums: number[]): number {
    let ans = 0;
    for (let k = 31; k >= 0; k--) {
        const s = new Set(nums.map((x) => x >> k));
        const candidate = ans | (1 << k);
        let ok = false;
        for (const p of s) {
            if (s.has(p ^ candidate)) { ok = true; break; }
        }
        if (ok) ans = candidate;
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(32n)`。
- **空间复杂度**：`O(n)`，集合。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 二进制 Trie | `O(32n)` | `O(32n)` | 直观，一次插入后逐数查询 |
| 哈希逐位贪心 | `O(32n)` | `O(n)` | 空间更省 |

最大异或对经典解法：Trie 按位「贪心走相反位」；哈希法从高位向低位逐步「确认答案的每一位能否为 1」。两者都是 O(位数 × n) 的线性做法。

