// src/components/FinanceBarChart.js
import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { FONTSIZE } from '../constants/constants';

const screenWidth = Dimensions.get('window').width;

function FinanceBarChart({ title, fillShadowGradient, data }) {
    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#fff',
        backgroundGradientToOpacity: 0.5,

        fillShadowGradient,
        fillShadowGradientOpacity: 1,
        color: (opacity = 1) => `#023047`,
        labelColor: (opacity = 1) => `#333`,
        strokeWidth: 2,

        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        decimalPlaces: 0,
    };

    const labels = data.map(item => {
        return item.label;
    });

    const values = data.map(item => {
        return item.value;
    });

    const chartData = {
        labels,
        datasets: [
            {
                data: values,
            },
        ],
    };

    return (
        <View style={styles.container}>
            {/* <View style={styles.titleContainer}>
                <Text style={{ fontSize: FONTSIZE.header2, color: 'rgb(45,139, 126)' }}>{title}</Text>
            </View> */}
            <ScrollView horizontal={true} contentContainerStyle={{ paddingRight: 100 }}>
                <BarChart
                    data={chartData}
                    width={800}
                    height={220}
                    chartConfig={chartConfig}
                    showBarTops={false}
                />
            </ScrollView>
        </View>



    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    titleContainer: {
        width: '100%',
        alignItems: 'center',
    },
});

export default FinanceBarChart;