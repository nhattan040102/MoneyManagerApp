import { React, useLayoutEffect } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet, Platform, StatusBar, Alert } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { deleteTransaction } from "../Helper/firebaseAPI";
import { FONTSIZE } from "../constants/constants";
import { formatMoney } from "../Helper/helpers";


const TransactionDetailScreen = props => {
    const item = props.route.params.item;
    const [day, month, year, hour, minute] = [item.dateCreated.toDate().getDate(), item.dateCreated.toDate().getMonth() + 1, item.dateCreated.toDate().getFullYear(), item.dateCreated.toDate().getHours(), item.dateCreated.toDate().getMinutes()]

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    {
                        {
                            Alert.alert(
                                'Xóa giao dịch',
                                'Bạn chắc chắn muốn xóa giao dịch này?',
                                [
                                    { text: 'Hủy' },
                                    {
                                        text: 'Xóa', onPress: () => {
                                            deleteTransaction(props.route.params.item)
                                            props.navigation.goBack();
                                        }
                                    }
                                ]
                            )
                        }

                    }
                }}>
                    <MaterialIcons name="delete" size={30} color="white" />
                </TouchableOpacity>
            )
        });
    }, [props.navigation]);
    return (
        <View style={styles.screen}>
            <View style={styles.detailView}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, }}>
                    <Image source={require('../icon/wage.png')} />
                    <Text style={styles.inputTitle}>Số tiền</Text>
                    <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 20 }}>
                        <Text style={{ fontSize: FONTSIZE.body }}>{formatMoney(item.moneyValue)} VND</Text>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, }}>
                    <Image source={item.categoryValue.img} />
                    <Text style={styles.inputTitle}>Hạng mục</Text>
                    <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 20 }}>
                        <Text style={{ fontSize: FONTSIZE.body }}>{item.categoryValue.title}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, }}>
                    <Image source={require('../icon/purse.png')} />
                    <Text style={styles.inputTitle}>Loại ví</Text>
                    <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 20 }}>
                        <Text style={{ fontSize: FONTSIZE.body }}>{item.walletValue}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, }}>
                    <Image source={require('../icon/calendar.png')} />
                    <Text style={styles.inputTitle}>Thời điểm</Text>
                    <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 20 }}>
                        <Text style={{ fontSize: FONTSIZE.body }}>{day}/{parseInt(month) + 1}/{year} {hour}:{minute}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, }}>
                    <Image source={require('../icon/notes.png')} />
                    <Text style={styles.inputTitle}>Ghi chú</Text>
                    <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 20 }}>
                        <Text style={{ fontSize: FONTSIZE.body }}>{item.note}</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: '100%',
        alignItems: 'center'
    },

    detailView: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 20,
        width: '85%',
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 1,
        shadowOpacity: 0.4,
        elevation: 4,
        borderRadius: 5,

        padding: 15,
    },

    inputTitle: {
        fontSize: FONTSIZE.body,
        fontWeight: '500',
        paddingLeft: 5,
    }

})

export default TransactionDetailScreen;