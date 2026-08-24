# [面试题 04.10. 检查子树](https://leetcode.cn/problems/check-subtree-lcci/)

## 一、题目描述

检查一棵二叉树 `t1` 是否包含另一棵二叉树 `t2` 作为其子树。子树的定义：如果 `t2` 是 `t1` 的子树，则存在某个节点 `n`，使得从 `n` 开始的子树与 `t2` 完全相同（结构相同且节点值相同）。空树不是任何非空树的子树，但通常约定空树是任意树的子树（本题中可能按常规处理，即若 `t2` 为空，返回 `true`，但具体实现需参考题目说明）。

**示例：**

```
输入：t1 = [1, 2, 3, 4, 5], t2 = [2, 4, 5]
输出：true
```

**提示：**

- 树中节点数在 `[0, 10000]` 范围内。
- 每个节点的值在 `[-10000, 10000]` 范围内。

---

## 二、解答方法

### 2.1 方法一：双重递归（暴力匹配）

**1. 思路**

先序遍历 `t1`，对于每个节点，检查以该节点为根的子树是否与 `t2` 完全匹配。匹配函数 `isSame` 递归判断两棵树是否完全相同。若 `t2` 为空，则视为匹配（根据题意通常返回 `true`）。时间复杂度 `O(n * m)`，其中 `n` 和 `m` 分别为两棵树的节点数，但实际平均情况较好。

**2. 代码实现**

:::::: code-group

```java [Java]
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public boolean checkSubTree(TreeNode t1, TreeNode t2) {
        if (t2 == null) return true;
        if (t1 == null) return false;
        return isSame(t1, t2) || checkSubTree(t1.left, t2) || checkSubTree(t1.right, t2);
    }
    private boolean isSame(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null) return false;
        return a.val == b.val && isSame(a.left, b.left) && isSame(a.right, b.right);
    }
}
```

```python [Python]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def checkSubTree(self, t1: TreeNode, t2: TreeNode) -> bool:
        if not t2:
            return True
        if not t1:
            return False
        return self.isSame(t1, t2) or self.checkSubTree(t1.left, t2) or self.checkSubTree(t1.right, t2)

    def isSame(self, a, b):
        if not a and not b:
            return True
        if not a or not b:
            return False
        return a.val == b.val and self.isSame(a.left, b.left) and self.isSame(a.right, b.right)
```

```go [Go]
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func checkSubTree(t1 *TreeNode, t2 *TreeNode) bool {
    if t2 == nil {
        return true
    }
    if t1 == nil {
        return false
    }
    return isSame(t1, t2) || checkSubTree(t1.Left, t2) || checkSubTree(t1.Right, t2)
}
func isSame(a, b *TreeNode) bool {
    if a == nil && b == nil {
        return true
    }
    if a == nil || b == nil {
        return false
    }
    return a.Val == b.Val && isSame(a.Left, b.Left) && isSame(a.Right, b.Right)
}
```

```c [C]
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
#include <stdbool.h>
bool isSame(struct TreeNode* a, struct TreeNode* b) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a->val == b->val && isSame(a->left, b->left) && isSame(a->right, b->right);
}
bool checkSubTree(struct TreeNode* t1, struct TreeNode* t2) {
    if (!t2) return true;
    if (!t1) return false;
    return isSame(t1, t2) || checkSubTree(t1->left, t2) || checkSubTree(t1->right, t2);
}
```

```cpp [C++]
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    bool checkSubTree(TreeNode* t1, TreeNode* t2) {
        if (!t2) return true;
        if (!t1) return false;
        return isSame(t1, t2) || checkSubTree(t1->left, t2) || checkSubTree(t1->right, t2);
    }
    bool isSame(TreeNode* a, TreeNode* b) {
        if (!a && !b) return true;
        if (!a || !b) return false;
        return a->val == b->val && isSame(a->left, b->left) && isSame(a->right, b->right);
    }
};
```

```javascript [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
var checkSubTree = function(t1, t2) {
    if (!t2) return true;
    if (!t1) return false;
    function isSame(a, b) {
        if (!a && !b) return true;
        if (!a || !b) return false;
        return a.val === b.val && isSame(a.left, b.left) && isSame(a.right, b.right);
    }
    return isSame(t1, t2) || checkSubTree(t1.left, t2) || checkSubTree(t1.right, t2);
};
```

```typescript [TypeScript]
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
function checkSubTree(t1: TreeNode | null, t2: TreeNode | null): boolean {
    if (!t2) return true;
    if (!t1) return false;
    function isSame(a: TreeNode | null, b: TreeNode | null): boolean {
        if (!a && !b) return true;
        if (!a || !b) return false;
        return a.val === b.val && isSame(a.left, b.left) && isSame(a.right, b.right);
    }
    return isSame(t1, t2) || checkSubTree(t1.left, t2) || checkSubTree(t1.right, t2);
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n * m)`，最坏情况为每个节点都要比较一次，但实际中剪枝较多。
- **空间复杂度**：`O(max(height1, height2))`，递归栈深度。

