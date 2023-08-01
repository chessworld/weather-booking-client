import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export default class ApiService {
  // This is the class that will be used to interact with the API
  // Only Endpoint files should be using this class
  private static api: AxiosInstance;

  public static initialise() {
    this.api = axios.create({
      baseURL: "http://127.0.0.1:8000/weather_api",
    });
  }

  public static get(resource: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.api.get(resource, config);
  }

  public static put(resource: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.api.put(resource, data, config);
  }

  public static post(resource: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.api.post(resource, data, config);
  }

  public static delete(resource: string): Promise<AxiosResponse> {
    return this.api.delete(resource);
  }
}
