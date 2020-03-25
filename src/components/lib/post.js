import {post} from "axios"

const POST = async (url,data)=>{
   return await post(url,{data},{
        headers:{
            'x-auth-token':localStorage.getItem('CRM-token'),
            'Content-Type': 'application/json'
        }
    })
    .then(res=>res)
    .catch(err=>err)
}
export default POST;