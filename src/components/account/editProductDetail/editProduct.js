import React,{useState} from 'react'
import SellItems from '../../sell/sellitems'
import axios from "axios"
import MyAlert from "../../lib/alert";



function EditProduct(props) {

    const [alertId, setAlertId] = useState("")
    const [alertText, setAlertText] = useState("")
    const [showAlert, setShowAlert] = useState(false)

    const id = props.match.params.id

   

    const editHandler=async(product, images)=>{

        let blob = await fetch("/avatars/a1589803503629.jpeg").then(r => r.blob());
        let config = {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-type': 'multipart/form-data'
            }
        }
    
        const formData = new FormData();
        
        if (images.length > 0) {
            let imageArray = images.map(value => value.image)
            imageArray.forEach(value => formData.append("files", value))
        }

        Object.keys(product).forEach(key => {
                                  if(key==="creator") formData.append(key,id)
                                  else formData.append(key, product[key])
                                })
          
        axios.post("/api/account/editproduct", formData, config)
                    .then(res=>{
                        if(res.data.status==="success"){
                        setAlertId("A")
                        setAlertText('You have successfuly posted your product')
                        setShowAlert(true)
                    }})
                    .catch(err=>err)
    }


    return (
        <div>
            <SellItems id={id} 
                {...props}
                editHandler={editHandler}
                />
            
            {showAlert ? <MyAlert id={alertId} alertText={alertText} {...props} /> : null}

        </div>
    )
}

export default EditProduct
