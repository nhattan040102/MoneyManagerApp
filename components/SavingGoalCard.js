import { React } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import * as Progress from 'react-native-progress';

const SavingGoalCard = props => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => props.onPress()}>
            <View style={{ padding: 5 }}>
                <Text style={{ fontSize: FONTSIZE.header1, fontWeight: '600' }}>Vacation</Text>
            </View>
            <View style={{ padding: 5 }}>
                <Text style={{ fontSize: FONTSIZE.header1, fontWeight: '600' }}>10,000,000 VND</Text>
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 10, flexDirection: 'row' }}>
                <Progress.Bar progress={0.2325} width={280} unfilledColor={'rgb(248,248,248)'} height={15} color={'rgb(61,186,171)'} />
                <Text style={{ paddingHorizontal: 10, fontSize: 15 }}>23.25%</Text>
            </View>
            <View style={{ padding: 5 }}>
                <Text style={{ fontSize: FONTSIZE.body, fontWeight: '500' }}>Tiến độ: 2,325,000 VND / 10,000,000 VND</Text>
            </View>
            <View style={{ padding: 5 }}>
                <Text style={{ fontSize: FONTSIZE.body, fontWeight: '500' }}>Ngày kết thúc: 18/10/2022</Text>
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
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 0.6,
        elevation: 0.6
    }
});

export default SavingGoalCard;