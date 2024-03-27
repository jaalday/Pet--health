import { Form } from "react-router-dom";


export async function action ({request})  {
    const formData2 = await request.formData2();
    const pet_name = formData2.get("pet_name");
    const medications = formData2.get("medication");
    const vaccinations = formData2.get("vaccinations");
    const surgeries = formData2.get("surgeries");
    const food = formData2.get("food");
    const conditions = formData2.get("conditions");
    const concerns = formData2.get("concerns");
  
    const data ={
      owner_id_history: localStorage.getItem("user_id"),
      pet_name,
      medications,
      vaccinations,
      surgeries,
      food,
      conditions,
      concerns,
    };
    const url = `${import.meta.env.VITE_SOURCE_URL}/profile/history`;
    const addHistory = await fetch(url, {
  
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
    return addHistory
  
  
  }

  const AddHistory = () => {

    return(
        <>

            <Form id="addHistory" method="POST">
              <input type="text" name="pet_name" placeholder="pet name"/>
              <input type="text" name="medications" placeholder="medications"/>
              <input type="text" name="vaccinations" placeholder="vaccines"/>
              <input type="text" name="surgeries" placeholder="surgeries"/>
              <input type="text" name="food" placeholder="food"/>
              <input type="text" name="conditions" placeholder="preexisting conditions"/>
              <input type="text" name="concerns" placeholder="any concerns?"/>
              
              <button type="submit" name="addHistory">submit</button>

            </Form>


        </>
    )
  }






  export default AddHistory