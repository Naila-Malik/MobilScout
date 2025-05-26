import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../../../Utils/Routes';

interface FormData {
  mobile: string;
}

const AuthLandingPage = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Submitted Mobile Number:', data.mobile);
    // You can dispatch this data via Redux or API call here
    navigation.navigate(Routes.Auth.OtpScreen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          mobil<Text style={styles.orange}>scout</Text>
        </Text>
      </View>

      <Text style={styles.welcome}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login with your mobile number</Text>

      <Text style={styles.label}>Mobile Number</Text>
      <Controller
        control={control}
        name="mobile"
        rules={{required: true, pattern: /^\+92\d{10}$/}}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="+92 | Enter your mobile number"
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
          />
        )}
      />
      {errors.mobile && (
        <Text style={styles.error}>Please enter a valid +92 number</Text>
      )}

      <Text style={styles.hint}>We'll send you a verification code</Text>

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Send Verification Code</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing you agree to our{' '}
          <Text style={styles.link}>Terms of services</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>

        <Text style={styles.footerText}>
          Don’t have an account? <Text style={styles.link}>Signup</Text>
        </Text>
      </View>
    </View>
  );
};

export default AuthLandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  orange: {
    color: '#FF6C00',
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6C00',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: 'gray',
    marginBottom: 30,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  hint: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF6C00',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginVertical: 5,
  },
  link: {
    color: '#FF6C00',
  },
});
