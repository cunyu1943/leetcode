# [面试题 05.02. 二进制数转字符串](https://leetcode.cn/problems/binary-number-to-string-lcci/)

## 一、题目描述

给定一个介于 0 和 1 之间的实数（如 `0.72`），类型为 `double`，打印它的二进制表示。如果该数字无法精确地用 32 位以内的二进制表示，则打印 `"ERROR"`。

**示例 1：**

```
输入：0.625
输出："0.101"
```

**示例 2：**

```
输入：0.1
输出："ERROR"
解释：0.1 无法用二进制精确表示。
```

**提示：**

- `0 <= num <= 1`
- 如果 `num` 无法用 32 位以内的二进制表示，则返回 `"ERROR"`。

---

## 二、解答方法

### 2.1 方法一：循环乘二取整（迭代）

**1. 思路**

将小数部分不断乘以 2，取整数部分作为二进制位，直到小数部分为 0 或达到 32 位（题目要求 32 位以内）。若循环 32 次后仍未精确，则返回 `"ERROR"`。注意处理 `num == 0` 和 `num == 1` 的边界情况。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public String printBin(double num) {
        if (num == 0) return "0";
        if (num == 1) return "1";
        StringBuilder sb = new StringBuilder("0.");
        double frac = num;
        for (int i = 0; i < 32; i++) {
            frac *= 2;
            if (frac >= 1) {
                sb.append('1');
                frac -= 1;
                if (frac == 0) return sb.toString();
            } else {
                sb.append('0');
            }
        }
        return "ERROR";
    }
}
```

```python [Python]
class Solution:
    def printBin(self, num: float) -> str:
        if num == 0: return "0"
        if num == 1: return "1"
        res = "0."
        frac = num
        for _ in range(32):
            frac *= 2
            if frac >= 1:
                res += "1"
                frac -= 1
                if frac == 0:
                    return res
            else:
                res += "0"
        return "ERROR"
```

```go [Go]
func printBin(num float64) string {
    if num == 0 { return "0" }
    if num == 1 { return "1" }
    res := "0."
    frac := num
    for i := 0; i < 32; i++ {
        frac *= 2
        if frac >= 1 {
            res += "1"
            frac -= 1
            if frac == 0 {
                return res
            }
        } else {
            res += "0"
        }
    }
    return "ERROR"
}
```

```c [C]
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>

