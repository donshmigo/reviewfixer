# Setup Guide for ReviewFixer

## Environment Variables

Create a `.env.local` file in the root directory with the following credentials:

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3001
OPENAI_API_KEY=your-openai-api-key

# Firebase config
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
FIREBASE_APP_ID=your-firebase-app-id
```

## Firebase Integration

Create a file at `lib/firebase.ts` with the following content:

```typescript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
```

## OpenAI Integration

Update the `app/api/ai-response/route.ts` file to use the provided GPT-4o API key.

## NextAuth Configuration

The Google OAuth credentials have been added to the `.env.local` file. Make sure the authentication callback URL is properly set up in the Google Cloud Console.

## Running the Application

1. Create the `.env.local` file with the credentials above
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open [http://localhost:3001](http://localhost:3001) in your browser

## Note

Keep these API keys and secrets confidential and never commit them to version control. 