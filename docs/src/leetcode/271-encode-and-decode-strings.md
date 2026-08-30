# [271. 字符串的编码与解码](https://leetcode.cn/problems/encode-and-decode-strings/)



## 一、题目描述

请你设计一个算法，可以将一个 **字符串列表** 编码成为一个 **字符串** 。这个编码后的字符串是可以通过网络进行高效传送的，并且可以在接收端被解码回原来的字符串列表。

机器 1（发送方）有下列函数：

```
string encode(vector<string> strs) {
  // ... your code
  return encoded_string;
}
```

机器 2（接收方）有下列函数：

```
vector<string> decode(string s) {
  //... your code
  return strs;
}
```

机器 1 执行：

```
string encoded_string = encode(strs);
```

机器 2 执行：

```
vector<string> strs2 = decode(encoded_string);
```

此时，机器 2 中的 `strs2` 应当和机器 1 中的 `strs` **相同** 。

请你实现 `encode` 和 `decode` 方法。

**注意：**

-   不要使用任何序列化/反序列化库（如 `eval`、`pickle`、`json` 等）；
-   字符串可能包含任意的 **256 个合法 ASCII 字符** ，所以你的算法必须能够处理任意字符（包括分隔符本身）。

**示例 1：**

```
输入：dummy_input = ["Hello","World"]
输出：["Hello","World"]
解释：
机器 1：Codec encoder = new Codec();
       String msg = encoder.encode(strs);
       机器 1 --- msg ---> 机器 2
机器 2：Codec decoder = new Codec();
       String[] strs = decoder.decode(msg);
```

**示例 2：**

```
输入：dummy_input = [""]
输出：[""]
```

**提示：**

-   `1 <= strs.length <= 200`
-   `0 <= strs[i].length <= 200`
-   `strs[i]` 包含任意可能的字符（包括 ASCII 中的不可打印字符）



## 二、解答方法

### 2.1 方法一：长度前缀编码（推荐）

1. **思路**

由于字符串中可能包含 **任意字符**（包括我们想用作分隔符的字符），不能用简单的分隔符方案。

解决方案：**在每个字符串前加上它的长度和一个分隔符**，格式为 `长度#字符串`。

- **编码**：对每个字符串拼接 `len(s) + "#" + s`；
- **解码**：从头部解析出 `#` 前的数字作为长度 `L`，然后截取接下来的 `L` 个字符作为一个字符串，跳到下一个位置继续。

因为长度字段本身是数字，遇到第一个 `#` 即可确定长度，不会与内容混淆。

2. **代码实现**

:::::: code-group

```java [Java]
public class Codec {
    // Encodes a list of strings to a single string.
    public String encode(List<String> strs) {
        StringBuilder sb = new StringBuilder();
        for (String s : strs) {
            sb.append(s.length()).append('#').append(s);
        }
        return sb.toString();
    }

    // Decodes a single string to a list of strings.
    public List<String> decode(String s) {
        List<String> res = new ArrayList<>();
        int i = 0;
        while (i < s.length()) {
            int j = i;
            while (s.charAt(j) != '#') {      // 找到分隔符 '#'
                j++;
            }
            int len = Integer.parseInt(s.substring(i, j));
            res.add(s.substring(j + 1, j + 1 + len));
            i = j + 1 + len;
        }
        return res;
    }
}
```

```python [Python]
class Codec:
    def encode(self, strs: List[str]) -> str:
        """Encodes a list of strings to a single string."""
        return ''.join(f"{len(s)}#{s}" for s in strs)

    def decode(self, s: str) -> List[str]:
        """Decodes a single string to a list of strings."""
        res = []
        i = 0
        while i < len(s):
            j = s.index('#', i)               # 找分隔符
            length = int(s[i:j])
            res.append(s[j + 1: j + 1 + length])
            i = j + 1 + length
        return res
```

```go [Go]
type Codec struct{}

func Constructor() Codec { return Codec{} }

// Encodes a list of strings to a single string.
func (c *Codec) Encode(strs []string) string {
    var sb strings.Builder
    for _, s := range strs {
        sb.WriteString(strconv.Itoa(len(s)))
        sb.WriteByte('#')
        sb.WriteString(s)
    }
    return sb.String()
}

// Decodes a single string to a list of strings.
func (c *Codec) Decode(s string) []string {
    res := []string{}
    i := 0
    for i < len(s) {
        j := i
        for s[j] != '#' {
            j++
        }
        length, _ := strconv.Atoi(s[i:j])
        res = append(res, s[j+1:j+1+length])
        i = j + 1 + length
    }
    return res
}
```

