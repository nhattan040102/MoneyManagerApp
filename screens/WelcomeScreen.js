import { React } from 'react';
import { View, TouchableOpacity, Button, Text, StyleSheet, SafeAreaView } from 'react-native';
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';


const WelcomeScreen = () => {
    return (
        <SafeAreaView>
            <Text>Welcome screen</Text>
            <Button title="Try as guest" onPress={() => {
                signInAnonymously(auth)
                    .then(() => {
                        console.log(auth.currentUser);
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