import CryptoJS from "crypto-js";
import User from "@/model/user";
import connectToDatabase from "@/utils/dbConnect";

export default async function newUser(req, res) {
  await connectToDatabase();

  if (req.method !== "POST") {
    return res.status(400).json({ error: "This method is not allowed" });
  }
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res
      .status(200)
      .json({ success: false, error: "User already exists kindly login." });
  }
  const { name, email, password } = req.body;
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    "secret123"
  ).toString();
  const user = new User({
    name,
    email,
    password: encryptedPassword,
  });
  await user.save();

  res.status(200).json({ success: true });
}
