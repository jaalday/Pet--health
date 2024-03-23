import { useEffect, useState } from "react";
import supabase from "../config/supabaseClients";
import { Link } from "react-router-dom";
import PetCardCSS from "./PetCard.module.css";
import { useUser } from "@supabase/auth-helpers-react";
import { v4 as uuidv4 } from "uuid";
import { Form } from "react-router-dom";

const BUCKET_URL = "https://tgyucrjdklladsjukszn.supabase.co/storage/v1/object/public/pets/";
const user= localStorage.getItem("user_id")

const PetCard = () => {
  // const pet = props.pet;
  const [fetchError, setFetchError] = useState(null);
  const [pets, setPets] = useState(null);
  // const owner_id = localStorage.getItem("user_id");

  console.log("is this working", user);

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

  //
  const userId = localStorage.getItem("user_id");
  console.log(userId)

  const [images, setImages] = useState([]);
  // const user = useUser;

  
  
  
  async function getImages() {
    const { data, error } = await supabase.storage
      .from("pets")
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
      
    }
  }, [user]);
  
  
  
  
  
  async function uploadImage(e) {
    let file = e.target.files[0];
    // const fileName = file.name;
    const { data, error } = await supabase
      .storage
      .from("pets")
      .upload(user.id + "/" + uuidv4(), file);

    if (data) {
      // setImages(data);
      console.log("upload data", data);
      getImages();
    } else {
      console.log(error);
    }
  }
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
                 <Form method="POST" encType="multipart/form-data">
                  <label htmlFor="photo"></label>
                  <input name="photo" accept="image/*" type="file" onChange={(e) => uploadImage(e)} />
                  {images.length > 0 &&
                    images.map((image) => {
                      return (
                        <div key={BUCKET_URL + user.id + "/" + image.name}>
                        <img className={PetCardCSS.petImage}
                         
                          src={BUCKET_URL + user.id + "/" + image.name}
                        />
                      </div>
                    
                        
                      );
                      
                    })}
                    </Form>
                   
                    
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
                    <img
                      className={PetCardCSS.deleteimg}
                      // src="https://st2.depositphotos.com/5266903/8456/v/950/depositphotos_84567162-stock-illustration-trash-can-flat-white-color.jpg"
                    />
                  </button>
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
