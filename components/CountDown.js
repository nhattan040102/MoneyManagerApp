import { React } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { FONTSIZE } from '../constants/constants';

const CountDown = props => {
    return (
        <View style={styles.block}>
            <View style={{ marginLeft: 10, width: 80, }}>
                <View style={styles.timeValue}>
                    <Text style={styles.time}>01</Text>
                </View>
                <Text style={{ textAlign: 'center', fontSize: FONTSIZE.header2 }}>Years</Text>
            </View>


            <View style={{ marginLeft: 10, width: 80 }}>
                <View style={styles.timeValue}>
                    <Text style={styles.time}>03</Text>
                </View>
                <Text style={{ textAlign: 'center', fontSize: FONTSIZE.header2 }}>Months</Text>
            </View>

            <View style={{ marginLeft: 10, width: 80 }}>
                <View style={styles.timeValue}>
                    <Text style={styles.time}>20</Text>
                </View>
                <Text style={{ textAlign: 'center', fontSize: FONTSIZE.header2 }}>Days</Text>
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
        fontSize: FONTSIZE.header2,
        fontWeight: '600',
    }
});

export default CountDown;