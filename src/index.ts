import express,{Request,Response} from 'express';
import {ApolloServer} from '@apollo/server'
import {expressMiddleware} from '@apollo/server/express4'
import { prismaClient } from './lib/db';
import createGraphQlServer from './graphql';
import UserService from './service/user.service';


const port  = Number( process.env.PORT) || 3003;


async function serve() {
    const app = express();

    // body parcer

    app.use(express.json())

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



app.get('/', async (req,res) => {

    try {

        res.send('server working')

    }
    catch (err:any) {
        res.send({message:err?.message})
    }
} )

app.use('/graphql', expressMiddleware(await createGraphQlServer(),{
    context:async ({req}:any) => {
        const token:any = req.headers['token']

        try {

            const user =    UserService.decodeJwtToken(token as string)
            return {user}
        }
        catch (err:any) {
            return {}
        }

    }
}))

app.listen(port,() => {console.log('server is up')});
}


serve()
