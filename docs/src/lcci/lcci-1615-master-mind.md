# [面试题 16.15. 珠玑妙算](https://leetcode.cn/problems/master-mind-lcci/)

## 一、题目描述

珠玑妙算游戏（Master Mind）的玩法如下：

计算机有 4 个槽，每个槽放一个球，颜色可能是红色（R）、黄色（Y）、绿色（G）或蓝色（B）。例如，计算机可能有 `RGGB` 4 种（槽1为红色，槽2为绿色，槽3为绿色，槽4为蓝色）。

作为玩家，你需要猜出颜色组合。比如，你可能猜 `YRGB`。

当你猜的颜色组合不能完全猜中时，你需要给出 **命中数** 和 **伪命中数**：

- 命中数：位置和颜色都猜中的个数（即 `guess` 和 `solution` 相同位置的字符相同的数量）。
- 伪命中数：颜色猜中但位置错误的个数（即 `guess` 中某个字符在 `solution` 中出现，但位置不对，且尚未被计为命中）。

返回一个数组 `[命中数, 伪命中数]`。

**示例：**

```
输入：solution = "RGBY", guess = "GGRR"
输出：[1,1]
解释：命中：第2个槽（G）匹配；伪命中：guess中的R（第4个）在solution中有R（第1个）但位置不同。
```

**提示：**

- `solution.length == guess.length == 4`
- `solution` 和 `guess` 仅由 `'R'`, `'G'`, `'B'`, `'Y'` 组成

## 二、解答方法

### 2.1 方法一：一次遍历计数

**1. 思路**

1. 先遍历一次，统计命中数（相同位置字符相同），同时统计 `solution` 和 `guess` 中每个字符出现的次数（但排除已命中的位置）。
2. 伪命中数 = 对于每个颜色，`min(solution中该颜色出现次数, guess中该颜色出现次数)` 之和，再减去命中数（或者直接从未命中位置统计）。

更简洁：用两个大小为 4 的数组分别统计 solution 和 guess 中除命中位置外的字符计数，伪命中 = `sum(min(cntS[i], cntG[i]))`。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int[] masterMind(String solution, String guess) {
        int hits = 0;
        int[] cntS = new int[4];
        int[] cntG = new int[4];
        for (int i = 0; i < 4; i++) {
            char s = solution.charAt(i);
            char g = guess.charAt(i);
            if (s == g) {
                hits++;
            } else {
                cntS[map(s)]++;
                cntG[map(g)]++;
            }
        }
        int pseudo = 0;
        for (int i = 0; i < 4; i++) {
            pseudo += Math.min(cntS[i], cntG[i]);
        }
        return new int[]{hits, pseudo};
    }
    private int map(char c) {
        switch (c) {
            case 'R': return 0;
            case 'G': return 1;
            case 'B': return 2;
            case 'Y': return 3;
            default: return -1;
        }
    }
}
```

```python [Python]
class Solution:
    def masterMind(self, solution: str, guess: str) -> List[int]:
        hits = 0
        cnt_s = [0] * 4
        cnt_g = [0] * 4
        color_map = {'R': 0, 'G': 1, 'B': 2, 'Y': 3}
        for i in range(4):
            if solution[i] == guess[i]:
                hits += 1
            else:
                cnt_s[color_map[solution[i]]] += 1
                cnt_g[color_map[guess[i]]] += 1
        pseudo = sum(min(cnt_s[i], cnt_g[i]) for i in range(4))
        return [hits, pseudo]
