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
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const user_1 = require("./user");
function createGraphQlServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const gqServer = new server_1.ApolloServer({
            typeDefs: `
        ${user_1.user.typeDefs}
        type Query {
            ${user_1.user.queries}
            getContext:String
        } 
        type Mutation {
            ${user_1.user.mutations}
        }   

        `,
            resolvers: {
                Query: Object.assign(Object.assign({}, user_1.user.resolvers.queries), { getContext: (_any, parametrs, context) => {
                        console.log('context', context);
                        return 'Okay';
                    } }),
                Mutation: Object.assign({}, user_1.user.resolvers.mutations),
            },
        });
        yield gqServer.start();
        return gqServer;
    });
}
exports.default = createGraphQlServer;
