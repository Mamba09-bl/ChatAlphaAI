// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import userModel from "@/modules/user";
import { connectDB } from "@/lib/mongodb";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB();
      const existing = await userModel.findOne({ email: user.email });
      if (!existing) {
        await userModel.create({
          Username: user.name,
          email: user.email,
          provider: "google",
          providerId: profile.sub,
        });
      }
      return true;
    },

    async session({ session }) {
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
