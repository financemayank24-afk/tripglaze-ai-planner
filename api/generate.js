import { OpenAI } from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { destination, start, end, style, budget } = req.body;
    const prompt = `Create a detailed US trip itinerary for ${destination} from ${start} to ${end}. Travel style: ${style}. Budget: ${budget}. Return ONLY JSON: {"days":[{"day":1,"date":"YYYY-MM-DD","title":"Day 1","description":"Short summary","activities":["Activity 1","Activity 2"],"places":["Place - address"]}],"places":[{"name":"Place","address":"Full address","type":"sightseeing"}],"points":[{"label":"1","lat":40.7128,"lng":-74.0060}]} Do not include any text outside JSON.`;
    const response = await openai.chat.completions.create({ model: "gpt-4o-mini", messages: [{ role: "user", content: prompt }], max_tokens: 1200, temperature: 0.8 });
    const text = response.choices?.[0]?.message?.content?.trim() || "";
    let data;
    try { data = JSON.parse(text); } catch (e) { const s = text.indexOf("{"); const e2 = text.lastIndexOf("}"); if (s !== -1 && e2 !== -1) data = JSON.parse(text.slice(s, e2 + 1)); else throw e; }
    res.status(200).json(data);
  } catch (err) { console.error("Error:", err); res.status(500).json({ error: "Failed to generate itinerary" }); }
}
