## 第 30 题：请把俩个数组 [A1, A2, B1, B2, C1, C2, D1, D2] 和 [A, B, C, D]，合并为 [A1, A2, A, B1, B2, B, C1, C2, C, D1, D2, D]。
这个问题单纯的解题是很容易的,思路是找到 A2 的 index 再把 A push 进去就好了
```js
let res = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
['A', 'B', 'C', 'D'].forEach(ele => {
    res.findIndex((value, index, arr) => {
        if (`${ele}2` === value) {
            arr.splice(index + 1, 0, ele);
        }
    });
});
console.log(res);
```
在上面的解法中,先是找到了当两个文件都是相同的时候的 index,然后再用这个 index 去添加元素到目标数组中,这样就完成了题目的要求.
但是还有更简单的解法,就是比较的投机一些,使用 **String.charCodeAt()** 这是一个比较少用的方法, **String.charCodeAt()** 返回 0 到 65535 之间的整数,表示给定的字符串的 utf-16 的值是多少,可以通过这个值的大小进行排序,这样的话就更简单了
```js
[...['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'],...['A', 'B', 'C', 'D']].sort((a,b)=>a.charCodeAt(0)-b.charCodeAt(0))
```
