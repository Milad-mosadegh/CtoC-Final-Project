const Errors={
    email:{
        status      : false,
        value       :`Attention! please provide a valid email address.`
    },
    form:{
        status      : false,
        value       :`Attention! please fill all fields.`
    },
    authentication:{
        status      :false,
        value       :"Authentication failed! please check your credentials"
    },
    firstName:{
        status      : false,
        value       :`Attention! name must consist on 3 or more alphabets.`
    },
    lastName:{
        status      : false,
        value       :`Attention! name must consist on 3 or more alphabets.`
    },
    pass:{
        status      : false,
        value       :`Attention! password must contain atleast 6 and maximum 12 characters.`
    },
    confirmPass:{
        status      : false,
        value       :`Attention! password and confirm password must same.`
    },
    backend:{
        status      :false,
        value       :""
    },
    resetPass:{
        status      :false,
        value       :`Attention! please provide a valid email address.`
    },
    title:{
        status      :false,
        value       :"Attention! title must contain atleast 3 and maximum 20 characters"
    },
    quantity:{
        status      :false,
        value       :"Attention! quantity must contain only digits"
    },
    price:{
        status      :false,
        value       :"Attention! please provide valid price"
    },
    description:{
        status      :false,
        value       :"Attention! description must contain atleast 10 and maximum 100 characters"
    },
    category:{
        status      :false,
        value       :"Attention! Please choose a valid category"
    },
    condition:{
        status      :false,
        value       :"Attention! Please choose a valid condition"
    },
    color:{
        status      :false,
        value       :"Attention! Please choose a valid color"
    }

}
    export default Errors;