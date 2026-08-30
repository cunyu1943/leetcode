# [355. 设计推特](https://leetcode.cn/problems/design-twitter/)

## 一、题目描述

设计一个简化版推特，支持：
- `postTweet(userId, tweetId)`：用户发推；
- `getNewsFeed(userId)`：返回该用户 **自己及关注的人** 最近的 10 条推文（按时间，最新在前）；
- `follow(followerId, followeeId)`、`unfollow(followerId, followeeId)`。

**示例：**
```
postTweet(1,5); getNewsFeed(1) → [5]; follow(1,2); postTweet(2,6); getNewsFeed(1) → [6,5]
```

**提示：** `1 <= userId, tweetId <= 500`，最多 `3×10⁴` 次操作。

## 二、解答方法

### 方法一：时间戳 + 合并 K 路（小顶堆/优先队列）

**思路：** 每条推特带自增 `timestamp`。用户存「关注集合」和「自己的推特列表」。`getNewsFeed`：收集 `用户自身 + 所有关注者` 的推特列表，按时间取最新 10 条（可用最小堆保留最大 10 个时间戳，或归并各人推特——因每人推特按时间逆序，可用多指针/优先队列取前 10）。

:::::: code-group

```java [Java]
class Twitter {
    private Map<Integer, Set<Integer>> follow = new HashMap<>();
    private Map<Integer, List<int[]>> tweets = new HashMap<>();   // userId -> [time, tweetId]
    private int time = 0;
    public void postTweet(int userId, int tweetId) {
        follow.computeIfAbsent(userId, k -> new HashSet<>()).add(userId);   // 关注自己
        tweets.computeIfAbsent(userId, k -> new ArrayList<>()).add(new int[]{time++, tweetId});
    }
    public List<Integer> getNewsFeed(int userId) {
        Set<Integer> f = follow.getOrDefault(userId, new HashSet<>());
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]); // 时间最小堆
        for (int u : f) {
            var list = tweets.get(u);
            if (list == null) continue;
            for (int[] t : list) {
                pq.offer(t);
                if (pq.size() > 10) pq.poll();
            }
        }
        List<Integer> res = new ArrayList<>();
        while (!pq.isEmpty()) res.add(0, pq.poll()[1]);   // 倒序
        return res;
    }
    public void follow(int a, int b) { follow.computeIfAbsent(a, k -> new HashSet<>()).add(b); }
    public void unfollow(int a, int b) {
        if (a != b && follow.containsKey(a)) follow.get(a).remove(b);
    }
}
```

```python [Python]
class Twitter:
    def __init__(self):
        self.follow = defaultdict(set)
        self.tweets = defaultdict(list)
        self.time = 0
    def postTweet(self, userId: int, tweetId: int) -> None:
        self.follow[userId].add(userId)
        self.tweets[userId].append((self.time, tweetId)); self.time += 1
    def getNewsFeed(self, userId: int) -> List[int]:
        import heapq
        h = []
        for u in self.follow[userId]:
            for t in self.tweets[u]:
                heapq.heappush(h, t)
                if len(h) > 10: heapq.heappop(h)
        return [t[1] for t in sorted(h, key=lambda x: -x[0])]
    def follow(self, a: int, b: int) -> None:
        self.follow[a].add(b)
    def unfollow(self, a: int, b: int) -> None:
        if a != b: self.follow[a].discard(b)
```

```cpp [C++]
class Twitter {
    unordered_map<int,unordered_set<int>> follow;
    unordered_map<int,vector<pair<int,int>>> tweets;  // (time, tweetId)
    int time=0;
public:
    void postTweet(int u,int tid){
        follow[u].insert(u);
        tweets[u].push_back({time++,tid});
    }
    vector<int> getNewsFeed(int u){
        priority_queue<pair<int,int>,vector<pair<int,int>>,greater<pair<int,int>>> pq;
        for(int f:follow[u]) for(auto& t:tweets[f]){ pq.push(t); if(pq.size()>10) pq.pop(); }
        vector<int> res; while(!pq.empty()){ res.insert(res.begin(),pq.top().second); pq.pop(); }
        return res;
    }
    void follow(int a,int b){ follow[a].insert(b); }
    void unfollow(int a,int b){ if(a!=b) follow[a].erase(b); }
};
```

```go [Go]
type Twitter struct {
    follow map[int]map[int]bool
    tweets map[int][]tweet
    time   int
}
type tweet struct{ t, id int }
func Constructor() Twitter { return Twitter{follow:map[int]map[int]bool{}, tweets:map[int][]tweet{}} }
func (tw *Twitter) PostTweet(userId, tweetId int) {
    if tw.follow[userId] == nil { tw.follow[userId] = map[int]bool{} }
    tw.follow[userId][userId] = true
    tw.tweets[userId] = append(tw.tweets[userId], tweet{tw.time, tweetId}); tw.time++
}
func (tw *Twitter) GetNewsFeed(userId int) []int {
    type tp struct{ t, id int }
    pq := make([]tp, 0, 10)
    for f := range tw.follow[userId] {
        for _, t := range tw.tweets[f] {
            pq = append(pq, tp{t.t, t.id})
            if len(pq) > 10 {
                // 移除最小 time（简单做法：排序取后10）
            }
        }
    }
    sort.Slice(pq, func(i,j int) bool { return pq[i].t > pq[j].t })
    if len(pq) > 10 { pq = pq[:10] }
    res := []int{}; for _, x := range pq { res = append(res, x.id) }
    return res
}
func (tw *Twitter) Follow(a, b int) { if tw.follow[a]==nil { tw.follow[a]=map[int]bool{} }; tw.follow[a][b]=true }
func (tw *Twitter) Unfollow(a, b int) { if a!=b && tw.follow[a]!=nil { delete(tw.follow[a], b) } }
```

```js [JavaScript]
var Twitter = function () {
    this.follow = {}; this.tweets = {}; this.time = 0;
};
Twitter.prototype.postTweet = function (userId, tweetId) {
    (this.follow[userId] ||= new Set()).add(userId);
    (this.tweets[userId] ||= []).push({ t: this.time++, id: tweetId });
};
Twitter.prototype.getNewsFeed = function (userId) {
    const all = [];
    const fs = this.follow[userId] || new Set([userId]);
    for (const f of fs) { for (const t of (this.tweets[f] || [])) all.push(t); }
    all.sort((a,b)=>b.t-a.t);
    return all.slice(0,10).map(t=>t.id);
};
Twitter.prototype.follow = function (a, b) { (this.follow[a] ||= new Set()).add(b); };
Twitter.prototype.unfollow = function (a, b) { if (a!==b && this.follow[a]) this.follow[a].delete(b); };
```

::::::

**复杂度：** `postTweet/follow` `O(1)`，`getNewsFeed` `O(F·T·log 10)`（F=关注数，T=人均推数）。空间 `O(总推数)`。

## 三、总结

设计题：核心是「关注集合 + 推特带时间戳」，取最新 10 条用最小堆（size 10）或排序。关键：用户必须「关注自己」才能看到自己推特。进阶优化：每人只保留最近若干推特（如最近 10 条），避免 `getNewsFeed` 遍历过多。同类：`353 贪吃蛇`、`348 井字棋`。
