import { StyleSheet } from 'react-native';
import {
  AppColors,
  AppFonts,
  normalized,
} from './AppConstants';
export const AppHorizontalMargin = normalized(15);

export const AppStyles = StyleSheet.create({
  MainStyle: {
    flex: 1,
    backgroundColor: AppColors.white.white,
  },
  subContainerCommon: {
    flex: 1,
    alignItems: 'center',
  },
  horiCommon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredCommon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteCommon: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    width: '100%',
  },
  fullHeightAndWidth: {
    height: '100%',
    width: '100%'
  },
  shadowCommon: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5,
  },
  textRegular: {
    fontFamily: AppFonts.Synonyms.Regular,
  },
  textSemiBold: {
    fontFamily: AppFonts.Synonyms.SemiBold,
  },
  textMedium: {
    fontFamily: AppFonts.Synonyms.Medium,
  },
  textBold: {
    fontFamily: AppFonts.Synonyms.Bold,
  },
  textLight: {
    fontFamily: AppFonts.Synonyms.Light,
  },
  imageCommon: {
    resizeMode: 'contain',
  },
  mainContainer: {
    flex: 1,
  },
});
export const AppStyleWithProps = (props: any) => StyleSheet.create({});
