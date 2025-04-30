import { getServerSession } from 'next-auth';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Sample demo reviews data
const demoReviews = [
  {
    id: '1',
    subject: 'New Review on Google',
    date: new Date().toISOString(),
    reviewer: 'John Smith',
    rating: 5,
    content: 'Great service! The staff was very friendly and the food was delicious. Will definitely come back again.',
    body: 'Great service! The staff was very friendly and the food was delicious. Will definitely come back again.',
  },
  {
    id: '2',
    subject: 'New Review on Google',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    reviewer: 'Sarah Johnson',
    rating: 4,
    content: 'Good experience overall. Service was a bit slow but the quality of the food made up for it.',
    body: 'Good experience overall. Service was a bit slow but the quality of the food made up for it.',
  },
  {
    id: '3',
    subject: 'New Review on Google',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    reviewer: 'Michael Brown',
    rating: 2,
    content: 'Disappointed with my visit. The food was cold and the staff seemed uninterested in helping.',
    body: 'Disappointed with my visit. The food was cold and the staff seemed uninterested in helping.',
  },
  {
    id: '4',
    subject: 'New Review on Google',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    reviewer: 'Emily Wilson',
    rating: 5,
    content: 'Absolutely amazing! The atmosphere was perfect and the service was exceptional. Highly recommend!',
    body: 'Absolutely amazing! The atmosphere was perfect and the service was exceptional. Highly recommend!',
  },
  {
    id: '5',
    subject: 'New Review on Google',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    reviewer: 'David Lee',
    rating: 3,
    content: 'Average experience. Nothing stood out as particularly good or bad. Might try again in the future.',
    body: 'Average experience. Nothing stood out as particularly good or bad. Might try again in the future.',
  },
];

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
      });
    }
    
    // If in demo mode, return demo data
    if (session.isDemo) {
      return NextResponse.json({ reviews: demoReviews });
    }

    // For real Gmail API integration
    if (!session.accessToken) {
      return new NextResponse(JSON.stringify({ error: 'No access token available' }), {
        status: 401,
      });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: session.accessToken });

    const gmail = google.gmail({ version: 'v1', auth });
    
    // Search for emails containing Google review notifications
    // This is a simplified query - you may need to refine this based on the actual format
    const res = await gmail.users.messages.list({
      userId: 'me',
      q: 'from:reviews-noreply@google.com',
      maxResults: 20,
    });

    const messages = res.data.messages || [];
    const reviews = [];

    // Process each message to extract review data
    for (const message of messages) {
      if (message.id) {
        const msg = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
        });

        // Extract the required information from the email
        // This is a simplified version - actual parsing would be more complex
        const headers = msg.data.payload?.headers || [];
        const subject = headers.find(h => h.name === 'Subject')?.value || '';
        const date = headers.find(h => h.name === 'Date')?.value || '';
        
        // Extract body content - this would need more parsing in a real implementation
        let body = '';
        if (msg.data.payload?.parts) {
          const textPart = msg.data.payload.parts.find(part => part.mimeType === 'text/plain');
          if (textPart && textPart.body?.data) {
            body = Buffer.from(textPart.body.data, 'base64').toString();
          }
        } else if (msg.data.payload?.body?.data) {
          body = Buffer.from(msg.data.payload.body.data, 'base64').toString();
        }

        // Extract review information
        // This is a simplified extraction - would need refinement for real use
        const reviewerMatch = body.match(/from ([^\n]+)/);
        const ratingMatch = body.match(/(\d+)\/5 stars/);
        const contentMatch = body.match(/Review:\s*([^\n]+)/);

        if (subject.includes('review') || body.includes('review')) {
          reviews.push({
            id: message.id,
            subject,
            date,
            reviewer: reviewerMatch ? reviewerMatch[1].trim() : 'Unknown',
            rating: ratingMatch ? parseInt(ratingMatch[1]) : 0,
            content: contentMatch ? contentMatch[1].trim() : '',
            body: body.substring(0, 500) + (body.length > 500 ? '...' : ''),
          });
        }
      }
    }

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch reviews' }), {
      status: 500,
    });
  }
} 