import { React } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import * as Progress from 'react-native-progress';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const NoTransactionCard = props => {
    return (
        <View style={styles.container} >
            <Image source={require('../icon/transaction-sticker.png')} />
            <Text style={{ paddingTop: 40, fontSize: FONTSIZE.header2, fontWeight: 'bold', color: 'rgb(12,60,78)' }}>CHƯA CÓ GIAO DỊCH NÀO.</Text>
            <Text style={{ fontSize: FONTSIZE.body, fontWeight: '500', color: 'rgb(12,60,78)', textAlign: 'center' }}>Bắt đầu quản lý và theo dõi chi tiêu của bạn bằng cách thêm giao dịch!!!</Text>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 15,
        height: '100%',
        padding: 20,
        borderColor: 'rgb(12,60,78)',
        borderWidth: 3,
        alignItems: 'center',


    }
});

export default NoTransactionCard;