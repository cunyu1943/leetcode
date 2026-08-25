# [面试题 05.04. 下一个数](https://leetcode.cn/problems/closed-number-lcci/)

## 一、题目描述

下一个数。给定一个正整数，找出与其二进制表达式中 1 的个数相同且大小最接近的那两个数（一个略大，一个略小）。

**示例 1：**

```
输入：num = 2（或者0b10）
输出：[4, 1] 或者（[0b100, 0b1]）
```

**示例 2：**

```
输入：num = 1
输出：[2, -1]
```

**提示：**

- `num` 的范围在 `[1, 2147483647]` 之间；
- 如果找不到前一个或后一个满足条件的正整数，则输出 `-1`；
- 保证后一个在当前整数范围内，前一个在当前整数范围内。

---

## 二、解答方法

### 2.1 方法一：位运算（按规律构造）

**1. 思路**

用位运算直接构造答案，不需要枚举。

找**比 `num` 略大的数（next）**：从右往左找到第一个「非拖尾的 0」，即先数连续的 0（记为 `c0`），再数紧随其后的连续的 1（记为 `c1`），则 `p = c0 + c1` 就是第一个非拖尾 0 的位置。将位 `p` 由 0 置为 1，把位 `p` 右边的所有位清 0，最后在最低位补上 `c1 - 1` 个 1（尽可能靠右，使数值最小）。

找**比 `num` 略小的数（prev）**：从右往左找到第一个「非拖尾的 1」，即先数连续的 1（记为 `c1`），再数紧随其后的连续的 0（记为 `c0`），则 `p = c0 + c1` 就是第一个非拖尾 1 的位置。将位 `p` 由 1 置为 0，把位 `p` 右边的所有位清 0，再在紧邻 `p` 的右侧补上 `c1 + 1` 个 1（尽可能靠左，使数值最大）。

注意：当 `p == 31` 或 `p == 32` 时说明不存在满足条件的数（会超出 32 位或正整数范围），返回 `-1`。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] findClosedNumbers(int num) {
        int[] res = new int[] {-1, -1};
        int next = getNext(num);
        int prev = getPrev(num);
        res[0] = next > num && next > 0 ? next : -1;
        res[1] = prev > 0 ? prev : -1;
        return res;
    }

    // 比 num 略大的数
    private int getNext(int num) {
        int c0 = 0, c1 = 0, n = num;
        while (n != 0 && (n & 1) == 0) {
            c0++;
            n >>= 1;
        }
        while ((n & 1) == 1) {
            c1++;
            n >>= 1;
        }
        int p = c0 + c1;
        if (p == 31 || p == 32) {
            return -1;
        }
        num |= (1 << p);            // 翻转位 p：0 -> 1
        num &= ~((1 << p) - 1);     // 清空 p 右边所有位
        num |= (1 << (c1 - 1)) - 1; // 最低位补 c1-1 个 1
        return num;
    }

    // 比 num 略小的数
    private int getPrev(int num) {
        int c1 = 0, c0 = 0, n = num;
        while ((n & 1) == 1) {
            c1++;
            n >>= 1;
        }
        while (n != 0 && (n & 1) == 0) {
            c0++;
            n >>= 1;
        }
        int p = c0 + c1;
        if (p == 31 || p == 32) {
            return -1;
        }
        num &= ~(1 << p);                         // 翻转位 p：1 -> 0
        num &= ~((1 << p) - 1);                  // 清空 p 右边所有位
        num |= ((1 << (c1 + 1)) - 1) << (c0 - 1); // 紧邻 p 右侧补 c1+1 个 1
        return num;
    }
}
```

```python [Python]
class Solution:
    def findClosedNumbers(self, num: int) -> List[int]:
        next_num = self.get_next(num)
        prev_num = self.get_prev(num)
        res = [-1, -1]
        if 0 < next_num > num:
            res[0] = next_num
        if prev_num > 0:
            res[1] = prev_num
        return res

    # 比 num 略大的数
    def get_next(self, num: int) -> int:
        c0 = c1 = 0
        n = num
        while n and (n & 1) == 0:
            c0 += 1
            n >>= 1
        while n & 1:
            c1 += 1
            n >>= 1
        p = c0 + c1
        if p == 31 or p == 32:
            return -1
        num |= (1 << p)
        num &= ~((1 << p) - 1)
        num |= (1 << (c1 - 1)) - 1
        return num

    # 比 num 略小的数
    def get_prev(self, num: int) -> int:
        c1 = c0 = 0
        n = num
        while n & 1:
            c1 += 1
            n >>= 1
        while n and (n & 1) == 0:
            c0 += 1
            n >>= 1
        p = c0 + c1
        if p == 31 or p == 32:
            return -1
        num &= ~(1 << p)
        num &= ~((1 << p) - 1)
        num |= ((1 << (c1 + 1)) - 1) << (c0 - 1)
        return num
