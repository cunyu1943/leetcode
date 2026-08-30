# [157. 用 Read4 读取 N 个字符](https://leetcode.cn/problems/read-n-characters-given-read4/) [🔒 会员题]



## 一、题目描述

给你一个文件，并且该文件只能通过给定的 `read4` 方法来读取，请实现一个方法 `read` 来读取 `n` 个字符。注意：`read` 函数可能被多次调用。

`read4` 的定义：`read4` 的参数为一个 `char[]` 缓存 `buf`，其会从文件中读取至多 4 个字符并存入缓存，返回实际读取的字符数。

`read` 的定义：

-   参数 `buf`：目标缓存，读取的字符应被拷贝到这里。
-   参数 `n`：最多读取 `n` 个字符。
-   返回：实际读取的字符数。

**注意：** `read` 函数可能被多次调用，且每次调用相对独立（本题单调用版本；158 题为多次调用需保持状态）。



**示例：**

```
输入： file = "abc"， n = 4
输出： 3
解释： 文件内容 "abc"，读取 4 个字符，实际只能读到 3 个，返回 3。

输入： file = "abcde"， n = 5
输出： 5
解释： 读取 5 个字符，文件有 5 个，返回 5。
```

**提示：**

-   `1 <= file.length <= 500`
-   `1 <= n <= 1000`



## 二、解答方法

### 2.1 方法一：循环调用 read4

1. **思路**

用一个大小 4 的临时缓冲区 `tmp` 反复调用 `read4`，将读到的字符逐个拷贝到 `buf`，直到读够 `n` 个或文件读完（`read4` 返回 0）。

2. **代码实现**

:::::: code-group

```java [Java]
/**
 * The read4 API is defined in the parent class Reader4.
 *     int read4(char[] buf4);
 */
public class Solution extends Reader4 {
    public int read(char[] buf, int n) {
        char[] tmp = new char[4];
        int total = 0;
        while (total < n) {
            int count = read4(tmp);
            if (count == 0) break;
            for (int i = 0; i < count && total < n; i++) {
                buf[total++] = tmp[i];
            }
        }
        return total;
    }
}
```

```python [Python]
"""
The read4 API is already defined for you.

    @param buf4, a list of characters
    @return an integer
    def read4(buf4):
"""
class Solution:
    def read(self, buf, n):
        tmp = ['' ] * 4
        total = 0
        while total < n:
            count = read4(tmp)
            if count == 0:
                break
            for i in range(count):
                if total >= n:
                    break
                buf[total] = tmp[i]
                total += 1
        return total
```

```go [Go]
/**
 * The read4 API is defined in the parent class Reader4.
 *     func read4(buf4 *[4]byte) int
 */
var solution = func(read4 func(*[4]byte) int) func([]byte, int) int {
    return func(buf []byte, n int) int {
        tmp := [4]byte{}
        total := 0
        for total < n {
            count := read4(&tmp)
            if count == 0 {
                break
            }
            for i := 0; i < count && total < n; i++ {
                buf[total] = tmp[i]
                total++
            }
        }
        return total
    }
}
```

```cpp [C++]
/**
 * The read4 API is defined in the parent class Reader4.
 *     int read4(char *buf4);
 */
class Solution {
public:
    int read(char *buf, int n) {
        char tmp[4];
        int total = 0;
        while (total < n) {
            int count = read4(tmp);
            if (count == 0) break;
            for (int i = 0; i < count && total < n; i++) {
                buf[total++] = tmp[i];
            }
        }
        return total;
    }
};
```

```js [JavaScript]
/**
 * @param {function} read4
 * @return {function}
 */
var solution = function (read4) {
    return function (buf, n) {
        const tmp = new Array(4);
        let total = 0;
        while (total < n) {
            const count = read4(tmp);
            if (count === 0) break;
            for (let i = 0; i < count && total < n; i++) {
                buf[total++] = tmp[i];
            }
        }
        return total;
    };
};
```

```ts [TypeScript]
/**
 * @param {function} read4
 * @return {function}
 */
var solution = function (read4: (buf4: string[]) => number) {
    return function (buf: string[], n: number): number {
        const tmp: string[] = new Array(4);
        let total = 0;
        while (total < n) {
            const count = read4(tmp);
            if (count === 0) break;
            for (let i = 0; i < count && total < n; i++) {
                buf[total++] = tmp[i];
            }
        }
        return total;
    };
};
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`（固定 4 字节缓冲区）。

## 三、总结

本题考察「文件流按块读取再拆分」的思想：反复调用 `read4` 填满 `buf` 直到满足 `n` 或文件结束。注意 `read4` 可能一次返回少于 4 个字符（文件末尾）。158 题在多次调用间需保存上次的余量，难度更高。
