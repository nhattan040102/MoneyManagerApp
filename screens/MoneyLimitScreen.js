import { React } from "react";
import { View, Text, StyleSheet } from "react-native";
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
  },
});

export default MoneyLimitScreen;
