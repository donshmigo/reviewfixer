import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { review, businessContext, isDemo } = await request.json();
    
    if (!review) {
      return new NextResponse(JSON.stringify({ error: 'Review content is required' }), {
        status: 400,
      });
    }

    // Sample prompt for generating a response to a review
    const prompt = `
    You are a professional customer service representative for a business. 
    Generate a thoughtful, personalized response to the following customer review.
    
    Review: "${review.content}"
    Rating: ${review.rating}/5
    Reviewer Name: ${review.reviewer}
    
    Business Context: ${businessContext || 'A professional business that values customer feedback.'}
    
    Guidelines:
    - Be grateful for the feedback
    - Address specific points mentioned in the review
    - Be professional and courteous
    - Keep the response concise (3-5 sentences)
    - If the review is negative, acknowledge the issue and offer a solution
    - If the review is positive, express appreciation
    - End with a forward-looking statement
    
    Response:
    `;
    
    // Always use mock responses in demo mode
    if (isDemo) {
      const mockResponse = getMockResponse(review.rating, review.content, review.reviewer);
      return NextResponse.json({ response: mockResponse });
    }

    try {
      // Call OpenAI's API to generate a response using the prompt
      const completion = await openai.chat.completions.create({
        model: "gpt-4o", // Using GPT-4o model
        messages: [
          { role: "system", content: "You are a professional customer service representative for a business." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 250,
      });
      
      // Extract the response from the API result
      const generatedResponse = completion.choices[0]?.message?.content?.trim();
      
      if (generatedResponse) {
        return NextResponse.json({ response: generatedResponse });
      } else {
        // Fallback to mock response if API fails to generate content
        const mockResponse = getMockResponse(review.rating, review.content, review.reviewer);
        return NextResponse.json({ response: mockResponse });
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      // Fallback to mock response if API call fails
      const mockResponse = getMockResponse(review.rating, review.content, review.reviewer);
      return NextResponse.json({ response: mockResponse });
    }
  } catch (error) {
    console.error('Error generating AI response:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to generate response' }), {
      status: 500,
    });
  }
}

// Enhanced mock function to generate more personalized responses based on review content
function getMockResponse(rating: number, content: string, reviewer: string): string {
  const firstName = reviewer.split(' ')[0];
  
  // Extract key terms that might be in the review
  const hasService = content.toLowerCase().includes('service');
  const hasFood = content.toLowerCase().includes('food');
  const hasAtmosphere = content.toLowerCase().includes('atmosphere');
  const hasStaff = content.toLowerCase().includes('staff');
  const hasWait = content.toLowerCase().includes('wait') || content.toLowerCase().includes('slow');
  
  if (rating >= 4) {
    let response = `Thank you so much for your wonderful review, ${firstName}! `;
    
    if (hasService) {
      response += "We're thrilled that you appreciated our service. ";
    }
    
    if (hasFood) {
      response += "We take great pride in the quality of our food, and we're glad you enjoyed it. ";
    }
    
    if (hasAtmosphere) {
      response += "It's great to hear that you liked the atmosphere we've created. ";
    }
    
    if (hasStaff) {
      response += "Our team works hard to provide exceptional service, and your feedback means a lot to them. ";
    }
    
    response += "We look forward to welcoming you back soon!";
    return response;
  } else if (rating === 3) {
    let response = `Thank you ${firstName} for taking the time to share your feedback. `;
    
    if (hasWait) {
      response += "We apologize for the wait time you experienced. We're working on improving our efficiency without compromising quality. ";
    }
    
    if (hasService) {
      response += "We appreciate your honest assessment of our service and will use it to improve. ";
    }
    
    if (hasFood) {
      response += "We're constantly refining our menu and preparation methods based on customer feedback. ";
    }
    
    response += "We hope to exceed your expectations on your next visit.";
    return response;
  } else {
    let response = `${firstName}, we sincerely apologize for your disappointing experience. `;
    
    if (hasService || hasStaff) {
      response += "Customer service is a top priority for us, and we clearly fell short during your visit. ";
    }
    
    if (hasFood) {
      response += "We're very sorry that the food wasn't up to standard. Our chef would appreciate the opportunity to make this right. ";
    }
    
    if (hasWait) {
      response += "We apologize for the long wait time you experienced. We're reviewing our staffing and procedures to address this issue. ";
    }
    
    response += "Please contact our manager directly at manager@ourrestaurant.com so we can personally address your concerns and make things right. We're committed to improving and would value another chance to serve you better.";
    return response;
  }
} 