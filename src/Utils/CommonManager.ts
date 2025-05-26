import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import {ScreenProps, isAndroid} from './AppConstants';
import {AppStrings, AsyncKeyStrings} from './Strings';
import {
  setAlertObj,
  setChildList,
  setFetchUpdatedUser,
  setSelectedChild,
  setUserData,
  toggleDrawer,
} from '../Redux/reducers/AppReducer';
import {SocialTypeStrings} from './AppEnums';
import {getRequest} from '../Network/Services/ApiServices';
import {GET_CHILD_LIST_URL} from '../Network/Urls';

export default class CommonDataManager {
  static shared: CommonDataManager;
  _currentLanguage = 'en';
  _screenStack: ScreenProps | null = null;
  selector: any = null;
  dispatch: any = null;
  containerDispatcher: any;
  _packageDetails: any;
  static getSharedInstance() {
    if (CommonDataManager.shared == null) {
      CommonDataManager.shared = new CommonDataManager();
    }
    return CommonDataManager.shared;
  }
  setContainerDispatcher = (dispatch: any) => {
    this.containerDispatcher = dispatch;
  };
  getContainerDispatcher = () => {
    return this.containerDispatcher;
  };

  setReduxReducer = (select: any, dispatch: any) => {
    this.selector = select;
    this.dispatch = dispatch;
  };

