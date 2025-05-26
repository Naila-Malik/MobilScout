import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { AppStyles } from '../../Utils/AppStyles';
import { AppColors, ScreenSize, normalized } from '../../Utils/AppConstants';
import { useSelector } from 'react-redux';
import { AppRootStore } from '../../Redux/store/AppStore';

interface Props {
    content: string,
    containerStyle?: ViewStyle,
    textStyle?: TextStyle,
    isApiCalled?: boolean
}

const EmptyListComp = (props: Props) => {
    const { isLoaderStart } = useSelector((state: AppRootStore) => state.AppReducer)
    const apiHasCalled = props.isApiCalled == true || props.isApiCalled == undefined;
    return (
        <View style={[styles.mainContainer, props.containerStyle]}>
            {
                !isLoaderStart && apiHasCalled &&
                <Text style={[styles.contentStyles, props.textStyle]}>{props.content}</Text>
            }
        </View>
    )
}

export default EmptyListComp;

const styles = StyleSheet.create({
    mainContainer: {
        ...AppStyles.centeredCommon,
        height: ScreenSize.height * 0.6,
    },
    contentStyles: {
        ...AppStyles.textMedium,
        fontSize: normalized(14),
        color: AppColors.black.black,
    }
})