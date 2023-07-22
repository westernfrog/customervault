import CustomerCard from "./CustomerCard";
import { useState, useEffect } from "react";

export default function Overview(params) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const userRes = await fetch("/api/users");
      const users = await userRes.json();

      setUsers(users);
    }

    fetchPosts();
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <div className="col-md-6 my-3 my-lg-4">
            <h1>Details of all logged in customers</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              fugiat aperiam similique culpa itaque, eum earum? Eum veritatis,
              sequi quo ut facilis aspernatur? Tempora, tenetur! Quaerat
              eligendi repellat laboriosam maxime.
            </p>
          </div>
          <div className="col-md-12">
            <div className="row justify-content-between">
              {users.map((user, index) => (
                <CustomerCard key={index} name={user.name} email={user.email} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
