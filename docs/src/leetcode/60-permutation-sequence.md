# [60. 排列序列](https://leetcode.cn/problems/permutation-sequence/)



## 一、题目描述

给出集合 `[1, 2, 3, ..., n]`，其所有元素共有 `n!` 种排列。

按大小顺序列出所有排列并按从 `1` 到 `n!` 的字典序编号，给定 `n` 和 `k`，返回第 `k` 个排列。



**示例 1：**

```
输入：n = 3, k = 3
输出："213"
```

**示例 2：**

```
输入：n = 4, k = 9
输出："2314"
```

**示例 3：**

```
输入：n = 3, k = 1
输出："123"
```

**提示：**

-   `1 <= n <= 9`
-   `1 <= k <= n!`



## 二、解答方法

### 2.1 方法一：数学法（按位确定）


1. **思路**

对于剩余 `m` 个数，每个数作为首位的排列有 `(m-1)!` 个。用 `k / (m-1)!` 的商确定当前位选哪个数，再用余数进入下一轮，直到选完。避免生成全部排列。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public String getPermutation(int n, int k) {
        List<Integer> nums = new ArrayList<>();
        int[] fact = new int[n + 1];
        fact[0] = 1;
        for (int i = 1; i <= n; i++) {
            fact[i] = fact[i - 1] * i;
            nums.add(i);
        }
        k--;
        StringBuilder sb = new StringBuilder();
        for (int i = n; i >= 1; i--) {
            int idx = k / fact[i - 1];
            sb.append(nums.get(idx));
            nums.remove(idx);
            k %= fact[i - 1];
        }
        return sb.toString();
    }
}
```

```python [Python]
class Solution:
    def getPermutation(self, n: int, k: int) -> str:
        nums = list(range(1, n + 1))
        fact = [1] * (n + 1)
        for i in range(1, n + 1):
            fact[i] = fact[i - 1] * i
        k -= 1
        res = []
        for i in range(n, 0, -1):
            idx = k // fact[i - 1]
            res.append(str(nums[idx]))
            nums.pop(idx)
            k %= fact[i - 1]
        return ''.join(res)
