import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AppColors, AppImages, hv } from '../../../Utils/AppConstants';

const LogoHeader = ({ onLayoutChange }: any) => {
  return (
    <View style={styles.container} onLayout={(e) => onLayoutChange(e.nativeEvent.layout.height)}>
      <SafeAreaView />
      <StatusBar
        backgroundColor={AppColors.white.white}
        barStyle={'dark-content'}
      />
      <View style={styles.imgContainer}>
        <Image source={AppImages.Auth.LogoImage} style={styles.img} />
      </View>
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: AppColors.white.white,
  },
  imgContainer: {
    padding: hv(13),
    marginTop: hv(10),
  },
  img: {
    resizeMode: 'contain',
  },
});
