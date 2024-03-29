import { React, useState, } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button, Alert, Modal, Platform } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import DateTimePicker from '@react-native-community/datetimepicker';



const SavingInputModal = props => {
    const [date, setDate] = useState(new Date());
    const [goalName, setGoalName] = useState(null);
    const [savingValue, setSavingValue] = useState(null);
    const [minValue, setMinValue] = useState(null);
    const [dateModal, setDateModal] = useState(false)

    const onChanged = (text, value) => {
        text = text.replace(/[^0-9]/g, '');
        if (value == "savingValue")
            setSavingValue((text));
        else
            setMinValue((text));
    }

    const onChangeTime = (event, value) => {
        setDate(value)
        setDateModal(false)
        // console.log(date.toString())
        // console.log(date.getUTCDate().toString())
    };

    const DatePicker = Platform.OS === "ios" ? <DateTimePicker mode="date" value={date} onChange={onChangeTime} /> :
        <Button
            title={date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString()}
            onPress={() => setDateModal(true)}
        />


    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', }}>
                <Text style={{ fontSize: FONTSIZE.title, fontWeight: 'bold' }}>CREATE NEW GOAL</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                <Image source={require('../icon/piggy-bank.png')} />
            </View>

            <View style={styles.input}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, }}>
                    <Image source={require('../icon/goal-2.png')} />
                    <Text style={styles.inputTitle}>Mục tiêu</Text>
                </View>
                <TextInput
                    title="Mục tiêu"
                    placeholder='Tên mục tiêu'
                    maxLength={30}
                    value={goalName}
                    onChangeText={input => setGoalName(input)}
                    style={styles.textInput} ></TextInput>
            </View>

            <View style={styles.input}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, }}>
                    <Image source={require('../icon/money.png')} />
                    <Text style={styles.inputTitle}>Tiết kiệm</Text>
                </View>
                <TextInput
                    title="Mục tiêu"
                    placeholder='Số tiền cần tiết kiệm'
                    keyboardType='numeric'
                    onChangeText={text => { onChanged(text, "savingValue") }}
                    value={savingValue}
                    style={styles.textInput} />
            </View>

            <View style={styles.input}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, }}>
                    <Image source={require('../icon/wage.png')} />
                    <Text style={styles.inputTitle}>Tiết kiệm tối thiểu</Text>
                </View>
                <TextInput
                    title="Min"
                    placeholder='Số tiền tối thiếu để dành trong 1 ngày'
                    keyboardType='numeric'
                    onChangeText={text => { onChanged(text, "minValue") }}
                    value={minValue}
                    style={styles.textInput} ></TextInput>
            </View>

            <View style={styles.input}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, }}>
                    <Image source={require('../icon/calendar.png')} />
                    <Text style={styles.inputTitle}>Ngày kết thúc</Text>
                </View>
                <Modal animationType={"slide"}
                    transparent={true}
                    visible={dateModal}>

                    <DateTimePicker
                        onChange={onChangeTime}
                        value={date} />
                </Modal>

                {DatePicker}


            </View>

            <View style={{ justifyContent: 'flex-end', width: '100%', alignItems: 'flex-end' }}>
                <View style={styles.buttonContainer}>
                    <View style={{ paddingRight: 12, }}>
                        <Button title='HỦY' color={'red'} onPress={() => props.onClose()} ></Button>
                    </View>

                    <Button
                        title='TẠO'
                        style={{ marginLeft: 5, backgroundColor: 'red' }}
                        onPress={() => {
                            if (goalName && savingValue && minValue)
                                props.onCreate({ goalName, savingValue, minValue, date });
                            else {
                                Alert.alert(
                                    "Tin nhắn hệ thống",
                                    "Vui lòng nhập đầy đủ thông tin",
                                    [
                                        {
                                            text: "OK",
                                            onPress: () => console.log("OK Pressed"),
                                        },
                                    ]
                                );
                            }

                        }}></Button>

                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '80%',
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
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray'
    },

    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        width: '100%',
        boderWidth: 1,
        justifyContent: 'flex-end',
        borderTopWidth: 0.3,
        borderTopColor: 'gray',
        alignItems: 'center'
    }
});

export default SavingInputModal;