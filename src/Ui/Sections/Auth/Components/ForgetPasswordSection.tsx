import {
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { useDispatch } from 'react-redux';
import { AppHorizontalMargin, AppStyles } from '../../../../Utils/AppStyles';
import CommonDataManager from '../../../../Utils/CommonManager';
import { setAlertObj, setLoader } from '../../../../Redux/reducers/AppReducer';
import { ApiResponseHandler } from '../../../../Network/ApiResponseHandler';
import { postRequest } from '../../../../Network/Services/ApiServices';
import { FORGET_PASSWORD_URL } from '../../../../Network/Urls';
import { AppStrings } from '../../../../Utils/Strings';

interface Props {
  onConfirmEmail: (data: any) => void;
  onLogin: () => void;
  containerStyle?: ViewStyle
}

const ForgetPasswordSection = ({ onConfirmEmail, onLogin, containerStyle }: Props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState({
    email: false,
  });

  const forgetPasswordClicked = async () => {
    try {
      dispatch(setLoader(true));
      const requiresToken = false;
      const saveUserToken = false;
      const paramsObj = {
        email
      }
      let response: ApiResponseHandler<any> = await postRequest(FORGET_PASSWORD_URL, paramsObj, requiresToken, saveUserToken);
      if (response?.success) {
        console.log('Handle success here');
        onConfirmEmail({ email })
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

  return (
    <View style={[styles.btnContainer, containerStyle]}>
      {/* First */}
      <Text style={styles.heading}>Forgot Password</Text>
      <Text style={[styles.txt1, { marginTop: hv(10) }]}>
        Please provide your email ID to continue
      </Text>
      {/* Second */}
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
        maxLength={50}
        isError={error.email}
      />
      {/* Third */}
      <RoundButton
        title="Send Reset Link"
        onPress={() => forgetPasswordClicked()}
        containerStyle={{ width: '100%', marginTop: hv(isSmallDevice ? 25 : 35) }}
        isDisabled={!CommonDataManager.getSharedInstance().isEmailValid(email)}
      />
      <View style={styles.bottom}>
        <Text style={styles.txt1}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => onLogin()}>
          <Text style={styles.fgTxt}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ForgetPasswordSection;

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    padding: normalized(10),
    paddingHorizontal: AppHorizontalMargin,
    minHeight: hv(320),
    justifyContent: 'space-between'
  },
  heading: {
    ...AppStyles.textBold,
    color: AppColors.black.black,
    fontSize: normalized(21),
    marginTop: hv(10)
  },
  txt1: {
    ...AppStyles.textRegular,
    fontSize: normalized(15),
    color: AppColors.black.black,
    marginRight: normalized(5),
    textAlign: 'left',
  },
  fgTxt: {
    fontFamily: AppFonts.Synonyms.SemiBold,
    fontSize: normalized(14),
    color: AppColors.blue.mainBlue,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hv(16),
  },
});
