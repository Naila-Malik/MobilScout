import React from 'react';
import {Routes} from '../Utils/Routes';
import AuthLandingPage from '../Ui/Sections/Auth/Screens/AuthLandingPage';
import OtpScreen from '../Ui/Sections/Auth/Screens/OtpScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Auth.authLandingScreen}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name={Routes.Auth.authLandingScreen}
        component={AuthLandingPage}
      />
      <Stack.Screen name={Routes.Auth.OtpScreen} component={OtpScreen} />
    </Stack.Navigator>
  );
};
export default AuthStack;
