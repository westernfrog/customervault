import connectToDatabase from "@/utils/dbConnect";
import User from "@/model/user";

connectToDatabase();

export default async function users(req, res) {
  try {
    const users = await User.find({}, "name email").sort("-createdAt");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
