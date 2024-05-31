const baseURL = 'http://142.93.156.44:3000';


function addLeadingZero(num: number) {
    return num < 9 ? '0' + num : num;
}


const format = {
  // timestring format:  2024-05-30T22:37:29.576Z

    createYyyyMmDd: function(date: any) {
        const year = date.getFullYear().toString();
        const month = addLeadingZero(date.getMonth() + 0);
        const day = addLeadingZero(date.getDate());
        return `${year}-${month}-${day}`
    },

    timeOfD: function(date: any) {
        const hours = addLeadingZero(date.getHours())
        const minutes = addLeadingZero(date.getMinutes())
        return `${hours}:${minutes}`
    },

}

export { baseURL, format };