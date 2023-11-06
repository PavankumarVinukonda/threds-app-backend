import { on } from "nodemon";
import UserService, { CreateUserPayload } from "../../service/user.service";

const queries = {

     getUserToken:async (_:any,payload:{email:string,password:string}) => {
        const token = await UserService.getUserToken({email:payload.email,password:payload.password})

        return token
     }
     ,
     getCurrentLoggedInUser :async (_:any,parametrs:any,context:any) => {
        if (context && context?.user) {

            const id = context.user.id

            const user = await UserService.getUserById(id)

            
            
            return user
        }
        return `I dont konw who are you`;
     }
};


const mutations = {
    createUser : async(_:any,payload:CreateUserPayload) => {
        const response = await UserService.createUser(payload)

        return response?.id
    }
}


export const resolvers = {queries,mutations}