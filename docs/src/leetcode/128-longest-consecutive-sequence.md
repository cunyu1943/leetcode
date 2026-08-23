# [128. 最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/)



## 一、题目描述

给定一个未排序的整数数组 `nums`，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 `O(n)` 的算法解决此问题。



**示例 1：**

```
输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
```

**示例 2：**

```
输入：nums = [0,3,7,2,5,8,4,6,0,1]
输出：9
解释：最长数字连续序列是 [0, 1, 2, 3, 4, 5, 6, 7, 8]。它的长度为 9。
```

**提示：**

- `0 <= nums.length <= 10⁵`
- `-10⁹ <= nums[i] <= 10⁹`



## 二、解答方法

### 2.1 方法一：哈希表

1. **思路**

暴力枚举每个起点然后向后续延伸，时间复杂度会达到 `O(n³)` 或 `O(n²)`。关键优化点在于：**只需要对「序列的起点」进行延伸统计即可**，即某个数 `x` 只有当 `x - 1` 不在数组中时，才作为连续序列的开头。

- 先把所有数字放入哈希集合，支持 `O(1)` 查找；
- 遍历每个数 `x`，如果 `x - 1` 不存在，说明 `x` 是某个连续序列的起点；
- 不断检查 `x + 1`、`x + 2`……是否在集合中，统计该序列长度；
- 用全局最大值更新答案。

由于每个数只会被作为起点或被「延伸」访问一次，整体为 `O(n)`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) set.add(num);

        int ans = 0;
        for (int x : set) {
            if (!set.contains(x - 1)) {
                int cur = x;
                int len = 1;
                while (set.contains(cur + 1)) {
                    cur++;
                    len++;
                }
                ans = Math.max(ans, len);
            }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        num_set = set(nums)
        ans = 0
        for x in num_set:
            if x - 1 not in num_set:
                cur = x
                length = 1
                while cur + 1 in num_set:
                    cur += 1
                    length += 1
                ans = max(ans, length)
        return ans
```

```cpp [C++]
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> st(nums.begin(), nums.end());
        int ans = 0;
        for (int x : st) {
            if (!st.count(x - 1)) {
                int cur = x, len = 1;
                while (st.count(cur + 1)) {
                    cur++;
                    len++;
                }
                ans = max(ans, len);
            }
        }
        return ans;
    }
};
```

```go [Go]
func longestConsecutive(nums []int) int {
    st := make(map[int]bool)
    for _, num := range nums {
        st[num] = true
    }
    ans := 0
    for x := range st {
        if !st[x-1] {
            cur, length := x, 1
            for st[cur+1] {
                cur++
                length++
            }
            if length > ans {
                ans = length
            }
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
var longestConsecutive = function (nums) {
    const set = new Set(nums);
    let ans = 0;
    for (const x of set) {
        if (!set.has(x - 1)) {
            let cur = x;
            let len = 1;
            while (set.has(cur + 1)) {
                cur++;
                len++;
            }
            ans = Math.max(ans, len);
        }
    }
    return ans;
};
```

```c [C]
#include <stdlib.h>

int cmp(const void* a, const void* b) { return *(int*)a - *(int*)b; }

int longestConsecutive(int* nums, int numsSize) {
    if (numsSize == 0) return 0;
    qsort(nums, numsSize, sizeof(int), cmp);
    int m = 0;
    for (int i = 0; i < numsSize; i++)
        if (i == 0 || nums[i] != nums[i - 1]) nums[m++] = nums[i];
    int ans = 0;
    for (int i = 0; i < m; i++) {
        if (i == 0 || nums[i] - 1 != nums[i - 1]) {
            int cur = nums[i], len = 1;
            while (i + len < m && nums[i + len] == cur + len) len++;
            if (len > ans) ans = len;
        }
    }
    return ans;
}
```

```ts [TypeScript]
function longestConsecutive(nums: number[]): number {
    const set = new Set(nums);
    let ans = 0;
    for (const x of set) {
        if (!set.has(x - 1)) {
            let cur = x;
            let len = 1;
            while (set.has(cur + 1)) {
                cur++;
                len++;
            }
            ans = Math.max(ans, len);
        }
    }
    return ans;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个元素最多被访问两次（一次入集合，一次延伸）。
- **空间复杂度**：`O(n)`，哈希集合存储所有元素。

### 2.2 方法二：并查集

1. **思路**

把「连续的两个数」看作图中的边，用并查集（Union-Find）将相邻的数合并到同一个集合中，最后统计每个集合的大小取最大值。

- 同样先把数字放入哈希集合；
- 遍历每个数 `x`，若 `x + 1` 也在集合中，就把 `x` 与 `x + 1` 合并；
- 遍历结束后，统计并查集中每个连通分量的元素个数，取最大。

该方法思路清晰，但相比方法一多了并查集的维护开销。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums.length == 0) return 0;
        Set<Integer> set = new HashSet<>();
        for (int num : nums) set.add(num);

        UnionFind uf = new UnionFind(set);
        for (int x : set) {
            if (set.contains(x + 1)) uf.union(x, x + 1);
        }

        int ans = 0;
        for (int x : set) ans = Math.max(ans, uf.size(x));
        return ans;
    }

    static class UnionFind {
        Map<Integer, Integer> parent = new HashMap<>();
        Map<Integer, Integer> size = new HashMap<>();
        UnionFind(Set<Integer> set) {
            for (int x : set) { parent.put(x, x); size.put(x, 1); }
        }
        int find(int x) {
            if (parent.get(x) != x) parent.put(x, find(parent.get(x)));
            return parent.get(x);
        }
        void union(int a, int b) {
            int ra = find(a), rb = find(b);
            if (ra == rb) return;
            parent.put(ra, rb);
            size.put(rb, size.get(rb) + size.get(ra));
        }
        int size(int x) { return size.get(find(x)); }
    }
}
```

```python [Python]
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        num_set = set(nums)
        if not num_set:
            return 0

        parent = {x: x for x in num_set}
        size = {x: 1 for x in num_set}

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a, b):
            ra, rb = find(a), find(b)
            if ra == rb:
                return
            parent[ra] = rb
            size[rb] += size[ra]

        for x in num_set:
            if x + 1 in num_set:
                union(x, x + 1)

        return max(size[find(x)] for x in num_set)
