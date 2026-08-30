# [297. 二叉树的序列化与反序列化](https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/)

## 一、题目描述

序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。

请设计一个算法来实现二叉树的 **序列化** 与 **反序列化**。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。

**示例：**

```
输入：root = [1,2,3,null,null,4,5]
输出：[1,2,3,null,null,4,5]（序列化后）
```

**提示：** 树中节点数范围 `[0, 10⁴]`，`-1000 <= Node.val <= 1000`。

## 二、解答方法

### 方法一：层序（BFS）序列化

**思路：** 用 `#` 或 `null` 表示空节点，逗号分隔。序列化时按层遍历，把所有节点（含空指针）依次写入，结尾多余 `null` 可裁剪。反序列化时用队列按层重建：读到值就建节点，并从队列取父节点挂左右孩子。

:::::: code-group

```java [Java]
public class Codec {
    // 序列化
    public String serialize(TreeNode root) {
        if (root == null) return "[]";
        StringBuilder sb = new StringBuilder("[");
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            if (node == null) sb.append("null,");
            else {
                sb.append(node.val).append(",");
                q.offer(node.left); q.offer(node.right);
            }
        }
        sb.deleteCharAt(sb.length() - 1);   // 去掉末尾逗号
        sb.append("]");
        return sb.toString();
    }
    // 反序列化
    public TreeNode deserialize(String data) {
        if (data.equals("[]")) return null;
        String[] vals = data.substring(1, data.length() - 1).split(",");
        TreeNode root = new TreeNode(Integer.parseInt(vals[0]));
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < vals.length) {
            TreeNode node = q.poll();
            if (!vals[i].equals("null")) { node.left = new TreeNode(Integer.parseInt(vals[i])); q.offer(node.left); }
            i++;
            if (i < vals.length && !vals[i].equals("null")) { node.right = new TreeNode(Integer.parseInt(vals[i])); q.offer(node.right); }
            i++;
        }
        return root;
    }
}
```

```python [Python]
class Codec:
    def serialize(self, root):
        if not root: return "[]"
        q = [root]
        res = []
        while q:
            node = q.pop(0)
            if node:
                res.append(str(node.val))
                q.append(node.left); q.append(node.right)
            else:
                res.append("null")
        # 裁剪末尾多余 null
        while res and res[-1] == "null":
            res.pop()
        return "[" + ",".join(res) + "]"

    def deserialize(self, data):
        if data == "[]": return None
        vals = data[1:-1].split(",")
        root = TreeNode(int(vals[0]))
        q = [root]
        i = 1
        while q and i < len(vals):
            node = q.pop(0)
            if vals[i] != "null":
                node.left = TreeNode(int(vals[i])); q.append(node.left)
            i += 1
            if i < len(vals) and vals[i] != "null":
                node.right = TreeNode(int(vals[i])); q.append(node.right)
            i += 1
        return root
```

```cpp [C++]
class Codec {
public:
    string serialize(TreeNode* root) {
        if (!root) return "[]";
        string res = "[";
        queue<TreeNode*> q; q.push(root);
        while (!q.empty()) {
            TreeNode* node = q.front(); q.pop();
            if (!node) res += "null,";
            else {
                res += to_string(node->val) + ",";
                q.push(node->left); q.push(node->right);
            }
        }
        res.pop_back(); res += "]";
        return res;
    }
    TreeNode* deserialize(string data) {
        if (data == "[]") return nullptr;
        string s = data.substr(1, data.size() - 2);
        vector<string> vals;
        stringstream ss(s); string tmp;
        while (getline(ss, tmp, ',')) vals.push_back(tmp);
        TreeNode* root = new TreeNode(stoi(vals[0]));
        queue<TreeNode*> q; q.push(root);
        int i = 1;
        while (!q.empty() && i < vals.size()) {
            TreeNode* node = q.front(); q.pop();
            if (vals[i] != "null") { node->left = new TreeNode(stoi(vals[i])); q.push(node->left); }
            i++;
            if (i < vals.size() && vals[i] != "null") { node->right = new TreeNode(stoi(vals[i])); q.push(node->right); }
            i++;
        }
        return root;
    }
};
```

```go [Go]
func serialize(root *TreeNode) string {
    if root == nil { return "[]" }
    res := "["; q := []*TreeNode{root}
    for len(q) > 0 {
        node := q[0]; q = q[1:]
        if node == nil {
            res += "null,"
        } else {
            res += strconv.Itoa(node.Val) + ","
            q = append(q, node.Left, node.Right)
        }
    }
    res = res[:len(res)-1] + "]"
    return res
}
func deserialize(data string) *TreeNode {
    if data == "[]" { return nil }
    s := data[1 : len(data)-1]
    parts := strings.Split(s, ",")
    v, _ := strconv.Atoi(parts[0])
    root := &TreeNode{Val: v}
    q := []*TreeNode{root}
    i := 1
    for len(q) > 0 && i < len(parts) {
        node := q[0]; q = q[1:]
        if parts[i] != "null" {
            v, _ := strconv.Atoi(parts[i]); node.Left = &TreeNode{Val: v}; q = append(q, node.Left)
        }
        i++
        if i < len(parts) && parts[i] != "null" {
            v, _ := strconv.Atoi(parts[i]); node.Right = &TreeNode{Val: v}; q = append(q, node.Right)
        }
        i++
    }
    return root
}
```

```js [JavaScript]
var serialize = function (root) {
    if (!root) return "[]";
    const q = [root], res = [];
    while (q.length) {
        const node = q.shift();
        if (!node) res.push("null");
        else { res.push(node.val); q.push(node.left, node.right); }
    }
    while (res[res.length - 1] === "null") res.pop();
    return "[" + res.join(",") + "]";
};
var deserialize = function (data) {
    if (data === "[]") return null;
    const vals = data.slice(1, -1).split(",");
    const root = new TreeNode(Number(vals[0]));
    const q = [root];
    let i = 1;
    while (q.length && i < vals.length) {
        const node = q.shift();
        if (vals[i] !== "null") { node.left = new TreeNode(Number(vals[i])); q.push(node.left); }
        i++;
        if (i < vals.length && vals[i] !== "null") { node.right = new TreeNode(Number(vals[i])); q.push(node.right); }
        i++;
    }
    return root;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(n)`。

## 三、总结

最常用两种序列化：
- **层序（BFS）**：格式直观如 `[1,2,3,null,null,4,5]`，反序列化用队列按层挂左右孩子；
- **前序（DFS）**：`root,left,right` 递归，用 `null` 显式标记空，反序列化用指针递归重建（更紧凑）。

本题不限制格式，只要可逆即可。注意层序法序列化后 **裁剪尾部多余 null** 可减少长度（反序列化也能处理带 null 的情况）。与前序递归法相比，层序更易写对、不易出错。同类题：`449 二叉搜索树的序列化`（可利用 BST 性质只存前序即可重建）。
