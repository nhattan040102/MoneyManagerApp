import { React } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AddGoalBtn = props => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => props.onPress()}>
            <Text style={styles.text}>+</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: 'rgb(252,71,33)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 0.6,
        elevation: 0.6
    },

    text: {
        fontSize: 50,
        fontWeight: '300',
        color: 'white',

    }
});

export default AddGoalBtn;