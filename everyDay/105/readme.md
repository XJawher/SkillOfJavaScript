url有三种情况
```
https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33
https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800&local_province_id=33
https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33
```
匹配elective后的数字输出（写出你认为的最优解法）:

```js
const rule = (url) => {
    return url.replace(/https:\/\/www\.xx\.cn\/api\?keyword=&level1=&local_batch_id=&elective=`|'&local_province_id=33'/,'')
}
rule()
```
上面的解法是一个很烂的解法,他只关注写死的这个 **URL** ,现在的新需求是要满足大部分的条件,也就是输入一个 elective 参数,然后获取到这个参数的值,当然最好是把全部的参数都解析了,这样的话是一个更好的方案,看下下面的这个解法
```js
const modal = {
    all: (url) => {
        let res = {};
        url.split('?')[1].split('&').forEach(element => res[element.split('=')[0]] = element.split('=')[1].split(','));
        return res;
    }
}
// https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33
modal.all('https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33')['elective']
```
通过解析URL,获取了全部的参数,需要啥参数就加啥参数的 **key** 这样就获取了题目想要的这个答案了,当写成这样的时候对性能是有一定的影响的,因为先要去开辟一块内存,然后再存储这个值,现在改造一下
```js
const getAllParma = (url) => {
    console.time()
    let res = {};
    url.split('?')[1].split('&').forEach(element => res[element.split('=')[0]] = element.split('=')[1].split(','));
    return res;
}

getAllParma('https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33')['elective']
console.timeEnd()

//  正则匹配的方案,和上面的方案实现的时候时间快一丢丢
function getUrlValue(url) {
    console.time()
    if (!url) return;
    let res = url.match(/(?<=elective=)(\d+(,\d+)*)/);
    return res ? res[0].split(',') : [];
}

getUrlValue('https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33')
console.timeEnd()

```


再有一个解法就是只匹配 **elective** 这个后面的数字,还有数字和','逗号就是下面的解决方案
```js
function getUrlValue(url) {
    if (!url) return;
    let res = url.match(/(?<=elective=)(\d+(,\d+)*)/);
    return res ? res[0].split(',') : [];
}

getUrlValue('https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33')
```