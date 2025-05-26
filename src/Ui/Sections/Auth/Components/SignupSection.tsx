import {
  Keyboard,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {
  AppColors,
  AppFonts,
  AppImages,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import { AppHorizontalMargin, AppStyles } from '../../../../Utils/AppStyles';
import RoundInput from '../../../Components/CustomInput/RoundInput';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStore } from '../../../../Redux/store/AppStore';
import CommonDataManager from '../../../../Utils/CommonManager';
import Checkbox from '../../../Components/Checkbox/Checkbox';
import RoundButton from '../../../Components/Button/RoundButton';
import { setAlertObj, setLoader } from '../../../../Redux/reducers/AppReducer';
import { AppStrings, android_app_client_id, ios_app_client_id } from '../../../../Utils/Strings';
import { ApiResponseHandler } from '../../../../Network/ApiResponseHandler';
import { postRequest } from '../../../../Network/Services/ApiServices';
import { GOOGLE_SIGNUP_REQUEST_URL, SIGNUP_URL } from '../../../../Network/Urls';
import { SocialTypeStrings } from '../../../../Utils/AppEnums';

interface Props {
  onLoginClick: () => void;
  onOtpClick: (otpData: any) => void;
}

const SignupSection = ({ onLoginClick, onOtpClick }: Props) => {
  const dispatch = useDispatch();
  const { userData, isNotchDevice } = useSelector((state: AppRootStore) => state.AppReducer);
  const [fName, setfName] = useState();
  const [LName, setLName] = useState();
  const [email, setEmail] = useState(userData?.email ? userData.email : '');
  const [password, setPassword] = useState('');
  const [rePassword, setrePassword] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [validate, setValidate] = useState(false);
  const [error, setError] = useState({
    email: false,
    password: false,
    rePassword: false
  });

  const SignupClicked = async () => {
    if (password != rePassword) {
      setValidate(true);
      setError({
        ...error,
        password: true,
        rePassword: true,
      });
    } else {
      setError({
        ...error,
        password: false,
        rePassword: false
      });

      const paramsObj = {
        firstName: fName,
        lastName: LName,
        email: email,
        password: password
      }
      const requiresToken = false;
      const saveUserToken = false;
      try {
        dispatch(setLoader(true));
        let response: ApiResponseHandler<any> = await postRequest(SIGNUP_URL, paramsObj, requiresToken, saveUserToken);
        if (response?.success) {
          // console.log('response in signup to get parentId ===========', response.data)
          onOtpClick({
            parentId: response.data?.parent?.parentId,
            emailAddress: response.data?.parent?.email,
          });
        } else {
          dispatch(setAlertObj({
            title: AppStrings.Network.errorTitle,
            message: response.message
          }))
        }
      } catch (e) {
        console.log('error signup ', e);
      } finally {
        dispatch(setLoader(false));
      }
    }

  }

  const googleSignupRequest = async (paramsObj: any) => {
    try {
      dispatch(setLoader(true));
      const requiresToken = false;
      const saveUserToken = false;
      let response: ApiResponseHandler<any> = await postRequest(GOOGLE_SIGNUP_REQUEST_URL, paramsObj, requiresToken, saveUserToken);
      console.log("response - googleSignupRequest: ", JSON.stringify(response));
      if (response?.success) {
        onOtpClick({
          parentId: response.data?.parent?.parentId,
          emailAddress: response.data?.parent?.email,
        });
      } else {
        dispatch(setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: response.message
        }))
      }
    } catch (e) {
      console.log('error login ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const socialBtnClicked = async (socialType: string) => {
    Keyboard.dismiss();
    dispatch(setLoader(true));
    let socialParams: any = await CommonDataManager.getSharedInstance()
      .socialCallRequest(socialType)
      .catch(e => console.log('Er ', e))
      .finally(() => dispatch(setLoader(false)));
    console.log("socialParams: ", socialParams);
    if (socialParams) {
      if (socialType !== SocialTypeStrings.google) return;
      googleSignupRequest(socialParams);
    } else {
      console.log('Some problem getting social data');
    }
  };

  return (
    <View style={{
      paddingHorizontal: AppHorizontalMargin,
      paddingTop: 10
    }}>
      <Text style={[styles.heading, { marginBottom: isNotchDevice ? 8 : 0 }]}>Register</Text>
      <View style={styles.top}>
        <RoundInput
          title="First Name"
          placeholder="First Name"
          value={fName}
          onChangeText={(e: any) => {
            setfName(e);
          }}
          containerStyle={{
            width: '47%',
            marginRight: normalized(5),
            marginTop: hv(isNotchDevice ? -5 : 0)
          }}
          keyboardType="default"
          maxLength={50}
        />
        <RoundInput
          title="Last Name"
          placeholder="Last Name"
          value={LName}
          onChangeText={(e: any) => {
            setLName(e);
          }}
          containerStyle={{
            width: '47%',
            marginLeft: normalized(5),
            marginTop: hv(isNotchDevice ? -5 : 0)
          }}
          keyboardType="default"
          maxLength={50}
        />
      </View>
      <View>
        <RoundInput
          title="Email Address"
          placeholder="Email Address"
          value={email}
          onChangeText={e => {
            setEmail(e);
            setError({
              ...error,
              email:
                CommonDataManager.getSharedInstance().isEmailValid(e) ||
                  e == ''
                  ? false
                  : true,
            });
          }}
          containerStyle={{
            marginTop: hv(isNotchDevice ? 8 : 12),
            width: '100%',
          }}
          keyboardType="email-address"
          isError={error.email}
          maxLength={50}
          showErrorIcon
        />
        <RoundInput
          title="Password"
          placeholder="Password"
          value={password}
          isPassword
          onChangeText={(e: string) => {
            setPassword(e);
            setError({
              ...error,
              password: e == '' ? false :
                !CommonDataManager.getSharedInstance().isPasswordValid(e)
                  ? true
                  : rePassword !== '' && rePassword !== e
                    ? true
                    : false,
              rePassword: rePassword == '' ? false : rePassword !== e ? true :
                !CommonDataManager.getSharedInstance().isPasswordValid(rePassword)
                  ? true : false,
            });
          }}
          containerStyle={{
            marginTop: hv(isNotchDevice ? 8 : 12),
            width: '100%',
          }}
          autoCapitalize='none'
          isError={error.password}
          maxLength={20}
        />
        <RoundInput
          title="Re-Enter Password"
          placeholder="Re-Enter Password"
          value={rePassword}
          isPassword
          onChangeText={(e: string) => {
            setrePassword(e);
            setError({
              ...error,
              rePassword:
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
            marginTop: hv(isNotchDevice ? 8 : 12),
            width: '100%',
          }}
          isError={error.rePassword}
          maxLength={20}
          showError={error.rePassword && rePassword !== password ? 'Password did not match' : null}
          autoCapitalize='none'
        />
      </View>
      <View style={[styles.top, { marginVertical: hv(isNotchDevice ? 15 : 20) }]}>
        <Checkbox
          isSelected={isSelected}
          onValueChange={() => setSelection(!isSelected)}
        />
        <Text style={styles.createAccountLabel}>
          By creating account with ClassConnect, I agree to the
          <Text style={styles.bold}> T&C </Text>
          and
          <Text style={styles.bold}> Privacy Policy </Text>
        </Text>
      </View>
      <RoundButton
        title="Enter Code"
        onPress={SignupClicked}
        isDisabled={
          error.email ||
            error.password ||
            !email ||
            !password ||
            !fName ||
            !LName ||
            !rePassword ||
            !isSelected
            ? true
            : false
        }
      />
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hv(isNotchDevice ? 6 : 15) }}>
          <View style={styles.line} />
          <Text style={styles.txt1}>Or Login With</Text>
          <View style={styles.line} />
        </View>
        <View style={[styles.socialBtn, Platform.OS == 'android' && { justifyContent: 'center' }]}>
          <RoundButton
            title="Google"
            onPress={() => socialBtnClicked(SocialTypeStrings.google)}
            containerStyle={{ width: '47%', marginRight: 4 }}
            icon={AppImages.Auth.GoogleIcon}
            isLighter
            iconStyles={{
              marginTop: 2
            }}
          />
          {
            Platform.OS == 'ios' &&
            <RoundButton
              title="Apple"
              onPress={() => socialBtnClicked(SocialTypeStrings.apple)}
              containerStyle={{ width: '47%', marginLeft: 4 }}
              icon={AppImages.Auth.AppleIcon}
              isLighter
            />
          }
        </View>
        <View style={[styles.bottom, {
          marginVertical: hv(isNotchDevice ? 0 : 10),
        }]}>
          <Text style={styles.txt2}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => onLoginClick()
            }>
            <Text style={styles.fgTxt}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.labelStyles}>Copyright © 2023 ClassConnect. All rights reserved.</Text>
    </View>
  );
};

