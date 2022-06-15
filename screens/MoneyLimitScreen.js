<<<<<<< HEAD
import { React } from "react";
import { View, Text, StyleSheet } from "react-native";
import ExpenseLimit from "../components/ExpenseLimit";
=======
import { React } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import NoBudgetLimitCard from '../components/NoBudgetLimitCard';
>>>>>>> 1c7056ee1143baf2ac30264cabd640fa21121176

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
    justifyContent: "center",
    alignItems: "center",
  },
});
=======
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }
})
>>>>>>> 1c7056ee1143baf2ac30264cabd640fa21121176

export default MoneyLimitScreen;
