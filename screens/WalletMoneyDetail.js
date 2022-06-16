import { useEffect, React } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { FONTSIZE } from "../constants/constants";
import { formatMoney } from "../Helper/helpers";

const WalletMoneyDetail = (props) => {
    return (<View>
        <View style={{ flexDirection: "column", padding: 10, marginBottom: 10, width: '100%' }}>
            <View style={{ flexDirection: "row", padding: 10 }}>
                <Image source={require('../icon/purse.png')} />
                <Text style={{ fontSize: FONTSIZE.header1 }}>  Ví tổng</Text>
            </View>

            <Text style={{ fontSize: FONTSIZE.header1 }}>  {formatMoney(30000)} VND</Text>
        </View>

        <View style={{ flexDirection: "column", padding: 10, marginBottom: 10, width: '100%' }}>
            <View style={{ flexDirection: "row", padding: 10 }}>
                <Image source={require('../icon/money-2.png')} />
                <Text style={{ fontSize: FONTSIZE.header1 }}>  Ví tiền mặt</Text>
            </View>
            <Text style={{ fontSize: FONTSIZE.header1 }}>  {formatMoney(30000)} VND</Text>
        </View>

        <View style={{ flexDirection: "column", padding: 10, marginBottom: 10, width: '100%' }}>
            <View style={{ flexDirection: "row", padding: 10 }}>
                <Image source={require('../icon/debit-card.png')} />
                <Text style={{ fontSize: FONTSIZE.header1 }}>  Ví điện tử /ngân hàng</Text>
            </View>

            <Text style={{ fontSize: FONTSIZE.header1 }}>  {formatMoney(30000)} VND</Text>
        </View>
    </View>)
}

const styles = StyleSheet.create({

});

export default WalletMoneyDetail;