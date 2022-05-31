import { React, useState, } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button, Alert } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const formatMoney = (money) => {
    return Number(money)
        .toFixed(1)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

const TransactionInput = props => {
    const [date, setDate] = useState(new Date());
    const [money, setMoney] = useState(null);
    const [displayMoney, setDisplayMoney] = useState(null);

    const onChanged = (text) => {
        text = text.replace(/[^0-9]/g, '');
        setMoney(text);
        setDisplayMoney(formatMoney(text));
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
            <TouchableOpacity>
                <View style={styles.input}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, }}>
                        <Image source={require('../icon/categories.png')} />
                        <Text style={styles.inputTitle}>Hạng mục</Text>
                    </View>
                    <TextInput
                        title="Mục tiêu"
                        placeholder='Chọn hạng mục'
                        // onChangeText={text => { onChanged(text, "savingValue") }}
                        // value={"Chọn hạng mục"}
                        editable={false}
                        style={styles.textInput} />

                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.input}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, }}>
                        <Image source={require('../icon/purse.png')} />
                        <Text style={styles.inputTitle}>Loại ví</Text>
                    </View>
                    <TextInput
                        title="Mục tiêu"
                        placeholder='Chọn ví'
                        // onChangeText={text => { onChanged(text, "savingValue") }}
                        // value={"Chọn hạng mục"}
                        editable={false}
                        style={styles.textInput} />

                </View>
            </TouchableOpacity>

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
                    // onChangeText={text => { onChanged(text, "savingValue") }}
                    // value={savingValue}
                    style={styles.textInput} />
            </View>


        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '10%',
        backgroundColor: 'white',
        width: '100%',
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


});

export default TransactionInput;