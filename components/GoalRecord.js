import { React, } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import { MaterialIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

const dv_width = Dimensions.get('window').width;

const DATA = [
    {
        id: 1,
        date: '27/3/2022',
        value: '30,000 VND',
    },

    {
        id: 2,
        date: '28/3/2022',
        value: '40,000 VND',
    },

    {
        id: 3,
        date: '29/3/2022',
        value: '32,000 VND',
    },

    {
        id: 4,
        date: '30/3/2022',
        value: '30,000 VND',
    },

    {
        id: 5,
        date: '27/4/2022',
        value: '30,000 VND',
    },

    {
        id: 6,
        date: '28/4/2022',
        value: '40,000 VND',
    },

    {
        id: 7,
        date: '29/4/2022',
        value: '32,000 VND',
    },

    {
        id: 8,
        date: '30/4/2022',
        value: '30,000 VND',
    }
]

const Record = (props) => {
    return (
        <TouchableOpacity style={styles.record}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="date-range" size={28} color="black" />
                <Text style={{ fontSize: FONTSIZE.body, fontWeight: '600' }}> {props.date}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="attach-money" size={24} color="black" />
                <Text style={{ fontSize: FONTSIZE.body, fontWeight: '600' }}> {props.value}</Text>
            </View>

        </TouchableOpacity>
    )
}

const GoalRecord = props => {
    const renderItem = ({ item }) => {
        return <Record date={item.date} value={item.value} />
    }

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <View style={{ width: '100%', height: '10%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{ backgroundColor: '#006E7F', padding: 12, margin: 10, borderRadius: 10, }}
                    onPress={() => props.onPress()}
                >
                    <Text style={{ fontSize: FONTSIZE.body, color: 'white' }}>Xem chi tiết thống kê</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
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
        elevation: 0.6,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,

    }
})

export default GoalRecord;