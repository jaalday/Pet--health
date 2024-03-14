import {Form, redirect} from 'react-router-dom';

export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get('userName');
    const password = formData.get('password');
    // const user_id = formData.get('user_id');

    const data = {email, password};

    const url = "http://localhost:8000/users/add";

    const addUser = await fetch(url, {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(data),

    }).then((response) => response.json());
    console.log("added user", addUser);
    return redirect('/login');

}
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

    return(

        <>
        <div className='login-card'>
        <h1>Sign-Up</h1>
        <Form id="addUser" method="POST">

        <label>Email: 
            <input type="text" name="userName" placeholder='enter your email'/>
        </label>
        <br/>
        <br/>
        <label>Password:
            <input type="text" name="password" placeholder='enter your password'/>
        </label>
        <br/>
        <br/>
        {/* <input type="hidden" name="user_id"/> */}
        <button className='login-button' type="submit">Sign-up</button>



        </Form>
        </div>
        
        </>
    )


}


export default AddUser;