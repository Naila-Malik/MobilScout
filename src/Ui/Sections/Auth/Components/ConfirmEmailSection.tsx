import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  AppColors,
  AppFonts,
  hv,
  isSmallDevice,
  normalized,
} from '../../../../Utils/AppConstants';
import RoundButton from '../../../Components/Button/RoundButton';
import { AppHorizontalMargin } from '../../../../Utils/AppStyles';
import { useDispatch } from 'react-redux';
import { setAlertObj, setLoader } from '../../../../Redux/reducers/AppReducer';
import { ApiResponseHandler } from '../../../../Network/ApiResponseHandler';
import { postRequest } from '../../../../Network/Services/ApiServices';
import { FORGET_PASSWORD_URL } from '../../../../Network/Urls';
import { AppStrings } from '../../../../Utils/Strings';

interface Props {
  email: string,
  onBackPress: () => void;
  onResetPassword: () => void;
}

const ConfirmEmailSection = ({ email, onBackPress, onResetPassword }: Props) => {
  const dispatch = useDispatch();

  const resendLinkRequest = async () => {
    try {
      dispatch(setLoader(true));
      const requiresToken = false;
      const saveUserToken = false;
      const paramsObj = {
        email
      }
      let response: ApiResponseHandler<any> = await postRequest(FORGET_PASSWORD_URL, paramsObj, requiresToken, saveUserToken);
      if (response?.success) {
        console.log('Link has been sent again');
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
    <View style={styles.btnContainer}>
      {/* First */}
      <Text style={styles.heading}>Confirm Email</Text>
      <Text style={styles.txt1}>
        We have sent you an email with a link to confirm your email address.
      </Text>
      {/* Second */}
      <View style={styles.btmTxt}>
        <Text style={styles.txt2}>Haven’t received the link yet?</Text>
      </View>
      {/* Third */}
      <RoundButton
        title="Resend Link"
        onPress={() => resendLinkRequest()}
        containerStyle={{ width: '100%', marginTop: hv(20) }}
        isLighter
      />
      <TouchableOpacity onPress={() => onBackPress()}>
        <Text style={styles.fgTxt}>Change Email</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ConfirmEmailSection;

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
  txt1: {
    marginVertical: hv(15),
    fontFamily: AppFonts.Synonyms.Regular,
    fontSize: normalized(15),
    color: AppColors.black.black,
    marginHorizontal: normalized(5),
    textAlign: 'left',
  },
  txt2: {
    marginVertical: hv(15),
    fontFamily: AppFonts.Sans.Light,
    fontSize: normalized(15),
    color: AppColors.black.black,
    marginHorizontal: normalized(5),
    textAlign: 'left',
  },
  btmTxt: {
    borderTopWidth: 1,
    borderTopColor: AppColors.blue.lighterBlue,
  },
  fgTxt: {
    fontFamily: AppFonts.Synonyms.SemiBold,
    fontSize: normalized(15),
    color: AppColors.blue.mainBlue,
    marginTop: hv(25),
    marginBottom: hv(isSmallDevice ? 15 : 10),
    alignSelf: 'center',
  },
});