  isEmailValid = (email: string) => {
    if (!email) {
      return false;
    }
    let validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return validEmailRegex.test(email.trim());
  };
  isPasswordValid = (password: string) => {
    return password?.trim()?.length >= 8;
  };
  isValidUrl = (url: string) => {
    const regex =
      /^((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?|[a-zA-Z]:\\[^\\\/\s]+(\\[^\\\/\s]+)*)$/i;
    return regex.test(url);
  };
  validateUrl = (url: string) => {
    if (url && !url?.toLowerCase()?.includes('http')) {
      return `https://${url}`;
    }
    return url;
  };

  _setScreenStack = (props: ScreenProps) => {
    this._screenStack = props;
  };

  // logoutUser = async () => {
  //   await AsyncStorage.removeItem(AsyncKeyStrings.Auth.userToken);
  //   await AsyncStorage.removeItem(AsyncKeyStrings.Auth.userdata);
  //   this.dispatch(setUserData(null));
  //   this.dispatch(toggleDrawer(false));
  // };

  capitalizeFirstLetter = (str: any) => {
    if (!str) {
      return '';
    }
    let firstChar = str.charAt(0);
    return firstChar.toUpperCase() + str.slice(1);
  };
  resetToScreen = (navigation: any, screenName: string, params?: any) => {
    let routeData: any = {
      name: screenName,
    };
    if (params) {
      routeData.params = params;
    }
    navigation.reset({
      index: 0,
      routes: [routeData],
    });
  };
  // getUserData = async () => {
  //   try {
  //     let user = await AsyncStorage.getItem(AsyncKeyStrings.Auth.userdata);
  //     if (user) {
  //       return JSON.parse(user);
  //     } else {
  //       return null;
  //     }
  //   } catch (e) {
  //     console.log('Error ', e);
  //     return null;
  //   }
  // };
  // saveUserData = async (data: any) => {
  //   try {
  //     await AsyncStorage.setItem(
  //       AsyncKeyStrings.Auth.userdata,
  //       JSON.stringify(data),
  //     );
  //   } catch (e) {
  //     console.log('Error storing userdata', e);
  //   }
  // };
  // getUserToken = async () => {
  //   try {
  //     let t = await AsyncStorage.getItem(AsyncKeyStrings.Auth.userToken);
  //     if (t) {
  //       return t;
  //     } else {
  //       return null;
  //     }
  //   } catch (e) {
  //     console.log('Error', e);
  //     return null;
  //   }
  // };
  // saveUserToken = async (token: string) => {
  //   try {
  //     const refinedToken = this.getRefinedBearerToken(token);
  //     console.log('token: ', token);
  //     await AsyncStorage.setItem(AsyncKeyStrings.Auth.userToken, refinedToken);
  //   } catch (e) {
  //     console.log('Error storing usertoken', e);
  //   }
  // };

  getChildList = async (parentId: string) => {
    try {
      const res: any = await getRequest(GET_CHILD_LIST_URL + parentId);
      console.log('getChildList response : ', res);
      if (res.success) {
        if (res.data?.length > 0) {
          this.dispatch(setChildList(res.data));
          this.dispatch(setSelectedChild(res.data[0]));
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      console.log('Error while getting child list', error);
    }
  };

  getRefinedBearerToken = (rawToken: string) => {
    const startIndex = rawToken.indexOf('=');
    const endIndex = rawToken.indexOf(' ');
    return rawToken.substring(startIndex + 1, endIndex - 1);
  };

  // getUpdatedUser = async (internetCheck: boolean, teamId: string | null) => {
  //   const res: any = await getUpdatedUserRequest(internetCheck).finally(() =>
  //     this.dispatch(setFetchUpdatedUser(null)),
  //   );
  //   if (res.success) {
  //     await this.saveUserData(res.data);
  //     this.dispatch(setUserData(res.data));
  //   } else {
  //     console.log('Error fetching user ', res?.message);
  //   }
  // };

  redirectToUrl = async (url: string) => {
    try {
      await Linking.openURL(this.validateUrl(url));
    } catch (e) {
      console.log('Something wrong ', e);
    }
  };

  // socialCallRequest = async (socialType: string) => {
  //   let socialParams;
  //   if (socialType == SocialTypeStrings.google) {
  //     const response = await getGoogleUserRequest();
  //     console.log('response getGoogleUserRequest: ', response);
  //     if (response.success) {
  //       socialParams = response.data;
  //     } else if (response.message !== AppStrings.Permissions.cancelled) {
  //       this.dispatch(
  //         setAlertObj({
  //           title: AppStrings.Network.errorTitle,
  //           message: response?.message,
  //         }),
  //       );
  //     }
  //   }

  //   if (socialType == SocialTypeStrings.facebook) {
  //     const response: any = await facebookLoginRequest();
  //     if (response.success) {
  //       socialParams = {
  //         token: response.data?.id,
  //         first_name: response.data?.first_name
  //           ? response.data?.first_name
  //           : '',
  //         last_name: response.data?.last_name ? response.data?.last_name : '',
  //         email: response.data?.email ? response.data?.email : '',
  //       };
  //     } else if (response.message !== AppStrings.Permissions.cancelled) {
  //       this.dispatch(
  //         setAlertObj({
  //           title: AppStrings.Network.errorTitle,
  //           message: response?.message,
  //         }),
  //       );
  //     }
  //   }

  //   if (socialType == SocialTypeStrings.apple) {
  //     const response: any = await appleLoginRequest();
  //     if (response.success) {
  //       console.log(
  //         'This is response from Apple => ',
  //         JSON.stringify(response),
  //       );
  //       if (
  //         response.data?.user &&
  //         response.data?.fullName?.givenName &&
  //         response.data?.fullName?.familyName &&
  //         response.data?.email
  //       ) {
  //         socialParams = {
  //           token: response.data?.user,
  //           first_name: response.data?.fullName?.givenName,
  //           last_name: response.data?.fullName?.familyName,
  //           email: response.data?.email ? response.data?.email : '',
  //         };
  //         await this.saveAppleUser(socialParams);
  //       } else {
  //         const appleUserObj = await this.getAppleUser(response.data?.user);
  //         socialParams = {
  //           ...appleUserObj,
  //         };
  //       }
  //     } else {
  //       this.dispatch(
  //         setAlertObj({
  //           title: AppStrings.Network.errorTitle,
  //           message: response?.message,
  //         }),
  //       );
  //     }
  //   }

  //   if (socialParams) {
  //     return {
  //       ...socialParams,
  //       // provider_type: socialType,
  //     };
  //   } else {
  //     return null;
  //   }
  // };

  // getAppleUser = async (userId: string) => {
  //   try {
  //     let list = await AsyncStorage.getItem(
  //       AsyncKeyStrings.Auth.appleUsersList,
  //     );
  //     if (list) {
  //       const parsedList = JSON.parse(list);
  //       const foundUser = parsedList.find((el: any) => el.token == userId);
  //       return foundUser ? foundUser : null;
  //     } else {
  //       return null;
  //     }
  //   } catch (e) {
  //     console.log('Error', e);
  //     return null;
  //   }
  // };
  // saveAppleUser = async (userObj: any) => {
  //   try {
  //     let list = await AsyncStorage.getItem(
  //       AsyncKeyStrings.Auth.appleUsersList,
  //     );
  //     if (list) {
  //       const oldList = JSON.stringify(list);
  //       const updatedList = [...oldList, userObj];
  //       await AsyncStorage.setItem(
  //         AsyncKeyStrings.Auth.appleUsersList,
  //         JSON.stringify(updatedList),
  //       );
  //     } else {
  //       await AsyncStorage.setItem(
  //         AsyncKeyStrings.Auth.appleUsersList,
  //         JSON.stringify([userObj]),
  //       );
  //     }
  //   } catch (e) {
  //     console.log('Error storing usertoken', e);
  //   }
  // };

  // getUniqueFileName = () => {
  //   const timestamp = new Date().getTime();
  //   const randomString = Math.random().toString(36).substring(2, 8);
  //   const uniqueFileName = `${timestamp}_${randomString}`;
  //   return uniqueFileName;
  // };

  // downloadMediaFromUrl = async (
  //   isVideo: boolean,
  //   mediaUrl: string,
  //   onProgress: (obj: DownloadProgressCallbackResult) => void,
  //   onComplete: (url: string) => void,
  // ) => {
  //   const downloadDest = `${RNFS.DocumentDirectoryPath}/${this.getUniqueFileName()}.${isVideo ? 'mp4' : 'png'}`;
  //   try {
  //     const options = {
  //       fromUrl: mediaUrl,
  //       toFile: downloadDest,
  //       discretionary: true,
  //       progress: onProgress,
  //     };

  //     const response = RNFS.downloadFile(options);
  //     console.log('response: ', response);

  //     response.promise
  //       .then(async result => {
  //         console.log('result: ', result);
  //         if (result.statusCode === 200) {
  //           console.log('Video downloaded successfully:', downloadDest);
  //           onComplete(downloadDest);
  //         } else {
  //           console.error('Error downloading video:', result.statusCode);
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error while downloading video:', error);
  //       });
  //   } catch (error) {
  //     console.error('Error in downloadVideo function:', error);
  //   }
  // };

  // shareVideo = async (videoUrl: string) => {
  //   try {
  //     const localUri = videoUrl;
  //     console.log("videoUrl: ", videoUrl);
  //     const filePath =
  //       Platform.OS == 'ios' ? localUri : `content://${localUri}`;
  //     if (isAndroid) {
  //       this.saveToCameraRoll(filePath, 'video');
  //       return;
  //     }
  //     let shareOptions = {
  //       url: filePath,
  //       type: 'video/mp4',
  //     };
  //     await Share.open(shareOptions)
  //       .then((res: any) => console.log('res:', res))
  //       .catch((err: any) => console.log('err', err));
  //   } catch (e) {
  //     console.log('Error sharing video ', e);
  //   }
  // };

  // shareImage = async (imageUrl: string) => {
  //   const localUri = isAndroid ? imageUrl : `file://${imageUrl}`;
  //   if (isAndroid) {
  //     this.saveToCameraRoll(imageUrl, 'photo');
  //     return;
  //   }
  //   console.log("localUri: ", localUri);
  //   await RNFS.readFile(localUri, "base64")
  //     .then(async (base64String) => {
  //       console.log("base64 image => ", base64String);
  //       await Share.open({
  //         url: `data:image/jpeg;base64,${base64String}`,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error reading image:", error);
  //     });
  // }

  // hasAndroidPermission = async () => {
  //   const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  //   const hasPermission = await PermissionsAndroid.check(permission);
  //   if (hasPermission) {
  //     return true;
  //   }
  //   const status = await PermissionsAndroid.request(permission);
  //   return status === 'granted';
  // };

  // saveToCameraRoll = async (uri: string, type: 'photo' | 'video') => {
  //   if (Platform.OS === 'android' && !(await this.hasAndroidPermission())) {
  //     console.log('No writing permission');
  //     return;
  //   }
  //   CameraRoll.save(uri, { type: type, album: 'ClassConnect' }).then(() => {
  //     ToastAndroid.show('File successfully saved to gallery', 2000)
  //   });
  // };
}
