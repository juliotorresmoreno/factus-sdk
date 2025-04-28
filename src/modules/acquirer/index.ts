import { GetBaseUrl, GetToken } from "@/types/api";

class AcquirerModule {
  public readonly getToken: GetToken;
  public readonly getUrl: GetBaseUrl;

  constructor(getToken: GetToken, getUrl: GetBaseUrl) {
    this.getToken = getToken;
    this.getUrl = getUrl;
  }
}

export function createAcquirerModule(getToken: GetToken, getUrl: GetBaseUrl) {
  return new AcquirerModule(getToken, getUrl);
}
