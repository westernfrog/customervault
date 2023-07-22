import User from "@/model/user";
import connectToDatabase from "@/utils/dbConnect";

connectToDatabase();

export default async function handler(req, res) {
  try {
    if (req.method !== "DELETE") {
      return res.status(400).json({ success: false, error: "Bad request!" });
    }

    const { email } = req.body;

    const deleteUser = await User.deleteOne({ email });

    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(deleteUser);
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
