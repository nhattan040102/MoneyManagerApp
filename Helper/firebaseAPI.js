import { db } from '../firebase';
import { doc, getDoc, setDoc, Timestamp, increment, deleteDoc, getDocs, } from "firebase/firestore";
import { collection, query, where, onSnapshot, updateDoc, orderBy } from "firebase/firestore";
import { auth } from '../firebase';
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { createKeyID, createKeyFromDate, DecryptData, EncryptData } from './helpers';
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
    if (docData.categoryValue.id.slice(0, 1) == "s") {
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

            if (parseInt(currentMoney) + parseInt(input.money) >= parseInt(goalMoney))
                updateSavingGoalStatus(doc_id);
            const docRef = doc(db, "SavingGoal", doc_id);
            await updateDoc(docRef, {
                currentMoney: increment(parseInt(input.money)),

            })
        }, 2000);


    }
    setTimeout(async () => {
        if (flag)
            return;
        await setDoc(doc(db, "transaction", createKeyID(docData.userID, input.date)), EncryptData(docData));
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
    var cash = 0;
    var debit_card = 0;
    const q = query(collection(db, "transaction"), where("userID", "==", auth.currentUser.uid.toString()), where("status", "==", true), orderBy("groupID", "desc"), orderBy("dateCreated", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            const decrypted_data = DecryptData(change.doc.data())
            if (change.type === "added") {
                if (decrypted_data.categoryValue.type == "-")
                    expenseValue += parseInt(decrypted_data.moneyValue)
                else
                    incomeValue += parseInt(decrypted_data.moneyValue)

                if (decrypted_data.walletValue == "Tiền mặt")
                    cash += decrypted_data.categoryValue.type == "-" ? - parseInt(decrypted_data.moneyValue) : parseInt(decrypted_data.moneyValue);
                else
                    debit_card += decrypted_data.categoryValue.type == "-" ? -parseInt(decrypted_data.moneyValue) : parseInt(decrypted_data.moneyValue);

                if (transactionList.length == 0 || transactionList.filter(item => item.id == decrypted_data.groupID).length == 0)
                    transactionList.push({ id: decrypted_data.groupID, data: [decrypted_data] });

                else {
                    transactionList.map((item) => {
                        if (item.id == decrypted_data.groupID)
                            item.data.push(decrypted_data);
                    })

                }
            }
        }
        );


    });

    setTimeout(() => {
        setLoading(true);
        setValue({ expenseValue, incomeValue, cash, debit_card });
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
            const decrypted_data = DecryptData(change.doc.data())
            if (change.type === "added") {
                if (decrypted_data.categoryValue.type == "-")
                    expenseValue += parseInt(decrypted_data.moneyValue)
                else
                    incomeValue += parseInt(decrypted_data.moneyValue)



                if (transactionList.length == 0 || transactionList.filter(item => item.id == decrypted_data.groupID).length == 0)
                    transactionList.push({ id: decrypted_data.groupID, data: [decrypted_data] });

                else {
                    transactionList.map((item) => {
                        if (item.id == decrypted_data.groupID)
                            item.data.push(decrypted_data);
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
    const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
        if (querySnapshot.metadata.fromCache) {
            return;
        }
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

    const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
        if (querySnapshot.metadata.fromCache) {
            return;
        }
        querySnapshot.docChanges().forEach((change) => {
            const decrypted_data = DecryptData(change.doc.data())
            if (change.type === "added")
                savingList.push(decrypted_data);

        });
        setSavingList(savingList);
    });
}

export const loadDoneSavingGoal = (setCompletedGoals) => {
    var completedGoals = []
    const q = query(collection(db, "SavingGoal"), where("userID", "==", auth.currentUser.uid.toString()), where("status", "==", "done"));

    const unsubcribe = onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
        if (querySnapshot.metadata.fromCache) {
            return;
        }
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
};

export const loadExpensesByCategoryList = (categoriesData) => {
    const q = query(
        collection(db, "transaction"),
        where("userID", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const decrypted = DecryptData(doc.data())
            if (doc.exists() && decrypted.status == true) {
                const dateString = decrypted.dateCreated.toString();
                for (let category of categoriesData) {
                    if (
                        decrypted.categoryValue.id == category.id &&
                        category.expenses.filter((e) => e.date === dateString).length == 0
                    ) {
                        const expenseData = {
                            date: dateString,
                            method: decrypted.walletValue,
                            total: parseInt(decrypted.moneyValue),
                            status: decrypted.status,
                        };
                        category.expenses.push(expenseData);
                    }
                }
            }
        });
    });
};
//
export const checkExpenseLimitForCategory = (
    categoryData,
    categoryLimit,
    transValue,
    setLimitCheck
) => {
    var totalValue = parseInt(transValue);
    const q = query(
        collection(db, "transaction"),
        where("userID", "==", auth.currentUser.uid.toString()),
        where("status", "==", true)
    );

    const unsubscribe = onSnapshot(
        q,
        { includeMetadataChanges: true },
        (querySnapshot) => {
            if (querySnapshot.metadata.fromCache) {
                return;
            }
            querySnapshot.forEach((doc) => {
                const decrypted = DecryptData(doc.data())
                if (doc.exists() && decrypted.categoryValue.id == categoryData.id) {
                    totalValue += parseInt(decrypted.moneyValue);
                }
            });
            if (categoryLimit != null && totalValue > categoryLimit) {
                setLimitCheck(false);
            } else {
                setLimitCheck(true);
            }
        }
    );
};



export const getTransactionByType = (getDataByType) => {
    var transactionData = [
        {
            name: "Chi tiêu",
            value: 0,
            color: "#e3342f",
            legendFontColor: "#3BACB6",
            legendFontSize: 15
        },
        {
            name: "Thu nhập",
            value: 0,
            color: "#F8B400",
            legendFontColor: "#3BACB6",
            legendFontSize: 15
        }]

    const q = query(collection(db, "transaction"), where("userID", "==", auth.currentUser.uid.toString()), where("status", "==", true));

    const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
        if (querySnapshot.metadata.fromCache) {
            return;
        }
        querySnapshot.docChanges().forEach((change) => {
            const decrypted_data = DecryptData(change.doc.data())
            if (change.type === "added") {

                if (decrypted_data.categoryValue.type == "-")
                    transactionData[0].value += parseInt(1);
                else
                    transactionData[1].value += parseInt(1);

            }

        }
        );

        getDataByType(transactionData);
    });



    return unsubscribe;
}

