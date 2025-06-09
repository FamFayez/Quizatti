import axios from "axios";
import { baseUrl } from "../utils/constants";

export const postData = async (
  url,
  data,
  addToken = true,
  lang = "en",
  responseType
) => {
  const authToken =
    typeof addToken === "string" ? addToken : sessionStorage.getItem("token");
  const config = addToken
    ? {
        responseType: responseType ? responseType : undefined,
        headers: {
          Authorization: authToken,
          lang,
        },
      }
    : {};
  return await axios.post(baseUrl + url, data, config);
};

export const getData = async (
  url,
  addToken = true,
  lang = "en",
  responseType
) => {
  const authToken =
    typeof addToken === "string" ? addToken : sessionStorage.getItem("token");
  const config = addToken
    ? {
        responseType: responseType ? responseType : undefined,
        headers: {
          Authorization: authToken,
          lang,
        },
      }
    : {};
  return await axios.get(baseUrl + url, config);
};

export const deleteDataToken = async (
  url,
  addToken = true,
  lang = "en",
  responseType
) => {
  const authToken =
    typeof addToken === "string" ? addToken : sessionStorage.getItem("token");
  const config = {
    responseType: responseType ? responseType : undefined,
    headers: {
      Authorization: authToken,
      lang,
    },
  };
  return await axios.delete(baseUrl + url, config);
};

export const putDataToken = async (
  url,
  data,
  addToken = true,
  lang = "en",
  responseType
) => {
  const authToken =
    typeof addToken === "string" ? addToken : sessionStorage.getItem("token");
  const config = addToken
    ? {
        responseType: responseType ? responseType : undefined,
        headers: {
          Authorization: authToken,
          lang,
        },
      }
    : {};
  return await axios.put(baseUrl + url, data, config);
};

export const patchDataToken = async (
  url,
  data,
  addToken = true,
  lang = "en",
  responseType
) => {
  const authToken =
    typeof addToken === "string" ? addToken : sessionStorage.getItem("token");
  const config = addToken
    ? {
        responseType: responseType ? responseType : undefined,
        headers: {
          Authorization: authToken,
          lang,
        },
      }
    : {};
  return await axios.patch(baseUrl + url, data, config);
};
