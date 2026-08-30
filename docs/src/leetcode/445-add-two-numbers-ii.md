# [445. 两数相加 II](https://leetcode.cn/problems/add-two-numbers-ii/)

## 一、题目描述

给你两个**非空**链表，表示两个非负整数。数字以**正序**存储（最高位在链表头），每个节点存一位数字。把两数相加，返回和的链表（同样正序）。

**示例 1：**

```
输入：l1 = [7,2,4,3], l2 = [5,6,4]
输出：[7,8,0,7]
解释：7243 + 564 = 7807。
```

**示例 2：**

```
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[8,0,7]
```

**提示：**

- 链表长度 $\le 100$
- `0 <= Node.val <= 9`
- 不存在前导零

## 二、解答方法

### 2.1 方法一：反转链表后相加（或栈）

1. 思路

把两条链表反转成逆序，做「加一」式逐位相加 + 进位，再把结果反转回正序。也可借助栈（不修改原链表）：把两个链表分别压栈，从低位向高位相加，最后反转结果。

2. 代码实现（栈版本，Python）

:::::: code-group

```python [Python]
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        s1, s2 = [], []
        while l1: s1.append(l1.val); l1 = l1.next
        while l2: s2.append(l2.val); l2 = l2.next
        carry = 0
        dummy = ListNode(0)
        while s1 or s2 or carry:
            x = s1.pop() if s1 else 0
            y = s2.pop() if s2 else 0
            s = x + y + carry
            carry = s // 10
            node = ListNode(s % 10)
            node.next = dummy.next
            dummy.next = node
        return dummy.next
```

```java [Java]
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        Deque<Integer> s1 = new ArrayDeque<>(), s2 = new ArrayDeque<>();
        for (; l1 != null; l1 = l1.next) s1.push(l1.val);
        for (; l2 != null; l2 = l2.next) s2.push(l2.val);
        int carry = 0;
        ListNode dummy = new ListNode(0), cur = dummy;
        while (!s1.isEmpty() || !s2.isEmpty() || carry > 0) {
            int x = s1.isEmpty() ? 0 : s1.pop();
            int y = s2.isEmpty() ? 0 : s2.pop();
            int sum = x + y + carry;
            carry = sum / 10;
            ListNode node = new ListNode(sum % 10);
            node.next = dummy.next;
            dummy.next = node;
        }
        return dummy.next;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(\max(m, n))$。
- 空间复杂度：$O(\max(m, n))$，栈或反转辅助。

## 三、总结

正序链表相加，用「栈/反转」对齐低位再相加。相关题目：2 两数相加（逆序）、415 字符串相加、369 给单链表加一。
