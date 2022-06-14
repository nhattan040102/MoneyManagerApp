import { React } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert} from 'react-native';
import { FONTSIZE } from '../constants/constants';
import { formatMoney } from '../Helper/helpers';

const CategoryCard = props => {
    

    const seeInfo_Del = item => {
        console.log(item)
        return (    <View>
                        {Alert.alert(
                            'Ghi chú', 
                            item.note==null?'Không có ghi chú':item.note
                            ,
                            [
                                {text: 'OK'},
                                {text: 'Xóa giao dịch', onPress: ()=>{Alert.alert(
                                                                        'Xóa giao dịch',
                                                                        'Bạn chắc chắn muốn xóa giao dịch này?',
                                                                        [
                                                                            {text: 'Hủy'},
                                                                            {text: 'Xóa', onPress: ()=>{/*'INSERT CODE DELETE HERE'*/}}
                                                                        ]
                                )}}
                            ]
                        )}
                    </View>);
    };

    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={() => {
                props.moneyValue? seeInfo_Del(props.item):props.onPress()
            }}>
            <View style={styles.icon}>
                <Image source={props.img} />
            </View>

            <View style={styles.title}>
                <Text style={{ fontSize: FONTSIZE.header1, fontWeight: '400' }}>{props.title}</Text>
            </View>

            <View style={styles.money}>
                <Text style={{ fontSize: FONTSIZE.header2, fontWeight: '600', color: props.type == "-" ? '#FF6363' : "#2FA4FF" }}>{props.moneyValue ? props.type : ""}{formatMoney(props.moneyValue)} {props.moneyValue ? "VND" : ""} </Text>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 0.2,
        elevation: 0.2,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderBottomWidth: 0.3,
    },

    icon: {
        width: '15%',
        justifyContent: 'center',
        padding: 10,
        // alignItems: 'center',
    },

    title: {
        width: '40%',
        justifyContent: 'center',
        // alignItems: 'center',
    },

    money: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 10,
    }
})

export default CategoryCard;