const express=require("express");
const app= express();
const bodyParser = require('body-parser');
const mongoose=require("mongoose");
const multer=require("multer");
const path=require("path");
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}))
const Todo=require("./models/todo");
const cors=require("cors");
const storage =multer.diskStorage({
    destination:'public/uploads/',filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

let upload=multer({
    storage:storage
})

app.use(bodyParser.json());
const dburl="mongodb+srv://app:05fvC5SSdWSbpHpg@cluster0.1mfxwat.mongodb.net/superCodersGlobal?retryWrites=true&w=majority"
mongoose.connect(dburl, {useNewUrlParser: true,useUnifiedTopology:true})

// app.get("/",function(req,res){
//     res.render("index")
// })

app.post("/", upload.single('image'), function(req,res){
    const todoTask = new Todo({
        // taskimage: req.body.image,
        taskimage: req.file.filename,
        tasktext: req.body.taskText,
    })
    todoTask.save()
    .then(result =>{
        res.redirect("/")
    })
    .catch(error => {
        // Handle the error here
        console.error(error);
        res.status(500).send("Error saving todo task.");
    });
})


app.get("/", function(req, res) {
    Todo.find({})
        .then((todos) => {
            res.render("index", { todos : todos });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error fetching todo tasks.");
        });
});


app.delete("/:id",(req,res)=>{
    //console.log(req.params.id)

     Todo.findByIdAndDelete(req.params.id)
    .then(result => {
        //console.log(result)
        res.redirect("/")
    })
})





app.listen(3000,function(req,res){
    console.log("server running in 3000");
})