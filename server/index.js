const PORT = 3001
const express = require('express')

const server = express()

server.listen(PORT,()=>{
    console.log(`server listening on port: ${PORT}`)
})