import Api from "../Api";
import { ApiResponseHandler } from "../ApiResponseHandler"
import { axiosMethodTypes } from "../../Utils/AppTypes";

export const postRequest = async <T>(
  url: string,
  params: any,
  requiresToken = true,
  saveToken = false,
): Promise<ApiResponseHandler<T>> => {
  let apiRequest = await Api({
    url,
    method: axiosMethodTypes.post,
    params: params,
    requiresToken,
    saveToken
  });
  return apiRequest;
};

export const getRequest = async <T>(url: string): Promise<ApiResponseHandler<T>> => {
  let apiRequest = await Api({
    url,
    method: axiosMethodTypes.get
  });
  return apiRequest;
}
