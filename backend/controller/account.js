const user = require("../model/userModel")

const multer = require("multer")
const path = require("path")
const avatarSchema = require("../model/avatarModel")
const fs = require("fs")
const ProductsSchema = require('../model/productModel')
const SoldSchema = require('../model/productModel')




exports.getProfile = (req, res) => {

    user.findById(req.userId, (err, doc) => {

        if (err) return res.status(501).json({
            status: "failed",
            message: err
        })
        else {
            const { firstName, lastName, email, paypalId, phoneNumber, profileImage } = doc
            let street, city, zipCode;
            if (doc.address) {
                street = doc.address.street;
                city = doc.address.city;
                zipCode = doc.address.zipCode
            }
            else {
                street = ""
                city = ""
                zipCode = ""
            }
            const profile = { firstName, lastName, email, paypalId, phoneNumber, street, city, zipCode, profileImage }
            console.log(profile)
            res.json({
                status: "success",
                data: profile
            })

        }
    })

}

exports.editProfile = async (req, res) => {
    if (req.body.data) {

        const { firstName, lastName, paypalId, phoneNumber, street, city, zipCode } = req.body.data
        const profileData = {
            firstName,
            lastName,
            paypalId,
            phoneNumber,
            address: {
                street,
                city,
                zipCode
            }
        }
        await user.findByIdAndUpdate(req.userId, profileData, (err, doc) => {
            if (err) res.json({ status: "failed", message: err })
            else res.json({ status: "success", message: "Records updated successfully" })
        })
        return
    }
    let fileName;
    const storageTarget = multer.diskStorage({
        destination: "public/avatars",
        filename: (req, file, cb) => {
            fileName = "a" + Date.now() + path.extname(file.originalname)
            cb(null, fileName)

        }
    })
    const upload = multer({ storage: storageTarget }).single(`file`)

    upload(req, res, async () => {



        const { firstName, lastName, paypalId, phoneNumber, street, city, zipCode } = req.body
        console.log(firstName, lastName, paypalId, phoneNumber, street, city, zipCode)
        const profileData = {
            firstName,
            lastName,
            paypalId,
            phoneNumber,
            address: {
                street,
                city,
                zipCode
            },
            profileImage: fileName
        }
        await user.findByIdAndUpdate(req.userId, profileData, (err, doc) => {
            if (err) res.json({ status: "failed", message: err })
            else res.json({ status: "success", message: "Records updated successfully" })
        })
    })
}

exports.getMyProducts = async (req, res) => {
    let products = await ProductsSchema.find({ creator: req.userId },
        {
            _id: 1,
            title: 1,
            price: 1,
            images: 1,
        }
    )

    if (!products) {
        res.json({ status: "failed", message: "Your have no Products" })
    } else {
        res.json({ status: "success", data: products })
    }
}

exports.getMySoldProducts = async (req, res) => {
    let products = await SoldSchema.find({ creator: req.userId },
        {
            _id: 1,
            title: 1,
            price: 1,
            images: 1,
        }
    )

    if (!products) {
        res.json({ status: "failed", message: "Your have no Products" })
    } else {
        res.json({ status: "success", data: products })
    }
}


