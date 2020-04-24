import React,{useRef,useEffect, useState} from 'react';
import {Overlay, Popover} from "react-bootstrap"
import Button from '@material-ui/core/Button';
import GET from '../../lib/get';
import { Link } from "react-router-dom"
import Input from '@material-ui/core/Input';


const NewMessage = (props) => {
    const {title, productId, recipentId}=props
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [auth, setAuth] = useState(false)
    const [message,setMessage]= useState("")
    const ref = useRef(null);

    useEffect(()=>{
      const token = localStorage.getItem("c2c-token")
      const checkAuth=async()=>{

        if(token){
          let response = await GET("api/auth/authenticated")
          console.log("response in authentication", response)
          if(response.data.status==="success") setAuth(true)
            else setAuth(false)
        }
      }
      checkAuth()
    }, [])
    const changeHandler=(e)=>{
      setMessage(e.target.value)
    }
    const submitHandler=()=>{
      console.log("submit handler called", message)
    }

    const handleClick = (event) => {
      setShow(!show);
      setTarget(event.target);
    };
  
    return (
      <div ref={ref}>
        <div className="myIcons fa fa-envelope-o" variant="secondary" onClick={handleClick}></div>
        
        <Overlay
          show={show}
          target={target}
          placement="top"
          container={ref.current}
          containerPadding={20}
        >
          <Popover id="popover-contained">

            {auth?
              <div>
              <Popover.Title as="h3">Inquire about product</Popover.Title>
              <Popover.Content>
              <Input
                multiline="true"
                placeholder="Message"
                value={message}
                onChange={changeHandler}
                
              />
                 <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={submitHandler}
                  >
                  <i class="fa fa-angle-double-right"></i>
                  </Button>
                </Popover.Content>
              </div>
              :<div>
              <Popover.Title as="h3">Request failed!</Popover.Title>
              <Popover.Content>
              <small className="mt-3 myText">You are not logged in please <Link to="/signin">Signin</Link></small>
                </Popover.Content>
              </div>
}
            
            
          </Popover>
        </Overlay>
        
      </div>
    );
      
}
 
export default NewMessage;