"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateResponseEntity = void 0;
class AuthenticateResponseEntity {
    constructor(data) {
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
    }
    toJSON() {
        return {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken
        };
    }
    static fromApiResponse(data) {
        return new AuthenticateResponseEntity({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
        });
    }
}
exports.AuthenticateResponseEntity = AuthenticateResponseEntity;
