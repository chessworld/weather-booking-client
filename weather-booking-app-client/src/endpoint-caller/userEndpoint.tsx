class UserEndpoint {
    static BASE_URL: string = "http://127.0.0.1:8000/weather_api";

    constructor(locationData: any, enums: any) {
        /* this.BASE_URL = process.env.REACT_APP_WEATHER_API_BASE_URL || "http://127.0.0.1:8000/weather_api" */
    }

    static options(method: string, body?: { [category: string]: any }): any {
        return {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    };

    static async getUser(userId: string): Promise<{[category:string]: any}> {
        const usersRoute = "/users/" + userId;
        const url = UserEndpoint.BASE_URL + usersRoute;

        return fetch(url, UserEndpoint.options('GET'))
    }

    static async markUserCompletedTutorial(userId: string): Promise<any> {
        const enumsRoute = "/user/" + userId + "/"
        const url = UserEndpoint.BASE_URL + enumsRoute;

        return fetch(url, UserEndpoint.options('POST', {
            "completed_tutorial": true
        }));
    }

    static async createUser(userName?: string): Promise<UserEndpoint> {
        const usersRoute = "/users/"
        const url = UserEndpoint.BASE_URL + usersRoute;

        return fetch(url, UserEndpoint.options('POST'));
    }
}

export default UserEndpoint;

