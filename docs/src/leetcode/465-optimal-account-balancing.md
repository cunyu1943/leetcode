# [465. 最优账单平衡 🔒 会员题](https://leetcode.cn/problems/optimal-account-balancing/)

## 一、题目描述

给定若干笔交易 `transactions`，其中 `transactions[i] = [from, to, amount]` 表示从 `from` 向 `to` 转账 `amount`。

可以让任意两人之间结算，求使所有人账户清零所需的**最少交易笔数**。

本题为 LeetCode Premium（会员）题目。

**示例 1：**

```
输入：transactions = [[0,1,10],[2,0,5]]
输出：2
解释：人均净：0:-5, 1:+10, 2:-5。最少 2 笔（1 分别给 0、2 各一笔）即可清零。
```

**示例 2：**

```
输入：transactions = [[0,1,10],[1,0,1],[1,2,5],[2,0,5]]
输出：1
解释：综合净：0: +6, 1: -4, 2: -2，但可合并为 1 笔（1 和 2 合计给 0 一笔）。
```

**提示：**

- `1 <= transactions.length <= 8`
- `transactions[i].length == 3`
- `0 <= from, to <= 20`
- `from != to`
- `1 <= amount <= 100`

## 二、解答方法

### 2.1 方法一：净余额 + 回溯枚举配对

1. 思路

先算出每个人的净余额（正数表示应收、负数表示应付、0 表示已平）。问题转化为「用最少次配对使所有非零余额归零」。由于人数很少（$\le 21$，实际非零者更少），可用回溯：每次取第一个非零余额，尝试与后面每个相反符号余额配对（可部分抵消），递归直到全 0，记录最小配对次数。

2. 代码实现（Python 示例）

:::::: code-group

```python [Python]
class Solution:
    def minTransfers(self, transactions: List[List[int]]) -> int:
        bal = defaultdict(int)
        for f, t, a in transactions:
            bal[f] -= a
            bal[t] += a
        debts = [v for v in bal.values() if v != 0]
        n = len(debts)
        self.ans = n
        def dfs(i, cnt):
            while i < n and debts[i] == 0:
                i += 1
            if i == n:
                self.ans = min(self.ans, cnt)
                return
            for j in range(i + 1, n):
                if debts[i] * debts[j] < 0:
                    debts[j] += debts[i]
                    dfs(i + 1, cnt + 1)
                    debts[j] -= debts[i]
        dfs(0, 0)
        return self.ans
```

```java [Java]
class Solution {
    int ans;
    public int minTransfers(int[][] transactions) {
        Map<Integer, Integer> bal = new HashMap<>();
        for (int[] t : transactions) {
            bal.put(t[0], bal.getOrDefault(t[0], 0) - t[2]);
            bal.put(t[1], bal.getOrDefault(t[1], 0) + t[2]);
        }
        List<Integer> debts = new ArrayList<>();
        for (int v : bal.values()) if (v != 0) debts.add(v);
        ans = debts.size();
        dfs(debts, 0, 0);
        return ans;
    }
    void dfs(List<Integer> d, int i, int cnt) {
        while (i < d.size() && d.get(i) == 0) i++;
        if (i == d.size()) { ans = Math.min(ans, cnt); return; }
        for (int j = i + 1; j < d.size(); j++) {
            if (d.get(i) * d.get(j) < 0) {
                d.set(j, d.get(j) + d.get(i));
                dfs(d, i + 1, cnt + 1);
                d.set(j, d.get(j) - d.get(i));
            }
        }
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：回溯，受数据规模限制可接受（交易数 $\le 8$）。
- 空间复杂度：$O(n)$。

## 三、总结

会员题。净余额配对回溯是「最少交易笔数」的标准做法，规模小可暴力。相关题目：464 我能赢吗（小规模回溯）、139 单词拆分（回溯变体）。
