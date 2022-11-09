import { storage } from "../utils/storage";

import axios from "axios";

const { token } = storage.getAuthStorage();

const configApi = axios.create();

configApi.defaults.baseURL = import.meta.env.VITE_API_URL;

configApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const addTokenInAuthorizationHeader = (token: string) => configApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const cleanAuthorizationHeader = () => configApi.defaults.headers.common["Authorization"] = undefined;

export const api = {
  configApi,
  addTokenInAuthorizationHeader,
  cleanAuthorizationHeader
}