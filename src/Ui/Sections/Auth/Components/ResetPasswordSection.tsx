import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import {
  AppColors,
  AppFonts,
  hv,
  isSmallDevice,
  normalized,
} from '../../../../Utils/AppConstants';
import RoundButton from '../../../Components/Button/RoundButton';
import RoundInput from '../../../Components/CustomInput/RoundInput';
import { AppHorizontalMargin } from '../../../../Utils/AppStyles';
import CommonDataManager from '../../../../Utils/CommonManager';

interface Props {
  onConfirm: () => void;
  containerStyles?: ViewStyle
}

const ResetPasswordSection = ({ onConfirm, containerStyles }: Props) => {
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [validate, setValidate] = useState(false)
  const [error, setError] = useState({
    password: false,
    cPassword: false,
  });

  const saveHandler = () => {
    if (password != cPassword) {
      setError({
        password: true,
        cPassword: true,
      })
      setValidate(true)
    } else {
      console.log('Save')
      onConfirm();
    }
  }
  return (
    <View style={[styles.btnContainer, containerStyles]}>
      {/* First Section */}
      <Text style={styles.heading}>Enter New Password</Text>
      {/* Second */}
      <RoundInput
        title="New Password"
        placeholder="New Password"
        value={password}
        isPassword
        onChangeText={(e: string) => {
          setPassword(e);
          setError({
            ...error,
            password: e == '' ? false :
              !CommonDataManager.getSharedInstance().isPasswordValid(e)
                ? true
                : cPassword !== '' && cPassword !== e
                  ? true
                  : false,
            cPassword: cPassword == '' ? false : cPassword !== e ? true :
              !CommonDataManager.getSharedInstance().isPasswordValid(cPassword)
                ? true : false,
          });
        }}
        containerStyle={{
          marginTop: hv(5),
          width: '100%',
        }}
        maxLength={20}
        isError={error.password}
        autoCapitalize='none'
      />
      <RoundInput
        title="Re-Enter New Password"
        placeholder="Re-Enter New Password"
        value={cPassword}
        isPassword
        onChangeText={(e: string) => {
          setCPassword(e);
          setError({
            ...error,
            cPassword:
              e == '' ? false :
                !CommonDataManager.getSharedInstance().isPasswordValid(e)
                  ? true
                  : password !== '' && password !== e
                    ? true
                    : false,
            password: password == '' ? false : password !== e ? true : !CommonDataManager.getSharedInstance().isPasswordValid(password)
              ? true : false,
          });
        }}
        containerStyle={{
          marginTop: hv(15),
          width: '100%',
        }}
        maxLength={20}
        isError={error.cPassword}
        showError={error.cPassword && cPassword !== password ? 'Password did not match' : null}
        autoCapitalize='none'
      />
      {/* Third */}
      <RoundButton
        title="Save and Proceed"
        onPress={saveHandler}
        containerStyle={{ width: '100%', marginTop: hv(isSmallDevice ? 50 : 45), }}
        isDisabled={
          error.password ||
            !password ||
            !cPassword
            ? true
            : false
        }
      />
    </View>
  );
}

export default ResetPasswordSection;

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    padding: normalized(10),
    paddingHorizontal: AppHorizontalMargin,
    minHeight: hv(320),
    justifyContent: 'space-between'
  },
  heading: {
    fontFamily: AppFonts.Synonyms.Bold,
    color: AppColors.black.black,
    fontSize: normalized(22),
    marginTop: hv(10)
  },
  btmTxt: {
    borderTopWidth: 1,
    borderTopColor: AppColors.blue.lighterBlue,
  },
});
