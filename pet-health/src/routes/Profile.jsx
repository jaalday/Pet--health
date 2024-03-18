import { Link, Form, redirect, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileCSS from "./Profile.module.css";
import PetProfile1 from "./PetProfile1";
import supabase from "../config/supabaseClients";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import {useUser} from '@supabase/auth-helpers-react';



//adding and creating pet profile data

 export async function action({ request }) {
  const formData = await request.formData();
  const petName = formData.get("petName");
  const age = formData.get("petAge");
  const species = formData.get("species");
  const color = formData.get("color");

  const data = { name: petName, age, species, color };
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


  





  const [userId, setUserId] = useState("");
  const [media, setMedia] = useState([]);



  async function uploadImage(e) {
    let file = e.target.files[0];
    const { data, error } = await supabase.storage
      .from("Avatars")
      .upload(Profile.id + "/", file);

    if (data) {
      getMedia(data);
      console.log("upload data", data);
      setMedia();
    } else {
      console.log(error);
    }
  }

  async function getMedia() {
    const { data, error } = await supabase.storage.from("Avatars").list(user?.id);
    console.log("imagedata", data);
    if (data) {
      setMedia(data);
    } else {
      console.log("error", error);
    }
  }
  useEffect(() => {
    // getUser();
    getMedia();
  }, [userId]);

  return (
    <>
      <div className="profile-card">
        <div className={ProfileCSS.container}>
          <div className={ProfileCSS.box1}>
            <input type="file" onChange={(e) => uploadImage(e)} />
            {media && (
              <div>
                <img
                  src={`https://tgyucrjdklladsjukszn.supabase.co/storage/v1/object/public/Avatars/${media.id}`}
                />
              </div>
            )}

           
       
          </div>

          <div>
            {/* <Form id="image" method="POST">

              <input type="file" accept="image/png, image/jpg" onChange={ (e) => uploadImage(e)}/>
            </Form> */}
          </div>

                {/* <p>current user: {profile.email}</p> */}
        

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
          </div>

          <div className={ProfileCSS.box3}>
            <Link to="/petprofile1">
              pet Name
              <h3>{}</h3>
            </Link>
            {/* <h3>- Pet 2</h3>
                        <h3>- Pet 3</h3> */}
          </div>
        </div>
        <button>
          <Link to="/logout">ahhhhh</Link>
        </button>
        <div></div>
      </div>
    </>
  );
};

export default Profile;
