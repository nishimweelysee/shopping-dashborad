import Repository, {baseUrl} from './Repository';

class ProductRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async findAll(page,size,token) {
        return await Repository.get(`${baseUrl}/product/findAll?page=${page}&size=${size}`,{
            headers: {
                Authorization: `${token}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }

    async findById(payload) {
        return await Repository.get(`${baseUrl}/product/findByProductId{id}?id=${payload}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }

    async saveProduct(payload,token){
        return await Repository.post(`${baseUrl}/product/save`,payload,{
            headers: {
                Authorization: `${token}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }

    async updateProduct(payload,token){
        return await Repository.put(`${baseUrl}/product/update`,payload, {
            headers: {
                Authorization: `${token}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }
    async deleteProduct(payload,token){
        return await Repository.put(`${baseUrl}/product/deleting{productId}?productId=${payload}`,payload,{
            headers: {
                Authorization: `${token}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }
}

export default new ProductRepository();
