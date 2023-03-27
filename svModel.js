const mongoose = require('mongoose')

const SinhVienSchema = new mongoose.Schema({
    hoten:{
        type:String,
        required:true
    },
    tuoi:{
        type:String
    },
    diachi:{
        type:String
    }
})

const SinhVienModal = mongoose.model("sinhvien",SinhVienSchema)

module.exports = SinhVienModal