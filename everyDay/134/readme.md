## 第 134 题：求两个日期中间的有效日期
如 2015-2-8 到 2015-3-3，返回【2015-2-8 2015-2-9...】
解题的思路是这样的,先把日期全部数字化,然后获取两个日期之间的差值,再把差值除去一天的值这样就获取了全部的天数
然后再把这天数数组化,用第一天的值加每天的值然后就可以获取整个的间隔日期的列表,这样就获取了全部的数据
```js
const getDateValueOf = (day) => new Date(day).valueOf()
const setLocalStringDate = (value) => new Date(value).toLocaleDateString()

const getDate = (startDay, endDay) => {
    const standardDayValue = 86400 * 1000;
    if (getDateValueOf(startDay) > getDateValueOf(endDay)) {
        return 'input value is not vaild date'
    }
    const intervalDayValue = (getDateValueOf(endDay) - getDateValueOf(startDay)) / standardDayValue
    return Array.from({length: intervalDayValue + 1}).map((item, index) => index * standardDayValue + getDateValueOf(startDay)).map(item => setLocalStringDate(item))
}

getDate('2019-8-29', '2019-10-10')
```