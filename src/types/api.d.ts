import { DataError } from "@/error";

export type GetToken = () => Promise<string>;
export type GetBaseUrl = () => string;

export type ApiConfig = {
  getToken: GetToken;
  getUrl: GetBaseUrl;
};

export type ErrorResponse = {
  status: string;
  message: string;
  data?: DataError;
};