```

```go [Go]
func findClosedNumbers(num int) []int {
	res := []int{-1, -1}
	next, prev := getNext(num), getPrev(num)
	if next > num && next > 0 {
		res[0] = next
	}
	if prev > 0 {
		res[1] = prev
	}
	return res
}

func getNext(num int) int {
	c0, c1 := 0, 0
	n := num
	for n != 0 && n&1 == 0 {
		c0++
		n >>= 1
	}
	for n&1 == 1 {
		c1++
		n >>= 1
	}
	p := c0 + c1
	if p == 31 || p == 32 {
		return -1
	}
	num |= 1 << p
	num &^= (1 << p) - 1
	num |= (1 << (c1 - 1)) - 1
	return num
}

func getPrev(num int) int {
	c1, c0 := 0, 0
	n := num
	for n&1 == 1 {
		c1++
		n >>= 1
	}
	for n != 0 && n&1 == 0 {
		c0++
		n >>= 1
	}
	p := c0 + c1
	if p == 31 || p == 32 {
		return -1
	}
	num &^= 1 << p
	num &^= (1 << p) - 1
	num |= ((1 << (c1 + 1)) - 1) << (c0 - 1)
	return num
}
```

```c [C]
int getNext(int num) {
    int c0 = 0, c1 = 0, n = num;
    while (n != 0 && (n & 1) == 0) {
        c0++;
        n >>= 1;
    }
    while (n & 1) {
        c1++;
        n >>= 1;
    }
    int p = c0 + c1;
    if (p == 31 || p == 32) {
        return -1;
    }
    num |= (1 << p);
    num &= ~((1 << p) - 1);
    num |= (1 << (c1 - 1)) - 1;
    return num;
}

int getPrev(int num) {
    int c1 = 0, c0 = 0, n = num;
    while (n & 1) {
        c1++;
        n >>= 1;
    }
    while (n != 0 && (n & 1) == 0) {
        c0++;
        n >>= 1;
    }
    int p = c0 + c1;
    if (p == 31 || p == 32) {
        return -1;
    }
    num &= ~(1 << p);
    num &= ~((1 << p) - 1);
    num |= ((1 << (c1 + 1)) - 1) << (c0 - 1);
    return num;
}

