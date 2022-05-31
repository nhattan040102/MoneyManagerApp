import { React } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FONTSIZE from '../constants/constants.js';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const CompleteBar = () => {
    return (
        <View style={{ padding: 12, backgroundColor: 'rgb(232,137,117)', borderRadius: 15, marginRight: 10 }}>
            <Text style={{ fontSize: FONTSIZE.body }}>You did it!</Text>
        </View>
    );
}
const AchievedGoalCard = (props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => props.onPress()}>
            <View style={{ padding: 5 }}>
                <Text style={{ fontSize: FONTSIZE.header1, fontWeight: '600' }}>{props.title}</Text>
            </View>
            <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome5 name="money-bill-alt" size={24} color="black" />
                <Text style={{ fontSize: FONTSIZE.header1, fontWeight: '600' }}> 1,600,00 VND</Text>
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 10, flexDirection: 'row' }}>
                <CompleteBar />
                <Image source={require('../icon/congrats.png')} style={{ height: 40, width: 40 }} />
            </View>
            <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="access-time" size={24} color="black" />
                <Text style={{ fontSize: FONTSIZE.body, fontWeight: '500' }}> Ngày kết thúc: 18/10/2022</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 15,
        // width: '95%',
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.3,
        elevation: 0.3,
        marginBottom: 10,
    }
});

export default AchievedGoalCard;