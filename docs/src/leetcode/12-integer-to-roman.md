# [12. 整数转罗马数字](https://leetcode.cn/problems/integer-to-roman/)



## 一、题目描述

罗马数字包含以下七种字符：`I`、`V`、`X`、`L`、`C`、`D`、`M`，对应值分别为 1、5、10、50、100、500、1000。

罗马数字的规则：

- 如果该值不是以 4 或 9 开头，选择可从输入中减去的最大符号，附加到结果并减去其值；
- 若以 4 或 9 开头，使用减法形式：`IV`(4)、`IX`(9)、`XL`(40)、`XC`(90)、`CD`(400)、`CM`(900)；
- `I`、`X`、`C`、`M` 最多连续附加 3 次。

给定一个整数，将其转换为罗马数字。



**示例 1：**

```
输入：num = 3749
输出："MMMDCCXLIX"
解释：3000 = MMM，700 = DCC，40 = XL，9 = IX。
```

**示例 2：**

```
输入：num = 58
输出："LVIII"
解释：50 = L，8 = VIII。
```

**示例 3：**

```
输入：num = 1994
输出："MCMXCIV"
解释：1000 = M，900 = CM，90 = XC，4 = IV。
```

**提示：**

-   `1 <= num <= 3999`



## 二、解答方法

### 2.1 方法一：贪心（查表法）

1. **思路**

把所有可能的「符号—数值」对（含 6 个减法形式）按从大到小排序，每次用 `num` 减去不超过它的最大符号值，并拼上对应符号，直到 `num` 归零。这是最直观且高效的写法。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public String intToRoman(int num) {
        int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        String[] symbols = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < values.length; i++) {
            while (num >= values[i]) {
                num -= values[i];
                sb.append(symbols[i]);
            }
        }
        return sb.toString();
    }
}
```

```python [Python]
class Solution:
    def intToRoman(self, num: int) -> str:
        values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
        symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
        res = []
        for v, s in zip(values, symbols):
            while num >= v:
                num -= v
                res.append(s)
        return "".join(res)
```

```go [Go]
func intToRoman(num int) string {
    values := []int{1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1}
    symbols := []string{"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"}
    res := ""
    for i := 0; i < len(values); i++ {
        for num >= values[i] {
            num -= values[i]
            res += symbols[i]
        }
    }
    return res
}
```

```c [C]
char* intToRoman(int num) {
    int values[] = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
    char* symbols[] = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
    char* res = (char*)malloc(sizeof(char) * 16);
    res[0] = '\0';
    for (int i = 0; i < 13; i++) {
        while (num >= values[i]) {
            num -= values[i];
            strcat(res, symbols[i]);
        }
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    string intToRoman(int num) {
        int values[] = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        string symbols[] = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
        string res;
        for (int i = 0; i < 13; i++) {
            while (num >= values[i]) {
                num -= values[i];
                res += symbols[i];
            }
        }
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let res = '';
    for (let i = 0; i < values.length; i++) {
        while (num >= values[i]) {
            num -= values[i];
            res += symbols[i];
        }
    }
    return res;
};
```

```ts [TypeScript]
function intToRoman(num: number): string {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let res = '';
    for (let i = 0; i < values.length; i++) {
        while (num >= values[i]) {
            num -= values[i];
            res += symbols[i];
        }
    }
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(1)`，符号数量固定为 13，循环次数与数值位数相关，是常数级。
- **空间复杂度**：`O(1)`，只使用固定大小的查表数组。

### 2.2 方法二：按位拆分拼接

1. **思路**

将数字按千位、百位、十位、个位拆分，每一位分别映射到罗马数字（千位：`M`；百位：`C/CD/D/...`；十位：`X/XL/L/...`；个位：`I/IV/V/...`），逐位拼接。代码略长但无需减法形式判断逻辑。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public String intToRoman(int num) {
        String[] thousands = {"", "M", "MM", "MMM"};
        String[] hundreds = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
        String[] tens = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
        String[] ones = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};
        return thousands[num / 1000] + hundreds[(num % 1000) / 100]
             + tens[(num % 100) / 10] + ones[num % 10];
    }
}
```

```python [Python]
class Solution:
    def intToRoman(self, num: int) -> str:
        thousands = ["", "M", "MM", "MMM"]
        hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"]
        tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"]
        ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]
        return (thousands[num // 1000] + hundreds[(num % 1000) // 100]
                + tens[(num % 100) // 10] + ones[num % 10])
```

```go [Go]
func intToRoman(num int) string {
    thousands := []string{"", "M", "MM", "MMM"}
    hundreds := []string{"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"}
    tens := []string{"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"}
    ones := []string{"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"}
    return thousands[num/1000] + hundreds[(num%1000)/100] + tens[(num%100)/10] + ones[num%10]
}
```

```c [C]
char* intToRoman(int num) {
    char* thousands[] = {"", "M", "MM", "MMM"};
    char* hundreds[] = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
    char* tens[] = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
    char* ones[] = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};
    char* res = (char*)malloc(sizeof(char) * 16);
    sprintf(res, "%s%s%s%s",
            thousands[num / 1000], hundreds[(num % 1000) / 100],
            tens[(num % 100) / 10], ones[num % 10]);
    return res;
}
```

```cpp [C++]
class Solution {
public:
    string intToRoman(int num) {
        string thousands[] = {"", "M", "MM", "MMM"};
        string hundreds[] = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
        string tens[] = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
        string ones[] = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};
        return thousands[num / 1000] + hundreds[(num % 1000) / 100]
             + tens[(num % 100) / 10] + ones[num % 10];
    }
};
```

```js [JavaScript]
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
    const thousands = ["", "M", "MM", "MMM"];
    const hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
    const tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    const ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    return thousands[Math.floor(num / 1000)] + hundreds[Math.floor((num % 1000) / 100)]
        + tens[Math.floor((num % 100) / 10)] + ones[num % 10];
};
```

```ts [TypeScript]
function intToRoman(num: number): string {
    const thousands = ["", "M", "MM", "MMM"];
    const hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
    const tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    const ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    return thousands[Math.floor(num / 1000)] + hundreds[Math.floor((num % 1000) / 100)]
        + tens[Math.floor((num % 100) / 10)] + ones[num % 10];
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(1)`，四位拆分，常数操作。
- **空间复杂度**：`O(1)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 贪心（查表法） | `O(1)` | `O(1)` | 思路直观，通常更优 |
| 按位拆分拼接 | `O(1)` | `O(1)` | 常规实现 |

