"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Result {
    constructor(data, error) {
        this.data = data;
        this.error = error;
    }
    static success(data) {
        return new Result(data);
    }
    static error(error) {
        return new Result(undefined, error);
    }
    isSuccess() {
        return this.error == null;
    }
    isError() {
        return this.error != null;
    }
}
exports.default = Result;
