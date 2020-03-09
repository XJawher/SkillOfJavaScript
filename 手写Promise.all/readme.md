## 请手写一个 promise.all
先用 await 和 async 写一版
```js
const promiseAll = async(resolveArray) => {
    if(!Array.isArray(resolveArray)) {
        throw('param is not array');
    }
    if(resolveArray.length === 0) {
        return [];
    }
    let [first,...last] = resolveArray;
    // 因为传入的参数都是 promise 的,这里就是把全部的 promise 挨个的 resolve 然后把 resolve 的值集合返回
    return [(await first),(await promiseAll(last))]
}
const p1 = (n) => new Promise((resolve,reject)=> {
    setTimeout(() => {
        resolve(n)
    })
})
const p2 = (n) => new Promise((resolve,reject)=> {
    setTimeout(() => {
        resolve(n)
    },1000)
})
const p3 = (n) => new Promise((resolve,reject)=> {
    setTimeout(() => {
        resolve(n)
    },2000)
})

const results = await promiseAll([p1(1),p2(2),p3(3)])
console.log(results.flat(Infinity))
```

现在不用 await 来写,思路还是一样的,先把待 resolve 的值都给给存起来,通过 promise 进行转换,然后把转换的值都存到数组里,最后再 返回就好了
```js
const promiseAllNoAwait = async(resolveArray) => {
    if(!Array.isArray(resolveArray)) {
        throw('param is not array');
    }
    new Promise((resolve => {

    }))
}

const p1 = (n) => new Promise((resolve,reject)=> {
    setTimeout(() => {
        resolve(n)
    })
})
const p2 = (n) => new Promise((resolve,reject)=> {
    setTimeout(() => {
        resolve(n)
    },1000)
})
const p3 = (n) => new Promise((resolve,reject)=> {
    setTimeout(() => {
        resolve(n)
    },2000)
})
```