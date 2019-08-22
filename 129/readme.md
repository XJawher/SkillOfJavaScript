## 129 请输出以下代码的执行结果
```js
function wait() {
  return new Promise(resolve =>
  	setTimeout(resolve, 3 * 1000)
  )
}

async function main() {
  console.time();
  const x = wait();
  const y = wait();
  const z = wait();
  console.log('end with wait')
  await x;
  console.log('x')
  await y;
  console.log('y')
  await z;
  console.log('z')
  console.timeEnd();
}
main();
```
在这个问题中用之前的时间循环的知识点解释的话就是这样的,三个 **wait()** 函数都是同步的执行的,由于没有 await 因此这三个执行的时候是一样的快的,而后面的 **await** 就是执行三次 **wait()** 以后的结果,所以也是很快的,然后最后就记录时间,打印出时间,这里的时间大概就是 3 秒钟,上下误差不会很大
如果想要出现 9 秒钟的话就需要全部进行 **await wait** 这样才会出现我们需要的 9 秒钟的时间