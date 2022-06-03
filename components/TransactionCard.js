import { React } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CategoryCard from './CategoryCard';
import { EXPENSE_DATA } from '../model/data';
import { INCOME_DATA } from '../model/data';
import { SAVING_DATA } from '../model/data';
import { FONTSIZE } from '../constants/constants';

const TransactionCard = props => {
    // console.log(props.itemList[0]);
    return (
        <View style={styles.card}>
            <View style={styles.info_view}>
                <View>
                    <Text style={{ color: 'white', fontSize: FONTSIZE.small, fontWeight: '400' }}>28 Th4, 2022</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1, paddingHorizontal: 5 }}>
                    <Text style={{ color: 'white', fontSize: FONTSIZE.small, fontWeight: '400' }}>Chi tiêu:-74.000</Text>
                    <Text style={{ color: 'white', fontSize: FONTSIZE.small, fontWeight: '400' }}>  Thu nhập:+1.000.000</Text>
                </View>
            </View>

            <View style={styles.item_list} >
                {props.itemList.map(item => {
                    // console.log(EXPENSE_DATA.indexOf(item.categoryValue)
                    return (<CategoryCard title={item.categoryValue.title} img={item.categoryValue.img} key={props.itemList.indexOf(item)} type={item.categoryValue.type} onPress={() => { }} moneyValue={item.money} />);
                })}

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '95%',
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 1,
        shadowOpacity: 0.4,
        elevation: 0.4,
    },

    item_list: {

    },

    info_view: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#069A8E',
    }
});

export default TransactionCard;