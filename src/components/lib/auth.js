import {get} from "axios"

const IfAuthenticated = async ({children}) => {
    const token = localStorage.getItem("c2c-token")
    if(token){
        let response = await get("api/auth/authenticated",{
                headers:{
                    'x-auth-token':token
                }})
            .then(res=>JSON.parse(res))
            .catch(err=>{
                localStorage.removeItem("c2c-token")
                localStorage.removeItem("c2c-profile")
                }
            )
        console.log("response in authentication", response)
        if(response.data.status==="success") return children
        
    }
    
    return ( null );
}
const IfNotAuthenticated = async(props) => {
    const token = localStorage.getItem("c2c-token")
    if(token){
        let response = await get("api/auth/authenticated",{
                headers:{
                    'x-auth-token':token
                }})
            .then(res=>res)
            .catch(err=>{
                localStorage.removeItem("c2c-token")
                localStorage.removeItem("c2c-profile")
                })
        console.log(response)
        return(null)
    }
    console.log("accessed not authenticated")
    return ( props.children );
}
 
export {IfAuthenticated, IfNotAuthenticated} ;