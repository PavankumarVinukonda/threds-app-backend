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
const express_1 = __importDefault(require("express"));
const express4_1 = require("@apollo/server/express4");
const graphql_1 = __importDefault(require("./graphql"));
const user_service_1 = __importDefault(require("./service/user.service"));
const port = Number(process.env.PORT) || 3003;
function serve() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        // body parcer
        app.use(express_1.default.json());
        // creating the graphl ql server 
        // const GqlServer = new ApolloServer({
        //     typeDefs:`
        //     type Query {
        //         hello:String
        //         say(name:String):String
        //     }
        //     type Mutation {
        //         createUser(firstName:String!,lastName:String!,email:String!,password:String!):Boolean
        //     }
        //     `, //schema  if an user qurys the  herro it restuens the string , type definations are only schema  
        //     resolvers:{
        //         Query: {
        //             hello:() => `hey there`,
        //             say:(_,{name}:{name:string}) => `Hay , ${name} How are you`
        //         },
        //         Mutation: {
        //             createUser: async (_,{firstName,lastName,email,password}:{firstName:string;lastName:string,email:string,password:string}) => {
        //                 await prismaClient.user.create(
        //                     {
        //                         data: {
        //                             email,
        //                             firstName,
        //                             lastName,
        //                             password,
        //                             salt:'random'
        //                         }
        //                     }
        //                 )
        //                 return true
        //             } 
        //         }
        //     }
        // })
        // start the graph ql server
        // await GqlServer.start()
        app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.send('server working');
            }
            catch (err) {
                res.send({ message: err === null || err === void 0 ? void 0 : err.message });
            }
        }));
        app.use('/graphql', (0, express4_1.expressMiddleware)(yield (0, graphql_1.default)(), {
            context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                const token = req.headers['token'];
                try {
                    const user = user_service_1.default.decodeJwtToken(token);
                    return { user };
                }
                catch (err) {
                    return {};
                }
            })
        }));
        app.listen(port, () => { console.log('server is up'); });
    });
}
serve();
