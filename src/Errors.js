export default class Errors {

    constructor() {
        this.messages = {};
    }

    has(field) {
        return this.messages.hasOwnProperty(field);
    }

    any() {
        return Object.keys(this.messages).length > 0;
    }

    get(field) {
        if (this.has(field)) {
            return this.messages[field][0];
        }
    }

    set(errors) {
        this.messages = errors;
    }

    clear(field) {
        if (field) {
            delete this.messages[field];
        } else {
            this.messages = {};
        }
    }
};
