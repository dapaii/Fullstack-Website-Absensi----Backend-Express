const express = require('express')
const router = express.Router()
const UserModel = require('../models/users')
const bcrypt = require('bcrypt')
const passwordCheck = require('../utils/passwordCheck')

// ROUTING ENDPOINT USERS UTAMA --START
router.get('/', async(req, res) => {
    const users = await UserModel.findAll()
    res.status(200).json({
        data : users,
        metadata : "test users endpoint"
    })
})
// ROUTING ENDPOINT USERS UTAMA --END

// ROUTING ENDPOINT USERS POST/CREATE --START
router.post('/', async(req, res) => {
    const { nip, nama, password } = req.body
    //enkripsi password
    const encryptedPassword = await bcrypt.hash(password, 10)
    const users = await UserModel.create({
        nip, nama, password: encryptedPassword
    })
    res.status(200).json({
        data : users,
        metadata : "test post user endpoint"
    })
})
// ROUTING ENDPOINT USERS POST/CREATE --END

// ROUTING ENDPOINT USERS PUT/UPDATE --START
router.put('/', async(req, res) => {
    const { nip, nama, password, passwordBaru } = req.body
    const check = await passwordCheck(nip, password)
    const encryptedPassword = await bcrypt.hash(passwordBaru, 10)

    // password yang muncul di db === password dari inputan
    if(check.compare === true) {
        const users = await UserModel.update({
            nama, password: encryptedPassword
        }, {where: { nip : nip } })

        res.status(200).json({
            users: { updated : users[0] },
            metadata: " users Updated succes!"
        })
    }else {
        res.status(400).json({
            error: "data invalid"
        })
    }
})
// ROUTING ENDPOINT USERS PUT/UPDATE --END

// ROUTING ENDPOINT USERS LOGIN --START
router.post('/login', async(req, res) => {
    const { nip, password} = req.body
    const check = await passwordCheck(nip, password)

    if(check.compare === true){   
        res.status(200).json({
            users: check.userData,
            metadata: "login succes"
        })
    }else {
        res.status(400).json({
            error: "data invalid"
        })
    }
})
// ROUTING ENDPOINT USERS LOGIN --END

module.exports = router