import { useLoaderData, Form } from "react-router-dom";
import supabase from "../config/supabaseClients";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

// export const loader = async() => {
//     try{
//         const{data, error} = await supabase.storage.listBuckets();
//         return data;
//     } catch (error){
//         return error;
//     }
// };

// export const action = async ({request}) => {
//     const formData = await request.formData();
//     const photo = formData('photo');

//     try{
//         console.log("PHOTO:", photo)
//         if (photo instanceof File) {
//             const fileName = photo.name

//             const {data, error} = await supabase.storage
//                 .from("Pictures")
//                 .upload(`test/${fileName}`, photo);
//                 console.log("data or error", data, error)
//         }else {
//             console.log("WRONG")
//         }
//         return null;
//     } catch(error){
//         return error
//     }

// };

const BUCKET_URL =
  "https://tgyucrjdklladsjukszn.supabase.co/storage/v1/object/public/Pictures/";

const Test = () => {
  const [images, setImages] = useState([]);
  const user = localStorage.getItem("user_id");
  console.log("user:", user);

  async function getImages() {
    const { data, error } = await supabase.storage
      .from("Pictures")
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

    const { data, error } = await supabase.storage
      .from("Pictures")
      .upload(user.id + "/" + uuidv4(), file);

    if (data) {
      getImages();
    } else {
      console.log(error);
    }
  }

  // const data = useLoaderData();
  // console.log('loader data', data)

  return (
    <>
      <h1>Test</h1>

      <Form method="POST" encType="multipart/form-data">
        <label htmlFor="photo"> upload a pic</label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={(e) => uploadImage(e)}
        />
        <button type="submit">Submit</button>
      </Form>
      {images.map((image)=> {

        return(
            <div key={BUCKET_URL + user.id + "/" + image.name}>
            <img src={BUCKET_URL + user.id + "/" + image.name }/>
            </div>
        )
      }
      
      
      
      )}

    </>
  );
};

export default Test;