```cpp [C++]
class Codec {
public:
    // Encodes a list of strings to a single string.
    string encode(vector<string>& strs) {
        string encoded;
        for (const string& s : strs) {
            encoded += to_string(s.size()) + "#" + s;
        }
        return encoded;
    }

    // Decodes a single string to a list of strings.
    vector<string> decode(string s) {
        vector<string> res;
        size_t i = 0;
        while (i < s.size()) {
            size_t j = s.find('#', i);
            int len = stoi(s.substr(i, j - i));
            res.push_back(s.substr(j + 1, len));
            i = j + 1 + len;
        }
        return res;
    }
};
```

```js [JavaScript]
/**
 * Encodes a list of strings to a single string.
 * @param {string[]} strs
 * @return {string}
 */
var encode = function (strs) {
    return strs.map(s => `${s.length}#${s}`).join('');
};

/**
 * Decodes a single string to a list of strings.
 * @param {string} s
 * @return {string[]}
 */
var decode = function (s) {
    const res = [];
    let i = 0;
    while (i < s.length) {
        const j = s.indexOf('#', i);
        const len = parseInt(s.substring(i, j), 10);
        res.push(s.substring(j + 1, j + 1 + len));
        i = j + 1 + len;
    }
    return res;
};
```

```ts [TypeScript]
/**
 * Encodes a list of strings to a single string.
 * @param {string[]} strs
 * @return {string}
 */
function encode(strs: string[]): string {
    return strs.map(s => `${s.length}#${s}`).join('');
}

/**
 * Decodes a single string to a list of strings.
 * @param {string} s
 * @return {string[]}
 */
function decode(s: string): string[] {
    const res: string[] = [];
    let i = 0;
    while (i < s.length) {
        const j = s.indexOf('#', i);
        const len = parseInt(s.substring(i, j), 10);
        res.push(s.substring(j + 1, j + 1 + len));
        i = j + 1 + len;
    }
    return res;
}
```

::::::

3. **复杂度分析**

- **编码**：时间 `O(n)`（n 为所有字符串总长度），空间 `O(n)`。
- **解码**：时间 `O(n)`，空间 `O(n)`。

### 2.2 方法二：转义字符编码

1. **思路**

选一个分隔符（如 `#`），并对字符串内容中出现的分隔符做 **转义**（如把 `#` 替换为 `##`）。解码时按分隔符切分，遇到连续两个分隔符则还原为一个。

相比长度前缀法，解码需要逐字符扫描，稍慢但同样可行。

2. **代码实现（Python，示意）**

```python
class Codec:
    def encode(self, strs: List[str]) -> str:
        # 用 '#' 分隔，内容中的 '#' 转义为 '##'
        return '#'.join(s.replace('#', '##') for s in strs)

    def decode(self, s: str) -> List[str]:
        res, cur = [], ''
        i = 0
        while i < len(s):
            if s[i] == '#':
                if i + 1 < len(s) and s[i + 1] == '#':
                    cur += '#'
                    i += 2
                else:
                    res.append(cur)
                    cur = ''
                    i += 1
            else:
                cur += s[i]
                i += 1
        res.append(cur)          # 最后一个
        return res
```

## 三、总结

| 方法 | 编码 | 解码 | 特点 |
| ---- | ---- | ---- | ---- |
| 长度前缀 `len#str` | `O(n)` | `O(n)` | 推荐，解析高效 |
| 转义分隔符 | `O(n)` | `O(n)` | 无需预知长度 |

**核心难点**：字符串可能包含任意字符（包括常规分隔符、控制字符、非 ASCII 字符），因此必须 **自描述** —— 即编码后的数据要能明确指出每个字符串的边界。

长度前缀法的优势：解析时可直接通过长度 **跳到下一个字符串**，无需逐字符扫描内容；且完全不受内容中特殊字符影响。

延伸：这一思想也是网络协议（如 HTTP chunked encoding、protobuf）中「长度前缀分帧」的基础。
