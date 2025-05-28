import React, {useEffect, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStore} from '../Redux/store/AppStore';
import {NavigationContainer} from '@react-navigation/native';
import {Routes} from '../Utils/Routes';
import AuthStack from './AuthNavigation';
import SafeArea from 'react-native-safe-area';
import SplashScreen from 'react-native-splash-screen';
import {
  setIsNotchDevice,
  setSafeArea,
  setUserData,
} from '../Redux/reducers/AppReducer';
import CommonDataManager from '../Utils/CommonManager';
import {navigationRef} from './RootNavigation';
import HomeScreen from '../Ui/Sections/HomeScreen/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from '../Ui/Sections/Search/Search';
import AddCarScreen from '../Ui/Sections/AddCar/AddCarScreen';
import Settings from '../Ui/Sections/Settings/Settings';
import Profile from '../Ui/Sections/Profile/Profile';
import Icon from '@react-native-vector-icons/ionicons';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AddVehicalCard from '../Ui/Sections/AddCar/AddVehicalCard';
import AddCarInfo from '../Ui/Sections/AddCar/AddCarInfo';
import VehicalDetail from '../Ui/Sections/AddCar/VehicalDetail';

// const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AppStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={Routes.HomeScreen.home}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === Routes.HomeScreen.home) {
            return (
              <Icon
                name="home"
                size={24}
                color={focused ? '#FF6600' : '#A1A1A1'}
              />
            );
          } else if (route.name === Routes.SearchScreen.search) {
            return (
              <Icon
                name="search"
                size={24}
                color={focused ? '#FF6600' : '#A1A1A1'}
              />
            );
          } else if (route.name === Routes.AddCarStack.mainScreen) {
            return (
              <Icon
                name="plus-circle"
                size={24}
                color={focused ? '#FF6600' : '#A1A1A1'}
              />
            );
          } else if (route.name === Routes.SettingsScreen.setting) {
            return (
              <Icon
                name="settings"
                size={24}
                color={focused ? '#FF6600' : '#A1A1A1'}
              />
            );
          } else if (route.name === Routes.ProfileScreen.profile) {
            return (
              <Image
                source={{uri: 'https://i.pravatar.cc/100'}} // Replace with user's avatar
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: focused ? 2 : 0,
                  borderColor: focused ? '#FF6600' : 'transparent',
                }}
              />
            );
          }
        },
        tabBarActiveTintColor: '#FF6600',
        tabBarInactiveTintColor: '#A1A1A1',
      })}>
      <Tab.Screen
        name={Routes.HomeScreen.home}
        component={HomeScreen}
        options={{tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        name={Routes.SearchScreen.search}
        component={Search}
        options={{tabBarLabel: 'Search'}}
      />
      <Tab.Screen
        name={Routes.AddCarStack.mainScreen}
        component={MyStack}
        options={{tabBarLabel: 'Add Car'}}
      />
      <Tab.Screen
        name={Routes.SettingsScreen.setting}
        component={Settings}
        options={{tabBarLabel: 'Settings'}}
      />
      <Tab.Screen
        name={Routes.ProfileScreen.profile}
        component={Profile}
        options={{tabBarLabel: 'Profile'}}
      />
    </Tab.Navigator>
  );
};
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName={Routes.AddCarStack.addCar}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.AddCarStack.addCar} component={AddCarScreen} />
      <Stack.Screen
        name={Routes.AddCarStack.vehicalCard}
        component={AddVehicalCard}
      />
      <Stack.Screen name={Routes.AddCarStack.carInfo} component={AddCarInfo} />
      <Stack.Screen
        name={Routes.AddCarStack.VehicalDetail}
        component={VehicalDetail}
      />
    </Stack.Navigator>
  );
}
const AppContainer = () => {
  const selector = useSelector((AppState: AppRootStore) => AppState);
  const {safeArea, userData} = selector.AppReducer;
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // getUserDetails();
  // SplashScreen.hide();
  // }, []);

  // const getUserDetails = async () => {
  //   try {
  //     let userDetails =
  //       await CommonDataManager.getSharedInstance().getUserData();
  //     if (userDetails) {
  //       await CommonDataManager.getSharedInstance().getChildList(
  //         userDetails?.parentId,
  //       );
  //       dispatch(setUserData(userDetails));
  //     }
  //   } catch (e) {
  //     console.log('Error getting user ', e);
  //   } finally {
  //     setTimeout(() => {
  //       SplashScreen.hide();
  //     }, 500);
  //   }
  // };

  // useLayoutEffect(() => {
  //   SafeArea.getSafeAreaInsetsForRootView().then(result => {
  //     if (safeArea.top != result.safeAreaInsets.top) {
  //       dispatch(
  //         setSafeArea({
  //           top: result.safeAreaInsets.top,
  //           bottom: result.safeAreaInsets.bottom,
  //         }),
  //       );
  //       if (result.safeAreaInsets.top > 30) {
  //         dispatch(setIsNotchDevice(true));
  //       }
  //     }
  //   });
  // }, [selector.AppReducer]);

  return (
    <NavigationContainer ref={navigationRef}>
      {userData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
export default AppContainer;
