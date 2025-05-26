import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  setAlertObj,
  setLoader,
  setUserData,
} from '../../../../Redux/reducers/AppReducer';
import {postRequest} from '../../../../Network/Services/ApiServices';
import {VERIFY_REG_CODE_URL} from '../../../../Network/Urls';
import CommonDataManager from '../../../../Utils/CommonManager';
import {
  AppColors,
  AppFonts,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import {AppStrings} from '../../../../Utils/Strings';
// import Icon from 'react-native-vector-icons/Ionicons'; // optional for back arrow
import {ScreenProps} from '../../../../Utils/AppConstants';

const OTP_LENGTH = 4;

const OtpScreen = (props: ScreenProps) => {
  const [pin, setPin] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(60);
  const inputs = useRef<(TextInput | null)[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);

      if (index < OTP_LENGTH - 1) {
        inputs.current[index + 1]?.focus();
      }
    } else if (text === '') {
      const newPin = [...pin];
      newPin[index] = '';
      setPin(newPin);
    }
  };

  // const verifyOtp = async () => {
  //   const code = pin.join('');
  //   const paramsObj = {
  //     regCode: code,
  //   };

  const verifyOtp = async () => {
    const code = pin.join('');
    if (code === '1234') {
      // set user data here to change stack
      dispatch(
        setUserData({
          name: 'John Doe',
          email: 'johndoe@gmail.com',
        }),
      );
    }
  };

  // try {
  //   dispatch(setLoader(true));
  //   const response = await postRequest(
  //     VERIFY_REG_CODE_URL,
  //     // paramsObj,
  //     false,
  //     true,
  //   );

  //   if (response?.success) {
  //     console.log('i am in success case');
  //     if (response.data) {
  //       // await CommonDataManager.getSharedInstance().saveUserData(response.data);
  //       dispatch(setUserData(response.data));
  //     } else {
  //       dispatch(
  //         setAlertObj({
  //           title: AppStrings.Network.errorTitle,
  //           message: AppStrings.Validation.noChildrenFoundErr,
  //         }),
  //       );
  //     }
  //   } else {
  //     dispatch(
  //       setAlertObj({
  //         title: AppStrings.Network.errorTitle,
  //         message:
  //           response?.statusCode === 400 || response?.statusCode === 401
  //             ? AppStrings.Validation.incorrectOtpError
  //             : response.message,
  //       }),
  //     );
  //   }
  // } catch (e) {
  //   console.log('Error during OTP verification:', e);
  // } finally {
  //   dispatch(setLoader(false));
  // }

  const handleResend = () => {
    // if (timer === 0) {
    //   // Implement resend logic
    //   console.log('Resending OTP...');
    //   setTimer(60); // restart timer
    // }
  };

  const isPinComplete = pin.every(p => p !== '');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          {/* <Icon name="chevron-back" size={28} color="#000" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enter PIN</Text>
        <View style={{width: 28}} /> {/* Spacer for symmetry */}
      </View>

      {/* Body */}
      <Text style={styles.title}>Enter 4-Digit PIN</Text>
      <Text style={styles.subtitle}>
        Please enter PIN associated with your account
      </Text>

      <View style={styles.otpContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.otpBox}
            autoFocus={index === 0}
          />
        ))}
      </View>

      {/* Timer + Resend */}
      <Text style={styles.timerText}>
        Wait for 00:{timer < 10 ? `0${timer}` : timer}{' '}
        {timer === 0 && (
          <Text onPress={handleResend} style={styles.resendText}>
            Send Again
          </Text>
        )}
      </Text>

      {/* You can call verifyOtp() automatically when all 4 digits are entered, or use a button */}
      {isPinComplete && (
        <TouchableOpacity style={styles.verifyBtn} onPress={verifyOtp}>
          <Text style={styles.verifyBtnText}>Verify</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: normalized(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hv(15),
  },
  headerTitle: {
    fontSize: normalized(16),
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  title: {
    fontSize: normalized(22),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: hv(20),
  },
  subtitle: {
    fontSize: normalized(14),
    textAlign: 'center',
    color: '#666',
    marginTop: hv(10),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: hv(30),
    marginBottom: hv(20),
  },
  otpBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    fontSize: normalized(20),
  },
  timerText: {
    textAlign: 'center',
    fontSize: normalized(13),
    color: '#333',
  },
  resendText: {
    color: '#FF6C00',
    fontWeight: '600',
  },
  verifyBtn: {
    marginTop: hv(30),
    alignSelf: 'center',
    backgroundColor: '#FF6C00',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10,
  },
  verifyBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: normalized(16),
  },
});
