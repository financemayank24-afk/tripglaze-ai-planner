import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { destination, duration, interests, budget } = req.body;

    const prompt = `Create a detailed travel itinerary for:
Destination: ${destination}
Duration: ${duration} days
Interests: ${interests.join(', ')}
Budget: ${budget}

Provide a day-by-day breakdown with recommendations for activities, restaurants, and transportation.`;

    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    const message = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const itinerary = message.choices[0].message.content;

    res.status(200).json({ itinerary });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate itinerary', details: error.message });
  }
}
