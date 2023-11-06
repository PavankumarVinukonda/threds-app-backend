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
const db_1 = require("../lib/db");
const node_crypto_1 = require("node:crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SEC = `$uperM@n`;
class UserService {
    static generateHash(salt, password) {
        const hashedPassword = (0, node_crypto_1.createHmac)('sha256', salt).update(password).digest("hex");
        return hashedPassword;
    }
    static getUserById(id) {
        return db_1.prismaClient.user.findUnique({ where: { id } });
    }
    static createUser(payload) {
        const { firstName, lastName, email, password } = payload;
        const salt = (0, node_crypto_1.randomBytes)(32).toString("hex"); // becase the db dosent read the crypto hasing so we are using hex
        const hashedPassword = UserService.generateHash(salt, password);
        return db_1.prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword
            }
        });
    }
    static getByUserEmail(email) {
        return db_1.prismaClient.user.findUnique({ where: { email } });
    }
    static getUserToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield UserService.getByUserEmail(email);
            if (!user)
                throw new Error('user not found');
            const userSalt = user.salt;
            const userHashedpassword = UserService.generateHash(userSalt, password);
            if (userHashedpassword !== user.password)
                throw Error('Incorrect password');
            const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user.id, email: user === null || user === void 0 ? void 0 : user.email }, JWT_SEC);
            return token;
        });
    }
    static decodeJwtToken(token) {
        return jsonwebtoken_1.default.verify(token, JWT_SEC);
    }
}
exports.default = UserService;
