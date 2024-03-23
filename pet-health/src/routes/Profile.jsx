import { Link, Form, redirect, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileCSS from "./Profile.module.css";
import PetProfile1 from "./PetProfile1";
import supabase from "../config/supabaseClients";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@supabase/auth-helpers-react";

//adding and creating pet profile data
const user = localStorage.getItem("user_id");

export async function action({ request }) {
  const formData = await request.formData();
  const petName = formData.get("petName");
  const age = formData.get("petAge");
  const species = formData.get("species");
  const color = formData.get("color");
  
//history table
  // const pet_name = formData.get("pet_name");
  // const medications = formData.get("medication");
  // const vaccinations = formData.get("vaccinations");
  // const surgeries = formData.get("surgeries");
  // const food = formData.get("food");
  // const conditions = formData.get("conditions");
  // const concerns = formData.get("concerns");

  const data = {
    owner_id: localStorage.getItem("user_id"),
    name: petName, 
    age,
    species,
    color,
    //history table
    // pet_name,
    // medications,
    // vaccinations,
    // surgeries,
    // food,
    // conditions,
    // concerns,
  };
  const url = `${import.meta.env.VITE_SOURCE_URL}/profile`;
  // const url2 = `${import.meta.env.VITE_SOURCE_URL}/profile/history`;
  const addPet = await fetch(url, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
  console.log("Petdata: ", addPet);
  // return addPet

  // const url2 = `${import.meta.env.VITE_SOURCE_URL}/profile${user}`;
  // const addHistory = await fetch(url2, {

  //   method: "POST",
  //   headers: {
  //     "content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // }).then((response) => response.json());
  // console.log("History:", addHistory);


  return addPet


}





const BUCKET_URL =
  "https://tgyucrjdklladsjukszn.supabase.co/storage/v1/object/public/Avatars/";

const Profile = () => {
  // let user = useUser();
  // const user = localStorage.getItem("user_id")
  const [fetchError, setFetchError] = useState(null);
  const [pets, setPets] = useState(null);
  useEffect(() => {
    const fetchPets = async () => {
      const { data, error } = await supabase
        .from("pets")
        .select()
        .eq("owner_id", user);

      if (error) {
        setFetchError("could not fetch pets info");
        setPets(null);
        console.log(error);
      }
      if (data) {
        setPets(data);
        console.log(data);
        setFetchError(null);
      }
    };
    fetchPets();
  }, []);

  console.log(pets)

  // get user data
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

  // async function getUser(currentUserId){
  //   try {
  //     const{data, error} = await supabase
  //       .from('profile')
  //       .select('*')
  //       .eq('id', currentUserId)
  //       .single();

  //     if(error){
  //       throw error;
  //     }
  //     return data;
  //   }catch(error){
  //     console.log('error fetching user:',error)
  //     throw error;
  //   }

  // }
  // const userId = localStorage.getItem("user_id")
  // const [userId, setUserId] = useState("");
  // const [media, setMedia] = useState([]);

  // async function uploadImage(e) {
  //   // let user = useUser
  //   let file = e.target.files[0];
  //   const fileName = file.name;
  //   const { data, error } = await supabase.storage
  //     .from("Avatars")
  //     .upload(userId + "/", fileName, file);

  //   if (data) {
  //     getMedia(data);
  //     console.log("upload data", data);
  //     setMedia();
  //   } else {
  //     console.log(error);
  //   }
  // }
  const [images, setImages] = useState([]);
  const user = localStorage.getItem("user_id");
  console.log("user:", user);

  async function getImages() {
    const { data, error } = await supabase.storage
      .from("Avatars")
      .list(user?.id + "/", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (data !== null) {
      setImages(data);
    } else {
      alert("error loadin images");
      console.log(error);
    }
  }
  useEffect(() => {
    if (user) {
      getImages();
      getUser;
    }
  }, [user]);

  async function uploadImage(e) {
    let file = e.target.files[0];

    const { data, error } = await supabase.storage
      .from("Avatars")
      .upload(user.id + "/" + uuidv4(), file);

    if (data) {
      getImages();
    } else {
      console.log(error);
    }
  }

  async function deleteImage(imageName) {
    const { error } = await supabase.storage
      .from("Avatars")
      .remove([user.id + "/" + imageName]);

    if (error) {
      alert(error);
    } else {
      getImages();
    }
  }



  return (
    <>
      <div className="profile-card">
        <div className={ProfileCSS.container}>
     
          <div className={ProfileCSS.box1}>
            <Form method="POST" encType="multipart/form-data">
              <label htmlFor="photo"></label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={(e) => uploadImage(e)}
              />
              {images.map((image) => {
                return (
                  <>
                    <div key={BUCKET_URL + user.id + "/" + image.name}>
                      <img
                        className="avatar_pic"
                        src={BUCKET_URL + user.id + "/" + image.name}
                      />
                    </div>
                    <button
                      type="submit"
                      onClick={() => deleteImage(image.name)}
                    >
                      Delete
                    </button>
                  </>
                );
              })}
            </Form>
          </div>

          <div></div>

          <div className={ProfileCSS.box2}>
            <Form id="addPet" method="POST">
              <label>
                <input
                  className={ProfileCSS.input1}
                  type="text"
                  name="petName"
                  placeholder="Pet Name"
                />
                <br />
                <input
                  className={ProfileCSS.input1}
                  type="text"
                  name="petAge"
                  placeholder="Age"
                />
                <br />
                <input
                  className={ProfileCSS.input1}
                  type="text"
                  name="species"
                  placeholder="Species / Breed"
                />
                <br />
                <input
                  className={ProfileCSS.input1}
                  type="text"
                  name="color"
                  placeholder="Color"
                />
          
              </label>
              <button
                type="submit"
                name="addAnimal"
                className={ProfileCSS.addAnimal}
              >
                Add Animal
              </button>
              
            </Form>
            
            <button className={ProfileCSS.logout}>
              <Link to="/logout">Log Out</Link>
            </button>

            <Form id="addHistory"method="POST">
                              <input type="text" name="pet_name" placeholder="pet name"/>
                              <input type="text" name="medications" placeholder="medications"/>
                              <input type="text" name="vaccinations" placeholder="vaccines"/>
                              <input type="text" name="surgeries" placeholder="surgeries"/>
                              <input type="text" name="food" placeholder="food"/>
                              <input type="text" name="conditions" placeholder="preexisting conditions"/>
                              <input type="text" name="concerns" placeholder="any concerns?"/>
                              {/* <input type="hidden" name="id" value={pet.id}/> */}
                           <button name="addHistory" type="submit">add history</button>  
              </Form>
              
          </div>
          {/* <div className={ProfileCSS.box3}>
              <Form id="addBio" method="POST">
        
            <input className={ProfileCSS.inputBio} type="text" name="addBio" placeholder="add a short bio"/>
            <button>Add</button>
        
            </Form>
            </div> */}

          <br />

          <div className={ProfileCSS.box3}>
            <Link to="/petprofile1">
              <button className={ProfileCSS.petButton} type="submit">
                pet profiles
              </button>
              <p>Click here to view all your pets information!</p>
            </Link>
          </div>

          <div className={ProfileCSS.box4}>
          
          </div>
          <div className={ProfileCSS.box5}>
            <img
              className={ProfileCSS.imgBanner}
              src="https://www.vetspetclinic.com/userfiles/images/banner/leading-spaying-and-neutering-5.jpg"
            />
            {/* <img
              className={ProfileCSS.imgBanner}
              src="https://www.petsnvets.org/images/headers/ph4l/47334_NEW-PH4L_Web_Internal_1920x489_PetsnVets.jpg"
            /> */}
          </div>
        </div>

        <div></div>
      </div>
    </>
  );
};

export default Profile;
