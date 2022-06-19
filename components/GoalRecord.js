import { React, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import { MaterialIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { loadSavingTransaction } from '../Helper/firebaseAPI';
import { formatMoney } from '../Helper/helpers';
const dv_width = Dimensions.get('window').width;

const Record = (props) => {
    return (
        <TouchableOpacity style={styles.record}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="date-range" size={28} color="black" />
                <Text style={{ fontSize: FONTSIZE.body, fontWeight: '600' }}> {props.date.toDate().getDate()}/{props.date.toDate().getMonth()}/{props.date.toDate().getFullYear()}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="attach-money" size={24} color="black" />
                <Text style={{ fontSize: FONTSIZE.body, fontWeight: '600' }}>{formatMoney(props.value)} VND</Text>
            </View>

        </TouchableOpacity>
    )
}

const GoalRecord = props => {
    const [savingList, setSavingList] = useState([])

    const renderItem = ({ item }) => {
        return <Record date={item.dateCreated} value={item.moneyValue} />
    }


    useEffect(() => {
        loadSavingTransaction(setSavingList, props.item.data.goalID);
    }, [savingList])

    return (
        <View style={{ width: '100%', height: '100%' }}>

            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <FlatList
                    data={savingList}
                    renderItem={renderItem}
                    keyExtractor={item => item.dateCreated}
                />

            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    record: {
        width: dv_width * 0.95,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 15,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 0.6,
        elevation: 6,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,

    }
})

export default GoalRecord;