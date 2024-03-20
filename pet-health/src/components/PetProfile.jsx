import { useEffect, useState } from "react";
import supabase from "../config/supabaseClients";
import { Link } from "react-router-dom";
import PetCardCSS from "./PetCard.module.css";
import { useUser } from "@supabase/auth-helpers-react";

const PetCard = () => {
  const [fetchError, setFetchError] = useState(null);
  const [pets, setPets] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      const { data, error } = await supabase.from("pets").select();

      if (error) {
        setFetchError("could not fetch pets info");
        setPets(null);
        console.log(error);
      }
      if (data) {
        setPets(data);
        setFetchError(null);
      }
    };
    fetchPets();
  }, []);

  //
  const userId = localStorage.getItem("user_id");
  
  const [media, setMedia] = useState([]);
  const user = useUser;

  async function uploadImage(e) {
    let file = e.target.files[0];
    const fileName = file.name;
    const { data, error } = await supabase.storage
      .from("pets")
      .upload(userId + "/" + fileName, file);

    if (data) {
      setMedia(data);
      console.log("upload data", data);
      getMedia();
    } else {
      console.log(error);
    }
  }
  async function getMedia() {
    const { data, error } = await supabase.storage.from("pets").list(user?.id);
    console.log("imagedata", data);
    if (data) {
      setMedia(data);
    } else {
      console.log("error", error);
    }
  }

  return (
    <>
      <div>
        {fetchError && <p>{fetchError}</p>}
        {pets && (
          <div className="pets">
            {pets.map((pet) => (
              <>
                {/* <li key={pet.id}> */}
                <div className={PetCardCSS.petCard}>
                  <h1>{pet.name}</h1>
                  <input type="file" onChange={(e) => uploadImage(e)} />
                  {media.length > 0 &&
                    media.map((media) => {
                      return (
                        <>
                          <div>
                            <img
                              className="avatar_pic"
                              src={`https://tgyucrjdklladsjukszn.supabase.co/storage/v1/object/public/pets/${media.id}`}
                            />
                          </div>
                        </>
                      );
                    })}
                  <p>name: {pet.name}</p>
                  <p>age: {pet.age}</p>
                  <p>color: {pet.color}</p>
                  <p>species: {pet.species}</p>

                  <Link to={"/history"}>
                    <button type="submit" className={PetCardCSS.button}>
                      history
                    </button>
                  </Link>
                </div>
              </>
            ))}
          </div>
        )}

        <div>
          {/* <Link to={'/' + pets.id}>

                </Link> */}
        </div>
      </div>
    </>
  );
};

export default PetCard;
