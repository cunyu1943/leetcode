# [320. 列举单词的全部缩略词](https://leetcode.cn/problems/generalized-abbreviation/) [🔒 会员题]

## 一、题目描述

单词的 **广义缩略词**：可以把任意连续子串替换为该子串的长度（用数字代替字符，但不能有两个连续数字）。给定一个单词 `word`，返回它的 **所有** 可能的缩略词。

**示例：**
```
输入：word = "word"   输出：["word","1ord","w1rd","wo1d","wor1","2rd","w2d","wo2","1o1d","1or1","w1r1","1o2","2r1","3d","w3","4"]
```

**提示：** `1 <= word.length <= 12`，`word` 仅由小写字母组成。

## 二、解答方法

### 方法一：回溯（每个字符选「保留」或「缩写」）

**思路：** 对每一位字符，两种选择：①保留原字符；②缩写为数字（计数+1）。遇到数字与后接数字需合并（连续计数相加）。用回溯构造所有结果。也可位掩码：每个字符用 1 bit 表示「缩写与否」，`0~2^n-1` 枚举。

:::::: code-group

```java [Java]
class Solution {
    public List<String> generateAbbreviations(String word) {
        List<String> res = new ArrayList<>();
        backtrack(word, 0, new StringBuilder(), 0, res);
        return res;
    }
    void backtrack(String word, int i, StringBuilder cur, int count, List<String> res) {
        if (i == word.length()) {
            if (count > 0) cur.append(count);
            res.add(cur.toString());
            if (count > 0) cur.delete(cur.length() - String.valueOf(count).length(), cur.length());
            return;
        }
        // 选择：缩写当前字符
        backtrack(word, i + 1, cur, count + 1, res);
        // 选择：保留当前字符
        int len = cur.length();
        if (count > 0) cur.append(count);
        cur.append(word.charAt(i));
        backtrack(word, i + 1, cur, 0, res);
        cur.setLength(len);
    }
}
```

```python [Python]
class Solution:
    def generateAbbreviations(self, word: str) -> List[str]:
        res = []
        def backtrack(i, cur, count):
            if i == len(word):
                if count: cur += str(count)
                res.append(cur)
                return
            backtrack(i+1, cur, count+1)            # 缩写
            backtrack(i+1, cur + (str(count) if count else "") + word[i], 0)  # 保留
        backtrack(0, "", 0)
        return res
```

```cpp [C++]
class Solution {
public:
    vector<string> generateAbbreviations(string word) {
        vector<string> res;
        function<void(int,string,int)> dfs = [&](int i, string cur, int cnt){
            if (i == word.size()) {
                if (cnt) cur += to_string(cnt);
                res.push_back(cur); return;
            }
            dfs(i+1, cur, cnt+1);
            string nxt = cur + (cnt ? to_string(cnt) : "") + word[i];
            dfs(i+1, nxt, 0);
        };
        dfs(0, "", 0);
        return res;
    }
};
```

```go [Go]
func generateAbbreviations(word string) []string {
    var res []string
    var dfs func(int, string, int)
    dfs = func(i int, cur string, cnt int) {
        if i == len(word) {
            if cnt > 0 { cur += strconv.Itoa(cnt) }
            res = append(res, cur); return
        }
        dfs(i+1, cur, cnt+1)
        nxt := cur
        if cnt > 0 { nxt += strconv.Itoa(cnt) }
        nxt += string(word[i])
        dfs(i+1, nxt, 0)
    }
    dfs(0, "", 0)
    return res
}
```

```js [JavaScript]
var generateAbbreviations = function (word) {
    const res = [];
    const dfs = (i, cur, cnt) => {
        if (i === word.length) {
            if (cnt) cur += cnt;
            res.push(cur); return;
        }
        dfs(i+1, cur, cnt+1);
        dfs(i+1, cur + (cnt ? cnt : "") + word[i], 0);
    };
    dfs(0, "", 0);
    return res;
};
```

::::::

**复杂度：** 时间 `O(n·2ⁿ)`（共 `2ⁿ` 个缩略词），空间 `O(n)`。

## 三、总结

每个字符「缩写 or 保留」二选一，共 `2ⁿ` 种（n≤12 安全）。回溯比位掩码更直观。注意数字不能连续：`count>0` 时先输出数字再接字符，合并连续长度。同类位运算枚举见 `78 子集`（本质同构）。
