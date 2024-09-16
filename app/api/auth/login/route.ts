// import { userModel } from "@/models/user-model";
// import bcrypt from "bcryptjs";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = await userModel.findOne({ email: credentials?.email });
//         if (user && bcrypt.compareSync(credentials?.password, user.password)) {
//           return { id: user._id, name: user.name, email: user.email };
//         }
//         return null;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/signin",
//   },
// });
