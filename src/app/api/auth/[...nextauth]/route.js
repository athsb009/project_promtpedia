import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { connectDB } from "@/utils/database";

import User from "@/models/user";

const handler =NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET,
        })
    ],
    callbacks:{
        async session({session}){
            const userSession= await User.findOne({email:session.user.email})
            session.user.id=userSession._id;
            return session;
        },
        async signIn({profile}){
            console.log(profile);
            try {
                await connectDB()
                const userExist=await User.findOne({email:profile.email})

                if(!userExist){
                    const user=User.create({
                    email:profile.email,
                    username:profile.name,
                    image:profile.picture,
                    })
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    
    }
        
})
export {handler as GET,handler as POST};