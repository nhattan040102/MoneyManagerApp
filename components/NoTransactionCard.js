import { React } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import * as Progress from 'react-native-progress';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const NoTransactionCard = props => {
    return (
        <View style={styles.container} >
            <Image source={require('../icon/transaction-sticker.png')} />
            <Text style={{ padding: 10, fontSize: FONTSIZE.header1, fontWeight: 'bold', color: 'rgb(12,60,78)' }}>NO TRANSACTION YET.</Text>
            <Text style={{ fontSize: FONTSIZE.header2, fontWeight: '500', color: 'rgb(12,60,78)', textAlign: 'center' }}>Let's manage your money by make the first transaction!!!</Text>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        height: '60%',
        borderColor: 'rgb(12,60,78)',
        borderWidth: 3,
        // justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'

    }
});

export default NoTransactionCard;