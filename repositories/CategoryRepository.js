import Repository, {baseUrl} from './Repository';

class CategoryRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async findTopCategory() {
        return await Repository.get(`${baseUrl}/category/findTopCategory`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }

    async findCategoryByParentId(parentId) {
        return await Repository.get(`${baseUrl}/category/findCategoryByParentId{parentId}?parentId=${parentId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }

    async findById(categoryId) {
        return await Repository.get(`${baseUrl}/category/findCategoryById{categoryId}?categoryId=${categoryId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({error: JSON.stringify(error.message)}));
    }

    async saveCategory(payload,token){
        return await Repository.post(`${baseUrl}/category/save`,payload,{
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

export default new CategoryRepository();
