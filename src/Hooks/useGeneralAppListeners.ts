/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { setNetConnected } from '../Redux/reducers/AppReducer';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { isAndroid } from '../Utils/AppConstants';
import { UIManager } from 'react-native';
import { android_app_client_id, ios_app_client_id, web_client_id } from '../Utils/Strings';
import { AppRootStore } from '../Redux/store/AppStore';
import CommonDataManager from '../Utils/CommonManager';

const useGeneralAppListeners = () => {
  const dispatch = useDispatch();

  const selector = useSelector((state: AppRootStore) => state);

  useEffect(() => {
    GoogleSignin.configure({
      // androidClientId: android_app_client_id,
      offlineAccess: true,
      iosClientId: ios_app_client_id,
      webClientId: web_client_id
    });
    const unsubscribeNetinfo = NetInfo.addEventListener(state =>
      dispatch(setNetConnected(state.isConnected ? true : false)),
    );
    if (isAndroid) {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    CommonDataManager.getSharedInstance().setReduxReducer(selector, dispatch);
    return () => {
      unsubscribeNetinfo();
    };
  }, []);
};

export default useGeneralAppListeners;
