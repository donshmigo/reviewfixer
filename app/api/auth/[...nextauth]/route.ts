import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Use a VERY SIMPLE fixed key that won't change between restarts
// This prevents decryption errors with JWT tokens
const SECRET = process.env.NEXTAUTH_SECRET || "default_secret_key_for_development";

const handler = NextAuth({
  providers: [
    // Firebase Authentication (Email/Password and Google via Firebase)
    CredentialsProvider({
      id: 'credentials',
      name: 'Email & Password',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        firebaseLogin: { label: "Firebase Login", type: "boolean" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        
        try {
          // Handle direct Firebase Google sign-in
          if (credentials.firebaseLogin === 'true') {
            // In this case, we trust that Firebase has already authenticated the user
            // We just need to create a session for NextAuth
            return {
              id: credentials.password, // Using the UID we passed from the client
              name: credentials.email.split('@')[0],
              email: credentials.email,
            };
          }
          
          // Regular email/password authentication
          if (!credentials.password) return null;
          
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          
          const user = userCredential.user;
          
          return {
            id: user.uid,
            name: user.displayName || credentials.email.split('@')[0],
            email: user.email,
            image: user.photoURL,
          };
        } catch (error) {
          console.error('Firebase auth error:', error);
          return null;
        }
      }
    }),
    // Google Provider for Gmail API access (only used for connecting Gmail in dashboard)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.readonly"
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      
      // Store the access token when available (for Gmail API)
      if (account && account.provider === 'google') {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.gmailConnected = true;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      
      // Add Gmail connection status to session
      session.accessToken = token.accessToken as string;
      session.gmailConnected = !!token.gmailConnected;
      
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  // Use environment variable for the secret
  secret: SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
})

export { handler as GET, handler as POST }; 