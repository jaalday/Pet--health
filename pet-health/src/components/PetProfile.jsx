const PetCard = ({ pets }) => {


return (

    <>
    <div className="petCard">
   

    {pets && (
    <div className="pets">
        {pets.map(pet => (
           
         
            <li key={pet.id}>
                <p>name: {pet.name}</p>
                <p>age: {pet.age}</p>
            </li>
            
        ))}
    </div>
)}


    </div>
    </>
)






}

export default PetCard