import { React, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import * as Progress from 'react-native-progress';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { formatMoney } from '../Helper/helpers';
import { updateSavingGoalStatus } from '../Helper/firebaseAPI';

const SavingGoalCard = props => {
    const progress_perc = (props.item.currentMoney) / (props.item.savingValue);

    useEffect(() => {
        if (progress_perc >= 1)
            updateSavingGoalStatus(props.item.goalID);
    }, [progress_perc])
    return (
        <TouchableOpacity style={styles.container} onPress={() => props.onPress()}>
            <View style={{ padding: 5 }}>
                <Text style={{ fontSize: FONTSIZE.header1, fontWeight: '600' }}>{props.item.goalName}</Text>
            </View>
            <View style={{ padding: 5, paddingVertical: 10, flexDirection: 'row' }}>
                <FontAwesome5 name="money-bill-alt" size={24} color="black" />
                <Text style={{ fontSize: FONTSIZE.header1, fontWeight: '600' }}> {formatMoney(props.item.savingValue)}</Text>
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 10, flexDirection: 'row' }}>
                <Progress.Bar progress={progress_perc > 1 ? 1 : progress_perc} width={280} unfilledColor={'rgb(248,248,248)'} height={15} color={'rgb(61,186,171)'} borderColor={'black'} />
                <Text style={{ paddingHorizontal: 10, fontSize: 15 }}>{progress_perc.toFixed(2) * 100} %</Text>
            </View>
            <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="percent-outline" size={24} color="black" />
                <Text style={{ fontSize: FONTSIZE.body, fontWeight: '500' }}> Tiến độ: {formatMoney(props.item.currentMoney)} / {formatMoney(props.item.savingValue)} VND</Text>
            </View>
            <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="access-time" size={24} color="black" />
                <Text style={{ fontSize: FONTSIZE.body, fontWeight: '500' }}>  Ngày kết thúc: {props.item.date.toDate().getDate()}/{props.item.date.toDate().getMonth() + 1}/{props.item.date.toDate().getFullYear()}</Text>
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