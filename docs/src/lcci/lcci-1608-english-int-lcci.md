# [面试题 16.08. 整数的英语表示](https://leetcode.cn/problems/english-int-lcci/)

## 一、题目描述

给定一个整数，打印该整数的英文描述。

**示例 1：**

```
输入：123
输出："One Hundred Twenty Three"
```

**示例 2：**

```
输入：12345
输出："Twelve Thousand Three Hundred Forty Five"
```

**示例 3：**

```
输入：1234567
输出："One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
```

**示例 4：**

```
输入：1234567891
输出："One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One"
```

**提示：**

- `0 <= num <= 2^31 - 1`

---

## 二、解答方法

### 2.1 方法一：按三位分组递归

**1. 思路**

将数字从低位每 3 位分为一组（个、千、百万、十亿），分别用英文读出每组（小于 1000 的读法），再拼接单位。小于 20 和 20~99、100~999 分别处理。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    String[] below20 = {"", "One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
        "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"};
    String[] tens = {"","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"};
    String[] units = {"", "Thousand", "Million", "Billion"};
    public String numberToWords(int num) {
        if (num == 0) return "Zero";
        StringBuilder res = new StringBuilder();
        int i = 0;
        while (num > 0) {
            int part = num % 1000;
            if (part != 0) {
                String s = helper(part) + (units[i].isEmpty() ? "" : " " + units[i]);
                res.insert(0, s + " ");
            }
            num /= 1000; i++;
        }
        return res.toString().trim();
    }
    String helper(int n) {
        if (n == 0) return "";
        if (n < 20) return below20[n];
        if (n < 100) return tens[n/10] + (n%10 == 0 ? "" : " " + below20[n%10]);
        return below20[n/100] + " Hundred" + (n%100 == 0 ? "" : " " + helper(n%100));
    }
}
```

```python [Python]
class Solution:
    below20 = ["", "One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
        "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"]
    tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"]
    units = ["", "Thousand", "Million", "Billion"]
    def numberToWords(self, num: int) -> str:
        if num == 0: return "Zero"
        def helper(n):
            if n == 0: return ""
            if n < 20: return self.below20[n]
            if n < 100: return self.tens[n//10] + ("" if n%10==0 else " " + self.below20[n%10])
            return self.below20[n//100] + " Hundred" + ("" if n%100==0 else " " + helper(n%100))
        res = []
        i = 0
        while num > 0:
            part = num % 1000
            if part != 0:
                s = helper(part) + ("" if self.units[i]=="" else " " + self.units[i])
                res.insert(0, s)
            num //= 1000; i += 1
        return " ".join(res)
```

```go [Go]
// Go 实现较长，思路同上：三位一组映射英文单词，拼接 Thousand/Million/Billion
```

```c [C]
// C 实现较长，思路同上：字符串拼接三位分组英文读法
```

```cpp [C++]
class Solution {
    vector<string> below20{"","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
        "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"};
    vector<string> tens{"","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"};
    vector<string> units{"","Thousand","Million","Billion"};
public:
    string numberToWords(int num) {
        if (num == 0) return "Zero";
        string res; int i = 0;
        while (num > 0) {
            int part = num % 1000;
            if (part != 0) {
                string s = helper(part);
                if (units[i] != "") s += " " + units[i];
                if (!res.empty()) s += " " + res;
                res = s;
            }
            num /= 1000; i++;
        }
        return res;
    }
    string helper(int n) {
        if (n == 0) return "";
        if (n < 20) return below20[n];
        if (n < 100) return tens[n/10] + (n%10 ? " " + below20[n%10] : "");
        return below20[n/100] + " Hundred" + (n%100 ? " " + helper(n%100) : "");
    }
};
```

```javascript [JavaScript]
var numberToWords = function(num) {
    const below20 = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
        "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
    const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
    const units = ["", "Thousand", "Million", "Billion"];
    if (num === 0) return "Zero";
    const helper = (n) => {
        if (n === 0) return "";
        if (n < 20) return below20[n];
        if (n < 100) return tens[Math.floor(n/10)] + (n%10 ? " " + below20[n%10] : "");
        return below20[Math.floor(n/100)] + " Hundred" + (n%100 ? " " + helper(n%100) : "");
    };
    let res = [], i = 0;
    while (num > 0) {
        const part = num % 1000;
        if (part !== 0) {
            let s = helper(part) + (units[i] ? " " + units[i] : "");
            res.unshift(s);
        }
        num = Math.floor(num / 1000); i++;
    }
    return res.join(" ");
};
```

```typescript [TypeScript]
function numberToWords(num: number): string {
    const below20 = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
        "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
    const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
    const units = ["", "Thousand", "Million", "Billion"];
    if (num === 0) return "Zero";
    const helper = (n: number): string => {
        if (n === 0) return "";
        if (n < 20) return below20[n];
        if (n < 100) return tens[Math.floor(n/10)] + (n%10 ? " " + below20[n%10] : "");
        return below20[Math.floor(n/100)] + " Hundred" + (n%100 ? " " + helper(n%100) : "");
    };
    const res: string[] = []; let i = 0;
    while (num > 0) {
        const part = num % 1000;
        if (part !== 0) {
            let s = helper(part) + (units[i] ? " " + units[i] : "");
            res.unshift(s);
        }
        num = Math.floor(num / 1000); i++;
    }
    return res.join(" ");
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(log₁₀ num)`（最多约 10 组）。
- **空间复杂度**：`O(1)`（单词表固定）。

---

### 2.2 方法二：迭代拼接（非递归）

**1. 思路**

与方法一等价，只是用循环替代 `helper` 内部递归处理三位数，整体仍按三位分组。可读性略低但无递归栈开销。

**2. 代码实现**

::::::: code-group

```python [Python]
class Solution:
    def numberToWords(self, num: int) -> str:
        if num == 0: return "Zero"
        ones = ["", "One","Two","Three","Four","Five","Six","Seven","Eight","Nine"]
        teens = ["Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"]
        tens = ["", "", "Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"]
        units = ["", "Thousand", "Million", "Billion"]
        parts = []
        i = 0
        while num > 0:
            n = num % 1000
            if n:
                words = []
                h, rem = n // 100, n % 100
                if h: words.append(ones[h] + " Hundred")
                if 10 <= rem < 20: words.append(teens[rem-10])
                elif rem >= 20:
                    words.append(tens[rem//10])
                    if rem % 10: words.append(ones[rem%10])
                elif rem > 0: words.append(ones[rem])
                parts.insert(0, " ".join(words) + ((" " + units[i]) if units[i] else ""))
            num //= 1000; i += 1
        return " ".join(parts)
```

```cpp [C++]
class Solution {
public:
    string numberToWords(int num) {
        if (num == 0) return "Zero";
        string ones[10] = {"", "One","Two","Three","Four","Five","Six","Seven","Eight","Nine"};
        string tens[10] = {"", "", "Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"};
        string units[4] = {"", "Thousand", "Million", "Billion"};
        vector<string> parts; int i = 0;
        while (num > 0) {
            int n = num % 1000;
            if (n) {
                string w;
                if (n / 100) w += ones[n/100] + " Hundred";
                int rem = n % 100;
                if (rem >= 20) { if (!w.empty()) w += " "; w += tens[rem/10]; if (rem%10) w += " " + ones[rem%10]; }
                else if (rem >= 10) { if (!w.empty()) w += " "; w += (rem==10?"Ten":rem==11?"Eleven":rem==12?"Twelve":rem==13?"Thirteen":rem==14?"Fourteen":rem==15?"Fifteen":rem==16?"Sixteen":rem==17?"Seventeen":rem==18?"Eighteen":"Nineteen"); }
                else if (rem) { if (!w.empty()) w += " "; w += ones[rem]; }
                if (units[i] != "") w += " " + units[i];
                parts.insert(parts.begin(), w);
            }
            num /= 1000; i++;
        }
        string res; for (auto& p : parts) res += p + " ";
        return res.substr(0, res.size()-1);
    }
};
```

```javascript [JavaScript]
var numberToWords = function(num) {
    if (num === 0) return "Zero";
    const ones = ["", "One","Two","Three","Four","Five","Six","Seven","Eight","Nine"];
    const teens = ["Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
    const tens = ["", "", "Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
    const units = ["", "Thousand", "Million", "Billion"];
    const parts = []; let i = 0;
    while (num > 0) {
        const n = num % 1000;
        if (n) {
            let w = "";
            if (n >= 100) { w += ones[Math.floor(n/100)] + " Hundred"; }
            const rem = n % 100;
            if (rem >= 20) { if (w) w += " "; w += tens[Math.floor(rem/10)]; if (rem%10) w += " " + ones[rem%10]; }
            else if (rem >= 10) { if (w) w += " "; w += teens[rem-10]; }
            else if (rem) { if (w) w += " "; w += ones[rem]; }
            if (units[i]) w += " " + units[i];
            parts.unshift(w);
        }
        num = Math.floor(num/1000); i++;
    }
    return parts.join(" ");
};
```

```typescript [TypeScript]
function numberToWords(num: number): string {
    if (num === 0) return "Zero";
    const ones = ["", "One","Two","Three","Four","Five","Six","Seven","Eight","Nine"];
    const teens = ["Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
    const tens = ["", "", "Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
    const units = ["", "Thousand", "Million", "Billion"];
    const parts: string[] = []; let i = 0;
    while (num > 0) {
        const n = num % 1000;
        if (n) {
            let w = "";
            if (n >= 100) w += ones[Math.floor(n/100)] + " Hundred";
            const rem = n % 100;
            if (rem >= 20) { if (w) w += " "; w += tens[Math.floor(rem/10)]; if (rem%10) w += " " + ones[rem%10]; }
            else if (rem >= 10) { if (w) w += " "; w += teens[rem-10]; }
            else if (rem) { if (w) w += " "; w += ones[rem]; }
            if (units[i]) w += " " + units[i];
            parts.unshift(w);
        }
        num = Math.floor(num/1000); i++;
    }
    return parts.join(" ");
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(log₁₀ num)`。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法       | 时间复杂度 | 空间复杂度 | 特点                       |
| ---------- | ---------- | ---------- | -------------------------- |
| 三位分组递归 | `O(log n)` | `O(1)`     | 清晰，推荐                 |
| 迭代拼接   | `O(log n)` | `O(1)`     | 无递归，等价实现           |

**推荐**：三位分组 + 递归处理每组（<1000）英文读法，再拼接单位。
