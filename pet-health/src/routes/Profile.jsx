import { Link, Form, redirect, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileCSS from "./Profile.module.css";
import PetProfile1 from "./PetProfile1";
import supabase from "../config/supabaseClients";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@supabase/auth-helpers-react";

//adding and creating pet profile data

export async function action({ request }) {
  const formData = await request.formData();
  const petName = formData.get("petName");
  const age = formData.get("petAge");
  const species = formData.get("species");
  const color = formData.get("color");

  const data = {
    owner_id: localStorage.getItem("user_id"),
    name: petName,
    age,
    species,
    color,
  };
  const url = `${import.meta.env.VITE_SOURCE_URL}/profile`;
  const addPet = await fetch(url, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
  console.log("Petdata: ", addPet);

  return redirect("/petprofile1");

  //end of func
}

const Profile = () => {
  const user = useUser();

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

  // const [userId, setUserId] = useState("");
  const [media, setMedia] = useState([]);

  async function uploadImage(e) {
    let file = e.target.files[0];
    const { data, error } = await supabase.storage
      .from("Avatars")
      .upload(user.id + "/", file);

    if (data) {
      getMedia(data);
      console.log("upload data", data);
      setMedia();
    } else {
      console.log(error);
    }
  }

  async function getMedia() {
    const { data, error } = await supabase.storage
      .from("Avatars")
      .list(user?.id);
    console.log("imagedata", data);
    if (data) {
      setMedia(data);
    } else {
      console.log("error", error);
    }
  }
  useEffect(() => {
    getUser();
    getMedia();
  }, []);

  return (
    <>
      <div className="profile-card">
        <div className={ProfileCSS.container}>
          <div className={ProfileCSS.box1}>
            <input type="file" onChange={(e) => uploadImage(e)} />
            {media && (
              <div>
                <img
                  className="avatar_pic"
                  src={`https://tgyucrjdklladsjukszn.supabase.co/storage/v1/object/public/Avatars/${media.name}`}
                />
              </div>
            )}
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

          <div className={ProfileCSS.box4}></div>
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
