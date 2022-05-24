import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import MoneyLimitScreen from '../screens/MoneyLimitScreen';
import SavingScreen from '../screens/MoneySavingScreen';
import ReportScreen from '../screens/ReportScreen';
import TransactionScreen from '../screens/TransactionScreen';


const Tab = createBottomTabNavigator();

const Navigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let url;

                        if (route.name === 'Transactions')
                            url = require('../icon/transaction.png');
                        else if (route.name === 'Report')
                            url = require('../icon/pie-chart.png');
                        else if (route.name === 'Saving')
                            url = require('../icon/save-money.png');
                        else if (route.name === 'Expense limit')
                            url = require('../icon/limited.png');

                        // You can return any component that you like here!
                        return <Image
                            source={url}
                            style={[styles.icon, { tintColor: color }]}

                        />;
                    },
                    tabBarActiveTintColor: 'blue',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Transactions" component={TransactionScreen} />
                <Tab.Screen name="Report" component={ReportScreen} />
                <Tab.Screen name="Saving" component={SavingScreen} />
                <Tab.Screen name="Expense limit" component={MoneyLimitScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    icon: {
        // tintColor: 'gray',
        height: 25,
        width: 25,
    }
});

export default Navigator;


