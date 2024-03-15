import { useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid";
import supabase from "../config/supabaseClients";
import { createClient } from "@supabase/supabase-js";





// export async function action () {
//   const [petData, setPetData] = useState([]);

//   useEffect(() => {
//     getPet();

//     console.log("PET DATA", petData);
//   });

//   const url = `${import.meta.env.VITE_SOURCE_URL}/petprofile1`;
//   const getPet = await fetch(url, {
//     method: "GET",
//     headers: {
//       "content-Type": "application/json",
//     },
//   }).then((response) => setPetData(response.json()));
// }




const PetProfile1 = () => {

    const [userId, setUserId] = useState('');
    const [media, setMedia] = useState([])

    const getUser = async () =>{

        try {
            const{data: {user}} = await supabase.auth.getUser()
            if (user !== null){
                setUserId(user.id);
            } else {
                setUserId('')
            }
        } catch (e){(e)}
    }

    async function uploadImage(e) {
        let file = e.target.files[0]
        const {data, error} = await supabase.storage.from('Avatars').upload(userId + '/' + uuidv4(), file)

    if (data) {
        getMedia();
    } else {
        console.log(error)
    }
            
    }

    async function getMedia() {
        const {data, error} = await supabase.from('Avatars')
        if (data) {
            setMedia(data);
        } else {
            console.log("image", error)
        }
    }



    // {imageURLs.map((imageSrc) => (
    //     <img className="img" src={imageSrc} /> 
    //    ))} 


    useEffect(() => {
        getUser();
        getMedia();
    }, [userId])



  return (
    <>
    <input type="file" onChange={(e) => uploadImage(e)}/>
    {media.map((media) => {
          return (<>
            <div>
              <img src={`https://tgyucrjdklladsjukszn.supabase.co/storage/v1/object/public/Avatars/${media.name}`} />
            </div>
          </>
          )
        })}
      <h1>Pet Name</h1>

      <h3>profile pic</h3>
      <h3>age</h3>
      <h3>species</h3>
      <h3>color</h3>

      <h4>brief personality description</h4>
      <label>
        <input type="text" placeholder="enter a description of your pet" />
      </label>
      <div></div>
      <div>
        <h3>medical history and information list</h3>
        <ul>
          <li>soemthing</li>
          <li>something</li>
          <li>something</li>
          <li>blabla</li>
        </ul>
      </div>
    </>
  );
};

export default PetProfile1;
