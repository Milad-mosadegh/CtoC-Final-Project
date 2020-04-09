import React,{useState, useEffect} from 'react';
import './../styles.css'
import { Form,Button,Col } from 'react-bootstrap';
import ImageCard from '../../sell/imageCard';
import GET from '../../lib/get';
import FormData from "form-data"
import { IMGPOST, POST } from '../../lib/post';

const MyProfile = (props) => {
    const [auth, setAuth] = useState(false)
    const [edit, setEdit] = useState(false)
    const [image, setImage] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [paypalId, setPaypalId] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [error, setError] = useState("")
    const [avatarChanged, setAvatarChange] = useState(false)

    useEffect(()=>{

        const getData =async ()=>{
            let response =  await GET("/api/account/profile")
            console.log("response in profile",response)
            if(response.data)  {
                if(response.data.status==="success") setAuth(true) 
                    else setAuth(false)
                const {firstName,lastName,email,phoneNumber,paypalId,address, profileImage} = response.data.data
                setFirstName(firstName)
                setLastName(lastName)
                setEmail(email)
                if(phoneNumber)setPhoneNumber(phoneNumber)
                if(paypalId)setPaypalId(paypalId)
                if(address)setStreet(address.street)
                if(address)setCity(address.city)
                if(address)setZipCode(address.zipCode)
                if(profileImage)setImage(profileImage)

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

        const profileData={ firstName, lastName,paypalId,phoneNumber,street, city, zipCode};
        if(avatarChanged) {
            const config = {headers:{
            'x-auth-token':localStorage.getItem('c2c-token'),
            'content-type':'multipart/form-data'
        }}
        const formData = new FormData();
        console.log("image in submit", image, profileData)
        formData.append("file", image)
        Object.keys(profileData).forEach(key=>formData.append(key, profileData[key]))
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
        let response =await POST("/api/account/profile",profileData, config)
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

        switch (e.target.name) {
            case "firstName":
                if ((!regexAlphabet.test(e.target.value)) || (e.target.value.length < 3)) setError(e.target.name)
                else setError("")
                setFirstName(e.target.value)
                break;
            case "lastName":
                if ((!regexAlphabet.test(e.target.value)) || (e.target.value.length < 3)) setError(e.target.name)
                else setError("")
                setLastName(e.target.value)
                break;
            case "email":
                setError(e.target.name)
                break;
            case "paypalId":
                if (!regexPaypalId.test(e.target.value)) setError(e.target.name)
                else setError("")
                setPaypalId(e.target.value)
                break;
            case "phoneNumber":
                if ((!regexNumber.test(e.target.value))||(e.target.value>12) ||(e.target.value<9)) setError(e.target.name)
                else setError("")
                setPhoneNumber(e.target.value)
                break;
            case "street":
                if ((!regexAlphaNumber.test(e.target.value))||(e.target.value<4)) setError(e.target.name)
                else setError("")
                setStreet(e.target.value)
                break;
            case "city":
                if ((!regexAlphabet.test(e.target.value))||(e.target.value<5)) setError(e.target.name)
                else setError("")
                setCity(e.target.value)
                break;
            case "zipCode":
                if (!regexNumber.test(e.target.value)||(e.target.value<4)) setError(e.target.name)
                else setError("")
                setZipCode(e.target.value)
                break;
            default:
                break;
        } 
    }
    const imageChangeHandler =  ( image, imageBinaryData) => {
        setImage(image)
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
                            <Form.Control name="firstName" type="text" value={firstName} onChange={changeHandler}  />
                            <smail className="sText">{error === "firstName" ?
                            <p>Attention! name must consist on 3 or more alphabets</p> 
                            : null}</smail>

                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail" >
                            <Form.Label >Last Name</Form.Label>
                            <Form.Control name="lastName"  type="text" value={lastName} onChange={changeHandler} />
                            <smail className="sText">{error === "lastName" ?
                            <p>Attention! name must consist on 3 or more alphabets</p> 
                            : null}</smail>

                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridAddress1">
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control name="email" type="email" value={email} onChange={changeHandler} />
                            <smail className="sText">{error === "email" ? 
                                <p>Sorry! it is your use id and cannot be changed</p> 
                                : null}</smail>

                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail" >
                            <Form.Label >Phone</Form.Label>
                            <Form.Control name="phoneNumber" type="text" value={phoneNumber} onChange={changeHandler} />
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
                            <Form.Control name="paypalId" value={paypalId}onChange={changeHandler} />
                            <smail className="sText">{error === "paypalId" ? 
                                <p>Attention! please provide valid email address.</p> 
                                : null}</smail>
                        </Form.Group>
                    </Form.Row>
                    
                        <Form.Group  controlId="formGridAddress1">
                            <Form.Label>Street</Form.Label>
                            <Form.Control name="street" value={street} onChange={changeHandler} />
                            <smail className="sText">{error === "street" ? 
                                <p>Attention! street can only consist of alphabets and more than two.</p> 
                                : null}</smail>
                        </Form.Group>
                    
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail" >
                            <Form.Label >City</Form.Label>
                            <Form.Control name="city" type="text" value={city} onChange={changeHandler} />
                            <smail className="sText">{error === "city" ?
                                <p>Attention! city name can only consist of alphabets and more than two. </p> 
                                : null}</smail>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip" >
                            <Form.Label>Zipcode</Form.Label>
                            <Form.Control name="zipCode" value={zipCode} onChange={changeHandler}/>
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