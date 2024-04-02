import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export async function loader() {
  const url = `${import.meta.env.VITE_SOURCE_URL}/logout`;

  const access_token = localStorage.getItem("access_token");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  const statusCode = response.status;
  return statusCode === 200 ? true : false;
}

const Logout = () => {
  const navigate = useNavigate();
  const response = useLoaderData();
  const { setIsAuth } = useAuth();
 
  useEffect(() => {
    if (response) {
        localStorage.clear();
        setIsAuth(false);
        return navigate("/");
      } else {
        alert("oops cant log out.. you stuck here");
        return navigate("/");
      }
  })
  
};

export default Logout;
