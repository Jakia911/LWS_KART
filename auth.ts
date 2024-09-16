import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import { Adapter } from 'next-auth/adapters';
import GoogleProvider from "next-auth/providers/google";
import mongoClientPromise from "./database/mongoClientPromise";
// Define NextAuth options with TypeScript
export const 
   authOptions = NextAuth({
    adapter: MongoDBAdapter(mongoClientPromise, { databaseName: process.env.ENVIRONMENT }) as Adapter,
    session: {
        strategy: 'jwt',
    },
    providers: [
       
        GoogleProvider({
           clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          }),
    ]
})

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// export const {
   
//      auth,
//      signIn,
//      signOut,
// } = NextAuth(authOptions);
 

  
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
  
  