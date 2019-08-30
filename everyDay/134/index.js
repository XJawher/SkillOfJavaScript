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