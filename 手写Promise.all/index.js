async function all(promiseArr) {
    if (!Array.isArray(promiseArr)) {
        throw ('parameter promiseArr must be an array');
    }
    if (promiseArr.length === 0) {
        return [];
    }
    let [first, ...others] = promiseArr;
    return [(await first), ...(await all(others))];
}

let p1 = (n) => new Promise((resolve) => {
    setTimeout(() => resolve(n), 3000);
});

let p2 = (n) => new Promise((resolve) => {
    setTimeout(() => resolve(n), 4000);
});

let p3 = (n) => new Promise((resolve) => {
    setTimeout(() => resolve(n), 1000);
});

(async () => {
    console.time('aa');
    let [a, b, c] = await all([p1(1), p2(2), p3(3)]);
    console.info(a, b, c);
    console.timeEnd('aa');
})();


// 以上类似于，解释了为什么是并行的，已经为什么会等待并行的异步完成才执行最后的同步
async function promiseAll(promises) {
    let a = await promises[0]
    let b = await promises[1]
    let c = await promises[2]
    // ---------- 编译的时候，可以理解为异步、同步代码的分割点
    // 在这有的同步代码相当于放到异步的then中执行的
    return [a, b, c]
}
// 以上需要明白三点：
// 1. 为什么是并行的
// 2. await怎么返回值的
// 3. 为什么会等待异步都完成



// 容易理解点的写法：
async function prmoise_all(promiseArr) {
    let result = [];
    for (let promise of promiseArr) {
        result.push(await promise);
    }
    return result;
};

let p4 = (n) => new Promise((resolve) => {
    setTimeout(() => resolve(n), 3000);
});

let p5 = (n) => new Promise((resolve) => {
    setTimeout(() => resolve(n), 4000);
});

let p6 = (n) => new Promise((resolve) => {
    setTimeout(() => resolve(n), 1000);
});

(async () => {
    console.time('aa');
    let [a, b, c] = await prmoise_all([p4(4), p5(5), p6(6)]);
    console.info(a, b, c);
    console.timeEnd('aa');
})();


// 最原始的写法，不借助async/await
function promiseAll(promiseArr) {
    return new Promise(function(resolve, reject) {
        if (!Array.isArray(promiseArr)) {
            return reject('Parameter promiseArr must be an array');
        }
        let promiseArrLen = promiseArr.length;
        let resolvedCount = 0;
        let resultArr = [];
        for (let i = 0; i < promiseArrLen; i++) {
            // 这里为什么不去判断promiseArr[i]是不是一个真的promise对象，是因为Promise.resolve方法有一个
            // 独特的机制，即如果传入的不是promise对象(未包含一个key为then)，也会返回一个promise对象，但会
            // 立即resolve。
            // 如果我们模拟一个{then: function (){}} thenable 对象传入的话，并且如果我们不改变状态的话，
            // 会一直pending，因为Promise.resolve方法返回的promise会跟随这个thenabled对象，并采用它的最终状态。
            // 所以建议使用
            // {then: function (onFulFilled, onReject){setTimeout(() => onFulFilled(1), 1000)}}，
            // 避免Promise.resolve方法返回的promise一直处于pending中，
            // 如果传入的就是promise对象，会直接将他返回，并等待它的状态改变。
            Promise.resolve(promiseArr[i])
                .then(function(res) {
                    resolvedCount++;
                    resultArr[i] = res;
                    // 当已resolve的计数和promise的个数相等时，说明全部promise都已经resolve了
                    if (resolvedCount === promiseArrLen) {
                        resolve(resultArr);
                    }
                })
                .catch(function(err) {
                    reject(err);
                });
        }
    });
}

let p7 = (n) => new Promise((resolve) => {
    setTimeout(() => resolve(n), 3000);
});

let p8 = (n) => new Promise((resolve) => {
    setTimeout(() => resolve(n), 4000);
});

let p9 = (n) => new Promise((resolve) => {
    setTimeout(() => resolve(n), 1000);
});

let p10 = n => ({then: (onFulFilled) => setTimeout(() => onFulFilled(n), 6000)});

let p11 = n => ({k: n});

let p12 = (n) => Promise.resolve(n);

let p13 = (n) => new Promise(resolve => resolve(n));

// p12 p13结果相同，都是返回一个以传入值为成功状态的promise对象

(async () => {
    console.time('aa');
    let [a, b, c, d, e] = await promiseAll([p7(7), p8(8), p9(9), p10(10), p11(11), p12(12), p13(13)]);
    console.info(a, b, c, d, e);
    console.timeEnd('aa');
})();

// 参考资料： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise