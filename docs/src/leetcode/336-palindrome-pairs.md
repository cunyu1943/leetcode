# [336. 回文对](https://leetcode.cn/problems/palindrome-pairs/)

## 一、题目描述

给定一组 **互不相同** 的单词 `words`，找出所有不同的索引对 `(i, j)` 使得拼接 `words[i] + words[j]` 是回文串。

**示例：**
```
输入：words = ["abcd","dcba","lls","s","sssll"]
输出：[[0,1],[1,0],[3,2],[2,4]]
解释：abcd+dcba = 回文；dcba+abcd = 回文；s+lls= slls 回文；lls+sssll = 回文
```

**提示：** `1 <= words.length <= 5000`，`0 <= words[i].length <= 300`，`words[i]` 仅小写字母。

## 二、解答方法

### 方法一：字符串哈希 / Trie + 拆分

**思路：** `words[i]+words[j]` 为回文 ⟺ 把 `words[i]` 分成两部分，一半是回文、另一半的反转在 `words` 中（且不是自己）。用哈希表 `word → index`，对每个 `words[i]`：前缀 `s[0..k]` 是回文时，查 `reverse(s[k+1..])` 是否在表中（得 `j`，拼 `words[j]+words[i]`）；后缀 `s[k..]` 是回文时，查 `reverse(s[0..k-1])`（得 `j`，拼 `words[i]+words[j]`）。注意空串与自身回文的反转。

:::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> palindromePairs(String[] words) {
        Map<String, Integer> map = new HashMap<>();
        for (int i=0;i<words.length;i++) map.put(words[i], i);
        List<List<Integer>> res = new ArrayList<>();
        for (int i=0;i<words.length;i++) {
            String w = words[i];
            for (int k=0;k<=w.length();k++) {
                String left = w.substring(0,k), right = w.substring(k);
                if (isPal(left)) {
                    String rev = new StringBuilder(right).reverse().toString();
                    if (map.containsKey(rev) && map.get(rev) != i) res.add(List.of(map.get(rev), i));
                }
                if (k != w.length() && isPal(right)) {       // k==len 时与上面重复，跳过
                    String rev = new StringBuilder(left).reverse().toString();
                    if (map.containsKey(rev) && map.get(rev) != i) res.add(List.of(i, map.get(rev)));
                }
            }
        }
        return res;
    }
    boolean isPal(String s) {
        int i=0,j=s.length()-1;
        while(i<j) if(s.charAt(i++)!=s.charAt(j--)) return false;
        return true;
    }
}
```

```python [Python]
class Solution:
    def palindromePairs(self, words: List[str]) -> List[List[int]]:
        idx = {w:i for i,w in enumerate(words)}
        res = []
        for i,w in enumerate(words):
            for k in range(len(w)+1):
                left, right = w[:k], w[k:]
                if left == left[::-1]:
                    rev = right[::-1]
                    if rev in idx and idx[rev] != i: res.append([idx[rev], i])
                if k != len(w) and right == right[::-1]:
                    rev = left[::-1]
                    if rev in idx and idx[rev] != i: res.append([i, idx[rev]])
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> palindromePairs(vector<string>& words) {
        unordered_map<string,int> map;
        for(int i=0;i<words.size();i++) map[words[i]]=i;
        vector<vector<int>> res;
        auto isPal=[&](string s){
            int i=0,j=s.size()-1; while(i<j && s[i]==s[j]){i++;j--;} return i>=j;
        };
        for(int i=0;i<words.size();i++){
            string w=words[i];
            for(int k=0;k<=w.size();k++){
                string left=w.substr(0,k), right=w.substr(k);
                if(isPal(left)){
                    string rev=right; reverse(rev.begin(),rev.end());
                    if(map.count(rev)&&map[rev]!=i) res.push_back({map[rev],i});
                }
                if(k!=w.size()&&isPal(right)){
                    string rev=left; reverse(rev.begin(),rev.end());
                    if(map.count(rev)&&map[rev]!=i) res.push_back({i,map[rev]});
                }
            }
        }
        return res;
    }
};
```

```go [Go]
func palindromePairs(words []string) [][]int {
    idx := map[string]int{}
    for i, w := range words { idx[w] = i }
    isPal := func(s string) bool {
        i, j := 0, len(s)-1
        for i < j && s[i] == s[j] { i++; j-- }
        return i >= j
    }
    rev := func(s string) string { b := []byte(s); for i,j:=0,len(s)-1;i<j;i,j=i+1,j-1 { b[i],b[j]=b[j],b[i] }; return string(b) }
    res := [][]int{}
    for i, w := range words {
        for k := 0; k <= len(w); k++ {
            left, right := w[:k], w[k:]
            if isPal(left) {
                if j, ok := idx[rev(right)]; ok && j != i { res = append(res, []int{j, i}) }
            }
            if k != len(w) && isPal(right) {
                if j, ok := idx[rev(left)]; ok && j != i { res = append(res, []int{i, j}) }
            }
        }
    }
    return res
}
```

```js [JavaScript]
var palindromePairs = function (words) {
    const idx = {}; words.forEach((w,i)=> idx[w]=i);
    const isPal = s => { let i=0,j=s.length-1; while(i<j && s[i]===s[j]){i++;j--;} return i>=j; };
    const rev = s => s.split('').reverse().join('');
    const res = [];
    for (let i=0;i<words.length;i++) {
        const w = words[i];
        for (let k=0;k<=w.length;k++) {
            const left=w.slice(0,k), right=w.slice(k);
            if (isPal(left)) { const j=idx[rev(right)]; if (j!==undefined && j!==i) res.push([j,i]); }
            if (k!==w.length && isPal(right)) { const j=idx[rev(left)]; if (j!==undefined && j!==i) res.push([i,j]); }
        }
    }
    return res;
};
```

::::::

**复杂度：** 时间 `O(n·L²)`（n=词数，L=平均长），空间 `O(n)`。

## 三、总结

回文对核心：枚举每个词的拆分点，一半回文 + 另一半反转存在即可配对。比暴力 `O(n²·L)` 优很多。进阶用 **Trie** 存所有词的反转，查询更快（`O(n·L)`）。注意 `k==len` 时两段会重复处理，需跳过避免重复对。**空串** 情况：空串与所有回文词配对。同类：`214 最短回文`、`5 最长回文子串`。
