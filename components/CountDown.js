import { React } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useState } from 'react/cjs/react.production.min';
import { FONTSIZE } from '../constants/constants';
import { getDateDifference } from '../Helper/helpers';
import { deleteSavingGoal } from '../Helper/firebaseAPI';

const CountDown = props => {
    return (
        <View style={styles.block}>
            <View style={{ marginLeft: 10, width: 80, }}>
                <View style={styles.timeValue}>
                    <Text style={styles.time}>{props.date[2] >= 0 ? props.date[2] : 0}</Text>
                </View>
                <Text style={{ textAlign: 'center', fontSize: FONTSIZE.small }}>Years</Text>
            </View>


            <View style={{ marginLeft: 10, width: 80 }}>
                <View style={styles.timeValue}>
                    <Text style={styles.time}>{props.date[1] >= 0 ? props.date[1] : 0}</Text>
                </View>
                <Text style={{ textAlign: 'center', fontSize: FONTSIZE.small }}>Months</Text>
            </View>

            <View style={{ marginLeft: 10, width: 80 }}>
                <View style={styles.timeValue}>
                    <Text style={styles.time}>{props.date[0] >= 0 ? props.date[0] : 0}</Text>
                </View>
                <Text style={{ textAlign: 'center', fontSize: FONTSIZE.small }}>Days</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
    },

    timeValue: {
        backgroundColor: 'rgb(247,183,49)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 3,
        borderRadius: 5,
    },

    time: {
        fontSize: FONTSIZE.small,
        fontWeight: '600',
    }
});

export default CountDown;