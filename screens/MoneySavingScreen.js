import { React, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, Alert, SafeAreaView } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import SavingGoalCard from '../components/SavingGoalCard';
import AddGoalBtn from '../components/AddGoalBtn';
import AchievedGoalCard from '../components/AchievedGoalCard';
import SavingInputModal from '../components/SavingInputModal';
import NoGoalCard from '../components/NoGoalCard';
import { AddSavingGoalToFirebase } from '../Helper/firebaseAPI';

{/*     Fake data just for testing  */ }
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Mua quà tặng mẹ 20/3',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Mua laptop mới',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Mua lambogini',
    },
];


const SavingScreen = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const [goalState, setGoalState] = useState(false);
    const [currentGoalInput, setCurrentGoalInput] = useState(null);

    {/* render item for flatlist */ }
    const renderItem = ({ item }) => (
        <AchievedGoalCard title={item.title} onPress={() => props.navigation.navigate('Chi tiết')} />
    );

    useEffect(() => {
        // If there is already a saving goal, raise alert to user
        if (props.route.params && goalState == true) {
            Alert.alert(
                "Tin nhắn hệ thống",
                "Bạn có chắc muốn hủy mục tiêu tiết kiệm hiện tại hay không?",
                [
                    {
                        text: "Hủy bỏ",
                        onPress: () => console.log("Cancel Pressed"),
                    },
                    {
                        text: "Chấp nhận", onPress: () => {
                            console.log("OK Pressed");
                            setGoalState(props.route.params.status);
                        }
                    }
                ]
            );


        }
    }, [props.route.params]);

    {/* function to close saving goal input modal*/ }
    const closeHandler = () => {
        setModalVisible(false);
    }

    {/* function to add saving goal */ }
    const createHandler = (input) => {
        setModalVisible(false);
        setCurrentGoalInput(input);
        AddSavingGoalToFirebase(input);
        console.log(input);
        setGoalState(true);
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
    const GoalComponent = goalState == true ? <SavingGoalCard item={currentGoalInput} onPress={() => props.navigation.navigate('Chi tiết')} /> : <NoGoalCard />;


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
                    <Text style={styles.titleText}>DONE</Text>
                </View>

                <View style={{ width: '90%' }}>
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 120 }}
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
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
        fontSize: FONTSIZE.header1,
        fontWeight: '700',
    },

    GoalBtn: {
        alignItems: 'flex-end',
        position: 'absolute',
        right: 15,
        top: '10%',
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