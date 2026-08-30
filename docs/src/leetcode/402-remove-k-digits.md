# [402. 移掉 K 位数字](https://leetcode.cn/problems/remove-k-digits/)

## 一、题目描述

给你一个以字符串表示的非负整数 `num` 和一个整数 `k`，移除这个数中的 `k` 位数字，使得剩下的数字最小。请你以字符串形式返回这个最小的数字。

**示例 1：**

```
输入：num = "1432219", k = 3
输出："1219"
解释：移除 4、3、2 三个数字得到 1219，最小。
```

**示例 2：**

```
输入：num = "10200", k = 1
输出："200"
解释：移除首位的 1 得到 0200，去掉前导零为 "200"。
```

**示例 3：**

```
输入：num = "10", k = 2
输出："0"
解释：移除所有数字，剩下空串，返回 "0"。
```

**提示：**

- `1 <= k <= num.length <= 10^5`
- `num` 仅由若干位数字组成，不含前导零。

## 二、解答方法

### 2.1 方法一：单调栈（贪心）

1. 思路

从左到右扫描，用栈维护结果：当栈顶数字比当前数字大且还有可删除名额 `k>0` 时，弹出栈顶（删掉更大的高位数字能让结果更小）。扫描完若 `k` 仍有剩余，从尾部删（尾部数字权重最低）。最后去掉前导零，空串返回 `"0"`。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public String removeKdigits(String num, int k) {
        StringBuilder st = new StringBuilder();
        for (char c : num.toCharArray()) {
            while (k > 0 && st.length() > 0 && st.charAt(st.length() - 1) > c) {
                st.deleteCharAt(st.length() - 1);
                k--;
            }
            st.append(c);
        }
        while (k > 0 && st.length() > 0) { st.deleteCharAt(st.length() - 1); k--; }
        int i = 0;
        while (i < st.length() && st.charAt(i) == '0') i++;
        String ans = st.substring(i);
        return ans.isEmpty() ? "0" : ans;
    }
}
```

```python [Python]
class Solution:
    def removeKdigits(self, num: str, k: int) -> str:
        st = []
        for c in num:
            while k and st and st[-1] > c:
                st.pop()
                k -= 1
            st.append(c)
        if k:
            st = st[:-k]
        res = "".join(st).lstrip('0')
        return res or "0"
```

```cpp [C++]
class Solution {
public:
    string removeKdigits(string num, int k) {
        string st;
        for (char c : num) {
            while (k > 0 && !st.empty() && st.back() > c) {
                st.pop_back();
                k--;
            }
            st.push_back(c);
        }
        while (k-- > 0 && !st.empty()) st.pop_back();
        int i = 0;
        while (i < st.size() && st[i] == '0') i++;
        string ans = st.substr(i);
        return ans.empty() ? "0" : ans;
    }
};
```

```go [Go]
func removeKdigits(num string, k int) string {
	st := []byte{}
	for i := 0; i < len(num); i++ {
		c := num[i]
		for k > 0 && len(st) > 0 && st[len(st)-1] > c {
			st = st[:len(st)-1]
			k--
		}
		st = append(st, c)
	}
	if k > 0 {
		st = st[:len(st)-k]
	}
	res := string(st)
	res = strings.TrimLeft(res, "0")
	if res == "" {
		return "0"
	}
	return res
}
```

```javascript [JavaScript]
var removeKdigits = function (num, k) {
    const st = [];
    for (const c of num) {
        while (k > 0 && st.length && st[st.length - 1] > c) {
            st.pop();
            k--;
        }
        st.push(c);
    }
    while (k-- > 0 && st.length) st.pop();
    let res = st.join('').replace(/^0+/, '');
    return res || '0';
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$，$n$ 为字符串长度。
- 空间复杂度：$O(n)$，栈。

## 三、总结

「高位尽量小」的贪心 + 单调栈是这类「删除若干位使数最小」的标准套路，类似题目：321 拼接最大数、402 本身、1673 找到最具竞争力的子序列。