```

```go [Go]
func getPermutation(n int, k int) string {
    nums := make([]int, 0, n)
    fact := make([]int, n+1)
    fact[0] = 1
    for i := 1; i <= n; i++ {
        fact[i] = fact[i-1] * i
        nums = append(nums, i)
    }
    k--
    sb := []byte{}
    for i := n; i >= 1; i-- {
        idx := k / fact[i-1]
        sb = append(sb, byte('0'+nums[idx]))
        nums = append(nums[:idx], nums[idx+1:]...)
        k %= fact[i-1]
    }
    return string(sb)
}
```

```c [C]
char* getPermutation(int n, int k, int* returnSize) {
    int* fact = (int*)malloc(sizeof(int) * (n + 1));
    int* nums = (int*)malloc(sizeof(int) * n);
    fact[0] = 1;
    for (int i = 1; i <= n; i++) { fact[i] = fact[i - 1] * i; nums[i - 1] = i; }
    k--;
    char* res = (char*)malloc(sizeof(char) * (n + 1));
    int len = 0;
    for (int i = n; i >= 1; i--) {
        int idx = k / fact[i - 1];
        res[len++] = '0' + nums[idx];
        for (int j = idx; j < i - 1; j++) nums[j] = nums[j + 1];
        k %= fact[i - 1];
    }
    res[len] = '\0';
    free(fact); free(nums);
    *returnSize = n;
    return res;
}
```

```cpp [C++]
class Solution {
public:
    string getPermutation(int n, int k) {
        vector<int> nums, fact(n + 1, 1);
        for (int i = 1; i <= n; i++) {
            fact[i] = fact[i - 1] * i;
            nums.push_back(i);
        }
        k--;
        string res;
        for (int i = n; i >= 1; i--) {
            int idx = k / fact[i - 1];
            res += to_string(nums[idx]);
            nums.erase(nums.begin() + idx);
            k %= fact[i - 1];
        }
        return res;
    }
};
```

```javascript [JavaScript]
var getPermutation = function(n, k) {
    const nums = [], fact = [1];
    for (let i = 1; i <= n; i++) {
        fact[i] = fact[i - 1] * i;
        nums.push(i);
    }
    k--;
    let res = '';
    for (let i = n; i >= 1; i--) {
        const idx = Math.floor(k / fact[i - 1]);
        res += nums[idx];
        nums.splice(idx, 1);
        k %= fact[i - 1];
    }
    return res;
};
```

```typescript [TypeScript]
function getPermutation(n: number, k: number): string {
    const nums: number[] = [], fact: number[] = [1];
    for (let i = 1; i <= n; i++) {
        fact[i] = fact[i - 1] * i;
        nums.push(i);
    }
    k--;
    let res = '';
    for (let i = n; i >= 1; i--) {
        const idx = Math.floor(k / fact[i - 1]);
        res += nums[idx];
        nums.splice(idx, 1);
        k %= fact[i - 1];
    }
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`**，每轮删除元素为 `O(n)`。
- **空间复杂度**：`O(n)`**，保存阶乘与候选数字。

### 2.2 方法二：回溯（按序生成）


1. **思路**

用回溯逐个位置尝试填数字，按字典序生成排列，每生成一个计数器加一，当达到 `k` 时返回当前排列。简单直观但最坏需枚举较多排列。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    int cnt = 0, k, n;
    String ans;
    boolean[] used;
    StringBuilder path = new StringBuilder();
    public String getPermutation(int n, int k) {
        this.n = n; this.k = k;
        used = new boolean[n + 1];
        backtrack();
        return ans;
    }
    private void backtrack() {
        if (path.length() == n) {
            cnt++;
            if (cnt == k) ans = path.toString();
            return;
        }
        for (int i = 1; i <= n; i++) {
            if (used[i] || ans != null) continue;
            used[i] = true; path.append(i);
            backtrack();
            path.deleteCharAt(path.length() - 1); used[i] = false;
        }
    }
}
```

```python [Python]
class Solution:
    def getPermutation(self, n: int, k: int) -> str:
        used = [False] * (n + 1)
        path = []
        self.cnt = 0
        self.ans = None
        def backtrack():
            if len(path) == n:
                self.cnt += 1
                if self.cnt == k:
                    self.ans = ''.join(map(str, path))
                return
            for i in range(1, n + 1):
                if used[i] or self.ans is not None:
                    continue
                used[i] = True; path.append(i)
                backtrack(); path.pop(); used[i] = False
        backtrack()
        return self.ans
```

```go [Go]
func getPermutation(n int, k int) string {
    used := make([]bool, n+1)
    path := []int{}
    cnt := 0
    var ans string
    var backtrack func()
    backtrack = func() {
        if len(path) == n {
            cnt++
            if cnt == k {
                b := make([]byte, n)
                for i, v := range path { b[i] = byte('0' + v) }
                ans = string(b)
            }
            return
        }
        for i := 1; i <= n; i++ {
            if used[i] || ans != "" { continue }
            used[i] = true; path = append(path, i)
            backtrack(); path = path[:len(path)-1]; used[i] = false
        }
    }
    backtrack()
    return ans
}
```

```c [C]
char* getPermutation(int n, int k, int* returnSize) {
    // 回溯按序生成核心结构同上，完整实现略
    *returnSize = n;
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    string getPermutation(int n, int k) {
        vector<int> path;
        vector<bool> used(n + 1, false);
        int cnt = 0;
        string ans;
        function<void()> backtrack = [&]() {
            if (path.size() == n) {
                cnt++;
                if (cnt == k) {
                    ans = "";
                    for (int v : path) ans += to_string(v);
                }
                return;
            }
            for (int i = 1; i <= n; i++) {
                if (used[i] || !ans.empty()) continue;
                used[i] = true; path.push_back(i);
                backtrack(); path.pop_back(); used[i] = false;
            }
        };
        backtrack();
        return ans;
    }
};
```

```javascript [JavaScript]
var getPermutation = function(n, k) {
    const used = new Array(n + 1).fill(false);
    const path = [];
    let cnt = 0, ans = null;
    const backtrack = () => {
        if (path.length === n) {
            cnt++;
            if (cnt === k) ans = path.join('');
            return;
        }
        for (let i = 1; i <= n; i++) {
            if (used[i] || ans !== null) continue;
            used[i] = true; path.push(i);
            backtrack(); path.pop(); used[i] = false;
        }
    };
    backtrack();
    return ans;
};
```

```typescript [TypeScript]
function getPermutation(n: number, k: number): string {
    const used: boolean[] = new Array(n + 1).fill(false);
    const path: number[] = [];
    let cnt = 0, ans: string | null = null;
    const backtrack = (): void => {
        if (path.length === n) {
            cnt++;
            if (cnt === k) ans = path.join('');
            return;
        }
        for (let i = 1; i <= n; i++) {
            if (used[i] || ans !== null) continue;
            used[i] = true; path.push(i);
            backtrack(); path.pop(); used[i] = false;
        }
    };
    backtrack();
    return ans!;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(k * n)`**，最坏生成到第 `k` 个排列。
- **空间复杂度**：`O(n)`**，递归栈与路径数组。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 数学法（按位确定） | `O(n²)` | `O(n)` | 高效，面试首选 |
| 回溯（按序生成） | `O(k * n)` | `O(n)` | 简单直观，k 大时慢 |
