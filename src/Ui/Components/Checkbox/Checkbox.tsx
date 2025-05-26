import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { AppColors, AppImages, hv } from '../../../Utils/AppConstants';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface Props {
  isSelected: boolean;
  onValueChange: () => void;
}
const Checkbox = (props: Props) => {
  return (
    <TouchableWithoutFeedback
      onPress={props.onValueChange}
      style={[
        styles.container,
        {
          backgroundColor: props.isSelected
            ? AppColors.blue.mainBlue
            : AppColors.white.white,
          borderColor: props.isSelected
            ? AppColors.blue.mainBlue
            : AppColors.grey.greyLight,
        },
      ]}>
      <View style={{}}>
        {props.isSelected ? (
          <Image source={AppImages.Common.TickIcon} style={styles.img} />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: 20,
    borderWidth: 1.5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hv(5),
  },
  img: {
    resizeMode: 'contain',
  },
});
