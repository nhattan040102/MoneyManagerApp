import { React, useState } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet, Alert } from "react-native";
import TransactionInput from "../components/TransactionInput";
import { AddTransactionToFirebase } from "../Helper/firebaseAPI";

const TransactionInputScreen = props => {
    const [input, setInput] = useState(null);
    const createHandler = (input) => {

        AddTransactionToFirebase(input);
    }

    // onCreate = {(input) => createHandler(input)}
    return (
        <View style={{ alignItems: 'center' }}>
            <TransactionInput onClose={() => props.navigation.navigate("Giao dịch")} onCreate={(input) => {
                createHandler(input)
                Alert.alert(
                    "Thông báo",
                    "Đã thêm vào một giao dịch",
                    [
                        {
                            text: "Quay lại trang chủ",
                            onPress: () => props.navigation.navigate("Giao dịch", {
                                "trigger": "true"
                            })
                        },

                    ]
                )

            }} />
        </View>
    )
}

export default TransactionInputScreen;