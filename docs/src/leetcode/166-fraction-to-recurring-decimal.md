# [166. 分数到小数](https://leetcode.cn/problems/fraction-to-recurring-decimal/)



## 一、题目描述

给定两个整数，分别表示分数的分子 `numerator` 和分母 `denominator`，以 **字符串形式返回小数** 。

如果小数部分为循环小数，则将循环的部分括在括号内。

如果存在多个答案，只需返回 **任意一个** 。

对于所有给定的输入，**保证** 答案字符串的长度小于 `10⁴` 。



**示例 1：**

```
输入：numerator = 1, denominator = 2
输出："0.5"
```

**示例 2：**

```
输入：numerator = 2, denominator = 1
输出："2"
```

**示例 3：**

```
输入：numerator = 4, denominator = 333
输出："0.(012)"
```

**提示：**

-   `-2³¹ <= numerator, denominator <= 2³¹ - 1`
-   `denominator != 0`



## 二、解答方法

### 2.1 方法一：长除法 + 哈希表记录余数

1. **思路**

- 先处理符号（异号为负）。
- 整数部分 = `abs(num) / abs(den)`，余数 = `abs(num) % abs(den)`。
- 若有余数，加小数点，然后不断「余数×10 除以分母」得到下一位；用哈希表记录每个**余数**首次出现的位置，若余数重复说明开始循环，在对应位置插入 `(` 和末尾 `)`。
- 注意 `Integer.MIN_VALUE` 取绝对值会溢出，需用 `long`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public String fractionToDecimal(int numerator, int denominator) {
        if (numerator == 0) return "0";
        StringBuilder res = new StringBuilder();
        if ((numerator > 0 && denominator < 0) || (numerator < 0 && denominator > 0)) {
            res.append("-");
        }
        long a = Math.abs((long) numerator);
        long b = Math.abs((long) denominator);
        res.append(a / b);
        long rem = a % b;
        if (rem == 0) return res.toString();
        res.append(".");
        Map<Long, Integer> map = new HashMap<>();
        while (rem != 0) {
            if (map.containsKey(rem)) {
                res.insert(map.get(rem), "(");
                res.append(")");
                break;
            }
            map.put(rem, res.length());
            rem *= 10;
            res.append(rem / b);
            rem %= b;
        }
        return res.toString();
    }
}
```

```python [Python]
class Solution:
    def fractionToDecimal(self, numerator: int, denominator: int) -> str:
        if numerator == 0:
            return "0"
        res = []
        if (numerator > 0) != (denominator > 0):
            res.append("-")
        a, b = abs(numerator), abs(denominator)
        res.append(str(a // b))
        rem = a % b
        if rem == 0:
            return "".join(res)
        res.append(".")
        mp = {}
        while rem != 0:
            if rem in mp:
                res.insert(mp[rem], "(")
                res.append(")")
                break
            mp[rem] = len(res)
            rem *= 10
            res.append(str(rem // b))
            rem %= b
        return "".join(res)
```

```go [Go]
func fractionToDecimal(numerator int, denominator int) string {
    if numerator == 0 {
        return "0"
    }
    var res strings.Builder
    if (numerator > 0) != (denominator > 0) {
        res.WriteString("-")
    }
    a, b := abs(int64(numerator)), abs(int64(denominator))
    res.WriteString(strconv.FormatInt(a/b, 10))
    rem := a % b
    if rem == 0 {
        return res.String()
    }
    res.WriteString(".")
    mp := make(map[int64]int)
    for rem != 0 {
        if pos, ok := mp[rem]; ok {
            s := res.String()
            return s[:pos] + "(" + s[pos:] + ")"
        }
        mp[rem] = res.Len()
        rem *= 10
        res.WriteString(strconv.FormatInt(rem/b, 10))
        rem %= b
    }
    return res.String()
}

func abs(x int64) int64 { if x < 0 { return -x }; return x }
```

```cpp [C++]
class Solution {
public:
    string fractionToDecimal(int numerator, int denominator) {
        if (numerator == 0) return "0";
        string res;
        long long a = abs((long long)numerator);
        long long b = abs((long long)denominator);
        if ((numerator > 0) != (denominator > 0)) res += "-";
        res += to_string(a / b);
        long long rem = a % b;
        if (rem == 0) return res;
        res += ".";
        unordered_map<long long, int> mp;
        while (rem != 0) {
            if (mp.count(rem)) {
                res.insert(mp[rem], "(");
                res += ")";
                break;
            }
            mp[rem] = res.size();
            rem *= 10;
            res += to_string(rem / b);
            rem %= b;
        }
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
var fractionToDecimal = function (numerator, denominator) {
    if (numerator === 0) return "0";
    let res = [];
    if ((numerator > 0) !== (denominator > 0)) res.push("-");
    let a = Math.abs(numerator), b = Math.abs(denominator);
    res.push(Math.floor(a / b));
    let rem = a % b;
    if (rem === 0) return res.join("");
    res.push(".");
    const mp = new Map();
    while (rem !== 0) {
        if (mp.has(rem)) {
            res.splice(mp.get(rem), 0, "(");
            res.push(")");
            break;
        }
        mp.set(rem, res.length);
        rem *= 10;
        res.push(Math.floor(rem / b));
        rem %= b;
    }
    return res.join("");
};
```

```ts [TypeScript]
/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
function fractionToDecimal(numerator: number, denominator: number): string {
    if (numerator === 0) return "0";
    let res: (string | number)[] = [];
    if ((numerator > 0) !== (denominator > 0)) res.push("-");
    let a = Math.abs(numerator), b = Math.abs(denominator);
    res.push(Math.floor(a / b));
    let rem = a % b;
    if (rem === 0) return res.join("");
    res.push(".");
    const mp = new Map<number, number>();
    while (rem !== 0) {
        if (mp.has(rem)) {
            res.splice(mp.get(rem)!, 0, "(");
            res.push(")");
            break;
        }
        mp.set(rem, res.length);
        rem *= 10;
        res.push(Math.floor(rem / b));
        rem %= b;
    }
    return res.join("");
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，n 为结果长度。
- **空间复杂度**：`O(n)`。

## 三、总结

核心是**模拟长除法**，用哈希表记录余数出现位置来识别循环节。务必用 `long` 处理 `MIN_VALUE` 取绝对值溢出问题。
