import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet, Platform } from 'react-native';
import { SavingStackNavigator, ExpenseControlStackNavigator, ReportStackNavigator, TransactionsStackNavigator } from './StackNavigator';
import TransactionInputScreen from '../screens/TransactionInputScreen';

const Tab = createBottomTabNavigator();

const getTabBarVisibility = (route) => {
    const routeName = route.state
        ? route.state.routes[route.state.index].name
        : '';

    if (routeName === 'Nhập giao dịch') {
        return false;
    }

    return true;
}

const Navigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let url;

                    if (route.name === 'Quản lý')
                        url = require('../icon/refund.png');
                    else if (route.name === 'Báo cáo')
                        url = require('../icon/pie-chart.png');
                    else if (route.name === 'Tiết kiệm')
                        url = require('../icon/save-money.png');
                    else if (route.name === 'Hạn chế')
                        url = require('../icon/money-bag.png');

                    //return icon for each tab navgiator
                    return <Image
                        source={url}
                        style={[styles.icon, { tintColor: color }]}

                    />;
                },

                // Style tab navigator
                headerShown: false,

                tabBarActiveTintColor: 'rgb(73,139,134)',
                tabBarInactiveTintColor: 'rgb(200,200,200)',
                tabBarLabelStyle: {
                    fontSize: 12,
                    paddingBottom: 5,
                },
            })}
        >

            {/* Add tab navigator here!! */}
            <Tab.Screen name="Quản lý" component={TransactionsStackNavigator} options={({ route }) => ({
                // tabBarStyle: { display: this.getTabBarVisibility(route) ? 'none' : ''}
            })} />
            <Tab.Screen name="Báo cáo" component={ReportStackNavigator} />
            <Tab.Screen name="Tiết kiệm" component={SavingStackNavigator} />
            <Tab.Screen name="Hạn chế" component={ExpenseControlStackNavigator} />


        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    icon: {
        height: 30,
        width: 30,
    }
});

export default Navigator;


