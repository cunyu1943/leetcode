# [433. 最小基因变化](https://leetcode.cn/problems/minimum-genetic-mutation/)

## 一、题目描述

基因序列由 8 个字符（`'A'`、`'C'`、`'G'`、`'T'`）组成。给定起始基因 `start`、目标基因 `end`，以及一个合法基因库 `bank`。

每次变化可改变一个字符变成 `'A'/'C'/'G'/'T'`，且变化后的序列必须在 `bank` 中（可含 `start`）。返回从 `start` 变到 `end` 的最少变化次数；若不可达返回 -1。

**示例 1：**

```
输入：start = "AACCGGTT", end = "AACCGGTA", bank = ["AACCGGTA"]
输出：1
```

**示例 2：**

```
输入：start = "AACCGGTT", end = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]
输出：2
```

**提示：**

- `start.length == 8`
- `0 <= bank.length <= 10`
- `start`、`end`、`bank[i]` 仅由 `'A'/'C'/'G'/'T'` 组成

## 二、解答方法

### 2.1 方法一：BFS 最短路

1. 思路

把每个基因串看成图节点，`bank` 中相差仅一个字符的串连边。从 `start` 层序 BFS，第一次扩展到 `end` 的层数即最少步数。注意 `end` 必须在 `bank` 中（否则不可达）。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int minMutation(String start, String end, String[] bank) {
        Set<String> set = new HashSet<>(Arrays.asList(bank));
        if (!set.contains(end)) return -1;
        char[] genes = {'A','C','G','T'};
        Queue<String> q = new LinkedList<>();
        Set<String> vis = new HashSet<>();
        q.offer(start); vis.add(start);
        int step = 0;
        while (!q.isEmpty()) {
            int sz = q.size();
            while (sz-- > 0) {
                String cur = q.poll();
                if (cur.equals(end)) return step;
                char[] arr = cur.toCharArray();
                for (int i = 0; i < arr.length; i++) {
                    char old = arr[i];
                    for (char g : genes) {
                        arr[i] = g;
                        String nxt = new String(arr);
                        if (set.contains(nxt) && !vis.contains(nxt)) {
                            vis.add(nxt); q.offer(nxt);
                        }
                    }
                    arr[i] = old;
                }
            }
            step++;
        }
        return -1;
    }
}
```

```python [Python]
class Solution:
    def minMutation(self, start: str, end: str, bank: List[str]) -> int:
        bank = set(bank)
        if end not in bank:
            return -1
        genes = "ACGT"
        q, vis = deque([start]), {start}
        step = 0
        while q:
            for _ in range(len(q)):
                cur = q.popleft()
                if cur == end:
                    return step
                for i in range(len(cur)):
                    for g in genes:
                        nxt = cur[:i] + g + cur[i+1:]
                        if nxt in bank and nxt not in vis:
                            vis.add(nxt)
                            q.append(nxt)
            step += 1
        return -1
```

```cpp [C++]
class Solution {
public:
    int minMutation(string start, string end, vector<string>& bank) {
        unordered_set<string> set(bank.begin(), bank.end());
        if (!set.count(end)) return -1;
        string genes = "ACGT";
        queue<string> q; q.push(start);
        unordered_set<string> vis; vis.insert(start);
        int step = 0;
        while (!q.empty()) {
            int sz = q.size();
            while (sz--) {
                string cur = q.front(); q.pop();
                if (cur == end) return step;
                for (int i = 0; i < cur.size(); i++) {
                    char old = cur[i];
                    for (char g : genes) {
                        cur[i] = g;
                        if (set.count(cur) && !vis.count(cur)) { vis.insert(cur); q.push(cur); }
                    }
                    cur[i] = old;
                }
            }
            step++;
        }
        return -1;
    }
};
```

```go [Go]
func minMutation(start string, end string, bank []string) int {
	set := map[string]bool{}
	for _, b := range bank {
		set[b] = true
	}
	if !set[end] {
		return -1
	}
	genes := "ACGT"
	q := []string{start}
	vis := map[string]bool{start: true}
	step := 0
	for len(q) > 0 {
		n := len(q)
		for k := 0; k < n; k++ {
			cur := q[0]
			q = q[1:]
			if cur == end {
				return step
			}
			arr := []byte(cur)
			for i := 0; i < len(arr); i++ {
				old := arr[i]
				for _, g := range genes {
					arr[i] = byte(g)
					nxt := string(arr)
					if set[nxt] && !vis[nxt] {
						vis[nxt] = true
						q = append(q, nxt)
					}
				}
				arr[i] = old
			}
		}
		step++
	}
	return -1
}
```

```javascript [JavaScript]
var minMutation = function (start, end, bank) {
    const set = new Set(bank);
    if (!set.has(end)) return -1;
    const genes = "ACGT";
    let q = [start];
    const vis = new Set([start]);
    let step = 0;
    while (q.length) {
        const n = q.length;
        for (let k = 0; k < n; k++) {
            const cur = q.shift();
            if (cur === end) return step;
            for (let i = 0; i < cur.length; i++) {
                for (const g of genes) {
                    const nxt = cur.slice(0, i) + g + cur.slice(i + 1);
                    if (set.has(nxt) && !vis.has(nxt)) { vis.add(nxt); q.push(nxt); }
                }
            }
        }
        step++;
    }
    return -1;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(|bank| \cdot 8 \cdot 4)$。
- 空间复杂度：$O(|bank|)$。

## 三、总结

本质是「单词最短变换」的 BFS，与 127 单词接龙同构。相关题目：127 单词接龙、126 单词接龙 II、752 打开转盘锁。
