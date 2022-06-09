import { React, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Switch } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import { MaterialIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import CountDown from '../components/CountDown';

const Card = props => {
    return (
        <View style={styles.card}>
            <Text style={{ fontSize: FONTSIZE.header2, fontWeight: '400', color: '#006E7F' }}>{props.title}</Text>
            <View style={{ flexDirection: 'row' }}>
                <MaterialIcons name="attach-money" size={24} color="black" />
                <Text style={{ fontSize: FONTSIZE.header1, fontWeight: '500' }}>{props.value}</Text>
            </View>

        </View>
    )
}

const GoalDeTail = props => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={{ width: '100%', height: '100%', flexDirection: 'column' }}>
            <View style={{ height: '35%', paddingVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ position: 'absolute', right: 10, top: 10, alignItems: 'center' }}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#006E7F" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}

                    />
                    <Text style={{ fontSize: FONTSIZE.small, color: '#006E7F', fontWeight: '500' }}>Auto saving</Text>
                </View>

                <Progress.Circle size={250} progress={0.6} color={'#006E7F'} thickness={5} unfilledColor={'white'} borderColor={'white'} />
                <Image source={require('../icon/goal.png')} style={styles.img} />
                <View style={{ backgroundColor: '#F8CB2E', padding: 8, borderRadius: 5 }}>
                    <Text style={{ fontSize: FONTSIZE.header2, color: '#006E7F', fontWeight: '500' }}>60%</Text>
                </View>
            </View>
            <View style={{ height: '22%' }}>
                <View style={{ height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                    <Card title="SAVED" value="2,000,000 VND" />
                </View>
                <View style={{ height: '50%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Card title="REMAINING" value="8,000,000 VND" />
                    <Card title="GOAL" value="10,000,000 VND" />
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#EE5007', padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse' }}>
                    <MaterialIcons name="date-range" size={28} color="black" />
                    <Text style={{ fontSize: FONTSIZE.header2, padding: 10, color: 'white' }}>TARGET ON 25/05/2023</Text>
                </View>

                <View style={{ padding: 10, borderRadius: 5 }}>
                    <CountDown />
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    img: {
        position: 'absolute',

    },

    card: {
        backgroundColor: 'white',
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        elevation: 0.4,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    }
})

export default GoalDeTail;