const bcrypt = require('bcrypt')
const UserModel = require('../models/users')

const passwordCheck = async (nip, password) => {
    const UserData = await UserModel.findOne({ where: { nip: nip } })
    const compare = await bcrypt.compare(password, UserData.password)
    return {compare, userData}
}

module.exports = passwordCheck