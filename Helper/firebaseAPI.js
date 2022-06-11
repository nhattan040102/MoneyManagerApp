import { db } from '../firebase';
import { doc, getDoc, setDoc, Timestamp, increment } from "firebase/firestore";
import { collection, query, where, onSnapshot, updateDoc } from "firebase/firestore";
import { auth } from '../firebase';
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { createKeyID } from './helpers';



export const autoSignIn = () => {
    signInAnonymously(auth)
        .then(() => {
            console.log("Sign in anonynously");
        })
        .catch((error) => {
            const errorCode = error.code;

            const errorMessage = error.message;
            console.log(errorMessage);
            // ...
        });
}

export const demo = async (doc_id, money) => {
    console.log("gọi hàm");
    const docRef = doc(db, "SavingGoal", doc_id);
    await updateDoc(docRef, {
        currentMoney: increment(parseInt(money)),
    });
    console.log("hàm xong");
}

export const AddTransactionToFirebase = async (input) => {
    const docData = {
        userID: auth.currentUser.uid,
        moneyValue: input.money,
        categoryValue: input.categoryValue,
        walletValue: input.walletValue,
        dateCreated: input.date,
        note: input.note,
    };

    // if the transaction is saving category, then update value in Saving Goal data
    if (docData.categoryValue.id = "s1") {
        var doc_id = null;
        const q = query(collection(db, "SavingGoal"), where("userID", "==", auth.currentUser.uid.toString()), where("status", "==", "current"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.exists) {
                    doc_id = doc.id
                    console.log("2");
                }

                else
                    return null;
            });

        })

        setTimeout(async () => {
            const docRef = doc(db, "SavingGoal", doc_id);
            await updateDoc(docRef, {
                currentMoney: 10,
            })
            console.log("3");
        }, 10);


    }

    await setDoc(doc(db, "transaction", createKeyID(docData.userID, input.date)), docData);
}

export const AddSavingGoalToFirebase = async (input) => {
    console.log("Saving goal");
    const docData = {
        userID: auth.currentUser.uid,
        goalName: input.goalName,
        savingValue: input.savingValue,
        date: input.date,
        minValue: input.minValue,
        status: "current",
        currentMoney: 0,
    };
    await setDoc(doc(db, "SavingGoal", createKeyID(docData.userID, input.date)), docData);
}

export const loadSavingGoalData = (setCurrentGoalInput, setGoalState) => {
    const q = query(collection(db, "SavingGoal"), where("userID", "==", auth.currentUser.uid.toString()), where("status", "==", "current"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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

export const loadDoneSavingGoal = () => {
    var data = [];
    const q = query(collection(db, "SavingGoal"), where("userID", "==", "user_nhattan"), where("status", "==", "done"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            data.push(doc.data());

        });
    });
    return data;

}

export const deleteSavingGoal = async (createdDate) => {
    const docRef = doc(db, "SavingGoal", createKeyID(auth.currentUser.uid, createdDate));

    await updateDoc(docRef, {
        status: "deleted"
    })
}

