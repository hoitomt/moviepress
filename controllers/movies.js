const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello Movie World');
})

module.exports = router;
