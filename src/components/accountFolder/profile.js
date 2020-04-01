import React,{useState} from 'react';
import './accStyle.css'
import { Form,Button,Col } from 'react-bootstrap';

const MyProfile = () => {
    const [auth, setAuth] = useState(false)
    
    const editHandler = (e) => {
        document.getElementById("fieldset").disabled=false
        setAuth(true)
    }
    const cancelHandler =() =>{
        document.getElementById("fieldset").disabled=true
        setAuth(false)
    }
    const submitHandler = (e) =>{
        e.preventDefault();
        console.log(e)
    }
    const changeHandler=(e)=>{

        console.log("i am clicked",e.target.name)
    }
    


    return ( 
        <div className='shadow-lg p-5'>
            <Form onSubmit={submitHandler}>
                <fieldset id="fieldset" disabled="disabled">
                    
                    <div className="w-25">
                        <div className="profileImage"></div>
                        <div className="mb-5 ">
                            <Button className="btn btn-block align-items-end "  >
                            Add
                            </Button>
                         
                        </div>
                    </div>

                <Form.Row >
                    <Form.Group as={Col} controlId="formGridEmail" >
                        <Form.Label >First Name</Form.Label>
                        <Form.Control name="firstName" type="text" value='Milad' onChange={changeHandler}  />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail" >
                        <Form.Label >Last Name</Form.Label>
                        <Form.Control name="lastName"  type="text" value='Mosadegh' onChange={changeHandler} />
                    </Form.Group>
                </Form.Row>
                    
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridAddress1">
                        <Form.Label>E-Mail</Form.Label>
                            <Form.Control name="email" type="email" onChange={changeHandler} />
                          
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="formGridEmail" >
                            <Form.Label >Phone</Form.Label>
                            <Form.Control name="phone" type="text" value='017623232323' onChange={changeHandler} />
                        </Form.Group>
                    </Form.Row>

                    
               
                    <Form.Row>
                        
                        <Form.Group as={Col} controlId="formGridAddress1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password"  value="*********" onChange={changeHandler} />
                            <a>change your password</a>
                        </Form.Group>

                    <Form.Group as={Col} controlId="formGridAddress1">
                        <Form.Label>PayPal ID</Form.Label>
                        <Form.Control name="paypal" value="milad@milad.com"onChange={changeHandler} />
                    </Form.Group>
                </Form.Row>
            
                    <Form.Group  controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control name="address" value="1234 Main St" onChange={changeHandler} />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail" >
                            <Form.Label >City</Form.Label>
                            <Form.Control name="city" type="text" value='Duesseldorf' onChange={changeHandler} />
                        </Form.Group>
                

                    <Form.Group as={Col} controlId="formGridZip" >
                        <Form.Label>Zip</Form.Label>
                        <Form.Control name="zip" onChange={changeHandler}/>
                    </Form.Group>
                </Form.Row>

              
                </fieldset>
                {auth ?
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