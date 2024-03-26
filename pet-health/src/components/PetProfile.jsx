import { useEffect, useState } from "react";
import supabase from "../config/supabaseClients";
import { Link } from "react-router-dom";
import PetCardCSS from "./PetCard.module.css";
import { v4 as uuidv4 } from "uuid";

const BUCKET_URL =
  "https://tgyucrjdklladsjukszn.supabase.co/storage/v1/object/public/pets/";
const user = localStorage.getItem("user_id");

// eslint-disable-next-line react/prop-types
const PetImages = ({ petId }) => {
  const userId = localStorage.getItem("user_id");
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getImages(petId) {
      const { data, error } = await supabase.storage
        .from("pets")
        .list(userId + "/" + petId + "/", {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });
      if (data !== null) {
        setImages(data);
        return data;
      } else {
        console.log(error);
      }
    }
    getImages(petId);
  }, [petId]);
console.log("images", images)
  return (
    <div >
      {images.map((image) => {
        console.log("image", image)
        if(image.name === ".emptyFolderPlaceholder")return null;
        

        return (
          
         
          <img
            key={image.name}
            className={PetCardCSS.petImage}
            src={BUCKET_URL + userId + "/" + petId + "/" + image.name}
          />
        );
      })}
    </div>
  );
};

const PetCard = () => {
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
  }, [user]);

  const userId = localStorage.getItem("user_id");

  async function uploadImage(e, petId) {
    let file = e.target.files[0];
    const { data, error } = await supabase.storage
      .from("pets")
      .upload(`${userId}/${petId}/${uuidv4()}`, file);

    if (data) {
      // getImages(petId);
    } else {
      console.log(error);
    }
  }
  // ))

  // async function getMedia() {
  //   const { data, error } = await supabase.storage.from("pets").list(user?.id);
  //   console.log("imagedata", data);
  //   if (data) {
  //     setMedia(data);
  //   } else {
  //     console.log("error", error);
  //   }
  // }

  const handleDelete = async ({ petId }) => {
    const { data, error } = await supabase
      .from("pets")
      .delete()
      .eq("id", petId);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  };

  const fileKey = 'BUCKET_URL + userId + "/" + petId + "/" + image.name';

  const deleteImage = async () => {
    const { data, error } = await supabase.from("pets").delete(fileKey);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  };

  return (
    <>
      <div>
        {fetchError && <p>{fetchError}</p>}
        {pets && (
          <div className="pets">
            {pets.map((pet) => (
              <div key={pet.id}>
                <div className={PetCardCSS.petCard1}>
                  <h1>{pet.name}</h1>
                  <form>
                    <label htmlFor="photo"></label>
                    <input
                      name="photo"
                      accept="image/*"
                      type="file"
                      onChange={(e) => uploadImage(e, pet.id)}
                    />
                  </form>
                  <div>
                    <PetImages petId={pet.id} />
                  </div>

                  {/* <p>name: {pet.name}</p> */}
                  <div className={PetCardCSS.petInfo}>
                    <p>age: {pet.age}</p>
                    <p>color: {pet.color}</p>
                    <p>species: {pet.species}</p>
                  </div>

                  <Link to={"/history"}>
                    <button type="submit" className={PetCardCSS.button}>
                      history
                    </button>
                  </Link>
                  <button
                    className={PetCardCSS.delete}
                    type="submit"
                    onClick={() => handleDelete({ petId: pet.id })}
                  >
                    X
                  </button>
                  <div>
                    <button type="submit" onClick={(e) => deleteImage(e)}>
                      delete pic
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PetCard;
