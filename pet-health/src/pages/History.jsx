import { useState, useEffect,  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClients";
// import PetProfile1 from "../routes/PetProfile1";
import PetCardCSS from '../components/PetCard.module.css'
import { Form } from "react-router-dom";



export async function action ({request}){
  const formData = await request.formData();
  const medication = formData.get('petMedicine');
  const vaccinations = formData.get("petVaccinations");
  const surgeries = formData.get("surgeries");
  const food = formData.get("diet");
  const conditions = formData.get("conditions");


  const data = {
    id: localStorage.getItem("user_id"),
    medication, vaccinations, surgeries, food, conditions
  }
  const url = `${import.meta.env.VITE_SOURCE_URL}/history{id}`;
  const addHistory = await fetch(url, {
    method: "PUT",
    headers:{
      "content-Type": "application/json",
    }
  }).then((response) => response.json());
  console.log("history data", addHistory );
  return data
}





const History = () => {

  async function getPetsId(pets) {
    const data = { pets };
    const url = `${import.meta.env.VITE_SOURCE_URL}/pets${id}`;
    const getPetsId = await fetch(url, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    }).then((response) => response.json());
    console.log("pet Data: ", getPetsId);
    console.log(data);
    return getPetsId;
  }
  const { id } = useParams();




  const [fetchError, setFetchError] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from("history")
        .select()
        // .eq("id", id)
        // .single();
      console.log("is this undefined???", id);

      if (error) {
        setFetchError("could not fetch history info");
        setHistory(null);
        console.log(error);
        // navigate("/petProfile1");
      }
      if (data) {
        setHistory(data);
        setFetchError(null);
      }
    };
    fetchHistory();
  }, [id]);

  useEffect(()=>{
    getPetsId();
  },[]);

  return (
    <>
      {fetchError && <p>{fetchError}</p>}
      {history && (
        <div className="pets">
       
          {history.map((history) => (
            <>
              {/* <li key={history.id}> */}
                <div className={PetCardCSS.petCard}>
                  <h1>{history.pet_name}</h1>
                  <p>medication: {history.medication}</p>
                  <p>vaccinations: {history.vaccinations}</p>
                  <p>surgeries: {history.surgeries}</p>
                  <p>diet: {history.food}</p>
                  <p>conditions:{history.conditions}</p>
                  <br/>
                  <div>
      <Form id="addHistory" method="PUT">
        <input type="text" name="petMedicine" placeholder="medicine"/>
        <input type="text" name="petVaccinations" placeholder="vaccines"/>
        <input type="text" name="petSurgeries" placeholder="surgeries"/>
        <input type="text" name="diet" placeholder="food"/>
        <input type="text" name="conditions" placeholder="preexisting conditions"/>
        
            <button type="submit" name="addHistory">Update</button>
      </Form>
      </div>
                </div>
              {/* </li> */}
            </>
            
          ))}
          
        </div>
      )}

    </>
  );
};

export default History;
