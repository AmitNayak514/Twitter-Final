import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: {
    //       label: "Username",
    //       type: "text",
    //       placeholder: "Your username...",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //       placeholder: "Your password...",
    //     },
    //   },
    //   async authorize(credentials) {
    //     const user = { id: "42", name: "Amit Nayak", password: "amit" };
    //     if (
    //       credentials?.username === user.name &&
    //       credentials?.password === user.password
    //     ) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // logger: { level: "debug" },
  pages: {
    signIn: "auth/signin/page",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();
      session.user.uid = token.sub;
      if (!session.error) {
        session.user.redirectURL = "/";
      }
      return session;
    },
  },
};
