
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

  return (
    <>
    <div className='login_img_box'>
      <img className="image_background" src="https://www.georgeveterinaryclinic.com/userfiles/images/banner/top-veterinarian-1.jpg"/>
    <div className="login-card">
      <h1>Log In</h1>
      <Form id="login" method="POST">
        <label>
          <input type="text" name="email" placeholder="Enter Email" />
          <br />
          <br />
          <input type="password" name="password" placeholder="Enter Password" />
          <br />
          <br />
          <button type="submit" className="login-button">
            Log In
          </button>
        </label>
      </Form>
    </div>
    </div>
    <div className="login_box2">
    </div>
    </>
  );
};

export default Login;
