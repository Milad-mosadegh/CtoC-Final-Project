import React,{useState, useEffect} from 'react';
import MyNavbar from '../navbar/navBar';
import MainSell from './mainsell';
import GET from '../lib/get';

const SellItems = (props) => {

    const [images, setImages] = useState([])
    const [aut, setAuth] = useState(false)
    const [product, setProduct] = useState({
        title:"",
        category:"",
        condition:"",
        quantity:"",
        color:"",
        price:"",
        description:""
    })


    useEffect(() => {
        const authenticate=async ()=>{
                    let response = await GET("/api/auth/authenticated") 
                    if(response.data){
                        if(response.data.status==="success") setAuth(true)
                            else localStorage.removeItem("c2c-token")
                        console.log(response , "response in sell")
                        }
                }
        if(localStorage.getItem("c2c-token")) authenticate();
        
    }, [])

    const imageChangeHandler =  ( image) => {
        if(images.length===0) return setImages([image])
        const tempImageArray = [...images]
        let index= tempImageArray.findIndex(key=>key.id===image.id)
        if(index===-1) tempImageArray.push(image)
        else tempImageArray[index]={...image}
        setImages(tempImageArray)
    }

    const changeHandler=(e)=>{
        console.log("you reached change handler", e.target.name)
        setProduct({...product, [e.target.name]:e.target.value})
    }
    const submitHandler=async(e)=>{
        e.preventDefault();
        //const response = await POST("/api/sell/postAdd")
        console.log(product, "you reached submithandler")
    }
    return ( 
        <div>
            <MyNavbar {...props} />
            <MainSell 
                {...props }
                imageChangeHandler= {imageChangeHandler}
                changeHandler     = {changeHandler}
                submitHandler     = {submitHandler}
                product           = {product}
                />
           
        </div>
     );
}
 
export default SellItems;