char* printBin(double num) {
    if (num == 0) return "0";
    if (num == 1) return "1";
    char* res = (char*)malloc(50 * sizeof(char));
    strcpy(res, "0.");
    double frac = num;
    int idx = 2; // 从第三个字符开始填充
    for (int i = 0; i < 32; i++) {
        frac *= 2;
        if (frac >= 1) {
            res[idx++] = '1';
            frac -= 1;
            if (frac == 0) {
                res[idx] = '\0';
                return res;
            }
        } else {
            res[idx++] = '0';
        }
    }
    return "ERROR";
}
```

```cpp [C++]
class Solution {
public:
    string printBin(double num) {
        if (num == 0) return "0";
        if (num == 1) return "1";
        string res = "0.";
        double frac = num;
        for (int i = 0; i < 32; i++) {
            frac *= 2;
            if (frac >= 1) {
                res += '1';
                frac -= 1;
                if (frac == 0) return res;
            } else {
                res += '0';
            }
        }
        return "ERROR";
    }
};
```

```javascript [JavaScript]
var printBin = function(num) {
    if (num === 0) return "0";
    if (num === 1) return "1";
    let res = "0.";
    let frac = num;
    for (let i = 0; i < 32; i++) {
        frac *= 2;
        if (frac >= 1) {
            res += "1";
            frac -= 1;
            if (frac === 0) return res;
        } else {
            res += "0";
        }
    }
    return "ERROR";
};
```

```typescript [TypeScript]
function printBin(num: number): string {
    if (num === 0) return "0";
    if (num === 1) return "1";
    let res = "0.";
    let frac = num;
    for (let i = 0; i < 32; i++) {
        frac *= 2;
        if (frac >= 1) {
            res += "1";
            frac -= 1;
            if (frac === 0) return res;
        } else {
            res += "0";
        }
    }
    return "ERROR";
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`，最多循环 32 次。
- **空间复杂度**：`O(1)`，仅使用常数空间存储字符串。

---

### 2.2 方法二：递归实现（逐步逼近）

**1. 思路**

递归函数处理小数部分，每次将小数乘以 2，若结果 >= 1 则取整数部分 1，继续递归处理剩余小数；否则取 0，继续处理。递归深度同样限制为 32 层。该方法与迭代本质相同，但使用递归展示不同编码风格。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public String printBin(double num) {
        if (num == 0) return "0";
        if (num == 1) return "1";
        StringBuilder sb = new StringBuilder("0.");
        if (!dfs(num, sb, 0)) return "ERROR";
        return sb.toString();
    }
    private boolean dfs(double frac, StringBuilder sb, int depth) {
        if (depth >= 32) return false;
        if (frac == 0) return true;
        frac *= 2;
        if (frac >= 1) {
            sb.append('1');
            return dfs(frac - 1, sb, depth + 1);
        } else {
            sb.append('0');
            return dfs(frac, sb, depth + 1);
        }
    }
}
```

```python [Python]
class Solution:
    def printBin(self, num: float) -> str:
        if num == 0: return "0"
        if num == 1: return "1"
        self.res = "0."
        if not self.dfs(num, 0):
            return "ERROR"
        return self.res

    def dfs(self, frac, depth):
        if depth >= 32:
            return False
        if frac == 0:
            return True
        frac *= 2
        if frac >= 1:
            self.res += "1"
            return self.dfs(frac - 1, depth + 1)
        else:
            self.res += "0"
            return self.dfs(frac, depth + 1)
```

```go [Go]
func printBin(num float64) string {
    if num == 0 { return "0" }
    if num == 1 { return "1" }
    res := "0."
    if !dfs(num, &res, 0) {
        return "ERROR"
    }
    return res
}
func dfs(frac float64, res *string, depth int) bool {
    if depth >= 32 {
        return false
    }
    if frac == 0 {
        return true
    }
    frac *= 2
    if frac >= 1 {
        *res += "1"
        return dfs(frac-1, res, depth+1)
    } else {
        *res += "0"
        return dfs(frac, res, depth+1)
    }
}
```

```c [C]
#include <stdbool.h>
#include <string.h>
#include <stdlib.h>

bool dfs(double frac, char* res, int idx, int depth) {
    if (depth >= 32) return false;
    if (frac == 0) {
        res[idx] = '\0';
        return true;
    }
    frac *= 2;
    if (frac >= 1) {
        res[idx] = '1';
        return dfs(frac - 1, res, idx+1, depth+1);
    } else {
        res[idx] = '0';
        return dfs(frac, res, idx+1, depth+1);
    }
}
char* printBin(double num) {
    if (num == 0) return "0";
    if (num == 1) return "1";
    char* res = (char*)malloc(50 * sizeof(char));
    strcpy(res, "0.");
    if (!dfs(num, res, 2, 0)) {
        return "ERROR";
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    string printBin(double num) {
        if (num == 0) return "0";
        if (num == 1) return "1";
        string res = "0.";
        if (!dfs(num, res, 0)) return "ERROR";
        return res;
    }
    bool dfs(double frac, string& res, int depth) {
        if (depth >= 32) return false;
        if (frac == 0) return true;
        frac *= 2;
        if (frac >= 1) {
            res += '1';
            return dfs(frac - 1, res, depth + 1);
        } else {
            res += '0';
            return dfs(frac, res, depth + 1);
        }
    }
};
```

```javascript [JavaScript]
var printBin = function(num) {
    if (num === 0) return "0";
    if (num === 1) return "1";
    let res = "0.";
    function dfs(frac, depth) {
        if (depth >= 32) return false;
        if (frac === 0) return true;
        frac *= 2;
        if (frac >= 1) {
            res += "1";
            return dfs(frac - 1, depth + 1);
        } else {
            res += "0";
            return dfs(frac, depth + 1);
        }
    }
    if (!dfs(num, 0)) return "ERROR";
    return res;
};
```

```typescript [TypeScript]
function printBin(num: number): string {
    if (num === 0) return "0";
    if (num === 1) return "1";
    let res = "0.";
    function dfs(frac: number, depth: number): boolean {
        if (depth >= 32) return false;
        if (frac === 0) return true;
        frac *= 2;
        if (frac >= 1) {
            res += "1";
            return dfs(frac - 1, depth + 1);
        } else {
            res += "0";
            return dfs(frac, depth + 1);
        }
    }
    if (!dfs(num, 0)) return "ERROR";
    return res;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`，递归深度固定 32。
- **空间复杂度**：`O(1)`，递归栈深度固定 32。

---

## 三、总结

| 方法         | 时间复杂度 | 空间复杂度 | 特点                     |
| ------------ | ---------- | ---------- | ------------------------ |
| 循环乘二取整 | `O(1)`     | `O(1)`     | 直观，推荐               |
| 递归实现     | `O(1)`     | `O(1)`     | 体现递归思想，可读性稍差 |

**推荐**：在实际生产环境中，**方法一（循环迭代）** 是最佳选择，逻辑清晰且易于理解。递归方法虽然也能达到目的，但增加调用栈开销，且代码略复杂。两种方法均能正确判断是否可精确表示。注意边界条件：`num == 0` 和 `num == 1` 应直接返回对应字符串，避免进入循环。