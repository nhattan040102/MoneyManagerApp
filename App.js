import { React } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './navigator/AppNavigator';

const App = () => {
  return (
    <Navigator />
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
