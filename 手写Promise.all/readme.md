## 请手写一个 promise.all
这里采用最原始的写法,不借助 async 和 await,只用 `new Promise() => {}`
```js
function promiseAll (parmasArray) {
  return new Promise(function (resolve,reject) {
    if(!Array.isArray(parmasArray)) {
      return reject('please input array parmas!')
    }
  })


}
```