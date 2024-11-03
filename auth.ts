import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import mongoClientPromise from "./database/mongoClientPromise";

import CredentialsProvider from "next-auth/providers/credentials";
// Define NextAuth options
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  adapter: MongoDBAdapter(mongoClientPromise, {
    databaseName: process.env.ENVIRONMENT,
  }) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials == null) return null;

        try {
          const user = await User.findOne({ email: credentials?.email });
          console.log(user);

          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isMatch) {
              return user;
            } else {
              console.error("password mismatch");
              throw new Error("Check your password");
            }
          } else {
            console.error("User not found");
            throw new Error("User not found");
          }
        } catch (err) {
          console.error(err);
          throw new Error(err);
        }
      },
    }),
  ],
};

// Export the NextAuth handler using authOptions
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// export const {

//      auth,
//      signIn,
//      signOut,
// } = NextAuth(authOptions);

// CredentialsProvider({
//   credentials: {
//     email: {},
//     password: {},
//   },
//   async authorize(
//     credentials: Record<"email" | "password", string> | undefined
//   ): Promise<User | null> {
//     if (!credentials) {
//       return null;
//     }

//     try {
//       const user = await userModel.findOne({ email: credentials.email });
//       if (user) {
//         const isMatch = await compare(credentials.password, user.password);
//         if (isMatch) {
//           const userId: string = (user._id as ObjectId).toString();
//           return {
//             id: userId,
//             name: user.name,
//             email: user.email,
//             image: user.image,
//           };
//         } else {
//           throw new Error("Email or password mismatch");
//         }
//       } else {
//         throw new Error("User not found");
//       }
//     } catch (error) {
//       console.error("Authorization error:", error);
//       return null; // Return null if there's an error
//     }
//   },
// }),
