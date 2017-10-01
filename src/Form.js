import Errors from './Errors';

export default class Form {

    constructor(data) {
        this.originalData = data;
        this.errors = new Errors();
        this.isLoading = false;

        for (let field in data) {
            this[field] = data[field];
        }
    }

    data() {
        let data = {};

        for (let field in this.originalData) {
            data[field] = this[field];
        }

        return data;
    }

    reset() {
        for (let field in this.originalData) {
            this[field] = '';
        }

        this.errors.clear();
    }

    get(url) {
        return this.submit('get', url);
    }

    post(url) {
        return this.submit('post', url);
    }

    put(url) {
        return this.submit('put', url);
    }

    patch(url) {
        return this.submit('patch', url);
    }

    delete(url) {
        return this.submit('delete', url);
    }

    submit(requestType, url) {
        this.isLoading = true;

        return new Promise((resolve, reject) => {
            axios[requestType.toLowerCase()](url, this.data())
                .then(response => {
                    this.onSuccess();
                    resolve(response.data);
                })
                .catch(error => {
                    this.onError(error.response.data);
                    reject(error.response.data);
                });
        });
    }

    onSuccess() {
        this.isLoading = false;
    }

    onError(errors) {
        this.errors.set(errors);
        this.isLoading = false;
    }
};
