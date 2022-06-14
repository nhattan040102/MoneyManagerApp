import { React } from 'react';
import { View, TouchableOpacity, Button, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { FONTSIZE } from '../constants/constants';


const WelcomeScreen = (props) => {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#A1E3D8' }}>
            <View style={{
                width: '100%', height: '80%',
                justifyContent: 'center', alignItems: 'center'
            }}>
                <View style={{ position: 'absolute', bottom: '20%' }}>
                    <Image source={require('../icon/presentation.png')} />
                </View>

                <View style={{ position: 'absolute', top: '10%', right: '10%' }}>
                    <Image source={require('../icon/finance.png')} />
                </View>

                <View style={{ position: 'absolute', top: '0%', left: '5%' }}>
                    <Image source={require('../icon/budget.png')} />
                </View>
            </View>

            <View style={{
                height: '42%', backgroundColor: 'white', width: '100%', position: 'absolute', bottom: 0, borderTopEndRadius: 40, borderTopStartRadius: 40,
                shadowColor: '#000000',
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowRadius: 6,
                shadowOpacity: 0.6,
                elevation: 0.6,
            }}>
                {/* <Button title="Try as guest" fontSize={40} onPress={() => {
                    signInAnonymously(auth)
                        .then(() => {
                            props.onPress(auth.currentUser.uid)
                            console.log(auth.currentUser.uid);
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // ...
                        });
                }}> </Button> */}
                <View style={{ width: '100%', justifyContent: 'center', padding: 20 }}>
                    <View style={{ width: '85%' }}>
                        <Text style={{ padding: 10, fontSize: FONTSIZE.extraLarge, fontWeight: 'bold', color: 'rgb(12,60,78)', textAlign: 'left' }}>Track your expense and plan for financial goals!</Text>
                    </View>

                    <Text style={{ paddingHorizontal: 10, fontSize: FONTSIZE.title, fontWeight: '500', color: 'rgb(12,60,78)', textAlign: 'left' }}>See what you're spending, track your bills, manage your bank account and build your goals. </Text>
                </View>
                <View style={{ flex: 1, width: '100%', alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        style={{ backgroundColor: 'red', padding: 15, margin: 15, borderRadius: 10, backgroundColor: 'rgb(12,60,78)' }}
                        onPress={() => {
                            signInAnonymously(auth)
                                .then(() => {
                                    props.onPress(auth.currentUser.uid)
                                    console.log(auth.currentUser.uid);
                                })
                                .catch((error) => {
                                    const errorCode = error.code;
                                    const errorMessage = error.message;
                                    // ...
                                });
                        }}>
                        <Text style={{ fontSize: FONTSIZE.title, color: 'white' }}>Let's begin</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </SafeAreaView >
    )
};

export default WelcomeScreen;