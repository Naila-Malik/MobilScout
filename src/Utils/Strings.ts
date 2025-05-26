export const AppStrings = {
  Network: {
    internetError: 'Uh-oh! It seems like you’re offline, Please check your connection and try again',
    somethingWrong: 'Something went wrong',
    requestTimeoutError: 'Request Timed out',
    errorTitle: 'Alert',
    oopsErrorMsg: 'Oops... something went wrong. Please retry',
    tokenExpired: 'Unauthenticated.',
    recordNotFound: 'Record Not Found',
    notLoggedIn: 'User not logged in yet',
    iosGoogleCancelErr: 'The operation couldn’t be completed. (org.openid.appauth.general error -3.)'
  },
  Validation: {
    fieldsEmptyError: 'Please fill the fields properly',
    invalidEmailError: 'Email is invalid',
    passwordLengthError: 'Password should not be less than 8 characters.',
    passwordNotMatchError: 'Passwords does not match',
    emailEmptyError: "Email can't be empty",
    otpCodeEmptyError: "OTP Code can't be empty",
    maxImageSizeError:
      'The selected image size exceeds the maximum limit of 10MB.',
    noChildrenFoundErr: `There's no children found against this registration code`,
    incorrectOtpError: 'Hmm, you seem to have entered an incorrect code. Double-check and resubmit.',
    incorrectEmailAndPasswordErr: 'Hmm, you seem to have entered an incorrect email or password. Double-check and resubmit.'
  },
  Permissions: {
    contactPermission:
      'The app wants to access contacts. Go to Settings and enable it!',
    cameraPermission:
      'The app wants to access your camera. Go to Settings and enable it!',
    contactsUnavailable: 'Contacts not accessible',
    cancelled: 'Cancelled',
    success: 'Success',
  },
};

export const AsyncKeyStrings = {
  Auth: {
    userToken: 'user_token',
    userdata: 'user_data',
    appleUsersList: 'apple_users_list'
  },
  Teams: {
    secretData: 'secret_data',
  },
}

export const ios_app_client_id = '242105620586-5i0udocrh4mo0mpsuphgno6v3dp81gi5.apps.googleusercontent.com';
export const android_app_client_id = '242105620586-i4eii3o3covhc7gptsjvo518ho2v70mq.apps.googleusercontent.com'
export const web_client_id = '242105620586-rt22tp4qaf5ve8kqklu0804alhb8dq3p.apps.googleusercontent.com'