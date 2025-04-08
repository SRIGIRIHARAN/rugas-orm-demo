const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require("multer");
const upload = multer();

router.post("/", upload.none(), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put("/:id", upload.none(), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
