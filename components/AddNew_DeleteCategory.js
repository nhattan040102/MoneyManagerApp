import {EXPENSE_DATA, INCOME_DATA , SAVING_DATA, IN_CARD_DATA, IN_CASH_DATA} from '../model/data'
import { Alert, View, Text, Button, TextInput} from 'react-native';
import React, {useState} from 'react';
import CategoryCard from './CategoryCard';


export const AddNewCategory = props =>{
    const [newCate, setNewCate] = useState(null);
    const [runAddition, setRunAddition] = useState(false)
  
    return (
        // 'JUST TESTING'
        <View style={{}}>
            <TextInput
                style = {{minTop: '5%', minHeight: '10%'}}
                Value = {newCate}
                placeholder='Vui lòng gõ nội dung muốn thêm tại đây'
                onChangeText={(text)=>{setNewCate(text)}}
            />
            <Button 
                style = {{color: 'green'}}
                onPress = {(newCate)=>{Alert.alert( 'Thông báo', 
                                                    'Bạn chắc chắn muốn thêm một nội dung mới vào ' + props.addType + ' chứ', [
                                                    {text: 'Hủy', onPress: ()=>{}},
                                                    {text: 'OK', onPress: ()=>{ setRunAddition(true)}}
                ])}}
                title = 'Thêm mới'/>

            {runAddition?<AddNewCate 
                            onPress = {()=>props.onPress()} 
                            addType = {props.addType} 
                            newCate = {newCate}
                            onReturn =  {()=>setRunAddition(false)}
                            />:null }
        </View>
  
    );
        
}
const AddNewCate = props =>{

    console.log('I am in data')
    console.log('the addType is: ' + props.addType)
    console.log('the newCate is: ' + props.newCate )
  
    switch(props.addType) {
        case 'TIẾT KIỆM':
            SAVING_DATA.push(
                {
                    id: 's' + (parseInt(SAVING_DATA[SAVING_DATA.length-1].id.slice(1)) + 1).toString(),
                    title: props.newCate,
                    img: require("../icon/new.png"),
                    type: "-",
                }   
            );
            break;
  
        case 'CHI TIÊU':
            EXPENSE_DATA.push(
            {
                id: 'e' + (parseInt(EXPENSE_DATA[EXPENSE_DATA.length-1].id.slice(1)) + 1).toString(),
                title: props.newCate,
                img: require("../icon/new.png"),
                icon: '',
                type: "-",
                color: '',
                expenses: [],
            });
            break;
  
        case 'THU NHẬP':
            INCOME_DATA.push(
                {
                    id: 'i' + (parseInt(INCOME_DATA[INCOME_DATA.length-1].id.slice(1)) + 1).toString(),
                    title: props.newCate,
                    img: require("../icon/new.png"),
                    type: "+",
                }
            );
            break;
  
        case 'TIỀN MẶT':
            IN_CASH_DATA.push(
                {
                    id: 'ch' + (parseInt(IN_CASH_DATA[IN_CASH_DATA.length-1].id.slice(2)) + 1).toString(),
                    title: props.newCate,
                    img: require("../icon/new.png"),
                }
            );
            break;
  
        case 'VÍ ĐIỆN TỬ':
            IN_CARD_DATA.push(
                {
                    id: 'cd' + (parseInt(IN_CARD_DATA[IN_CARD_DATA.length-1].id.slice(2)) + 1).toString(),
                    title: props.newCate,
                    img: require("../icon/new.png"),
                },
            )
            break;
    }
    return (
      <View>
        {Alert.alert(   'Thành công', 
                        'Chúc mừng bạn đã thêm thành công vào ' + props.addType, 
                        [{text: 'OK', onPress: ()=>{props.onReturn()
                                                    props.onPress()}}])}
      </View>
    )
  };

  
//   The DELETE FUNCTION is built in CategoryCard
export const DeleteCategory = props =>{
    console.log(' I am in Del, id is :'+ props.id)
    return (
        Alert.alert('Yep', 'HI')
    )
}
export default AddNewCategory ;



    


