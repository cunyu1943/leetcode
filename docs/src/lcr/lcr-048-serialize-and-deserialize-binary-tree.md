# [LCR 048. 二叉树的序列化与反序列化](https://leetcode.cn/problems/h54YBf/)



## 一、题目描述

序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。

请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。

**提示：** 输入输出格式与 LeetCode 目前使用的方式一致，详情请参阅 LeetCode 序列化二叉树的格式。你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。



**示例 1：**

```
输入：root = [1,2,3,null,null,4,5]
输出：[1,2,3,null,null,4,5]
```

**示例 2：**

```
输入：root = []
输出：[]
```

**提示：**

- 树中结点数在范围 `[0, 10⁴]` 内
- `-1000 <= Node.val <= 1000`



## 二、解答方法

### 2.1 方法一：前序遍历 + 空节点标记

1. **思路**

**序列化**：用前序遍历把节点值依次写出，空节点用 `"null"` 表示，节点间以逗号分隔，得到形如 `1,2,null,null,3,4,null,null,5,null,null` 的字符串。

**反序列化**：按逗号切分，同样用前序逻辑递归重建——遇到 `"null"` 返回 `null`，否则创建节点并递归构建左右子树。

时间 `O(n)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
public class Codec {
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        build(root, sb);
        return sb.toString();
    }
    private void build(TreeNode node, StringBuilder sb) {
        if (node == null) { sb.append("null,"); return; }
        sb.append(node.val).append(',');
        build(node.left, sb);
        build(node.right, sb);
    }

    public TreeNode deserialize(String data) {
        String[] arr = data.split(",");
        Deque<String> q = new ArrayDeque<>(Arrays.asList(arr));
        return parse(q);
    }
    private TreeNode parse(Deque<String> q) {
        String s = q.poll();
        if ("null".equals(s)) return null;
        TreeNode node = new TreeNode(Integer.parseInt(s));
        node.left = parse(q);
        node.right = parse(q);
        return node;
    }
}
```

```python [Python]
class Codec:
    def serialize(self, root):
        def build(node):
            if not node:
                return ['null']
            return [str(node.val)] + build(node.left) + build(node.right)
        return ','.join(build(root))

    def deserialize(self, data):
        q = data.split(',')

        def parse():
            s = q.pop(0)
            if s == 'null':
                return None
            node = TreeNode(int(s))
            node.left = parse()
            node.right = parse()
            return node
        return parse()
```

```cpp [C++]
class Codec {
public:
    string serialize(TreeNode* root) {
        string s;
        build(root, s);
        return s;
    }
    void build(TreeNode* node, string& s) {
        if (!node) { s += "null,"; return; }
        s += to_string(node->val) + ",";
        build(node->left, s);
        build(node->right, s);
    }

    TreeNode* deserialize(string data) {
        queue<string> q;
        string cur;
        for (char c : data) {
            if (c == ',') { q.push(cur); cur.clear(); }
            else cur += c;
        }
        return parse(q);
    }
private:
    TreeNode* parse(queue<string>& q) {
        string s = q.front(); q.pop();
        if (s == "null") return nullptr;
        TreeNode* node = new TreeNode(stoi(s));
        node->left = parse(q);
        node->right = parse(q);
        return node;
    }
};
```

```go [Go]
type Codec struct{}

func Constructor() Codec { return Codec{} }

func (c Codec) serialize(root *TreeNode) string {
    var sb []string
    var build func(node *TreeNode)
    build = func(node *TreeNode) {
        if node == nil {
            sb = append(sb, "null")
            return
        }
        sb = append(sb, strconv.Itoa(node.Val))
        build(node.Left)
        build(node.Right)
    }
    build(root)
    return strings.Join(sb, ",")
}

func (c Codec) deserialize(data string) *TreeNode {
    arr := strings.Split(data, ",")
    var idx int
    var parse func() *TreeNode
    parse = func() *TreeNode {
        if arr[idx] == "null" {
            idx++
            return nil
        }
        v, _ := strconv.Atoi(arr[idx])
        idx++
        node := &TreeNode{Val: v}
        node.Left = parse()
        node.Right = parse()
        return node
    }
    return parse()
}
```

