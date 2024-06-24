import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!
    })
  ],
  callbacks: {
    async signIn({ profile }) {
      // It is a comma separated list of GitHub usernames
      const authorisedUsers = process.env.AUTHORISED_USERS!.split(',');


      const authUserName = profile?.login as string ?? '' ;

      console.log('authorisedUsers', authorisedUsers);
      console.log('authUserName', authUserName);
      
      // Check if the user is authorised
      if (!authorisedUsers.includes(authUserName)) {
        return false;
      }

      return true;
    },
  },
  secret: process.env.AUTH_SECRET!,
  
});
