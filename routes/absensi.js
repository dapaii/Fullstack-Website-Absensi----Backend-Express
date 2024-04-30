const express = require('express')
const router = express.Router()
const AbsensiModel = require('../models/absensi')

// ROUTING ENDPOINT ABSENSI UTAMA --START
router.get('/', async(req, res) => {
    const absensi = await AbsensiModel.findAll()
    res.status(200).json({
        data : absensi,
        metadata : "test absensi endpoint"
    })
})
// ROUTING ENDPOINT ABSENSI UTAMA --END

// ROUTING ENDPOINT ABSENSI POST/CREATE ('IN') --START
router.post('/checkin', async(req, res) => {
    const {nip} = req.body
    const absensi = await AbsensiModel.create({
        users_nip: nip, status: 'in'
    })
    res.status(200).json({
        data : absensi,
        metadata : "checkint succes!"
    })
})
// ROUTING ENDPOINT ABSENSI POST/CREATE --EMD

// ROUTING ENDPOINT ABSENSI POST/CREATE ('OUT') --START
router.post('/checkout', async(req, res) => {
    const {nip} = req.body
    const absensi = await AbsensiModel.create({
        users_nip: nip, status: 'out'
    })
    res.status(200).json({
        data : absensi,
        metadata : "checkout succes!"
    })
})
// ROUTING ENDPOINT USERS POST/CREATE --END

module.exports = router