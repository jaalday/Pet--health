import { useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid";
import supabase from "../config/supabaseClients";
import { createClient } from "@supabase/supabase-js";
import {useUser} from '@supabase/auth-helpers-react';


//components for pet page
import PetCard from "../components/PetProfile";


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

  //   const [userId, setUserId] = useState('');
  //   const [media, setMedia] = useState([])
  // const user = useUser


  //   async function uploadImage(e) {
  //       let file = e.target.files[0];
  //       const { data, error } = await supabase.storage
  //         .from("pets")
  //         .upload(userId + "/", file);
    
  //       if (data) {
  //         setMedia(data);
  //         console.log("upload data", data);
  //         getMedia();
  //       } else {
  //         console.log(error);
  //       }
  //     }
  //     async function getMedia() {
  //       const { data, error } = await supabase.storage.from("pets").list(user?.id);
  //       console.log("imagedata", data);
  //       if (data) {
  //         setMedia(data);
  //       } else {
  //         console.log("error", error);
  //       }
  //     }
 





    // useEffect(() => {
     
    //     getMedia();
    // }, [userId])

    // const [fetchError, setFetchError] = useState(null)
    // const [pets, setPets] = useState(null)

    // useEffect(() => {
    //     const fetchPets = async () => {
    //         const {data, error} = await supabase
    //         .from('pets')
    //         .select()

    //         if(error) {
    //             setFetchError('could not fetch pets info')
    //             setPets(null)
    //             console.log(error)
    //         }
    //         if(data){
    //             setPets(data)
    //             setFetchError(null)
    //         }
    //     }
    //     fetchPets()

    // }, [])



  return (
 
     

   
     
        <PetCard />

                    
       
       


  );
// };
                }

export default PetProfile1;
