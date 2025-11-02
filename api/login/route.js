import { MongoClient } from "mongodb";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    console.log("🔐 LOGIN ATTEMPT:", email);

    const uri = "mongodb+srv://jordananiuzu:SIDEMENxix123@kky3.4edz1.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("ani_app");
    const users = db.collection("users");

    const user = await users.findOne({ email });

    if (!user) {
      console.log("❌ No account found for", email);
      return Response.json({ success: false, message: "❌ <strong>No account found for this email.</strong>" });
    }

    if (user.password === password) {
      console.log("✅ Login successful for:", email);
      return Response.json({ success: true, message: "✅ <strong>Login successful! Welcome back.</strong>" });
    } else {
      console.log("❌ Invalid password for:", email);
      return Response.json({ success: false, message: "❌ <strong>Incorrect password.</strong>" });
    }
  } catch (err) {
    console.error("🔥 Login error:", err);
    return Response.json({ success: false, message: "❌ <strong>Server error. Please try again later.</strong>" });
  }
}
