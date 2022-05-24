import { React } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MoneyLimitScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Money Limit Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MoneyLimitScreen;