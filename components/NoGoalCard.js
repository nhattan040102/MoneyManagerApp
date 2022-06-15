import { React } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import * as Progress from 'react-native-progress';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const NoGoalCard = props => {
    return (
        <View style={styles.container} >
            <Image source={require('../icon/finance.png')} />
            <Text style={{ padding: 10, fontSize: FONTSIZE.header2, fontWeight: 'bold', color: 'rgb(12,60,78)' }}>NO GOAL YET.</Text>
            <Text style={{ fontSize: FONTSIZE.body, fontWeight: '500', color: 'rgb(12,60,78)' }}>Let's saving money by create new goal!!!</Text>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: '90%',
        padding: 10,
        borderColor: 'rgb(12,60,78)',
        borderWidth: 3,
        // justifyContent: 'center',
        alignItems: 'center'

    }
});

export default NoGoalCard;