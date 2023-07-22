import Link from "next/link";
import { Auth } from "./Auth";
import { useRouter } from "next/router";

export default function Header(params) {
  const router = useRouter();
  const userData = Auth();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      router.push("/");
    }, 200);
  };

  return (
    <>
      <header className="border-bottom sticky-top">
        <nav className="container navbar py-3">
          <div className="container-fluid align-items-end">
            <Link
              className="navbar-brand fs-5 d-flex align-items-center"
              href={"/"}
            >
              {userData ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 me-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 me-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              )}
              Vault
            </Link>
            {userData ? (
              <div className="dropdown">
                <Link
                  href="#"
                  className="d-flex align-items-center text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1864/1864472.png"
                    alt=""
                    width="32"
                    height="32"
                    className="rounded-circle me-2 border border-dark"
                  />
                  <strong>{userData.email}</strong>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item fs-7" href="#">
                      Logged in as {userData.name}
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item fs-7" href="/signup">
                      Create new account!
                    </Link>
                  </li>
                  <li>
                    <a
                      className="dropdown-item link-danger fs-7"
                      href="/"
                      onClick={handleLogOut}
                    >
                      Log out
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex">
                <Link href={"/login"} className="btn rounded-pill">
                  Log in
                </Link>
                <Link
                  href={"/signup"}
                  className="btn btn-green rounded-pill px-3"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
