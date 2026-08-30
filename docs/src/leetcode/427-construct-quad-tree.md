# [427. 建立四叉树](https://leetcode.cn/problems/construct-quad-tree/)

## 一、题目描述

给你一个 `n x n` 的二进制矩阵 `grid`（`n` 为 2 的幂）。用该矩阵构造一个**四叉树**：

- 若当前区域内所有值相同，则该节点为叶子，存该值；
- 否则将该区域等分为 4 个子区域（左上、右上、左下、右下），递归构造 4 个子节点。

四叉树节点结构：`val`(bool)、`isLeaf`(bool)、`topLeft`、`topRight`、`bottomLeft`、`bottomRight`。

**示例 1：**

```
输入：grid = [[0,1],[1,0]]
输出：对应四叉树根（非叶子，含 4 个叶子子节点）
```

**示例 2：**

```
输入：grid = [[1,1,1,1,0,0,0,0],...] （8x8）
输出：由均匀区域合并的四叉树
```

**提示：**

- `n == grid.length == grid[i].length`
- `n == 2^x`，`x` 为整数且 `0 <= x <= 6`

## 二、解答方法

### 2.1 方法一：递归划分

1. 思路

对当前子区域 `[r1,r2] x [c1,c2]`，先判断是否全部相等：取 `grid[r1][c1]` 为基准，扫描区域，发现不同则非叶子，递归构造四个象限（注意坐标中点 `(r1+r2)/2`）。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public Node construct(int[][] g) {
        return dfs(g, 0, 0, g.length - 1, g.length - 1);
    }
    Node dfs(int[][] g, int r1, int c1, int r2, int c2) {
        boolean same = true;
        int v = g[r1][c1];
        for (int i = r1; i <= r2 && same; i++)
            for (int j = c1; j <= c2; j++)
                if (g[i][j] != v) { same = false; break; }
        if (same) return new Node(v == 1, true);
        int rm = (r1 + r2) / 2, cm = (c1 + c2) / 2;
        Node node = new Node(false, false);
        node.topLeft = dfs(g, r1, c1, rm, cm);
        node.topRight = dfs(g, r1, cm + 1, rm, c2);
        node.bottomLeft = dfs(g, rm + 1, c1, r2, cm);
        node.bottomRight = dfs(g, rm + 1, cm + 1, r2, c2);
        return node;
    }
}
```

```python [Python]
class Solution:
    def construct(self, grid: List[List[int]]) -> 'Node':
        def dfs(r1, c1, r2, c2):
            v = grid[r1][c1]
            same = True
            for i in range(r1, r2 + 1):
                for j in range(c1, c2 + 1):
                    if grid[i][j] != v:
                        same = False
                        break
                if not same:
                    break
            if same:
                return Node(v == 1, True)
            rm, cm = (r1 + r2) // 2, (c1 + c2) // 2
            node = Node(False, False)
            node.topLeft = dfs(r1, c1, rm, cm)
            node.topRight = dfs(r1, cm + 1, rm, c2)
            node.bottomLeft = dfs(rm + 1, c1, r2, cm)
            node.bottomRight = dfs(rm + 1, cm + 1, r2, c2)
            return node
        return dfs(0, 0, len(grid) - 1, len(grid) - 1)
```

```cpp [C++]
class Solution {
public:
    Node* construct(vector<vector<int>>& g) {
        return dfs(g, 0, 0, g.size() - 1, g.size() - 1);
    }
    Node* dfs(vector<vector<int>>& g, int r1, int c1, int r2, int c2) {
        int v = g[r1][c1];
        bool same = true;
        for (int i = r1; i <= r2 && same; i++)
            for (int j = c1; j <= c2; j++)
                if (g[i][j] != v) { same = false; break; }
        if (same) return new Node(v == 1, true);
        int rm = (r1 + r2) / 2, cm = (c1 + c2) / 2;
        Node* node = new Node(false, false);
        node->topLeft = dfs(g, r1, c1, rm, cm);
        node->topRight = dfs(g, r1, cm + 1, rm, c2);
        node->bottomLeft = dfs(g, rm + 1, c1, r2, cm);
        node->bottomRight = dfs(g, rm + 1, cm + 1, r2, c2);
        return node;
    }
};
```

```go [Go]
func construct(grid [][]int) *Node {
	var dfs func(int, int, int, int) *Node
	dfs = func(r1, c1, r2, c2 int) *Node {
		v := grid[r1][c1]
		same := true
	outer:
		for i := r1; i <= r2; i++ {
			for j := c1; j <= c2; j++ {
				if grid[i][j] != v {
					same = false
					break outer
				}
			}
		}
		if same {
			return &Node{Val: v == 1, IsLeaf: true}
		}
		rm, cm := (r1+r2)/2, (c1+c2)/2
		node := &Node{Val: false, IsLeaf: false}
		node.TopLeft = dfs(r1, c1, rm, cm)
		node.TopRight = dfs(r1, cm+1, rm, c2)
		node.BottomLeft = dfs(rm+1, c1, r2, cm)
		node.BottomRight = dfs(rm+1, cm+1, r2, c2)
		return node
	}
	return dfs(0, 0, len(grid)-1, len(grid)-1)
}
```

```javascript [JavaScript]
var construct = function (grid) {
    const dfs = (r1, c1, r2, c2) => {
        const v = grid[r1][c1];
        let same = true;
        outer: for (let i = r1; i <= r2; i++)
            for (let j = c1; j <= c2; j++)
                if (grid[i][j] !== v) { same = false; break outer; }
        if (same) return new Node(v === 1, true);
        const rm = Math.floor((r1 + r2) / 2), cm = Math.floor((c1 + c2) / 2);
        const node = new Node(false, false);
        node.topLeft = dfs(r1, c1, rm, cm);
        node.topRight = dfs(r1, cm + 1, rm, c2);
        node.bottomLeft = dfs(rm + 1, c1, r2, cm);
        node.bottomRight = dfs(rm + 1, cm + 1, r2, c2);
        return node;
    };
    return dfs(0, 0, grid.length - 1, grid.length - 1);
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n^2)$（最坏每个单元格访问多次，但因分治约为 $O(n^2 \log n)$，实际受限）。
- 空间复杂度：$O(\log n)$，递归深度。

## 三、总结

四叉树构造是分治的典型应用，与线段树/区域划分同源。相关题目：558 四叉树交集、剑指 Offer II 某一题。
