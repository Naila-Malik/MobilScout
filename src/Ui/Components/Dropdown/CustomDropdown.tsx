import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import {
  AppColors,
  AppImages,
  formFieldsHeight,
  normalized,
  ScreenSize,
} from '../../../Utils/AppConstants';
import { AppStyles } from '../../../Utils/AppStyles';

interface Props {
  title: string;
  value?: string;
  placeholder?: string;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  showIconWithTitle?: boolean;
  disabled?: boolean;
  isError?: boolean;
  showError?: string | null;
  showErrorIcon?: boolean;
  onPress: () => void
}

const CustomDropdown = (props: Props) => {
  return (
    <View style={[styles.mainContainer, props.containerStyle]}>
      {props.value ? (
        <View style={styles.empty}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      ) : (
        <View style={styles.empty} />
      )}
      <TouchableWithoutFeedback disabled={props.disabled ? true : false} onPress={() => props.onPress()}>
        <View
          style={[
            styles.inputView,
            props.inputContainerStyle,
            {
              backgroundColor:
                props.value && !props.disabled && !props.isError
                  ? AppColors.blue.lighterBlue
                  : props.isError
                    ? AppColors.red.red_dim
                    : AppColors.grey.lighter,
              marginTop: 6
            },
          ]}>
          <View
            style={[
              AppStyles.horiCommon,
              {
                flex: 1,
              },
            ]}>
            <Text
              style={[
                styles.input,
                {
                  color: !props.value ?
                    AppColors.grey.gre_dimLvl2 : props.isError
                      ? AppColors.red.warning
                      : props.disabled
                        ? AppColors.grey.greyLight
                        : AppColors.black.black,
                },
              ]}
            >
              {props.value || props.placeholder}
            </Text>
          </View>
          <Image
            source={
              AppImages.Common.arrowDown
            }
            style={styles.img}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  mainContainer: {
    width: ScreenSize.width * 0.75,
  },
  title: {
    color: AppColors.black.black,
    fontSize: normalized(12),
    ...AppStyles.textSemiBold,
  },
  inputView: {
    ...AppStyles.horiCommon,
    height: formFieldsHeight,
    borderRadius: 15,
    paddingHorizontal: normalized(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    fontSize: normalized(14),
    ...AppStyles.textRegular,
    height: '100%',
  },
  empty: {
    height: normalized(15),
  },
  img: {
    tintColor: AppColors.grey.grey,
    alignSelf: 'center'
  }
});
