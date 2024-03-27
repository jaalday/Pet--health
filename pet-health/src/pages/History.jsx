import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../config/supabaseClients";
import PetCardCSS from "../components/PetCard.module.css";
import { Form } from "react-router-dom";

const History = () => {
  async function getPetsId() {
    const url = `${import.meta.env.VITE_SOURCE_URL}/pets${id}`;
    const getPetsId = await fetch(url, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    }).then((response) => response.json());
    return getPetsId;
  }

  const user = localStorage.getItem("user_id");

  const [pets, setPets] = useState(null);
  useEffect(() => {
    const fetchPets = async () => {
      const { data, error } = await supabase
        .from("pets")
        .select("id")
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
    fetchPets();
  }, []);



  const { id } = useParams();

  const [fetchError, setFetchError] = useState([]);
  const [history, setHistory] = useState([]);

  const [medications, setMedication] = useState("");
  const [surgeries, setSurgeries] = useState("");
  const [food, setFood] = useState("");
  const [conditions, setConditions] = useState("");
  const [vaccinations, setVaccines] = useState("");

  const [concerns, setConcerns] = useState("");
 

  const handleSubmit = async ({ historyId }) => {

    const { data, error } = await supabase
      .from("history")
      .update({
        medications,
        surgeries,
        food,
        conditions,
        vaccinations,
        concerns,
      })
      .eq("id", historyId);

    if (error) {
      ("error");
    }
    if (data) {
      console.log(data);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const owner_id = localStorage.getItem("user_id");
      const { data, error } = await supabase
        .from("history")
        .select()
        .eq("owner_id", owner_id);
      // .single();

      if (error) {
        setFetchError("could not fetch history info");
        setHistory(null);
        console.log(error);
      }
      if (data) {
        setHistory(data);
        setFetchError(null);
      }
    };
    fetchHistory();
  }, [id]);

  useEffect(() => {
    getPetsId();
  }, []);

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
                <div className={PetCardCSS.medInfo}>
                  {/* <h3>Id: {history.id}</h3> */}

                  <h3>medication: {history.medications}</h3>

                  <h3>vaccinations: {history.vaccinations}</h3>
                  <h3>surgeries: {history.surgeries}</h3>
                  <h3>diet: {history.food}</h3>
                  <h3>conditions: {history.conditions}</h3>
                  <h3>Concerns: {history.concerns}</h3>
                  <br />
                </div>
                <div className={PetCardCSS.inputBox}>
                  <Form
                    method="PUT"
                    onSubmit={() => handleSubmit({ historyId: history.id })}
                     
                   
                  >
                    <input
                      // className={PetCardCSS.inputSquares}
                      type="hidden"
                      name="id"
                      value={history.id}
                      onClick={() => {
                        history.id;
                      }}
                    />

                    <input
                      type="hidden"
                      value={history.owner_id}
                      onClick={() => {
                        history.owner_id;
                      }}
                    />
                    <br />
                    <input
                      className={PetCardCSS.inputSquares}
                      type="text"
                      name="medications"
                      placeholder="medicine"
                      onChange={(e) => setMedication(e.target.value)}
                    />
                    <br />
                    <input
                      className={PetCardCSS.inputSquares}
                      type="text"
                      name="vaccinations"
                      placeholder="vaccines"
                      onChange={(e) => setVaccines(e.target.value)}
                    />
                    <br />
                    <input
                      className={PetCardCSS.inputSquares}
                      type="text"
                      name="surgeries"
                      placeholder="surgeries"
                      onChange={(e) => setSurgeries(e.target.value)}
                    />
                    <br />
                    <input
                      className={PetCardCSS.inputSquares}
                      type="text"
                      name="food"
                      placeholder="food"
                      onChange={(e) => setFood(e.target.value)}
                    />
                    <br />
                    <input
                      className={PetCardCSS.inputSquares}
                      type="text"
                      name="conditions"
                      placeholder="preexisting conditions"
                      onChange={(e) => setConditions(e.target.value)}
                    />
                    <br />
                    <input
                      type="hidden"
                      name="pet_name"
                      // placeholder="pet name"
                      // onChange={(e) => setPet_name(e.target.value)}
                    />
                    <br />
                    <input
                      className={PetCardCSS.inputConcerns}
                      type="text"
                      name="concerns"
                      placeholder="any new symptoms or concerns?"
                      onChange={(e) => setConcerns(e.target.value)}
                    />
                    <br />
                   
                    <button name="addHistory">Update</button>
                  
                  </Form>
                </div>
                
              </div>
            
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default History;
