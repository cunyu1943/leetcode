# [492. 构造矩形](https://leetcode.cn/problems/construct-the-rectangle/)

## 一、题目描述

作为 Web 开发者，给定一个区域面积 `area`，构造一个矩形 `length × width` 满足：

- `length >= width`；
- `length * width == area`；
- 要求 `length` 与 `width` 的**差值尽可能小**（即最接近正方形）。

返回 `[length, width]`。

**示例 1：**

```
输入：area = 4
输出：[2,2]
```

**示例 2：**

```
输入：area = 37
输出：[37,1]
```

**示例 3：**

```
输入：area = 122122
输出：[427,286]
```

**提示：**

- `1 <= area <= 10^7`

## 二、解答方法

### 2.1 方法一：从 √area 向下找因子

1. 思路

从 `w = √area` 向下枚举宽度 `w`，第一个能整除 `area` 的 `w` 对应的 `[area/w, w]` 即为最接近正方形的解。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int[] constructRectangle(int area) {
        int w = (int) Math.sqrt(area);
        while (area % w != 0) w--;
        return new int[]{area / w, w};
    }
}
```

```python [Python]
class Solution:
    def constructRectangle(self, area: int) -> List[int]:
        import math
        w = int(math.sqrt(area))
        while area % w != 0:
            w -= 1
        return [area // w, w]
```

```cpp [C++]
class Solution {
public:
    vector<int> constructRectangle(int area) {
        int w = sqrt(area);
        while (area % w != 0) w--;
        return {area / w, w};
    }
};
```

```go [Go]
func constructRectangle(area int) []int {
	w := int(math.Sqrt(float64(area)))
	for area%w != 0 {
		w--
	}
	return []int{area / w, w}
}
```

```javascript [JavaScript]
var constructRectangle = function (area) {
    let w = Math.floor(Math.sqrt(area));
    while (area % w !== 0) w--;
    return [area / w, w];
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(\sqrt{area})$。
- 空间复杂度：$O(1)$。

## 三、总结

从平方根向下找因子是「最接近正方形因子对」的标准做法。相关题目：204 计数质数、263 丑数（因子类）。
