import { Link, Form } from "react-router-dom"
import { useState, useEffect } from "react"
import ProfileCSS from "./Profile.module.css"


const Profile = ({action}) => {
    const [input1, setInput1] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);

    
    
    
    useEffect(() =>{
        if(input1.lenght > 1) return;
        const newImage = [];
        input1.forEach(image => newImage.push(URL.createObjectURL(image)));
        setImageURLs(newImage);
    }, [input1]);
    
    const onImageChange = (e) =>{
        setInput1([...e.target.files]);
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        action(input1);
    }
    
    async function action({request}){
        const formData = await request.formData();
        const petName = formData.get("petName");
        const age = formData.get("age");
        const species = formData.get("species");
        const color = formData.get("color");


        const data = {petName, age, species, color};
        



    }
    

  

    return(
    <>
    <div className="profile-card">
        
        
        <div className={ProfileCSS.container}>
            
                <div className={ProfileCSS.box1}>
                    <Form onSubmit = {handleSubmit}>
                    <label>
                        <br/>
                        {imageURLs.map(imageSrc => <img className="img"  src={imageSrc}/>)}
                        <input type="file" multiple accept="image/*" onChange={onImageChange} name="image1"/>
                        
                    </label>
                    

                    </Form>
                    </div>

                    <div className={ProfileCSS.box2}>
                    <Form id="addPet">
                       <label >
                        <input className={ProfileCSS.input1}type="text" name="petName" placeholder="Pet Name"/>
                        <br/>
                        <input className={ProfileCSS.input1}type="text" name="petAge" placeholder="Age"/>
                        <br/>
                        <input className={ProfileCSS.input1}type="text" name="species" placeholder="Species"/>
                        <br/>
                        <input className={ProfileCSS.input1}type="text" name="color" placeholder="Color"/>


                       </label>
                       <button type="submit" name="addAnimal" className={ProfileCSS.addAnimal}>Add Animal</button>

                    </Form>
                    </div>
            
                    <div className={ProfileCSS.box3}>
                        
                        <h3>- Pet 1</h3>
                        <h3>- Pet 2</h3>
                        <h3>- Pet 3</h3>
                    </div>
                </div>

              
        </div>
                </>

)
    }


export default Profile