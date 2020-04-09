import React,{useState, useEffect} from 'react';
import './../styles.css'
import { Form,Button,Col } from 'react-bootstrap';
import ImageCard from '../../sell/imageCard';
import GET from '../../lib/get';
import FormData from "form-data"
import { IMGPOST, POST } from '../../lib/post';
import ProfileData from './profile';

const MyProfile = (props) => {

    const [profile, setProfile]     = useState({
                                
                                firstName   :"",
                                lastName     :"",
                                email       :"",
                                paypalId    :"",
                                phoneNumber :"",
                                profileImage:"",
                                street      :"",
                                city        :"",
                                zipCode     :""
                                            
                         })
    const [auth, setAuth]                   = useState(false)
    const [edit, setEdit]                   = useState(false)
    const [avatarChanged, setAvatarChange]  = useState(false)
    const [image, setImage]                 = useState("")

    useEffect(()=>{

        const getData =async ()=>{

            let response =  await GET("/api/account/profile")

            if(response.data)  {
                if(response.data.status==="success") {
                    setAuth(true)
                    setProfile(response.data.data)
                    console.log("ig eti n profile,", response.data)
                         }
                    else setAuth(false)

            }
                else {
                localStorage.removeItem("c2c-token")
                props.history.push("/signin") 
                    }          
        }

     getData();  
     console.log("image in profile",image)

        
    },[])

    const submitHandler =async (e) =>{
        e.preventDefault();

        if(avatarChanged) {
            const config = {
                headers:{
                    'x-auth-token':localStorage.getItem('c2c-token'),
                    'content-type':'multipart/form-data'
                    }}
                    
        const formData = new FormData();
        console.log("image in submit", image, profile)
        formData.append("file", profile.profileImage)
        Object.keys(profile).forEach(key=>{if(key!=="profileImage") formData.append(key, profile[key])})
        let response = await IMGPOST("/api/account/profile",formData, config)

            if((response.data) && (response.data.status==="success")){
                alert("You have successfully update profile")
                setEdit(false)
                setAvatarChange(false)
                document.getElementById("fieldset").disabled=true
            }
            else alert("An error occured while you were updating records, please try again")            
        
        return 
        }

        const config={
            headers:{
                'x-auth-token':localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
                }
            }
        let response =await POST("/api/account/profile",profile, config)
        if((response.data) && (response.data.status==="success")){
                alert("You have successfully update Your records")
                setEdit(false)
                document.getElementById("fieldset").disabled=true

            }
            else alert("An error occured while you were updating records, please try again") 
            
    }

    const editHandler = (e) => {
        document.getElementById("fieldset").disabled=false
        setEdit(true)
    }
    const cancelHandler =() =>{
        document.getElementById("fieldset").disabled=true
        setEdit(false)
    }
    
    const changeHandler=(e)=>{

        const regexAlphabet = new RegExp(/^[a-zA-ZäöüÄÖÜß]*$/)
        const regexPaypalId= new RegExp(/^([a-zA-Z0-9_\-.äöüÄÖÜß_]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
        const regexNumber = new RegExp(/^[0-9]*$/)
        const regexAlphaNumber = new RegExp(/[a-zA-Z0-9äöüÄÖÜß]/)
       
        setProfile({...profile, [e.target.name]:e.target.value})

        }

    const imageChangeHandler =  ( image) => {
        setProfile({...profile, profileImage:image})
        setAvatarChange(true)
    }
   
    
    return ( 
        <div className='shadow-lg p-5'>
          <ProfileData 
              submitHandler={submitHandler}
              imageChangeHandler={imageChangeHandler}
              changeHandler={changeHandler}
              cancelHandler={cancelHandler}
              editHandler={editHandler}
              profile={profile}
              edit={edit}
          />  
        </div>
     );
}
 
export default MyProfile;