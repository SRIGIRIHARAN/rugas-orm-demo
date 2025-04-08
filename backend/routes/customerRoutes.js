const express = require('express');
const router = express.Router();
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController');

router.get('/', getAllCustomers);           
router.post('/', createCustomer);           
router.get('/:id', getCustomerById);        
router.put('/:id', updateCustomer);         
router.delete('/:id', deleteCustomer);      

module.exports = router;
