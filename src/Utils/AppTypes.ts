export interface AxiosParamsInterface {
  url: string;
  method: string;
  requiresToken?: boolean;
  params?: any;
  isFormData?: boolean;
  requestTimeoutDuration?: number;
  showLoader?: boolean;
  saveToken?: boolean;
}

export const axiosMethodTypes = {
  get: 'GET',
  post: 'POST',
  update: 'UPDATE',
  delete: 'DELETE',
};

export interface IReduxState {
  isLoaderStart: boolean;
  isNetConnected: boolean;
  safeArea: {top: number; bottom: number};
  userData: any;
  isNotchDevice: boolean;
  fetchUpdatedUser: any;
  alertObj: any;
}
