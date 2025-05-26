import { StyleSheet, Text, TouchableOpacity, View, ViewStyle, } from 'react-native';
import React from 'react';
import { AppColors, AppFonts, ScreenSize, hv, isSmallDevice, normalized } from '../../../Utils/AppConstants';
import { AppHorizontalMargin } from '../../../Utils/AppStyles';

interface Props {
  selectedTab: number;
  setSelectedTab: (index: number) => void;
  listOfObjects: Array<string | number | object>;
  containerStyle: ViewStyle;
}

const barWidth = ScreenSize.width - (2 * AppHorizontalMargin);

const Tab = (props: Props) => {
  return (
    <View style={[props.containerStyle, styles.container]}>
      {
        props.listOfObjects.map((i: any, index) => {
          const isSelected = props.selectedTab === index;
          return (
            <TouchableOpacity
              onPress={() => props.setSelectedTab(index)}
              key={index}
              style={[styles.btn, isSelected && styles.selectedContainer]}>
              <Text
                style={[styles.btnTxt, isSelected && styles.selectedText]}>
                {i.title}
              </Text>
            </TouchableOpacity>
          )
        }
        )
      }
    </View>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    width: barWidth,
    flexDirection: 'row',
    backgroundColor: AppColors.grey.grey_dim,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 13,
    height: hv(isSmallDevice ? 55 : 50),
    paddingHorizontal: normalized(5)
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hv(12),
    borderRadius: normalized(13),
    width: '48%',
  },
  btnTxt: {
    fontSize: normalized(14),
    color: AppColors.grey.gre_dimLvl2,
    fontFamily: AppFonts.Synonyms.SemiBold
  },
  selectedContainer: {
    backgroundColor: AppColors.white.white,
    shadowColor: '#99c0ff',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5,
  },
  selectedText: {
    color: AppColors.black.lighter,
    fontFamily: AppFonts.Synonyms.Bold,
  }
});
