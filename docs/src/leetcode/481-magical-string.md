# [481. 神奇字符串](https://leetcode.cn/problems/magical-string/)

## 一、题目描述

神奇字符串 `s` 是一个仅由 `'1'` 和 `'2'` 组成、且满足以下条件的字符串：

- `s` 与它自身的「连续相同字符段的长度序列」相同。

具体地，`s` 的第 `i` 个字符表示「第 `i` 段连续相同字符的长度」，且各段在 `1` 和 `2` 之间交替。例如 `s = "122112122122112..."` 的段长度为 `1,2,2,1,1,2,1,2,2,1,1,2...`，恰好等于 `s` 自身。

给定整数 `n`，返回神奇字符串 `s` 的前 `n` 个数字中 `'1'` 的个数。

**示例 1：**

```
输入：n = 6
输出：3
解释：s 前 6 位为 "122112"，其中 '1' 出现 3 次。
```

**示例 2：**

```
输入：n = 1
输出：1
```

**提示：**

- `1 <= n <= 10^5`

## 二、解答方法

### 2.1 方法一：双指针构造

1. 思路

用两个指针：`i` 遍历已生成的段（决定下一段长度 `s[i]`），`j` 指向待填入的位置。交替填入 `1` 和 `2`，按 `s[i]` 决定重复次数。实时统计前 `n` 位中 `1` 的个数。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int magicalString(int n) {
        if (n == 0) return 0;
        int[] s = new int[n + 1];
        s[0] = 1;
        if (n > 1) s[1] = 2;
        int i = 1, j = 2, num = 1, ans = 1;
        while (j < n) {
            int len = s[i];           // 当前段长度
            for (int k = 0; k < len && j < n; k++) {
                s[j++] = num;
                if (num == 1) ans++;
            }
            num = 3 - num;             // 1 与 2 交替
            i++;
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def magicalString(self, n: int) -> int:
        if n == 0:
            return 0
        s = [0] * n
        s[0] = 1
        if n > 1:
            s[1] = 2
        i, j, num, ans = 1, 2, 1, 1
        while j < n:
            for _ in range(s[i]):
                if j >= n:
                    break
                s[j] = num
                if num == 1:
                    ans += 1
                j += 1
            num = 3 - num
            i += 1
        return ans
```

```cpp [C++]
class Solution {
public:
    int magicalString(int n) {
        if (n == 0) return 0;
        vector<int> s(n);
        s[0] = 1;
        if (n > 1) s[1] = 2;
        int i = 1, j = 2, num = 1, ans = 1;
        while (j < n) {
            int len = s[i];
            for (int k = 0; k < len && j < n; k++) {
                s[j++] = num;
                if (num == 1) ans++;
            }
            num = 3 - num;
            i++;
        }
        return ans;
    }
};
```

```go [Go]
func magicalString(n int) int {
	if n == 0 {
		return 0
	}
	s := make([]int, n)
	s[0] = 1
	if n > 1 {
		s[1] = 2
	}
	i, j, num, ans := 1, 2, 1, 1
	for j < n {
		length := s[i]
		for k := 0; k < length && j < n; k++ {
			s[j] = num
			if num == 1 {
				ans++
			}
			j++
		}
		num = 3 - num
		i++
	}
	return ans
}
```

```javascript [JavaScript]
var magicalString = function (n) {
    if (n === 0) return 0;
    const s = new Array(n).fill(0);
    s[0] = 1;
    if (n > 1) s[1] = 2;
    let i = 1, j = 2, num = 1, ans = 1;
    while (j < n) {
        const len = s[i];
        for (let k = 0; k < len && j < n; k++) {
            s[j] = num;
            if (num === 1) ans++;
            j++;
        }
        num = 3 - num;
        i++;
    }
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(n)$。

## 三、总结

双指针自描述序列的经典构造题。相关题目：293 类似、846 一手顺子（段长概念）。
