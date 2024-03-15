import { Link, Form, useActionData, redirect, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileCSS from "./Profile.module.css";
import PetProfile1 from "./PetProfile1";
import supabase from "../config/supabaseClients";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

export async function action({ request }) {
  const formData = await request.formData();
  const petName = formData.get("petName");
  const age = formData.get("petAge");
  const species = formData.get("species");
  const color = formData.get("color");
  // const owner_id = formData.get("owner_id")

  const data = { name: petName, age, species, color };
  const url = `${import.meta.env.VITE_SOURCE_URL}/profile`;
  const addPet = await fetch(url, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
  console.log("data: ", addPet);

  return redirect("/petprofile1");
}



const Profile = () => {












  const [input1, setInput1] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if (input1.lenght > 1) return;
    const newImage = [];
    input1.forEach((image) => newImage.push(URL.createObjectURL(image)));
    setImageURLs(newImage);
  }, [input1]);

  const onImageChange = (e) => {
    setInput1([...e.target.files]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    action(input1);
  };

  return (
    <>
      <div className="profile-card">
        <div className={ProfileCSS.container}>
          <div className={ProfileCSS.box1}>
            <form onSubmit={handleSubmit}>
              <label>
                Choose Image
                <br />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={onImageChange}
                  name="image1"
                />
                {imageURLs.map((imageSrc) => (
                  <img className="img" src={imageSrc} />
                ))}
              </label>
            </form>
          </div>

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
              <h3>{}</h3>
            </Link>
            {/* <h3>- Pet 2</h3>
                        <h3>- Pet 3</h3> */}
          </div>
        </div>
        <button>
            <Link to="/logout">ahhhhh</Link>
        </button>
        <div>
      </div>
      </div>
    </>
  );
};

export default Profile;
