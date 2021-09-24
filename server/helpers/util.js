
const getDaysBetweenDates = (date1, date2) => {

    const start = Math.floor(new Date(date1).getTime() / (3600 * 24 * 1000));
    const end = Math.floor(new Date(date2).getTime() / (3600 * 24 * 1000));
    const daysDiff = end - start;

    return daysDiff;
}

const addDays = (date, days) => {

    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

module.exports = {
    getDaysBetweenDates,
    addDays
}