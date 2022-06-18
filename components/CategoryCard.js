import { React } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import { formatMoney } from '../Helper/helpers';
import { deleteTransaction } from '../Helper/firebaseAPI';
import {EXPENSE_DATA, INCOME_DATA , SAVING_DATA, IN_CARD_DATA, IN_CASH_DATA} from '../model/data'



const CategoryCard = props => {

    return (
        <TouchableOpacity style={styles.container} onPress={() => {         
            // props.refresh();
            props.isDelete? onAlert(props.id):props.moneyValue ? props.navigation.navigate(props.item.status == true ? "Chi tiết giao dịch" : "Chi tiết đã xóa", { item: props.item }) : props.onPress()
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

// The DELETE CATEGORY FUNCTION
const onAlert = id =>{
    Alert.alert(    'Thông báo', 
                    'Bạn chắc chắn muốn xóa nội dung này vĩnh viễn và không thể khôi phục',[
                        {text: 'Hủy'},
                        {text: 'Chắc chắn', onPress: DeleteCategory(id)}
                    ])
}

const DeleteCategory = id =>{
    console.log(' I am in Del, id is :'+ id)

    const checkId = (object, x)=>{
        for(let i=0; i<object.length; i++){
            if (object[i].id==x){
                if(object[i].canDelete ==false){
                    Alert.alert('Thông báo', 'Bạn không thể xóa nội dung mặc định của nhà phát triển')
                    return -1
                }
                return i;
            }
                
        }
    }
    switch(id.slice(0, 1)){
        case 'e':
            if(checkId(EXPENSE_DATA, id)==-1) 
                break;
            EXPENSE_DATA.splice(checkId(EXPENSE_DATA, id), 1)
            break

        case 's':
            if(checkId(SAVING_DATA, id)==-1) 
                break;
            SAVING_DATA.splice(checkId(SAVING_DATA, id), 1)
            break

        case 'i':
            if(checkId(INCOME_DATA, id)==-1) 
            break;
            INCOME_DATA.splice(checkId(INCOME_DATA, id), 1)
            break

        default:
            switch(id.slice(0, 2)){
                case 'ch':
                    IN_CASH_DATA.splice(checkId(IN_CASH_DATA, id), 1)  
                    break
                case 'cd':
                    IN_CARD_DATA.splice(checkId(IN_CARD_DATA, id), 1)  
                    break
            }
    }
    
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
        elevation: 2,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderBottomWidth: 0.3,
    },

    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#A1E3D8',
        marginRight: 10,
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