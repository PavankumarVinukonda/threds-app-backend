"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const typedef_1 = require("./typedef");
const queries_1 = require("./queries");
const mutation_1 = require("./mutation");
const reslovers_1 = require("./reslovers");
exports.user = { typeDefs: typedef_1.typeDefs, queries: queries_1.queries, mutations: mutation_1.mutations, resolvers: reslovers_1.resolvers };
