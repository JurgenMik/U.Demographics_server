const express = require('express');
const users = require('../services/users');

const router = express.Router();

router.get('/', async  function(req, res, next){
    try {
        res.json(await users.getAllUsers());
    } catch (err) {
        console.error(`Error while getting programming languages`, err.message);
        next(err);
    }
});

router.post('/', async function(req, res, next) {
    try {
        res.json(await users.createUserInfo(req.body));
    } catch (err) {
        console.error(`Error while creating posts`, err.message);
        next(err);
    }
});

module.exports = router;