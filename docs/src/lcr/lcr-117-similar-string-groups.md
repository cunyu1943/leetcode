# [LCR 117. 相似的字符串](https://leetcode.cn/problems/H6lPxb/)



## 一、题目描述

如果交换字符串 `X` 中的两个不同位置的字母，使得它和字符串 `Y` 相等，那么称 `X` 和 `Y` 两个字符串相似。如果这两个字符串本身是相等的，那它们也是相似的。

例如，`"tars"` 和 `"rats"` 是相似的 (交换 `0` 与 `2` 的位置)； `"rats"` 和 `"arts"` 也是相似的，但是 `"star"` 不与 `"tars"`，`"rats"`，或 `"arts"` 相似。

总之，它们通过相似性形成了两个关联组：`{"tars", "rats", "arts"}` 和 `{"star"}`。注意，`"tars"` 和 `"arts"` 在同一组中，即使它们并不相似。形式上，对每个组而言，要确定一个单词在组中，只需要这个词和该组中 **一个** 单词相似。

给你一个字符串列表 `strs`。列表中的每个字符串都是 `strs` 中其它所有字符串的一个 **字母异位词** 。请问 `strs` 中有多少个 **相似字符串组**？



**示例 1：**

```
输入：strs = ["tars","rats","arts","star"]
输出：2
```

**示例 2：**

```
输入：strs = ["omv","ovm"]
输出：1
```

**提示：**

- `1 <= strs.length <= 300`
- `1 <= strs[i].length <= 300`
- `strs[i]` 只包含小写字母
- `strs` 中的所有单词都具有相同的长度，且是彼此的字母异位词



## 二、解答方法

### 2.1 方法一：并查集

1. **思路**

「相似」关系是等价关系（可传递），把相似的字符串并入同一集合，组数即连通分量数：

- 初始化每个字符串单独成组；
- 两两比较，若相似则 `union`；
- 统计根节点数量。

相似判断：逐位比较，统计不同位置数，`0` 或 `2` 即相似（异位词性质保证不同位置必为偶数）。

时间 `O(n² L)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int numSimilarGroups(String[] strs) {
        int n = strs.length;
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (isSimilar(strs[i], strs[j])) {
                    int ri = find(parent, i), rj = find(parent, j);
                    if (ri != rj) parent[ri] = rj;
                }
            }
        }
        int cnt = 0;
        for (int i = 0; i < n; i++) if (find(parent, i) == i) cnt++;
        return cnt;
    }
    private boolean isSimilar(String a, String b) {
        int diff = 0;
        for (int i = 0; i < a.length(); i++) {
            if (a.charAt(i) != b.charAt(i) && ++diff > 2) return false;
        }
        return true; // 异位词：diff 为 0 或 2
    }
    private int find(int[] parent, int x) {
        if (parent[x] != x) parent[x] = find(parent, parent[x]);
        return parent[x];
    }
}
```

```python [Python]
class Solution:
    def numSimilarGroups(self, strs: List[str]) -> int:
        n = len(strs)
        parent = list(range(n))

        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def similar(a, b):
            diff = sum(1 for x, y in zip(a, b) if x != y)
            return diff == 0 or diff == 2

        for i in range(n):
            for j in range(i + 1, n):
                if similar(strs[i], strs[j]):
                    ri, rj = find(i), find(j)
                    if ri != rj:
                        parent[ri] = rj
        return sum(1 for i in range(n) if find(i) == i)
```

```cpp [C++]
class Solution {
public:
    int numSimilarGroups(vector<string>& strs) {
        int n = strs.size();
        vector<int> parent(n);
        iota(parent.begin(), parent.end(), 0);
        function<int(int)> find = [&](int x) {
            if (parent[x] != x) parent[x] = find(parent[x]);
            return parent[x];
        };
        auto similar = [&](string& a, string& b) {
            int diff = 0;
            for (int i = 0; i < a.size(); i++)
                if (a[i] != b[i] && ++diff > 2) return false;
            return true;
        };
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                if (similar(strs[i], strs[j])) {
                    int ri = find(i), rj = find(j);
                    if (ri != rj) parent[ri] = rj;
                }
        int cnt = 0;
        for (int i = 0; i < n; i++) if (find(i) == i) cnt++;
        return cnt;
    }
};
```

```go [Go]
func numSimilarGroups(strs []string) int {
    n := len(strs)
    parent := make([]int, n)
    for i := range parent {
        parent[i] = i
    }
    var find func(x int) int
    find = func(x int) int {
        if parent[x] != x {
            parent[x] = find(parent[x])
        }
        return parent[x]
    }
    similar := func(a, b string) bool {
        diff := 0
        for i := 0; i < len(a); i++ {
            if a[i] != b[i] {
                diff++
                if diff > 2 {
                    return false
                }
            }
        }
        return true
    }
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            if similar(strs[i], strs[j]) {
                ri, rj := find(i), find(j)
                if ri != rj {
                    parent[ri] = rj
                }
            }
        }
    }
    cnt := 0
    for i := 0; i < n; i++ {
        if find(i) == i {
            cnt++
        }
    }
    return cnt
}
```

```js [JavaScript]
/**
 * @param {string[]} strs
 * @return {number}
 */
var numSimilarGroups = function (strs) {
    const n = strs.length;
    const parent = Array.from({ length: n }, (_, i) => i);
    const find = (x) => {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    };
    const similar = (a, b) => {
        let diff = 0;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i] && ++diff > 2) return false;
        }
        return true;
    };
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (similar(strs[i], strs[j])) {
                const ri = find(i), rj = find(j);
                if (ri !== rj) parent[ri] = rj;
            }
        }
    }
    let cnt = 0;
    for (let i = 0; i < n; i++) if (find(i) === i) cnt++;
    return cnt;
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

static int find(int* parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}

static int similar(char* a, char* b) {
    int diff = 0;
    for (int i = 0; a[i]; i++) {
        if (a[i] != b[i] && ++diff > 2) return 0;
    }
    return 1;
}

int numSimilarGroups(char** strs, int strsSize) {
    int n = strsSize;
    int* parent = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) parent[i] = i;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (similar(strs[i], strs[j])) {
                int ri = find(parent, i), rj = find(parent, j);
                if (ri != rj) parent[ri] = rj;
            }
        }
    }
    int cnt = 0;
    for (int i = 0; i < n; i++) if (find(parent, i) == i) cnt++;
    free(parent);
    return cnt;
}
```

```ts [TypeScript]
function numSimilarGroups(strs: string[]): number {
    const n = strs.length;
    const parent: number[] = Array.from({ length: n }, (_, i) => i);
    const find = (x: number): number => {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    };
    const similar = (a: string, b: string): boolean => {
        let diff = 0;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i] && ++diff > 2) return false;
        }
        return true;
    };
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (similar(strs[i], strs[j])) {
                const ri = find(i), rj = find(j);
                if (ri !== rj) parent[ri] = rj;
            }
        }
    }
    let cnt = 0;
    for (let i = 0; i < n; i++) if (find(i) === i) cnt++;
    return cnt;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n² · L)`，`L` 为字符串长度。
- **空间复杂度**：`O(n)`，并查集。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 并查集 | `O(n²·L)` | `O(n)` | 标准解法 |

「相似」满足传递性，因此用并查集合并相似字符串即可统计组数。由于所有单词互为字母异位词，不同字符位置数必为偶数，相似即「不同位置数 ≤ 2」。

