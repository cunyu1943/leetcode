# [353. 贪吃蛇](https://leetcode.cn/problems/design-snake-game/) [🔒 会员题]

## 一、题目描述

设计贪吃蛇游戏 `SnakeGame(width, height, food)`，实现 `move(direction)`：
- `direction` 为 `'U'/'D'/'L'/'R'`；
- 蛇身按方向前移一格；若吃到 `food` 则长度 +1（不删尾），否则删尾；
- 若撞墙、撞到自己则游戏结束，返回 -1；否则返回当前得分（蛇长 - 1）。

**示例：**
```
width=3,height=2,food=[[1,2],[0,1]]
move(R) → 0（到(0,1) 但 food[1,2]未吃）；move(D)→0；move(R)→1（吃到(1,2)）；...
```

**提示：** `1 <= width, height <= 20`，`food` 长度 ≤ 50，方向调用 ≤ 1000。

## 二、解答方法

### 方法一：队列存蛇身 + 集合判撞

**思路：** 用双端队列 `deque` 存蛇身坐标（队首头、队尾尾）。每次移动：算新头坐标；判墙/自撞（新头在蛇身内且不是当前尾——因为尾会移走，除非吃食物）；吃到食物则食物指针前移、不删尾（长度+1），否则 `pop` 尾；把新头入队。

:::::: code-group

```java [Java]
class SnakeGame {
    private int w, h;
    private Deque<int[]> snake = new LinkedList<>();
    private Set<Integer> body = new HashSet<>();
    private int[][] food; private int fi = 0, score = 0;
    public SnakeGame(int width, int height, int[][] food) {
        w = width; h = height; this.food = food;
        snake.offerFirst(new int[]{0, 0});
        body.add(0);
    }
    private int key(int r, int c) { return r * w + c; }
    public int move(String direction) {
        int[] head = snake.peekFirst();
        int r = head[0], c = head[1];
        if (direction.equals("U")) r--; else if (direction.equals("D")) r++;
        else if (direction.equals("L")) c--; else c++;
        if (r < 0 || r >= h || c < 0 || c >= w) return -1;        // 撞墙
        int nk = key(r, c);
        // 自撞：新头已在蛇身且不是将被移除的尾（未吃到食物时尾会移走）
        int[] tail = snake.peekLast();
        boolean eat = (fi < food.length && r == food[fi][0] && c == food[fi][1]);
        if (!eat) body.remove(key(tail[0], tail[1]));             // 先移走尾再判撞
        if (body.contains(nk)) return -1;                          // 撞自己
        snake.offerFirst(new int[]{r, c}); body.add(nk);
        if (eat) { fi++; score++; } else snake.pollLast();
        return score;
    }
}
```

```python [Python]
class SnakeGame:
    def __init__(self, width: int, height: int, food: List[List[int]]):
        self.w, self.h = width, height
        self.snake = collections.deque([(0,0)])
        self.body = {(0,0)}
        self.food = food; self.fi = 0; self.score = 0
    def move(self, direction: str) -> int:
        r, c = self.snake[0]
        if direction == "U": r -= 1
        elif direction == "D": r += 1
        elif direction == "L": c -= 1
        else: c += 1
        if r < 0 or r >= self.h or c < 0 or c >= self.w: return -1
        eat = self.fi < len(self.food) and (r, c) == tuple(self.food[self.fi])
        tail = self.snake[-1]
        if not eat: self.body.discard(tail); self.snake.pop()
        if (r, c) in self.body: return -1
        self.snake.appendleft((r, c)); self.body.add((r, c))
        if eat: self.fi += 1; self.score += 1
        return self.score
```

```cpp [C++]
class SnakeGame {
    int w,h,fi=0,score=0;
    deque<pair<int,int>> snake;
    unordered_set<int> body;
    vector<vector<int>> food;
    int key(int r,int c){ return r*w+c; }
public:
    SnakeGame(int width,int height,vector<vector<int>>& food): w(width),h(height),food(food){
        snake.push_front({0,0}); body.insert(0);
    }
    int move(string direction){
        auto [r,c]=snake.front();
        if(direction=="U") r--; else if(direction=="D") r++; else if(direction=="L") c--; else c++;
        if(r<0||r>=h||c<0||c>=w) return -1;
        bool eat = fi<food.size() && r==food[fi][0] && c==food[fi][1];
        auto tail=snake.back();
        if(!eat){ body.erase(key(tail.first,tail.second)); snake.pop_back(); }
        int nk=key(r,c);
        if(body.count(nk)) return -1;
        snake.push_front({r,c}); body.insert(nk);
        if(eat){ fi++; score++; }
        return score;
    }
};
```

```go [Go]
type SnakeGame struct {
    w, h, fi, score int
    snake []pair
    body map[int]bool
    food [][]int
}
type pair struct{ r, c int }
func Constructor(width, height int, food [][]int) SnakeGame {
    return SnakeGame{w:width, h:height, food:food, snake:[]pair{{0,0}}, body:map[int]bool{0:true}}
}
func (s *SnakeGame) key(r, c int) int { return r*s.w + c }
func (s *SnakeGame) Move(direction string) int {
    head := s.snake[0]; r, c := head.r, head.c
    switch direction { case "U": r--; case "D": r++; case "L": c--; case "R": c++ }
    if r<0 || r>=s.h || c<0 || c>=s.w { return -1 }
    eat := s.fi < len(s.food) && r==s.food[s.fi][0] && c==s.food[s.fi][1]
    tail := s.snake[len(s.snake)-1]
    if !eat { delete(s.body, s.key(tail.r, tail.c)); s.snake = s.snake[:len(s.snake)-1] }
    nk := s.key(r, c)
    if s.body[nk] { return -1 }
    s.snake = append([]pair{{r,c}}, s.snake...)
    s.body[nk] = true
    if eat { s.fi++; s.score++ }
    return s.score
}
```

```js [JavaScript]
var SnakeGame = function (width, height, food) {
    this.w = width; this.h = height; this.food = food; this.fi = 0; this.score = 0;
    this.snake = [[0,0]]; this.body = new Set([0]);
};
SnakeGame.prototype._key = function (r, c) { return r*this.w + c; };
SnakeGame.prototype.move = function (direction) {
    let [r, c] = this.snake[0];
    if (direction === "U") r--; else if (direction === "D") r++; else if (direction === "L") c--; else c++;
    if (r < 0 || r >= this.h || c < 0 || c >= this.w) return -1;
    const eat = this.fi < this.food.length && r === this.food[this.fi][0] && c === this.food[this.fi][1];
    const tail = this.snake[this.snake.length-1];
    if (!eat) { this.body.delete(this._key(tail[0],tail[1])); this.snake.pop(); }
    const nk = this._key(r, c);
    if (this.body.has(nk)) return -1;
    this.snake.unshift([r, c]); this.body.add(nk);
    if (eat) { this.fi++; this.score++; }
    return this.score;
};
```

::::::

**复杂度：** 每次 `move` `O(1)`（队列 + 哈希），空间 `O(蛇长)`。

## 三、总结

经典设计题：蛇用「队列 + 集合」双结构——队列维护顺序（头进尾出），集合 `O(1)` 判自撞。易错点：判自撞前 **先移走尾**（除非吃到食物），否则尾会被误判为撞。坐标编码 `r*w+c` 省内存。同类设计题：`348 井字棋`、`355 推特`。本题检验「状态建模 + 边界条件」能力。
