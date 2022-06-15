<<<<<<< HEAD
import { React } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import ExpenseLimit from '../components/ExpenseLimit';
=======
import { React } from "react";
import { View, Text, StyleSheet, StatusBar, Platform } from "react-native";
import ExpenseLimit from "../components/ExpenseLimit";
>>>>>>> ebc03bf47730def1417fa934147f20eff0d96c30

const MoneyLimitScreen = (props) => {
    return (
        <View style={styles.screen}>
            <ExpenseLimit />
        </View>
    );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }
})
=======
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
>>>>>>> ebc03bf47730def1417fa934147f20eff0d96c30

export default MoneyLimitScreen;
