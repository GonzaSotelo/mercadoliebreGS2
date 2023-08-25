
const express = require('express');
const router = express.Router();


const productsController = require('../controllers/productsController');


router.get('/', productsController.index); 



router.get('/create', productsController.create); 
router.post('/create', productsController.store); 



router.get('/detail/:id', productsController.detail); 


router.get('/edit/:id', productsController.edit); 
router.put('/update/:id', productsController.update); 



router.delete('/remove/:id', productsController.destroy); 


module.exports = router;
