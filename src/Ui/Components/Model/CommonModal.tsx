import React, { ReactNode } from 'react';
import { Image, KeyboardAvoidingView, Modal, Platform, SafeAreaView, StatusBar, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { AppColors, AppImages } from '../../../Utils/AppConstants';
import { AppStyles } from '../../../Utils/AppStyles';

interface Props {
    children: ReactNode,
    onClose: () => void,
    isArrowShown: boolean,
    statusBgColor?: any
}

const CommonModal = ({ children, onClose, isArrowShown, statusBgColor }: Props) => {
    return (
        <Modal
            transparent
            onRequestClose={onClose}
            animationType='slide'
        >
            <View style={styles.mainContainer}>
                <StatusBar barStyle={'light-content'} backgroundColor={statusBgColor || AppColors.transparentColor} />
                <TouchableWithoutFeedback onPress={onClose} disabled>
                    <View style={styles.transparentBg} />
                </TouchableWithoutFeedback>
                <KeyboardAvoidingView
                    behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
                    <View style={styles.subContainer}>
                        {
                            isArrowShown &&
                            <TouchableWithoutFeedback onPress={onClose}>
                                <View style={styles.arrowBox}>
                                    <Image
                                        source={AppImages.Common.DropdownShort}
                                        style={styles.arrowImg}
                                        resizeMode='contain' />
                                </View>
                            </TouchableWithoutFeedback>
                        }
                        {children}
                    </View>
                </KeyboardAvoidingView>
                <SafeAreaView style={{
                    backgroundColor: AppColors.white.white
                }} />
            </View>
        </Modal>
    )
}

export default CommonModal;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: AppColors.transparentColor,
        justifyContent: 'flex-end'
    },
    transparentBg: {
        ...StyleSheet.absoluteFillObject,
    },
    subContainer: {
        backgroundColor: AppColors.white.white,
        minHeight: 100,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    arrowBox: {
        height: 30,
        width: 100,
        alignSelf: 'center',
        ...AppStyles.centeredCommon
    },
    arrowImg: {
        height: '50%',
        width: '50%'
    },
})