import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppColors, normalized } from "../../../../Utils/AppConstants";
import { AppHorizontalMargin, AppStyles } from "../../../../Utils/AppStyles";
import RoundButton from "../../../Components/Button/RoundButton";

interface Props {
    onLoginClick: () => void;
    onSignupClick: () => void;
}

const AuthToggle = ({ onLoginClick, onSignupClick }: Props) => {
    return (
        <View style={styles.btnContainer}>
            <RoundButton
                title="Sign In"
                onPress={onLoginClick}
                containerStyle={styles.btn}
            />
            <RoundButton
                title="Sign Up"
                onPress={onSignupClick}
                containerStyle={styles.btn}
                isLighter
            />
            <Text style={styles.labelStyles}>Copyright © 2023 ClassConnect. All rights reserved.</Text>
        </View>
    )
}

export default AuthToggle;

const styles = StyleSheet.create({
    btn: {
        marginBottom: normalized(15),
        width: '100%',
    },
    btnContainer: {
        padding: normalized(10),
        paddingTop: normalized(20),
        paddingHorizontal: AppHorizontalMargin,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    labelStyles: {
        color: AppColors.grey.lighterLvl2,
        fontSize: normalized(11),
        ...AppStyles.textSemiBold,
        marginTop: 30,
        alignSelf: 'center'
    }
})