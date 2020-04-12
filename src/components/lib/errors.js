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
    }

}
    export default Errors;