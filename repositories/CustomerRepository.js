import Repository, { baseUrl } from './Repository';

class CustomerRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async findAll(page, size, token) {
        return await Repository.get(`${baseUrl}/admin/all?page=${page}&size=${size}`, {
            headers: {
                Authorization: `${token}`
            }
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error.message) }));
    }

    async findById(payload,token) {
        return await Repository.get(`${baseUrl}/client/findById{id}?id=${payload}`, {
            headers: {
                Authorization: `${token}`
            }
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error.message) }));
    }
    async deleteCustomer(payload,token) {
        return await Repository.delete(`${baseUrl}/client/delete?id=${payload}`, {
            headers: {
                Authorization: `${token}`
            }
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error.message) }));
    }
}

export default new CustomerRepository();
