// ----------DEFIND YOUR HELPER FUNCTIONS HERE !!!! ----------

// convert string into money formated string
export const formatMoney = (money) => {
    if (money == undefined)
        return "";
    return money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
}


export const createKeyID = (userID, date) => {
    return userID.toString() + date.getTime();
}