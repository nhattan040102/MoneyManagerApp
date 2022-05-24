import { React } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>TransactionScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default TransactionScreen;