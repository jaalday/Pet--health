// import {
//   Form,
//   useLoaderData,
//   Link,
//   redirect,
//   useActionData,
// } from "react-router-dom";
// import supabase from "../config/supabaseClients";

// export async function action({ request }) {
//   const formData = await request.formData();
//   const email = formData.get("email");
//   const password = formData.get("password");

//   const data = { email, password };

//   const url = `${import.meta.env.VITE_SOURCE_URL}/login`;

//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })

// const statusCode = response.status;

// }





  
//   .then((response) => response.json());
//   console.log("logged on", response);

  

//   if(response.ok){
//     const authResponse = await response.json();
//     console.log("login auth response", authResponse);

//     const access_token = authResponse.session.access_token;
//     localStorage.setItem('access_token', access_token);
//     return redirect ('/profile')

//   } else{
//     const error =await response.text();
//     console.log("error", error)
//   }
// }

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

/* eslint-disable react-refresh/only-export-components */
import { Form, useNavigate, useActionData } from 'react-router-dom';
import { useAuth } from '../AuthContext';



import { useEffect } from 'react';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    const loginData = { email, password };

    try {
        const url = `${import.meta.env.VITE_SOURCE_URL}/login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        const statusCode = response.status;

        if (statusCode === 200) {
            const data = await response.json();
            const { session, user } = data;
            localStorage.clear();
            localStorage.setItem('user_id', user.id)
            localStorage.setItem('access_token', session.access_token);
            localStorage.setItem('refresh_token', session.refresh_token);
            localStorage.setItem('expiration', session.expires_at);
        }
        return statusCode === 200 ? true : false;
    } catch (error) {
        console.error('ERROR: ', error);
        return false;
    }
};

const Login = () => {
    const response = useActionData();
    const navigate = useNavigate();
    const { setIsAuth } = useAuth();

    useEffect(() => {
        const checkAuth = () => {
            if (typeof response !== 'undefined') {
                setIsAuth(response);
                return response && navigate(`/profile`);
            }
        };
        checkAuth();
    }, [response, setIsAuth, navigate]);

// const Login = () => {
//   const response = useActionData();
//   console.log(response);

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
