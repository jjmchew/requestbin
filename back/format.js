/*
this module serves to take the raw data of a request and format it for adding to databases
*/

function addLeadingZero(num) {
    return num < 10 ? '0' + num : num;
}


const format = {
    date: function() {
        const date = new Date();
        const timeOfDay = this.timeOfD(date);
        const yyyymmdd = this.createYyyyMmDd(date);
        return {time: timeOfDay, date: yyyymmdd}
    },

    createYyyyMmDd: function(date) {
        const year = date.getFullYear().toString();
        const month = addLeadingZero(date.getMonth() + 1);
        const day = addLeadingZero(date.getDate());
        return `${year}-${month}-${day}`
    },

    timeOfD: function(date) {
        const hours = addLeadingZero(date.getHours())
        const minutes = addLeadingZero(date.getMinutes())
        return `${hours}:${minutes}`
    },

}

module.exports = format
