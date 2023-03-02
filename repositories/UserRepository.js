import Repository, {baseUrl} from './Repository';

class UserRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async register(payload) {
        return await Repository.post(`${baseUrl}/vendor/signup`, payload)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({error: JSON.stringify(error.message)}));
    }

    async login(payload) {
        return await Repository.post(`${baseUrl}/auth/login`, payload)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }

    //get user profile by id with token
    async getProfile(id, token) {
        console.log(id, token);
        return await Repository.get(`${baseUrl}/user/findUserInfo{userId}?userId=${id}`, {
            headers: {
                Authorization: token,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }
}

export default new UserRepository();
