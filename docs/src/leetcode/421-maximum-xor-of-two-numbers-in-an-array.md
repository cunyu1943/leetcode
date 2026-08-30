# [421. 数组中两个数的最大异或值](https://leetcode.cn/problems/maximum-xor-of-two-numbers-in-an-array/)

## 一、题目描述

给你一个整数数组 `nums`，返回 `nums[i] XOR nums[j]` 的最大可能结果值。

**示例 1：**

```
输入：nums = [3,10,5,25,2]
输出：28
解释：最大异或值是 5 XOR 25 = 28。
```

**示例 2：**

```
输入：nums = [14,70,53,83,49,91,36,80,92,51,22]
输出：127
```

**提示：**

- `1 <= nums.length <= 2 * 10^4`
- `0 <= nums[i] <= 2^31 - 1`

## 二、解答方法

### 2.1 方法一：字典树（位 Trie）贪心

1. 思路

从高位到低位逐位确定答案：把每个数的二进制位插入 Trie（0/1 子节点）。对目标数 `x`，从高位尝试让该位为 `1`（即希望找到与 `x` 该位相反的分支），能走相反分支则异或该位为 1，否则走相同分支。对所有 `x` 取最大。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    static class TrieNode { TrieNode[] ch = new TrieNode[2]; }
    public int findMaximumXOR(int[] nums) {
        TrieNode root = new TrieNode();
        for (int x : nums) insert(root, x);
        int ans = 0;
        for (int x : nums) ans = Math.max(ans, query(root, x));
        return ans;
    }
    void insert(TrieNode r, int x) {
        for (int i = 30; i >= 0; i--) {
            int b = (x >> i) & 1;
            if (r.ch[b] == null) r.ch[b] = new TrieNode();
            r = r.ch[b];
        }
    }
    int query(TrieNode r, int x) {
        int res = 0;
        for (int i = 30; i >= 0; i--) {
            int b = (x >> i) & 1;
            int want = b ^ 1;
            if (r.ch[want] != null) { res |= (1 << i); r = r.ch[want]; }
            else r = r.ch[b];
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def findMaximumXOR(self, nums: List[int]) -> int:
        root = {}
        def insert(x):
            node = root
            for i in range(30, -1, -1):
                b = (x >> i) & 1
                node = node.setdefault(b, {})
        def query(x):
            node, res = root, 0
            for i in range(30, -1, -1):
                b = (x >> i) & 1
                want = 1 - b
                if want in node:
                    res |= 1 << i
                    node = node[want]
                else:
                    node = node[b]
            return res
        for x in nums:
            insert(x)
        return max(query(x) for x in nums)
```

```cpp [C++]
class TrieNode { public: TrieNode* ch[2] = {nullptr}; };
class Solution {
public:
    int findMaximumXOR(vector<int>& nums) {
        TrieNode* root = new TrieNode();
        auto insert = [&](int x) {
            TrieNode* p = root;
            for (int i = 30; i >= 0; i--) {
                int b = (x >> i) & 1;
                if (!p->ch[b]) p->ch[b] = new TrieNode();
                p = p->ch[b];
            }
        };
        auto query = [&](int x) {
            TrieNode* p = root; int res = 0;
            for (int i = 30; i >= 0; i--) {
                int b = (x >> i) & 1, want = b ^ 1;
                if (p->ch[want]) { res |= 1 << i; p = p->ch[want]; }
                else p = p->ch[b];
            }
            return res;
        };
        for (int x : nums) insert(x);
        int ans = 0;
        for (int x : nums) ans = max(ans, query(x));
        return ans;
    }
};
```

```go [Go]
type trieNode struct { ch [2]*trieNode }
func findMaximumXOR(nums []int) int {
	root := &trieNode{}
	insert := func(x int) {
		p := root
		for i := 30; i >= 0; i-- {
			b := (x >> i) & 1
			if p.ch[b] == nil { p.ch[b] = &trieNode{} }
			p = p.ch[b]
		}
	}
	query := func(x int) int {
		p, res := root, 0
		for i := 30; i >= 0; i-- {
			b := (x >> i) & 1
			want := b ^ 1
			if p.ch[want] != nil { res |= 1 << i; p = p.ch[want] } else { p = p.ch[b] }
		}
		return res
	}
	for _, x := range nums { insert(x) }
	ans := 0
	for _, x := range nums { ans = max(ans, query(x)) }
	return ans
}
func max(a, b int) int { if a > b { return a }; return b }
```

```javascript [JavaScript]
var findMaximumXOR = function (nums) {
    const root = {};
    const insert = (x) => {
        let node = root;
        for (let i = 30; i >= 0; i--) {
            const b = (x >> i) & 1;
            if (!node[b]) node[b] = {};
            node = node[b];
        }
    };
    const query = (x) => {
        let node = root, res = 0;
        for (let i = 30; i >= 0; i--) {
            const b = (x >> i) & 1, want = b ^ 1;
            if (node[want]) { res |= 1 << i; node = node[want]; }
            else node = node[b];
        }
        return res;
    };
    for (const x of nums) insert(x);
    let ans = 0;
    for (const x of nums) ans = Math.max(ans, query(x));
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n \cdot 31)$。
- 空间复杂度：$O(n \cdot 31)$，Trie 节点数。

### 2.2 方法二：前缀集贪心（位运算）

思路：从高到低确定答案每一位 `bit`，维护已插入数的前缀集合 `prefixSet`，尝试 `ans | (1<<i)` 是否能由某两数异或得到（即 `(ans>>(i+1)) | (1<<i)` 与某个前缀异或后仍在集合）。实现略复杂，Trie 更直观。

## 三、总结

「按位贪心 + Trie」是最大异或类题的通用框架，相关题目：423? 无，类似：1707 与数组中元素的最大异或值、2935 最大化数组中的异或和（2415+）。