---

### 2.2 方法二：序列化 + 字符串匹配

**1. 思路**

对两棵树分别进行先序遍历，并生成字符串表示（包含空节点标记，例如使用 `#` 表示空）。然后检查 `t2` 的序列化字符串是否为 `t1` 序列化字符串的子串。这种方法将树匹配转换为字符串匹配问题，时间复杂度 `O(n + m)`（若使用 KMP 则更优，但直接使用语言内置的 `contains` 通常是 `O(n * m)`，但实际效果可接受）。为了达到线性时间，可以使用 KMP 算法，但代码会复杂。我们采用简单的方式，因为题目规模不大，但为了最优，也可以使用 KMP。

此处我们采用简单子串判断，为保持代码清晰。

**2. 代码实现**

（注意：序列化时需要区分不同子树，避免歧义，通常使用前序遍历 + 分隔符 + 空标记。例如：`1,2,#,#,3,#,#`）

:::::: code-group

```java [Java]
class Solution {
    public boolean checkSubTree(TreeNode t1, TreeNode t2) {
        if (t2 == null) return true;
        String s1 = serialize(t1);
        String s2 = serialize(t2);
        return s1.contains(s2);
    }
    private String serialize(TreeNode node) {
        if (node == null) return "#,";
        return node.val + "," + serialize(node.left) + serialize(node.right);
    }
}
```

```python [Python]
class Solution:
    def checkSubTree(self, t1: TreeNode, t2: TreeNode) -> bool:
        if not t2:
            return True
        def serialize(node):
            if not node:
                return "#,"
            return str(node.val) + "," + serialize(node.left) + serialize(node.right)
        return serialize(t2) in serialize(t1)
```

```go [Go]
import "strings"
func checkSubTree(t1 *TreeNode, t2 *TreeNode) bool {
    if t2 == nil {
        return true
    }
    s1 := serialize(t1)
    s2 := serialize(t2)
    return strings.Contains(s1, s2)
}
func serialize(node *TreeNode) string {
    if node == nil {
        return "#,"
    }
    return strconv.Itoa(node.Val) + "," + serialize(node.Left) + serialize(node.Right)
}
```

```c [C]
#include <stdbool.h>
#include <string.h>
#include <stdlib.h>
// 序列化需要动态字符串，C语言较繁琐，此处提供伪代码示意
// 实际生产可使用递归构建字符串
char* serialize(struct TreeNode* node) {
    if (!node) return "#,";
    char* left = serialize(node->left);
    char* right = serialize(node->right);
    char* res = (char*)malloc(10000);
    sprintf(res, "%d,%s%s", node->val, left, right);
    free(left); free(right);
    return res;
}
bool checkSubTree(struct TreeNode* t1, struct TreeNode* t2) {
    if (!t2) return true;
    char* s1 = serialize(t1);
    char* s2 = serialize(t2);
    bool result = strstr(s1, s2) != NULL;
    free(s1); free(s2);
    return result;
}
```

```cpp [C++]
class Solution {
public:
    bool checkSubTree(TreeNode* t1, TreeNode* t2) {
        if (!t2) return true;
        string s1 = serialize(t1);
        string s2 = serialize(t2);
        return s1.find(s2) != string::npos;
    }
    string serialize(TreeNode* node) {
        if (!node) return "#,";
        return to_string(node->val) + "," + serialize(node->left) + serialize(node->right);
    }
};
```

```javascript [JavaScript]
var checkSubTree = function(t1, t2) {
    if (!t2) return true;
    function serialize(node) {
        if (!node) return "#,";
        return node.val + "," + serialize(node.left) + serialize(node.right);
    }
    return serialize(t1).includes(serialize(t2));
};
```

```typescript [TypeScript]
function checkSubTree(t1: TreeNode | null, t2: TreeNode | null): boolean {
    if (!t2) return true;
    function serialize(node: TreeNode | null): string {
        if (!node) return "#,";
        return node.val + "," + serialize(node.left) + serialize(node.right);
    }
    return serialize(t1).includes(serialize(t2));
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n + m)`（假设使用 KMP）或 `O(n * m)`（使用内置子串查找，但实际通常较快）。
- **空间复杂度**：`O(n + m)`，存储序列化字符串。

---

## 三、总结

| 方法                | 时间复杂度         | 空间复杂度       | 特点                         |
| ------------------- | ------------------ | ---------------- | ---------------------------- |
| 双重递归            | `O(n * m)`         | `O(max(h1, h2))` | 直观，无需额外空间           |
| 序列化 + 字符串匹配 | `O(n + m)`（平均） | `O(n + m)`       | 转化为字符串问题，可能更简洁 |

**推荐**：面试中两种方法均可。若对性能有要求，可选用序列化+KMP；若希望代码直观，则使用双重递归。实际生产环境中，可根据树的大小和匹配频率选择。
