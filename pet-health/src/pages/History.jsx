import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClients";
// import PetProfile1 from "../routes/PetProfile1";
import PetCardCSS from '../components/PetCard.module.css'

const History = () => {
  const { id } = useParams();
  // const navigate = useNavigate();

    // const [medication, setMedication] = useState('')
    // const [pet_name, setPet_Name] = useState('')
    // const [surgeries, setSurgeries] = useState('')
    // const [food, setFood] = useState('')
    // const [underlying_conditions, setUnderlying_conditions] = useState('')
    // const [vaccinations, setVaccinations] = useState('')

  //   useEffect(() => {
  //     const fetchHistory = async () => {
  //       const { data, error } = await supabase
  //         .from("history")
  //         .select()
  //         .eq("id", id)
  //         .single();

  //       if (error) {
  //         navigate("/", {replace: true});
  //       }
  //       if (data) {

  //       }
  //     }
  //     fetchHistory()
  //   }, [id, navigate ]);

  //   return <h2>update = {id}</h2>;
  // };

  const [fetchError, setFetchError] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from("history")
        .select()
        // .eq("id", id)
        // .single();
      console.log(id);

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
