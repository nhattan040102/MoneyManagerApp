import { React, useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import AddTransactionBtn from '../components/AddTransactionBtn';
import TransactionInput from '../components/TransactionInput';

const TransactionScreen = props => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.screen}>
            <View style={styles.addView}>
                <AddTransactionBtn onPress={() => setModalVisible(true)} />
            </View>

            <Modal
                animationType={"slide"}
                transparent={false}
                visible={modalVisible} >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                    <TransactionInput />
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
    }
})

export default TransactionScreen;