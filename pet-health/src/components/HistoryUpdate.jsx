import { useEffect } from "react";








const HistoryUpdate = () => {


    async function getUser(profile) {
        const data = { profile };
        const url = `${import.meta.env.VITE_SOURCE_URL}/users`;
        const getUser = await fetch(url, {
          method: "GET",
          headers: {
            "content-Type": "application/json",
          },
        }).then((response) => response.json());
        console.log("user data: ", getUser);
        console.log(data);
        return getUser;
      }



    return(
        <>
        </>
    )





}

export default HistoryUpdate