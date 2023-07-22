import { useEffect, useState } from "react";
import { Auth } from "./Auth";

const CustomerCard = (props) => {
  const userData = Auth();

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: props.name,
    email: props.email,
  });

  useEffect(() => {
    setFormData({
      name: props.name,
      email: props.email,
    });
  }, [props.name, props.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData({
      name: props.name,
      email: props.email,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setEditing(false);
        window.location.reload();
      } else {
        console.error("Error updating user data");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: props.email }),
      });

      if (response.ok) {
        if (userData.email == props.email) {
          localStorage.removeItem("token");
          setTimeout(() => {
            router.push("/");
          }, 200);
        }
        window.location.reload();
      } else {
        console.error("Error deleting user data");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="col-md-6 mb-4">
        <div className="card shadow-sm p-2">
          <div className="card-body">
            {editing ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    <h6>Name</h6>
                  </label>
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
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    <input
                      className="form-control border-0 bg-transparent"
                      type="name"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <h6>
                      Email{" "}
                      <span className="text-muted">
                        (can&apos;t change the email)
                      </span>
                    </h6>
                  </label>
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
                      type="email"
                      className="form-control border-0 bg-transparent text-muted"
                      id="email"
                      name="email"
                      disabled
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-4">
                  <button
                    type="button"
                    className="btn rounded-pill me-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-green rounded-pill">
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="row align-items-center">
                <div className="col-md">
                  <h5 className="card-title">{props.name}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    {props.email}
                  </h6>
                </div>
                <div className="col-md d-flex align-items-center justify-content-start justify-content-lg-end gap-3 mt-lg-0 mt-4">
                  <button
                    className="btn btn-sm btn-green rounded-pill d-flex align-items-center px-3"
                    onClick={handleEdit}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 me-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 me-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </svg>
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger rounded-pill d-flex align-items-center px-3"
                    onClick={handleDelete}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 me-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 me-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerCard;
