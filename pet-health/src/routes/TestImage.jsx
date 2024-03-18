import {useUser} from '@supabase/auth-helpers-react';
import supabase from '../config/supabaseClients';
import { useState, useEffect } from 'react';
import { Form } from 'react-router-dom';







const TestPage = () => {
    const[images, setImages] = useState('')
    // const [media, setMedia] = useState([]);

    const user = useUser

    async function getImages(){
        const {data, error} = await supabase.storage.from('Avatars').list(user?.id + "/")
        
        if(data !== null){
            setImages(data);
        }else {
            alert("error loading image")
            console.log(error)
        }

    }
    useEffect(() =>{
        if(user) {
            getImages();
        }
    }, [user])
async function uploadImage(e){
    let file = e.target.files[0]

    const {data, error} = await supabase.storage.from('Avatars').upload(user.id + "/", file)
    if (data) {
        getImages();
    } else {
        console.log(error)
    }
}   





return(
    <>
    <h1 className='login-card'>TEST PAGE</h1>
    <h2>why isnt this working</h2>
    <Form>
    <input type="file" onChange={(e) => uploadImage(e)} />
            {images && (
              <div>
                <img
                  src={`https://tgyucrjdklladsjukszn.supabase.co/storage/v1/object/public/${images.fullPath}`}
                />
              </div>
            )}


    </Form>
    </>
)

}

export default TestPage