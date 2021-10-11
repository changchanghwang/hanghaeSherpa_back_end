const express = require('express');
const router = express.Router();

router.get('/', async()=>{
    console.log('hi')
})

module.exports = router;