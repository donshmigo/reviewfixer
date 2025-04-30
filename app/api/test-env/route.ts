import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    environment: {
      googleClientId: process.env.GOOGLE_CLIENT_ID ? 'Configured ✅' : 'Missing ❌',
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ? 'Configured ✅' : 'Missing ❌',
      nextAuthSecret: process.env.NEXTAUTH_SECRET ? 'Configured ✅' : 'Missing ❌',
      nextAuthUrl: process.env.NEXTAUTH_URL ? 'Configured ✅' : 'Missing ❌',
      openaiApiKey: process.env.OPENAI_API_KEY ? 'Configured ✅' : 'Missing ❌',
      firebaseApiKey: process.env.FIREBASE_API_KEY ? 'Configured ✅' : 'Missing ❌',
    },
    note: 'For security reasons, this endpoint does not show the actual values of environment variables.',
    setupInstructions: 'Create a .env.local file with the credentials provided in SETUP.md'
  });
} 