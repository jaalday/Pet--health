import {
  Form,
  useLoaderData,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import supabase from "../config/supabaseClients";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const data = { email, password };

  const url = `${import.meta.env.VITE_SOURCE_URL}/login`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  
//   .then((response) => response.json());
//   console.log("logged on", response);

  

  if(response.ok){
    const authResponse = await response.json();
    console.log("login auth response", authResponse);

    const access_token = authResponse.session.access_token;
    localStorage.setItem('access_token', access_token);
    return redirect ('/profile')

  } else{
    const error =await response.text();
    console.log("error", error)
  }
}

// async function handleSubmit(e){
//     e.preventDefault()

//     try(
//         const {data, error} = await supabase.auth.signInWithPassword({

//             email: formData.email,
//             password: formData.password
//         })
//         if(error) throw error
//         console.log(data)

//     )

// }

const Login = () => {
  const response = useActionData();
  console.log(response);

  return (
    <div className="login-card">
      <h1>Log In</h1>
      <Form id="login" method="POST">
        <label>
          <input type="text" name="email" placeholder="Enter Email" />
          <br />
          <br />
          <input type="text" name="password" placeholder="Enter Password" />
          <br />
          <br />
          <button type="submit" className="login-button">
            Log In
          </button>
        </label>
      </Form>
    </div>
  );
};

export default Login;
