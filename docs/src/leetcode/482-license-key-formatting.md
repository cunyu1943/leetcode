# [482. 密钥格式化](https://leetcode.cn/problems/license-key-formatting/)

## 一、题目描述

给定一个由字母、数字和短横线组成的字符串 `s`（密钥），和一个整数 `k`。先去掉所有短横线，把剩下字符全部转大写，然后从**右到左**每 `k` 个字符插入一个短横线（最左段可少于 `k`）。返回格式化后的密钥。

**示例 1：**

```
输入：s = "5F3Z-2e-9-w", k = 4
输出："5F3Z-2E9W"
解释：去掉短横线为 5F3Z2E9W，从右每 4 位分组 -> 5F3Z-2E9W。
```

**示例 2：**

```
输入：s = "2-5g-3-J", k = 2
输出："2-5G-3J"
```

**提示：**

- `1 <= s.length <= 10^4`
- `s` 仅含字母、数字和 `'-'`
- `1 <= k <= 10^4`

## 二、解答方法

### 2.1 方法一：从右拼接

1. 思路

先收集去掉 `-` 并大写的字符，再从右向左每 `k` 个插入 `-`（用计数或取余）。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public String licenseKeyFormatting(String s, int k) {
        StringBuilder sb = new StringBuilder();
        int cnt = 0;
        for (int i = s.length() - 1; i >= 0; i--) {
            char c = s.charAt(i);
            if (c == '-') continue;
            if (cnt == k) { sb.append('-'); cnt = 0; }
            sb.append(Character.toUpperCase(c));
            cnt++;
        }
        return sb.reverse().toString();
    }
}
```

```python [Python]
class Solution:
    def licenseKeyFormatting(self, s: str, k: int) -> str:
        res = []
        cnt = 0
        for ch in reversed(s):
            if ch == '-':
                continue
            if cnt == k:
                res.append('-')
                cnt = 0
            res.append(ch.upper())
            cnt += 1
        return "".join(reversed(res))
```

```cpp [C++]
class Solution {
public:
    string licenseKeyFormatting(string s, int k) {
        string res;
        int cnt = 0;
        for (int i = s.size() - 1; i >= 0; i--) {
            if (s[i] == '-') continue;
            if (cnt == k) { res += '-'; cnt = 0; }
            res += toupper(s[i]);
            cnt++;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```

```go [Go]
func licenseKeyFormatting(s string, k int) string {
	var b []byte
	cnt := 0
	for i := len(s) - 1; i >= 0; i-- {
		c := s[i]
		if c == '-' {
			continue
		}
		if cnt == k {
			b = append(b, '-')
			cnt = 0
		}
		if c >= 'a' && c <= 'z' {
			c -= 32
		}
		b = append(b, c)
		cnt++
	}
	for i, j := 0, len(b)-1; i < j; i, j = i+1, j-1 {
		b[i], b[j] = b[j], b[i]
	}
	return string(b)
}
```

```javascript [JavaScript]
var licenseKeyFormatting = function (s, k) {
    let res = [];
    let cnt = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        const c = s[i];
        if (c === '-') continue;
        if (cnt === k) { res.push('-'); cnt = 0; }
        res.push(c.toUpperCase());
        cnt++;
    }
    return res.reverse().join('');
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(|s|)$。
- 空间复杂度：$O(|s|)$。

## 三、总结

从右向左分组是格式化类题的常用方向。相关题目：408 有效单词缩写、68 文本左右对齐。
