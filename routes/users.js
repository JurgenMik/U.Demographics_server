const express = require('express');
const users = require('../services/users');

const {check, validationResult } = require('express-validator');

const router = express.Router();

router.get('/', async  function(req, res, next){
    try {
        res.json(await users.getAllUsers());
    } catch (err) {
        console.error(`Error while getting users`, err.message);
        next(err);
    }
});

router.post('/',
    check('first_name').notEmpty().isString(),
    check('last_name').notEmpty().isString(),
    check('date_of_birth').notEmpty().isString(),
    check('phone_nb').notEmpty().isNumeric().isLength({min : 7, max : 7}),
    check('age').notEmpty().isNumeric(),
    check('gender').notEmpty(),
    check('religion').notEmpty().isString(),
    check('disability').notEmpty().isString(),
    async function(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        res.json(await users.createUserInfo(req.body));
    } catch (err) {
        console.error(`Error while creating a new user`, err.message);
        next(err);
    }
});

router.put('/:id',
    check('first_name').notEmpty().isString(),
    check('last_name').notEmpty().isString(),
    check('date_of_birth').notEmpty().isString(),
    check('phone_nb').notEmpty().isNumeric().isLength({min : 7, max : 7}),
    check('age').notEmpty().isNumeric(),
    check('gender').notEmpty(),
    check('religion').notEmpty().isString(),
    check('disability').notEmpty().isString(),
    async function(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        res.json(await users.updateUserInfo(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating a user`, err.message);
        next(err);
    }
});

router.delete('/:id', async function(req, res, next) {
    try {
        res.json(await users.removeUserInfo(req.params.id));
    } catch (err) {
        console.error(`Error while trying to delete a user`, err.message);
        next(err);
    }
});

module.exports = router;