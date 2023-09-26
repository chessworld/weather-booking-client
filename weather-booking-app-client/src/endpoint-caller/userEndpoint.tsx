import ApiService from "./apiService";
import { UserEndpointResponse } from "./interfaces/users/UserEndpointResponse";

class UserEndpoint {
  static async getUser(userId: string): Promise<UserEndpointResponse> {
    if (userId) {
      const userData = await ApiService.get(`/users/${userId}`).then((response) => response.data);
      return userData;
    }

    throw Error(`Invalid userId of type ${typeof userId}`);
  }

  static async completeUserTutorial(userId: string): Promise<UserEndpointResponse> {
    const response = ApiService.patch(`/users/${userId}/`, { completed_tutorial: true })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
    return response;
  }

  static async createUser(name: string, completedTutorial: boolean=false): Promise<UserEndpointResponse> {
    const response  = ApiService.post("/users/", {
        name: name,
        completed_tutorial: completedTutorial,
    }).then((response) => response.data);
    return response;
  }

  static async patchUserName(userId: string, name: string): Promise<UserEndpointResponse> {
    const response = ApiService.patch(`/users/${userId}/`, { name: name})
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
      return response;
  }
}

export default UserEndpoint;
