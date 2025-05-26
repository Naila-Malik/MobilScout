import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardTypeOptions,
  ViewStyle,
  Platform,
  LayoutAnimation,
} from 'react-native';
import {
  AppColors,
  AppImages,
  formFieldsHeight,
  hv,
  normalized,
  ScreenSize,
} from '../../../Utils/AppConstants';
import { AppStyles } from '../../../Utils/AppStyles';

interface Props {
  title: string;
  value?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  showIconWithTitle?: boolean;
  disabled?: boolean;
  isError?: boolean;
  autoCapitalize?: 'characters' | 'words' | 'sentences' | 'none';
  showError?: string | null;
  showErrorIcon?: boolean;
  isLargeHeighted?: boolean;
}

const RoundInput = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const toggleFocus = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setIsFocused(!isFocused)
  }

  return (
    <View style={[styles.mainContainer, props.containerStyle]}>
      {isFocused || props.value ? (
        <View style={styles.empty}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      ) : (
        <View style={styles.empty} />
      )}
      <View
        style={[
          styles.inputView,
          props.inputContainerStyle,
          {
            height: props.isLargeHeighted ? formFieldsHeight + 11 : formFieldsHeight,
            // borderWidth: isFocused ? 1 : 0,
            borderWidth: 1,
            paddingVertical: hv(props.isLargeHeighted ? 2 : 0),
            borderColor: props.isError
              ? AppColors.red.warning
              : isFocused
                ? AppColors.blue.mainBlue
                : props.disabled
                  ? AppColors.grey.greyLight
                  : 'transparent',
            backgroundColor:
              props.value && !props.disabled && !props.isError
                ? AppColors.blue.lighterBlue
                : props.isError
                  ? AppColors.red.red_dim
                  : AppColors.grey.lighter,
          },
        ]}>
        <View
          style={[
            AppStyles.horiCommon,
            {
              flex: 1,
            },
          ]}>
          <TextInput
            placeholder={props.placeholder && !isFocused ? props.placeholder : ''}
            placeholderTextColor={AppColors.grey.gre_dimLvl2}
            secureTextEntry={props.isPassword && !showPassword ? true : false}
            value={props.value ? props.value : ''}
            onChangeText={e => {
              props.onChangeText(props?.isPassword ? e.trim() : e);
            }}
            style={[
              styles.input,
              {
                color: props.isError
                  ? AppColors.red.warning
                  : props.disabled
                    ? AppColors.grey.greyLight
                    : AppColors.black.black,
              },
            ]}
            onFocus={() => toggleFocus()}
            onBlur={() => toggleFocus()}
            keyboardType={props.keyboardType ? props.keyboardType : 'default'}
            editable={props.disabled ? false : true}
            autoCapitalize={
              props.autoCapitalize ? props.autoCapitalize : 'sentences'
            }
            maxLength={props.maxLength}
            multiline={props.isLargeHeighted ? true : false}
          />
        </View>
        {props.showErrorIcon && props.isError ?
          <View style={styles.passwordView}>
            <Image
              source={
                AppImages.Auth.ErrorIcon
              }
              style={[styles.password, { tintColor: props.isError ? AppColors.red.warning : AppColors.grey.grey }]}
            />
          </View> :
          props.isPassword && (
            <TouchableWithoutFeedback
              onPress={() => setShowPassword(!showPassword)}>
              <View style={styles.passwordView}>
                <Image
                  source={
                    showPassword
                      ? AppImages.Auth.ShowPassword
                      : AppImages.Auth.HidePassword
                  }
                  style={[styles.password, { tintColor: props.isError ? AppColors.red.warning : AppColors.grey.grey }]}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
      </View>
      {props.showError && props.isError && props.value !== '' && (
        <View>
          <Text style={styles.err}>{props.showError}</Text>
        </View>
      )}
    </View>
  );
};

export default RoundInput;

const styles = StyleSheet.create({
  mainContainer: {
    width: ScreenSize.width * 0.75,
  },
  title: {
    color: AppColors.black.black,
    fontSize: normalized(12),
    ...AppStyles.textSemiBold
  },
  inputView: {
    borderRadius: 13,
    paddingHorizontal: normalized(10),
    marginTop: Platform.OS == 'android' ? hv(5) : hv(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: normalized(15),
    ...AppStyles.textRegular,
    height: '100%',
  },
  passwordView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    width: 30,
    marginRight: -3,
    paddingRight: 7,

  },
  password: {
    height: 20,
    width: 20,
  },
  err: {
    color: AppColors.red.warning,
    fontWeight: '600',
    fontSize: 13,
  },
  empty: {
    height: normalized(15),
  },
});
