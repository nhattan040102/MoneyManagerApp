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

{/* configuring for style default header stack navigators */ }
const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#rgb(45,139, 126)",

    },
    headerTintColor: "white",
    headerBackTitle: "Quay lại",
    headerShadowVisible: false,
};




{/* configuring screen related to "Giao dịch" tab */ }
function TransactionsStackNavigator() {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Giao dịch" component={TransactionScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

{/* configuring screen related to "Chế độ tiết kiệm" tab */ }
function SavingStackNavigator() {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Chế độ tiết kiệm" component={SavingScreen} options={{ headerShown: false }} />
            <Stack.Screen
                name="Chi tiết"
                component={SavingDetailScreen}

            />
            <Stack.Screen name="Thống kê" component={ReportScreen} />
        </Stack.Navigator>
    );
}

{/* configuring screen related to "Thống kê" tab */ }
function ReportStackNavigator() {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Thống kê" component={ReportScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

{/* configuring screen related to "Giới hạn chi tiêu" tab */ }
function ExpenseControlStackNavigator() {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Giới hạn chi tiêu" component={MoneyLimitScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}

export { SavingStackNavigator, ReportStackNavigator, ExpenseControlStackNavigator, TransactionsStackNavigator }