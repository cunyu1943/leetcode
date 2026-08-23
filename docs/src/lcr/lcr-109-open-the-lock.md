# [LCR 109. 打开转盘锁](https://leetcode.cn/problems/zlDJc7/)



## 一、题目描述

你有一个带有四个圆形拨轮的转盘锁。每个拨轮都有 10 个数字： `'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'` 。每个拨轮可以自由旋转：例如把 `'9'` 变为 `'0'`，`'0'` 变为 `'9'` 。每次旋转都只能旋转一个拨轮的一位数字。

锁的初始数字为 `'0000'` ，一个代表四个拨轮的数字的字符串。

列表 `deadends` 包含了一组死亡数字，一旦拨轮的数字和列表里的任何一个元素相同，这个锁将会被永久锁定，无法再被旋转。

字符串 `target` 代表可以解锁的数字，你需要给出解锁需要的最小旋转次数，如果无论如何不能解锁，返回 `-1` 。



**示例 1：**

```
输入：deadends = ["0201","0101","0102","1212","2002"], target = "0202"
输出：6
```

**示例 2：**

```
输入: deadends = ["8888"], target = "0009"
输出：1
```

**提示：**

- 死亡数字 `deadends` 的长度范围为 `[1, 500]`
- 目标数字 `target` 不会在 `deadends` 之中
- 每个 `deadends` 和 `target` 中的字符串的数字会在 10,000 个可能的情况 `'0000'` 到 `'9999'` 中产生



## 二、解答方法

### 2.1 方法一：BFS（状态最短路）

1. **思路**

把每个 4 位密码看作状态，一次旋转（某位 +1 或 -1 模 10）即一条边。从 `"0000"` BFS 求到 `target` 的最短步数：

- `deadends` 中的状态不可达（入队前跳过）；
- 用集合记录已访问状态；
- 若 `"0000"` 本身就是死亡状态，直接返回 `-1`。

每个状态有 4×2=8 个后继。时间 `O(10⁴)`，空间 `O(10⁴)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int openLock(String[] deadends, String target) {
        Set<String> dead = new HashSet<>(Arrays.asList(deadends));
        if (dead.contains("0000")) return -1;
        Set<String> visited = new HashSet<>();
        Deque<String> q = new ArrayDeque<>();
        q.offer("0000");
        visited.add("0000");
        int step = 0;
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                String cur = q.poll();
                if (cur.equals(target)) return step;
                for (String nxt : neighbors(cur)) {
                    if (!visited.contains(nxt) && !dead.contains(nxt)) {
                        visited.add(nxt);
                        q.offer(nxt);
                    }
                }
            }
            step++;
        }
        return -1;
    }
    private List<String> neighbors(String s) {
        List<String> res = new ArrayList<>();
        char[] arr = s.toCharArray();
        for (int i = 0; i < 4; i++) {
            char orig = arr[i];
            for (int d = -1; d <= 1; d += 2) {
                arr[i] = (char) ('0' + (orig - '0' + d + 10) % 10);
                res.add(new String(arr));
            }
            arr[i] = orig;
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def openLock(self, deadends: List[str], target: str) -> int:
        from collections import deque
        dead = set(deadends)
        if '0000' in dead:
            return -1
        q = deque(['0000'])
        seen = {'0000'}
        step = 0
        while q:
            for _ in range(len(q)):
                cur = q.popleft()
                if cur == target:
                    return step
                for i in range(4):
                    for d in (-1, 1):
                        nxt = cur[:i] + str((int(cur[i]) + d) % 10) + cur[i + 1:]
                        if nxt not in seen and nxt not in dead:
                            seen.add(nxt)
                            q.append(nxt)
            step += 1
        return -1
```

```cpp [C++]
class Solution {
public:
    int openLock(vector<string>& deadends, string target) {
        unordered_set<string> dead(deadends.begin(), deadends.end());
        if (dead.count("0000")) return -1;
        unordered_set<string> seen;
        queue<string> q;
        q.push("0000");
        seen.insert("0000");
        int step = 0;
        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                string cur = q.front(); q.pop();
                if (cur == target) return step;
                for (int j = 0; j < 4; j++) {
                    for (int d = -1; d <= 1; d += 2) {
                        string nxt = cur;
                        nxt[j] = '0' + (cur[j] - '0' + d + 10) % 10;
                        if (!seen.count(nxt) && !dead.count(nxt)) {
                            seen.insert(nxt);
                            q.push(nxt);
                        }
                    }
                }
            }
            step++;
        }
        return -1;
    }
};
```

