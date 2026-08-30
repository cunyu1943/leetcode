# [331. 验证二叉树的前序序列化](https://leetcode.cn/problems/verify-preorder-serialization-of-a-binary-tree/)

## 一、题目描述

给定一棵二叉树的一种 **前序序列化** 字符串（节点用逗号分隔，空节点用 `#` 表示），判断它是否是一个 **合法的二叉树前序遍历序列化**。

**示例：**
```
输入：preorder = "9,3,4,#,#,1,#,#,2,#,6,#,#"   输出：true
输入：preorder = "1,#"                           输出：false
输入：preorder = "9,#,#,1"                       输出：false
```

**提示：** `1 <= preorder.length <= 10⁴`，由数字、`#`、`,` 组成。

## 二、解答方法

### 方法一：槽位计数（indegree/outdegree 思想）

**思路：** 把序列化看成「建树过程」，维护「可用槽位数」`slots`：初始 1（根槽）。遇到数字节点：消耗 1 槽并产生 2 槽（→ `+1`）；遇到 `#`：消耗 1 槽（→ `-1`）。任意时刻 `slots < 0` 非法；结束必须 `slots == 0`。

:::::: code-group

```java [Java]
class Solution {
    public boolean isValidSerialization(String preorder) {
        int slots = 1;
        for (String node : preorder.split(",")) {
            slots--;
            if (slots < 0) return false;
            if (!node.equals("#")) slots += 2;   // 非空节点产生两个槽
        }
        return slots == 0;
    }
}
```

```python [Python]
class Solution:
    def isValidSerialization(self, preorder: str) -> bool:
        slots = 1
        for node in preorder.split(','):
            slots -= 1
            if slots < 0: return False
            if node != '#': slots += 2
        return slots == 0
```

```cpp [C++]
class Solution {
public:
    bool isValidSerialization(string preorder) {
        int slots = 1;
        int i = 0;
        while (i < preorder.size()) {
            string node;
            while (i < preorder.size() && preorder[i] != ',') node += preorder[i++];
            i++;            // 跳过逗号
            slots--;
            if (slots < 0) return false;
            if (node != "#") slots += 2;
        }
        return slots == 0;
    }
};
```

```go [Go]
func isValidSerialization(preorder string) bool {
    slots := 1
    for _, node := range strings.Split(preorder, ",") {
        slots--
        if slots < 0 { return false }
        if node != "#" { slots += 2 }
    }
    return slots == 0
}
```

```js [JavaScript]
var isValidSerialization = function (preorder) {
    let slots = 1;
    for (const node of preorder.split(',')) {
        slots--;
        if (slots < 0) return false;
        if (node !== '#') slots += 2;
    }
    return slots === 0;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(1)`（除 split 外）。

## 三、总结

「槽位/出度入度」是判断序列化合法性的最简方法：每个非空节点消耗 1 槽补充 2 槽（净 +1），空节点只消耗 1。等价于图论中「树的总出度=入度+1」。也可栈模拟（遇到 `#,#` 且前一个是数字则合并为 `#`）。本题与 `297 序列化` 呼应。
