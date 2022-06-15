import { React } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import * as Progress from 'react-native-progress';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const NoCompletedGoals = props => {
    return (
        <View style={styles.container} >
            <Image source={require('../icon/no-goal.png')} />
            <Text style={{ paddingVertical: 10, fontSize: FONTSIZE.header2, fontWeight: 'bold', color: 'rgb(12,60,78)' }}>HỪM CHƯA TÌM THẤY MỤC TIÊU NÀO HOÀN THÀNH...</Text>
            <Text style={{ fontSize: FONTSIZE.body, fontWeight: '500', color: 'rgb(12,60,78)', textAlign: 'center' }}>Không sao cả, đừng từ bỏ và cố gắng hoàn thành mục tiêu của mình!!!</Text>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        borderColor: 'rgb(12,60,78)',
        borderWidth: 3,
        // justifyContent: 'center',
        alignItems: 'center'

    }
});

export default NoCompletedGoals;