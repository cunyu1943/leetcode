# [406. 根据身高重建队列](https://leetcode.cn/problems/queue-reconstruction-by-height/)

## 一、题目描述

假设打乱（打乱指顺序未知）了一群身高各不相同的人（`people`）的队列。每个人用 `(h, k)` 表示：`h` 是身高，`k` 是排在此人前面且身高 $\ge h$ 的人数。

请你重建并返回该队列。返回的队列应使每个 `(h, k)` 满足其前面身高 $\ge h$ 的人数恰为 `k`。

**示例 1：**

```
输入：people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
输出：[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
```

**示例 2：**

```
输入：people = [[6,0],[5,0],[8,0],[1,0],[6,1],[1,1],[6,2]]
输出：[[5,0],[1,0],[6,0],[1,1],[6,1],[8,0],[6,2]]
```

**提示：**

- `1 <= people.length <= 2000`
- `0 <= h <= 10^6`
- `0 <= k < people.length`
- 题目数据保证队列可被重建

## 二、解答方法

### 2.1 方法一：排序 + 按 k 插入

1. 思路

关键观察：身高高的人不影响身高比他矮的人的 `k` 计数。

- 先按身高 `h` **降序**排序，身高相同则按 `k` **升序**；
- 依次把每个人插入结果列表的第 `k` 个位置（因为已在列表中的人身高都 $\ge$ 当前人，插入第 `k` 位恰好满足前面有 `k` 个更高/相等的人）。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int[][] reconstructQueue(int[][] people) {
        Arrays.sort(people, (a, b) -> a[0] == b[0] ? a[1] - b[1] : b[0] - a[0]);
        List<int[]> res = new ArrayList<>();
        for (int[] p : people) res.add(p[1], p);
        return res.toArray(new int[0][]);
    }
}
```

```python [Python]
class Solution:
    def reconstructQueue(self, people: List[List[int]]) -> List[List[int]]:
        people.sort(key=lambda p: (-p[0], p[1]))
        res = []
        for h, k in people:
            res.insert(k, [h, k])
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> reconstructQueue(vector<vector<int>>& people) {
        sort(people.begin(), people.end(), [](auto& a, auto& b) {
            return a[0] == b[0] ? a[1] < b[1] : a[0] > b[0];
        });
        vector<vector<int>> res;
        for (auto& p : people) res.insert(res.begin() + p[1], p);
        return res;
    }
};
```

```go [Go]
func reconstructQueue(people [][]int) [][]int {
	sort.Slice(people, func(i, j int) bool {
		if people[i][0] == people[j][0] {
			return people[i][1] < people[j][1]
		}
		return people[i][0] > people[j][0]
	})
	res := [][]int{}
	for _, p := range people {
		k := p[1]
		res = append(res, []int{})
		copy(res[k+1:], res[k:])
		res[k] = p
	}
	return res
}
```

```javascript [JavaScript]
var reconstructQueue = function (people) {
    people.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]);
    const res = [];
    for (const p of people) res.splice(p[1], 0, p);
    return res;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n^2)$，排序 $O(n \log n)$，插入 $O(n^2)$。
- 空间复杂度：$O(n)$（忽略返回）。

## 三、总结

「先排高个、再按 k 插空」是经典的贪心构造：让已排好的人不影响后续人的 `k`。相关题目：135 分发糖果、406 本身、排队类贪心。
