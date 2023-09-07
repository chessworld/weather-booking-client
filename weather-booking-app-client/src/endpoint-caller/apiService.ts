import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export default class ApiService {
  // This is the class that will be used to interact with the API
  // Only Endpoint files should be using this class
  private static api: AxiosInstance = axios.create({
    baseURL: "http://170.64.139.37/weather_api",
  });

  public static initialise() {
    if (this.api === null) {
      this.api = axios.create({
        baseURL: "http://170.64.139.37/weather_api",
      });
    }
  }

  private static ensureInitialised() {
    if (this.api === null) {
      this.initialise();
    }
  }

  public static get(resource: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.api.get(resource, config);
  }

  public static put(resource: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.api.put(resource, data, config);
  }

  public static patch(resource: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.api.patch(resource, data, config);
  }

  public static post(resource: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    this.ensureInitialised();
    return this.api.post(resource, data, config);
  }

  public static delete(resource: string): Promise<AxiosResponse> {
    return this.api.delete(resource);
  }
}
