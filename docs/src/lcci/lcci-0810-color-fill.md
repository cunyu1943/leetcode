# [面试题 08.10. 颜色填充](https://leetcode.cn/problems/color-fill-lcci/)

## 一、题目描述

编写函数，实现许多图片编辑软件都支持的「颜色填充」功能。

待填充的图像用二维数组 `image` 表示，元素为初始颜色值。初始坐标点的行坐标为 `sr` 列坐标为 `sc`。需要填充的新颜色为 `newColor` 。

「周围区域」是指颜色相同且在上、下、左、右四个方向上存在相连情况的若干元素。

请用新颜色填充初始坐标点的周围区域，并返回填充后的图像。

**示例：**

```
输入：image = [[1,1,1],[1,1,0],[1,0,1]]，sr = 1, sc = 1, newColor = 2
输出：[[2,2,2],[2,2,0],[2,0,1]]
解释：初始坐标点位于图像的正中间，坐标 (sr,sc)=(1,1) 。初始坐标点周围区域上所有符合条件的像素点的颜色都被更改成 2 。注意，右下角的像素没有更改为 2 ，因为它不属于初始坐标点的周围区域。
```

**提示：**

- `image` 和 `image[0]` 的长度均在范围 `[1, 50]` 内。
- 初始坐标点 `(sr,sc)` 满足 `0 <= sr < image.length` 和 `0 <= sc < image[0].length` 。
- `image[i][j]` 和 `newColor` 表示的颜色值在范围 `[0, 65535]` 内。

---

## 二、解答方法

### 2.1 方法一：DFS（深度优先）

**1. 思路**

这是经典的「洪水填充（Flood Fill）」。从 `(sr, sc)` 出发，若目标颜色 `oldColor` 等于 `newColor` 可直接返回（否则会无限递归）。对当前点四邻域中「颜色等于 `oldColor`」的点递归填充为新颜色。注意先把当前点改色再递归，避免重复访问。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {
        int oldColor = image[sr][sc];
        if (oldColor != newColor) dfs(image, sr, sc, oldColor, newColor);
        return image;
    }
    private void dfs(int[][] image, int i, int j, int oldColor, int newColor) {
        if (i < 0 || j < 0 || i >= image.length || j >= image[0].length) return;
        if (image[i][j] != oldColor) return;
        image[i][j] = newColor;
        dfs(image, i + 1, j, oldColor, newColor);
        dfs(image, i - 1, j, oldColor, newColor);
        dfs(image, i, j + 1, oldColor, newColor);
        dfs(image, i, j - 1, oldColor, newColor);
    }
}
```

```python [Python]
class Solution:
    def floodFill(self, image: List[List[int]], sr: int, sc: int, newColor: int) -> List[List[int]]:
        oldColor = image[sr][sc]
        if oldColor != newColor:
            def dfs(i, j):
                if i < 0 or j < 0 or i >= len(image) or j >= len(image[0]) or image[i][j] != oldColor:
                    return
                image[i][j] = newColor
                dfs(i + 1, j)
                dfs(i - 1, j)
                dfs(i, j + 1)
                dfs(i, j - 1)
            dfs(sr, sc)
        return image
