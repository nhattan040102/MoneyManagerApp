import { React } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NoBudgetLimitCard from '../components/NoBudgetLimitCard';

const MoneyLimitScreen = props => {
    return (
        <View style={styles.screen}>
            <NoBudgetLimitCard />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default MoneyLimitScreen;