export const getTransactionByExpense = (getDataByExpense) => {
    var transactionData = [
        {
            name: "Ăn uống",
            value: 0,
            color: "#e3342f",
            legendFontColor: "#3BACB6",
            legendFontSize: 15
        },
        {
            name: "Quần áo",
            value: 0,
            color: "#f6993f",
            legendFontColor: "#3BACB6",
            legendFontSize: 15
        },
        {
            name: "Mua sắm",
            value: 0,
            color: "#ffed4a",
            legendFontColor: "#3BACB6",
            legendFontSize: 15
        },
        {
            name: "Nhà ở",
            value: 0,
            color: "#38c172",
            legendFontColor: "#3BACB6",
            legendFontSize: 15
        },
        {
            name: "Giải trí",
            value: 0,
            color: "#4dc0b5",
            legendFontColor: "#3BACB6",
            legendFontSize: 15
        },
        {
            name: "Sức khỏe",
            value: 0,
            color: "#3490dc",
            legendFontColor: "#3BACB6",
            legendFontSize: 15
        },
        {
            name: "Di chuyên",
            value: 0,
            color: "#6574cd",
            legendFontColor: "#3BACB6",
            legendFontSize: 15
        },
        {
            name: "Điện nước",
            value: 0,
            color: "#9561e2",
            legendFontColor: "#3BACB6",
            legendFontSize: 15
        },
        {
            name: "Giáo dục",
            value: 0,
            color: "#f66d9b",
            legendFontColor: "#3BACB6",
            legendFontSize: 15
        }
    ]

    const q = query(collection(db, "transaction"), where("userID", "==", auth.currentUser.uid.toString()), where("status", "==", true));

    const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
        if (querySnapshot.metadata.fromCache) {
            return;
        }
        querySnapshot.docChanges().forEach((change) => {
            const decrypted_data = DecryptData(change.doc.data())
            if (change.type === "added") {

                if (decrypted_data.categoryValue.title == "Ăn uống")
                    transactionData[0].value += parseInt(1);
                else if (decrypted_data.categoryValue.title == "Quần áo")
                    transactionData[1].value += parseInt(1);
                else if (decrypted_data.categoryValue.title == "Mua sắm")
                    transactionData[2].value += parseInt(1);

                else if (decrypted_data.categoryValue.title == "Nhà ở")
                    transactionData[3].value += parseInt(1);

                else if (decrypted_data.categoryValue.title == "Giải trí")
                    transactionData[4].value += parseInt(1);

                else if (decrypted_data.categoryValue.title == "Sức khỏe")
                    transactionData[5].value += parseInt(1);

                else if (decrypted_data.categoryValue.title == "Đi chuyển")
                    transactionData[6].value += parseInt(1);

                else if (decrypted_data.categoryValue.title == "Hóa đơn điện nước")
                    transactionData[7].value += parseInt(1);

                else if (decrypted_data.categoryValue.title == "Giáo dục")
                    transactionData[8].value += parseInt(1);


            }

        }
        );

        getDataByExpense(transactionData);
    });



    return unsubscribe;
}


