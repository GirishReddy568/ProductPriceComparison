const express=require("express")
const bodyParser=require('body-parser');
const app=express();
let ejs = require('ejs');
app.set('view engine', 'ejs')
const a=[]
let i=0;
app.listen(3000,()=>{
    console.log("server is running successfully");

})
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/',(req,res)=>{
    res.render('index',{name:""})
})
app.post('/',(req,res)=>{
    a.push(req.body.name);
    
    setTimeout(() => {
    res.render('product',{name:a[0]})    
    }, 10000);

})