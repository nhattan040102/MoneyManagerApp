import { React, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import { Entypo } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import FinancePieChart from '../components/PieChart';
import FinanceBarChart from '../components/BarChart';
import { getMonthExpense, getMonthIncome, getTransactionByExpense, getTransactionByIncome, getTransactionByType } from '../Helper/firebaseAPI';

const data = [
    {
        name: "Seoul",
        population: 0,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Toronto",
        population: 2800000,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Beijing",
        population: 527612,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "New York",
        population: 8538000,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Moscow",
        population: 11920000,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }
];

const data2 = [
    {
        label: "Tháng 1",
        value: 20,

    },
    {
        label: "Tháng 2",
        value: 2800000,
    },

    {
        label: "Tháng 3",
        value: 20,

    },
    {
        label: "Tháng 4",
        value: 2800000,
    },

    {
        label: "Tháng 5",
        value: 20,

    },
    {
        label: "Tháng 6",
        value: 2800000,
    },

    {
        label: "Tháng 7",
        value: 2800000,
    },

    {
        label: "Tháng 8",
        value: 20,

    },
    {
        label: "Tháng 9",
        value: 2800000,
    },

    {
        label: "Tháng 10",
        value: 20,

    },
    {
        label: "Tháng 11",
        value: 2800000,
    },

];

const ReportScreen = props => {
    const [currentState, setCurrentState] = useState('COLUMN CHART');
    const [typeData, setTypeData] = useState([])
    const [expenseData, setExpenseData] = useState([])
    const [incomeData, setIncomeData] = useState([])
    const [monthExpense, setMonthExpense] = useState([])
    const [monthIncome, setMonthIncome] = useState([])


    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getTransactionByType(setTypeData);
            getTransactionByExpense(setExpenseData);
            getTransactionByIncome(setIncomeData);
            getMonthExpense(setMonthExpense)
            getMonthIncome(setMonthIncome);
        })

        return unsubscribe;

        // setDeleteTrigger(false);
    }, [props.navigation]);


    return (
        <View style={styles.screen}>

            {/* view for displaying header bar: COLUMN CHAT and PIE CHART */}
            <SafeAreaView style={styles.headerBar}>
                <TouchableOpacity
                    style={styles.category}
                    onPress={() => setCurrentState('COLUMN CHART')}
                >
                    <Entypo name="bar-graph" size={FONTSIZE.header2} color="white" />
                    <Text style={[styles.cate_text]}>BIỂU ĐỒ CỘT</Text>
                    <View style={{ width: '98%', borderWidth: currentState == "COLUMN CHART" ? 2 : 0, borderColor: '#00C897', position: 'absolute', bottom: -3 }}></View>
                </TouchableOpacity>
                <View style={{ width: 0.25, backgroundColor: 'white' }}></View>
                <TouchableOpacity
                    style={styles.category}
                    onPress={() => setCurrentState('PIE CHART')}
                >
                    <Foundation name="graph-pie" size={FONTSIZE.header2} color="white" />
                    <Text style={[styles.cate_text]}>BIỂU ĐỒ TRÒN</Text>
                    <View style={{ width: '98%', borderWidth: currentState == "PIE CHART" ? 2 : 0, borderColor: '#00C897', position: 'absolute', bottom: -3 }}></View>
                </TouchableOpacity>
            </SafeAreaView>
            <View style={{ marginTop: 20, padding: 10, }}>
                {
                    currentState == "PIE CHART" ? <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                        <FinancePieChart title={"Loại giao dịch"} data={typeData} />
                        <FinancePieChart title={"Chi tiêu"} data={expenseData} />
                        <FinancePieChart title={"Thu nhập"} data={incomeData} />
                    </ScrollView> : <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Text style={{ fontSize: FONTSIZE.header2, color: '#3BACB6', fontWeight: '500' }}>Chi tiêu hàng tháng</Text>
                        </View>

                        <FinanceBarChart title={"Chi tiêu hàng tháng"} fillShadowGradient={"#3BACB6"} data={monthExpense} />


                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Text style={{ fontSize: FONTSIZE.header2, color: '#2F8F9D', fontWeight: '500' }}>Chi tiêu hàng tháng</Text>
                        </View>
                        <FinanceBarChart title={"Thu nhập hàng tháng"} fillShadowGradient={"#2F8F9D"} data={monthIncome} />

                    </ScrollView>
                }
            </View>




        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: '100%',

    },

    headerBar: {
        width: '100%',
        backgroundColor: 'rgb(45,139, 126)',
        flexDirection: 'row',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },

    category: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    cate_text: {
        fontSize: FONTSIZE.header2,
        fontWeight: '500',
        color: 'white',
        padding: 5,
    }
})

export default ReportScreen;