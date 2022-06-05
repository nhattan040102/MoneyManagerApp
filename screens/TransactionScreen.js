import { React, useState } from 'react';
import { View, Text, StyleSheet, Modal, SafeAreaView } from 'react-native';
import AddTransactionBtn from '../components/AddTransactionBtn';
import TransactionInput from '../components/TransactionInput';
import TransactionCard from '../components/TransactionCard';
import { Feather } from '@expo/vector-icons';
import { FONTSIZE } from '../constants/constants';

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

            {/* Header bar */}
            <SafeAreaView style={styles.headerBar}>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="calendar" size={24} color="white" />
                    <Text style={{ fontSize: FONTSIZE.small, color: 'white' }}>  2022-06</Text>
                    <Text style={{ fontSize: FONTSIZE.small, color: 'white' }}> Số dư </Text>
                </View>
                <View>
                    <Text style={{ fontSize: FONTSIZE.extraLarge, color: 'white', paddingLeft: 15, }}>
                        0
                    </Text>
                </View>

                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 5, paddingLeft: 10 }}>
                        <Text style={{ fontSize: FONTSIZE.small, color: 'white', fontWeight: '500' }}>
                            Chi tiêu:
                        </Text>
                        <Text style={{ fontSize: FONTSIZE.header1, color: 'white' }}>
                            0
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingLeft: 10 }}>
                        <Text style={{ fontSize: FONTSIZE.small, color: 'white', fontWeight: '500' }}>
                            Thu nhập:
                        </Text>
                        <Text style={{ fontSize: FONTSIZE.header1, color: 'white' }}>
                            0
                        </Text>
                    </View>

                </View>
            </SafeAreaView>

            {/* {View for button adding transaction } */}
            <View style={styles.addView}>
                <AddTransactionBtn onPress={() => setModalVisible(true)} />
            </View>

            <View style={styles.listView}>
                <TransactionCard itemList={transactionList} />
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

        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
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
        alignItems: 'center'
    }
})

export default TransactionScreen;