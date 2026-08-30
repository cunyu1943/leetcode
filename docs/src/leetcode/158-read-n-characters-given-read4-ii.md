# [158. 用 Read4 读取 N 个字符 II - 多次调用](https://leetcode.cn/problems/read-n-characters-given-read4-ii-call-multiple-times/) [🔒 会员题]



## 一、题目描述

给你一个文件，并且该文件只能通过给定的 `read4` 方法来读取，请实现一个方法 **多次调用** 的 `read`。`read` 方法可能被调用多次，且每次调用应**从上一次读取结束的位置继续**读取。即需要维护跨调用的内部状态。

`read4` 的定义：`read4` 的参数为一个 `char[]` 缓存 `buf`，其会从文件中读取至多 4 个字符并存入缓存，返回实际读取的字符数。

`read` 的定义：

-   参数 `buf`：目标缓存，读取的字符应被拷贝到这里。
-   参数 `n`：最多读取 `n` 个字符。
-   返回：实际读取的字符数。

**注意：** `read` 函数会被多次调用，每次调用都是独立的文件读取上下文的延续（不能重复读取已读过的字符）。



**示例：**

```
输入： file = "abc"
方法调用： read(buf, 1) -> "a"；read(buf, 2) -> "bc"；read(buf, 1) -> ""
解释： 第一次读 1 个，第二次在上次基础上读剩下 2 个，第三次文件已空返回 0。
```

**提示：**

-   `1 <= file.length <= 500`
-   `1 <= n <= 1000`



## 二、解答方法

### 2.1 方法一：维护内部缓冲区状态

1. **思路**

由于 `read4` 一次至少读 4 个字符，而调用方可能只取其中一部分，需把**上次未用完的余量缓存**在本次调用的成员变量中。每次先消费内部余量，不足再调用 `read4` 补充。

2. **代码实现**

:::::: code-group

```java [Java]
/**
 * The read4 API is defined in the parent class Reader4.
 *     int read4(char[] buf4);
 */
public class Solution extends Reader4 {
    private char[] tmp = new char[4];
    private int tmpSize = 0;   // 内部缓冲区有效字符数
    private int tmpPtr = 0;    // 内部缓冲区读取指针

    public int read(char[] buf, int n) {
        int total = 0;
        // 先消费内部余量
        while (total < n && tmpPtr < tmpSize) {
            buf[total++] = tmp[tmpPtr++];
        }
        // 余量用尽后，循环调用 read4
        while (total < n) {
            tmpSize = read4(tmp);
            tmpPtr = 0;
            if (tmpSize == 0) break; // 文件读完
            while (total < n && tmpPtr < tmpSize) {
                buf[total++] = tmp[tmpPtr++];
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
    def __init__(self):
        self.tmp = [''] * 4
        self.tmp_size = 0
        self.tmp_ptr = 0

    def read(self, buf, n):
        total = 0
        while total < n and self.tmp_ptr < self.tmp_size:
            buf[total] = self.tmp[self.tmp_ptr]
            total += 1
            self.tmp_ptr += 1
        while total < n:
            self.tmp_size = read4(self.tmp)
            self.tmp_ptr = 0
            if self.tmp_size == 0:
                break
            while total < n and self.tmp_ptr < self.tmp_size:
                buf[total] = self.tmp[self.tmp_ptr]
                total += 1
                self.tmp_ptr += 1
        return total
```

```go [Go]
/**
 * The read4 API is defined in the parent class Reader4.
 *     func read4(buf4 *[4]byte) int
 */
type Solution struct {
    tmp     [4]byte
    tmpSize int
    tmpPtr  int
}

func (s *Solution) read(buf []byte, n int) int {
    total := 0
    for total < n && s.tmpPtr < s.tmpSize {
        buf[total] = s.tmp[s.tmpPtr]
        total++
        s.tmpPtr++
    }
    for total < n {
        s.tmpSize = read4(&s.tmp)
        s.tmpPtr = 0
        if s.tmpSize == 0 {
            break
        }
        for total < n && s.tmpPtr < s.tmpSize {
            buf[total] = s.tmp[s.tmpPtr]
            total++
            s.tmpPtr++
        }
    }
    return total
}
```

```cpp [C++]
/**
 * The read4 API is defined in the parent class Reader4.
 *     int read4(char *buf4);
 */
class Solution {
    char tmp[4];
    int tmpSize = 0;
    int tmpPtr = 0;
public:
    int read(char *buf, int n) {
        int total = 0;
        while (total < n && tmpPtr < tmpSize) {
            buf[total++] = tmp[tmpPtr++];
        }
        while (total < n) {
            tmpSize = read4(tmp);
            tmpPtr = 0;
            if (tmpSize == 0) break;
            while (total < n && tmpPtr < tmpSize) {
                buf[total++] = tmp[tmpPtr++];
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
    const tmp = new Array(4);
    let tmpSize = 0;
    let tmpPtr = 0;
    return function (buf, n) {
        let total = 0;
        while (total < n && tmpPtr < tmpSize) {
            buf[total++] = tmp[tmpPtr++];
        }
        while (total < n) {
            tmpSize = read4(tmp);
            tmpPtr = 0;
            if (tmpSize === 0) break;
            while (total < n && tmpPtr < tmpSize) {
                buf[total++] = tmp[tmpPtr++];
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
    const tmp: string[] = new Array(4);
    let tmpSize = 0;
    let tmpPtr = 0;
    return function (buf: string[], n: number): number {
        let total = 0;
        while (total < n && tmpPtr < tmpSize) {
            buf[total++] = tmp[tmpPtr++];
        }
        while (total < n) {
            tmpSize = read4(tmp);
            tmpPtr = 0;
            if (tmpSize === 0) break;
            while (total < n && tmpPtr < tmpSize) {
                buf[total++] = tmp[tmpPtr++];
            }
        }
        return total;
    };
};
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)` 每次调用。
- **空间复杂度**：`O(1)`（仅 4 字节内部缓冲）。

## 三、总结

与 157 题的区别在于**跨调用保存状态**：用实例变量 `tmp` / `tmpPtr` / `tmpSize` 记住上一次 `read4` 读到的余量，避免重复读取。这是多次调用类文件流题目的标准范式。
