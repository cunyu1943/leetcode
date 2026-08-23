# [LCR 050. 路径总和 III](https://leetcode.cn/problems/6eUYwP/)



## 一、题目描述

给定一个二叉树的根节点 `root` ，和一个整数 `targetSum` ，求该二叉树里节点值之和等于 `targetSum` 的 **路径** 的数目。

**路径** 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。



**示例 1：**

```
输入：root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
输出：3
解释：和等于 8 的路径有 3 条，如图所示。
```

**示例 2：**

```
输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
输出：3
```

**提示：**

- 二叉树的节点个数的范围是 `[0, 1000]`
- `-10⁹ <= Node.val <= 10⁹`
- `-1000 <= targetSum <= 1000`



## 二、解答方法

### 2.1 方法一：前缀和 + 哈希表（DFS）

1. **思路**

任意「向下的路径和」都可以写成两个前缀和之差：`sum(路径) = pre[j] - pre[i]`。要统计和为 `targetSum` 的路径，等价于统计「前缀和 `pre[j] - targetSum` 出现的次数」。

- DFS 时维护当前路径前缀和 `cur`；
- 用哈希表 `cnt` 记录「每个前缀和出现次数」；
- 每到一个节点，答案累加 `cnt[cur - targetSum]`，再把 `cur` 计数 +1 递归进入子树，回溯时计数 -1。

注意 `cnt[0] = 1` 表示空前缀。时间 `O(n)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    private int ans = 0;
    public int pathSum(TreeNode root, int targetSum) {
        Map<Long, Integer> cnt = new HashMap<>();
        cnt.put(0L, 1);
        dfs(root, 0L, targetSum, cnt);
        return ans;
    }
    private void dfs(TreeNode node, long cur, int target, Map<Long, Integer> cnt) {
        if (node == null) return;
        cur += node.val;
        ans += cnt.getOrDefault(cur - target, 0);
        cnt.put(cur, cnt.getOrDefault(cur, 0) + 1);
        dfs(node.left, cur, target, cnt);
        dfs(node.right, cur, target, cnt);
        cnt.put(cur, cnt.get(cur) - 1);
    }
}
```

```python [Python]
class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        from collections import defaultdict
        cnt = defaultdict(int)
        cnt[0] = 1
        ans = 0

        def dfs(node, cur):
            nonlocal ans
            if not node:
                return
            cur += node.val
            ans += cnt[cur - targetSum]
            cnt[cur] += 1
            dfs(node.left, cur)
            dfs(node.right, cur)
            cnt[cur] -= 1

        dfs(root, 0)
        return ans
```

```cpp [C++]
class Solution {
public:
    int pathSum(TreeNode* root, int targetSum) {
        unordered_map<long long, int> cnt;
        cnt[0] = 1;
        dfs(root, 0, targetSum, cnt);
        return ans;
    }
private:
    int ans = 0;
    void dfs(TreeNode* node, long long cur, int target, unordered_map<long long, int>& cnt) {
        if (!node) return;
        cur += node->val;
        ans += cnt[cur - target];
        cnt[cur]++;
        dfs(node->left, cur, target, cnt);
        dfs(node->right, cur, target, cnt);
        cnt[cur]--;
    }
};
```

```go [Go]
func pathSum(root *TreeNode, targetSum int) int {
    cnt := map[int64]int{0: 1}
    ans := 0
    var dfs func(node *TreeNode, cur int64)
    dfs = func(node *TreeNode, cur int64) {
        if node == nil {
            return
        }
        cur += int64(node.Val)
        ans += cnt[cur-int64(targetSum)]
        cnt[cur]++
        dfs(node.Left, cur)
        dfs(node.Right, cur)
        cnt[cur]--
    }
    dfs(root, 0)
    return ans
}
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
    const cnt = new Map();
    cnt.set(0, 1);
    let ans = 0;
    const dfs = (node, cur) => {
        if (!node) return;
        cur += node.val;
        ans += cnt.get(cur - targetSum) || 0;
        cnt.set(cur, (cnt.get(cur) || 0) + 1);
        dfs(node.left, cur);
        dfs(node.right, cur);
        cnt.set(cur, cnt.get(cur) - 1);
    };
    dfs(root, 0);
    return ans;
};
```

```c [C]
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// C 无内置哈希，这里用线性探测手写哈希（键为 long long 前缀和）。
typedef struct {
    long long* key;
    int* val;
    int size;
} Hash;

static int hashGet(Hash* h, long long k) {
    unsigned long long hh = (unsigned long long)k;
    int idx = (int)((hh * 31) % h->size);
    while (h->key[idx] != 0 && h->key[idx] != k) idx = (idx + 1) % h->size;
    return idx;
}

static int ans;

static void dfs(struct TreeNode* node, long long cur, int target, Hash* h) {
    if (!node) return;
    cur += node->val;
    int idx = hashGet(h, cur - target);
    ans += h->val[idx];
    idx = hashGet(h, cur);
    h->key[idx] = cur;
    h->val[idx]++;
    dfs(node->left, cur, target, h);
    dfs(node->right, cur, target, h);
    h->val[idx]--;
}

int pathSum(struct TreeNode* root, int targetSum) {
    Hash h;
    h.size = 4003;
    h.key = (long long*)calloc(h.size, sizeof(long long));
    h.val = (int*)calloc(h.size, sizeof(int));
    int idx = hashGet(&h, 0);
    h.key[idx] = 0;
    h.val[idx] = 1;
    ans = 0;
    dfs(root, 0, targetSum, &h);
    free(h.key);
    free(h.val);
    return ans;
}
```

