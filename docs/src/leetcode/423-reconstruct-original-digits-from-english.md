# [423. 从英文中重建数字](https://leetcode.cn/problems/reconstruct-original-digits-from-english/)

## 一、题目描述

给定一个由若干英文数字单词（`"zero".."nine"`）的字母**打乱拼接**而成的非空字符串 `s`，按升序返回原本表示的所有数字（每个数字可出现多次）。

**示例 1：**

```
输入：s = "owoztneoer"
输出："012"
解释：字母可还原为 "zero"、"one"、"two"。
```

**示例 2：**

```
输入：s = "fviefuro"
输出："45"
```

**提示：**

- `1 <= s.length <= 10^5`
- `s` 仅包含小写英文字母
- 保证 `s` 一定能还原为一组合法数字

## 二、解答方法

### 2.1 方法一：按唯一特征字符的顺序消元

1. 思路

利用某些数字的英文单词含**唯一字母**，按固定顺序推断其个数：

- `z` → `0`(zero) 独占
- `w` → `2`(two) 独占
- `u` → `4`(four) 独占
- `x` → `6`(six) 独占
- `g` → `8`(eight) 独占
- `h` → `3`(three，因 eight 已扣) = count('h') - 8
- `f` → `5`(five) = count('f') - 4
- `s` → `7`(seven) = count('s') - 6
- `i` → `9`(nine) = count('i') - 5 - 6 - 8
- `o` → `1`(one) = count('o') - 0 - 2 - 4

按此顺序求各数字数量，再升序拼接。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public String originalDigits(String s) {
        int[] c = new int[26];
        for (char ch : s.toCharArray()) c[ch - 'a']++;
        int[] cnt = new int[10];
        cnt[0] = c['z' - 'a'];
        cnt[2] = c['w' - 'a'];
        cnt[4] = c['u' - 'a'];
        cnt[6] = c['x' - 'a'];
        cnt[8] = c['g' - 'a'];
        cnt[3] = c['h' - 'a'] - cnt[8];
        cnt[5] = c['f' - 'a'] - cnt[4];
        cnt[7] = c['s' - 'a'] - cnt[6];
        cnt[9] = c['i' - 'a'] - cnt[5] - cnt[6] - cnt[8];
        cnt[1] = c['o' - 'a'] - cnt[0] - cnt[2] - cnt[4];
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 10; i++)
            for (int k = 0; k < cnt[i]; k++) sb.append(i);
        return sb.toString();
    }
}
```

```python [Python]
class Solution:
    def originalDigits(self, s: str) -> str:
        from collections import Counter
        c = Counter(s)
        cnt = [0] * 10
        cnt[0] = c['z']
        cnt[2] = c['w']
        cnt[4] = c['u']
        cnt[6] = c['x']
        cnt[8] = c['g']
        cnt[3] = c['h'] - cnt[8]
        cnt[5] = c['f'] - cnt[4]
        cnt[7] = c['s'] - cnt[6]
        cnt[9] = c['i'] - cnt[5] - cnt[6] - cnt[8]
        cnt[1] = c['o'] - cnt[0] - cnt[2] - cnt[4]
        res = []
        for i in range(10):
            res.append(str(i) * cnt[i])
        return "".join(res)
```

```cpp [C++]
class Solution {
public:
    string originalDigits(string s) {
        int c[26] = {0};
        for (char ch : s) c[ch - 'a']++;
        int cnt[10] = {0};
        cnt[0] = c['z' - 'a'];
        cnt[2] = c['w' - 'a'];
        cnt[4] = c['u' - 'a'];
        cnt[6] = c['x' - 'a'];
        cnt[8] = c['g' - 'a'];
        cnt[3] = c['h' - 'a'] - cnt[8];
        cnt[5] = c['f' - 'a'] - cnt[4];
        cnt[7] = c['s' - 'a'] - cnt[6];
        cnt[9] = c['i' - 'a'] - cnt[5] - cnt[6] - cnt[8];
        cnt[1] = c['o' - 'a'] - cnt[0] - cnt[2] - cnt[4];
        string res;
        for (int i = 0; i < 10; i++) res += string(cnt[i], '0' + i);
        return res;
    }
};
```

```go [Go]
func originalDigits(s string) string {
	c := [26]int{}
	for _, ch := range s {
		c[ch-'a']++
	}
	cnt := [10]int{}
	cnt[0] = c['z'-'a']
	cnt[2] = c['w'-'a']
	cnt[4] = c['u'-'a']
	cnt[6] = c['x'-'a']
	cnt[8] = c['g'-'a']
	cnt[3] = c['h'-'a'] - cnt[8]
	cnt[5] = c['f'-'a'] - cnt[4]
	cnt[7] = c['s'-'a'] - cnt[6]
	cnt[9] = c['i'-'a'] - cnt[5] - cnt[6] - cnt[8]
	cnt[1] = c['o'-'a'] - cnt[0] - cnt[2] - cnt[4]
	res := []byte{}
	for i := 0; i < 10; i++ {
		for k := 0; k < cnt[i]; k++ {
			res = append(res, byte('0'+i))
		}
	}
	return string(res)
}
```

```javascript [JavaScript]
var originalDigits = function (s) {
    const c = {};
    for (const ch of s) c[ch] = (c[ch] || 0) + 1;
    const cnt = new Array(10).fill(0);
    cnt[0] = c['z'] || 0;
    cnt[2] = c['w'] || 0;
    cnt[4] = c['u'] || 0;
    cnt[6] = c['x'] || 0;
    cnt[8] = c['g'] || 0;
    cnt[3] = (c['h'] || 0) - cnt[8];
    cnt[5] = (c['f'] || 0) - cnt[4];
    cnt[7] = (c['s'] || 0) - cnt[6];
    cnt[9] = (c['i'] || 0) - cnt[5] - cnt[6] - cnt[8];
    cnt[1] = (c['o'] || 0) - cnt[0] - cnt[2] - cnt[4];
    let res = "";
    for (let i = 0; i < 10; i++) res += String(i).repeat(cnt[i]);
    return res;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(|s|)$。
- 空间复杂度：$O(1)$。

## 三、总结

「利用唯一特征字符确定基数字，再反向消元」是文字还原类题的通用技巧。相关题目：249、616（类似字符消元）。
