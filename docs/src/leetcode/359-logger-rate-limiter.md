# [359. 日志速率限制器](https://leetcode.cn/problems/logger-rate-limiter/) [🔒 会员题]

## 一、题目描述

设计一个日志系统 `Logger`，支持 `shouldPrintMessage(timestamp, message)`：若同一条 `message` 在 **过去 10 秒内** 已打印过（即 `timestamp - 上次打印时间 < 10`），返回 `false`（不打印）；否则返回 `true` 并打印、更新时间。

**示例：**
```
logger.shouldPrintMessage(1,"foo") → true
logger.shouldPrintMessage(2,"foo") → false（距上次 1 秒 < 10）
logger.shouldPrintMessage(11,"foo") → true（距上次 10 秒，允许）
```

**提示：** `0 <= timestamp <= 10⁹`，`0 <= message.length <= 30`，最多 `10⁴` 次调用。

## 二、解答方法

### 方法一：哈希表存上次时间戳

**思路：** 用 `Map<message, lastTimestamp>`。打印时若 `timestamp - last >= 10` 则允许并更新，否则拒绝。可优化：惰性删除过期条目（时间戳 > 当前-10 的才保留），避免内存无限增长。

:::::: code-group

```java [Java]
class Logger {
    private Map<String, Integer> map = new HashMap<>();
    public boolean shouldPrintMessage(int timestamp, String message) {
        Integer last = map.get(message);
        if (last != null && timestamp - last < 10) return false;
        map.put(message, timestamp);
        return true;
    }
}
```

```python [Python]
class Logger:
    def __init__(self):
        self.map = {}
    def shouldPrintMessage(self, timestamp: int, message: str) -> bool:
        if message in self.map and timestamp - self.map[message] < 10: return False
        self.map[message] = timestamp
        return True
```

```cpp [C++]
class Logger {
    unordered_map<string,int> m;
public:
    bool shouldPrintMessage(int timestamp, string message) {
        auto it = m.find(message);
        if (it != m.end() && timestamp - it->second < 10) return false;
        m[message] = timestamp;
        return true;
    }
};
```

```go [Go]
type Logger struct { m map[string]int }
func Constructor() Logger { return Logger{m: map[string]int{}} }
func (l *Logger) ShouldPrintMessage(timestamp int, message string) bool {
    if last, ok := l.m[message]; ok && timestamp-last < 10 { return false }
    l.m[message] = timestamp
    return true
}
```

```js [JavaScript]
var Logger = function () { this.map = {}; };
Logger.prototype.shouldPrintMessage = function (timestamp, message) {
    if (this.map[message] !== undefined && timestamp - this.map[message] < 10) return false;
    this.map[message] = timestamp;
    return true;
};
```

::::::

**复杂度：** 每次 `O(1)`，空间 `O(不同消息数)`。

## 三、总结

限流题基础：用「消息 → 上次时间戳」哈希。判定窗口 `>= 10`（题目定义「过去 10 秒内」即 `< 10` 不允许，`== 10` 允许，注意边界）。优化版可定期清理 `last < current-10` 的消息释放内存（尤其消息海量时）。同类：`362 设计汉堡店`、`346 移动平均`。