```ts [TypeScript]
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

function pathSum(root: TreeNode | null, targetSum: number): number {
    const cnt: Map<number, number> = new Map();
    cnt.set(0, 1);
    let ans = 0;
    const dfs = (node: TreeNode | null, cur: number) => {
        if (!node) return;
        cur += node.val;
        ans += cnt.get(cur - targetSum) || 0;
        cnt.set(cur, (cnt.get(cur) || 0) + 1);
        dfs(node.left, cur);
        dfs(node.right, cur);
        cnt.set(cur, cnt.get(cur)! - 1);
    };
    dfs(root, 0);
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(n)`，哈希表与递归栈。

### 2.2 方法二：双重 DFS（以每个节点为路径起点）

1. **思路**

- 外层遍历每个节点，把它作为路径起点；
- 内层从该节点出发向下搜索，累加路径和，每当路径和等于 `targetSum` 就计数。

由于每个起点都要向下走，最坏 `O(n²)`（链状树），但实现直观，适合理解题意。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int pathSum(TreeNode root, int targetSum) {
        if (root == null) return 0;
        return count(root, targetSum)
             + pathSum(root.left, targetSum)
             + pathSum(root.right, targetSum);
    }
    private int count(TreeNode node, long target) {
        if (node == null) return 0;
        int c = 0;
        if (node.val == target) c++;
        c += count(node.left, target - node.val);
        c += count(node.right, target - node.val);
        return c;
    }
}
```

```python [Python]
class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        def count(node, target):
            if not node:
                return 0
            c = 1 if node.val == target else 0
            return c + count(node.left, target - node.val) + count(node.right, target - node.val)

        if not root:
            return 0
        return count(root, targetSum) + self.pathSum(root.left, targetSum) + self.pathSum(root.right, targetSum)
```

```cpp [C++]
class Solution {
public:
    int pathSum(TreeNode* root, int targetSum) {
        if (!root) return 0;
        return count(root, targetSum)
             + pathSum(root->left, targetSum)
             + pathSum(root->right, targetSum);
    }
private:
    int count(TreeNode* node, long long target) {
        if (!node) return 0;
        int c = node->val == target ? 1 : 0;
        return c + count(node->left, target - node->val)
                 + count(node->right, target - node->val);
    }
};
```

```go [Go]
func pathSum(root *TreeNode, targetSum int) int {
    var count func(node *TreeNode, target int64) int
    count = func(node *TreeNode, target int64) int {
        if node == nil {
            return 0
        }
        c := 0
        if int64(node.Val) == target {
            c = 1
        }
        return c + count(node.Left, target-int64(node.Val)) + count(node.Right, target-int64(node.Val))
    }
    if root == nil {
        return 0
    }
    return count(root, int64(targetSum)) + pathSum(root.Left, targetSum) + pathSum(root.Right, targetSum)
}
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
    const count = (node, target) => {
        if (!node) return 0;
        let c = node.val === target ? 1 : 0;
        return c + count(node.left, target - node.val) + count(node.right, target - node.val);
    };
    if (!root) return 0;
    return count(root, targetSum) + pathSum(root.left, targetSum) + pathSum(root.right, targetSum);
};
```

```c [C]
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

static int count(struct TreeNode* node, long long target) {
    if (!node) return 0;
    int c = (long long)node->val == target ? 1 : 0;
    return c + count(node->left, target - node->val) + count(node->right, target - node->val);
}

int pathSum(struct TreeNode* root, int targetSum) {
    if (!root) return 0;
    return count(root, targetSum)
         + pathSum(root->left, targetSum)
         + pathSum(root->right, targetSum);
}
```

```ts [TypeScript]
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

function pathSum(root: TreeNode | null, targetSum: number): number {
    const count = (node: TreeNode | null, target: number): number => {
        if (!node) return 0;
        let c = node.val === target ? 1 : 0;
        return c + count(node.left, target - node.val) + count(node.right, target - node.val);
    };
    if (!root) return 0;
    return count(root, targetSum) + pathSum(root.left, targetSum) + pathSum(root.right, targetSum);
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：最坏 `O(n²)`。
- **空间复杂度**：`O(h)`，递归栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 前缀和 + 哈希 | `O(n)` | `O(n)` | 最优，推荐 |
| 双重 DFS | `O(n²)` | `O(h)` | 直观，适合小数据 |

「任意起点任意终点、方向向下」的路径计数，用前缀和 + 哈希可一次遍历解决；注意路径不需从根开始，但方向必须向下。

