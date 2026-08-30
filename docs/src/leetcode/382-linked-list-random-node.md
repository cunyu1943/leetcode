# [382. 链表随机节点](https://leetcode.cn/problems/linked-list-random-node/)

## 一、题目描述

给定一个单链表，实现函数 `getRandom` 等概率返回一个节点的值（每个节点被选中概率为 `1/n`，`n` 为链表长度）。可多次调用。

**示例：**
```
输入：[1,2,3]
getRandom() → 1、2、3 各 1/3 概率
```

**提示：** `1 <= 链表长度 <= 10⁴`，`0 <= Node.val <= 10⁹`，最多 `10⁴` 次 `getRandom`。

## 二、解答方法

### 方法一：水塘抽样（Reservoir Sampling）

**思路：** 不预先知道长度也不存全部节点，用「水塘抽样」：遍历到第 `i` 个节点（i 从 1 开始），以 `1/i` 的概率替换当前候选。最终每个节点留下来概率都是 `1/n`。这样只需一次遍历、`O(1)` 空间。

:::::: code-group

```java [Java]
class Solution {
    private ListNode head; private Random rnd = new Random();
    public Solution(ListNode head) { this.head = head; }
    public int getRandom() {
        int res = head.val, i = 1;
        ListNode cur = head.next;
        while (cur != null) {
            i++;
            if (rnd.nextInt(i) == 0) res = cur.val;   // 1/i 概率替换
            cur = cur.next;
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def __init__(self, head: Optional[ListNode]):
        self.head = head
    def getRandom(self) -> int:
        import random
        res, i = self.head.val, 1
        cur = self.head.next
        while cur:
            i += 1
            if random.randint(0, i-1) == 0: res = cur.val
            cur = cur.next
        return res
```

```cpp [C++]
class Solution {
    ListNode* head; uniform_int_distribution<int> dist; mt19937 gen;
public:
    Solution(ListNode* h): head(h) {}
    int getRandom() {
        int res = head->val, i = 1;
        ListNode* cur = head->next;
        while(cur) { i++; if(rand()%i==0) res=cur->val; cur=cur->next; }
        return res;
    }
};
```

```go [Go]
type Solution struct { head *ListNode }
func Constructor(head *ListNode) Solution { return Solution{head: head} }
func (s *Solution) GetRandom() int {
    res, i := s.head.Val, 1
    cur := s.head.Next
    for cur != nil {
        i++
        if rand.Intn(i) == 0 { res = cur.Val }
        cur = cur.Next
    }
    return res
}
```

```js [JavaScript]
var Solution = function (head) { this.head = head; };
Solution.prototype.getRandom = function () {
    let res = this.head.val, i = 1, cur = this.head.next;
    while (cur) { i++; if (Math.floor(Math.random()*i) === 0) res = cur.val; cur = cur.next; }
    return res;
};
```

::::::

### 方法二：转数组（简单，空间 O(n)）

**思路：** 构造时把链表转成数组，随机取下标。

:::::: code-group

```java [Java]
class Solution {
    private List<Integer> arr = new ArrayList<>(); private Random rnd = new Random();
    public Solution(ListNode head) { while (head != null) { arr.add(head.val); head = head.next; } }
    public int getRandom() { return arr.get(rnd.nextInt(arr.size())); }
}
```

```python [Python]
class Solution:
    def __init__(self, head: Optional[ListNode]):
        self.arr = []; while head: self.arr.append(head.val); head = head.next
    def getRandom(self) -> int:
        import random; return random.choice(self.arr)
```

```cpp [C++]
class Solution {
    vector<int> arr;
public:
    Solution(ListNode* head) { while(head){ arr.push_back(head->val); head=head->next; } }
    int getRandom() { return arr[rand() % arr.size()]; }
};
```

```go [Go]
type Solution struct { arr []int }
func Constructor(head *ListNode) Solution {
    arr := []int{}; for head != nil { arr = append(arr, head.Val); head = head.Next }
    return Solution{arr: arr}
}
func (s *Solution) GetRandom() int { return s.arr[rand.Intn(len(s.arr))] }
```

```js [JavaScript]
var Solution = function (head) { this.arr = []; while(head){ this.arr.push(head.val); head=head.next; } };
Solution.prototype.getRandom = function () { return this.arr[Math.floor(Math.random()*this.arr.length)]; };
```

::::::

**复杂度：** 水塘抽样 `O(n)` 每次调用、`O(1)` 空间；数组法 `O(n)` 空间、`O(1)` 调用。

## 三、总结

经典「流数据等概率抽样」：水塘抽样保证每个元素 `1/n` 概率。证明：第 k 个节点留到最后概率 = `(1/k) × (k/(k+1)) × ... × ((n-1)/n) = 1/n`。若允许 `O(n)` 空间直接转数组最省事。同类：`398 随机数索引`（数组版水塘抽样）。
