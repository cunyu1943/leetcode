# [LCR 056. 两数之和 IV - 输入二叉搜索树](https://leetcode.cn/problems/opLdQZ/)



## 一、题目描述

给定一个二叉搜索树的 **根节点** `root` 和一个整数目标值 `k` ，请判断该二叉搜索树中是否存在两个节点它们的值之和等于目标值 `k` 。



**示例 1：**

```
输入: root = [8,6,10,5,7,9,11], k = 12
输出: true
解释: 节点 5 和节点 7 之和等于 12
```

**示例 2：**

```
输入: root = [8,6,10,5,7,9,11], k = 22
输出: false
```

**提示：**

- 二叉树的节点个数的范围是 `[1, 10⁴]`
- `-10⁴ <= Node.val <= 10⁴`
- `root` 为二叉搜索树
- `-10⁵ <= k <= 10⁵`



## 二、解答方法

### 2.1 方法一：中序转有序数组 + 双指针

1. **思路**

- 中序遍历 BST 得到升序数组 `vals`；
- 用双指针（左右两端）在有序数组中找和为 `k` 的两数。

时间 `O(n)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    private List<Integer> vals = new ArrayList<>();
    public boolean findTarget(TreeNode root, int k) {
        inorder(root);
        int l = 0, r = vals.size() - 1;
        while (l < r) {
            int sum = vals.get(l) + vals.get(r);
            if (sum == k) return true;
            else if (sum < k) l++;
            else r--;
        }
        return false;
    }
    private void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        vals.add(node.val);
        inorder(node.right);
    }
}
```

```python [Python]
class Solution:
    def findTarget(self, root: Optional[TreeNode], k: int) -> bool:
        vals = []

        def inorder(node):
            if not node:
                return
            inorder(node.left)
            vals.append(node.val)
            inorder(node.right)

        inorder(root)
        l, r = 0, len(vals) - 1
        while l < r:
            s = vals[l] + vals[r]
            if s == k:
                return True
            elif s < k:
                l += 1
            else:
                r -= 1
        return False
```

```cpp [C++]
class Solution {
public:
    bool findTarget(TreeNode* root, int k) {
        inorder(root);
        int l = 0, r = vals.size() - 1;
        while (l < r) {
            int sum = vals[l] + vals[r];
            if (sum == k) return true;
            else if (sum < k) l++;
            else r--;
        }
        return false;
    }
private:
    vector<int> vals;
    void inorder(TreeNode* node) {
        if (!node) return;
        inorder(node->left);
        vals.push_back(node->val);
        inorder(node->right);
    }
};
```

```go [Go]
func findTarget(root *TreeNode, k int) bool {
    var vals []int
    var inorder func(node *TreeNode)
    inorder = func(node *TreeNode) {
        if node == nil {
            return
        }
        inorder(node.Left)
        vals = append(vals, node.Val)
        inorder(node.Right)
    }
    inorder(root)
    l, r := 0, len(vals)-1
    for l < r {
        s := vals[l] + vals[r]
        if s == k {
            return true
        } else if s < k {
            l++
        } else {
            r--
        }
    }
    return false
}
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
    const vals = [];
    const inorder = (node) => {
        if (!node) return;
        inorder(node.left);
        vals.push(node.val);
        inorder(node.right);
    };
    inorder(root);
    let l = 0, r = vals.length - 1;
    while (l < r) {
        const sum = vals[l] + vals[r];
        if (sum === k) return true;
        else if (sum < k) l++;
        else r--;
    }
    return false;
};
```

