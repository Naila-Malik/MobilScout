import React from "react";
import useBackButtonListener from '../../../../Hooks/useBackButtonListener';
import GestureRecognizer from 'react-native-swipe-gestures';
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { AppColors, calculateWindowHeight } from "../../../../Utils/AppConstants";
import { ScrollView } from "react-native";

interface Props {
    children: React.ReactNode,
    onBack: () => void;
    maxHeightOffset: number;
    keyboardVerticalOffset: number;
    behavior: 'height' | 'position' | 'padding' | undefined;
    scrollEnabled: boolean
}

const SwipeWrapper = ({ children, onBack, maxHeightOffset, keyboardVerticalOffset, behavior, scrollEnabled }: Props) => {
    useBackButtonListener(() => {
        onBack();
        return true;
    })
    const onSwipeRight = () => {
        if (Platform.OS == 'ios') {
            onBack();
        }
    }
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (

        <KeyboardAvoidingView
            behavior={behavior}
            keyboardVerticalOffset={keyboardVerticalOffset}
            style={[styles.mainContainer, { maxHeight: calculateWindowHeight() - maxHeightOffset }]}
        >
            <ScrollView
                scrollEnabled={scrollEnabled ? true : false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}>
                <GestureRecognizer
                    // onSwipeLeft={() => onSwipeLeft()}
                    onSwipeRight={() => onSwipeRight()}
                    config={config}
                // style={[styles.mainContainer, { maxHeight: calculateWindowHeight() - maxHeightOffset - normalized(Platform.OS == 'android' ? 60 : 10) }]}
                >
                    {children}
                </GestureRecognizer>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SwipeWrapper;

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: AppColors.white.white,
        // paddingTop: 10,
        zIndex: 1000,
        borderTopRightRadius: 25,
        borderTopWidth: 2,
        borderEndWidth: 2,
        borderColor: AppColors.grey.borderGrey,
    }
})
