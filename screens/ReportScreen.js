import { React, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FONTSIZE } from '../constants/constants';

const ReportScreen = props => {
    const [currentState, setCurrentState] = useState('GOAL');
    // const CurrentScreen = currentState == 'GOAL' ? <GoalDeTail /> : <GoalRecord onPress={() => props.navigation.navigate('Thống kê')} />

    return (
        <View style={styles.screen}>
            <View style={styles.headerBar}>
                <TouchableOpacity
                    style={styles.category}
                    onPress={() => setCurrentState('GOAL')}
                >
                    <Text style={[styles.cate_text]}>BIỂU ĐỒ CỘT</Text>
                    <View style={{ width: '98%', borderWidth: currentState == "GOAL" ? 2 : 0, borderColor: '#00C897', position: 'absolute', bottom: -3 }}></View>
                </TouchableOpacity>
                <View style={{ width: 0.25, backgroundColor: 'white' }}></View>
                <TouchableOpacity
                    style={styles.category}
                    onPress={() => setCurrentState('RECORD')}
                >
                    <Text style={[styles.cate_text]}>BIỂU ĐỒ TRÒN</Text>
                    <View style={{ width: '98%', borderWidth: currentState == "RECORD" ? 2 : 0, borderColor: '#00C897', position: 'absolute', bottom: -3 }}></View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
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

export default ReportScreen;