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
  // const url3 = `${import.meta.env.VITE_SOURCE_URL}/profile/history`;
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

  return addPet;
}

const BUCKET_URL =
  "https://tgyucrjdklladsjukszn.supabase.co/storage/v1/object/public/Avatars/";

const Profile = () => {
  // let user = useUser();
  // const user = localStorage.getItem("user_id")
  const [fetchError, setFetchError] = useState(null);
  const [pets, setPets] = useState("");
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

  console.log(pets);

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
  const [medications, setMedication] = useState("");
  const [surgeries, setSurgeries] = useState("");
  const [food, setFood] = useState("");
  const [conditions, setConditions] = useState("");
  const [vaccinations, setVaccines] = useState("");
  // const [history_id, setId] = useState();
  const [concerns, setConcerns] = useState("");
  // const [pet_id, setPet_id] = useState("");
  const [pet_name, setPet_name] = useState("");
  // const [owner_id, setOwnerId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("history").insert({
      // id: pet.id,
      medications,
      surgeries,
      food,
      conditions,
      vaccinations,
      concerns,
      pet_name,
      id: "7d2a28b4-fecc-4331-b326-b07277a5ebb6",
      owner_id: localStorage.getItem("user_id"),
    });
    console.log(data, error);

    // const url = `${import.meta.env.VITE_SOURCE_URL}/profile/history`;
    // const addHistory = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // }).then((response) => response.json());
    // console.log("History:", addHistory);
    // return addHistory;
  };

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

            {/* <Form id="addHistory"method="POST">
                              <input type="text" name="pet_name" placeholder="pet name"/>
                              <input type="text" name="medications" placeholder="medications"/>
                              <input type="text" name="vaccinations" placeholder="vaccines"/>
                              <input type="text" name="surgeries" placeholder="surgeries"/>
                              <input type="text" name="food" placeholder="food"/>
                              <input type="text" name="conditions" placeholder="preexisting conditions"/>
                              <input type="text" name="concerns" placeholder="any concerns?"/> */}
            {/* <input type="hidden" name="id" value={pet.id}/> */}
            {/* <button name="addHistory" type="submit">add history</button>  
              </Form> */}
          </div>
          <div className={ProfileCSS.box3}>
            {/* {pets.map((pet) => (
                  <> */}
            <form name="addHistory" onSubmit={(e) => handleSubmit(e)}>
              {/* <input
                        
                        type="text"
                        name="id"
                        value={history.id}
                        onClick={() => {
                          history.id;
                        }}
                      /> */}

              <input
              className={ProfileCSS.input2}
                type="text"
                name="pet_name"
                placeholder="pet name"
                onChange={(e) => {
                  setPet_name(e.target.value);
                }}
              />  
              <input
                type="hidden"
                value={history.owner_id}
                // onClick={() => {
                //   history.owner_id;
                // }}
              />
              <br />
              <input
                className={ProfileCSS.input2}
                type="text"
                name="petMedicine"
                placeholder="medications"
                onChange={(e) => setMedication(e.target.value)}
              />
              <br />
              <input
                className={ProfileCSS.input2}
                type="text"
                name="petVaccinations"
                placeholder="vaccines"
                onChange={(e) => setVaccines(e.target.value)}
              />
              <br />
              <input
                 className={ProfileCSS.input2}
                type="text"
                name="petSurgeries"
                placeholder="surgeries"
                onChange={(e) => setSurgeries(e.target.value)}
              />
              <br />
              <input
                className={ProfileCSS.input2}
                type="text"
                name="diet"
                placeholder="diet"
                onChange={(e) => setFood(e.target.value)}
              />
              <br />
              <input
                 className={ProfileCSS.input2}
                type="text"
                name="conditions"
                placeholder="preexisting conditions"
                onChange={(e) => setConditions(e.target.value)}
              />
              <br />
         

              <input
                 className={ProfileCSS.input2}
                type="text"
                name="new concerns"
                placeholder="any new symptoms or concerns?"
                onChange={(e) => setConcerns(e.target.value)}
              />
              
              <br />
              {/* <Link to="/history"> */}
              <button name="addHistory">add</button>
              {/* </Link> */}
            </form>
            {/* </>
                ))} */}
          </div>

          <br />

          <div className={ProfileCSS.box4}>
            <Link to="/petprofile1">
              <button className={ProfileCSS.petButton} type="submit">
               pet profiles
              </button>
            </Link>
            <p>Click here to see your pets profiles</p>
          </div>

          {/* <div className={ProfileCSS.box4}>
          
          </div> */}
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

        <div>
          {/* {pets.map(pet=> <Link to={`/history/${pet.id}`}>{pet.name} History</Link>)} */}
        </div>
      </div>
    </>
  );
};

export default Profile;
