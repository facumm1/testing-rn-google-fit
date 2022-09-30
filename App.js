import React from 'react';
import {SafeAreaView} from 'react-native';
import {MainScreen} from './src/screens/MainScreen';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <MainScreen />
    </SafeAreaView>
  );
};

export default App;
