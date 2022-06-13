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