import { React } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FONTSIZE } from '../constants/constants';

const CategoryCard = props => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => props.onPress()}>
            <View style={styles.icon}>
                <Image source={props.img} />
            </View>

            <View style={styles.title}>
                <Text style={{ fontSize: FONTSIZE.header2 }}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 5,
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 0.2,
        elevation: 0.2,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 5,
    },

    icon: {
        width: '15%',
        justifyContent: 'center',
        padding: 10,
        // alignItems: 'center',
    },

    title: {
        width: '90%',
        justifyContent: 'center',
        // alignItems: 'center',
    },
})

export default CategoryCard;