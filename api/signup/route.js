import { MongoClient } from "mongodb";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    console.log("🧾 REGISTER ATTEMPT:", email);

    const uri = "mongodb+srv://jordananiuzu:SIDEMENxix123@kky3.4edz1.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("ani_app");
    const users = db.collection("users");

    const existing = await users.findOne({ email });
    if (existing) {
      console.log("⚠️ Account already exists:", email);
      return Response.json({ success: false, message: "⚠️ <strong>Account already exists. Try logging in.</strong>" });
    }

    await users.insertOne({ email, password });
    console.log("✅ Account created successfully for:", email);

    return Response.json({ success: true, message: "✅ <strong>Account created successfully! You can now log in.</strong>" });
  } catch (err) {
    console.error("🔥 Registration error:", err);
    return Response.json({ success: false, message: "❌ <strong>Server error. Please try again later.</strong>" });
  }
}
