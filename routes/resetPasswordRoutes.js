const express = require('express');
const { resetPassword } = require('../resetPassword/adminreset');

const router = express.Router();

router.post('/update-password', resetPassword)

module.exports = router