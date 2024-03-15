import { useLoaderData, Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";



export async function loader() {
    const url = "http://localhost:8000/logout";

    const access_token = localStorage.getItem('access_token');

    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
        },
    });
    const statusCode = response.status;
    return statusCode === 200 ? true : false;


}

const Logout = () => {

    const response = useLoaderData();
    const { setIsAuth } = useAuth();

    if (response) {
        localStorage.clear();
        setIsAuth(false);
        return <Navigate to='/'/>;
    } else {
        alert ('WOOF WOOF cant log out');
        return <Navigate to='/'/>;
    }

}


export default Logout;