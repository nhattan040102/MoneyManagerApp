import { React } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONTSIZE } from '../constants/constants';

const SavingScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Saving Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    text: {
        fontSize: FONTSIZE.header1,
    }
})

export default SavingScreen;