export const getTransactionByIncome = (getDataByIncome) => {
    var transactionData = [
        {
            name: "Tiền lương",
            value: 0,
            color: "#e3342f",
            legendFontColor: "#3BACB6",
            legendFontSize: 15
        },
        {
            name: "Tiền thưởng",
            value: 0,
            color: "#38c172",
            legendFontColor: "#3BACB6",
            legendFontSize: 15
        }]

    const q = query(collection(db, "transaction"), where("userID", "==", auth.currentUser.uid.toString()), where("status", "==", true));

    const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
        if (querySnapshot.metadata.fromCache) {
            return;
        }
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                const decrypted_data = DecryptData(change.doc.data())
                if (decrypted_data.categoryValue.title == "Tiền lương")
                    transactionData[0].value += parseInt(1);
                else if (decrypted_data.categoryValue.title == "Tiền thưởng")
                    transactionData[1].value += parseInt(1);

            }

        }
        );
        getDataByIncome(transactionData);
    });



    return unsubscribe;
}

export const getMonthExpense = (getData) => {
    const data = [
        {
            label: "Tháng 1      ",
            value: 0,

        },
        {
            label: "Tháng 2      ",
            value: 0,
        },

        {
            label: "Tháng 3      ",
            value: 0,

        },
        {
            label: "Tháng 4      ",
            value: 0,
        },

        {
            label: "Tháng 5      ",
            value: 0,

        },
        {
            label: "Tháng 6      ",
            value: 0,
        },

        {
            label: "Tháng 7      ",
            value: 0,
        },

        {
            label: "Tháng 8      ",
            value: 0,

        },
        {
            label: "Tháng 9      ",
            value: 0,
        },

        {
            label: "Tháng 10      ",
            value: 0,

        },
        {
            label: "Tháng 11      ",
            value: 0,
        },
        {
            label: "Tháng 12      ",
            value: 0,
        },

    ];

    const q = query(collection(db, "transaction"), where("userID", "==", auth.currentUser.uid.toString()), where("status", "==", true));

    const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
        if (querySnapshot.metadata.fromCache) {
            return;
        }
        querySnapshot.docChanges().forEach((change) => {
            const decrypted_data = DecryptData(change.doc.data())
            if (change.type === "added" && decrypted_data.categoryValue.type == "-") {
                data[decrypted_data.dateCreated.toDate().getMonth()].value += parseInt(decrypted_data.moneyValue);
            }
        }
        );
        getData(data);
    });



    return unsubscribe;
}

export const getMonthIncome = (getData) => {
    const data = [
        {
            label: "Tháng 1      ",
            value: 0,

        },
        {
            label: "Tháng 2      ",
            value: 0,
        },

        {
            label: "Tháng 3      ",
            value: 0,

        },
        {
            label: "Tháng 4      ",
            value: 0,
        },

        {
            label: "Tháng 5      ",
            value: 0,

        },
        {
            label: "Tháng 6      ",
            value: 0,
        },

        {
            label: "Tháng 7      ",
            value: 0,
        },

        {
            label: "Tháng 8      ",
            value: 0,

        },
        {
            label: "Tháng 9      ",
            value: 0,
        },

        {
            label: "Tháng 10      ",
            value: 0,

        },
        {
            label: "Tháng 11      ",
            value: 0,
        },
        {
            label: "Tháng 12      ",
            value: 0,
        },

    ];

    const q = query(collection(db, "transaction"), where("userID", "==", auth.currentUser.uid.toString()), where("status", "==", true));

    const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
        if (querySnapshot.metadata.fromCache) {
            return;
        }
        querySnapshot.docChanges().forEach((change) => {
            const decrypted_data = DecryptData(change.doc.data())
            if (change.type === "added" && decrypted_data.categoryValue.type == "+") {
                data[decrypted_data.dateCreated.toDate().getMonth()].value += parseInt(decrypted_data.moneyValue);
            }

        }
        );

        getData(data);
    });



    return unsubscribe;
}