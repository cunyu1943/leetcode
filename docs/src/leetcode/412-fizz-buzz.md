# [412. Fizz Buzz](https://leetcode.cn/problems/fizz-buzz/)

## 一、题目描述

给你一个整数 `n`，从 `1` 到 `n` 打印每个数，但：

- 若能被 3 整除，输出 `"Fizz"`；
- 若能被 5 整除，输出 `"Buzz"`；
- 若同时被 3 和 5 整除，输出 `"FizzBuzz"`；
- 否则输出该数本身（以字符串形式）。

返回长度为 `n` 的结果列表。

**示例 1：**

```
输入：n = 3
输出：["1","2","Fizz"]
```

**示例 2：**

```

输入：n = 5
输出：["1","2","Fizz","4","Buzz"]
```

**提示：**

- `1 <= n <= 10^4`

## 二、解答方法

### 2.1 方法一：模拟

1. 思路

直接遍历 1~n，按整除规则拼接字符串。注意先判断 `15`（`3*5`）再分别判断 3、5，避免覆盖。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public List<String> fizzBuzz(int n) {
        List<String> res = new ArrayList<>();
        for (int i = 1; i <= n; i++) {
            StringBuilder sb = new StringBuilder();
            if (i % 3 == 0) sb.append("Fizz");
            if (i % 5 == 0) sb.append("Buzz");
            if (sb.length() == 0) sb.append(i);
            res.add(sb.toString());
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def fizzBuzz(self, n: int) -> List[str]:
        res = []
        for i in range(1, n + 1):
            s = ""
            if i % 3 == 0:
                s += "Fizz"
            if i % 5 == 0:
                s += "Buzz"
            res.append(s or str(i))
        return res
```

```cpp [C++]
class Solution {
public:
    vector<string> fizzBuzz(int n) {
        vector<string> res;
        for (int i = 1; i <= n; i++) {
            string s;
            if (i % 3 == 0) s += "Fizz";
            if (i % 5 == 0) s += "Buzz";
            if (s.empty()) s = to_string(i);
            res.push_back(s);
        }
        return res;
    }
};
```

```go [Go]
func fizzBuzz(n int) []string {
	res := make([]string, 0, n)
	for i := 1; i <= n; i++ {
		s := ""
		if i%3 == 0 {
			s += "Fizz"
		}
		if i%5 == 0 {
			s += "Buzz"
		}
		if s == "" {
			s = strconv.Itoa(i)
		}
		res = append(res, s)
	}
	return res
}
```

```javascript [JavaScript]
var fizzBuzz = function (n) {
    const res = [];
    for (let i = 1; i <= n; i++) {
        let s = "";
        if (i % 3 === 0) s += "Fizz";
        if (i % 5 === 0) s += "Buzz";
        res.push(s || String(i));
    }
    return res;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(1)$（不计输出）。

## 三、总结

经典的入门题。进阶写法：用哈希映射将「除数→字符串」解耦，便于扩展（如 3→Fizz、5→Buzz、7→Whizz）。本质是「按条件拼接输出」。
