const express = require ("express")
const app = express()
const PORT = 3000
const path = require ("path")
const fs = require ("fs")
const uuid = require ("uuid")


app.use(express.json())
app.use(express.static("public"))

app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/notes.html"))
})
app.get("/api/notes",(req,res)=>{
    fs.readFile("db/db.json","utf-8",(error,data)=>{
        res.send(data)
    })
})
app.post("/api/notes",(req,res)=>{
    console.log (req.body);
    const { title,text } = req.body
    const note = { 
        title,
        text,
        id: uuid.v4()
    }
    fs.readFile("db/db.json","utf-8",(error,data)=>{
        if (error){
            console.error(error)
        } else {
       const notes = JSON.parse(data)
       notes.push(note)
       fs.writeFile("db/db.json",JSON.stringify(notes),(error,data)=>{
        res.json(req.body)
       })}
    })
})
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/index.html"))
})
app.listen(PORT,() => {
    console.log("app listening")
})

