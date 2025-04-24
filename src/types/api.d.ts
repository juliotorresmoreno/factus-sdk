export type GetToken = () => Promise<string>;
export type GetBaseUrl = () => string;

export type ApiConfig = {
  getToken: GetToken;
  getUrl: GetBaseUrl;
};
