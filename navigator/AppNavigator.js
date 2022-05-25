import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet } from 'react-native';
import MoneyLimitScreen from '../screens/MoneyLimitScreen';
import SavingScreen from '../screens/MoneySavingScreen';
import ReportScreen from '../screens/ReportScreen';
import TransactionScreen from '../screens/TransactionScreen';
import SavingDetailScreen from '../screens/MoneySavingDetail';
import { SavingStackNavigator, ExpenseControlStackNavigator, ReportStackNavigator, TransactionsStackNavigator } from './StackNavigator';


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


                    headerShown: false,
                    tabBarStyle: {
                        height: 100,
                        position: 'absolute',
                        // bottom: 16,
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

                    },
                    tabBarActiveTintColor: 'rgb(73,139,134)',
                    tabBarInactiveTintColor: 'rgb(200,200,200)',
                    tabBarLabelStyle: {
                        fontSize: 16
                    },
                })}
            >

                {/* Add tab navigator here!! */}
                <Tab.Screen name="Transactions" component={TransactionsStackNavigator} />
                <Tab.Screen name="Report" component={ReportStackNavigator} />
                <Tab.Screen name="Saving" component={SavingStackNavigator} />
                <Tab.Screen name="Expense limit" component={ExpenseControlStackNavigator} />


            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    icon: {
        // tintColor: 'gray',
        height: 30,
        width: 30,
    }
});

export default Navigator;


