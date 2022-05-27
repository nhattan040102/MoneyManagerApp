import { React, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Modal } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import SavingGoalCard from '../components/SavingGoalCard';
import AddGoalBtn from '../components/AddGoalBtn';
import AchievedGoalCard from '../components/AchievedGoalCard';
import SavingInputModal from '../components/SavingInputModal';
import NoGoalCard from '../components/NoGoalCard';

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
    const renderItem = ({ item }) => (
        <AchievedGoalCard title={item.title} onPress={() => props.navigation.navigate('Chi tiết')} />
    );

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.screen}>
            {/* View for adding new saving goal */}
            <View style={styles.GoalBtn}>
                <AddGoalBtn onPress={() => setModalVisible(true)}></AddGoalBtn>
            </View>

            {/* Modal View */}
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={modalVisible}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                    <SavingInputModal
                        onClose={() => setModalVisible(false)}
                        onCreate={() => setModalVisible(false)}
                    />
                </View>
            </Modal>


            {/* View for displaying current saving goal info */}
            <View style={styles.CurrentGoalView}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>CURRENT GOAL</Text>
                </View>
                {/* <SavingGoalCard onPress={() => props.navigation.navigate('Chi tiết')} /> */}
                <NoGoalCard />
            </View>

            {/* View for displaying your saving goal that have been achieved  */}
            <View style={styles.PastGoalView}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>DONE</Text>
                </View>

                <View style={{ width: '90%' }}>
                    <FlatList
                        style={{ padding: 5, }}
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
        top: 10,
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