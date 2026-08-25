# [面试题 08.02. 迷路的机器人](https://leetcode.cn/problems/robot-in-a-grid-lcci/)

## 一、题目描述

设想有个机器人坐在一个网格的左上角，网格 r 行 c 列。机器人只能向下或向右移动，但不能走到一些被禁止的网格（有障碍物）。设计一种算法，寻找机器人从左上角移动到右下角的路径。

网格中的障碍物和空位置分别用 `1` 和 `0` 来表示。

返回一条可行的路径，路径由经过的网格的行号和列号组成。左上角为 0 行 0 列。如果没有可行的路径，返回空数组。

**说明**：r 和 c 的值均不超过 100。

**示例 1：**

```
输入：[[0,0,0],[0,1,0],[0,0,0]]
输出：[[0,0],[0,1],[0,2],[1,2],[2,2]]
解释：一条可行路径如上。
```

---

## 二、解答方法

### 2.1 方法一：回溯 + 记忆化（自顶向下）

**1. 思路**

从终点 `(r-1, c-1)` 反向递归到起点 `(0,0)`：当前格子若可达终点，则把当前格加入路径。递归时优先尝试「左」再「上」（对应正向的「右」「下」）。为避免重复计算不可达的格子，用一个 `failed` 集合记录已确定不可达的格子剪枝。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> pathWithObstacles(int[][] obstacleGrid) {
        int r = obstacleGrid.length, c = obstacleGrid[0].length;
        List<List<Integer>> path = new ArrayList<>();
        boolean[][] failed = new boolean[r][c];
        dfs(obstacleGrid, 0, 0, r, c, path, failed);
        return path;
    }
    private boolean dfs(int[][] grid, int i, int j, int r, int c,
                        List<List<Integer>> path, boolean[][] failed) {
        if (i >= r || j >= c || grid[i][j] == 1 || failed[i][j]) return false;
        path.add(Arrays.asList(i, j));
        if (i == r - 1 && j == c - 1) return true;
        if (dfs(grid, i, j + 1, r, c, path, failed) ||
            dfs(grid, i + 1, j, r, c, path, failed)) return true;
        path.remove(path.size() - 1);
        failed[i][j] = true;
        return false;
    }
}
```

```python [Python]
class Solution:
    def pathWithObstacles(self, obstacleGrid: List[List[int]]) -> List[List[int]]:
        r, c = len(obstacleGrid), len(obstacleGrid[0])
        path = []
        failed = set()

        def dfs(i, j):
            if i >= r or j >= c or obstacleGrid[i][j] == 1 or (i, j) in failed:
                return False
            path.append([i, j])
            if i == r - 1 and j == c - 1:
                return True
            if dfs(i, j + 1) or dfs(i + 1, j):
                return True
            path.pop()
            failed.add((i, j))
            return False

        return path if dfs(0, 0) else []
```

```go [Go]
func pathWithObstacles(obstacleGrid [][]int) [][]int {
	r := len(obstacleGrid)
	c := len(obstacleGrid[0])
	path := [][]int{}
	failed := make([][]bool, r)
	for i := range failed {
		failed[i] = make([]bool, c)
	}
	var dfs func(i, j int) bool
	dfs = func(i, j int) bool {
		if i >= r || j >= c || obstacleGrid[i][j] == 1 || failed[i][j] {
			return false
		}
		path = append(path, []int{i, j})
		if i == r-1 && j == c-1 {
			return true
		}
		if dfs(i, j+1) || dfs(i+1, j) {
			return true
		}
		path = path[:len(path)-1]
		failed[i][j] = true
		return false
	}
	if dfs(0, 0) {
		return path
	}
	return [][]int{}
}
```

```c [C]
// 返回数组以 NULL 结尾的二维数组；调用者需自行释放
int** pathWithObstacles(int** obstacleGrid, int obstacleGridSize, int* obstacleGridColSize, int* returnSize, int** returnColumnSizes) {
    int r = obstacleGridSize, c = obstacleGridColSize[0];
    int** path = (int**)malloc(r * c * sizeof(int*));
    int* pathCols = (int*)malloc(r * c * sizeof(int));
    int idx = 0;
    char* failed = (char*)calloc(r * c, sizeof(char));

    int dfs(int i, int j) {
        if (i >= r || j >= c || obstacleGrid[i][j] == 1 || failed[i * c + j])
            return 0;
        path[idx] = (int*)malloc(2 * sizeof(int));
        path[idx][0] = i;
        path[idx][1] = j;
        pathCols[idx] = 2;
        idx++;
        if (i == r - 1 && j == c - 1) return 1;
        if (dfs(i, j + 1) || dfs(i + 1, j)) return 1;
        idx--;
        failed[i * c + j] = 1;
        return 0;
    }
    if (dfs(0, 0)) {
        *returnSize = idx;
        *returnColumnSizes = pathCols;
        return path;
    }
    *returnSize = 0;
    *returnColumnSizes = pathCols;
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> pathWithObstacles(vector<vector<int>>& obstacleGrid) {
        int r = obstacleGrid.size(), c = obstacleGrid[0].size();
        vector<vector<int>> path;
        vector<vector<char>> failed(r, vector<char>(c, 0));
        function<bool(int, int)> dfs = [&](int i, int j) -> bool {
            if (i >= r || j >= c || obstacleGrid[i][j] == 1 || failed[i][j])
                return false;
            path.push_back({i, j});
            if (i == r - 1 && j == c - 1) return true;
            if (dfs(i, j + 1) || dfs(i + 1, j)) return true;
            path.pop_back();
            failed[i][j] = 1;
            return false;
        };
        return dfs(0, 0) ? path : vector<vector<int>>{};
    }
};
```

```javascript [JavaScript]
/**
 * @param {number[][]} obstacleGrid
 * @return {number[][]}
 */
