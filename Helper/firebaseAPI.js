import { db } from '../firebase';
import { doc, getDoc, setDoc, Timestamp, increment } from "firebase/firestore";
import { collection, query, where, onSnapshot, updateDoc, orderBy } from "firebase/firestore";
import { auth } from '../firebase';
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { createKeyID } from './helpers';



export const autoSignIn = () => {
    signInAnonymously(auth)
        .then(() => {
            // console.log("Sign in anonynously");
        })
        .catch((error) => {
            const errorCode = error.code;

            const errorMessage = error.message;
            console.log(errorMessage);
            // ...
        });
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

                    docData['goalID'] = doc_id;
                    console.log(docData);
                }

                else
                    return null;
            });

        })

        setTimeout(async () => {
            const docRef = doc(db, "SavingGoal", doc_id);
            await updateDoc(docRef, {
                currentMoney: increment(parseInt(docData.moneyValue)),
            })
        }, 1000);


    }
    setTimeout(async () => {
        await setDoc(doc(db, "transaction", createKeyID(docData.userID, input.date)), docData);
    }, 1000)

}

export const AddSavingGoalToFirebase = async (input) => {
    const docData = {
        goalID: createKeyID(auth.currentUser.uid, input.date),
        userID: auth.currentUser.uid,
        goalName: input.goalName,
        savingValue: input.savingValue,
        date: input.date,
        minValue: input.minValue,
        status: "current",
        currentMoney: 0,
    };
    await setDoc(doc(db, "SavingGoal", docData.goalID), docData);
}

export const loadSavingGoalData = (setCurrentGoalInput, setGoalState) => {
    const q = query(collection(db, "SavingGoal"), where("userID", "==", auth.currentUser.uid.toString()), where("status", "==", "current"));
    setCurrentGoalInput(null);
    setGoalState(false);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.exists) {
                setCurrentGoalInput(doc.data());
                setGoalState(true);
            }

            else
                console.log("Can not load data from firebase");
        });

    });

}


export const loadSavingTransaction = (setSavingList, goalID) => {
    var savingList = []
    const q = query(collection(db, "transaction"), where("goalID", "==", goalID));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added")
                savingList.push(change.doc.data());

        });
        setSavingList(savingList);
    });
}

export const loadDoneSavingGoal = (setCompletedGoals) => {
    var completedGoals = []
    const q = query(collection(db, "SavingGoal"), where("userID", "==", auth.currentUser.uid.toString()), where("status", "==", "done"));

    const unsubcribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added")
                completedGoals.push(change.doc.data());

        });
        setCompletedGoals(completedGoals);
    });

    // unsubcribe();


}

export const deleteSavingGoal = async (goalID) => {
    const docRef = doc(db, "SavingGoal", goalID);

    await updateDoc(docRef, {
        status: "deleted"
    })
}

export const updateSavingGoalStatus = async (goalID) => {
    const docRef = doc(db, "SavingGoal", goalID);

    await updateDoc(docRef, {
        status: "done"
    })
}
