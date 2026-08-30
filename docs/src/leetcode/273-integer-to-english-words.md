# [273. 整数转换英文表示](https://leetcode.cn/problems/integer-to-english-words/)

## 一、题目描述

将非负整数 `num` 转换为其对应的英文表示。

**示例：**

```
输入：num = 123       输出："One Hundred Twenty Three"
输入：num = 12345     输出："Twelve Thousand Three Hundred Forty Five"
输入：num = 1234567   输出："One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
```

**提示：** `0 <= num <= 2³¹ - 1`

## 二、解答方法

### 方法一：分块递归（三位一组）

**思路：** 英文数字以三位（千分位）为一组，每组读法相同，只需加上单位（`Thousand`、`Million`、`Billion`）。

1. 准备三张表：`below20`（0~19）、`tens`（20/30/.../90）、`thousands`（["", "Thousand", "Million", "Billion"]）。
2. `num` 按 1000 分块，从低位到高位，每块调用 `helper(n)` 转成三位内英文，非空则拼单位。
3. `helper(n)` 处理 1~999：`n>=100` 加 `below20[n/100]+" Hundred"`；余数 `<20` 查表；否则加 `tens[rem/10]` 与 `below20[rem%10]`。

:::::: code-group

```java [Java]
class Solution {
    private final String[] b20 = {"","One","Two","Three","Four","Five","Six","Seven","Eight","Nine",
        "Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"};
    private final String[] tens = {"","Ten","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"};
    private final String[] thou = {"","Thousand","Million","Billion"};

    public String numberToWords(int num) {
        if (num == 0) return "Zero";
        StringBuilder sb = new StringBuilder();
        int i = 0;
        while (num > 0) {
            int chunk = num % 1000;
            if (chunk != 0) {
                String part = helper(chunk) + (thou[i].isEmpty() ? "" : " " + thou[i]);
                sb.insert(0, sb.length() == 0 ? part : part + " ");
            }
            num /= 1000; i++;
        }
        return sb.toString();
    }
    private String helper(int n) {
        if (n == 0) return "";
        if (n < 20) return b20[n];
        if (n < 100) return tens[n/10] + (n%10==0 ? "" : " " + b20[n%10]);
        return b20[n/100] + " Hundred" + (n%100==0 ? "" : " " + helper(n%100));
    }
}
```

```python [Python]
class Solution:
    def numberToWords(self, num: int) -> str:
        if num == 0: return "Zero"
        b20 = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine",
               "Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen",
               "Seventeen","Eighteen","Nineteen"]
        tens = ["","Ten","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"]
        thou = ["","Thousand","Million","Billion"]

        def helper(n):
            if n == 0: return ""
            if n < 20: return b20[n]
            if n < 100: return tens[n//10] + ("" if n%10==0 else " " + b20[n%10])
            return b20[n//100] + " Hundred" + ("" if n%100==0 else " " + helper(n%100))

        res, i = [], 0
        while num > 0:
            chunk = num % 1000
            if chunk:
                part = helper(chunk)
                if thou[i]: part += " " + thou[i]
                res.append(part)
            num //= 1000; i += 1
        return " ".join(reversed(res))
```

```cpp [C++]
class Solution {
    vector<string> b20 = {"","One","Two","Three","Four","Five","Six","Seven","Eight","Nine",
        "Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"};
    vector<string> tens = {"","Ten","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"};
    vector<string> thou = {"","Thousand","Million","Billion"};
    string helper(int n) {
        if (n == 0) return "";
        if (n < 20) return b20[n];
        if (n < 100) return tens[n/10] + (n%10==0 ? "" : " " + b20[n%10]);
        return b20[n/100] + " Hundred" + (n%100==0 ? "" : " " + helper(n%100));
    }
public:
    string numberToWords(int num) {
        if (num == 0) return "Zero";
        string res; int i = 0;
        while (num > 0) {
            int chunk = num % 1000;
            if (chunk) {
                string part = helper(chunk) + (thou[i].empty() ? "" : " " + thou[i]);
                res = res.empty() ? part : part + " " + res;
            }
            num /= 1000; i++;
        }
        return res;
    }
};
```

```js [JavaScript]
var numberToWords = function (num) {
    if (num === 0) return 'Zero';
    const b20 = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine",
        "Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
    const tens = ["","Ten","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
    const thou = ["","Thousand","Million","Billion"];
    const helper = (n) => {
        if (n === 0) return '';
        if (n < 20) return b20[n];
        if (n < 100) return tens[Math.floor(n/10)] + (n%10 ? ' ' + b20[n%10] : '');
        return b20[Math.floor(n/100)] + ' Hundred' + (n%100 ? ' ' + helper(n%100) : '');
    };
    const parts = []; let i = 0;
    while (num > 0) {
        const chunk = num % 1000;
        if (chunk) {
            let part = helper(chunk);
            if (thou[i]) part += ' ' + thou[i];
            parts.unshift(part);
        }
        num = Math.floor(num / 1000); i++;
    }
    return parts.join(' ');
};
```

```go [Go]
func numberToWords(num int) string {
    if num == 0 { return "Zero" }
    b20 := []string{"","One","Two","Three","Four","Five","Six","Seven","Eight","Nine",
        "Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"}
    tens := []string{"","Ten","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"}
    thou := []string{"","Thousand","Million","Billion"}
    var helper func(int) string
    helper = func(n int) string {
        if n == 0 { return "" }
        if n < 20 { return b20[n] }
        if n < 100 {
            if n%10 == 0 { return tens[n/10] }
            return tens[n/10] + " " + b20[n%10]
        }
        if n%100 == 0 { return b20[n/100] + " Hundred" }
        return b20[n/100] + " Hundred " + helper(n%100)
    }
    parts := []string{}; i := 0
    for num > 0 {
        chunk := num % 1000
        if chunk != 0 {
            part := helper(chunk)
            if thou[i] != "" { part += " " + thou[i] }
            parts = append([]string{part}, parts...)
        }
        num /= 1000; i++
    }
    return strings.Join(parts, " ")
}
```

::::::

**复杂度：** 时间 `O(1)`（num 最多 10 位），空间 `O(1)`。

## 三、总结

核心：英文数字按 **千分位分组**，每组独立转换后拼单位。注意 `0` 返回 `"Zero"`，且词间用单个空格连接、词内（如 `Twenty Three`）也用空格。这是纯字符串拼接题，难点在于边界（如 `1000000` → `"One Million"` 不能有多余空格）。
