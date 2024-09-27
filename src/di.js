"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const remote_auth_data_source_1 = require("./features/auth/data-sources/remote-auth-data-source");
const identify_use_case_1 = __importDefault(require("./features/auth/use-cases/identify-use-case"));
const axios_rest_api_client_1 = require("./infra/services/api/rest/axios-rest-api-client");
const authenticate_use_case_1 = __importDefault(require("./features/auth/use-cases/authenticate-use-case"));
const remote_account_data_source_1 = require("./features/account/data-sources/remote-account-data-source");
const me_use_case_1 = __importDefault(require("./features/account/use-cases/me-use-case"));
const ioDispatcherFunction = (fn) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fn();
});
const container = new inversify_1.Container();
container.bind('IoDispatcher').toConstantValue(ioDispatcherFunction);
container.bind('RestApiClient').to(axios_rest_api_client_1.AxiosRestApiClient);
container.bind('RemoteAuthDataSource').to(remote_auth_data_source_1.RemoteAuthDataSource);
container.bind('RemoteAccountDataSource').to(remote_account_data_source_1.RemoteAccountDataSource);
container.bind(identify_use_case_1.default).to(identify_use_case_1.default);
container.bind(authenticate_use_case_1.default).to(authenticate_use_case_1.default);
container.bind(me_use_case_1.default).to(me_use_case_1.default);
exports.default = container;
