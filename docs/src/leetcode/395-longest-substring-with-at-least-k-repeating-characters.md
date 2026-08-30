# [395. 至少有 K 个重复字符的最长子串](https://leetcode.cn/problems/longest-substring-with-at-least-k-repeating-characters/)

## 一、题目描述

给你一个字符串 `s` 和一个整数 `k`，请你找出 `s` 中的最长子串，要求该子串中的每一字符出现次数都不少于 `k`。返回这一最长子串的长度。

**示例 1：**

```
输入：s = "aaabb", k = 3
输出：3
解释：最长子串为 "aaa" ，其中 'a' 重复 3 次。
```

**示例 2：**

```
输入：s = "ababbc", k = 2
输出：5
解释：最长子串为 "ababb" ，其中 'a' 重复 2 次，'b' 重复 3 次。
```

**提示：**

- `1 <= s.length <= 10^4`
- `s` 仅由小写英文字母组成
- `1 <= k <= 10^5`

## 二、解答方法

### 2.1 方法一：分治（按不达标字符切分）

1. 思路

若某个字符在整个字符串中出现次数不足 `k`，则它不可能出现在答案子串中，可作为分隔点把字符串切开，递归处理各段。递归的每段内所有字符频次都 $\ge k$，段长即为候选答案。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int longestSubstring(String s, int k) {
        return dfs(s.toCharArray(), 0, s.length() - 1, k);
    }
    private int dfs(char[] s, int l, int r, int k) {
        if (r - l + 1 < k) return 0;
        int[] cnt = new int[26];
        for (int i = l; i <= r; i++) cnt[s[i] - 'a']++;
        for (int i = l; i <= r; i++) {
            if (cnt[s[i] - 'a'] < k) {
                int j = i;
                while (j <= r && cnt[s[j] - 'a'] < k) j++;
                return Math.max(dfs(s, l, i - 1, k), dfs(s, j, r, k));
            }
        }
        return r - l + 1;
    }
}
```

```python [Python]
class Solution:
    def longestSubstring(self, s: str, k: int) -> int:
        def dfs(l: int, r: int) -> int:
            if r - l + 1 < k:
                return 0
            cnt = {}
            for i in range(l, r + 1):
                cnt[s[i]] = cnt.get(s[i], 0) + 1
            for i in range(l, r + 1):
                if cnt[s[i]] < k:
                    j = i
                    while j <= r and cnt[s[j]] < k:
                        j += 1
                    return max(dfs(l, i - 1), dfs(j, r))
            return r - l + 1
        return dfs(0, len(s) - 1)
```

```cpp [C++]
class Solution {
public:
    int longestSubstring(string s, int k) {
        return dfs(s, 0, s.size() - 1, k);
    }
    int dfs(string& s, int l, int r, int k) {
        if (r - l + 1 < k) return 0;
        int cnt[26] = {0};
        for (int i = l; i <= r; i++) cnt[s[i] - 'a']++;
        for (int i = l; i <= r; i++) {
            if (cnt[s[i] - 'a'] < k) {
                int j = i;
                while (j <= r && cnt[s[j] - 'a'] < k) j++;
                return max(dfs(s, l, i - 1, k), dfs(s, j, r, k));
            }
        }
        return r - l + 1;
    }
};
```

```go [Go]
func longestSubstring(s string, k int) int {
	var dfs func(l, r int) int
	dfs = func(l, r int) int {
		if r-l+1 < k {
			return 0
		}
		cnt := [26]int{}
		for i := l; i <= r; i++ {
			cnt[s[i]-'a']++
		}
		for i := l; i <= r; i++ {
			if cnt[s[i]-'a'] < k {
				j := i
				for j <= r && cnt[s[j]-'a'] < k {
					j++
				}
				return max(dfs(l, i-1), dfs(j, r))
			}
		}
		return r - l + 1
	}
	return dfs(0, len(s)-1)
}
func max(a, b int) int { if a > b { return a }; return b }
```

```javascript [JavaScript]
var longestSubstring = function (s, k) {
    const dfs = (l, r) => {
        if (r - l + 1 < k) return 0;
        const cnt = {};
        for (let i = l; i <= r; i++) cnt[s[i]] = (cnt[s[i]] || 0) + 1;
        for (let i = l; i <= r; i++) {
            if (cnt[s[i]] < k) {
                let j = i;
                while (j <= r && cnt[s[j]] < k) j++;
                return Math.max(dfs(l, i - 1), dfs(j, r));
            }
        }
        return r - l + 1;
    };
    return dfs(0, s.length - 1);
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n \log n)$，每层扫描 $O(n)$，切分最多 $\log n$ 层。
- 空间复杂度：$O(n)$，递归栈与计数数组。

