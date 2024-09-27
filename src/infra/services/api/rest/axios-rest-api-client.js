"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.AxiosRestApiClient = void 0;
const inversify_1 = require("inversify");
const axios_1 = __importDefault(require("axios"));
const api_config_1 = require("../../../../services/api/rest/api-config");
const camelcase_keys_1 = __importDefault(require("camelcase-keys"));
let AxiosRestApiClient = class AxiosRestApiClient {
    constructor() {
        const headers = Object.assign({}, api_config_1.config.headers);
        if (api_config_1.config.token) {
            headers['Authorization'] = `Bearer ${api_config_1.config.token}`;
        }
        this.client = axios_1.default.create({
            baseURL: api_config_1.config.baseUrl,
            headers
        });
        this.client.interceptors.request.use(this.handleRequest.bind(this));
        this.client.interceptors.response.use(this.handleResponse.bind(this));
    }
    handleResponse(response) {
        if (response.data && typeof response.data === 'object') {
            response.data = (0, camelcase_keys_1.default)(response.data, { deep: true });
        }
        if (response.config.url === '/auth/authenticate') {
            const token = response.data.accessToken;
            if (token) {
                api_config_1.config.token = token;
            }
        }
        return response;
    }
    handleRequest(request) {
        request.headers = request.headers || {};
        if (api_config_1.config.token) {
            request.headers['Authorization'] = `Bearer ${api_config_1.config.token}`;
        }
        return request;
    }
    get(url, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.get(url, { params });
            return response.data;
        });
    }
    post(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.post(url, data);
            return response.data;
        });
    }
    put(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.put(url, data);
            return response.data;
        });
    }
    delete(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.delete(url);
            return response.data;
        });
    }
};
AxiosRestApiClient = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], AxiosRestApiClient);
exports.AxiosRestApiClient = AxiosRestApiClient;
