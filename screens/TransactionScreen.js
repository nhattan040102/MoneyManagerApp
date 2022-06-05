import { React, useState } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView } from 'react-native';
import AddTransactionBtn from '../components/AddTransactionBtn';
import TransactionInput from '../components/TransactionInput';
import TransactionCard from '../components/TransactionCard';

const TransactionScreen = props => {
    const [modalVisible, setModalVisible] = useState(false); //state to show modal and hide modal for transaction input
    const [input, setInput] = useState(null); // save transaction input value
    const [transactionList, setTransactionList] = useState([]); // a list of transaction of a particular date

    {/* function to close input modal */ }
    const closeHandler = () => {
        setModalVisible(false);
    }

    {/* function to add a transaction and close input modal */ }
    const createHandler = (input) => {
        setModalVisible(false);
        console.log(input);
        setInput(input);
        setTransactionList([...transactionList, input]);
    }

    return (

        <View style={styles.screen}>

            {/* {View for button adding transaction } */}
            <View style={styles.addView}>
                <AddTransactionBtn onPress={() => setModalVisible(true)} />
            </View>


            <TransactionCard itemList={transactionList} />

            {/* {Modal will show up when click AddTranasctionBtn} */}
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={modalVisible} >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                    <TransactionInput onClose={() => closeHandler()} onCreate={(input) => createHandler(input)} />
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    addView: {
        position: 'absolute',
        bottom: 120,
        zIndex: 3,
    }
})

export default TransactionScreen;