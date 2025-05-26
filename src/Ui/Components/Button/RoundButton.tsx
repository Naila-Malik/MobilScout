import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Platform,
  View,
  Image,
  ImageStyle,
  TextStyle,
} from 'react-native';
import {
  AppColors,
  AppFonts,
  formFieldsHeight,
  isSmallDevice,
  normalized,
} from '../../../Utils/AppConstants';
import { AppStyles } from '../../../Utils/AppStyles';

interface Props {
  title: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  isDisabled?: boolean;
  isLighter?: boolean;
  icon?: any;
  iconStyles?: ImageStyle;
  titleStyle?: TextStyle;
}

const RoundButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={1}
      style={props.containerStyle}
      disabled={props.isDisabled ? true : false}>
      <View
        style={[
          styles.mainContainer,
          {
            backgroundColor: props.isLighter
              ? AppColors.blue.lighterBlue
              : props.isDisabled
                ? AppColors.grey.greyLight
                : AppColors.blue.mainBlue,
          },
        ]}>
        <View style={AppStyles.horiCommon}>
          {props.icon && (
            <Image
              source={props.icon}
              resizeMode="contain"
              style={[styles.icon, props.iconStyles]}
            />
          )}

          <Text
            style={[
              styles.title,
              props?.titleStyle,
              {
                color: props.isLighter
                  ? AppColors.blue.mainBlue
                  : props.isDisabled
                    ? AppColors.grey.grey
                    : AppColors.white.white,
              },
            ]}>
            {props.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  mainContainer: {
    height: formFieldsHeight + 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalized(10),
    borderRadius: 15,
  },
  title: {
    fontSize:
      normalized(16),
    fontFamily: AppFonts.Synonyms.SemiBold,
  },
  icon: {
    height: 22,
    width: 22,
    marginRight: normalized(10),
    marginBottom: 5
  },
});
