import { React } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import TransactionInput from "../components/TransactionInput";
import { AddTransactionToFirebase } from "../Helper/firebaseAPI";

const TransactionInputScreen = props => {
    const createHandler = (input) => {
        AddTransactionToFirebase(input);
    }

    // onCreate = {(input) => createHandler(input)}
    return (
        <View style={{ alignItems: 'center' }}>
            <TransactionInput onClose={() => props.navigation.navigate("Giao dịch")} onCreate={(input) => {
                createHandler(input)
                props.navigation.navigate("Giao dịch", { "trigger": "true" })
            }} />
        </View>
    )
}

export default TransactionInputScreen;