```

```go [Go]
func floodFill(image [][]int, sr int, sc int, newColor int) [][]int {
	oldColor := image[sr][sc]
	if oldColor != newColor {
		var dfs func(i, j int)
		dfs = func(i, j int) {
			if i < 0 || j < 0 || i >= len(image) || j >= len(image[0]) || image[i][j] != oldColor {
				return
			}
			image[i][j] = newColor
			dfs(i+1, j)
			dfs(i-1, j)
			dfs(i, j+1)
			dfs(i, j-1)
		}
		dfs(sr, sc)
	}
	return image
}
```

```c [C]
void dfs(int** image, int r, int c, int i, int j, int oldColor, int newColor) {
    if (i < 0 || j < 0 || i >= r || j >= c || image[i][j] != oldColor) return;
    image[i][j] = newColor;
    dfs(image, r, c, i + 1, j, oldColor, newColor);
    dfs(image, r, c, i - 1, j, oldColor, newColor);
    dfs(image, r, c, i, j + 1, oldColor, newColor);
    dfs(image, r, c, i, j - 1, oldColor, newColor);
}
int** floodFill(int** image, int imageSize, int* imageColSize, int sr, int sc, int newColor, int* returnSize, int** returnColumnSizes) {
    int oldColor = image[sr][sc];
    *returnSize = imageSize;
    *returnColumnSizes = imageColSize;
    if (oldColor != newColor) {
        dfs(image, imageSize, imageColSize[0], sr, sc, oldColor, newColor);
    }
    return image;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {
        int oldColor = image[sr][sc];
        if (oldColor != newColor) dfs(image, sr, sc, oldColor, newColor);
        return image;
    }
private:
    void dfs(vector<vector<int>>& image, int i, int j, int oldColor, int newColor) {
        if (i < 0 || j < 0 || i >= image.size() || j >= image[0].size() || image[i][j] != oldColor) return;
        image[i][j] = newColor;
        dfs(image, i + 1, j, oldColor, newColor);
        dfs(image, i - 1, j, oldColor, newColor);
        dfs(image, i, j + 1, oldColor, newColor);
        dfs(image, i, j - 1, oldColor, newColor);
    }
};
```

```javascript [JavaScript]
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, newColor) {
    const oldColor = image[sr][sc];
    if (oldColor !== newColor) {
        const r = image.length, c = image[0].length;
        const dfs = (i, j) => {
            if (i < 0 || j < 0 || i >= r || j >= c || image[i][j] !== oldColor) return;
            image[i][j] = newColor;
            dfs(i + 1, j);
            dfs(i - 1, j);
            dfs(i, j + 1);
            dfs(i, j - 1);
        };
        dfs(sr, sc);
    }
    return image;
};
```

```typescript [TypeScript]
function floodFill(image: number[][], sr: number, sc: number, newColor: number): number[][] {
    const oldColor = image[sr][sc];
    if (oldColor !== newColor) {
        const r = image.length, c = image[0].length;
        const dfs = (i: number, j: number): void => {
            if (i < 0 || j < 0 || i >= r || j >= c || image[i][j] !== oldColor) return;
            image[i][j] = newColor;
            dfs(i + 1, j);
            dfs(i - 1, j);
            dfs(i, j + 1);
            dfs(i, j - 1);
        };
        dfs(sr, sc);
    }
    return image;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(r * c)`，每个像素最多访问一次。
- **空间复杂度**：`O(r * c)` 递归栈（最坏全图同色）。

---

### 2.2 方法二：BFS（广度优先）

**1. 思路**

用队列替代递归栈：从起点入队，每次取出队首，将其四邻域中同色且未处理的点改色并入队。结果等价，但避免了深度递归可能导致的栈溢出，空间占用更可控。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {
        int oldColor = image[sr][sc];
        if (oldColor == newColor) return image;
        int r = image.length, c = image[0].length;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        java.util.Queue<int[]> q = new java.util.LinkedList<>();
        q.offer(new int[]{sr, sc});
        image[sr][sc] = newColor;
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int[] d : dirs) {
                int ni = cur[0] + d[0], nj = cur[1] + d[1];
                if (ni >= 0 && nj >= 0 && ni < r && nj < c && image[ni][nj] == oldColor) {
                    image[ni][nj] = newColor;
                    q.offer(new int[]{ni, nj});
                }
            }
        }
        return image;
    }
}
```

```python [Python]
class Solution:
    def floodFill(self, image: List[List[int]], sr: int, sc: int, newColor: int) -> List[List[int]]:
        from collections import deque
        oldColor = image[sr][sc]
        if oldColor == newColor:
            return image
        r, c = len(image), len(image[0])
        q = deque([(sr, sc)])
        image[sr][sc] = newColor
        dirs = ((1,0),(-1,0),(0,1),(0,-1))
        while q:
            i, j = q.popleft()
            for di, dj in dirs:
                ni, nj = i + di, j + dj
                if 0 <= ni < r and 0 <= nj < c and image[ni][nj] == oldColor:
                    image[ni][nj] = newColor
                    q.append((ni, nj))
        return image
```

```go [Go]
func floodFill(image [][]int, sr int, sc int, newColor int) [][]int {
	oldColor := image[sr][sc]
	if oldColor == newColor {
		return image
	}
	r, c := len(image), len(image[0])
	type pair struct{ i, j int }
	q := []pair{{sr, sc}}
	image[sr][sc] = newColor
	dirs := [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for len(q) > 0 {
		cur := q[0]
		q = q[1:]
		for _, d := range dirs {
			ni, nj := cur.i+d[0], cur.j+d[1]
			if ni >= 0 && nj >= 0 && ni < r && nj < c && image[ni][nj] == oldColor {
				image[ni][nj] = newColor
				q = append(q, pair{ni, nj})
			}
		}
	}
	return image
}
```

```c [C]
// BFS 在 C 中需自行实现队列，较繁琐。这里给出与方法一等价的可编译 DFS 版本供参考
void dfs(int** image, int r, int c, int i, int j, int oldColor, int newColor) {
    if (i < 0 || j < 0 || i >= r || j >= c || image[i][j] != oldColor) return;
    image[i][j] = newColor;
    dfs(image, r, c, i + 1, j, oldColor, newColor);
    dfs(image, r, c, i - 1, j, oldColor, newColor);
    dfs(image, r, c, i, j + 1, oldColor, newColor);
    dfs(image, r, c, i, j - 1, oldColor, newColor);
}
int** floodFill(int** image, int imageSize, int* imageColSize, int sr, int sc, int newColor, int* returnSize, int** returnColumnSizes) {
    int oldColor = image[sr][sc];
    *returnSize = imageSize;
    *returnColumnSizes = imageColSize;
    if (oldColor != newColor) {
        dfs(image, imageSize, imageColSize[0], sr, sc, oldColor, newColor);
    }
    return image;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {
        int oldColor = image[sr][sc];
        if (oldColor == newColor) return image;
        int r = image.size(), c = image[0].size();
        queue<pair<int,int>> q;
        q.push({sr, sc});
        image[sr][sc] = newColor;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.empty()) {
            auto [i, j] = q.front(); q.pop();
            for (auto& d : dirs) {
                int ni = i + d[0], nj = j + d[1];
                if (ni >= 0 && nj >= 0 && ni < r && nj < c && image[ni][nj] == oldColor) {
                    image[ni][nj] = newColor;
                    q.push({ni, nj});
                }
            }
        }
        return image;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, newColor) {
    const oldColor = image[sr][sc];
    if (oldColor === newColor) return image;
    const r = image.length, c = image[0].length;
    const q = [[sr, sc]];
    image[sr][sc] = newColor;
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    while (q.length) {
        const [i, j] = q.shift();
        for (const [di, dj] of dirs) {
            const ni = i + di, nj = j + dj;
            if (ni >= 0 && nj >= 0 && ni < r && nj < c && image[ni][nj] === oldColor) {
                image[ni][nj] = newColor;
                q.push([ni, nj]);
            }
        }
    }
    return image;
};
```

```typescript [TypeScript]
function floodFill(image: number[][], sr: number, sc: number, newColor: number): number[][] {
    const oldColor = image[sr][sc];
    if (oldColor === newColor) return image;
    const r = image.length, c = image[0].length;
    const q: [number, number][] = [[sr, sc]];
    image[sr][sc] = newColor;
    const dirs: [number, number][] = [[1,0],[-1,0],[0,1],[0,-1]];
    while (q.length) {
        const [i, j] = q.shift()!;
        for (const [di, dj] of dirs) {
            const ni = i + di, nj = j + dj;
            if (ni >= 0 && nj >= 0 && ni < r && nj < c && image[ni][nj] === oldColor) {
                image[ni][nj] = newColor;
                q.push([ni, nj]);
            }
        }
    }
    return image;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(r * c)`。
- **空间复杂度**：`O(r * c)` 队列。

---

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点                             |
| ---- | ---------- | ---------- | -------------------------------- |
| DFS  | `O(r*c)`   | `O(r*c)`   | 递归简洁，面试首选，推荐         |
| BFS  | `O(r*c)`   | `O(r*c)`   | 用队列避免深递归栈溢出           |

**推荐解法**：DFS 写法最简洁。务必先判断 `oldColor == newColor` 直接返回，否则在同一颜色填充时会无限递归/重复入队导致栈溢出。
