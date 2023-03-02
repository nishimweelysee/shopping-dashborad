import Repository, {baseUrl} from './Repository';

class VendorRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async findAll(page,size,token) {
        return await Repository.get(`${baseUrl}/vendor/findAll?page=${page}&size=${size}`,{
            headers: {
                Authorization: token,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }

    async findById(payload,token) {
        return await Repository.get(`${baseUrl}/vendor/findById{vendorId}?vendorId=${payload}`,{
            headers: {
                Authorization: token,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }

    async saveVendor(payload){
        return await Repository.post(`${baseUrl}/vendor/signup`,payload)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }

    async updateVendor(payload,accessToken){
        return await Repository.put(`${baseUrl}/vendor/updateVendor`,payload,{
            headers: {
                Authorization: accessToken,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }
    async deleteVendor(payload){
        return await Repository.put(`${baseUrl}/vendor/deleteVendor{vendorId}?vendorId=${payload}`,payload)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }
}

export default new VendorRepository();
