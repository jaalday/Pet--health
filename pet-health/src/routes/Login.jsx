import { Form, useLoaderData, Link, redirect } from "react-router-dom";
import supabase from "../config/supabaseClients";


async function signInWithEmail() {
    const formData = await requestAnimationFrame.formData();
    const email = formData.get('userName');
    const password = formData.get('password');

    const data = {email, password};
    const url = "http://localhost:8000/login"
    const login = await fetch(url, {
        method:'POST',
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
    console.log('logged on', login);

    return login


}


// export async function action({ request }) {
//   const formData = await request.formData();
//   const email = formData.get("email");

//   const password = formData.get("password");

//   const userdata = { email, password };

//   try {
//     const url = `${import.meta.env.VITE_SOURCE_URL}/login`;

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "content-Type": "application/json",
//       },
//       body: JSON.stringify(userdata),
    // });
    //   .then((response) => response.json());
    //   console.log("logged in", login);

    //   return redirect("/profile");

//     const statusCode = response.status;
//     const data = await response.json();

   

// }
// }


const Login = () => {


    return(
    <div className="login-card">
        <h1>Log In</h1>
        <Form id="login" method="POST">
            <label>
                <input type="text" name="email" placeholder="Enter Email"/>
                <br/>
                <br/>
                <input type="text" name="password" placeholder="Enter Password"/>
                <br/>
                <br/>
                <button type="submit" className="login-button">Log In</button>
            </label>

        </Form>




    </div>


    )

}

export default Login