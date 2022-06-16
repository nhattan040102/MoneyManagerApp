import { React, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Modal, SafeAreaView, FlatList, RefreshControl, Platform, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import AddTransactionBtn from '../components/AddTransactionBtn';
import TransactionInput from '../components/TransactionInput';
import TransactionCard from '../components/TransactionCard';
import { Feather } from '@expo/vector-icons';
import { FONTSIZE } from '../constants/constants';
import { formatMoney, createKeyFromDate } from '../Helper/helpers';
import NoTransactionCard from '../components/NoTransactionCard';
import { AddTransactionToFirebase, loadTransaction } from '../Helper/firebaseAPI';
import { loadSavingGoalData, autoSignIn, _onAuthStateChanged } from '../Helper/firebaseAPI';
import { auth } from '../firebase';
import { LogBox } from 'react-native';


// LogBox.ignoreAllLogs();

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


const TransactionScreen = props => {
    const [modalVisible, setModalVisible] = useState(false); //state to show modal and hide modal for transaction input
    const [trigger, setTrigger] = useState(true); // save transaction input value
    const [transactionList, setTransactionList] = useState([]); // a list of transaction of a particular date
    const [isLoading, setIsLoading] = useState(false);
    const [displayedMoney, setDisplayedMoney] = useState(null);
    const [currentExpense, setCurrentExpense] = useState(displayedMoney ? displayedMoney.expenseValue : 0);
    const [currentIncome, setCurrentIncome] = useState(displayedMoney ? displayedMoney.incomeValue : 0);
    const [currentMoney, setCurrentMoney] = useState(currentIncome - currentExpense);

    const currentDate = new Date();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    {/* render item for flat list */ }
    const renderItem = ({ item }) => {
        return <TransactionCard itemList={item.data} id={item.id} navigation={props.navigation} refresh={() => setIsLoading(false)} />
    }


    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            loadTransaction(setTransactionList, setIsLoading, setDisplayedMoney);
        })

        return () => unsubscribe();

    }, [props.route, props.navigation])

    // useEffect(() => {
    //     const unsubscribe = props.navigation.addListener('focus', () => {
    //         console.log(props.route);

    //         addTransaction(props.route.params);
    //     })
    //     console.log("pop");
    //     return unsubscribe;


    // }, [props.route])

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
                        {displayedMoney ? formatMoney(displayedMoney.incomeValue - displayedMoney.expenseValue) : 0} VND
                    </Text>
                </View>

                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 5, paddingLeft: 10 }}>
                        <Text style={{ fontSize: FONTSIZE.small, color: 'white', fontWeight: '500' }}>
                            Tổng chi tiêu  :
                        </Text>
                        <Text style={{ fontSize: FONTSIZE.header1, color: 'white' }}>
                            {displayedMoney ? formatMoney(displayedMoney.expenseValue) : 0} VND
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingLeft: 10 }}>
                        <Text style={{ fontSize: FONTSIZE.small, color: 'white', fontWeight: '500' }}>
                            Tổng thu nhập  :
                        </Text>
                        <Text style={{ fontSize: FONTSIZE.header1, color: 'white' }}>
                            {displayedMoney ? formatMoney(displayedMoney.incomeValue) : 0} VND
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingLeft: 10 }}>
                        <TouchableOpacity style={styles.walletDetail} onPress={() => props.navigation.navigate("Chi tiết ví", { money: displayedMoney })}>
                            <Text style={{ color: 'rgb(45,139, 126)', fontSize: FONTSIZE.small }}>Chi tiết ví</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteView} onPress={() => props.navigation.navigate("Giao dịch đã xóa")}>
                            <Text style={{ color: 'rgb(45,139, 126)', fontSize: FONTSIZE.small }}>Giao dịch đã xóa</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>

            {/* {View for button adding transaction } */}
            <View style={styles.addView}>
                <AddTransactionBtn onPress={() => {
                    props.navigation.navigate('Nhập giao dịch')

                }
                } />
            </View>


            <View style={styles.listView}>
                {!isLoading ? <ActivityIndicator size="large" color={'rgb(45,139, 126)'} /> :
                    <FlatList
                        contentContainerStyle={{ paddingBottom: transactionList.length == 0 ? 100 : 300, width: '100%', flexGrow: 1, }}
                        data={transactionList}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={NoTransactionCard}
                    />}

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
    },

    walletDetail: {
        marginRight: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 5,

    },

    deleteView: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 5,
    },
})

export default TransactionScreen;