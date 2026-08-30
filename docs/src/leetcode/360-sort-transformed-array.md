# [360. 有序转化数组](https://leetcode.cn/problems/sort-transformed-array/) [🔒 会员题]

## 一、题目描述

给定一个 **已按升序排序** 的整数数组 `nums`，以及整数 `a, b, c`。对每个元素应用二次函数 `f(x) = a·x² + b·x + c`，返回变换后数组的 **升序排序** 结果。

**示例：**
```
输入：nums = [-4,-2,2,4], a = 1, b = 3, c = 5
输出：[3,9,15,33]（f(-4)=9, f(-2)=3, f(2)=15, f(4)=33 → 排序得 [3,9,15,33]）
输入：nums = [-4,-2,2,4], a = -1, b = 3, c = 5
输出：[-23,-5,1,7]（抛物线开口向下，两端大中间小）
```

**提示：** `1 <= nums.length <= 200`，`-100 <= nums[i] <= 100`，`-100 <= a,b,c <= 100`。

## 二、解答方法

### 方法一：双指针（利用抛物线性质）

**思路：** `f(x)` 是抛物线：若 `a > 0` 开口向上，最小值在顶点 `x = -b/2a`，两端值大中间小 → 从两端向中间取较大值倒序填；若 `a < 0` 开口向下，最大值在顶点，两端小中间大 → 从两端取较小值正序填；`a == 0` 是直线（单调，直接变换排序或判断 b 正负）。

:::::: code-group

```java [Java]
class Solution {
    public int[] sortTransformedArray(int[] nums, int a, int b, int c) {
        int n = nums.length, res[] = new int[n];
        if (a == 0) {
            for (int i=0;i<n;i++) res[i] = b*nums[i] + c;
            if (b < 0) { int l=0,r=n-1; while(l<r){int t=res[l];res[l]=res[r];res[r]=t;l++;r--;} }
            return res;
        }
        int l=0, r=n-1;
        int i = (a > 0) ? n-1 : 0;          // a>0 从右往左填（大→小），a<0 从左往右填（小→大）
        while (l <= r) {
            int fL = f(nums[l],a,b,c), fR = f(nums[r],a,b,c);
            if (a > 0) {
                if (fL > fR) { res[i--] = fL; l++; } else { res[i--] = fR; r--; }
            } else {
                if (fL < fR) { res[i++] = fL; l++; } else { res[i++] = fR; r++; }
            }
        }
        return res;
    }
    int f(int x, int a, int b, int c) { return a*x*x + b*x + c; }
}
```

```python [Python]
class Solution:
    def sortTransformedArray(self, nums: List[int], a: int, b: int, c: int) -> List[int]:
        f = lambda x: a*x*x + b*x + c
        n = len(nums); res = [0]*n
        if a == 0:
            res = [f(x) for x in nums]
            if b < 0: res.reverse()
            return res
        l, r = 0, n-1
        i = n-1 if a > 0 else 0
        while l <= r:
            fL, fR = f(nums[l]), f(nums[r])
            if a > 0:
                if fL > fR: res[i]=fL; l+=1
                else: res[i]=fR; r-=1
                i -= 1
            else:
                if fL < fR: res[i]=fL; l+=1
                else: res[i]=fR; r-=1
                i += 1
        return res
```

```cpp [C++]
class Solution {
    int f(int x,int a,int b,int c){ return a*x*x+b*x+c; }
public:
    vector<int> sortTransformedArray(vector<int>& nums, int a, int b, int c) {
        int n=nums.size(); vector<int> res(n);
        if(a==0){
            for(int i=0;i<n;i++) res[i]=b*nums[i]+c;
            if(b<0) reverse(res.begin(),res.end());
            return res;
        }
        int l=0,r=n-1,i=(a>0)?n-1:0;
        while(l<=r){
            int fL=f(nums[l],a,b,c), fR=f(nums[r],a,b,c);
            if(a>0){
                if(fL>fR){res[i--]=fL;l++;} else {res[i--]=fR;r--;}
            } else {
                if(fL<fR){res[i++]=fL;l++;} else {res[i++]=fR;r--;}
            }
        }
        return res;
    }
};
```

```go [Go]
func sortTransformedArray(nums []int, a, b, c int) []int {
    f := func(x int) int { return a*x*x + b*x + c }
    n := len(nums); res := make([]int, n)
    if a == 0 {
        for i, x := range nums { res[i] = f(x) }
        if b < 0 { for i, j := 0, n-1; i < j; i, j = i+1, j-1 { res[i], res[j] = res[j], res[i] } }
        return res
    }
    l, r := 0, n-1; i := n-1
    if a < 0 { i = 0 }
    for l <= r {
        fL, fR := f(nums[l]), f(nums[r])
        if a > 0 {
            if fL > fR { res[i] = fL; l++ } else { res[i] = fR; r-- }
            i--
        } else {
            if fL < fR { res[i] = fL; l++ } else { res[i] = fR; r-- }
            i++
        }
    }
    return res
}
```

```js [JavaScript]
var sortTransformedArray = function (nums, a, b, c) {
    const f = x => a*x*x + b*x + c;
    const n = nums.length; const res = new Array(n);
    if (a === 0) {
        for (let i=0;i<n;i++) res[i] = f(nums[i]);
        if (b < 0) res.reverse();
        return res;
    }
    let l=0, r=n-1; let i = a>0 ? n-1 : 0;
    while (l <= r) {
        const fL=f(nums[l]), fR=f(nums[r]);
        if (a > 0) {
            if (fL > fR) { res[i]=fL; l++; } else { res[i]=fR; r--; }
            i--;
        } else {
            if (fL < fR) { res[i]=fL; l++; } else { res[i]=fR; r--; }
            i++;
        }
    }
    return res;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(n)`。

## 三、总结

利用「排序数组 + 抛物线」性质：双指针从两端取极值。开口向上取大值从尾填，开口向下取小值从头填。避免 `O(n log n)` 排序。关键判定 `a>0/a<0/a==0` 三种情况。同类：`977 有序数组的平方`（`a=1,b=0,c=0` 的特例，完全相同双指针技巧）。
