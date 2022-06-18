import { React, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button, Alert, Modal, Platform, KeyboardAvoidingView } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import TransactionCategory from '../components/TransactionCategory';
import WalletType from '../components/WalletType'



const TransactionInput = props => {
    const [date, setDate] = useState(new Date());
    const [dateModal, setDateModal] = useState(false)
    const [money, setMoney] = useState(null);
    const [cateModal, setCateModal] = useState(false);
    const [walletModal, setWalletModal] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [categoryTitle, setCategoryTitle] = useState('Chọn');
    const [walletValue, setWalletValue] = useState('Chọn');
    const [note, setNote] = useState(null);
    // const text = null

    const choseCategory = (item) => {
        setCategoryValue(item);
        setCategoryTitle(item.title);
        setCateModal(false);
    };

    function choseWallet(item) {
        setWalletModal(false);
        setWalletValue(item);
    };

    const onSetMoney = (input) => {
        input = input.replace(/[^0-9]/g, '');
        setMoney(parseInt(input).toString());
    };
    const onChangeTime = (event, value) => {
        setDate(value)
        setDateModal(false)
        // console.log(date.toString())
        // console.log(date.getUTCDate().toString())
    };

    const DatePicker = Platform.OS === "ios" ? <DateTimePicker mode="date" value={date} onChange={onChangeTime} /> :
        <Button
            title={date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString()}
            color={'rgb(45,139, 126)'}
            onPress={() => setDateModal(true)}
        />

    const alertError = () => {
        Alert.alert('Lỗi', 'Bạn điền còn chưa đủ thông tin hoặc số tiền không hợp lệ!', [
            { text: 'Sửa lại', onPress: () => { } }
        ])
    };

    const alertSuccess = () => {
        props.onCreate({ money, walletValue, date, note, categoryValue })
    };

    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, }}>
                    <Image source={require('../icon/wage.png')} />
                    <Text style={styles.inputTitle}>Số tiền</Text>
                </View>
                <TextInput
                    onChangeText={text => { onSetMoney(text) }}
                    value={money}
                    placeholder='Vui lòng nhập số tiền'
                    keyboardType='numeric'
                    style={styles.textInput} ></TextInput>
            </View>

            <View style={styles.input}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, }}>
                    <Image source={require('../icon/categories.png')} />
                    <Text style={styles.inputTitle}>Hạng mục</Text>
                </View>
                <Button
                    title={categoryTitle}
                    color={'rgb(45,139, 126)'}
                    onPress={() => { setCateModal(true) }}
                />
            </View>

            <Modal animationType={"slide"}
                transparent={true}
                visible={cateModal} >

                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <TransactionCategory
                        choseItem={choseCategory}
                        onClose={() => setCateModal(false)}
                    />
                </View>
            </Modal>


            <View style={styles.input}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, }}>
                    <Image source={require('../icon/purse.png')} />
                    <Text style={styles.inputTitle}>Loại ví</Text>
                </View>
                {<Button
                    title={walletValue}
                    color={'rgb(45,139, 126)'}
                    onPress={() => { setWalletModal(true) }}
                />}
            </View>

            <Modal animationType={"slide"}
                transparent={true}
                visible={walletModal} >
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <WalletType
                        choseItem={choseWallet}
                        onClose={() => setWalletModal(false)}
                    />
                </View>
            </Modal>

            <View style={styles.input}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, }}>
                    <Image source={require('../icon/calendar.png')} />
                    <Text style={styles.inputTitle}>Thời điểm</Text>
                </View>
                {DatePicker}
            </View>

            <Modal animationType={"slide"}
                transparent={true}
                visible={dateModal}>

                <DateTimePicker
                    mode="date"
                    onChange={onChangeTime}
                    value={date} />
            </Modal>

            <View style={styles.input}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, }}>
                    <Image source={require('../icon/notes.png')} />
                    <Text style={styles.inputTitle}>Ghi chú</Text>
                </View>
                <KeyboardAvoidingView>
                    <TextInput
                        placeholder='Hiện không có ghi chú'
                        onChangeText={text => setNote(text)}
                        value={note}
                        style={styles.textInput} />
                </KeyboardAvoidingView>
            </View>

            <View style={{ justifyContent: 'flex-end', width: '100%', alignItems: 'flex-end' }}>
                <View style={styles.buttonContainer}>

                    <Button title='Hủy' color={'skyblue'} onPress={() => props.onClose()}></Button>
                    <Button
                        title='Tạo'
                        color={'green'}
                        onPress={() => {
                            if (money == null || categoryValue == 'Chọn' || walletValue == 'Chọn') {
                                { alertError() }
                            }
                            else { alertSuccess() }

                        }}
                    ></Button>
                </View>
            </View>


        </View>
    )
}

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
        elevation: 4,
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
        width: '30%',
        justifyContent: 'space-between',
        alignItems: 'center'
    }


});

export default TransactionInput;