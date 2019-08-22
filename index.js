
const Curry = fn => {
    return function judge(...firstParma) {
        console.log(fn.length);
        if (firstParma.length >= fn.length) {
            return fn(...firstParma);
        } else {
            // 这里的 ...secondParma 函数的第二次或者更多次调用时的参数, ...firstParma 是第一次传入的参数,这里的意思是
            // 当函数只有一个的时候就直接返回一个 rest 参数后的函数
            // 当函数有多个的时候也就是 fn.length > firstParma.length  的时候
            // 这时候就需要把第二个函数的参数和第一个函数参数合起来,然后做递归
            // 这里的 ...secondParma, ...firstParma 两个都可以 rest 的原因是这里他们都已经是值了,不再是参数了
            return (...secondParma) => judge(...secondParma, ...firstParma);
        }
    };
};

const fn = Curry(function(a, b, c) {
    console.log(a, b, c);
});

fn(1)(3)(4);

// 当这里调用的函数是这样的 fn(1)(3)(4) 时候他就可以知道 fn.length === 3 这是为啥????
// 当这里调用的函数是这样的 fn(1,2)(3) 时候他就可以知道 fn.length === 2 这是为啥????

// 这里我们先跳出来,不要被之前的思维给定死了,主要的解决问题的方案是要找到一个可以把全部的参数都迭代进去的


const newCurry = fn => {
    return (...arges) => {
        let arges1 = arges;
        return (arges2) => fn(...arges1, arges2);
    };
};

const add = newCurry((a, b) => a + b);
add(1)(3);


const arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
let newArr = [];
// 需要写一个递归,直到数组中全部的元素都被 rest
const Recursive = (arr) => {
    arr.forEach(item => {
        if (Array.isArray(item) && item.some(ele => Array.isArray(item))) { // 子元素中还有数组,继续递归
            Recursive(item);
        } else if (Array.isArray(item)) { // 子元素中已经没有了数组
            newArr.push(...item);
        } else { // 只有单独的数字
            newArr.push(item);
        }
    });
};
Recursive(arr);
console.log(newArr.sort((a, b) => a - b)); // 升序
console.log([...new Set(newArr.sort((a, b) => a - b))]); // 去重


// 闭包
for (var i = 0; i < 10; i++) {
    (function(i) {
        setTimeout(() => {
            console.log(i);
        }, 1000);
    })(i);
}

// 块作用域
for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000);
}

// timeout 传参
for (var i = 0; i < 10; i++) {
    setTimeout((i) => {
        console.log(i);
    }, 1000, i);
}

let res = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
['A', 'B', 'C', 'D'].forEach(ele => {
    res.findIndex((value, index, arr) => {
        if (`${ele}2` === value) {
            arr.splice(index + 1, 0, ele);
        }
    });
});
console.log(res);

[...['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'], ...['A', 'B', 'C', 'D']].sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))

// 129 输出下面的代码执行的结果

function wait() {
    return new Promise(resolve =>
        setTimeout(resolve, 10 * 1000)
    )
}

async function main() {
    console.time();
    const x = wait();
    const y = wait();
    const z = wait();
    await x;
    await y;
    await z;
    console.timeEnd();
}
main();