export default SignupSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: AppHorizontalMargin,
  },
  heading: {
    ...AppStyles.textBold,
    color: AppColors.black.black,
    fontSize: normalized(25),
    marginBottom: 5
  },
  top: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  checkbox: {
    color: AppColors.blue.mainBlue,
  },
  bold: {
    color: AppColors.blue.mainBlue,
    fontFamily: AppFonts.Synonyms.SemiBold,
  },
  fgTxt: {
    fontFamily: AppFonts.Synonyms.SemiBold,
    fontSize: normalized(16),
    color: AppColors.blue.mainBlue,
    marginVertical: hv(15),
  },
  txt1: {
    marginVertical: hv(15),
    ...AppStyles.textRegular,
    fontSize: normalized(12),
    color: AppColors.black.black,
    marginHorizontal: normalized(5),
  },
  txt2: {
    marginVertical: hv(15),
    ...AppStyles.textRegular,
    fontSize: normalized(16),
    color: AppColors.black.black,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width: normalized(70),
    height: 1,
    backgroundColor: AppColors.black.black,
  },
  createAccountLabel: {
    marginLeft: normalized(10),
    flex: 1,
    color: AppColors.black.black,
    fontSize: normalized(15),
    ...AppStyles.textRegular
  },
  labelStyles: {
    color: AppColors.grey.lighterLvl2,
    fontSize: normalized(11),
    ...AppStyles.textSemiBold,
    alignSelf: 'center',
    marginBottom: normalized(10)
  },
  socialBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});