var pathWithObstacles = function (obstacleGrid) {
    const r = obstacleGrid.length, c = obstacleGrid[0].length;
    const path = [];
    const failed = Array.from({ length: r }, () => new Array(c).fill(false));
    const dfs = (i, j) => {
        if (i >= r || j >= c || obstacleGrid[i][j] === 1 || failed[i][j]) return false;
        path.push([i, j]);
        if (i === r - 1 && j === c - 1) return true;
        if (dfs(i, j + 1) || dfs(i + 1, j)) return true;
        path.pop();
        failed[i][j] = true;
        return false;
    };
    return dfs(0, 0) ? path : [];
};
```

```typescript [TypeScript]
function pathWithObstacles(obstacleGrid: number[][]): number[][] {
    const r = obstacleGrid.length, c = obstacleGrid[0].length;
    const path: number[][] = [];
    const failed: boolean[][] = Array.from({ length: r }, () => new Array(c).fill(false));
    const dfs = (i: number, j: number): boolean => {
        if (i >= r || j >= c || obstacleGrid[i][j] === 1 || failed[i][j]) return false;
        path.push([i, j]);
        if (i === r - 1 && j === c - 1) return true;
        if (dfs(i, j + 1) || dfs(i + 1, j)) return true;
        path.pop();
        failed[i][j] = true;
        return false;
    };
    return dfs(0, 0) ? path : [];
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(r * c)`，每个格子最多访问一次（记忆化剪枝后）。
- **空间复杂度**：`O(r * c)`，递归栈与 `failed` 数组。

---

### 2.2 方法二：动态规划（自底向上）

**1. 思路**

正向用 DP 判断可达性：`dp[i][j]` 表示能否到达 `(i,j)`，状态转移为「从上方或左方可达且当前格非障碍」。然后从起点沿 `dp` 表贪心回溯：每次优先向右或向下走到一个可达格，直到终点。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> pathWithObstacles(int[][] o) {
        int r = o.length, c = o[0].length;
        boolean[][] dp = new boolean[r][c];
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                if (o[i][j] == 1) continue;
                if (i == 0 && j == 0) dp[i][j] = true;
                else dp[i][j] = (i > 0 && dp[i - 1][j]) || (j > 0 && dp[i][j - 1]);
            }
        }
        List<List<Integer>> path = new ArrayList<>();
        if (!dp[r - 1][c - 1]) return path;
        int i = r - 1, j = c - 1;
        while (i >= 0 && j >= 0) {
            path.add(0, Arrays.asList(i, j));
            if (i > 0 && j > 0) {
                if (dp[i - 1][j]) i--;
                else j--;
            } else if (i > 0) i--;
            else j--;
        }
        return path;
    }
}
```

```python [Python]
class Solution:
    def pathWithObstacles(self, o: List[List[int]]) -> List[List[int]]:
        r, c = len(o), len(o[0])
        dp = [[False] * c for _ in range(r)]
        for i in range(r):
            for j in range(c):
                if o[i][j] == 1:
                    continue
                if i == 0 and j == 0:
                    dp[i][j] = True
                else:
                    dp[i][j] = (i > 0 and dp[i - 1][j]) or (j > 0 and dp[i][j - 1])
        if not dp[r - 1][c - 1]:
            return []
        path = []
        i, j = r - 1, c - 1
        while i >= 0 and j >= 0:
            path.insert(0, [i, j])
            if i > 0 and j > 0:
                if dp[i - 1][j]:
                    i -= 1
                else:
                    j -= 1
            elif i > 0:
                i -= 1
            else:
                j -= 1
        return path
```

```go [Go]
func pathWithObstacles(o [][]int) [][]int {
	r := len(o)
	c := len(o[0])
	dp := make([][]bool, r)
	for i := range dp {
		dp[i] = make([]bool, c)
	}
	for i := 0; i < r; i++ {
		for j := 0; j < c; j++ {
			if o[i][j] == 1 {
				continue
			}
			if i == 0 && j == 0 {
				dp[i][j] = true
			} else {
				dp[i][j] = (i > 0 && dp[i-1][j]) || (j > 0 && dp[i][j-1])
			}
		}
	}
	if !dp[r-1][c-1] {
		return [][]int{}
	}
	path := [][]int{}
	i, j := r-1, c-1
	for i >= 0 && j >= 0 {
		path = append([][]int{{i, j}}, path...)
		if i > 0 && j > 0 {
			if dp[i-1][j] {
				i--
			} else {
				j--
			}
		} else if i > 0 {
			i--
		} else {
			j--
		}
	}
	return path
}
```

```c [C]
int** pathWithObstacles(int** o, int r, int* c, int* returnSize, int** returnColumnSizes) {
    char* dp = (char*)calloc(r * (*c), sizeof(char));
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < *c; j++) {
            if (o[i][j] == 1) continue;
            int cur = i * (*c) + j;
            if (i == 0 && j == 0) dp[cur] = 1;
            else dp[cur] = (i > 0 && dp[(i-1)*(*c)+j]) || (j > 0 && dp[i*(*c)+j-1]);
        }
    }
    int** path = (int**)malloc(r * (*c) * sizeof(int*));
    int* cols = (int*)malloc(r * (*c) * sizeof(int));
    int idx = 0;
    if (dp[r * (*c) - 1]) {
        int i = r - 1, j = *c - 1;
        while (i >= 0 && j >= 0) {
            path[idx] = (int*)malloc(2 * sizeof(int));
            path[idx][0] = i; path[idx][1] = j; cols[idx] = 2; idx++;
            if (i > 0 && j > 0) {
                if (dp[(i-1)*(*c)+j]) i--; else j--;
            } else if (i > 0) i--; else j--;
        }
        // 反转路径
        for (int k = 0; k < idx / 2; k++) {
            int* t = path[k]; path[k] = path[idx-1-k]; path[idx-1-k] = t;
            int tc = cols[k]; cols[k] = cols[idx-1-k]; cols[idx-1-k] = tc;
        }
    }
    free(dp);
    *returnSize = idx; *returnColumnSizes = cols;
    return path;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> pathWithObstacles(vector<vector<int>>& o) {
        int r = o.size(), c = o[0].size();
        vector<vector<bool>> dp(r, vector<bool>(c, false));
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                if (o[i][j] == 1) continue;
                if (i == 0 && j == 0) dp[i][j] = true;
                else dp[i][j] = (i > 0 && dp[i - 1][j]) || (j > 0 && dp[i][j - 1]);
            }
        }
        vector<vector<int>> path;
        if (!dp[r - 1][c - 1]) return path;
        int i = r - 1, j = c - 1;
        while (i >= 0 && j >= 0) {
            path.insert(path.begin(), {i, j});
            if (i > 0 && j > 0) {
                if (dp[i - 1][j]) i--; else j--;
            } else if (i > 0) i--;
            else j--;
        }
        return path;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number[][]} o
 * @return {number[][]}
 */
var pathWithObstacles = function (o) {
    const r = o.length, c = o[0].length;
    const dp = Array.from({ length: r }, () => new Array(c).fill(false));
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            if (o[i][j] === 1) continue;
            if (i === 0 && j === 0) dp[i][j] = true;
            else dp[i][j] = (i > 0 && dp[i - 1][j]) || (j > 0 && dp[i][j - 1]);
        }
    }
    const path = [];
    if (!dp[r - 1][c - 1]) return path;
    let i = r - 1, j = c - 1;
    while (i >= 0 && j >= 0) {
        path.unshift([i, j]);
        if (i > 0 && j > 0) {
            if (dp[i - 1][j]) i--;
            else j--;
        } else if (i > 0) i--;
        else j--;
    }
    return path;
};
```

```typescript [TypeScript]
function pathWithObstacles(o: number[][]): number[][] {
    const r = o.length, c = o[0].length;
    const dp: boolean[][] = Array.from({ length: r }, () => new Array(c).fill(false));
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            if (o[i][j] === 1) continue;
            if (i === 0 && j === 0) dp[i][j] = true;
            else dp[i][j] = (i > 0 && dp[i - 1][j]) || (j > 0 && dp[i][j - 1]);
        }
    }
    const path: number[][] = [];
    if (!dp[r - 1][c - 1]) return path;
    let i = r - 1, j = c - 1;
    while (i >= 0 && j >= 0) {
        path.unshift([i, j]);
        if (i > 0 && j > 0) {
            if (dp[i - 1][j]) i--;
            else j--;
        } else if (i > 0) i--;
        else j--;
    }
    return path;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(r * c)`。
- **空间复杂度**：`O(r * c)`，DP 表开销。

---

## 三、总结

| 方法         | 时间复杂度 | 空间复杂度 | 特点                                   |
| ------------ | ---------- | ---------- | -------------------------------------- |
| 回溯 + 记忆化 | `O(r*c)`   | `O(r*c)`   | 自顶向下，思路直观，推荐               |
| 动态规划     | `O(r*c)`   | `O(r*c)`   | 先判可达再回溯，逻辑更清晰             |

**推荐解法**：两种方法本质等价。回溯 + 记忆化写法更接近「路径搜索」直觉，注意用 `failed` 集合剪枝已确定不可达的格子；若起点或终点本身为障碍，应直接返回空数组。
