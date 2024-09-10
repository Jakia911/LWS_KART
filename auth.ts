import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongoose";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import { Adapter } from 'next-auth/adapters';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import mongoClientPromise from "./database/mongoClientPromise";
import { userModel } from "./models/user-model";
// Define NextAuth options with TypeScript
const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(mongoClientPromise, { databaseName: process.env.ENVIRONMENT }) as Adapter,
   
    session: {
        strategy: 'jwt',
    },
  providers: [
      
  CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
 async authorize(
    
  credentials: Record<"email" | "password", string> | undefined
  ): Promise<User | null> {
    if (!credentials) {
      return null;
    }

                try {
                    const user = await userModel.findOne({email: credentials.email});
                    console.log({user})
                    if (user) {
                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );
                      if (isMatch) {
                        const userId: string = (user._id as ObjectId).toString();
                        return {
                          id: userId,
                          name: user.name,
                          email: user.email,
                          image: user.image,
                        };
                      }
                        
                        else {
                            throw new Error('Email or password mismatch');
                        }
                    } else {
                        throw new Error('User not found');
                    }
                } catch (error) {
      console.error("Authorization error:", error);
      return null; // Return null if there's an error
    }
            }
        }),
          
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        // Additional providers like CredentialsProvider can be added here
    ]
};



export const {
   
     auth,
     signIn,
     signOut,
} = NextAuth(authOptions);
 
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
  
  // CredentialsProvider({
  //           credentials: {
  //   email: {  },
  //   password: {  },
  // },
  // async authorize(
    
  // credentials: Record<"email" | "password", string> | undefined
  // ): Promise<User | null> {
  //   if (!credentials) {
  //     return null;
  //   }

  //   try {
  //     const user = await userModel.findOne({ email: credentials.email });
  //     if (user) {
  //       const isMatch = await compare(credentials.password, user.password);
  //         if (isMatch) {
  //         const userId: string = (user._id as ObjectId).toString();
  //         return {
  //   id: userId,
  //   name: user.name,
  //   email: user.email,
  //   image: user.image,
  // };
  //       } 
  //       else {
  //         throw new Error("Email or password mismatch");
  //       }
  //     } else {
  //       throw new Error("User not found");
  //     }
  //   } catch (error) {
  //     console.error("Authorization error:", error);
  //     return null; // Return null if there's an error
  //   }
  // },
  //       }),
  
  