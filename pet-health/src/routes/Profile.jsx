import { Link, Form } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileCSS from "./Profile.module.css";
import supabase from "../config/supabaseClients";
import { v4 as uuidv4 } from "uuid";
import Logout from "./Logout";

export async function action({ request }) {
  const formData = await request.formData();
  const petName = formData.get("petName");
  const age = formData.get("petAge");
  const species = formData.get("species");
  const color = formData.get("color");
  const empty_pic = formData.get("empty_pic");

  const data = {
    owner_id: localStorage.getItem("user_id"),
    name: petName,
    age,
    species,
    color,
    empty_pic,
  };
  const url = `${import.meta.env.VITE_SOURCE_URL}/profile`;

  const addPet = await fetch(url, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
  return addPet;
}

const BUCKET_URL =
  "https://tgyucrjdklladsjukszn.supabase.co/storage/v1/object/public/Avatars/";

const Profile = () => {
  const [fetchError, setFetchError] = useState(null);
  const [pets, setPets] = useState("");
  const [isCurrentPetsLength, setIsCurrentPetsLength] = useState(
    pets.length ?? 1
  );

  const fetchPets = async () => {
    const { data, error } = await supabase
      .from("pets")
      .select()
      .eq("owner_id", user);

    if (error) {
      setFetchError("could not fetch pets info");
      setPets(null);
    }
    if (data) {
      setPets(data);
      setFetchError(null);
    }
  };

  const callFetchPets = async () =>
    await fetchPets().catch(() => console.log("error"));

  useEffect(() => {
    if (pets.length === isCurrentPetsLength || isCurrentPetsLength === 0)
      return undefined;
    if (pets.length !== isCurrentPetsLength) {
      callFetchPets();
    }
  }, [isCurrentPetsLength, pets]);

  useEffect(() => {
    if (!pets) {
      callFetchPets();
    }
  }, []);

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
    console.log(data);
    return getUser;
  }

  const [images, setImages] = useState([]);
  const user = localStorage.getItem("user_id");

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
      getUser();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const pet_name = formData.get("pet_name");
    const medications = formData.get("medications");
    const vaccinations = formData.get("vaccinations");
    const surgeries = formData.get("surgeries");
    const food = formData.get("food");
    const conditions = formData.get("conditions");
    const concerns = formData.get("concerns");
    const currentPet = pets.find((pet) => pet.name === pet_name);
    await supabase.from("history").insert({
      medications,
      surgeries,
      food,
      conditions,
      vaccinations,
      concerns,
      id: currentPet.id,
      pet_name,
      owner_id: localStorage.getItem("user_id"),
    });
    alert(`${pet_name} has been added!`);
    setIsCurrentPetsLength(0);
    document.addPet.reset();
  };

  return (
    <>
      <div className="profile-card">
        <div className={ProfileCSS.container}>
          <div className={ProfileCSS.box1}>
            <Form method="POST" encType="multipart/form-data" key={user.id}>
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

          <div className={ProfileCSS.box2}>
            <Form id="addPet" name="addPet" method="POST">
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
                <input type="hidden" name="empty_pic" />
              </label>
              <button
                type="submit"
                name="addAnimal"
                className={ProfileCSS.addAnimal}
                onClick={() => setIsCurrentPetsLength(pets.length + 1)}
              >
                Add Animal
              </button>
            </Form>

            <button onClick={(e) => Logout()} className={ProfileCSS.logout}>
              log out
            </button>
          </div>

          {pets.length && pets.length === isCurrentPetsLength && (
            <div className={ProfileCSS.box3}>
              <Form name="addHistory" onSubmit={(e) => handleSubmit(e)}>
                <input
                  className={ProfileCSS.input2}
                  type="text"
                  name="pet_name"
                  placeholder="pet name"
                />
                <input type="hidden" value={history.owner_id} />
                <br />
                <input
                  className={ProfileCSS.input2}
                  type="text"
                  name="medications"
                  placeholder="medications"
                />
                <br />
                <input
                  className={ProfileCSS.input2}
                  type="text"
                  name="vaccinations"
                  placeholder="vaccines"
                />
                <br />
                <input
                  className={ProfileCSS.input2}
                  type="text"
                  name="surgeries"
                  placeholder="surgeries"
                />
                <br />
                <input
                  className={ProfileCSS.input2}
                  type="text"
                  name="food"
                  placeholder="diet"
                />
                <br />
                <input
                  className={ProfileCSS.input2}
                  type="text"
                  name="conditions"
                  placeholder="preexisting conditions"
                />
                <br />

                <input
                  className={ProfileCSS.input2}
                  type="text"
                  name="new concerns"
                  placeholder="any new symptoms or concerns?"
                />

                <br />
                <button className={ProfileCSS.addAnimal2} name="addHistory">
                  Add
                </button>
              </Form>
            </div>
          )}

          <br />

          <div className={ProfileCSS.box4}>
            <Link to="/petprofile1">
              <button className={ProfileCSS.petButton} type="submit">
                pet profiles
              </button>
            </Link>
            <p className={ProfileCSS.p}>
              Click here to see your
              <br /> pets profiles
            </p>
          </div>

          <div className={ProfileCSS.box5}>
            <img
              className={ProfileCSS.imgBanner}
              src="https://www.vetspetclinic.com/userfiles/images/banner/leading-spaying-and-neutering-5.jpg"
            />
          
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
