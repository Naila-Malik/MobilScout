import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {
  AppColors,
  AppFonts,
  AppImages,
  hv,
  isAndroid,
  isSmallDevice,
  normalized,
} from '../../../../Utils/AppConstants';
import { AppHorizontalMargin, AppStyles } from '../../../../Utils/AppStyles';
import RoundInput from '../../../Components/CustomInput/RoundInput';
import RoundButton from '../../../Components/Button/RoundButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommonDataManager from '../../../../Utils/CommonManager';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStore } from '../../../../Redux/store/AppStore';
import { setAlertObj, setLoader, setUserData } from '../../../../Redux/reducers/AppReducer';
import { ApiResponseHandler } from '../../../../Network/ApiResponseHandler';
import { UserViewModel } from '../../../../Models/UserModel';
import { postRequest } from '../../../../Network/Services/ApiServices';
import { GOOGLE_SIGNIN_REQUEST_URL, LOGIN_URL } from '../../../../Network/Urls';
import { AppStrings } from '../../../../Utils/Strings';
import { SocialTypeStrings } from '../../../../Utils/AppEnums';

interface Props {
  onOtpClick: (otpParams: any) => void;
  onForgetPasswordClick: () => void;
  onSignupClick: () => void
}

const LoginSection = ({ onOtpClick, onForgetPasswordClick, onSignupClick }: Props) => {
  const dispatch = useDispatch();
  const { isNotchDevice } = useSelector((state: AppRootStore) => state.AppReducer);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const loginClicked = async () => {
    const paramsObj = {
      loginEmail: email,
      password: password,
    }
    try {
      dispatch(setLoader(true));
      const requiresToken = false;
      const saveUserToken = true;
      let response: ApiResponseHandler<UserViewModel> = await postRequest(LOGIN_URL, paramsObj, requiresToken, saveUserToken);
      dispatch(setLoader(false));
      console.log("response: ", response);
      if (response?.success) {
        await loginSuccessFunc(response.data?.parentId, response.data?.emailAddress, response.data);
      } else {
        dispatch(setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: response?.statusCode == 401 ? AppStrings.Validation.incorrectEmailAndPasswordErr : response.message
        }))
      }
    } catch (e) {
      console.log('error login ', e);
      dispatch(setLoader(false));
    }
  };

  const loginSuccessFunc = async (parentId: string, emailAddress: string, fullData: any) => {
    const childStatus = await CommonDataManager.getSharedInstance().getChildList(parentId);
    if (!childStatus) {
      const paramsObj = {
        parentId: parentId,
        emailAddress: emailAddress
      }
      onOtpClick(paramsObj);
      return;
    }
    await CommonDataManager.getSharedInstance().saveUserData(fullData);
    dispatch(setUserData(fullData));
  }

  const googleSigninRequest = async (paramsObj: any) => {
    try {
      dispatch(setLoader(true));
      const requiresToken = false;
      const saveUserToken = true;
      let response: ApiResponseHandler<UserViewModel> = await postRequest(GOOGLE_SIGNIN_REQUEST_URL, paramsObj, requiresToken, saveUserToken);
      console.log("response - googleSignupRequest: ", JSON.stringify(response));
      if (response?.success) {
        await loginSuccessFunc(response.data?.parentId, response.data?.emailAddress, response.data);
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
      await googleSigninRequest(socialParams);
    } else {
      console.log('Some problem getting social data');
    }
  };

  return (
    <View
      style={styles.container}>
      <View>
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.txt}>Sign-In to continue</Text>
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
            marginTop: hv(15),
            width: '100%',
          }}
          keyboardType="email-address"
          isError={error.email}
          maxLength={50}
          showErrorIcon
        />
        <RoundInput
          title="Enter Password"
          placeholder="Password"
          value={password}
          isPassword
          onChangeText={e => {
            setPassword(e);
            setError({
              ...error,
              password:
                CommonDataManager.getSharedInstance().isPasswordValid(
                  e,
                ) || e == ''
                  ? false
                  : true,
            });
          }}
          containerStyle={{
            marginTop: hv(15),
            width: '100%',
          }}
          keyboardType="default"
          isError={error.password}
          maxLength={20}
          autoCapitalize='none'
        />
      </View>
      <View style={styles.btnCon}>
        <RoundButton
          title="Sign In"
          onPress={loginClicked}
          isDisabled={
            error.email || error.password || !email || !password
              ? true
              : false
          }
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => onForgetPasswordClick()
          }>
          <Text style={styles.forgotPwdTxt}>Forgot Password</Text>
        </TouchableOpacity>
        <View style={{ ...AppStyles.horiCommon, marginTop: hv(35), marginBottom: hv(isNotchDevice ? 25 : 20) }}>
          <View style={styles.line} />
          <Text style={[styles.txt1, { fontSize: normalized(12) }]}>Or Login With</Text>
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
              marginTop: 4
            }}
          />
          {
            Platform.OS == 'ios' &&
            <RoundButton
              title="Apple"
              onPress={() => { }}
              containerStyle={{ width: '47%', marginLeft: 4 }}
              icon={AppImages.Auth.AppleIcon}
              isLighter
              iconStyles={{
                marginTop: 3
              }}
            />
          }
        </View>
        <View style={styles.bottom}>
          <Text style={styles.txt2}>Don’t have an account?</Text>
          <TouchableOpacity
            onPress={() => onSignupClick()}
          >
            <Text style={styles.fgTxt}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: AppHorizontalMargin,
  },
  heading: {
    fontFamily: AppFonts.Synonyms.Bold,
    color: AppColors.black.black,
    fontSize: normalized(26),
    marginTop: hv(15)
  },
  txt: {
    marginTop: hv(15),
    color: AppColors.black.black,
    fontSize: normalized(15),
    ...AppStyles.textRegular
  },
  btnCon: {
    marginTop: hv(35),
  },
  forgotPwdTxt: {
    ...AppStyles.textSemiBold,
    fontSize: normalized(15),
    color: AppColors.blue.mainBlue,
    marginTop: hv(isSmallDevice ? 15 : 25)
  },
  fgTxt: {
    ...AppStyles.textSemiBold,
    fontSize: normalized(16),
    color: AppColors.blue.mainBlue,
  },
  txt1: {
    ...AppStyles.textRegular,
    fontSize: normalized(16),
    color: AppColors.black.black,
    marginHorizontal: normalized(5),
  },
  txt2: {
    ...AppStyles.textRegular,
    fontSize: normalized(16),
    color: AppColors.black.black,
    marginHorizontal: normalized(5),
  },
  line: {
    width: normalized(70),
    height: 1,
    backgroundColor: AppColors.black.black,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hv(20),
    paddingTop: hv(20),
    paddingBottom: !isAndroid && isSmallDevice ? hv(30) : isAndroid ? hv(10) : 0
  },
  socialBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '100%',
  }
});
