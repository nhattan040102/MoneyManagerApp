import 'react-native-gesture-handler';
import { React } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './navigator/AppNavigator';
import DrawerNavigator from './navigator/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
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
