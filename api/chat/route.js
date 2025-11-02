import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    // Check if the API key is present
    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ ERROR: Missing OpenAI API key in environment variables.");
      return Response.json(
        { reply: "Server misconfiguration: API key not found." },
        { status: 500 }
      );
    }

    // Try to parse the request body
    let messages;
    try {
      const body = await req.json();
      messages = body.messages;
    } catch (err) {
      console.error("❌ ERROR: Failed to parse request JSON:", err);
      return Response.json(
        { reply: "Invalid request format." },
        { status: 400 }
      );
    }

    if (!Array.isArray(messages)) {
      console.error("❌ ERROR: Missing or invalid 'messages' array in request.");
      return Response.json(
        { reply: "Invalid input format." },
        { status: 400 }
      );
    }

    // Send request to OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo", // safer and widely available model
      messages,
    });

    // Handle unexpected API response
    if (!response?.choices?.[0]?.message?.content) {
      console.error("❌ ERROR: Unexpected response format from OpenAI:", response);
      return Response.json(
        { reply: "No response received from the AI model." },
        { status: 502 }
      );
    }

    // Return successful reply
    const reply = response.choices[0].message.content;
    console.log("✅ AI Reply Sent:", reply.slice(0, 50) + "...");
    return Response.json({ reply });
  } catch (error) {
    // Catch-all for any unexpected errors
    console.error("🔥 SERVER ERROR:", error);
    return Response.json(
      { reply: "Internal server error. Check logs for details." },
      { status: 500 }
    );
  }
}
