import React, { useState } from "react";
import { ApiActions } from "../actions/api.actions";
import axios from "axios";

export default function SignUp() {
  const actions = ApiActions();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    email: "amanpatidar@gmail.com",
  });
  const submit = async () => {
    // await actions.postUserDetail(formData);
    await axios
      .post("http://localhost:7000/app/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response, "suceesssss");
      })
      .catch(function (error) {
        console.log(error, "failled");
      });
  };

  return (
    <div className="Auth-form-container">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Sign UP</h3>
        <div className="form-group mt-3">
          <label>Username</label>
          <input
            className="form-control mt-1"
            placeholder="Enter Username"
            name="username"
            type="text"
            value={formData?.username}
            required
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>
        <div className="form-group mt-3">
          <label>first_name</label>
          <input
            className="form-control mt-1"
            placeholder="Enter first_name"
            name="first_name"
            type="text"
            value={formData.first_name}
            required
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
          />
        </div>
        <div className="form-group mt-3">
          <label>last_name</label>
          <input
            className="form-control mt-1"
            placeholder="Enter last_name"
            name="last_name"
            type="text"
            value={formData.last_name}
            required
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          />
        </div>
        <div className="form-group mt-3">
          <label>password</label>
          <input
            name="password"
            type="password"
            className="form-control mt-1"
            placeholder="Enter password"
            value={formData.password}
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div className="form-group mt-3">
          <label>password2</label>
          <input
            name="password"
            type="password"
            className="form-control mt-1"
            placeholder="Enter password"
            value={formData.password2}
            required
            onChange={(e) =>
              setFormData({ ...formData, password2: e.target.value })
            }
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => {
              submit();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
