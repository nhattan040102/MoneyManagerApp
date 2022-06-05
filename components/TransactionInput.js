import { React, useState, } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button, Alert, Modal } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import TransactionCategory from '../components/TransactionCategory';
import WalletType from '../components/WalletType'



const TransactionInput = props => {
    const [date, setDate] = useState(new Date());
    const [money, setMoney] = useState(null);
    const [cateModal, setCateModal] = useState(false);
    const [walletModal, setWalletModal] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [categoryTitle, setCategoryTitle] = useState(null);
    const [walletValue, setWalletValue] = useState(null);
    const [note, setNote] = useState(null);

    const onChanged = (text) => {
        text = text.replace(/[^0-9]/g, '');
        setMoney(text);
    }

    const choseCategory = (item) => {
        setCateModal(false);
        setCategoryValue(item);
        setCategoryTitle(item.title);
    }

    const choseWallet = (item) => {
        setWalletModal(false);
        setWalletValue(item);
    }


    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, }}>
                    <Image source={require('../icon/wage.png')} />
                    <Text style={styles.inputTitle}>Số tiền</Text>
                </View>
                <TextInput
                    onChangeText={text => { onChanged(text) }}
                    value={money}
                    style={styles.textInput} ></TextInput>
            </View>
            <TouchableOpacity onPress={() => setCateModal(true)}>
                <View style={styles.input}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, }}>
                        <Image source={require('../icon/categories.png')} />
                        <Text style={styles.inputTitle}>Hạng mục</Text>
                    </View>
                    <TextInput
                        title="Mục tiêu"
                        placeholder='Chọn hạng mục'
                        // onChangeText={text => { onChanged(text, "savingValue") }}
                        value={categoryTitle}
                        editable={false}
                        style={styles.textInput} />

                </View>
            </TouchableOpacity>

            <Modal animationType={"slide"}
                transparent={true}
                visible={cateModal} >
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <TransactionCategory onClose={() => setCateModal(false)} choseItem={(item) => choseCategory(item)} />
                </View>

            </Modal>

            <TouchableOpacity onPress={() => setWalletModal(true)}>
                <View style={styles.input}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, }}>
                        <Image source={require('../icon/purse.png')} />
                        <Text style={styles.inputTitle}>Loại ví</Text>
                    </View>
                    <TextInput
                        title="Mục tiêu"
                        placeholder='Chọn ví'
                        // onChangeText={text => { onChanged(text, "savingValue") }}
                        value={walletValue}
                        editable={false}
                        style={styles.textInput} />

                </View>
            </TouchableOpacity>

            <Modal animationType={"slide"}
                transparent={true}
                visible={walletModal} >
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <WalletType onClose={() => setWalletModal(false)} choseItem={(item) => choseWallet(item)} />
                </View>

            </Modal>

            <View style={styles.input}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, }}>
                    <Image source={require('../icon/calendar.png')} />
                    <Text style={styles.inputTitle}>Ngày tháng</Text>
                </View>
                <DateTimePicker mode="date" value={date} />
            </View>

            <View style={styles.input}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, }}>
                    <Image source={require('../icon/notes.png')} />
                    <Text style={styles.inputTitle}>Ghi chú</Text>
                </View>
                <TextInput
                    title="Mục tiêu"
                    placeholder='Nhập ghi chú'
                    keyboardType='numeric'
                    onChangeText={text => setNote(text)}
                    value={note}
                    style={styles.textInput} />
            </View>

            <View style={styles.buttonContainer}>
                <Button title='HỦY' color={'red'} onPress={() => props.onClose()}></Button>
                <Button
                    title='TẠO'
                    style={{ marginLeft: 5, backgroundColor: 'red' }}
                    onPress={() => props.onCreate({ money, walletValue, date, note, categoryValue })}
                ></Button>

            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '10%',
        backgroundColor: 'white',
        width: '95%',
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        elevation: 0.4,
        marginBottom: 10,
    },

    input: {
        backgroundColor: 'white',
        height: 90,
        borderRadius: 8,
        padding: 5,
        marginBottom: 10,

    },

    inputTitle: {
        fontSize: FONTSIZE.header2,
        marginBottom: 5,
        fontWeight: '600',
        marginLeft: 5,
    },

    textInput: {
        height: '70%',
        padding: 5,
        fontSize: FONTSIZE.body,
        fontWeight: '500',
        borderBottomWidth: 1,
        borderRadius: 5,
        borderColor: 'gray'
    },

    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 20,
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }


});

export default TransactionInput;