```js [JavaScript]
var serialize = function (root) {
    const sb = [];
    const build = (node) => {
        if (!node) { sb.push('null'); return; }
        sb.push(node.val);
        build(node.left);
        build(node.right);
    };
    build(root);
    return sb.join(',');
};

var deserialize = function (data) {
    const arr = data.split(',');
    let idx = 0;
    const parse = () => {
        if (arr[idx] === 'null') { idx++; return null; }
        const node = new TreeNode(Number(arr[idx]));
        idx++;
        node.left = parse();
        node.right = parse();
        return node;
    };
    return parse();
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

char* serialize(struct TreeNode* root) {
    char* res = (char*)malloc(200000 * sizeof(char));
    res[0] = '\0';
    if (!root) { strcpy(res, "null"); return res; }
    char num[16];
    sprintf(num, "%d,", root->val);
    strcat(res, num);
    char* l = serialize(root->left);
    char* r = serialize(root->right);
    strcat(res, l);
    strcat(res, r);
    free(l); free(r);
    return res;
}

static struct TreeNode* parse(char** p) {
    if (**p == 'n') {  // "null"
        *p += 4;
        return NULL;
    }
    struct TreeNode* node = (struct TreeNode*)calloc(1, sizeof(struct TreeNode));
    node->val = atoi(*p);
    while (**p && **p != ',') (*p)++;
    if (**p == ',') (*p)++;
    node->left = parse(p);
    node->right = parse(p);
    return node;
}

struct TreeNode* deserialize(char* data) {
    return parse(&data);
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

function serialize(root: TreeNode | null): string {
    const sb: string[] = [];
    const build = (node: TreeNode | null) => {
        if (!node) { sb.push('null'); return; }
        sb.push(String(node.val));
        build(node.left);
        build(node.right);
    };
    build(root);
    return sb.join(',');
}

function deserialize(data: string): TreeNode | null {
    const arr = data.split(',');
    let idx = 0;
    const parse = (): TreeNode | null => {
        if (arr[idx] === 'null') { idx++; return null; }
        const node = new TreeNode(Number(arr[idx]));
        idx++;
        node.left = parse();
        node.right = parse();
        return node;
    };
    return parse();
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：序列化与反序列化均为 `O(n)`。
- **空间复杂度**：`O(n)`，字符串与递归栈。

### 2.2 方法二：层序遍历（BFS）

1. **思路**

**序列化**：层序遍历，把空节点也写成 `"null"`，仍以逗号分隔，如 `1,2,3,null,null,4,5`。

**反序列化**：用队列同步重建——先建根节点，然后每遇到一个节点就按其位置从数组中取左右孩子（`"null"` 则置空）。

2. **代码实现**

::::::: code-group

```java [Java]
public class Codec {
    public String serialize(TreeNode root) {
        if (root == null) return "";
        StringBuilder sb = new StringBuilder();
        Deque<TreeNode> q = new ArrayDeque<>();
        q.offer(root);
        while (!q.isEmpty()) {
            TreeNode cur = q.poll();
            if (cur == null) { sb.append("null,"); continue; }
            sb.append(cur.val).append(',');
            q.offer(cur.left);
            q.offer(cur.right);
        }
        return sb.toString();
    }

    public TreeNode deserialize(String data) {
        if (data.isEmpty()) return null;
        String[] arr = data.split(",");
        TreeNode root = new TreeNode(Integer.parseInt(arr[0]));
        Deque<TreeNode> q = new ArrayDeque<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty()) {
            TreeNode cur = q.poll();
            if (!"null".equals(arr[i])) {
                cur.left = new TreeNode(Integer.parseInt(arr[i]));
                q.offer(cur.left);
            }
            i++;
            if (!"null".equals(arr[i])) {
                cur.right = new TreeNode(Integer.parseInt(arr[i]));
                q.offer(cur.right);
            }
            i++;
        }
        return root;
    }
}
```

```python [Python]
class Codec:
    def serialize(self, root):
        if not root:
            return ''
        q = [root]
        res = []
        while q:
            node = q.pop(0)
            if node:
                res.append(str(node.val))
                q.append(node.left)
                q.append(node.right)
            else:
                res.append('null')
        return ','.join(res)

    def deserialize(self, data):
        if not data:
            return None
        arr = data.split(',')
        root = TreeNode(int(arr[0]))
        q = [root]
        i = 1
        while q:
            node = q.pop(0)
            if arr[i] != 'null':
                node.left = TreeNode(int(arr[i]))
                q.append(node.left)
            i += 1
            if arr[i] != 'null':
                node.right = TreeNode(int(arr[i]))
                q.append(node.right)
            i += 1
        return root
```

```cpp [C++]
class Codec {
public:
    string serialize(TreeNode* root) {
        if (!root) return "";
        string s;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            TreeNode* cur = q.front();
            q.pop();
            if (!cur) { s += "null,"; continue; }
            s += to_string(cur->val) + ",";
            q.push(cur->left);
            q.push(cur->right);
        }
        return s;
    }

    TreeNode* deserialize(string data) {
        if (data.empty()) return nullptr;
        vector<string> arr;
        string cur;
        for (char c : data) {
            if (c == ',') { arr.push_back(cur); cur.clear(); }
            else cur += c;
        }
        TreeNode* root = new TreeNode(stoi(arr[0]));
        queue<TreeNode*> q;
        q.push(root);
        int i = 1;
        while (!q.empty()) {
            TreeNode* node = q.front();
            q.pop();
            if (arr[i] != "null") { node->left = new TreeNode(stoi(arr[i])); q.push(node->left); }
            i++;
            if (arr[i] != "null") { node->right = new TreeNode(stoi(arr[i])); q.push(node->right); }
            i++;
        }
        return root;
    }
};
```

```go [Go]
type Codec struct{}

func Constructor() Codec { return Codec{} }

