import { React } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Progress from 'react-native-progress';

const GoalDeTail = props => {
    return (
        <View style={{ width: '100%', height: '100%', flexDirection: 'column' }}>
            <View style={{ height: '35%', paddingVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Progress.Circle size={250} progress={0.6} color={'#006E7F'} thickness={4} />
                <Image source={require('../icon/goal.png')} style={styles.img} />
            </View>
            <View style={{ height: '40%', backgroundColor: 'red' }}>

            </View>
            <View style={{ flex: 1, backgroundColor: 'blue' }}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    img: {
        position: 'absolute',

    }
})

export default GoalDeTail;