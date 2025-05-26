import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useRef } from 'react';
import { AppColors, hv } from '../../../../Utils/AppConstants';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface Props {
  pincode: string;
  setPincode: (val: string) => void;
  onSubmitPin: (val: boolean) => void;
}
const OtpInput = (props: Props) => {
  let selection = { start: props.pincode.length, end: props.pincode.length };
  const refPin = useRef<any>();

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View style={styles.otpContainer}>
          {[1, 2, 3, 4, 5, 6].map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => refPin.current.focus()}>
                <View
                  style={[
                    styles.container,
                    {
                      backgroundColor: props.pincode.charAt(index)
                        ? AppColors.white.white
                        : AppColors.grey.lighter,

                      borderColor: props.pincode.charAt(index)
                        ? AppColors.blue.mainBlue
                        : AppColors.grey.lighter,
                    },
                  ]}>
                  <Text style={styles.otpText}>{props.pincode.charAt(index)}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>
      <TextInput
        ref={refPin}
        value={props.pincode}
        selection={selection}
        maxLength={6}
        onSubmitEditing={() => refPin.current.blur()}
        onChangeText={async e => {
          props.setPincode(e);
          props.onSubmitPin(e.length == 6 ? true : false);
          if (e.length == 6) {
            Keyboard.dismiss();
          }
        }}
        autoCapitalize='none'
        style={{
          alignSelf: 'flex-start',
          fontSize: 5,
          opacity: 0,
          position: 'absolute',
          bottom: 0,
          left: -40
        }}
      />
    </View>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: hv(27)
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  container: {
    width: 40,
    height: 40,
    borderWidth: 1.5,
    margin: hv(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  otpText: {
    color: AppColors.grey.otpGrey,
  }
});