func (c Codec) serialize(root *TreeNode) string {
    if root == nil {
        return ""
    }
    var sb []string
    q := []*TreeNode{root}
    for len(q) > 0 {
        node := q[0]
        q = q[1:]
        if node == nil {
            sb = append(sb, "null")
            continue
        }
        sb = append(sb, strconv.Itoa(node.Val))
        q = append(q, node.Left, node.Right)
    }
    return strings.Join(sb, ",")
}

func (c Codec) deserialize(data string) *TreeNode {
    if data == "" {
        return nil
    }
    arr := strings.Split(data, ",")
    v, _ := strconv.Atoi(arr[0])
    root := &TreeNode{Val: v}
    q := []*TreeNode{root}
    i := 1
    for len(q) > 0 {
        node := q[0]
        q = q[1:]
        if arr[i] != "null" {
            v, _ := strconv.Atoi(arr[i])
            node.Left = &TreeNode{Val: v}
            q = append(q, node.Left)
        }
        i++
        if arr[i] != "null" {
            v, _ := strconv.Atoi(arr[i])
            node.Right = &TreeNode{Val: v}
            q = append(q, node.Right)
        }
        i++
    }
    return root
}
```

```js [JavaScript]
var serialize = function (root) {
    if (!root) return '';
    const q = [root];
    const res = [];
    while (q.length) {
        const node = q.shift();
        if (node) {
            res.push(node.val);
            q.push(node.left, node.right);
        } else {
            res.push('null');
        }
    }
    return res.join(',');
};

var deserialize = function (data) {
    if (!data) return null;
    const arr = data.split(',');
    const root = new TreeNode(Number(arr[0]));
    const q = [root];
    let i = 1;
    while (q.length) {
        const node = q.shift();
        if (arr[i] !== 'null') { node.left = new TreeNode(Number(arr[i])); q.push(node.left); }
        i++;
        if (arr[i] !== 'null') { node.right = new TreeNode(Number(arr[i])); q.push(node.right); }
        i++;
    }
    return root;
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

char* serialize(struct TreeNode* root) {
    if (!root) return NULL;
    char* res = (char*)malloc(200000 * sizeof(char));
    res[0] = '\0';
    struct TreeNode** q = (struct TreeNode**)malloc(20005 * sizeof(struct TreeNode*));
    int head = 0, tail = 0;
    q[tail++] = root;
    while (head < tail) {
        struct TreeNode* cur = q[head++];
        if (!cur) { strcat(res, "null,"); continue; }
        char num[16];
        sprintf(num, "%d,", cur->val);
        strcat(res, num);
        q[tail++] = cur->left;
        q[tail++] = cur->right;
    }
    free(q);
    return res;
}

struct TreeNode* deserialize(char* data) {
    if (!data || !data[0]) return NULL;
    char** arr = (char**)malloc(20005 * sizeof(char*));
    int n = 0;
    char* token = strtok(data, ",");
    while (token) { arr[n++] = token; token = strtok(NULL, ","); }
    struct TreeNode* root = (struct TreeNode*)calloc(1, sizeof(struct TreeNode));
    root->val = atoi(arr[0]);
    struct TreeNode** q = (struct TreeNode**)malloc(n * sizeof(struct TreeNode*));
    int head = 0, tail = 0;
    q[tail++] = root;
    int i = 1;
    while (head < tail) {
        struct TreeNode* node = q[head++];
        if (strcmp(arr[i], "null") != 0) {
            node->left = (struct TreeNode*)calloc(1, sizeof(struct TreeNode));
            node->left->val = atoi(arr[i]);
            q[tail++] = node->left;
        }
        i++;
        if (strcmp(arr[i], "null") != 0) {
            node->right = (struct TreeNode*)calloc(1, sizeof(struct TreeNode));
            node->right->val = atoi(arr[i]);
            q[tail++] = node->right;
        }
        i++;
    }
    free(arr);
    free(q);
    return root;
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

function serialize(root: TreeNode | null): string {
    if (!root) return '';
    const q: (TreeNode | null)[] = [root];
    const res: string[] = [];
    while (q.length) {
        const node = q.shift()!;
        if (node) {
            res.push(String(node.val));
            q.push(node.left, node.right);
        } else {
            res.push('null');
        }
    }
    return res.join(',');
}

function deserialize(data: string): TreeNode | null {
    if (!data) return null;
    const arr = data.split(',');
    const root = new TreeNode(Number(arr[0]));
    const q: TreeNode[] = [root];
    let i = 1;
    while (q.length) {
        const node = q.shift()!;
        if (arr[i] !== 'null') { node.left = new TreeNode(Number(arr[i])); q.push(node.left); }
        i++;
        if (arr[i] !== 'null') { node.right = new TreeNode(Number(arr[i])); q.push(node.right); }
        i++;
    }
    return root;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：序列化与反序列化均为 `O(n)`。
- **空间复杂度**：`O(n)`，队列。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 前序 + 空标记 | `O(n)` | `O(n)` | 实现简洁，推荐 |
| 层序 BFS | `O(n)` | `O(n)` | 与 LeetCode 输出格式一致 |

序列化的本质是「把树结构写成带终止符的线性序」，空节点标记让序列化结果自包含，反序列化用同样的遍历顺序即可完整复原。

