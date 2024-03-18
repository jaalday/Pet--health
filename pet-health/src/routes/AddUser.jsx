import { Form, redirect } from "react-router-dom";
import supabase from "../config/supabaseClients";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// export async function action({ request }) {
//     const formData = await request.formData();
//     const email = formData.get('email');
//     const password = formData.get('password');

//     const data = {email, password};

//     const url = `${import.meta.env.VITE_SOURCE_URL}/users/add`;

//     const addUser = await fetch(url, {
//         method: "POST",
//         headers: {
//             "content-Type": "application/json",
//         },
//         body: JSON.stringify(data),

//     }).then((response) => response.json());
//     console.log("added user", addUser);
//     return redirect('/login');

// }
// async function signUpNewUser() {
//     const { data, error } = await supabase.auth.signUp({
//       email: 'example@email.com',
//       password: 'example-password',
//       options: {
//         emailRedirectTo: 'https://example.com/welcome',
//       },
//     })
//   }

const AddUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  

  function handleChange(event) {
    console.log("event", event)
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
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
    
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="login-card">
        <h1>Sign-Up</h1>
        <Form id="addUser" onSubmit={handleSubmit}>
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
          {/* <input type="hidden" name="user_id"/> */}
          <button className="login-button" type="submit">
            Sign-up
          </button>
        </Form>
      </div>
    </>
  );
};

export default AddUser;
