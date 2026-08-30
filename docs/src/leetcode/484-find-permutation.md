# [484. 寻找排列](https://leetcode.cn/problems/find-permutation/)

## 一、题目描述

给定一个由 `'I'`（增）和 `'D'`（减）组成的字符串 `s`（`s.length == n`），求其对应的**字典序最小**的排列 `p`，使得：

- `p[0] < p[1]` 当 `s[0] == 'I'`；
- `p[0] > p[1]` 当 `s[0] == 'D'`；

即 `s[i]` 描述 `p[i]` 与 `p[i+1]` 的大小关系。`p` 是由 `1` 到 `n+1` 各用一次的排列。

**示例 1：**

```
输入：s = "I"
输出：[1,2]
```

**示例 2：**

```
输入：s = "DI"
输出：[2,1,3]
解释：D(2>1), I(1<3)。
```

**提示：**

- `1 <= s.length <= 10^5`
- `s[i]` 为 `'I'` 或 `'D'`

## 二、解答方法

### 2.1 方法一：段反转法

1. 思路

初始排列 `[1, 2, ..., n+1]`（字典序最小）。遇到连续的 `'D'` 段（长度 `L`），把该段对应的连续区间反转，即可满足递减且整体字典序最小。具体：扫描 `s`，记录 `'D'` 的起始，遇到 `'I'` 或结尾时把 `[start, end]` 区间反转。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int[] findPermutation(String s) {
        int n = s.length() + 1;
        int[] p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i + 1;
        int start = -1;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == 'D') {
                if (start == -1) start = i;
            } else {
                if (start != -1) {
                    reverse(p, start, i);
                    start = -1;
                }
            }
        }
        if (start != -1) reverse(p, start, n - 1);
        return p;
    }
    void reverse(int[] p, int l, int r) {
        while (l < r) { int t = p[l]; p[l] = p[r]; p[r] = t; l++; r--; }
    }
}
```

```python [Python]
class Solution:
    def findPermutation(self, s: str) -> List[int]:
        n = len(s) + 1
        p = list(range(1, n + 1))
        start = -1
        s += 'I'  # 哨兵触发末尾反转
        for i, ch in enumerate(s):
            if ch == 'D':
                if start == -1:
                    start = i
            elif start != -1:
                p[start:i + 1] = p[start:i + 1][::-1]
                start = -1
        return p
```

```cpp [C++]
class Solution {
public:
    vector<int> findPermutation(string s) {
        int n = s.size() + 1;
        vector<int> p(n);
        for (int i = 0; i < n; i++) p[i] = i + 1;
        int start = -1;
        s += 'I';
        for (int i = 0; i < s.size(); i++) {
            if (s[i] == 'D') { if (start == -1) start = i; }
            else if (start != -1) {
                reverse(p.begin() + start, p.begin() + i + 1);
                start = -1;
            }
        }
        return p;
    }
};
```

```go [Go]
func findPermutation(s string) []int {
	n := len(s) + 1
	p := make([]int, n)
	for i := range p {
		p[i] = i + 1
	}
	s += "I"
	start := -1
	for i := 0; i < len(s); i++ {
		if s[i] == 'D' {
			if start == -1 {
				start = i
			}
		} else if start != -1 {
			for l, r := start, i; l < r; l, r = l+1, r-1 {
				p[l], p[r] = p[r], p[l]
			}
			start = -1
		}
	}
	return p
}
```

```javascript [JavaScript]
var findPermutation = function (s) {
    const n = s.length + 1;
    const p = Array.from({ length: n }, (_, i) => i + 1);
    s += 'I';
    let start = -1;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === 'D') { if (start === -1) start = i; }
        else if (start !== -1) {
            let l = start, r = i;
            while (l < r) { [p[l], p[r]] = [p[r], p[l]]; l++; r--; }
            start = -1;
        }
    }
    return p;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(n)$。

## 三、总结

段反转法是「由 DI 序列构造最小排列」的巧妙解法。相关题目：946 验证栈序列、267 回文排列 II。
