import { React, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import * as Progress from 'react-native-progress';
import GoalDeTail from '../components/GoalDetail';
import { MaterialIcons } from '@expo/vector-icons';
import GoalRecord from '../components/GoalRecord';

const SavingDetailScreen = props => {
    const [currentState, setCurrentState] = useState('GOAL');

    const CurrentScreen = currentState == 'GOAL' ? <GoalDeTail /> : <GoalRecord onPress={() => props.navigation.navigate('Thống kê')} />

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => props.navigation.navigate('Chế độ tiết kiệm', { status: false, random: 1 })}>
                    <MaterialIcons name="delete" size={30} color="white" />
                </TouchableOpacity>
            )
        });
    }, [props.navigation]);

    return (
        <View style={styles.screen}>
            <View style={styles.headerBar}>
                <TouchableOpacity
                    style={styles.category}
                    onPress={() => setCurrentState('GOAL')}
                >
                    <Text style={[styles.cate_text]}>GOAL</Text>
                    <View style={{ width: '100%', borderWidth: currentState == "GOAL" ? 3 : 0, borderColor: '#EFFFFD', position: 'absolute', bottom: -2 }}></View>
                </TouchableOpacity>
                <View style={{ width: 0.25, backgroundColor: 'white' }}></View>
                <TouchableOpacity
                    style={styles.category}
                    onPress={() => setCurrentState('RECORD')}
                >
                    <Text style={[styles.cate_text]}>RECORD</Text>
                    <View style={{ width: '100%', borderWidth: currentState == "RECORD" ? 3 : 0, borderColor: '#EFFFFD', position: 'absolute', bottom: -2 }}></View>
                </TouchableOpacity>
            </View>

            {CurrentScreen}

        </View >
    );
}

const styles = StyleSheet.create({
    screen: {
        flexDirection: 'column',

    },

    headerBar: {
        width: '100%',
        height: 60,
        backgroundColor: 'rgb(45,139, 126)',
        flexDirection: 'row',

    },

    category: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    cate_text: {
        fontSize: FONTSIZE.header1,
        fontWeight: '500',
        color: 'white',

    }
})

export default SavingDetailScreen;