```

```go [Go]
func masterMind(solution string, guess string) []int {
    hits := 0
    cntS := [4]int{}
    cntG := [4]int{}
    mapChar := func(c byte) int {
        switch c {
        case 'R': return 0
        case 'G': return 1
        case 'B': return 2
        case 'Y': return 3
        default: return -1
        }
    }
    for i := 0; i < 4; i++ {
        if solution[i] == guess[i] {
            hits++
        } else {
            cntS[mapChar(solution[i])]++
            cntG[mapChar(guess[i])]++
        }
    }
    pseudo := 0
    for i := 0; i < 4; i++ {
        if cntS[i] < cntG[i] {
            pseudo += cntS[i]
        } else {
            pseudo += cntG[i]
        }
    }
    return []int{hits, pseudo}
}
```

```c [C]
int* masterMind(char* solution, char* guess, int* returnSize) {
    *returnSize = 2;
    int* res = (int*)malloc(2 * sizeof(int));
    int hits = 0;
    int cntS[4] = {0}, cntG[4] = {0};
    int mapChar(char c) {
        switch (c) {
            case 'R': return 0;
            case 'G': return 1;
            case 'B': return 2;
            case 'Y': return 3;
            default: return -1;
        }
    }
    for (int i = 0; i < 4; i++) {
        if (solution[i] == guess[i]) {
            hits++;
        } else {
            cntS[mapChar(solution[i])]++;
            cntG[mapChar(guess[i])]++;
        }
    }
    int pseudo = 0;
    for (int i = 0; i < 4; i++) {
        pseudo += (cntS[i] < cntG[i] ? cntS[i] : cntG[i]);
    }
    res[0] = hits;
    res[1] = pseudo;
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> masterMind(string solution, string guess) {
        int hits = 0;
        int cntS[4] = {0}, cntG[4] = {0};
        auto mapChar = [](char c) {
            switch (c) {
                case 'R': return 0;
                case 'G': return 1;
                case 'B': return 2;
                case 'Y': return 3;
                default: return -1;
            }
        };
        for (int i = 0; i < 4; i++) {
            if (solution[i] == guess[i]) {
                hits++;
            } else {
                cntS[mapChar(solution[i])]++;
                cntG[mapChar(guess[i])]++;
            }
        }
        int pseudo = 0;
        for (int i = 0; i < 4; i++) {
            pseudo += min(cntS[i], cntG[i]);
        }
        return {hits, pseudo};
    }
};
```

```javascript [JavaScript]
var masterMind = function(solution, guess) {
    let hits = 0;
    const cntS = [0,0,0,0], cntG = [0,0,0,0];
    const mapChar = (c) => {
        switch (c) {
            case 'R': return 0;
            case 'G': return 1;
            case 'B': return 2;
            case 'Y': return 3;
            default: return -1;
        }
    };
    for (let i = 0; i < 4; i++) {
        if (solution[i] === guess[i]) {
            hits++;
        } else {
            cntS[mapChar(solution[i])]++;
            cntG[mapChar(guess[i])]++;
        }
    }
    let pseudo = 0;
    for (let i = 0; i < 4; i++) {
        pseudo += Math.min(cntS[i], cntG[i]);
    }
    return [hits, pseudo];
};
```

```typescript [TypeScript]
function masterMind(solution: string, guess: string): number[] {
    let hits = 0;
    const cntS: number[] = [0,0,0,0];
    const cntG: number[] = [0,0,0,0];
    const mapChar = (c: string): number => {
        switch (c) {
            case 'R': return 0;
            case 'G': return 1;
            case 'B': return 2;
            case 'Y': return 3;
            default: return -1;
        }
    };
    for (let i = 0; i < 4; i++) {
        if (solution[i] === guess[i]) {
            hits++;
        } else {
            cntS[mapChar(solution[i])]++;
            cntG[mapChar(guess[i])]++;
        }
    }
    let pseudo = 0;
    for (let i = 0; i < 4; i++) {
        pseudo += Math.min(cntS[i], cntG[i]);
    }
    return [hits, pseudo];
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`，固定长度 4。
- **空间复杂度**：`O(1)`，使用常数空间。

---

### 2.2 方法二：两次遍历（先统计总频次）

**1. 思路**

先统计所有字符的总出现次数（不排除命中位置），然后计算命中和伪命中。

- 命中数：相同位置相同字符的个数。
- 伪命中数：对于每个颜色，`min(总出现次数_s, 总出现次数_g)` 之和，再减去命中数。

这样需要两次遍历，但思路更直接。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int[] masterMind(String solution, String guess) {
        int[] cntS = new int[4];
        int[] cntG = new int[4];
        int hits = 0;
        for (int i = 0; i < 4; i++) {
            char s = solution.charAt(i);
            char g = guess.charAt(i);
            cntS[map(s)]++;
            cntG[map(g)]++;
            if (s == g) hits++;
        }
        int total = 0;
        for (int i = 0; i < 4; i++) {
            total += Math.min(cntS[i], cntG[i]);
        }
        return new int[]{hits, total - hits};
    }
    private int map(char c) {
        switch (c) {
            case 'R': return 0;
            case 'G': return 1;
            case 'B': return 2;
            case 'Y': return 3;
            default: return -1;
        }
    }
}
```

```python [Python]
class Solution:
    def masterMind(self, solution: str, guess: str) -> List[int]:
        cnt_s = [0] * 4
        cnt_g = [0] * 4
        color_map = {'R': 0, 'G': 1, 'B': 2, 'Y': 3}
        hits = 0
        for i in range(4):
            s, g = solution[i], guess[i]
            cnt_s[color_map[s]] += 1
            cnt_g[color_map[g]] += 1
            if s == g:
                hits += 1
        total = sum(min(cnt_s[i], cnt_g[i]) for i in range(4))
        return [hits, total - hits]
```

```go [Go]
func masterMind(solution string, guess string) []int {
    cntS := [4]int{}
    cntG := [4]int{}
    mapChar := func(c byte) int {
        switch c {
        case 'R': return 0
        case 'G': return 1
        case 'B': return 2
        case 'Y': return 3
        default: return -1
        }
    }
    hits := 0
    for i := 0; i < 4; i++ {
        s, g := solution[i], guess[i]
        cntS[mapChar(s)]++
        cntG[mapChar(g)]++
        if s == g { hits++ }
    }
    total := 0
    for i := 0; i < 4; i++ {
        if cntS[i] < cntG[i] {
            total += cntS[i]
        } else {
            total += cntG[i]
        }
    }
    return []int{hits, total - hits}
}
```

```c [C]
int* masterMind(char* solution, char* guess, int* returnSize) {
    *returnSize = 2;
    int* res = (int*)malloc(2 * sizeof(int));
    int cntS[4] = {0}, cntG[4] = {0};
    int mapChar(char c) {
        switch (c) {
            case 'R': return 0;
            case 'G': return 1;
            case 'B': return 2;
            case 'Y': return 3;
            default: return -1;
        }
    }
    int hits = 0;
    for (int i = 0; i < 4; i++) {
        char s = solution[i], g = guess[i];
        cntS[mapChar(s)]++;
        cntG[mapChar(g)]++;
        if (s == g) hits++;
    }
    int total = 0;
    for (int i = 0; i < 4; i++) {
        total += (cntS[i] < cntG[i] ? cntS[i] : cntG[i]);
    }
    res[0] = hits;
    res[1] = total - hits;
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> masterMind(string solution, string guess) {
        int cntS[4] = {0}, cntG[4] = {0};
        auto mapChar = [](char c) {
            switch (c) {
                case 'R': return 0;
                case 'G': return 1;
                case 'B': return 2;
                case 'Y': return 3;
                default: return -1;
            }
        };
        int hits = 0;
        for (int i = 0; i < 4; i++) {
            char s = solution[i], g = guess[i];
            cntS[mapChar(s)]++;
            cntG[mapChar(g)]++;
            if (s == g) hits++;
        }
        int total = 0;
        for (int i = 0; i < 4; i++) total += min(cntS[i], cntG[i]);
        return {hits, total - hits};
    }
};
```

```javascript [JavaScript]
var masterMind = function(solution, guess) {
    const cntS = [0,0,0,0], cntG = [0,0,0,0];
    const mapChar = (c) => {
        switch (c) {
            case 'R': return 0;
            case 'G': return 1;
            case 'B': return 2;
            case 'Y': return 3;
            default: return -1;
        }
    };
    let hits = 0;
    for (let i = 0; i < 4; i++) {
        const s = solution[i], g = guess[i];
        cntS[mapChar(s)]++;
        cntG[mapChar(g)]++;
        if (s === g) hits++;
    }
    let total = 0;
    for (let i = 0; i < 4; i++) total += Math.min(cntS[i], cntG[i]);
    return [hits, total - hits];
};
```

```typescript [TypeScript]
function masterMind(solution: string, guess: string): number[] {
    const cntS: number[] = [0,0,0,0];
    const cntG: number[] = [0,0,0,0];
    const mapChar = (c: string): number => {
        switch (c) {
            case 'R': return 0;
            case 'G': return 1;
            case 'B': return 2;
            case 'Y': return 3;
            default: return -1;
        }
    };
    let hits = 0;
    for (let i = 0; i < 4; i++) {
        const s = solution[i], g = guess[i];
        cntS[mapChar(s)]++;
        cntG[mapChar(g)]++;
        if (s === g) hits++;
    }
    let total = 0;
    for (let i = 0; i < 4; i++) total += Math.min(cntS[i], cntG[i]);
    return [hits, total - hits];
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法                     | 时间复杂度 | 空间复杂度 | 特点                 |
| ------------------------ | ---------- | ---------- | -------------------- |
| 一次遍历计数（排除命中） | `O(1)`     | `O(1)`     | **推荐**，最简洁高效 |
| 两次遍历（总频次减命中） | `O(1)`     | `O(1)`     | 同样可行，但略繁琐   |

**推荐**：面试中首选 **方法一**，逻辑清晰，避免重复计算。
