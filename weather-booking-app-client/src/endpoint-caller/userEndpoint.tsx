import ApiService from "./apiService";
import { UserEndpointResponse } from "./interfaces/users/UserEndpointResponse";

class UserEndpoint {
  static async getUser(userId: string): Promise<UserEndpointResponse> {
    const userData = await ApiService.get(`/users/${userId}`).then((response) => response.data);
    return userData;
  }

  static async completeUserTutorial(userId: string): Promise<UserEndpointResponse> {
    const response = ApiService.put(`/users/${userId}`, { completed_tutorial: true })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
    return response;
  }

  static async createUser(name: string, completedTutorial: boolean): Promise<UserEndpointResponse> {
    const response = ApiService.post("/users/", {
      name: name,
      completed_tutorial: completedTutorial,
    }).then((response) => response.data);
    return response;
  }
}

export default UserEndpoint;
