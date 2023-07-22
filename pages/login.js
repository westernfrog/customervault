import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleChange = async (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email.match(emailRegex) && password.length > 5) {
      setPasswordError(false);
      setEmailError(false);
      const data = { email, password };
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      console.log(response.success);

      setLoading(false);
      setEmail("");
      setPassword("");

      if (response.success == false) {
        setSendSuccess(false);
        setResponse(response.error);
      } else {
        setSendSuccess(true);
        localStorage.setItem("token", response.token);
        router.push({ pathname: "/" });
      }
    } else {
      setLoading(false);
      setEmailError(true);
      setPasswordError(true);
    }
    if (email.match(emailRegex)) {
      setEmailError(false);
    }
    if (password.length > 5) {
      setPasswordError(false);
    }
  };
  return (
    <>
      <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div className="col-md-4">
          <h3>Log in to your account!</h3>
          <div>
            <div className="my-5">
              <h4>What was your email?</h4>
              <div className="border-bottom border-dark d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                  />
                </svg>
                <input
                  className="form-control border-0 bg-transparent"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                />
              </div>
              {emailError ? (
                <p className="mb-0 my-1 text-danger fs-7">
                  Please enter a valid email address.
                </p>
              ) : (
                <></>
              )}
            </div>
            <div className="my-5">
              <h4>And your password?</h4>
              <div className="border-bottom border-dark d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
                <input
                  className="form-control border-0 bg-transparent"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                  placeholder="Your Password"
                />
              </div>
              {passwordError ? (
                <p className="mb-0 my-1 text-danger fs-7">
                  Password can&apos;t be less than 5 characters.
                </p>
              ) : (
                <></>
              )}
            </div>
            <button
              className="btn btn-green rounded-pill d-flex align-items-center px-5"
              onClick={handleSubmit}
            >
              {loading
                ? "Loading..."
                : sendSuccess
                ? "Redirecting..."
                : response
                ? response
                : "Log in"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
