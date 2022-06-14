import { React, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Modal, SafeAreaView, FlatList, RefreshControl, Platform, StatusBar } from 'react-native';
import AddTransactionBtn from '../components/AddTransactionBtn';
import TransactionInput from '../components/TransactionInput';
import TransactionCard from '../components/TransactionCard';
import { Feather } from '@expo/vector-icons';
import { FONTSIZE } from '../constants/constants';
import { formatMoney } from '../Helper/helpers';
import NoTransactionCard from '../components/NoTransactionCard';
import { AddTransactionToFirebase, loadTransaction } from '../Helper/firebaseAPI';
import { loadSavingGoalData, autoSignIn, _onAuthStateChanged } from '../Helper/firebaseAPI';
import { auth } from '../firebase';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


const TransactionScreen = props => {
    const [modalVisible, setModalVisible] = useState(false); //state to show modal and hide modal for transaction input
    const [trigger, setTrigger] = useState(true); // save transaction input value
    const [transactionList, setTransactionList] = useState([]); // a list of transaction of a particular date
    const [currentExpense, setCurrentExpense] = useState(0);
    const [currentIncome, setCurrentIncome] = useState(0);
    const [currentMoney, setCurrentMoney] = useState(currentIncome - currentExpense);

    const currentDate = new Date();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

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
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            loadTransaction(setTransactionList);
            // transactionList.map(item => console.log(item.date.toDate()))
            console.log(transactionList.length);
        })
        // loadTransaction(setTransactionList);

        return () => unsubscribe();

    }, [])

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
                        {formatMoney(currentMoney)} VND
                    </Text>
                </View>

                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 5, paddingLeft: 10 }}>
                        <Text style={{ fontSize: FONTSIZE.small, color: 'white', fontWeight: '500' }}>
                            Tổng chi tiêu  :
                        </Text>
                        <Text style={{ fontSize: FONTSIZE.header1, color: 'white' }}>
                            {formatMoney(currentExpense)} VND
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingLeft: 10 }}>
                        <Text style={{ fontSize: FONTSIZE.small, color: 'white', fontWeight: '500' }}>
                            Tổng thu nhập  :
                        </Text>
                        <Text style={{ fontSize: FONTSIZE.header1, color: 'white' }}>
                            {formatMoney(currentIncome)} VND
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
                    contentContainerStyle={{ paddingBottom: transactionList.length == 0 ? 100 : 300, width: '100%', flexGrow: 1, }}
                    data={transactionList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={NoTransactionCard}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
    },

    headerBar: {
        width: '100%',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: 'rgb(45,139, 126)',
    },

    addView: {
        position: 'absolute',
        width: '100%',
        bottom: "11%",
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    listView: {
        flex: 1,
        // height: '100%',
        padding: 10,
    }
})

export default TransactionScreen;