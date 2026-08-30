# [372. 超级次方](https://leetcode.cn/problems/super-pow/)

## 一、题目描述

给定正整数 `a` 和数组 `b`（表示大整数 `b` 的各位数字），计算 `a^b mod 1337` 的结果（`b` 是一个很大的非负整数，以数组形式给出，如 `b=[1,2,3]` 表示 `123`）。

**示例：**
```
输入：a = 2, b = [1,0]   输出：1024（2^10 mod 1337 = 1024）
输入：a = 2, b = [1,0,0] 输出：344（2^100 mod 1337）
```

**提示：** `1 <= a <= 2³¹-1`，`1 <= b.length <= 2000`，`0 <= b[i] <= 9`，`b` 不含前导零。

## 二、解答方法

### 方法一：快速幂 + 模运算分解

**思路：** 利用性质 `a^(10·x+y) = (a^x)^10 · a^y`，且 `(A·B) mod m = ((A mod m)·(B mod m)) mod m`。从高位到低位逐位处理：`result = (pow_mod(result, 10) * pow_mod(a, digit)) % 1337`。`pow_mod` 用快速幂。最后一步用 `a^b mod 1337`，欧拉定理可加速但非必需。

:::::: code-group

```java [Java]
class Solution {
    final int MOD = 1337;
    public int superPow(int a, int[] b) {
        int res = 1;
        for (int d : b) {
            res = (powMod(res, 10) * powMod(a, d)) % MOD;
        }
        return res;
    }
    int powMod(int x, int n) {
        x %= MOD; int r = 1;
        for (int i = 0; i < n; i++) r = (r * x) % MOD;
        return r;
    }
}
```

```python [Python]
class Solution:
    def superPow(self, a: int, b: List[int]) -> int:
        MOD = 1337
        res = 1
        for d in b:
            res = (pow(res, 10, MOD) * pow(a, d, MOD)) % MOD
        return res
```

```cpp [C++]
class Solution {
    const int MOD = 1337;
    int powMod(int x, int n){
        x %= MOD; int r=1;
        for(int i=0;i<n;i++) r=(r*x)%MOD;
        return r;
    }
public:
    int superPow(int a, vector<int>& b) {
        int res=1;
        for(int d:b) res = (powMod(res,10) * powMod(a,d)) % MOD;
        return res;
    }
};
```

```go [Go]
func superPow(a int, b []int) int {
    const MOD = 1337
    powMod := func(x, n int) int {
        x %= MOD; r := 1
        for i := 0; i < n; i++ { r = (r * x) % MOD }
        return r
    }
    res := 1
    for _, d := range b { res = (powMod(res, 10) * powMod(a, d)) % MOD }
    return res
}
```

```js [JavaScript]
var superPow = function (a, b) {
    const MOD = 1337;
    const powMod = (x, n) => { x %= MOD; let r = 1; for (let i=0;i<n;i++) r = (r*x)%MOD; return r; };
    let res = 1;
    for (const d of b) res = (powMod(res, 10) * powMod(a, d)) % MOD;
    return res;
};
```

::::::

**复杂度：** 时间 `O(len(b) · 10)`（每位最多快速幂 10 次），空间 `O(1)`。

## 三、总结

大数幂取模：逐位递推 `res = pow(res,10)*pow(a,digit)`，每次取模防溢出。关键性质 `a^(10x+y) mod m`。可进一步用费马/欧拉定理（`1337=7×191`，φ=1337×6/7×190/191=1140`，`a^1140≡1 mod 1337` 当 gcd(a,1337)=1）降幂，但逐位已足够。同类：`50 Pow(x,n)`（快速幂）、`69` 之外模幂技巧。