### 2.2 方法二：枚举字符种类数

1. 思路

答案子串中不同字符种类数 `kind` 最多 26 种。枚举 `kind` 从 1 到 26，滑动窗口维护窗口内字符种类数 `= kind` 且每个字符频次 $\ge k$，更新最大长度。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int longestSubstring(String s, int k) {
        int n = s.length(), ans = 0;
        for (int kind = 1; kind <= 26; kind++) {
            int[] cnt = new int[26];
            int l = 0, total = 0, satisfied = 0;
            for (int r = 0; r < n; r++) {
                int x = s.charAt(r) - 'a';
                if (cnt[x]++ == 0) total++;
                if (cnt[x] == k) satisfied++;
                while (total > kind) {
                    int y = s.charAt(l) - 'a';
                    if (cnt[y] == k) satisfied--;
                    if (--cnt[y] == 0) total--;
                    l++;
                }
                if (total == kind && satisfied == kind) ans = Math.max(ans, r - l + 1);
            }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def longestSubstring(self, s: str, k: int) -> int:
        n, ans = len(s), 0
        for kind in range(1, 27):
            cnt = {}
            l = total = satisfied = 0
            for r in range(n):
                x = s[r]
                if cnt.get(x, 0) == 0:
                    total += 1
                cnt[x] = cnt.get(x, 0) + 1
                if cnt[x] == k:
                    satisfied += 1
                while total > kind:
                    y = s[l]
                    if cnt[y] == k:
                        satisfied -= 1
                    cnt[y] -= 1
                    if cnt[y] == 0:
                        total -= 1
                    l += 1
                if total == kind and satisfied == kind:
                    ans = max(ans, r - l + 1)
        return ans
```

```cpp [C++]
class Solution {
public:
    int longestSubstring(string s, int k) {
        int n = s.size(), ans = 0;
        for (int kind = 1; kind <= 26; kind++) {
            int cnt[26] = {0};
            int l = 0, total = 0, satisfied = 0;
            for (int r = 0; r < n; r++) {
                int x = s[r] - 'a';
                if (cnt[x]++ == 0) total++;
                if (cnt[x] == k) satisfied++;
                while (total > kind) {
                    int y = s[l++] - 'a';
                    if (cnt[y] == k) satisfied--;
                    if (--cnt[y] == 0) total--;
                }
                if (total == kind && satisfied == kind) ans = max(ans, r - l + 1);
            }
        }
        return ans;
    }
};
```

```go [Go]
func longestSubstring(s string, k int) int {
	n, ans := len(s), 0
	for kind := 1; kind <= 26; kind++ {
		cnt := [26]int{}
		l, total, satisfied := 0, 0, 0
		for r := 0; r < n; r++ {
			x := s[r] - 'a'
			if cnt[x] == 0 {
				total++
			}
			cnt[x]++
			if cnt[x] == k {
				satisfied++
			}
			for total > kind {
				y := s[l] - 'a'
				if cnt[y] == k {
					satisfied--
				}
				cnt[y]--
				if cnt[y] == 0 {
					total--
				}
				l++
			}
			if total == kind && satisfied == kind {
				ans = max(ans, r-l+1)
			}
		}
	}
	return ans
}
func max(a, b int) int { if a > b { return a }; return b }
```

```javascript [JavaScript]
var longestSubstring = function (s, k) {
    const n = s.length;
    let ans = 0;
    for (let kind = 1; kind <= 26; kind++) {
        const cnt = {};
        let l = 0, total = 0, satisfied = 0;
        for (let r = 0; r < n; r++) {
            const x = s[r];
            if (!cnt[x]) total++;
            cnt[x] = (cnt[x] || 0) + 1;
            if (cnt[x] === k) satisfied++;
            while (total > kind) {
                const y = s[l++];
                if (cnt[y] === k) satisfied--;
                cnt[y]--;
                if (cnt[y] === 0) total--;
            }
            if (total === kind && satisfied === kind) ans = Math.max(ans, r - l + 1);
        }
    }
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(26 \cdot n) = O(n)$。
- 空间复杂度：$O(1)$。

## 三、总结

分治法的核心洞察是「频次不足 k 的字符必不在答案中，可作为切分点」。枚举种类数 + 滑动窗口则是另一种稳健思路。相关题目：3 无重复字符的最长子串、340 至多 K 个不同字符。
