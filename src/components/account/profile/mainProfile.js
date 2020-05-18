import React, { useState, useEffect } from 'react';
import './../styles.css'
import GET from '../../lib/get';
import FormData from "form-data"
import { IMGPOST, POST } from '../../lib/post';
import ProfileData from './profile';
import MyAlert from '../../lib/alert';


const MyProfile = (props) => {

    const [profile, setProfile] = useState({

        firstName: "",
        lastName: "",
        email: "",
        paypalId: "",
        phoneNumber: "",
        profileImage: "",
        street: "",
        city: "",
        zipCode: ""

    })
    const [auth, setAuth] = useState(false)
    const [edit, setEdit] = useState(false)
    const [avatarChanged, setAvatarChange] = useState(false)
    const [image, setImage] = useState("")
    const [pass, setPass] = useState("")
    const [showModal, setShowModal] = useState(false)


    const [alertId, setAlertId] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState('')

    useEffect(() => {

        const getData = async () => {

            let response = await GET("/api/account/profile")

            if (response.data) {
                if (response.data.status === "success") {
                    setAuth(true)
                    setProfile(response.data.data)
                }
                else setAuth(false)

            }
            else {
                localStorage.removeItem("c2c-token")
                localStorage.removeItem("c2c-profile")
                props.history.push("/signin")
            }
        }

        if (localStorage.getItem("c2c-token")) getData();
        else props.history.push("/signin")


    }, [])

    const renderModal = () => {
        setShowModal(true)
    }
    const derenderModal = () => {
        setShowModal(false)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (avatarChanged) {
            const config = {
                headers: {
                    'x-auth-token': localStorage.getItem('c2c-token'),
                    'Content-type': 'multipart/form-data'
                }
            }

            const formData = new FormData();
            formData.append("file", profile.profileImage)
            Object.keys(profile).forEach(key => { if (key !== "profileImage") formData.append(key, profile[key]) })
            let response = await IMGPOST("/api/account/profile", formData, config)

            if ((response.data) && (response.data.status === "success")) {
                // alert("You have successfully update profile")
                setAlertId("A")
                setAlertText("You have successfully update profile")
                setShowAlert(true)

                setEdit(false)
                setAvatarChange(false)
                document.getElementById("fieldset").disabled = true
            }
            else {
                // alert("An error occured while you were updating records, please try again")
                setAlertId("A")
                setAlertText("An error occured while you were updating records, please try again")
                setShowAlert(true)
            }
            return
        }

        const config = {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        }
        let response = await POST("/api/account/profile", profile, config)
        if ((response.data) && (response.data.status === "success")) {
            // alert("You have successfully update Your records")
            setAlertId("A")
            setAlertText("You have successfully update Your records")
            setShowAlert(true)

            setEdit(false)
            document.getElementById("fieldset").disabled = true

        }
        else {
            // alert("An error occured while you were updating records, please try again")
            setAlertId("B")
            setAlertText("An error occured while you were updating records, please try again")
            setShowAlert(true)
        }

    }

    const editHandler = (e) => {
        document.getElementById("fieldset").disabled = false
        setEdit(true)
    }
    const cancelHandler = () => {
        document.getElementById("fieldset").disabled = true
        setEdit(false)
    }

    const changeHandler = (e) => {

        /*         const regexAlphabet = new RegExp(/^[a-zA-ZäöüÄÖÜß]*$/)
                const regexPaypalId= new RegExp(/^([a-zA-Z0-9_\-.äöüÄÖÜß_]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
                const regexNumber = new RegExp(/^[0-9]*$/)
                const regexAlphaNumber = new RegExp(/[a-zA-Z0-9äöüÄÖÜß]/) */

        setProfile({ ...profile, [e.target.name]: e.target.value })

    }

    const imageChangeHandler = (image) => {
        setProfile({ ...profile, profileImage: image.image })
        setAvatarChange(true)
    }


    return (
        <div className='mainProfile'>
            <ProfileData
                submitHandler={submitHandler}
                imageChangeHandler={imageChangeHandler}
                changeHandler={changeHandler}
                cancelHandler={cancelHandler}
                editHandler={editHandler}
                profile={profile}
                edit={edit}
                renderModal={renderModal}
                showModal={showModal}
                derenderModal={derenderModal}
                {...props}
            />
            {showAlert ? <MyAlert id={alertId} alertText={alertText} /> : null}
        </div>
    );
}

export default MyProfile;