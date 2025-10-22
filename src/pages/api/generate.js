import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = process.env.GEMINI_API_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { desc, tone, len } = req.body;
  if (!desc) return res.status(400).json({ error: "No Input" });

  try {
    const genAI = new GoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });


    console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);
    if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is not defined");
  return res.status(500).json({ error: "Missing Gemini API key" });
}


    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // or "gemini-pro"

    const prompt = `Write a LinkedIn post on "${desc}" in a ${tone} tone.
Keep it concise but engaging, use short paragraphs, include a hook line and a call-to-action.
Post length: ${len}`;

    const result = await model.generateContent([prompt]);
    const response = await result.response;
    const text = await response.text();

    console.log("Generated text:", text);

    return res.status(200).json({ text });
  } catch (err) {
    console.error("Gemini error:", err);
    return res.status(500).json({
      error: "Generation failed",
      details: err.message || String(err),
    });
  }
}
