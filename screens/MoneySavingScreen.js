import { React } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SavingScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Saving Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SavingScreen;