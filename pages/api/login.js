import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import User from "@/model/user";
import connectToDatabase from "@/utils/dbConnect";

connectToDatabase();

export default async function login(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({ success: false, error: "Bad request!" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(200)
      .json({ success: false, error: "No user found. Create an account!" });
  }

  const cipher = CryptoJS.AES.decrypt(user.password, "secret123");
  const decryptedPass = cipher.toString(CryptoJS.enc.Utf8);

  if (req.body.email !== user.email || req.body.password !== decryptedPass) {
    return res.status(200).json({ success: false, error: "Wrong password!" });
  }

  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
    },
    "jwtsecret"
  );

  return res.status(200).json({ success: true, token });
}
