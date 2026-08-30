# [401. 二进制手表](https://leetcode.cn/problems/binary-watch/)

## 一、题目描述

二进制手表顶部有 4 个 LED 代表 **小时（0-11）**，底部有 6 个 LED 代表 **分钟（0-59）**。每个 LED 代表一个 0 或 1，最低位在右侧。

给定一个非负整数 `turnedOn`，表示当前亮着的 LED 数量，返回二进制手表能表示的所有可能时间。你可以按任意顺序返回答案。

小时不会以零开头（例如 `"01:00"` 是无效的，应为 `"1:00"`）；分钟必须由两位数组成，不足两位用 `0` 补齐（例如 `"10:2"` 无效，应为 `"10:02"`）。

**示例 1：**

```
输入：turnedOn = 1
输出：["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]
```

**示例 2：**

```
输入：turnedOn = 9
输出：[]
```

**提示：**

- `0 <= turnedOn <= 10`

## 二、解答方法

### 2.1 方法一：枚举所有时刻（位运算）

1. 思路

小时 0~11、分钟 0~59 共 12×60=720 种组合，直接枚举，统计亮灯数（`Integer.bitCount` / `bin(x).count('1')`）是否等于 `turnedOn`。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public List<String> readBinaryWatch(int turnedOn) {
        List<String> res = new ArrayList<>();
        for (int h = 0; h < 12; h++)
            for (int m = 0; m < 60; m++)
                if (Integer.bitCount(h) + Integer.bitCount(m) == turnedOn)
                    res.add(String.format("%d:%02d", h, m));
        return res;
    }
}
```

```python [Python]
class Solution:
    def readBinaryWatch(self, turnedOn: int) -> List[str]:
        return ["%d:%02d" % (h, m) for h in range(12) for m in range(60)
                if bin(h).count('1') + bin(m).count('1') == turnedOn]
```

```cpp [C++]
class Solution {
public:
    vector<string> readBinaryWatch(int turnedOn) {
        vector<string> res;
        for (int h = 0; h < 12; h++)
            for (int m = 0; m < 60; m++)
                if (__builtin_popcount(h) + __builtin_popcount(m) == turnedOn)
                    res.push_back(to_string(h) + ":" + (m < 10 ? "0" : "") + to_string(m));
        return res;
    }
};
```

```go [Go]
func readBinaryWatch(turnedOn int) []string {
	res := []string{}
	for h := 0; h < 12; h++ {
		for m := 0; m < 60; m++ {
			if bits.OnesCount(uint(h))+bits.OnesCount(uint(m)) == turnedOn {
				res = append(res, fmt.Sprintf("%d:%02d", h, m))
			}
		}
	}
	return res
}
```

```javascript [JavaScript]
var readBinaryWatch = function (turnedOn) {
    const res = [];
    for (let h = 0; h < 12; h++)
        for (let m = 0; m < 60; m++)
            if (bitCount(h) + bitCount(m) === turnedOn)
                res.push(`${h}:${String(m).padStart(2, '0')}`);
    return res;
};
const bitCount = (x) => { let c = 0; while (x) { c += x & 1; x >>= 1; } return c; };
```

::::::

3. 复杂度分析

- 时间复杂度：$O(1)$，最多 720 次枚举。
- 空间复杂度：$O(1)$（结果不计入）。

### 2.2 方法二：回溯选灯

1. 思路

从 10 个灯中选 `turnedOn` 个点亮，组合出小时与分钟并校验合法性。适合 `turnedOn` 较小的情况，思路更通用。

2. 代码实现（Python 示例）

:::::: code-group

```python [Python]
class Solution:
    def readBinaryWatch(self, turnedOn: int) -> List[str]:
        res = []
        def backtrack(start, h, m, cnt):
            if cnt == turnedOn:
                if h < 12 and m < 60:
                    res.append(f"{h}:{m:02d}")
                return
            for i in range(start, 10):
                if i < 4:
                    backtrack(i + 1, h | (1 << i), m, cnt + 1)
                else:
                    backtrack(i + 1, h, m | (1 << (i - 4)), cnt + 1)
        backtrack(0, 0, 0, 0)
        return res
```

::::::

3. 复杂度分析

- 时间复杂度：$O(C(10, turnedOn))$。
- 空间复杂度：$O(turnedOn)$，递归栈。

## 三、总结

本题规模极小，枚举法最简洁。回溯选灯法体现了组合枚举思想，相关题目：77 组合、78 子集、320 广义缩写。
