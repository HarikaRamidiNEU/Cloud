import { productRoute } from '../middlewares/productRoute.js';
import { authRoute } from '../middlewares/authRoute.js';
import  * as productController from '../controllers/product-controller.js';
import express from 'express';
const router = express.Router();

// get Product Route
router.get('/:id', async (req, res)=> {
        productController.getProduct(req, res);
});

// Create Product with put Route
router.post('/', async (req, res)=> {
    const status = await authRoute(req, res);
    if(status === 200)
        productController.createProduct(req, res);
    else
        res.status(status).send("");
});

// Update Product with put Route
router.put('/:id', async (req, res)=> {
    const status = await productRoute(req, res);
    if(status === 200)
        productController.putProduct(req, res);
    else
        res.status(status).send("");
});

// Update Product with patch Route
router.patch('/:id', async (req, res)=> {
    const status = await productRoute(req, res);
    if(status === 200)
        productController.patchProduct(req, res);
    else
        res.status(status).send("");
});

// delete Product Route
router.delete('/:id', async (req, res)=> {
    const status = await productRoute(req, res);
    if(status === 200)
        productController.deleteProduct(req, res);
    else
        res.status(status).send("");
});



export default router;