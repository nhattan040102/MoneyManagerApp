import { React, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Modal, SafeAreaView, FlatList, RefreshControl, Platform, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import AddTransactionBtn from '../components/AddTransactionBtn';
import TransactionInput from '../components/TransactionInput';
import TransactionCard from '../components/TransactionCard';
import { Feather } from '@expo/vector-icons';
import { FONTSIZE } from '../constants/constants';
import { formatMoney, createKeyFromDate } from '../Helper/helpers';
import NoTransactionCard from '../components/NoTransactionCard';
import { AddTransactionToFirebase, loadDeletedTransaction, loadTransaction } from '../Helper/firebaseAPI';
import { loadSavingGoalData, autoSignIn, _onAuthStateChanged } from '../Helper/firebaseAPI';
import { auth } from '../firebase';
import { LogBox } from 'react-native';

const DeletedTransactionScreen = (props) => {
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
        return <TransactionCard itemList={item.data} id={item.id} navigation={props.navigation} />
    }




    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            loadDeletedTransaction(setTransactionList, setIsLoading, setDisplayedMoney);
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
            <View style={styles.listView}>
                {!isLoading ? <ActivityIndicator size="large" color={'rgb(45,139, 126)'} /> :
                    <FlatList
                        contentContainerStyle={{ paddingBottom: transactionList.length == 0 ? 100 : 300, width: '100%', flexGrow: 1, }}
                        data={transactionList}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
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

    listView: {
        flex: 1,
        // height: '100%',
        padding: 10,
    },


});

export default DeletedTransactionScreen;