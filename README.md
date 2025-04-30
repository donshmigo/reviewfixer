# ReviewFixer - AI-Powered Google Review Management

ReviewFixer is a SaaS application that helps businesses manage Google reviews through Gmail integration and AI-powered response generation.

## Features

- Gmail API integration to import Google review notifications
- Dashboard to view and manage reviews
- AI-powered response generation for reviews
- Responsive design with animations
- **Demo mode** for testing without credentials

## Demo Mode

ReviewFixer includes a fully functional demo mode that allows you to:
- Test the application without setting up Google API credentials
- Explore all features using simulated data
- Generate AI responses to reviews
- Experience the complete user workflow

To use demo mode, simply click the "Try Demo" button on the login page.

## Deployment to Netlify

### Prerequisites

1. A Netlify account
2. Required environment variables:
   - `NEXTAUTH_SECRET`: A secret for securing your application sessions
   - `OPENAI_API_KEY`: Your OpenAI API key for AI response generation
   - `GOOGLE_CLIENT_ID`: Google OAuth client ID for Gmail integration
   - `GOOGLE_CLIENT_SECRET`: Google OAuth client secret for Gmail integration

### Deployment Steps

1. Install Netlify CLI and login
```bash
npm install netlify-cli -g
netlify login
```

2. Initialize Netlify site
```bash
netlify init
```

3. Configure environment variables in Netlify dashboard:
   - Go to Site settings > Build & deploy > Environment
   - Add the required environment variables

4. Deploy to Netlify
```bash
netlify deploy --prod
```

## Development

### Local Setup

1. Clone the repository
2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file with the following:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
OPENAI_API_KEY=your-openai-api-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- NextAuth.js for authentication
- Google API integration
- OpenAI API for response generation

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Cloud Platform account with Gmail API enabled (for non-demo mode)
- OAuth 2.0 credentials for Google API (for non-demo mode)

### Environment Setup

1. Create a `.env.local` file in the root directory with the following variables:

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=your-openai-api-key
```

Note: For demo mode, these credentials are not required.

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Google API Configuration (for non-demo mode)

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Gmail API
4. Create OAuth 2.0 credentials
   - Add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI
5. Copy the Client ID and Client Secret to your `.env.local` file

## License

This project is licensed under the MIT License.
