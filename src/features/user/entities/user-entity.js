"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    constructor(data) {
        this.id = data.id;
        this.identityId = data.identityId;
        this.firstName = data.firstName;
    }
    toJSON() {
        return {
            id: this.id,
            firstName: this.firstName
        };
    }
    static fromApiResponse(data) {
        return new UserEntity({
            id: data.id,
            firstName: data.firstName
        });
    }
}
exports.UserEntity = UserEntity;