```go [Go]
func openLock(deadends []string, target string) int {
    dead := map[string]bool{}
    for _, d := range deadends {
        dead[d] = true
    }
    if dead["0000"] {
        return -1
    }
    q := []string{"0000"}
    seen := map[string]bool{"0000": true}
    step := 0
    for len(q) > 0 {
        size := len(q)
        for i := 0; i < size; i++ {
            cur := q[i]
            if cur == target {
                return step
            }
            b := []byte(cur)
            for j := 0; j < 4; j++ {
                orig := b[j]
                for _, d := range []int{-1, 1} {
                    b[j] = byte('0' + (int(orig-'0')+d+10)%10)
                    nxt := string(b)
                    if !seen[nxt] && !dead[nxt] {
                        seen[nxt] = true
                        q = append(q, nxt)
                    }
                }
                b[j] = orig
            }
        }
        q = q[size:]
        step++
    }
    return -1
}
```

```js [JavaScript]
/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
    const dead = new Set(deadends);
    if (dead.has('0000')) return -1;
    const seen = new Set(['0000']);
    const q = ['0000'];
    let step = 0;
    while (q.length) {
        const size = q.length;
        for (let i = 0; i < size; i++) {
            const cur = q.shift();
            if (cur === target) return step;
            for (let j = 0; j < 4; j++) {
                for (const d of [-1, 1]) {
                    const arr = [...cur];
                    arr[j] = String((Number(arr[j]) + d + 10) % 10);
                    const nxt = arr.join('');
                    if (!seen.has(nxt) && !dead.has(nxt)) {
                        seen.add(nxt);
                        q.push(nxt);
                    }
                }
            }
        }
        step++;
    }
    return -1;
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

#define HSIZE 20003

int openLock(char** deadends, int deadendsSize, char* target) {
    // 用 10000 大小数组直接标记状态，简单高效
    char* dead = (char*)calloc(10000, sizeof(char));
    for (int i = 0; i < deadendsSize; i++) dead[atoi(deadends[i])] = 1;
    int start = 0, tgt = atoi(target);
    if (dead[start]) return -1;
    char* seen = (char*)calloc(10000, sizeof(char));
    int* q = (int*)malloc(10000 * sizeof(int));
    int head = 0, tail = 0;
    q[tail++] = start;
    seen[start] = 1;
    int step = 0;
    int pow10[4] = {1, 10, 100, 1000};
    while (head < tail) {
        int size = tail - head;
        for (int i = 0; i < size; i++) {
            int cur = q[head++];
            if (cur == tgt) { free(dead); free(seen); free(q); return step; }
            for (int j = 0; j < 4; j++) {
                int digit = (cur / pow10[j]) % 10;
                for (int d = -1; d <= 1; d += 2) {
                    int nd = (digit + d + 10) % 10;
                    int nxt = cur + (nd - digit) * pow10[j];
                    if (!seen[nxt] && !dead[nxt]) {
                        seen[nxt] = 1;
                        q[tail++] = nxt;
                    }
                }
            }
        }
        step++;
    }
    free(dead); free(seen); free(q);
    return -1;
}
```

```ts [TypeScript]
function openLock(deadends: string[], target: string): number {
    const dead = new Set(deadends);
    if (dead.has('0000')) return -1;
    const seen = new Set(['0000']);
    const q: string[] = ['0000'];
    let step = 0;
    while (q.length) {
        const size = q.length;
        for (let i = 0; i < size; i++) {
            const cur = q.shift()!;
            if (cur === target) return step;
            for (let j = 0; j < 4; j++) {
                for (const d of [-1, 1]) {
                    const arr = [...cur];
                    arr[j] = String((Number(arr[j]) + d + 10) % 10);
                    const nxt = arr.join('');
                    if (!seen.has(nxt) && !dead.has(nxt)) {
                        seen.add(nxt);
                        q.push(nxt);
                    }
                }
            }
        }
        step++;
    }
    return -1;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(10⁴ × 8)`，状态总数有限。
- **空间复杂度**：`O(10⁴)`，访问标记。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| BFS 状态搜索 | `O(10⁴)` | `O(10⁴)` | 标准解法 |

转盘锁是典型的状态图最短路：每个密码一个节点，每次旋转（一位 ±1）生成 8 个后继，BFS 求最短旋转次数；死亡状态在入队前剔除。

