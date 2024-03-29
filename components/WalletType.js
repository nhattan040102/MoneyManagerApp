import { React, useState, } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button, Alert, TouchableOpacity, FlatList } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import CategoryCard from './CategoryCard';
import { IN_CARD_DATA, IN_CASH_DATA } from '../model/data';


const WalletType = props => {
    const [cateType, setCateType] = useState('TIỀN MẶT');
    const DATA = cateType == 'TIỀN MẶT' ? IN_CASH_DATA : IN_CARD_DATA;
    const renderItem = ({ item }) => {
        console.log(item);
        return <CategoryCard img={item.img} title={item.title} onPress={() => props.choseItem(item.title)} />;
    }

    return (

        <View style={styles.container}>
            <View style={{ position: 'absolute', right: 0, top: '-10%'}}>
                <Button title=" Thoát " 
                onPress={() => props.onClose()}
                color = 'green'/>
            </View>
            <View style={{ height: '15%', flexDirection: 'row', justifyContent: 'space-around', padding: 10, }}>
                <TouchableOpacity style={[styles.category_types, { borderBottomWidth: cateType == "TIỀN MẶT" ? 3 : 0 }]} onPress={() => setCateType('TIỀN MẶT')}>
                    <Text
                        style={[{ fontSize: FONTSIZE.header1 }, { color: cateType == "TIỀN MẶT" ? 'rgb(45,139, 126)' : 'gray' }]} S
                    >
                        Tiền Mặt
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity style={[styles.category_types, { borderBottomWidth: cateType == "VÍ ĐIỆN TỬ" ? 3 : 0 }]} onPress={() => setCateType('VÍ ĐIỆN TỬ')}>
                    <Text
                        style={[{ fontSize: FONTSIZE.header1 }, { color: cateType == "VÍ ĐIỆN TỬ" ? 'rgb(45,139, 126)' : 'gray' }]}
                    >
                        Thẻ
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Display list of item  */}
            <View>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 50 }}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '50%',
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