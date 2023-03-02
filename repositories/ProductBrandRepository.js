import Repository, {baseUrl} from './Repository';

class ProductBrandRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async findAll() {
        return await Repository.get(`${baseUrl}/productBrand/findAll`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }

    async findById(payload) {
        return await Repository.get(`${baseUrl}/productBrand/findById{id}?id=${payload}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }

    async saveProductBrand(payload,token){
        return await Repository.post(`${baseUrl}/productBrand/save`,payload,{
            headers: {
                Authorization: `${token}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }

    async updateProductBrand(payload,token){
        return await Repository.put(`${baseUrl}/productBrand/update`,payload,{
            headers: {
                Authorization: `${token}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }
    
    async deleteProductBrand(payload,token){
        return await Repository.put(`${baseUrl}/productBrand/delete{id}?id=${payload}`,payload,{
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

export default new ProductBrandRepository();
