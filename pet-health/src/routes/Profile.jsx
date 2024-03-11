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
                </div>
        </div>
                </>

)
    }


export default Profile