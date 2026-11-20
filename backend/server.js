import express from "express"
import {createServer} from "http"
import {Server} from "socket.io"
import {YSocketIO} from "y-socket.io/dist/server"
import path from "path"
import {fileURLToPath} from "url"


const app = express()
const publicDirectory = path.join(path.dirname(fileURLToPath(import.meta.url)), "public")

const httpServer= createServer(app)

//setting up corse
const io = new Server(httpServer,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }

})


const ySocketIO = new YSocketIO(io)
ySocketIO.initialize()


//health check route
app.get('/health',(req,res)=>{
    res.status(200).json({
        message:"health ok",
        success:true
    })
})

app.use(express.static(publicDirectory))

app.get("/{*path}",(req,res,next)=>{
    res.sendFile(path.join(publicDirectory, "index.html"), (error)=>{
        if (error) next(error)
    })
})

httpServer.listen(3000,()=>{
    console.log("Server is running on port 3000")
})