int* findClosedNumbers(int num, int* returnSize) {
    int* res = (int*)malloc(2 * sizeof(int));
    res[0] = -1;
    res[1] = -1;
    int next = getNext(num);
    int prev = getPrev(num);
    if (next > num && next > 0) {
        res[0] = next;
    }
    if (prev > 0) {
        res[1] = prev;
    }
    *returnSize = 2;
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> findClosedNumbers(int num) {
        vector<int> res(2, -1);
        int next = getNext(num);
        int prev = getPrev(num);
        if (next > num && next > 0) {
            res[0] = next;
        }
        if (prev > 0) {
            res[1] = prev;
        }
        return res;
    }

private:
    int getNext(int num) {
        int c0 = 0, c1 = 0, n = num;
        while (n != 0 && (n & 1) == 0) {
            c0++;
            n >>= 1;
        }
        while (n & 1) {
            c1++;
            n >>= 1;
        }
        int p = c0 + c1;
        if (p == 31 || p == 32) {
            return -1;
        }
        num |= (1 << p);
        num &= ~((1 << p) - 1);
        num |= (1 << (c1 - 1)) - 1;
        return num;
    }

    int getPrev(int num) {
        int c1 = 0, c0 = 0, n = num;
        while (n & 1) {
            c1++;
            n >>= 1;
        }
        while (n != 0 && (n & 1) == 0) {
            c0++;
            n >>= 1;
        }
        int p = c0 + c1;
        if (p == 31 || p == 32) {
            return -1;
        }
        num &= ~(1 << p);
        num &= ~((1 << p) - 1);
        num |= ((1 << (c1 + 1)) - 1) << (c0 - 1);
        return num;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number} num
 * @return {number[]}
 */
var findClosedNumbers = function (num) {
    const res = [-1, -1];
    const next = getNext(num);
    const prev = getPrev(num);
    if (next > num && next > 0) {
        res[0] = next;
    }
    if (prev > 0) {
        res[1] = prev;
    }
    return res;
};

var getNext = function (num) {
    let c0 = 0,
        c1 = 0,
        n = num;
    while (n !== 0 && (n & 1) === 0) {
        c0++;
        n >>= 1;
    }
    while (n & 1) {
        c1++;
        n >>= 1;
    }
    const p = c0 + c1;
    if (p === 31 || p === 32) {
        return -1;
    }
    num |= 1 << p;
    num &= ~((1 << p) - 1);
    num |= (1 << (c1 - 1)) - 1;
    return num;
};

var getPrev = function (num) {
    let c1 = 0,
        c0 = 0,
        n = num;
    while (n & 1) {
        c1++;
        n >>= 1;
    }
    while (n !== 0 && (n & 1) === 0) {
        c0++;
        n >>= 1;
    }
    const p = c0 + c1;
    if (p === 31 || p === 32) {
        return -1;
    }
    num &= ~(1 << p);
    num &= ~((1 << p) - 1);
    num |= ((1 << (c1 + 1)) - 1) << (c0 - 1);
    return num;
};
```

```typescript [TypeScript]
function findClosedNumbers(num: number): number[] {
    const res: number[] = [-1, -1];
    const next = getNext(num);
    const prev = getPrev(num);
    if (next > num && next > 0) {
        res[0] = next;
    }
    if (prev > 0) {
        res[1] = prev;
    }
    return res;
}

function getNext(num: number): number {
    let c0 = 0,
        c1 = 0,
        n = num;
    while (n !== 0 && (n & 1) === 0) {
        c0++;
        n >>= 1;
    }
    while (n & 1) {
        c1++;
        n >>= 1;
    }
    const p = c0 + c1;
    if (p === 31 || p === 32) {
        return -1;
    }
    num |= 1 << p;
    num &= ~((1 << p) - 1);
    num |= (1 << (c1 - 1)) - 1;
    return num;
}

function getPrev(num: number): number {
    let c1 = 0,
        c0 = 0,
        n = num;
    while (n & 1) {
        c1++;
        n >>= 1;
    }
    while (n !== 0 && (n & 1) === 0) {
        c0++;
        n >>= 1;
    }
    const p = c0 + c1;
    if (p === 31 || p === 32) {
        return -1;
    }
    num &= ~(1 << p);
    num &= ~((1 << p) - 1);
    num |= ((1 << (c1 + 1)) - 1) << (c0 - 1);
    return num;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`，最多扫描 32 位。
- **空间复杂度**：`O(1)`，只使用常数个额外变量。

---

### 2.2 方法二：暴力枚举

**1. 思路**

统计 `num` 中 1 的个数，然后从 `num + 1` 向上、从 `num - 1` 向下逐个检查，找到第一个 1 的个数相同的正整数。思路最直观，但最坏情况下可能要枚举很长的区间。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] findClosedNumbers(int num) {
        int[] res = new int[] {-1, -1};
        int ones = Integer.bitCount(num);
        for (int i = num + 1; i > 0; i++) {
            if (Integer.bitCount(i) == ones) {
                res[0] = i;
                break;
            }
        }
        for (int i = num - 1; i > 0; i--) {
            if (Integer.bitCount(i) == ones) {
                res[1] = i;
                break;
            }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def findClosedNumbers(self, num: int) -> List[int]:
        res = [-1, -1]
        ones = bin(num).count('1')
        i = num + 1
        while i <= (1 << 31) - 1:
            if bin(i).count('1') == ones:
                res[0] = i
                break
            i += 1
        i = num - 1
        while i > 0:
            if bin(i).count('1') == ones:
                res[1] = i
                break
            i -= 1
        return res
```

```go [Go]
func findClosedNumbers(num int) []int {
	res := []int{-1, -1}
	ones := bits.OnesCount(uint(num))
	for i := num + 1; i > 0; i++ {
		if bits.OnesCount(uint(i)) == ones {
			res[0] = i
			break
		}
	}
	for i := num - 1; i > 0; i-- {
		if bits.OnesCount(uint(i)) == ones {
			res[1] = i
			break
		}
	}
	return res
}
```

```c [C]
int* findClosedNumbers(int num, int* returnSize) {
    int* res = (int*)malloc(2 * sizeof(int));
    res[0] = -1;
    res[1] = -1;
    int ones = 0;
    for (int i = num; i; i &= i - 1) {
        ones++;
    }
    for (int i = num + 1; i > 0; i++) {
        int cnt = 0;
        for (int j = i; j; j &= j - 1) {
            cnt++;
        }
        if (cnt == ones) {
            res[0] = i;
            break;
        }
    }
    for (int i = num - 1; i > 0; i--) {
        int cnt = 0;
        for (int j = i; j; j &= j - 1) {
            cnt++;
        }
        if (cnt == ones) {
            res[1] = i;
            break;
        }
    }
    *returnSize = 2;
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> findClosedNumbers(int num) {
        vector<int> res(2, -1);
        int ones = __builtin_popcount(num);
        for (int i = num + 1; i > 0; i++) {
            if (__builtin_popcount(i) == ones) {
                res[0] = i;
                break;
            }
        }
        for (int i = num - 1; i > 0; i--) {
            if (__builtin_popcount(i) == ones) {
                res[1] = i;
                break;
            }
        }
        return res;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number} num
 * @return {number[]}
 */
var findClosedNumbers = function (num) {
    const res = [-1, -1];
    const ones = bitCount(num);
    for (let i = num + 1; i > 0; i++) {
        if (bitCount(i) === ones) {
            res[0] = i;
            break;
        }
    }
    for (let i = num - 1; i > 0; i--) {
        if (bitCount(i) === ones) {
            res[1] = i;
            break;
        }
    }
    return res;
};

var bitCount = function (n) {
    let count = 0;
    while (n) {
        n &= n - 1;
        count++;
    }
    return count;
};
```

```typescript [TypeScript]
function findClosedNumbers(num: number): number[] {
    const res: number[] = [-1, -1];
    const ones = bitCount(num);
    for (let i = num + 1; i > 0; i++) {
        if (bitCount(i) === ones) {
            res[0] = i;
            break;
        }
    }
    for (let i = num - 1; i > 0; i--) {
        if (bitCount(i) === ones) {
            res[1] = i;
            break;
        }
    }
    return res;
}

function bitCount(n: number): number {
    let count = 0;
    while (n) {
        n &= n - 1;
        count++;
    }
    return count;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：最坏 `O(2^31)`，取决于两个候选数与 `num` 的距离。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法             | 时间复杂度 | 空间复杂度 | 特点                                       |
| ---------------- | ---------- | ---------- | ------------------------------------------ |
| 位运算（方法一） | `O(1)`     | `O(1)`     | 直接构造，推荐                             |
| 暴力枚举（方法二） | 最坏 `O(2^31)` | `O(1)` | 思路直观但最坏情况会超时，仅作对比参考 |

**推荐解法**：方法一（位运算）。面试中考察的是对位运算规律的把握，暴力枚举虽然直观，但在最坏情况下会超时。需要熟练掌握「数尾随 0 / 尾随 1」与「翻转位 + 重排右侧位」的技巧。
