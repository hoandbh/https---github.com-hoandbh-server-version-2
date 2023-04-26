const express = require('express');
const router = express.Router();

router.get('/downloadPdf', (req,res)=>{
    res.download('files/Header.PNG');
})