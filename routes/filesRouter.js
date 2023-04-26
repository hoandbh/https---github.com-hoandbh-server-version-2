const express = require('express');
const filesRouter = express.Router();

filesRouter.get('/versions', (req,res)=>{
    res.download('files/Header.PNG');
});


module.exports = filesRouter;