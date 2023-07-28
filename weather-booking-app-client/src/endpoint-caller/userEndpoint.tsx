import { BASE_URL } from '../config.test';

type UserEndpointResponse = {
    id?: string,
    error?: string,
    name?: string,
    completed_tutorial: string
}

class UserEndpoint {
    static BASE_URL: string = BASE_URL;

    static options(method: 'GET' | 'POST' | 'PUT', body?: { [category: string]: any }): RequestInit {
        return {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : null
        }
    };

    static async getUser(userId: string): Promise<UserEndpointResponse> {
        const url = `${UserEndpoint.BASE_URL}/users/${userId}`;

        const response = await fetch(url, UserEndpoint.options('GET'));

        return response.json();
    }

    static async completeUserTutorial(userId: string): Promise<UserEndpointResponse> {
        const url = `${UserEndpoint.BASE_URL}/users/${userId}/`;

        const response = await fetch(url, UserEndpoint.options('PUT', {
            "completed_tutorial": true
        }));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    static async createUser(): Promise<UserEndpointResponse> {
        const url = `${UserEndpoint.BASE_URL}/users/`;

        const response = await fetch(url, UserEndpoint.options('POST'));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }
}

export default UserEndpoint;
