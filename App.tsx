import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import AppContainer from './src/Navigation/MainNavigation';
import store from './src/Redux/store/AppStore';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <AppContainer />
      </SafeAreaView>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
