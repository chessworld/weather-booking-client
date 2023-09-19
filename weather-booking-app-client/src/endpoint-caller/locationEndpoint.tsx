import ApiService from "./apiService";
import { Location } from "./interfaces/locations/Location";

export default class LocationSearchEndpoint {
  static async searchLocations(query: string): Promise<Location[]> {
    const locationList = await ApiService.get(`/locations`, {
        params: {
            query: query
        }
    }).then((response) => response.data);
    return locationList;
  }
}
