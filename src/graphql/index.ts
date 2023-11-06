import {ApolloServer} from '@apollo/server';
import { user } from './user';

export default async function createGraphQlServer() {

    const gqServer = new ApolloServer({
        typeDefs:`
        ${user.typeDefs}
        type Query {
            ${user.queries}
            getContext:String
        } 
        type Mutation {
            ${user.mutations}
        }   

        `,// schema
        resolvers: {
            Query: {
                ...user.resolvers.queries,
                getContext:(_any,parametrs:any,context) => {
                    console.log('context',context);
                    return 'Okay'
                    
                }
            },
            Mutation:{
                ...user.resolvers.mutations
            },
        },
    }) 

    await gqServer.start()

    return gqServer

}