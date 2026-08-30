# [408. 有效单词缩写](https://leetcode.cn/problems/valid-word-abbreviation/)

## 一、题目描述

字符串的**合法缩写**可按如下规则生成：保留字符串中部分字符，其余连续字符用其长度（计数）替换。若被缩写的区间长度 $\ge 2$，则必须写计数（例如 `"substitution"` 可缩为 `"s10n"`）；若长度恰为 1，则可用该字符本身（不可写 `"1x"`）。

给定一个单词 `word` 和一个缩写 `abbr`，判断 `abbr` 是否是 `word` 的合法缩写。

**示例 1：**

```
输入：word = "internationalization", abbr = "i12iz4n"
输出：true
```

**示例 2：**

```
输入：word = "apple", abbr = "a2e"
输出：false
```

**提示：**

- `1 <= word.length <= 20`
- `word` 仅由小写英文字母组成
- `1 <= abbr.length <= 10`
- `abbr` 由小写英文字母与数字组成

## 二、解答方法

### 2.1 方法一：双指针

1. 思路

用指针 `i` 扫 `word`、`j` 扫 `abbr`：

- 遇到数字，累加成整数 `num`（注意不能以 0 开头，即 `"0"` 或 `"01"` 不合法），`i += num`；
- 遇到字母，要求 `word[i] == abbr[j]` 且 `i`、`j` 各前进 1；
- 最终 `i`、`j` 都需到达末尾。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public boolean validWordAbbreviation(String word, String abbr) {
        int i = 0, j = 0;
        while (i < word.length() && j < abbr.length()) {
            if (Character.isDigit(abbr.charAt(j))) {
                if (abbr.charAt(j) == '0') return false;
                int num = 0;
                while (j < abbr.length() && Character.isDigit(abbr.charAt(j)))
                    num = num * 10 + (abbr.charAt(j++) - '0');
                i += num;
            } else {
                if (i >= word.length() || word.charAt(i) != abbr.charAt(j)) return false;
                i++; j++;
            }
        }
        return i == word.length() && j == abbr.length();
    }
}
```

```python [Python]
class Solution:
    def validWordAbbreviation(self, word: str, abbr: str) -> bool:
        i = j = 0
        while i < len(word) and j < len(abbr):
            if abbr[j].isdigit():
                if abbr[j] == '0':
                    return False
                num = 0
                while j < len(abbr) and abbr[j].isdigit():
                    num = num * 10 + int(abbr[j])
                    j += 1
                i += num
            else:
                if i >= len(word) or word[i] != abbr[j]:
                    return False
                i += 1
                j += 1
        return i == len(word) and j == len(abbr)
```

```cpp [C++]
class Solution {
public:
    bool validWordAbbreviation(string word, string abbr) {
        int i = 0, j = 0;
        while (i < word.size() && j < abbr.size()) {
            if (isdigit(abbr[j])) {
                if (abbr[j] == '0') return false;
                int num = 0;
                while (j < abbr.size() && isdigit(abbr[j]))
                    num = num * 10 + (abbr[j++] - '0');
                i += num;
            } else {
                if (i >= word.size() || word[i] != abbr[j]) return false;
                i++; j++;
            }
        }
        return i == word.size() && j == abbr.size();
    }
};
```

```go [Go]
func validWordAbbreviation(word string, abbr string) bool {
	i, j := 0, 0
	for i < len(word) && j < len(abbr) {
		if abbr[j] >= '0' && abbr[j] <= '9' {
			if abbr[j] == '0' {
				return false
			}
			num := 0
			for j < len(abbr) && abbr[j] >= '0' && abbr[j] <= '9' {
				num = num*10 + int(abbr[j]-'0')
				j++
			}
			i += num
		} else {
			if i >= len(word) || word[i] != abbr[j] {
				return false
			}
			i++
			j++
		}
	}
	return i == len(word) && j == len(abbr)
}
```

```javascript [JavaScript]
var validWordAbbreviation = function (word, abbr) {
    let i = 0, j = 0;
    while (i < word.length && j < abbr.length) {
        if (abbr[j] >= '0' && abbr[j] <= '9') {
            if (abbr[j] === '0') return false;
            let num = 0;
            while (j < abbr.length && abbr[j] >= '0' && abbr[j] <= '9') {
                num = num * 10 + Number(abbr[j]);
                j++;
            }
            i += num;
        } else {
            if (i >= word.length || word[i] !== abbr[j]) return false;
            i++; j++;
        }
    }
    return i === word.length && j === abbr.length;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(|word| + |abbr|)$。
- 空间复杂度：$O(1)$。

## 三、总结

双指针顺序匹配即可，注意「以 0 开头的数字不合法」这一边界。相关题目：320 广义缩写、411 最短单词缩写。
