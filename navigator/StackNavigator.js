import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import MoneyLimitScreen from '../screens/MoneyLimitScreen';
import SavingScreen from '../screens/MoneySavingScreen';
import ReportScreen from '../screens/ReportScreen';
import TransactionScreen from '../screens/TransactionScreen';
import SavingDetailScreen from '../screens/MoneySavingDetail';



const Stack = createNativeStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#rgb(45,139, 126)",

    },
    headerTintColor: "white",
    headerBackTitle: "Quay lại",
    headerShadowVisible: false,
};



function TransactionsStackNavigator() {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Giao dịch" component={TransactionScreen} />
        </Stack.Navigator>
    );
}

function SavingStackNavigator() {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Chế độ tiết kiệm" component={SavingScreen} />
            <Stack.Screen
                name="Chi tiết"
                component={SavingDetailScreen}
            />
            <Stack.Screen name="Thống kê" component={ReportScreen} />
        </Stack.Navigator>
    );
}

function ReportStackNavigator() {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Thống kê" component={ReportScreen} />
        </Stack.Navigator>
    );
}


function ExpenseControlStackNavigator() {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Giới hạn chi tiêu" component={MoneyLimitScreen} />

        </Stack.Navigator>
    );
}

export { SavingStackNavigator, ReportStackNavigator, ExpenseControlStackNavigator, TransactionsStackNavigator }