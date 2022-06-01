import { React, useState, } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button, Alert, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import DateTimePicker from '@react-native-community/datetimepicker';

const WalletType = props => {
    const [cateType, setCateType] = useState('TIỀN MẶT');

    return (

        <View style={styles.container}>
            <View style={{ position: 'absolute', right: 0, top: -20 }}>
                <Button title="X" onPress={() => props.onClose()}></Button>
            </View>
            <View style={{ height: '15%', flexDirection: 'row', justifyContent: 'space-around', padding: 10, }}>
                <TouchableOpacity style={[styles.category_types, { borderBottomWidth: cateType == "TIỀN MẶT" ? 3 : 0 }]} onPress={() => setCateType('TIỀN MẶT')}>
                    <Text
                        style={[{ fontSize: FONTSIZE.header1 }, { color: cateType == "TIỀN MẶT" ? 'rgb(45,139, 126)' : 'gray' }]} S
                    >
                        TIỀN MẶT
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity style={[styles.category_types, { borderBottomWidth: cateType == "VÍ ĐIỆN TỬ" ? 3 : 0 }]} onPress={() => setCateType('VÍ ĐIỆN TỬ')}>
                    <Text
                        style={[{ fontSize: FONTSIZE.header1 }, { color: cateType == "VÍ ĐIỆN TỬ" ? 'rgb(45,139, 126)' : 'gray' }]}
                    >
                        VÍ ĐIỆN TỬ/ NGÂN HÀNG
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '40%',
        // height: 100,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.6,
        elevation: 0.6,
    },

    category_types: {
        borderBottomColor: 'rgb(45,139, 126)',
        borderBottomWidth: 3
    },

});

export default WalletType;