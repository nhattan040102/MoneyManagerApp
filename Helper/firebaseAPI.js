import { db } from '../firebase';
import { doc, getDoc, setDoc, Timestamp, increment, deleteDoc, getDocs, } from "firebase/firestore";
import { collection, query, where, onSnapshot, updateDoc, orderBy } from "firebase/firestore";
import { auth } from '../firebase';
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { createKeyID, createKeyFromDate } from './helpers';
import { Alert } from 'react-native'



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
        groupID: createKeyFromDate(input.date),
        status: true,
    };

    var flag = false;

    // if the transaction is saving category, then update value in Saving Goal data
    if (docData.categoryValue.id == "s1") {
        var doc_id = null;
        var currentMoney = 0;
        var goalMoney = 0;
        const q = query(collection(db, "SavingGoal"), where("userID", "==", auth.currentUser.uid.toString()), where("status", "==", "current"));
        // console.log(q.get());
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (querySnapshot.empty)
                flag = true;

            querySnapshot.forEach((doc) => {
                if (doc.exists) {
                    doc_id = doc.id
                    currentMoney = doc.data().currentMoney
                    goalMoney = doc.data().savingValue
                    docData['goalID'] = doc_id;
                }

            });

        })


        setTimeout(async () => {
            if (flag) {
                Alert.alert(
                    "Tin nhắn hệ thống",
                    "Hiện tại bạn chưa có mục tiêu tiết kiệm nào nên không thể thêm giao dịch",
                    [
                        {
                            text: "OK",
                            onPress: () => console.log("OK")
                        },
                    ]
                )
                return;
            }

            if (parseInt(currentMoney) + parseInt(docData.moneyValue) >= parseInt(goalMoney))
                updateSavingGoalStatus(doc_id);
            const docRef = doc(db, "SavingGoal", doc_id);
            await updateDoc(docRef, {
                currentMoney: increment(parseInt(docData.moneyValue)),
            })
        }, 2000);


    }
    setTimeout(async () => {
        if (flag)
            return;
        await setDoc(doc(db, "transaction", createKeyID(docData.userID, input.date)), docData);
    }, 1000)

    return () => unsubscribe();

}

export const deleteTransaction = async (item) => {
    const docRef = doc(db, "transaction", createKeyID(auth.currentUser.uid.toString(), item.dateCreated.toDate()));

    await updateDoc(docRef, {
        status: false,
    })
}

export const undoTransaction = async (item) => {
    const docRef = doc(db, "transaction", createKeyID(auth.currentUser.uid.toString(), item.dateCreated.toDate()));

    await updateDoc(docRef, {
        status: true,
    })
}


export const loadTransaction = async (setTransactionList, setLoading, setValue) => {
    var transactionList = []
    var expenseValue = 0;
    var incomeValue = 0;
    const q = query(collection(db, "transaction"), where("userID", "==", auth.currentUser.uid.toString()), orderBy("groupID", "desc"), orderBy("dateCreated", "desc"));

    const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
        if (querySnapshot.metadata.fromCache) {
            return;
        }
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                if (change.doc.data().categoryValue.type == "-")
                    expenseValue += parseInt(change.doc.data().moneyValue)
                else
                    incomeValue += parseInt(change.doc.data().moneyValue)



                if (transactionList.length == 0 || transactionList.filter(item => item.id == change.doc.data().groupID).length == 0)
                    transactionList.push({ id: change.doc.data().groupID, data: [change.doc.data()] });

                else {
                    transactionList.map((item) => {
                        if (item.id == change.doc.data().groupID)
                            item.data.push(change.doc.data());
                    })

                }
            }
        }
        );


    });
    setTimeout(() => {
        setLoading(true);
        setValue({ expenseValue, incomeValue });
        // console.log(expenseValue);
        setTransactionList(transactionList);
    }, 1000)

}

export const loadDeletedTransaction = async (setTransactionList, setLoading, setValue) => {
    var transactionList = []
    var expenseValue = 0;
    var incomeValue = 0;
    const q = query(collection(db, "transaction"), where("userID", "==", auth.currentUser.uid.toString()), where("status", "==", false), orderBy("groupID", "desc"), orderBy("dateCreated", "desc"));

    const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
        if (querySnapshot.metadata.fromCache) {
            return;
        }
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                if (change.doc.data().categoryValue.type == "-")
                    expenseValue += parseInt(change.doc.data().moneyValue)
                else
                    incomeValue += parseInt(change.doc.data().moneyValue)



                if (transactionList.length == 0 || transactionList.filter(item => item.id == change.doc.data().groupID).length == 0)
                    transactionList.push({ id: change.doc.data().groupID, data: [change.doc.data()] });

                else {
                    transactionList.map((item) => {
                        if (item.id == change.doc.data().groupID)
                            item.data.push(change.doc.data());
                    })

                }
            }
        }
        );


    });
    setTimeout(() => {
        setLoading(true);
        setValue({ expenseValue, incomeValue });
        // console.log(expenseValue);
        setTransactionList(transactionList);
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

export const loadSavingGoalData = (setCurrentGoalInput, setGoalState, setLoading) => {
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
        setLoading(true);
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

    return unsubcribe;


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

export const addExpenseLimitsToFirebase = async (limitValue, category) => {
    const uuid = auth.currentUser.uid + category.id;
    const docData = {
        userID: auth.currentUser.uid,
        limitValue: limitValue,
        categoryId: category.id,
    };

    await setDoc(doc(db, "expense_limits", uuid), docData);
};

export const loadExpenseLimitValueByCategoryId = (category, setLimitValue) => {
    const q = query(
        collection(db, "expense_limits"),
        where("userID", "==", auth.currentUser.uid),
        where("categoryId", "==", category.id)
    );

    setLimitValue(`Nhập giới hạn cho mục ${category.title}`);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.exists() && parseInt(doc.data().limitValue) > 0)
                setLimitValue(doc.data().limitValue);
        });
    });
}

export const loadExpensesByCategoryList = (categoriesData) => {
    const q = query(
        collection(db, "transaction"),
        where("userID", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.exists() && doc.data().status == true) {
                const dateString = doc.data().dateCreated.toString();
                for (let category of categoriesData) {
                    if (
                        doc.data().categoryValue.id == category.id &&
                        category.expenses.filter((e) => e.date === dateString).length == 0
                    ) {
                        const expenseData = {
                            date: dateString,
                            method: doc.data().walletValue,
                            total: parseInt(doc.data().moneyValue),
                            status: doc.data().status,
                        };
                        category.expenses.push(expenseData);
                    }
                }
            }
        });
    });
};


