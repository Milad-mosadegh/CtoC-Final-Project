import React,{useState, useEffect} from 'react';
import './../styles.css'
import { Form,Button,Col } from 'react-bootstrap';
import ImageCard from '../../sell/imageCard';
import GET from '../../lib/get';
import FormData from "form-data"
import { IMGPOST, POST } from '../../lib/post';

const MyProfile = (props) => {

    const [profile, setProfile]     = useState({
                                
                                firstName   :"",
                                lastName     :"",
                                email       :"",
                                paypalId    :"",
                                phoneNumber :"",
                                profileImage:"",
                                address     :{
                                                street      :"",
                                                city        :"",
                                                zipCode     :""
                                            }
                         })
    const [auth, setAuth]                   = useState(false)
    const [edit, setEdit]                   = useState(false)
    const [error, setError]                 = useState("")
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
        formData.append("profile", profile)
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
        
        if(e.target.name==="city" || e.target.name==="street" || e.target.name==="zipCode" )
            {setProfile({...profile, address:{...profile.address, [e.target.name]:e.target.value }})
            console.log(profile)}
        else
            setProfile({...profile, [e.target.name]:e.target.value})
        }

    const imageChangeHandler =  ( image, imageBinaryData) => {
        setProfile({...profile, profileImage:image})
        setAvatarChange(true)
    }
   
    
    return ( 
        <div className='shadow-lg p-5'>
            <Form onSubmit={submitHandler}>
            
                <fieldset id="fieldset" disabled="disabled">
                <div className="w-25 ">
                <ImageCard image={image} edit={true} id={"img1"} imageChangeHandler={imageChangeHandler}/>
                
                </div> 
                    <Form.Row >
                        <Form.Group as={Col} controlId="formGridEmail" >
                            <Form.Label >First Name</Form.Label>
                            <Form.Control name="firstName" type="text" value={profile.firstName} onChange={changeHandler}  />
                            <smail className="sText">{error === "firstName" ?
                            <p>Attention! name must consist on 3 or more alphabets</p> 
                            : null}</smail>

                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail" >
                            <Form.Label >Last Name</Form.Label>
                            <Form.Control name="lastName"  type="text" value={profile.lastName} onChange={changeHandler} />
                            <smail className="sText">{error === "lastName" ?
                            <p>Attention! name must consist on 3 or more alphabets</p> 
                            : null}</smail>

                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridAddress1">
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control name="email" type="email" value={profile.email} onChange={changeHandler} />
                            <smail className="sText">{error === "email" ? 
                                <p>Sorry! it is your use id and cannot be changed</p> 
                                : null}</smail>

                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail" >
                            <Form.Label >Phone</Form.Label>
                            <Form.Control name="phoneNumber" type="text" value={profile.phoneNumber} onChange={changeHandler} />
                            <smail className="sText">{error === "phone" ? 
                                <p>Attention! phone number can only consist of digits and more than eight.</p> 
                                : null}</smail>

                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridAddress1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password"  value="*********" onChange={changeHandler} />
                            <smail className="sText">click here to change your password</smail>

                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridAddress1">
                            <Form.Label>Paypal Id</Form.Label>
                            <Form.Control name="paypalId" value={profile.paypalId}onChange={changeHandler} />
                            <smail className="sText">{error === "paypalId" ? 
                                <p>Attention! please provide valid email address.</p> 
                                : null}</smail>
                        </Form.Group>
                    </Form.Row>
                    
                        <Form.Group  controlId="formGridAddress1">
                            <Form.Label>Street</Form.Label>
                            <Form.Control name="street" value={profile.address ? profile.address.street:null} onChange={changeHandler} />
                            <smail className="sText">{error === "street" ? 
                                <p>Attention! street can only consist of alphabets and more than two.</p> 
                                : null}</smail>
                        </Form.Group>
                    
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail" >
                            <Form.Label >City</Form.Label>
                            <Form.Control name="city" type="text" value={profile.address ? profile.address.street:null} onChange={changeHandler} />
                            <smail className="sText">{error === "city" ?
                                <p>Attention! city name can only consist of alphabets and more than two. </p> 
                                : null}</smail>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip" >
                            <Form.Label>Zipcode</Form.Label>
                            <Form.Control name="zipCode" value={profile.address ? profile.address.zipCode:null} onChange={changeHandler}/>
                            <smail className="sText">{error === "zipCode" ? 
                                <p>Attention! Zipcode can only consist of numbers and more than two.</p>
                                : null}</smail>
                        </Form.Group>
                    </Form.Row>

              
                </fieldset>
                {edit ?
                    <div>
                        <Button variant="success" type="submit">
                            Update
                        </Button> 
                        <Button variant="danger" className="ml-1"  onClick={cancelHandler} >
                            Cancel
                        </Button> 
                    </div>
                    :
                    <Button variant="primary"  onClick={editHandler}>
                    Edit
                </Button>
                }
                
            </Form>
        </div>
     );
}
 
export default MyProfile;