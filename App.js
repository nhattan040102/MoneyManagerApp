import 'react-native-gesture-handler';
import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './navigator/AppNavigator';
import DrawerNavigator from './navigator/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { auth } from './firebase';
import WelcomeScreen from './screens/WelcomeScreen';
import { onAuthStateChanged } from 'firebase/auth';


const App = () => {
  // Set an initializing state while Firebase connects
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user)
      console.log("Sign in anonymously with userID: " + user);
    else
      console.log("Onboard screen");
  }, [user]);

  if (!user) {
    return (
      <WelcomeScreen onPress={(userid) => setUser(userid)} />
    );
  }

  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>

  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
