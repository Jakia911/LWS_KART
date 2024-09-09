import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { userModel } from "./models/user-model";
import mongoClientPromise from "./database/mongoClientPromise";

// Define NextAuth options with TypeScript
const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(mongoClientPromise, { databaseName: process.env.ENVIRONMENT }),
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        // Additional providers like CredentialsProvider can be added here
    ]
};

// Export handlers with proper typing
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth(authOptions);

export default authOptions;

//  CredentialsProvider({
//             credentials: {
//                 email: {},
//                 password: {},
//             },

//             async authorize(credentials) {
//                 if (credentials == null) return null;

//                 try {
//                     const user = await userModel.findOne({email: credentials.email});
//                     console.log({user})
//                     if (user) {
//                         const isMatch = await bcrypt.compare(
//                             credentials.password,
//                             user.password
//                         );
//                         if(isMatch) {
//                             return user;
//                         } else {
//                             throw new Error('Email or password mismatch');
//                         }
//                     } else {
//                         throw new Error('User not found');
//                     }
//                 } catch(error) {
//                     throw new Error(error);
//                 }
//             }
//         }),