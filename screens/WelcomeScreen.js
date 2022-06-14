import { React } from 'react';
import { View, TouchableOpacity, Button, Text, StyleSheet, SafeAreaView } from 'react-native';
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';


const WelcomeScreen = (props) => {
    return (
        <SafeAreaView>
            <Text>Welcome screen</Text>
            <Button title="Try as guest" onPress={() => {
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
            }}> </Button>
        </SafeAreaView>
    )
};

export default WelcomeScreen;