import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClients";
// import PetProfile1 from "../routes/PetProfile1";
import PetCardCSS from "../components/PetCard.module.css";
import { Form } from "react-router-dom";

const History = () => {
  // const handleSubmit = async (e) => {e.preventDefault()
  //   const formData = new FormData ;
  //   const medication = formData.get("petMedicine");
  //   const vaccinations = formData.get("petVaccinations");
  //   const surgeries = formData.get("surgeries");
  //   const food = formData.get("diet");
  //   const conditions = formData.get("conditions");
  //   const pet_name = formData.get("pet_name");
  //   const id = formData.get("pet_id");
  //   console.log({ id });
  //   console.log({ vaccinations });
  //   console.log({ food });
  //   console.log({ conditions });
  //   const data = {
  //     id,
  //     medication,
  //     vaccinations,
  //     surgeries,
  //     food,
  //     conditions,
  //     pet_name,
  //   };
  //   console.log({ data });
  //   const url = `${import.meta.env.VITE_SOURCE_URL}/history/put`;
  //   const addHistory = await fetch(url, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   }).then((response) => response.json());

  //   console.log("history data", addHistory);
  //   return addHistory;
  // };
  async function getPetsId() {
    const url = `${import.meta.env.VITE_SOURCE_URL}/pets${id}`;
    const getPetsId = await fetch(url, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    }).then((response) => response.json());
    console.log("pet Data: ", getPetsId);

    return getPetsId;
  }

  // async function getHistory() {
  //   const data = {};
  //   const url = `http://localhost:8000/history`;
  //   const getHistory = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "content-Type": "application/json",
  //     },
  //     // body: JSON.stringify(data),
  //   }).then((response) => response.json());
  //   console.log("health-data", data);
  //   return getHistory;
  // }

  const { id } = useParams();

  const [fetchError, setFetchError] = useState([]);
  const [history, setHistory] = useState([]);

  const [medication, setMedication] = useState("");
  const [surgeries, setSurgeries] = useState("");
  const [food, setFood] = useState("");
  const [conditions, setConditions] = useState("");
  const [vaccinations, setVaccines] = useState("");
  const [history_id, setId] = useState("");
  // const [pet_name, setPet_name] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("history")
      .update({
        medication,
        surgeries,
        food,
        conditions,
        vaccinations,
      })
      .eq("id", history_id);

    if (error) {
      ("error");
    }
    if (data) {
      console.log(data);
    }
  };

  //updating supabase data straight from the front end

  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await supabase.from("history").select();
      // .eq("id", id)
      // .single();

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

  useEffect(() => {
    // getHistory();
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
                <h3>Id: {history.id}</h3>
                <h3>medication: {history.medication}</h3>
                <h3>vaccinations: {history.vaccinations}</h3>
                <h3>surgeries: {history.surgeries}</h3>
                <h3>diet: {history.food}</h3>
                <h3>conditions: {history.conditions}</h3>
                <br />
                <div className={PetCardCSS.inputBox}>
                  <Form id="addHistory" method="PUT" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="id"
                      placeholder="pet id"
                      onChange={(e) => setId(e.target.value)}
                    />
                    <input
                      type="text"
                      name="petMedicine"
                      placeholder="medicine"
                      onChange={(e) => setMedication(e.target.value)}
                    />
                    <input
                      type="text"
                      name="petVaccinations"
                      placeholder="vaccines"
                      onChange={(e) => setVaccines(e.target.value)}
                    />

                    <input
                      type="text"
                      name="petSurgeries"
                      placeholder="surgeries"
                      onChange={(e) => setSurgeries(e.target.value)}
                    />
                    <input
                      type="text"
                      name="diet"
                      placeholder="food"
                      onChange={(e) => setFood(e.target.value)}
                    />
                    <input
                      type="text"
                      name="conditions"
                      placeholder="preexisting conditions"
                      onChange={(e) => setConditions(e.target.value)}
                    />
                    <input
                      type="hidden"
                      // name="pet_name"
                      // placeholder="pet name"
                      // onChange={(e) => setPet_name(e.target.value)}
                    />
                    <br />
                    <button name="addHistory">Update</button>
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
