import { db } from '../firebase';
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth } from '../firebase';

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
        status: "current",
    };
    await setDoc(doc(db, "SavingGoal", "id1"), docData);
}

export const loadSavingGoalData = (setCurrentGoalInput, setGoalState) => {
    const q = query(collection(db, "SavingGoal"), where("userID", "==", "user_nhattan"), where("status", "==", "current"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        var data = null;
        querySnapshot.forEach((doc) => {
            if (doc.exists) {
                // console.log(doc.data());
                setCurrentGoalInput(doc.data());
                setGoalState(true);
            }

            else
                console.log("null");
        });

    });

}

export const loadDoneSavingGoal = async () => {
    var data = [];
    const q = query(collection(db, "SavingGoal"), where("userID", "==", "user_nhattan"), where("status", "==", "done"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            data.push(doc.data());

        });
    });
    return data;

}

