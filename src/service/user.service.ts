import { prismaClient } from "../lib/db";
import {createHmac,randomBytes} from 'node:crypto'
import  Jwt  from "jsonwebtoken";


const JWT_SEC = `$uperM@n`
export interface CreateUserPayload {
    firstName:string;
    lastName?:string;
    email:string;
    password:string;
}

export interface GetUserTokenPayload {
    email:string;
    password:string;
}

class UserService {

    public static generateHash(salt:string,password:string) {
        
        const hashedPassword = createHmac('sha256',salt).update(password).digest("hex")

        return hashedPassword;
    }

    public static getUserById(id:string) {
        return prismaClient.user.findUnique({where:{id}})
    }
    public static createUser (payload:CreateUserPayload) {
        const {firstName,lastName,email,password} =  payload
        const salt = randomBytes(32).toString("hex") // becase the db dosent read the crypto hasing so we are using hex

        const hashedPassword = UserService.generateHash(salt,password)
        
        return prismaClient.user.create({
            data:{
                firstName,
                lastName,
                email,
                salt,
                password:hashedPassword
            }
        })

    }

    private static getByUserEmail(email:string) {
        return prismaClient.user.findUnique({where:{email}})
    }

  

    public static async getUserToken(payload:GetUserTokenPayload) {
        const {email,password} = payload

        const user = await UserService.getByUserEmail(email);

        if (!user) throw new Error('user not found');

        const userSalt = user.salt

        const userHashedpassword = UserService.generateHash(userSalt,password)

        if (userHashedpassword !== user.password) throw Error('Incorrect password');


        const token = Jwt.sign({id:user?.id,email:user?.email},JWT_SEC)

        return token
    }

    public static decodeJwtToken(token:string) {
        return Jwt.verify(token,JWT_SEC)
    }
}

export default UserService;