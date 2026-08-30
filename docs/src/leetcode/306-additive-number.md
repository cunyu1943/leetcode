# [306. 累加数](https://leetcode.cn/problems/additive-number/)

## 一、题目描述

**累加数** 是一个字符串，组成它的数字可以形成累加序列（除前两个数外，每个数都等于前两个数之和），且数字 **不以 0 开头**（除非就是 "0" 本身）。给定字符串 `num`，判断它是否为累加数。

**示例：**
```
输入：num = "112358"   输出：true（1,1,2,3,5,8）
输入：num = "199100199" 输出：true（1,99,100,199）
输入：num = "1023"     输出：false
```

**提示：** `1 <= num.length <= 35`，`num` 仅含数字。进阶：用 `O(1)` 空间（本题 nums[j]-'0' 即可，无大数问题因长度≤35 用字符串加）。

## 二、解答方法

### 方法一：枚举前两数 + 校验

**思路：** 累加序列完全由前两个数决定。枚举第一个数长度 `i`、第二个数长度 `j`（`i+j < n`），从第三个开始按 `s1+s2` 字符串匹配，直到用完整个串。注意前导零处理：`len>1 && s[0]=='0'` 非法。

:::::: code-group

```java [Java]
class Solution {
    public boolean isAdditiveNumber(String num) {
        int n = num.length();
        for (int i = 1; i <= n / 2; i++) {
            for (int j = 1; Math.max(i, j) <= n - i - j; j++) {
                if (i > 1 && num.charAt(0) == '0') break;
                if (j > 1 && num.charAt(i) == '0') continue;
                if (check(num, i, j)) return true;
            }
        }
        return false;
    }
    boolean check(String num, int i, int j) {
        String s1 = num.substring(0, i), s2 = num.substring(i, i + j);
        int p = i + j;
        while (p < num.length()) {
            String s3 = add(s1, s2);
            if (!num.startsWith(s3, p)) return false;
            p += s3.length();
            s1 = s2; s2 = s3;
        }
        return true;
    }
    String add(String a, String b) {
        StringBuilder sb = new StringBuilder();
        int carry = 0, i = a.length()-1, j = b.length()-1;
        while (i>=0 || j>=0 || carry>0) {
            int x = i>=0 ? a.charAt(i--)-'0' : 0;
            int y = j>=0 ? b.charAt(j--)-'0' : 0;
            sb.append((x+y+carry)%10); carry = (x+y+carry)/10;
        }
        return sb.reverse().toString();
    }
}
```

```python [Python]
class Solution:
    def isAdditiveNumber(self, num: str) -> bool:
        n = len(num)
        def add(a, b):
            return str(int(a) + int(b))
        def check(i, j):
            s1, s2 = num[:i], num[i:i+j]
            p = i + j
            while p < n:
                s3 = add(s1, s2)
                if not num.startswith(s3, p): return False
                p += len(s3); s1, s2 = s2, s3
            return True
        for i in range(1, n//2 + 1):
            if i > 1 and num[0] == '0': break
            for j in range(1, max(i, n-i-j) + 1):
                if j > 1 and num[i] == '0': continue
                if check(i, j): return True
        return False
```

```cpp [C++]
class Solution {
    string add(string a, string b){
        string s; int c=0; int i=a.size()-1,j=b.size()-1;
        while(i>=0||j>=0||c){ int x=i>=0?a[i--]-'0':0,y=j>=0?b[j--]-'0':0; s+=(char)((x+y+c)%10+'0'); c=(x+y+c)/10; }
        reverse(s.begin(),s.end()); return s;
    }
    bool check(string& num,int i,int j){
        string s1=num.substr(0,i),s2=num.substr(i,j);
        int p=i+j;
        while(p<num.size()){ string s3=add(s1,s2); if(num.compare(p,s3.size(),s3)) return false; p+=s3.size(); s1=s2; s2=s3; }
        return true;
    }
public:
    bool isAdditiveNumber(string num){
        int n=num.size();
        for(int i=1;i<=n/2;i++){
            if(i>1&&num[0]=='0') break;
            for(int j=1;max(i,j)<=n-i-j;j++){
                if(j>1&&num[i]=='0') continue;
                if(check(num,i,j)) return true;
            }
        }
        return false;
    }
};
```

```go [Go]
func isAdditiveNumber(num string) bool {
    n := len(num)
    add := func(a, b string) string {
        i, j := len(a)-1, len(b)-1; carry := 0; var sb []byte
        for i>=0 || j>=0 || carry>0 {
            x, y := 0, 0
            if i>=0 { x = int(a[i]-'0'); i-- }
            if j>=0 { y = int(b[j]-'0'); j-- }
            s := (x+y+carry)%10; carry = (x+y+carry)/10
            sb = append([]byte{byte(s+'0')}, sb...)
        }
        return string(sb)
    }
    check := func(i, j int) bool {
        s1, s2 := num[:i], num[i:i+j]; p := i+j
        for p < n {
            s3 := add(s1, s2)
            if p+len(s3) > n || num[p:p+len(s3)] != s3 { return false }
            p += len(s3); s1, s2 = s2, s3
        }
        return true
    }
    for i := 1; i <= n/2; i++ {
        if i>1 && num[0]=='0' { break }
        for j := 1; max(i,j) <= n-i-j; j++ {
            if j>1 && num[i]=='0' { continue }
            if check(i, j) { return true }
        }
    }
    return false
}
```

```js [JavaScript]
var isAdditiveNumber = function (num) {
    const n = num.length;
    const add = (a, b) => (BigInt(a) + BigInt(b)).toString();
    const check = (i, j) => {
        let s1 = num.slice(0, i), s2 = num.slice(i, i+j), p = i+j;
        while (p < n) {
            const s3 = add(s1, s2);
            if (num.slice(p, p+s3.length) !== s3) return false;
            p += s3.length; s1 = s2; s2 = s3;
        }
        return true;
    };
    for (let i=1; i<=n/2; i++) {
        if (i>1 && num[0]==='0') break;
        for (let j=1; Math.max(i,j) <= n-i-j; j++) {
            if (j>1 && num[i]==='0') continue;
            if (check(i, j)) return true;
        }
    }
    return false;
};
```

::::::

**复杂度：** 时间枚举 `O(n²)` 前两数，每次校验 `O(n)`，整体 `O(n³)`，空间 `O(n)`。

## 三、总结

关键：枚举前两个数即可确定整条序列，再逐位字符串相加校验。注意前导零：`"0"` 合法但 `"0x"` 不合法。大数用字符串加（JS 用 BigInt 也可，但长度 35 内安全）。是回文/斐波那契串的变体。
