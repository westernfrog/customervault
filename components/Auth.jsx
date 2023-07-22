import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";

export function Auth() {
  const [data, setData] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt.decode(token);
      setData(decoded);
    }
  }, []);

  return data;
}
