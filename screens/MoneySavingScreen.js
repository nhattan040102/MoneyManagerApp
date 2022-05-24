import { React } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import SavingGoalCard from '../components/SavingGoalCard';
import AddGoalBtn from '../components/AddGoalBtn';
import AchievedGoalCard from '../components/AchievedGoalCard';


const SavingScreen = props => {
    return (
        <SafeAreaView style={styles.screen}>
            {/* View for adding new saving goal */}
            <View style={styles.AddGoalView}>
                <View style={styles.GoalBtn}>
                    <AddGoalBtn></AddGoalBtn>
                </View>

            </View>

            {/* View for displaying current saving goal info */}
            <View style={styles.CurrentGoalView}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>CURRENT GOAL</Text>
                </View>
                <SavingGoalCard />
            </View>

            {/* View for displaying your saving goal that have been achieved  */}
            <View style={styles.PastGoalView}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>DONE</Text>
                </View>
                <AchievedGoalCard />
            </View>
        </SafeAreaView>
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
    },

    title: {
        width: '100%',
        alignItems: 'flex-start',
        padding: 10,
    },

    titleText: {
        fontSize: FONTSIZE.header1
    },

    GoalBtn: {
        alignItems: 'flex-end',
        marginRight: 15,
    },

    AddGoalView: {
        height: '10%',
        width: '100%',
        justifyContent: 'center',

        // backgroundColor: 'red'
    },

    CurrentGoalView: {
        height: '30%',
        width: '100%',
        alignItems: 'center',
        paddingTop: 15,
    },

    PastGoalView: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingTop: 15,
    }
})

export default SavingScreen;