import { React } from "react";
import { View, Text, StyleSheet, StatusBar, Platform } from "react-native";
import ExpenseLimit from "../components/ExpenseLimit";

const MoneyLimitScreen = (props) => {
    return (
        <View style={styles.screen}>
            <ExpenseLimit />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
});

export default MoneyLimitScreen;