```c [C]
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

int vals[10005];
int cnt;

static void inorder(struct TreeNode* node) {
    if (!node) return;
    inorder(node->left);
    vals[cnt++] = node->val;
    inorder(node->right);
}

int findTarget(struct TreeNode* root, int k) {
    cnt = 0;
    inorder(root);
    int l = 0, r = cnt - 1;
    while (l < r) {
        int s = vals[l] + vals[r];
        if (s == k) return 1;
        else if (s < k) l++;
        else r--;
    }
    return 0;
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

function findTarget(root: TreeNode | null, k: number): boolean {
    const vals: number[] = [];
    const inorder = (node: TreeNode | null) => {
        if (!node) return;
        inorder(node.left);
        vals.push(node.val);
        inorder(node.right);
    };
    inorder(root);
    let l = 0, r = vals.length - 1;
    while (l < r) {
        const sum = vals[l] + vals[r];
        if (sum === k) return true;
        else if (sum < k) l++;
        else r--;
    }
    return false;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`，数组存储中序序列。

### 2.2 方法二：哈希集合 + DFS

1. **思路**

在遍历树的同时用哈希集合记录已访问的节点值：若 `k - node.val` 已在集合中，说明存在一对；否则把 `node.val` 加入集合继续遍历。时间 `O(n)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    private Set<Integer> seen = new HashSet<>();
    public boolean findTarget(TreeNode root, int k) {
        if (root == null) return false;
        if (seen.contains(k - root.val)) return true;
        seen.add(root.val);
        return findTarget(root.left, k) || findTarget(root.right, k);
    }
}
```

```python [Python]
class Solution:
    def findTarget(self, root: Optional[TreeNode], k: int) -> bool:
        seen = set()

        def dfs(node):
            if not node:
                return False
            if k - node.val in seen:
                return True
            seen.add(node.val)
            return dfs(node.left) or dfs(node.right)

        return dfs(root)
```

```cpp [C++]
class Solution {
public:
    bool findTarget(TreeNode* root, int k) {
        if (!root) return false;
        if (seen.count(k - root->val)) return true;
        seen.insert(root->val);
        return findTarget(root->left, k) || findTarget(root->right, k);
    }
private:
    unordered_set<int> seen;
};
```

```go [Go]
func findTarget(root *TreeNode, k int) bool {
    seen := map[int]bool{}
    var dfs func(node *TreeNode) bool
    dfs = func(node *TreeNode) bool {
        if node == nil {
            return false
        }
        if seen[k-node.Val] {
            return true
        }
        seen[node.Val] = true
        return dfs(node.Left) || dfs(node.Right)
    }
    return dfs(root)
}
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
    const seen = new Set();
    const dfs = (node) => {
        if (!node) return false;
        if (seen.has(k - node.val)) return true;
        seen.add(node.val);
        return dfs(node.left) || dfs(node.right);
    };
    return dfs(root);
};
```

```c [C]
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// C 无内置哈希，这里用「中序数组 + 二分查找补差」等价实现：
int vals[10005];
int cnt;

static void inorder(struct TreeNode* node) {
    if (!node) return;
    inorder(node->left);
    vals[cnt++] = node->val;
    inorder(node->right);
}

static int search(int l, int r, int target) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (vals[m] == target) return 1;
        else if (vals[m] < target) l = m + 1;
        else r = m - 1;
    }
    return 0;
}

int findTarget(struct TreeNode* root, int k) {
    cnt = 0;
    inorder(root);
    for (int i = 0; i < cnt; i++) {
        if (search(i + 1, cnt - 1, k - vals[i])) return 1;
    }
    return 0;
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

function findTarget(root: TreeNode | null, k: number): boolean {
    const seen: Set<number> = new Set();
    const dfs = (node: TreeNode | null): boolean => {
        if (!node) return false;
        if (seen.has(k - node.val)) return true;
        seen.add(node.val);
        return dfs(node.left) || dfs(node.right);
    };
    return dfs(root);
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`，哈希集合。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 中序数组 + 双指针 | `O(n)` | `O(n)` | 利用 BST 有序性 |
| 哈希集合 + DFS | `O(n)` | `O(n)` | 无需中序，边遍历边查 |

两种方法均为线性复杂度：双指针法利用 BST 中序有序的特性，哈希法则是「两数之和」在树上的直接推广。

