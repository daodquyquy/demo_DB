const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const exphbs = require('express-handlebars')
const bodyp = require('body-parser')
const {default: mongoose} = require('mongoose')
const tempelatePath = path.join(__dirname, './tempelates')
const SinhVienModal = require('./svModel')


app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', tempelatePath);
app.use(bodyp.urlencoded({extended: false }));

const uri = 'mongodb+srv://quyddph26439:quy070723@cluster0.7tbajqx.mongodb.net/demoDB?retryWrites=true&w=majority';
 mongoose.connect(uri).then(console.log('Ket noi DB thanh cong'));


app.get('/',  (req,res)=>{
    SinhVienModal.find({}).then(sinhVien =>{
        res.render('home',{sinhVien : sinhVien.map(sinhViens => sinhViens.toJSON())})
    })
})
app.get('/newsinhvien',(req,res)=>{
    res.render('newsinhvien');
})

app.post('/add',async (req,res)=>{
    const sv = new SinhVienModal();
    sv.hoten = req.body.hoten;
    sv.tuoi = req.body.tuoi;
    sv.diachi = req.body.diachi;

    try{
        await sv.save();
    }catch(err){
        console.log(err);
    }
    SinhVienModal.find({}).then(sinhVien =>{
        res.render('home',{sinhVien : sinhVien.map(sinhViens => sinhViens.toJSON())})
    })
    
})

app.listen(port,()=>{
    console.log("App port at localhost 3000");
})