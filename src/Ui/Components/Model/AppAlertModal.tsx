import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStore } from '../../../Redux/store/AppStore';
import {
  AppColors,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import { AppStyles } from '../../../Utils/AppStyles';
import { setAlertObj } from '../../../Redux/reducers/AppReducer';
const { width, height } = Dimensions.get('window');
const AppAlertModal = () => {
  const dispatch = useDispatch();
  const { alertObj }: any = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const viewOffset = useSharedValue(height);
  useEffect(() => {
    viewOffset.value = withTiming(0, {
      duration: 500,
    });
    const alertTimeout = setTimeout(() => {
      closeModal();
    }, 8000);
    return () => clearTimeout(alertTimeout);
  }, []);
  const boxMoveStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: viewOffset.value,
        },
      ],
    };
  });
  const closeModal = () => {
    viewOffset.value = withTiming(height, {
      duration: 500,
    });
    setTimeout(() => {
      dispatch(setAlertObj(null));
    }, 500);
  };
  return (
    <View style={styles.main}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={AppColors.transparentColor}
      />
      <Animated.View style={[styles.popup, boxMoveStyle]}>
        <Text style={styles.title}>{alertObj?.title}</Text>
        <Text numberOfLines={4} style={styles.message}>
          {alertObj?.message}
        </Text>
        <TouchableWithoutFeedback onPress={() => closeModal()}>
          <View style={styles.btnBox}>
            <Text style={styles.btnTitle}>OK</Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
};

export default AppAlertModal;

const styles = StyleSheet.create({
  main: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: AppColors.transparentColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: AppColors.white.white,
    alignItems: 'center',
    width: width * 0.7,
    borderRadius: 15,
    paddingHorizontal: normalized(10),
  },
  title: {
    ...AppStyles.textSemiBold,
    color: AppColors.black.black,
    fontSize: normalized(18),
    marginTop: hv(20),
  },
  message: {
    ...AppStyles.textRegular,
    color: AppColors.black.black,
    fontSize: normalized(14),
    textAlign: 'center',
  },
  btnBox: {
    height: hv(45),
    width: normalized(100),
    borderRadius: 35,
    backgroundColor: AppColors.blue.mainBlue,
    ...AppStyles.centeredCommon,
    marginTop: hv(20),
    marginBottom: hv(20),
  },
  btnTitle: {
    fontSize: normalized(16),
    ...AppStyles.textSemiBold,
    color: AppColors.white.white
  }
});