```

```cpp [C++]
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        if (nums.empty()) return 0;
        unordered_set<int> st(nums.begin(), nums.end());
        unordered_map<int, int> parent, sz;
        for (int x : st) { parent[x] = x; sz[x] = 1; }

        function<int(int)> find = [&](int x) {
            if (parent[x] != x) parent[x] = find(parent[x]);
            return parent[x];
        };
        auto uni = [&](int a, int b) {
            int ra = find(a), rb = find(b);
            if (ra == rb) return;
            parent[ra] = rb;
            sz[rb] += sz[ra];
        };

        for (int x : st)
            if (st.count(x + 1)) uni(x, x + 1);

        int ans = 0;
        for (int x : st) ans = max(ans, sz[find(x)]);
        return ans;
    }
};
```

```go [Go]
type unionFind struct {
    parent map[int]int
    size   map[int]int
}

func (u *unionFind) find(x int) int {
    if u.parent[x] != x {
        u.parent[x] = u.find(u.parent[x])
    }
    return u.parent[x]
}

func (u *unionFind) union(a, b int) {
    ra, rb := u.find(a), u.find(b)
    if ra == rb {
        return
    }
    u.parent[ra] = rb
    u.size[rb] += u.size[ra]
}

func longestConsecutive(nums []int) int {
    st := make(map[int]bool)
    for _, num := range nums {
        st[num] = true
    }
    if len(st) == 0 {
        return 0
    }
    u := &unionFind{parent: map[int]int{}, size: map[int]int{}}
    for x := range st {
        u.parent[x] = x
        u.size[x] = 1
    }
    for x := range st {
        if st[x+1] {
            u.union(x, x+1)
        }
    }
    ans := 0
    for x := range st {
        if u.size[u.find(x)] > ans {
            ans = u.size[u.find(x)]
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
var longestConsecutive = function (nums) {
    const set = new Set(nums);
    if (set.size === 0) return 0;

    const parent = new Map(), size = new Map();
    for (const x of set) { parent.set(x, x); size.set(x, 1); }

    const find = (x) => {
        while (parent.get(x) !== x) {
            parent.set(x, parent.get(parent.get(x)));
            x = parent.get(x);
        }
        return x;
    };
    const union = (a, b) => {
        const ra = find(a), rb = find(b);
        if (ra === rb) return;
        parent.set(ra, rb);
        size.set(rb, size.get(rb) + size.get(ra));
    };

    for (const x of set) {
        if (set.has(x + 1)) union(x, x + 1);
    }

    let ans = 0;
    for (const x of set) ans = Math.max(ans, size.get(find(x)));
    return ans;
};
```

```c [C]
#include <stdlib.h>

int cmp(const void* a, const void* b) { return *(int*)a - *(int*)b; }

int longestConsecutive(int* nums, int numsSize) {
    if (numsSize == 0) return 0;
    qsort(nums, numsSize, sizeof(int), cmp);
    int m = 0;
    for (int i = 0; i < numsSize; i++)
        if (i == 0 || nums[i] != nums[i - 1]) nums[m++] = nums[i];

    int* parent = (int*)malloc(m * sizeof(int));
    int* sz = (int*)malloc(m * sizeof(int));
    for (int i = 0; i < m; i++) { parent[i] = i; sz[i] = 1; }

    int find(int x) { while (parent[x] != x) parent[x] = parent[parent[x]]; return parent[x]; }
    for (int i = 0; i < m - 1; i++) {
        if (nums[i] + 1 == nums[i + 1]) {
            int ra = find(i), rb = find(i + 1);
            if (ra != rb) { parent[ra] = rb; sz[rb] += sz[ra]; }
        }
    }
    int ans = 0;
    for (int i = 0; i < m; i++) {
        int r = find(i);
        if (sz[r] > ans) ans = sz[r];
    }
    free(parent); free(sz);
    return ans;
}
```

```ts [TypeScript]
function longestConsecutive(nums: number[]): number {
    const set = new Set(nums);
    if (set.size === 0) return 0;

    const parent = new Map<number, number>();
    const size = new Map<number, number>();
    for (const x of set) { parent.set(x, x); size.set(x, 1); }

    const find = (x: number): number => {
        while (parent.get(x)! !== x) {
            parent.set(x, parent.get(parent.get(x)!)!);
            x = parent.get(x)!;
        }
        return x;
    };
    const union = (a: number, b: number) => {
        const ra = find(a), rb = find(b);
        if (ra === rb) return;
        parent.set(ra, rb);
        size.set(rb, size.get(rb)! + size.get(ra)!);
    };

    for (const x of set) if (set.has(x + 1)) union(x, x + 1);

    let ans = 0;
    for (const x of set) ans = Math.max(ans, size.get(find(x))!);
    return ans;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n α(n))`，近似 `O(n)`，其中 `α` 为反阿克曼函数。
- **空间复杂度**：`O(n)`，哈希集合与并查集结构。

### 2.3 方法三：先排序再扫描

1. **思路**

最直观的朴素解法：先把数组排序，再线性扫描统计连续段长度。

- 对 `nums` 排序（升序）；
- 维护当前连续段长度 `len`，遍历时：
  - 若 `nums[i] == nums[i-1]`，说明是重复元素，跳过不计入长度；
  - 若 `nums[i] == nums[i-1] + 1`，连续段 `+1`；
  - 否则，当前段中断，`len` 重置为 `1`；
- 用 `ans` 记录出现的最大 `len`。

排序后相同与相邻元素都挨在一起，因此只需一次扫描即可。时间受排序主导为 `O(n log n)`，是最容易想到的写法。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums.length == 0) return 0;
        Arrays.sort(nums);
        int ans = 1, len = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] == nums[i - 1]) continue;
            if (nums[i] == nums[i - 1] + 1) {
                len++;
            } else {
                len = 1;
            }
            ans = Math.max(ans, len);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        if not nums:
            return 0
        nums.sort()
        ans = len_ = 1
        for i in range(1, len(nums)):
            if nums[i] == nums[i - 1]:
                continue
            if nums[i] == nums[i - 1] + 1:
                len_ += 1
            else:
                len_ = 1
            ans = max(ans, len_)
        return ans
```

```cpp [C++]
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        if (nums.empty()) return 0;
        sort(nums.begin(), nums.end());
        int ans = 1, len = 1;
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] == nums[i - 1]) continue;
            if (nums[i] == nums[i - 1] + 1) len++;
            else len = 1;
            ans = max(ans, len);
        }
        return ans;
    }
};
```

```go [Go]
func longestConsecutive(nums []int) int {
    if len(nums) == 0 {
        return 0
    }
    sort.Ints(nums)
    ans, length := 1, 1
    for i := 1; i < len(nums); i++ {
        if nums[i] == nums[i-1] {
            continue
        }
        if nums[i] == nums[i-1]+1 {
            length++
        } else {
            length = 1
        }
        if length > ans {
            ans = length
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
var longestConsecutive = function (nums) {
    if (nums.length === 0) return 0;
    nums.sort((a, b) => a - b);
    let ans = 1, len = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) continue;
        if (nums[i] === nums[i - 1] + 1) len++;
        else len = 1;
        ans = Math.max(ans, len);
    }
    return ans;
};
```

```c [C]
#include <stdlib.h>

int cmp(const void* a, const void* b) { return *(int*)a - *(int*)b; }

int longestConsecutive(int* nums, int numsSize) {
    if (numsSize == 0) return 0;
    qsort(nums, numsSize, sizeof(int), cmp);
    int ans = 1, len = 1;
    for (int i = 1; i < numsSize; i++) {
        if (nums[i] == nums[i - 1]) continue;
        if (nums[i] == nums[i - 1] + 1) len++;
        else len = 1;
        if (len > ans) ans = len;
    }
    return ans;
}
```

```ts [TypeScript]
function longestConsecutive(nums: number[]): number {
    if (nums.length === 0) return 0;
    nums.sort((a, b) => a - b);
    let ans = 1, len = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) continue;
        if (nums[i] === nums[i - 1] + 1) len++;
        else len = 1;
        ans = Math.max(ans, len);
    }
    return ans;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`，排序主导，扫描为 `O(n)`。
- **空间复杂度**：`O(1)`（若排序为原地）或 `O(n)`（取决于语言排序实现）。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 先排序再扫描 | `O(n log n)` | `O(1)` | 最直观，面试快速写出 |
| 哈希表（起点延伸） | `O(n)` | `O(n)` | 最优解，简洁高效 |
| 并查集 | `O(n α(n))` | `O(n)` | 思路直观，便于扩展 |

实际工程中推荐哈希表法，是本题 `O(n)` 最优解法的标准实现；排序法虽非最优，但代码最短、最易想到。
