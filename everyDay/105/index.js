
const getAllParma = (url) => {
    console.time()
    let res = {};
    url.split('?')[1].split('&').forEach(element => res[element.split('=')[0]] = element.split('=')[1].split(','));
    return res;
}

getAllParma('https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33')['elective']
console.timeEnd()

function getUrlValue(url) {
    console.time()
    if (!url) return;
    let res = url.match(/(?<=elective=)(\d+(,\d+)*)/);
    return res ? res[0].split(',') : [];
}

getUrlValue('https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33')
console.timeEnd()
