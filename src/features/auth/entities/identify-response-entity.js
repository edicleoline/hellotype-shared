"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifyResponseEntity = void 0;
class IdentifyResponseEntity {
    constructor(data) {
        this.accessToken = data.accessToken;
        this.method = data.method;
    }
    toJSON() {
        return {
            accessToken: this.accessToken,
            method: this.method
        };
    }
    static fromApiResponse(data) {
        return new IdentifyResponseEntity({
            accessToken: data.accessToken,
            method: data.method
        });
    }
}
exports.IdentifyResponseEntity = IdentifyResponseEntity;
