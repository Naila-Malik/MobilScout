import axios from 'axios';
import CommonDataManager from '../Utils/CommonManager';
import { AppStrings } from '../Utils/Strings';
import { AxiosParamsInterface, axiosMethodTypes } from '../Utils/AppTypes';
import { ewcApiKey, ewcAppId } from './Urls';
import NetInfo from '@react-native-community/netinfo'

const Api = async (apiParamsObj: AxiosParamsInterface) => {
  const {
    url,
    method,
    requiresToken = true,
    params = {},
    isFormData = false,
    requestTimeoutDuration = 30000,
    saveToken = false,
  } = apiParamsObj;


  let headers: any = {
    [`EWC-API-KEY`]: ewcApiKey,
    [`EWC-APP-ID`]: ewcAppId
  }
  const { CancelToken } = axios;
  const source = CancelToken.source();
  var apiTimeout = setTimeout(() => {
    source.cancel(AppStrings.Network.requestTimeoutError);
  }, requestTimeoutDuration);

  if (isFormData) {
    headers['Content-Type'] = 'multipart/form-data';
  } else {
    headers['Content-Type'] = 'application/json';
  }

  let internetValue = await checkInternet()
  if (!internetValue) {
    return {
      message: AppStrings.Network.internetError,
      data: null,
      success: false,
    };
  }

  if (requiresToken) {
    const userToken =
      await CommonDataManager.getSharedInstance().getUserToken();
    headers.Authorization = `Bearer ${userToken}`;
  }

  const structure: any = {
    url,
    method,
    headers,
    cancelToken: source.token,
  };

  if (method === axiosMethodTypes.get) {
    structure.params = params;
  } else {
    structure.data = params;
  }
  return axios(structure)
    .then(async (resp: any) => {
      if (saveToken && resp?.headers[`set-cookie`][0]) {
        await CommonDataManager.getSharedInstance().saveUserToken(resp?.headers[`set-cookie`][0])
      }
      return {
        message: '',
        data: resp.data,
        success: true,
        statusCode: 200
      }
    })
    .catch(async error => {
      const errorCode = error?.response?.status
      return {
        message: errorCode == 500 || errorCode == 404 ? AppStrings.Network.oopsErrorMsg :
          error?.response?.data?.message || error?.message || AppStrings.Network.oopsErrorMsg,
        data: null,
        success: false,
        statusCode: errorCode
      };
    }).finally(() => {
      clearTimeout(apiTimeout);
    })
}

const checkInternet = async () => {
  let netState = await NetInfo.fetch()
  return netState.isConnected
};

export default Api;