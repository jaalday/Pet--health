import { Form } from "react-router-dom";
import supabase from "../config/supabaseClients";
import { Link } from "react-router-dom";
import { useState } from "react";

const AddUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    console.log("event", event);
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="sign_in_banner">
        <img
          className="sign_in_img"
          src="https://cdcssl.ibsrv.net/ibimg/smb/1833x650_80/webmgr/0o/g/q/south-shore-banner-2.png.webp?c10c2beef8e907113976313300a61d32"
        />
        <div className="sign-in-card">
          <h1>Sign-Up</h1>
          <form id="addUser" onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                type="email"
                name="email"
                placeholder="enter your email"
                onChange={handleChange}
              />
            </label>
            <br />
            <br />
            <label>
              Password:
              <input
                type="password"
                name="password"
                placeholder="enter your password"
                onChange={handleChange}
              />
            </label>

            <br />
            <br />

            <button className="login-button" type="submit">
              Sign-up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;
