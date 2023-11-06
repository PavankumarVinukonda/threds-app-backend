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
exports.resolvers = void 0;
const user_service_1 = __importDefault(require("../../service/user.service"));
const queries = {
    getUserToken: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield user_service_1.default.getUserToken({ email: payload.email, password: payload.password });
        return token;
    }),
    getCurrentLoggedInUser: (_, parametrs, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (context && (context === null || context === void 0 ? void 0 : context.user)) {
            const id = context.user.id;
            const user = yield user_service_1.default.getUserById(id);
            return user;
        }
        return `I dont konw who are you`;
    })
};
const mutations = {
    createUser: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield user_service_1.default.createUser(payload);
        return response === null || response === void 0 ? void 0 : response.id;
    })
};
exports.resolvers = { queries, mutations };
