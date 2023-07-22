import connectToDatabase from "@/utils/dbConnect";
import User from "@/model/user";

connectToDatabase();

export default async function handler(req, res) {
  try {
    if (req.method !== "PUT") {
      return res.status(400).json({ success: false, error: "Bad request!" });
    }

    const { name, email } = req.body;

    const updatedUser = await User.updateOne(
      { email },
      { name, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
