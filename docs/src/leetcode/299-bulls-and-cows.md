# [299. 猜数字游戏](https://leetcode.cn/problems/bulls-and-cows/)

## 一、题目描述

你在和朋友玩 **猜数字（Bulls and Cows）** 游戏：你写下一个秘密数字，朋友猜一个数字。猜数字的反馈包含两部分：

-   **公牛（Bulls）**：位置和数字都猜对的个数；
-   **奶牛（Cows）**：数字猜对但位置不对的个数。

请写出一个函数，根据 **秘密数字** `secret` 和 **朋友猜测** `guess` 返回形如 `"xAyB"` 的提示，其中 `x` 是公牛数、`y` 是奶牛数。

**示例：**

```
输入：secret = "1807", guess = "7810"
输出："1A3B"
解释：'1' 位置对 → 1 公牛；'8','0','7' 数字对但位置错 → 3 奶牛
```

**提示：** `1 <= secret.length <= 1000`，`guess.length == secret.length`，只包含数字。

## 二、解答方法

### 方法一：一次遍历 + 计数数组

**思路：** 

1. 先统计 `Bulls`：逐位比较，`secret[i] == guess[i]` 则公牛数 +1，且这对字符不参与奶牛计数；
2. 统计 `Cows`：用两个长度 10 的计数数组分别统计 secret、guess 中「非公牛位」各数字出现次数。奶牛数 = 对每个数字取 `min(secret计数, guess计数)` 之和。

关键：奶牛数不能直接 `secret计数 - 公牛` 那样算，必须分别统计后取 min 并减去公牛。

:::::: code-group

```java [Java]
class Solution {
    public String getHint(String secret, String guess) {
        int bulls = 0;
        int[] cntS = new int[10], cntG = new int[10];
        for (int i = 0; i < secret.length(); i++) {
            if (secret.charAt(i) == guess.charAt(i)) bulls++;
            else {
                cntS[secret.charAt(i) - '0']++;
                cntG[guess.charAt(i) - '0']++;
            }
        }
        int cows = 0;
        for (int d = 0; d < 10; d++) cows += Math.min(cntS[d], cntG[d]);
        return bulls + "A" + cows + "B";
    }
}
```

```python [Python]
class Solution:
    def getHint(self, secret: str, guess: str) -> str:
        bulls = 0
        cntS, cntG = [0] * 10, [0] * 10
        for s, g in zip(secret, guess):
            if s == g:
                bulls += 1
            else:
                cntS[int(s)] += 1
                cntG[int(g)] += 1
        cows = sum(min(cntS[d], cntG[d]) for d in range(10))
        return f"{bulls}A{cows}B"
```

```cpp [C++]
class Solution {
public:
    string getHint(string secret, string guess) {
        int bulls = 0;
        int cntS[10] = {0}, cntG[10] = {0};
        for (int i = 0; i < secret.size(); i++) {
            if (secret[i] == guess[i]) bulls++;
            else { cntS[secret[i]-'0']++; cntG[guess[i]-'0']++; }
        }
        int cows = 0;
        for (int d = 0; d < 10; d++) cows += min(cntS[d], cntG[d]);
        return to_string(bulls) + "A" + to_string(cows) + "B";
    }
};
```

```go [Go]
func getHint(secret string, guess string) string {
    bulls := 0
    cntS, cntG := [10]int{}, [10]int{}
    for i := 0; i < len(secret); i++ {
        if secret[i] == guess[i] {
            bulls++
        } else {
            cntS[secret[i]-'0']++
            cntG[guess[i]-'0']++
        }
    }
    cows := 0
    for d := 0; d < 10; d++ {
        if cntS[d] < cntG[d] { cows += cntS[d] } else { cows += cntG[d] }
    }
    return strconv.Itoa(bulls) + "A" + strconv.Itoa(cows) + "B"
}
```

```js [JavaScript]
var getHint = function (secret, guess) {
    let bulls = 0;
    const cntS = new Array(10).fill(0), cntG = new Array(10).fill(0);
    for (let i = 0; i < secret.length; i++) {
        if (secret[i] === guess[i]) bulls++;
        else { cntS[secret[i]]++; cntG[guess[i]]++; }
    }
    let cows = 0;
    for (let d = 0; d < 10; d++) cows += Math.min(cntS[d], cntG[d]);
    return bulls + "A" + cows + "B";
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(1)`。

## 三、总结

经典「一次遍历 + 计数」题。易错点在于 **奶牛数计算**：需分别统计 secret 和 guess（排除公牛位后）各数字频次，再按位取 `min` 求和。直接 `Σmin(cntS, cntG)` 已自动排除公牛（因为公牛位的字符已被剔除），无需再手动减。这是 `1A3B` 格式反馈，与 Mastermind 游戏同源。
