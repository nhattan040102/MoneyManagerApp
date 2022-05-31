import { React } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import * as Progress from 'react-native-progress';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const SavingGoalCard = props => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => props.onPress()}>
            <View style={{ padding: 5 }}>
                <Text style={{ fontSize: FONTSIZE.header1, fontWeight: '600' }}>{props.item.goalName}</Text>
            </View>
            <View style={{ padding: 5, paddingVertical: 10, flexDirection: 'row' }}>
                <FontAwesome5 name="money-bill-alt" size={24} color="black" />
                <Text style={{ fontSize: FONTSIZE.header1, fontWeight: '600' }}> {props.item.savingValue}</Text>
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 10, flexDirection: 'row' }}>
                <Progress.Bar progress={0} width={280} unfilledColor={'rgb(248,248,248)'} height={15} color={'rgb(61,186,171)'} />
                <Text style={{ paddingHorizontal: 10, fontSize: 15 }}>0%</Text>
            </View>
            <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="percent-outline" size={24} color="black" />
                <Text style={{ fontSize: FONTSIZE.body, fontWeight: '500' }}> Tiến độ: 0 / {props.item.savingValue} VND</Text>
            </View>
            <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="access-time" size={24} color="black" />
                <Text style={{ fontSize: FONTSIZE.body, fontWeight: '500' }}>  Ngày kết thúc: {props.item.date.getDate()}/{props.item.date.getMonth()}/{props.item.date.getFullYear()}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: '90%',
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.3,
        elevation: 0.3,
    }
});

export default SavingGoalCard;