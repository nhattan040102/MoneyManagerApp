import { React, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, Alert, SafeAreaView, Platform, StatusBar } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import SavingGoalCard from '../components/SavingGoalCard';
import AddGoalBtn from '../components/AddGoalBtn';
import AchievedGoalCard from '../components/AchievedGoalCard';
import SavingInputModal from '../components/SavingInputModal';
import NoGoalCard from '../components/NoGoalCard';
import { AddSavingGoalToFirebase, loadSavingGoalData, deleteSavingGoal, loadDoneSavingGoal } from '../Helper/firebaseAPI';
import { auth } from '../firebase';


const SavingScreen = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const [goalState, setGoalState] = useState(false);
    const [currentGoalInput, setCurrentGoalInput] = useState(null);
    const [completedGoals, setCompletedGoals] = useState([])
    const [renderTrigger, setRenderTrigger] = useState(false);

    {/* render item for flatlist */ }
    const renderItem = ({ item }) => (
        <AchievedGoalCard item={item} onPress={() => props.navigation.navigate('Chi tiết', { data: item })} />
    );

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            loadSavingGoalData(setCurrentGoalInput, setGoalState);
            loadDoneSavingGoal(setCompletedGoals);
        })

        return unsubscribe;

        // setDeleteTrigger(false);
    }, [props.route]);

    {/* function to close saving goal input modal*/ }
    const closeHandler = () => {
        setModalVisible(false);
    }

    {/* function to add saving goal */ }
    const createHandler = (input) => {
        setModalVisible(false);
        AddSavingGoalToFirebase(input);
    }

    {/* function to open saving goal input modal */ }
    const addGoalHandler = () => {
        if (goalState == true) {
            Alert.alert(
                "Tin nhắn hệ thống",
                "Đã tồn tại chế độ tiết kiệm, không thể cùng lúc đặt quá một mục tiêu!",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("OK Pressed"),
                    },
                ]
            );
            return;
        }

        setModalVisible(true);
    }

    {/* if there is'nt a goal, display no goal card, else display current saving goal card */ }
    const GoalComponent = goalState == true ? <SavingGoalCard item={currentGoalInput} onPress={() => props.navigation.navigate('Chi tiết', { data: currentGoalInput })} /> : <NoGoalCard />;


    return (
        <SafeAreaView style={styles.screen}>

            {/* View for adding new saving goal */}
            <View style={styles.GoalBtn}>
                <AddGoalBtn onPress={() => addGoalHandler()}></AddGoalBtn>
            </View>

            {/* Modal View */}
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={modalVisible}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                    <SavingInputModal
                        onClose={() => closeHandler()}
                        onCreate={input => createHandler(input)}

                    />
                </View>
            </Modal>


            {/* View for displaying current saving goal info */}
            <View style={styles.CurrentGoalView}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>CURRENT GOAL</Text>
                </View>
                {GoalComponent}


            </View>

            {/* View for displaying your saving goal that have been achieved  */}
            <View style={styles.PastGoalView}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>COMPLETED GOALS</Text>
                </View>

                <View style={{ width: '90%' }}>
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 120 }}
                        data={completedGoals}
                        renderItem={renderItem}
                        keyExtractor={item => item.date.toDate()}
                    />
                </View>

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },


    title: {
        width: '100%',
        alignItems: 'flex-start',
        padding: 10,
    },

    titleText: {
        fontSize: FONTSIZE.header2,
        fontWeight: '600',
    },

    GoalBtn: {
        alignItems: 'flex-end',
        position: 'absolute',
        right: 15,
        top: Platform.OS == 'ios' ? '10%' : '5%',
        zIndex: 3,
    },

    CurrentGoalView: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 15,

    },

    PastGoalView: {
        marginTop: 15,
        flex: 1,
        width: '100%',
        paddingTop: 10,
        alignItems: 'center',

    }
})

export default SavingScreen;