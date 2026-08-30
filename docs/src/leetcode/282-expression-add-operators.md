# [282. 给表达式添加运算符](https://leetcode.cn/problems/expression-add-operators/)

## 一、题目描述

给定一个仅包含数字 `0-9` 的字符串 `num` 和一个目标值 `target`。在 `num` 的数字之间添加 **二元** 运算符（不是一元）`+`、`-` 或 `*`，返回所有能够得到 `target` 的 **不同表达式**。

**注意：**

-   运算符不能放在字符串的开头（即表达式第一个字符必须是数字）；
-   **不允许出现前导零的数字**（如 `num = "105"`，不能拆出 `1` 和 `05`）；
-   允许产生中间负数。

**示例：**

```
输入：num = "123", target = 6   输出：["1+2+3", "1*2*3"]
输入：num = "105", target = 5   输出：["1*0+5","10-5"]
```

**提示：** `1 <= num.length <= 10`，`-2³¹ <= target <= 2³¹ - 1`

## 二、解答方法

### 方法一：回溯 + 表达式求值（处理乘号优先级）

**思路：** 回溯枚举每个分割点处放 `+` / `-` / `*` / 不放大（拼接数字）。关键难点是 **乘法优先级**：

维护当前表达式的 `value` 和「**上一个操作数 `prev`**」。

- 加：`value += cur`，`prev = cur`；
- 减：`value -= cur`，`prev = -cur`；
- 乘：`value = value - prev + prev * cur`（先撤销上一个操作数贡献再乘以 cur 加入），`prev = prev * cur`。

这样可在递归中 `O(1)` 维护累计值，无需存储整条表达式再算。

前导零处理：若 `num[start] == '0'`，则该段只能取 `"0"` 单个字符。

:::::: code-group

```java [Java]
class Solution {
    private List<String> res = new ArrayList<>();
    private String num;
    private int target;

    public List<String> addOperators(String num, int target) {
        this.num = num; this.target = target;
        backtrack(0, 0, 0, "");
        return res;
    }
    // start: 字符串位置; value: 当前表达式值; prev: 上一个操作数
    private void backtrack(int start, long value, long prev, String expr) {
        if (start == num.length()) {
            if (value == target) res.add(expr);
            return;
        }
        for (int i = start + 1; i <= num.length(); i++) {
            String seg = num.substring(start, i);
            long cur = Long.parseLong(seg);
            if (seg.length() > 1 && seg.charAt(0) == '0') break;  // 前导零
            if (start == 0) {                                      // 第一段，不加符号
                backtrack(i, cur, cur, seg);
            } else {
                backtrack(i, value + cur, cur, expr + "+" + seg);
                backtrack(i, value - cur, -cur, expr + "-" + seg);
                backtrack(i, value - prev + prev * cur, prev * cur, expr + "*" + seg);
            }
        }
    }
}
```

```python [Python]
class Solution:
    def addOperators(self, num: str, target: int) -> List[str]:
        res = []
        def backtrack(start, value, prev, expr):
            if start == len(num):
                if value == target:
                    res.append(expr)
                return
            for i in range(start + 1, len(num) + 1):
                seg = num[start:i]
                if len(seg) > 1 and seg[0] == '0':   # 前导零
                    break
                cur = int(seg)
                if start == 0:
                    backtrack(i, cur, cur, seg)
                else:
                    backtrack(i, value + cur, cur, expr + "+" + seg)
                    backtrack(i, value - cur, -cur, expr + "-" + seg)
                    backtrack(i, value - prev + prev * cur, prev * cur, expr + "*" + seg)
        backtrack(0, 0, 0, "")
        return res
```

```cpp [C++]
class Solution {
public:
    vector<string> addOperators(string num, int target) {
        vector<string> res;
        function<void(int, long, long, string)> backtrack =
            [&](int start, long value, long prev, string expr) {
                if (start == num.size()) {
                    if (value == target) res.push_back(expr);
                    return;
                }
                for (int i = start + 1; i <= num.size(); i++) {
                    string seg = num.substr(start, i - start);
                    if (seg.size() > 1 && seg[0] == '0') break;   // 前导零
                    long cur = stol(seg);
                    if (start == 0) {
                        backtrack(i, cur, cur, seg);
                    } else {
                        backtrack(i, value + cur, cur, expr + "+" + seg);
                        backtrack(i, value - cur, -cur, expr + "-" + seg);
                        backtrack(i, value - prev + prev * cur, prev * cur, expr + "*" + seg);
                    }
                }
            };
        backtrack(0, 0, 0, "");
        return res;
    }
};
```

```go [Go]
func addOperators(num string, target int) []string {
    var res []string
    var backtrack func(start int, value, prev int64, expr string)
    backtrack = func(start int, value, prev int64, expr string) {
        if start == len(num) {
            if value == int64(target) {
                res = append(res, expr)
            }
            return
        }
        for i := start + 1; i <= len(num); i++ {
            seg := num[start:i]
            if len(seg) > 1 && seg[0] == '0' {
                break
            }
            cur, _ := strconv.ParseInt(seg, 10, 64)
            if start == 0 {
                backtrack(i, cur, cur, seg)
            } else {
                backtrack(i, value+cur, cur, expr+"+"+seg)
                backtrack(i, value-cur, -cur, expr+"-"+seg)
                backtrack(i, value-prev+prev*cur, prev*cur, expr+"*"+seg)
            }
        }
    }
    backtrack(0, 0, 0, "")
    return res
}
```

```js [JavaScript]
var addOperators = function (num, target) {
    const res = [];
    const backtrack = (start, value, prev, expr) => {
        if (start === num.length) {
            if (value === target) res.push(expr);
            return;
        }
        for (let i = start + 1; i <= num.length; i++) {
            const seg = num.slice(start, i);
            if (seg.length > 1 && seg[0] === '0') break;
            const cur = Number(seg);
            if (start === 0) {
                backtrack(i, cur, cur, seg);
            } else {
                backtrack(i, value + cur, cur, expr + "+" + seg);
                backtrack(i, value - cur, -cur, expr + "-" + seg);
                backtrack(i, value - prev + prev * cur, prev * cur, expr + "*" + seg);
            }
        }
    };
    backtrack(0, 0, 0, "");
    return res;
};
```

::::::

**复杂度：** 时间 `O(4ⁿ)`（每个分割点 4 种选择：3 个符号 + 拼接），空间 `O(n)`。

## 三、总结

本题是 **组合型回溯** 结合「表达式求值」的经典难题。两大陷阱：

1. **乘法优先级**：必须用 `prev`（上一个操作数）修正，`value = value - prev + prev * cur`；否则只按左到右算会错；
2. **前导零**：`"05"` 非法，遇到 `seg[0]=='0'` 且长度 >1 必须 `break`（后续更长段同样非法）。

用 `long`/`int64` 防止中间结果溢出 `int`（target 范围 2³¹，但中间值可能超 int）。这是面试高频题，务必掌握 `prev` 修正技巧。
