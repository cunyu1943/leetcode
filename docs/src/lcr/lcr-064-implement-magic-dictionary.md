# [LCR 064. 实现一个魔法字典](https://leetcode.cn/problems/US1pGT/)



## 一、题目描述

设计一个使用单词列表进行初始化的数据结构，单词列表中的单词 **互不相同** 。 如果给出一个单词，请判定能否只将这个单词中 **一个** 字母换成另一个字母，使得所形成的新单词存在于你构建的字典中。

实现 `MagicDictionary` 类：

- `MagicDictionary()` 初始化对象
- `void buildDict(String[] dictionary)` 使用字符串数组 `dictionary` 设定该数据结构，`dictionary` 中的字符串互不相同
- `bool search(String searchWord)` 给定一个字符串 `searchWord`，判定能否只将字符串中 **一个** 字母换成另一个字母，使得所形成的新字符串能够与字典中的任一字符串匹配



**示例 1：**

```
输入
["MagicDictionary", "buildDict", "search", "search", "search", "search"]
[[], [["hello", "leetcode"]], ["hello"], ["hhllo"], ["hell"], ["leetcoded"]]
输出
[null, null, false, true, false, false]
```

**提示：**

- `1 <= dictionary.length <= 100`
- `1 <= dictionary[i].length <= 100`
- `dictionary` 中的所有字符串互不相同
- `searchWord` 的长度与 `dictionary[i]` 的长度相等
- `buildDict` 只在 `search` 之前调用一次
- 最多调用 `100` 次 `search`



## 二、解答方法

### 2.1 方法一：按长度分组 + 逐位比较

1. **思路**

- `buildDict`：按单词长度分组存储到哈希表 `map[len] = list`；
- `search(w)`：只查长度相同的分组，对组内每个单词统计与 `w` 的不同字符个数，恰为 1 则返回 `true`。

时间：`search` 为 `O(len × 组大小)`。

2. **代码实现**

::::::: code-group

```java [Java]
class MagicDictionary {
    private Map<Integer, List<String>> map;

    public MagicDictionary() {
        map = new HashMap<>();
    }

    public void buildDict(String[] dictionary) {
        for (String s : dictionary) {
            map.computeIfAbsent(s.length(), k -> new ArrayList<>()).add(s);
        }
    }

    public boolean search(String searchWord) {
        List<String> list = map.getOrDefault(searchWord.length(), Collections.emptyList());
        for (String s : list) {
            int diff = 0;
            for (int i = 0; i < s.length(); i++) {
                if (s.charAt(i) != searchWord.charAt(i) && ++diff > 1) break;
            }
            if (diff == 1) return true;
        }
        return false;
    }
}
```

```python [Python]
class MagicDictionary:
    def __init__(self):
        self.map = {}

    def buildDict(self, dictionary: List[str]) -> None:
        for s in dictionary:
            self.map.setdefault(len(s), []).append(s)

    def search(self, searchWord: str) -> bool:
        for s in self.map.get(len(searchWord), []):
            diff = sum(1 for a, b in zip(s, searchWord) if a != b)
            if diff == 1:
                return True
        return False
```

```cpp [C++]
class MagicDictionary {
    unordered_map<int, vector<string>> map;
public:
    MagicDictionary() {}

    void buildDict(vector<string> dictionary) {
        for (string& s : dictionary) map[s.size()].push_back(s);
    }

    bool search(string searchWord) {
        auto it = map.find(searchWord.size());
        if (it == map.end()) return false;
        for (string& s : it->second) {
            int diff = 0;
            for (int i = 0; i < s.size(); i++) {
                if (s[i] != searchWord[i] && ++diff > 1) break;
            }
            if (diff == 1) return true;
        }
        return false;
    }
};
```

```go [Go]
type MagicDictionary struct {
    groups map[int][]string
}

func Constructor() MagicDictionary {
    return MagicDictionary{groups: map[int][]string{}}
}

func (md *MagicDictionary) BuildDict(dictionary []string) {
    for _, s := range dictionary {
        md.groups[len(s)] = append(md.groups[len(s)], s)
    }
}

func (md *MagicDictionary) Search(searchWord string) bool {
    for _, s := range md.groups[len(searchWord)] {
        diff := 0
        for i := 0; i < len(s); i++ {
            if s[i] != searchWord[i] {
                diff++
                if diff > 1 {
                    break
                }
            }
        }
        if diff == 1 {
            return true
        }
    }
    return false
}
```

```js [JavaScript]
var MagicDictionary = function () {
    this.groups = new Map();
};

/**
 * @param {string[]} dictionary
 * @return {void}
 */
MagicDictionary.prototype.buildDict = function (dictionary) {
    for (const s of dictionary) {
        const len = s.length;
        if (!this.groups.has(len)) this.groups.set(len, []);
        this.groups.get(len).push(s);
    }
};

/**
 * @param {string} searchWord
 * @return {boolean}
 */
MagicDictionary.prototype.search = function (searchWord) {
    const list = this.groups.get(searchWord.length) || [];
    for (const s of list) {
        let diff = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] !== searchWord[i]) {
                diff++;
                if (diff > 1) break;
            }
        }
        if (diff === 1) return true;
    }
    return false;
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

typedef struct {
    char** words;
    int* lens;
    int size;
} MagicDictionary;

MagicDictionary* magicDictionaryCreate() {
    MagicDictionary* obj = (MagicDictionary*)calloc(1, sizeof(MagicDictionary));
    obj->words = (char**)malloc(100 * sizeof(char*));
    obj->lens = (int*)malloc(100 * sizeof(int));
    return obj;
}

void magicDictionaryBuildDict(MagicDictionary* obj, char** dictionary, int dictionarySize) {
    for (int i = 0; i < dictionarySize; i++) {
        obj->words[i] = dictionary[i];
        obj->lens[i] = (int)strlen(dictionary[i]);
    }
    obj->size = dictionarySize;
}

bool magicDictionarySearch(MagicDictionary* obj, char* searchWord) {
    int n = (int)strlen(searchWord);
    for (int i = 0; i < obj->size; i++) {
        if (obj->lens[i] != n) continue;
        int diff = 0;
        for (int j = 0; j < n; j++) {
            if (obj->words[i][j] != searchWord[j]) {
                diff++;
                if (diff > 1) break;
            }
        }
        if (diff == 1) return true;
    }
    return false;
}

void magicDictionaryFree(MagicDictionary* obj) {
    free(obj->words);
    free(obj->lens);
    free(obj);
}
```

```ts [TypeScript]
class MagicDictionary {
    private groups = new Map<number, string[]>();

    buildDict(dictionary: string[]): void {
        for (const s of dictionary) {
            const len = s.length;
            if (!this.groups.has(len)) this.groups.set(len, []);
            this.groups.get(len)!.push(s);
        }
    }

    search(searchWord: string): boolean {
        const list = this.groups.get(searchWord.length) || [];
        for (const s of list) {
            let diff = 0;
            for (let i = 0; i < s.length; i++) {
                if (s[i] !== searchWord[i]) {
                    diff++;
                    if (diff > 1) break;
                }
            }
            if (diff === 1) return true;
        }
        return false;
    }
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`search` 为 `O(n × m)`，`n` 为词长，`m` 为同长度单词数。
- **空间复杂度**：`O(词典总长)`。

## 三、总结

| 方法 | search 复杂度 | 空间 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 长度分组 + 逐位比较 | `O(n·m)` | `O(总长)` | 简单直观，数据量小足够 |

「只差一个字符」的判断就是逐位统计不同字符数。按长度分组缩小比较范围，是本题最直接的优化。

