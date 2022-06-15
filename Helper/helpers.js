// ----------DEFIND YOUR HELPER FUNCTIONS HERE !!!! ----------

// convert string into money formated string
export const formatMoney = (money) => {
    if (money == undefined)
        return "";
    return money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}


export const createKeyID = (userID, date) => {
    return userID.toString() + date.getTime();
}

export const createKeyFromDate = (date) => {
    const date1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const date2 = new Date(1, 1, 1);

    return Math.round((date1 - date2) / (1000 * 60 * 60 * 24));
}

export const getDateDifference = (date) => {
    var today = new Date();
    var diff = Math.floor(date.getTime() - today.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    var years = Math.floor(months / 12);

    return [days, months, years];

}