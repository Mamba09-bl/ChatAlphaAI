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
      await connectDB(); // IMPORTANT

      const existingUser = await userModel.findOne({ email: user.email });

      if (!existingUser) {
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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
