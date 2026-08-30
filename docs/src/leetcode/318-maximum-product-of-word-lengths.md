# [318. 最大单词长度乘积](https://leetcode.cn/problems/maximum-product-of-word-lengths/)

## 一、题目描述

给你一个字符串单词数组 `words`，找出两个 **不含公共字母** 的单词，使它们的长度乘积最大。返回最大乘积；若不存在则返回 0。

**示例：**
```
输入：words = ["abcw","baz","foo","bar","xtfn","abcdef"]
输出：16（"abcw"(4) 与 "xtfn"(4) 无公共字母，4×4=16）
```

**提示：** `2 <= words.length <= 1000`，`1 <= words[i].length <= 1000`，`words[i]` 仅含小写字母。

## 二、解答方法

### 方法一：位掩码

**思路：** 每个单词用 26 位整数 `mask` 表示含哪些字母（`mask |= 1 << (c-'a')`）。两单词无公共字母 ⟺ `mask1 & mask2 == 0`。预存每个单词的 mask 和长度，枚举所有单词对，满足条件则更新最大长度乘积。

:::::: code-group

```java [Java]
class Solution {
    public int maxProduct(String[] words) {
        int n = words.length;
        int[] mask = new int[n], len = new int[n];
        for (int i = 0; i < n; i++) {
            for (char c : words[i].toCharArray()) mask[i] |= 1 << (c - 'a');
            len[i] = words[i].length();
        }
        int ans = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                if ((mask[i] & mask[j]) == 0) ans = Math.max(ans, len[i] * len[j]);
        return ans;
    }
}
```

```python [Python]
class Solution:
    def maxProduct(self, words: List[str]) -> int:
        masks, lens = [], []
        for w in words:
            m = 0
            for ch in w: m |= 1 << (ord(ch)-97)
            masks.append(m); lens.append(len(w))
        ans = 0
        for i in range(len(words)):
            for j in range(i+1, len(words)):
                if masks[i] & masks[j] == 0: ans = max(ans, lens[i]*lens[j])
        return ans
```

```cpp [C++]
class Solution {
public:
    int maxProduct(vector<string>& words) {
        int n=words.size(), ans=0;
        vector<int> mask(n,0), len(n,0);
        for(int i=0;i<n;i++){ for(char c:words[i]) mask[i]|=1<<(c-'a'); len[i]=words[i].size(); }
        for(int i=0;i<n;i++) for(int j=i+1;j<n;j++) if((mask[i]&mask[j])==0) ans=max(ans,len[i]*len[j]);
        return ans;
    }
};
```

```go [Go]
func maxProduct(words []string) int {
    n := len(words)
    mask := make([]int, n); lens := make([]int, n)
    for i, w := range words {
        for _, c := range w { mask[i] |= 1 << (c-'a') }
        lens[i] = len(w)
    }
    ans := 0
    for i := 0; i < n; i++ {
        for j := i+1; j < n; j++ {
            if mask[i]&mask[j] == 0 {
                if lens[i]*lens[j] > ans { ans = lens[i]*lens[j] }
            }
        }
    }
    return ans
}
```

```js [JavaScript]
var maxProduct = function (words) {
    const n = words.length;
    const mask = new Array(n).fill(0), lens = new Array(n);
    for (let i=0;i<n;i++) { for (const c of words[i]) mask[i] |= 1 << (c.charCodeAt(0)-97); lens[i] = words[i].length; }
    let ans = 0;
    for (let i=0;i<n;i++) for (let j=i+1;j<n;j++) if ((mask[i]&mask[j])===0) ans = Math.max(ans, lens[i]*lens[j]);
    return ans;
};
```

::::::

**复杂度：** 时间 `O(n·L + n²)`（L=平均词长），空间 `O(n)`。

## 三、总结

位运算优化集合判交的经典题：26 字母用 int 位掩码表示，`&` 为 0 即无公共字母。比逐字符比较快。注意 `&` 优先级低，Java/JS 中需括号 `(mask[i] & mask[j]) == 0`。同思路可用于去重字母类问题。进阶可排序按长度降序提前剪枝。
