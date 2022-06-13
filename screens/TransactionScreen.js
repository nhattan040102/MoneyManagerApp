import { React, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, SafeAreaView, FlatList } from 'react-native';
import AddTransactionBtn from '../components/AddTransactionBtn';
import TransactionInput from '../components/TransactionInput';
import TransactionCard from '../components/TransactionCard';
import { Feather } from '@expo/vector-icons';
import { FONTSIZE } from '../constants/constants';
import { formatMoney } from '../Helper/helpers';
import NoTransactionCard from '../components/NoTransactionCard';
import { AddTransactionToFirebase, loadTransaction } from '../Helper/firebaseAPI';
import { loadSavingGoalData, autoSignIn, _onAuthStateChanged } from '../Helper/firebaseAPI';


const TransactionScreen = props => {
    const [modalVisible, setModalVisible] = useState(false); //state to show modal and hide modal for transaction input
    const [trigger, setTrigger] = useState(true); // save transaction input value
    const [transactionList, setTransactionList] = useState([]); // a list of transaction of a particular date
    const [currentExpense, setCurrentExpense] = useState(0);
    const [currentIncome, setCurrentIncome] = useState(0);
    const [currentMoney, setCurrentMoney] = useState(currentIncome - currentExpense);

    const currentDate = new Date();

    {/* render item for flat list */ }
    const renderItem = ({ item }) => {
        return <TransactionCard itemList={item.data} id={item.id} />
    }

    {/* function to close input modal */ }
    const closeHandler = () => {
        setModalVisible(false);
    }

    {/* function to add a transaction and close input modal */ }
    const createHandler = (input) => {
        setModalVisible(false);
        setTrigger(!trigger);
        AddTransactionToFirebase(input);

        // if (input.categoryValue.type == "-") {
        //     setCurrentExpense(parseInt(currentExpense) + parseInt(input.money));
        //     setCurrentMoney(parseInt(currentMoney) - parseInt(input.money))
        // }

        // else {
        //     setCurrentIncome(parseInt(currentIncome) + parseInt(input.money));
        //     setCurrentMoney(parseInt(currentMoney) + parseInt(input.money))
        // }

    }

    useEffect(() => {
        autoSignIn()
        loadTransaction(setTransactionList);
    }, [trigger])

    return (

        <View style={styles.screen}>

            {/* {Header bar} */}
            <SafeAreaView style={styles.headerBar}>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="calendar" size={24} color="white" />
                    <Text style={{ fontSize: FONTSIZE.small, color: 'white' }}>  {currentDate.getFullYear()}-{currentDate.getMonth() + 1}</Text>
                    <Text style={{ fontSize: FONTSIZE.small, color: 'white' }}> Số dư </Text>
                </View>
                <View>
                    <Text style={{ fontSize: FONTSIZE.extraLarge, color: 'white', paddingLeft: 15, }}>
                        {formatMoney(currentMoney)}
                    </Text>
                </View>

                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 5, paddingLeft: 10 }}>
                        <Text style={{ fontSize: FONTSIZE.small, color: 'white', fontWeight: '500' }}>
                            Chi tiêu:
                        </Text>
                        <Text style={{ fontSize: FONTSIZE.header1, color: 'white' }}>
                            {formatMoney(currentExpense)}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingLeft: 10 }}>
                        <Text style={{ fontSize: FONTSIZE.small, color: 'white', fontWeight: '500' }}>
                            Thu nhập:
                        </Text>
                        <Text style={{ fontSize: FONTSIZE.header1, color: 'white' }}>
                            {formatMoney(currentIncome)}
                        </Text>
                    </View>

                </View>
            </SafeAreaView>

            {/* {View for button adding transaction } */}
            <View style={styles.addView}>
                <AddTransactionBtn onPress={() => setModalVisible(true)} />
            </View>

            {/* {Modal will show up when click AddTranasctionBtn} */}
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={modalVisible} >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                    <TransactionInput onClose={() => closeHandler()} onCreate={(input) => createHandler(input)} />
                </View>
            </Modal>


            <View style={styles.listView}>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 400, width: '100%' }}
                    data={transactionList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={NoTransactionCard}
                    extraData={trigger}
                />
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        // flex: 1,
        // width: 400,
        width: '100%',
        height: '100%',

    },

    headerBar: {
        width: '100%',
        // height: '15%',
        backgroundColor: 'rgb(45,139, 126)',
    },

    addView: {
        position: 'absolute',
        width: '100%',
        bottom: 120,
        zIndex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },

    listView: {
        // alignItems: 'center',
        // width: 600,
        // backgroundColor: 'red',
        // justifyContent: 'center',
        // flex: 1,
        // backgroundColor: 'red'
        padding: 10,
    }
})

export default TransactionScreen;