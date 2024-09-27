"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __importDefault(require("./di"));
const identify_use_case_1 = __importDefault(require("./features/auth/use-cases/identify-use-case"));
const authenticate_use_case_1 = __importDefault(require("./features/auth/use-cases/authenticate-use-case"));
const me_use_case_1 = __importDefault(require("./features/account/use-cases/me-use-case"));
const api_config_1 = require("./services/api/rest/api-config");
api_config_1.config.baseUrl = 'http://127.0.0.1:8000/api/v1';
const identifyUseCase = di_1.default.get(identify_use_case_1.default);
const authenticateUseCase = di_1.default.get(authenticate_use_case_1.default);
const meUseCase = di_1.default.get(me_use_case_1.default);
identifyUseCase.invoke('edicleo').then((identifyResult) => {
    var _a, _b;
    if ((_a = identifyResult === null || identifyResult === void 0 ? void 0 : identifyResult.data) === null || _a === void 0 ? void 0 : _a.accessToken) {
        authenticateUseCase.invoke({
            token: (_b = identifyResult.data) === null || _b === void 0 ? void 0 : _b.accessToken,
            password: 'xzxz0909'
        }).then((result) => {
            var _a;
            api_config_1.config.token = ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.accessToken) || '';
            meUseCase.invoke().then(result => console.log(result));
        });
    }
});
exports.default = {};
