// import mongoose, { Mongoose } from "mongoose";

// export async function dbConnect(): Promise<Mongoose | undefined> {
//     try {
//         const conn: Mongoose = await mongoose.connect(String(process.env.MONGO_URI_CONNECTION));
//         console.log("Database connected");
//         return conn;
//     } catch (err) {
//         if (err instanceof Error) {
//             console.error("Error connecting to the database:", err.message);
//         } else {
//             console.error("Unknown error connecting to the database");
//         }
//         return undefined;
//     }
// }

import mongoose from 'mongoose';

export async function dbConnect() {
    try {
        const conn = await mongoose.connect(String(process.env.MONGO_URI_CONNECTION));
        console.log("Database connected");
        return conn;
    } catch (err) {
        if (err instanceof Error) {
            console.error("Error connecting to the database:", err.message);
        } else {
            console.error("Unknown error connecting to the database");
        }
        return undefined;
    }
}
