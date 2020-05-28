const express = require('express');
const router = express.Router();
const controller = require('./controller');

// POST endpoints
router.post('/create',controller.create_user);
router.post('/delete',controller.delete_user);

// GET endpoints
router.get('/all',controller.get_user);
router.get('/create',controller.send_createUser_page);
router.get('/',controller.send_HomePage);

//PUT endpoints
router.put('/update/:id',controller.update_user);


module.exports = router;
