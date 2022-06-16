import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLayoutEffect } from 'react';
import MoneyLimitScreen from '../screens/MoneyLimitScreen';
import SavingScreen from '../screens/MoneySavingScreen';
import ReportScreen from '../screens/ReportScreen';
import TransactionScreen from '../screens/TransactionScreen';
import SavingDetailScreen from '../screens/MoneySavingDetail';
import TransactionDetailScreen from '../screens/TransactionDetail';
import TransactionInputScreen from '../screens/TransactionInputScreen';
import DeletedTransactionScreen from '../screens/DeletedTransactionScreen';
import WalletMoneyDetail from '../screens/WalletMoneyDetail';


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
function TransactionsStackNavigator({ navigation, route }) {
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "Nhập giao dịch") {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({
                tabBarStyle: {
                    display: 'flex', height: Platform.OS === 'ios' ? '10%' : '8%',
                    position: 'absolute',
                    backgroundColor: 'rgb(255,255,255)',
                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 0,
                        height: 1
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.2,
                    paddingLeft: 2,
                    paddingRight: 2,
                    zIndex: 2,
                }
            });
        }
    }, [navigation, route]);
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Giao dịch" component={TransactionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Nhập giao dịch" component={TransactionInputScreen} />
            <Stack.Screen name="Chi tiết giao dịch" component={TransactionDetailScreen} />
            <Stack.Screen name="Chi tiết ví" component={WalletMoneyDetail} />
            <Stack.Screen name="Giao dịch đã xóa" component={DeletedTransactionScreen} />

        </Stack.Navigator>
    );
}

TransactionsStackNavigator.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if (routeName == 'Nhập giao dịch') {
        tabBarVisible = false
    }

    return {
        tabBarVisible,
    }
}

{/* configuring screen related to "Chế độ tiết kiệm" tab */ }
function SavingStackNavigator({ navigation, route }) {
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "Chi tiết") {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({
                tabBarStyle: {
                    display: 'flex', display: 'flex', height: Platform.OS === 'ios' ? '10%' : '8%',
                    position: 'absolute',
                    backgroundColor: 'rgb(255,255,255)',
                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 0,
                        height: 1
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.2,
                    paddingLeft: 2,
                    paddingRight: 2,
                    zIndex: 2,
                }
            });
        }
    }, [navigation, route]);
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Chế độ tiết kiệm" component={SavingScreen} options={{ headerShown: false }} />
            <Stack.Screen
                name="Chi tiết"
                component={SavingDetailScreen}

            />
        </Stack.Navigator>
    );
}

{/* configuring screen related to "Thống kê" tab */ }
function ReportStackNavigator({ navigation, route }) {
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "") {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({
                tabBarStyle: {
                    display: 'flex', display: 'flex', height: Platform.OS === 'ios' ? '10%' : '8%',
                    position: 'absolute',
                    backgroundColor: 'rgb(255,255,255)',
                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 0,
                        height: 1
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.2,
                    paddingLeft: 2,
                    paddingRight: 2,
                    zIndex: 2,
                }
            });
        }
    }, [navigation, route]);
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Thống kê" component={ReportScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}

{/* configuring screen related to "Giới hạn chi tiêu" tab */ }
function ExpenseControlStackNavigator({ navigation, route }) {
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "Chi tiết") {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({
                tabBarStyle: {
                    display: 'flex', display: 'flex', height: Platform.OS === 'ios' ? '10%' : '8%',
                    position: 'absolute',
                    backgroundColor: 'rgb(255,255,255)',
                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 0,
                        height: 1
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.2,
                    paddingLeft: 2,
                    paddingRight: 2,
                    zIndex: 2,
                }
            });
        }
    }, [navigation, route]);
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Giới hạn chi tiêu" component={MoneyLimitScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}

export { SavingStackNavigator, ReportStackNavigator, ExpenseControlStackNavigator, TransactionsStackNavigator }