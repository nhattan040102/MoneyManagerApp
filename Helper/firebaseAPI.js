import { db } from '../firebase';
import { doc, setDoc, Timestamp } from "firebase/firestore";

export const AddTransactionToFirebase = async (input) => {
    const docData = {
        userID: "user_nhattan",
        moneyValue: input.money,
        categoryValue: input.categoryValue,
        walletValue: input.walletValue,
        dateCreated: input.date,
        note: input.note,
    };
    await setDoc(doc(db, "transaction", "id2"), docData);
}

export const AddSavingGoalToFirebase = async (input) => {
    console.log("Saving goal");
    const docData = {
        userID: "user_nhattan",
        savingGoal: input.goalName,
        moneyGoal: input.savingValue,
        dateCreated: input.date,
        minValue: input.minValue,
        status: "false",
    };
    await setDoc(doc(db, "SavingGoal", "id1"), docData);
}