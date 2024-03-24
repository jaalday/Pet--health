import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClients";
// import PetProfile1 from "../routes/PetProfile1";
import PetCardCSS from "../components/PetCard.module.css";
import { Form, Link } from "react-router-dom";

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
  // const [history_id, setId] = useState();
  const [concerns, setConcerns] = useState("");
  // const [pet_name, setPet_name] = useState("");

  const handleSubmit = async ({historyId}) => {
    // e.preventDefault();

    const { data, error } = await supabase
      .from("history")
      // .select(history.id)
      .update({
        medication,
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

  //updating supabase data straight from the front end

  /// trying to print only the data that relates to the pets that i own

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

                  <h3>medication: {history.medication}</h3>

                  <h3>vaccinations: {history.vaccinations}</h3>
                  <h3>surgeries: {history.surgeries}</h3>
                  <h3>diet: {history.food}</h3>
                  <h3>conditions: {history.conditions}</h3>
                  <h3>Concerns: {history.concerns}</h3>
                  <br />
                </div>
                <div className={PetCardCSS.inputBox}>
                  <Form method="PUT" onSubmit={() => handleSubmit({historyId: history.id})}>
                    <input
                      // className={PetCardCSS.inputSquares}
                      type="hidden"
                      name="id"
                      value={history.id}
                      onClick={() => {
                        history.id
                      }}
                    />

                    <input type="hidden" value={history.owner_id} onClick={() =>{history.owner_history_id}}/>
                    <br />
                    <input
                      className={PetCardCSS.inputSquares}
                      type="text"
                      name="petMedicine"
                      placeholder="medicine"
                      onChange={(e) => setMedication(e.target.value)}
                    />
                    <br />
                    <input
                      className={PetCardCSS.inputSquares}
                      type="text"
                      name="petVaccinations"
                      placeholder="vaccines"
                      onChange={(e) => setVaccines(e.target.value)}
                    />
                    <br />
                    <input
                      className={PetCardCSS.inputSquares}
                      type="text"
                      name="petSurgeries"
                      placeholder="surgeries"
                      onChange={(e) => setSurgeries(e.target.value)}
                    />
                    <br />
                    <input
                      className={PetCardCSS.inputSquares}
                      type="text"
                      name="diet"
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
                      // name="pet_name"
                      // placeholder="pet name"
                      // onChange={(e) => setPet_name(e.target.value)}
                    />
                    <br />
                    <input
                      className={PetCardCSS.inputConcerns}
                      type="text"
                      name="new concerns"
                      placeholder="any new symptoms or concerns?"
                      onChange={(e) => setConcerns(e.target.value)}
                    />
                    <br />
                    {/* <Link to="/history"> */}
                    <button name="addHistory">Update</button>
                    {/* </Link> */}
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
