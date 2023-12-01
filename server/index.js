const express = require('express')
// require('dotenv').config
const port = process.env.PORT || 3001

const server = require('./app')

server.listen(port,()=>{
    console.log(`server listening on port: ${port}`)
})