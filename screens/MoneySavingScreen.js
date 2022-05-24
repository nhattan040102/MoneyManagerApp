import { React, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import SavingGoalCard from '../components/SavingGoalCard';
import AddGoalBtn from '../components/AddGoalBtn';
import AchievedGoalCard from '../components/AchievedGoalCard';

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
        <AchievedGoalCard title={item.title} />
    );

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.screen}>
            {/* View for adding new saving goal */}
            <View style={styles.AddGoalView}>
                <View style={styles.GoalBtn}>
                    <AddGoalBtn></AddGoalBtn>
                </View>
                <View style={{ width: '70%', height: '80%', marginLeft: 20, padding: 5 }}>
                    <Text style={{ fontSize: FONTSIZE.title, textAlign: 'center', fontWeight: 'bold', color: 'rgb(55,152,140)' }}>ADD YOUR SAVING GOAL HERE!</Text>
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
        marginRight: 15,
    },

    AddGoalView: {
        height: '10%',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        // backgroundColor: 'red'
    },

    CurrentGoalView: {
        height: '30%',
        width: '100%',
        alignItems: 'center',
        paddingTop: 15,
    },

    PastGoalView: {
        borderTopWidth: 2,
        borderTopEndRadius: 80,
        borderTopStartRadius: 80,
        borderTopColor: 'black',
        marginTop: 15,
        flex: 1,
        width: '100%',
        paddingTop: 10,
        alignItems: 'center'
    }
})

export default SavingScreen;