# [443. 压缩字符串](https://leetcode.cn/problems/string-compression/)

## 一、题目描述

给定字符数组 `chars`，原地压缩：把连续重复字符 `c` 出现 `k` 次压缩为 `c` 加 `k` 的数字（若 `k == 1` 则不写数字）。

返回压缩后数组的新长度，且 `chars` 的前 `length` 个元素为压缩结果。必须在 $O(1)$ 额外空间原地完成。

**示例 1：**

```
输入：chars = ["a","a","b","b","c","c","c"]
输出：返回 6，chars 前 6 个为 ["a","2","b","2","c","3"]
```

**示例 2：**

```
输入：chars = ["a"]
输出：返回 1，chars = ["a"]
```

**提示：**

- `1 <= chars.length <= 2000`
- `chars[i]` 为小写英文字母

## 二、解答方法

### 2.1 方法一：双指针（读指针 + 写指针）

1. 思路

`read` 遍历数组，`write` 写入压缩结果。对每个连续段，写字符后若长度 >1 则把数字逐位写入。写完所有段后，有效长度为 `write`。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int compress(char[] chars) {
        int n = chars.length, write = 0;
        int read = 0;
        while (read < n) {
            char c = chars[read];
            int start = read;
            while (read < n && chars[read] == c) read++;
            int len = read - start;
            chars[write++] = c;
            if (len > 1) {
                for (char d : String.valueOf(len).toCharArray()) chars[write++] = d;
            }
        }
        return write;
    }
}
```

```python [Python]
class Solution:
    def compress(self, chars: List[str]) -> int:
        n = len(chars)
        write = read = 0
        while read < n:
            c = chars[read]
            start = read
            while read < n and chars[read] == c:
                read += 1
            chars[write] = c
            write += 1
            length = read - start
            if length > 1:
                for d in str(length):
                    chars[write] = d
                    write += 1
        return write
```

```cpp [C++]
class Solution {
public:
    int compress(vector<char>& chars) {
        int n = chars.size(), write = 0, read = 0;
        while (read < n) {
            char c = chars[read];
            int start = read;
            while (read < n && chars[read] == c) read++;
            int len = read - start;
            chars[write++] = c;
            if (len > 1) {
                for (char d : to_string(len)) chars[write++] = d;
            }
        }
        return write;
    }
};
```

```go [Go]
func compress(chars []byte) int {
	n := len(chars)
	write, read := 0, 0
	for read < n {
		c := chars[read]
		start := read
		for read < n && chars[read] == c {
			read++
		}
		chars[write] = c
		write++
		length := read - start
		if length > 1 {
			for _, d := range strconv.Itoa(length) {
				chars[write] = byte(d)
				write++
			}
		}
	}
	return write
}
```

```javascript [JavaScript]
var compress = function (chars) {
    const n = chars.length;
    let write = 0, read = 0;
    while (read < n) {
        const c = chars[read];
        let start = read;
        while (read < n && chars[read] === c) read++;
        const length = read - start;
        chars[write++] = c;
        if (length > 1) {
            for (const d of String(length)) chars[write++] = d;
        }
    }
    return write;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(1)$。

## 三、总结

原地压缩用「读写双指针」，数字需逐位写。相关题目：316 去除重复字母、151 反转字符串中的单词（双指针）、1047 删除字符串中的所有相邻重复项。
