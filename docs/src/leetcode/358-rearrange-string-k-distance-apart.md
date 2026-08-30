# [358. 重组字符串 k 个距离间隔](https://leetcode.cn/problems/rearrange-string-k-distance-apart/) [🔒 会员题]

## 一、题目描述

给定一个字符串 `s` 和整数 `k`，重排 `s` 使 **相同字符之间的最小距离至少为 k**（即任意相同字符的相邻出现位置差 ≥ k）。返回任意一种合法排列；若不可能返回空串。

**示例：**
```
输入：s = "aabbcc", k = 3   输出："abcabc"（a 距 3，b 距 3，c 距 3）
输入：s = "aaabc", k = 3     输出：""（a 出现 3 次，需至少 7 长度，3+2(k-1)=7 > 5 长度，不可能）
```

**提示：** `1 <= s.length <= 300`，`s` 仅小写字母，`0 <= k <= s.length`。

## 二、解答方法

### 方法一：贪心（按频次优先填入间隔槽）

**思路：** 统计频次。若某字符频次 `> ceil(n/k)`（`n` 为不含该字符需的最小长度 `1+(freq-1)*k > n`）则无解。贪心：维护「待填位置」，按当前剩余频次最高的字符优先填，隔 k 个位置填下一个。用最大堆按频次取字符，填满 k 个位置后再把剩余频次 >0 的字符放回堆。

:::::: code-group

```java [Java]
class Solution {
    public String rearrangeString(String s, int k) {
        int[] freq = new int[26];
        for (char c : s.toCharArray()) freq[c - 'a']++;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> b[1] - a[1]);
        for (int i = 0; i < 26; i++) if (freq[i] > 0) pq.offer(new int[]{i, freq[i]});
        StringBuilder res = new StringBuilder();
        while (!pq.isEmpty()) {
            List<int[]> hold = new ArrayList<>();
            int count = Math.min(k, pq.size());     // 一轮最多填 k 个不同字符
            for (int i = 0; i < count; i++) {
                int[] cur = pq.poll();
                res.append((char)(cur[0] + 'a'));
                if (--cur[1] > 0) hold.add(cur);     // 还有剩余
            }
            if (!hold.isEmpty() && count < k) return "";  // 还有字符但无法隔开
            pq.addAll(hold);
        }
        return res.toString();
    }
}
```

```python [Python]
class Solution:
    def rearrangeString(self, s: str, k: int) -> str:
        from collections import Counter
        import heapq
        freq = Counter(s)
        pq = [(-v, c) for c, v in freq.items()]
        heapq.heapify(pq)
        res = []
        while pq:
            hold = []
            cnt = min(k, len(pq))
            for _ in range(cnt):
                v, c = heapq.heappop(pq)
                res.append(c)
                if v + 1 < 0: hold.append((v+1, c))
            if hold and cnt < k: return ""    # 剩余字符无法隔开
            for x in hold: heapq.heappush(pq, x)
        return "".join(res)
```

```cpp [C++]
class Solution {
public:
    string rearrangeString(string s, int k) {
        int freq[26]={0};
        for(char c:s) freq[c-'a']++;
        priority_queue<pair<int,int>> pq;   // (freq, char)
        for(int i=0;i<26;i++) if(freq[i]) pq.push({freq[i],i});
        string res;
        while(!pq.empty()){
            vector<pair<int,int>> hold;
            int cnt=min(k,(int)pq.size());
            for(int i=0;i<cnt;i++){
                auto [f,ch]=pq.top(); pq.pop();
                res+=char(ch+'a');
                if(--f>0) hold.push_back({f,ch});
            }
            if(!hold.empty() && cnt<k) return "";   // 无法隔开
            for(auto&x:hold) pq.push(x);
        }
        return res;
    }
};
```

```go [Go]
func rearrangeString(s string, k int) string {
    freq := [26]int{}
    for _, c := range s { freq[c-'a']++ }
    type pr struct{ f, c int }
    pq := make([]pr, 0)
    for i := 0; i < 26; i++ { if freq[i] > 0 { pq = append(pq, pr{freq[i], i}) } }
    sort.Slice(pq, func(i,j int) bool { return pq[i].f > pq[j].f })
    res := []byte{}
    for len(pq) > 0 {
        hold := []pr{}
        cnt := k; if cnt > len(pq) { cnt = len(pq) }
        for i := 0; i < cnt; i++ {
            cur := pq[0]; pq = pq[1:]
            res = append(res, byte(cur.c+'a'))
            if cur.f-1 > 0 { hold = append(hold, pr{cur.f-1, cur.c}) }
        }
        if len(hold) > 0 && cnt < k { return "" }
        pq = append(pq, hold...)
        sort.Slice(pq, func(i,j int) bool { return pq[i].f > pq[j].f })
    }
    return string(res)
}
```

```js [JavaScript]
var rearrangeString = function (s, k) {
    const freq = new Array(26).fill(0);
    for (const c of s) freq[c.charCodeAt(0)-97]++;
    const pq = [];
    for (let i=0;i<26;i++) if (freq[i]>0) pq.push({f:freq[i], c:i});
    pq.sort((a,b)=>b.f-a.f);
    let res = "";
    while (pq.length) {
        const hold = [];
        const cnt = Math.min(k, pq.length);
        for (let i=0;i<cnt;i++) {
            const cur = pq.shift();
            res += String.fromCharCode(cur.c+97);
            if (cur.f-1 > 0) hold.push({f:cur.f-1, c:cur.c});
        }
        if (hold.length && cnt < k) return "";     // 无法隔开 → 无解
        pq.push(...hold); pq.sort((a,b)=>b.f-a.f);
    }
    return res;
};
```

::::::

**复杂度：** 时间 `O(n log 26)` ≈ `O(n)`，空间 `O(26)`。

## 三、总结

任务调度类贪心（同 `621 任务调度器`）：每轮取频次最高的 k 个不同字符填入，间隔保证。无解判定：最多字符频次 `f` 需 `1+(f-1)*k ≤ n`（否则返回 ""）。注意「一轮填不满 k 个但还有剩余字符」即冲突无解。本题是 `621` 的字符串版。
