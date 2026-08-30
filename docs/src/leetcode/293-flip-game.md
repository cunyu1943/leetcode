# [293. 翻转游戏](https://leetcode.cn/problems/flip-game/) [🔒 会员题]

## 一、题目描述

你和朋友玩一个叫「翻转游戏」的游戏，游戏规则：给定一个只包含 `+` 和 `-` 的字符串。你和朋友轮流将 **连续的两个 `++`** 翻转为 `--`。谁不能进行操作（没有 `++`）谁就输掉游戏。

请实现一个函数，计算并返回 **所有可能的下一步操作后的字符串列表**（即把所有能翻转的 `++` 都翻一次，得到的新字符串集合）。

**示例：**

```
输入：currentState = "++++"
输出：["--++","+--+","++--"]
解释：下标 (0,1)、(1,2)、(2,3) 的 "++" 均可翻成 "--"
```

**提示：** `1 <= currentState.length <= 500`，`currentState[i]` 为 `+` 或 `-`。

## 二、解答方法

### 方法一：枚举所有 `++` 位置

**思路：** 遍历字符串，遇到 `"++"`（即 `s[i]=='+' && s[i+1]=='+'`），生成翻转后的新字符串（用 `substring` 拼接或字符数组修改 `[i]=[i+1]='-'`）。收集所有结果即可。

本题只要求「生成所有下一步」，不涉及胜负判定（那是 `294 翻转游戏 II` 的事）。

:::::: code-group

```java [Java]
class Solution {
    public List<String> generatePossibleNextMoves(String currentState) {
        List<String> res = new ArrayList<>();
        char[] arr = currentState.toCharArray();
        for (int i = 0; i + 1 < arr.length; i++) {
            if (arr[i] == '+' && arr[i + 1] == '+') {
                arr[i] = arr[i + 1] = '-';          // 翻转
                res.add(new String(arr));
                arr[i] = arr[i + 1] = '+';          // 还原（为生成下一个）
            }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def generatePossibleNextMoves(self, currentState: str) -> List[str]:
        res = []
        for i in range(len(currentState) - 1):
            if currentState[i:i+2] == "++":
                res.append(currentState[:i] + "--" + currentState[i+2:])
        return res
```

```cpp [C++]
class Solution {
public:
    vector<string> generatePossibleNextMoves(string currentState) {
        vector<string> res;
        for (int i = 0; i + 1 < currentState.size(); i++) {
            if (currentState[i] == '+' && currentState[i+1] == '+') {
                currentState[i] = currentState[i+1] = '-';
                res.push_back(currentState);
                currentState[i] = currentState[i+1] = '+';
            }
        }
        return res;
    }
};
```

```go [Go]
func generatePossibleNextMoves(currentState string) []string {
    var res []string
    b := []byte(currentState)
    for i := 0; i+1 < len(b); i++ {
        if b[i] == '+' && b[i+1] == '+' {
            b[i], b[i+1] = '-', '-'
            res = append(res, string(b))
            b[i], b[i+1] = '+', '+'
        }
    }
    return res
}
```

```js [JavaScript]
var generatePossibleNextMoves = function (currentState) {
    const res = [];
    for (let i = 0; i + 1 < currentState.length; i++) {
        if (currentState[i] === '+' && currentState[i+1] === '+') {
            res.push(currentState.slice(0, i) + "--" + currentState.slice(i+2));
        }
    }
    return res;
};
```

::::::

**复杂度：** 时间 `O(n²)`（最多 n/2 个 `++`，每个生成新串 `O(n)`），空间 `O(n²)`。

## 三、总结

本题是 `294 翻转游戏 II` 的「生成下一步」子任务。注意只是枚举所有合法落子，不涉及博弈胜负。直观做法：扫描所有 `"++"`，逐个翻转生成新串。若字符串很长可优化用 `StringBuilder`，但本题 n ≤ 500 足够。结合 `292/294` 可见：生成下一步（本题）+ 记忆化 Minimax（294）即构成完整博弈解法。
