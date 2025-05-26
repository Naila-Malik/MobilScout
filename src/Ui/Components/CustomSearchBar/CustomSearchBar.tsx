import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ViewStyle,
  TextInput,
} from 'react-native';
import {
  AppColors,
  AppImages,
  formFieldsHeight,
  normalized,
} from '../../../Utils/AppConstants';
import { AppStyles } from '../../../Utils/AppStyles';

interface Props {
  value?: string;
  placeholder?: string;
  containerStyle?: ViewStyle;
  onChangeText?: (t: string) => void;
}

const CustomSearchBar = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const toggleFocus = () => {
    setIsFocused(!isFocused)
  }

  return (
    <View
      style={[styles.inputView, props.containerStyle]}>
      <Image
        source={
          AppImages.Common.SearchIcon
        }
        style={styles.img}
      />
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={AppColors.grey.gre_dimLvl2}
        value={props.value}
        onChangeText={props.onChangeText}
        onFocus={() => toggleFocus()}
        onBlur={() => toggleFocus()}
        style={styles.input}
      />
    </View>
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.grey.lighter,
    borderRadius: 15,
  },
  inputView: {
    ...AppStyles.horiCommon,
    backgroundColor: AppColors.grey.lighter,
    height: formFieldsHeight,
    borderRadius: 15,
    paddingHorizontal: normalized(10),
    flexDirection: 'row',
    alignItems: 'center'
  },
  img: {
    tintColor: AppColors.grey.grey,
    alignSelf: 'center',
    marginRight: normalized(10),
  },
  input: {
    flex: 1,
    fontSize: normalized(15),
    ...AppStyles.textSemiBold,
    height: '100%',
    color: AppColors.black.black
  },
});
