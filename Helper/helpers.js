// ----------DEFIND YOUR HELPER FUNCTIONS HERE !!!! ----------
import CryptoES from "crypto-es";
import { auth } from "../firebase";
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

export const EncryptData = (data) => {
    var C = require("crypto-js");
    data.categoryValue = CryptoES.AES.encrypt(JSON.stringify(data.categoryValue), auth.currentUser.uid).toString();
    data.moneyValue = CryptoES.AES.encrypt((data.moneyValue), auth.currentUser.uid).toString();
    data.walletValue = CryptoES.AES.encrypt((data.walletValue), auth.currentUser.uid).toString();
    return data;
}

export const DecryptData = (data) => {
    var C = require("crypto-js");
    data.categoryValue = JSON.parse(CryptoES.AES.decrypt(data.categoryValue, auth.currentUser.uid).toString(C.enc.Utf8));
    data.moneyValue = CryptoES.AES.decrypt(data.moneyValue, auth.currentUser.uid).toString(C.enc.Utf8)
    data.walletValue = CryptoES.AES.decrypt(data.walletValue, auth.currentUser.uid).toString(C.enc.Utf8)
    return data;
}   