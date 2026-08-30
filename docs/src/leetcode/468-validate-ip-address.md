# [468. 验证 IP 地址](https://leetcode.cn/problems/validate-ip-address/)

## 一、题目描述

给定一个字符串 `queryIP`，判断它是 **IPv4** 地址、`IPv6` 地址还是**二者都不是**（`"Neither"`）。

- IPv4：4 段，每段 0~255 十进制，无前导零（"01" 不合法），用点分隔；
- IPv6：8 段，每段 1~4 位十六进制（大小写均可），用冒号分隔，允许前导零。

返回 `"IPv4"`、`"IPv6"` 或 `"Neither"`。

**示例 1：**

```
输入：queryIP = "172.16.254.1"
输出："IPv4"
```

**示例 2：**

```
输入：queryIP = "2001:0db8:85a3:0:0:8A2E:0370:7334"
输出："IPv6"
```

**提示：**

- `queryIP` 仅含英文字母、数字、`.` 和 `:`。

## 二、解答方法

### 2.1 方法一：分情况校验

1. 思路

根据分隔符判断可能类型：含 `.` 尝试 IPv4，含 `:` 尝试 IPv6。IPv4 按 `.` 分 4 段，校验每段；IPv6 按 `:` 分 8 段，校验每段十六进制。

2. 代码实现（Python 示例）

:::::: code-group

```python [Python]
class Solution:
    def validIPAddress(self, queryIP: str) -> str:
        def is_ipv4(s):
            parts = s.split('.')
            if len(parts) != 4:
                return False
            for p in parts:
                if not p or not p.isdigit() or (len(p) > 1 and p[0] == '0') or int(p) > 255:
                    return False
            return True
        def is_ipv6(s):
            parts = s.split(':')
            if len(parts) != 8:
                return False
            for p in parts:
                if not p or len(p) > 4:
                    return False
                for ch in p:
                    if ch not in '0123456789abcdefABCDEF':
                        return False
            return True
        if '.' in queryIP and is_ipv4(queryIP):
            return "IPv4"
        if ':' in queryIP and is_ipv6(queryIP):
            return "IPv6"
        return "Neither"
```

```java [Java]
class Solution {
    public String validIPAddress(String ip) {
        if (ip.indexOf('.') >= 0) return isIPv4(ip) ? "IPv4" : "Neither";
        if (ip.indexOf(':') >= 0) return isIPv6(ip) ? "IPv6" : "Neither";
        return "Neither";
    }
    boolean isIPv4(String ip) {
        String[] parts = ip.split("\\.", -1);
        if (parts.length != 4) return false;
        for (String p : parts) {
            if (p.isEmpty() || !p.chars().allMatch(Character::isDigit) || (p.length() > 1 && p.charAt(0) == '0') || Integer.parseInt(p) > 255) return false;
        }
        return true;
    }
    boolean isIPv6(String ip) {
        String[] parts = ip.split(":", -1);
        if (parts.length != 8) return false;
        for (String p : parts) {
            if (p.isEmpty() || p.length() > 4) return false;
            for (char c : p.toCharArray()) if (!Character.isDigit(c) && !"abcdefABCDEF".contains(c + "")) return false;
        }
        return true;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(|s|)$。
- 空间复杂度：$O(1)$。

## 三、总结

字符串分段校验，注意 `split` 限空段（`-1` 保留末尾空串，避免 "1.2.3." 误判）。相关题目：93 复原 IP 地址、408 有效单词缩写。
