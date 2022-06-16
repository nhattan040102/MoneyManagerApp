// src/components/FinancePieChart.js

import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

import { PieChart } from 'react-native-chart-kit';
import { FONTSIZE } from '../constants/constants';

// import Legend from './Legend';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
};


function FinancePieChart({ title, data }) {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ fontSize: FONTSIZE.header2, color: 'rgb(45,139, 126)' }}>{title}</Text>
            </View>

            <View style={styles.bodyContainer}>
                <View style={styles.chartContainer}>
                    <PieChart
                        data={data}
                        width={screenWidth}
                        height={200}
                        chartConfig={chartConfig}
                        accessor={"value"}
                        backgroundColor={'transparent'}
                        center={[0, 0]}
                        hasLegend={true}
                    // avoidFalseZero={true}
                    />
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    bodyContainer: {
        flexDirection: 'row',
    },
    chartContainer: {
        flex: 1,
    },
    legendContainer: {
        flex: 1,
        marginTop: 20,
    },
});

export default FinancePieChart;