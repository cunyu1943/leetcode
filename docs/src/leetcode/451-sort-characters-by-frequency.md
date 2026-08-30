# [451. 根据字符出现频率排序](https://leetcode.cn/problems/sort-characters-by-frequency/)

## 一、题目描述

给定一个字符串 `s`，根据字符出现的**频率**从高到低排序，返回重排后的字符串。

**示例 1：**

```
输入：s = "tree"
输出："eert"（或 "eetr"）
```

**示例 2：**

```
输入：s = "cccaaa"
输出："cccaaa"（或 "aaaccc"）
```

**提示：**

- `1 <= s.length <= 5 * 10^5`
- `s` 由大小写英文字母和数字组成

## 二、解答方法

### 2.1 方法一：计数 + 排序

1. 思路

统计字符频率，按频率降序排序，再按频次拼接字符。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public String frequencySort(String s) {
        int[] cnt = new int[128];
        for (char c : s.toCharArray()) cnt[c]++;
        Character[] cs = new Character[128];
        for (int i = 0; i < 128; i++) cs[i] = (char) i;
        Arrays.sort(cs, (a, b) -> cnt[b] - cnt[a]);
        StringBuilder sb = new StringBuilder();
        for (char c : cs) for (int k = 0; k < cnt[c]; k++) sb.append(c);
        return sb.toString();
    }
}
```

```python [Python]
class Solution:
    def frequencySort(self, s: str) -> str:
        from collections import Counter
        return "".join(c * n for c, n in Counter(s).most_common())
```

```cpp [C++]
class Solution {
public:
    string frequencySort(string s) {
        int cnt[128] = {0};
        for (char c : s) cnt[c]++;
        vector<pair<int, char>> v;
        for (int i = 0; i < 128; i++) if (cnt[i]) v.push_back({cnt[i], i});
        sort(v.begin(), v.end(), greater<>());
        string res;
        for (auto& [n, c] : v) res += string(n, c);
        return res;
    }
};
```

```go [Go]
func frequencySort(s string) string {
	cnt := [128]int{}
	for _, c := range s {
		cnt[c]++
	}
	type pair struct{ c byte; n int }
	v := []pair{}
	for i := 0; i < 128; i++ {
		if cnt[i] > 0 {
			v = append(v, pair{byte(i), cnt[i]})
		}
	}
	sort.Slice(v, func(i, j int) bool { return v[i].n > v[j].n })
	res := []byte{}
	for _, p := range v {
		for k := 0; k < p.n; k++ {
			res = append(res, p.c)
		}
	}
	return string(res)
}
```

```javascript [JavaScript]
var frequencySort = function (s) {
    const cnt = {};
    for (const c of s) cnt[c] = (cnt[c] || 0) + 1;
    return s.split('').sort((a, b) => cnt[b] - cnt[a]).join('');
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n \log k)$（k 为不同字符数，最多 128）。
- 空间复杂度：$O(n)$。

### 2.2 方法二：桶排序（频率至多 n）

思路：按频率分桶，从高频桶向低频桶拼接，避免比较排序。

## 三、总结

频率排序是计数 + 排序/桶的经典应用。相关题目：347 前 K 个高频元素、692 前 K 个高频单词、621 任务调度器。
