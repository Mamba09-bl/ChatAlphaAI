// app/api/auth/[...nextauth]/route.js Hello to new
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

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, profile }) {
      console.log("=== GOOGLE SIGN IN START ===");
      console.log("GOOGLE LOGIN USER:", user);
      console.log("GOOGLE PROFILE:", profile);
      console.log("GOOGLE SECRET PRESENT:", !!process.env.GOOGLE_SECRET);
      console.log("GOOGLE ID PRESENT:", !!process.env.GOOGLE_ID);

      await connectDB();

      const existing = await userModel.findOne({ email: user.email });

      if (!existing) {
        console.log("Creating new user:", user.email);

        await userModel.create({
          Username: user.name,
          email: user.email,
          provider: "google",
          providerId: profile.sub,
        });
      } else {
        console.log("User already exists:", user.email);
      }

      console.log("=== GOOGLE SIGN IN END ===");
      return true;
    },

    async redirect({ url, baseUrl }) {
      console.log("REDIRECT CALLBACK TRIGGERED → sending user to /chat");
      return "/chat";
    },

    async session({ session }) {
      console.log("SESSION CREATED FOR:", session.user?.email);
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
