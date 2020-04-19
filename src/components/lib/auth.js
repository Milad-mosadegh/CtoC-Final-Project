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
                }
            )
        console.log("rsponsedded", response)
        if(response.data.status==="success") return children
        
    }
    
    return ( null );
}
const IfNotAuthenticated = (props) => {
    const token = localStorage.getItem("c2c-token")
    console.log("these are props  in authenticated", props)
    if(token){
        let response = get("api/auth/authenticated",{
                headers:{
                    'x-auth-token':token
                }})
            .then(res=>res)
            .catch(err=>{
                localStorage.removeItem("c2c-token")
                })
        console.log(response)
        return(null)
    }
    
    return ( props.children );
}
 
export {IfAuthenticated, IfNotAuthenticated} ;