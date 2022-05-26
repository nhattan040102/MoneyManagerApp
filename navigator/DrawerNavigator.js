import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import Navigator from "./AppNavigator";
import TransactionScreen from "../screens/TransactionScreen";
import { TransactionsStackNavigator } from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Đăng nhập" component={LoginScreen} />
            {/* <Drawer.Screen name="Đăng ký" component={TransactionScreen} /> */}
            <Drawer.Screen name="Home" component={Navigator} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
