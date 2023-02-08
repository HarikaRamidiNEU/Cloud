import Product from "../models/Product.js";
import User from "../models/User.js";
import auth from "basic-auth";

/**
 * This method used to create a new product
 * @param req - Http Request with <Product> as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const createProduct = async (req, res) => {
    const {
        sku,
        quantity
    } = req.body;
    try {
        if (quantity && (quantity < 0 || quantity > 100))
            res.status(400).send({
                message: "Bad request. Quantity cannot be less than 0 or greater than 100"
            })
        else {
            const product = await Product.findOne({
                where: {
                    sku: sku
                }
            })
            if (!product) {
                console.log("There is no such product, adding now");
                const user = await auth(req);
                const dbuser = await User.findOne({
                    where: {
                        username: user.name
                    }
                });
                req.body.owner_user_id = dbuser.id;
                const row = await Product.create(req.body);
                res.status(201).send(row);
            } else {
                res.status(400).send({
                    message: "Bad Request, Product with same sku already exists!"
                })
            }
        }
    } catch (err) {
        res.status(400).send({
            message: "Bad request"
        })
    }
};

/**
 * It updates the product details and returns the updated object
 * @param req - Http Request with <Product> as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const putProduct = async (req, res) => {
    const productId = req.params.id;
    const {
        id,
        name, description, sku, manufacturer, quantity,
        date_added,
        date_last_updated,
        owner_user_id
    } = req.body;
    if (date_added || id || owner_user_id || date_last_updated) {
        res.status(400).send({
            message: "Bad request"
        });
    } else if(!name || !description || !sku || !manufacturer || !(req.body.hasOwnProperty('quantity')))
        res.status(400).send({
            message: "Bad request"
        });
    else {
        try {
            if (quantity && (quantity < 0 || quantity > 100))
            res.status(400).send({
                message: "Bad request. Quantity cannot be less than 0 or greater than 100"
            })
            const product = await Product.findByPk(productId);
            if (product) {
                product.update(req.body);
                res.status(204).send({
                            message: "Product updated successfully"
                        });
            }
        } catch (err) {
            res.status(400).send({
                message: "Bad request"
            });
        }
    }
};

/**
 * It updates the product details and returns the updated object
 * @param req - Http Request with <Product> as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const patchProduct = async (req, res) => {
    const productId = req.params.id;
    const {
        id,
        date_added,
        date_last_updated,
        quantity,
        owner_user_id
    } = req.body;
    if (date_added || id || owner_user_id || date_last_updated) {
        res.status(400).send({
            message: "Bad request"
        });
    } else {
        try {
            if (quantity && (quantity < 0 || quantity > 100))
            res.status(400).send({
                message: "Bad request. Quantity cannot be less than 0 or greater than 100"
            })
            const product = await Product.findByPk(productId);
            if (product) {
                product.update(req.body);
                res.status(204).send({
                            message: "Product updated successfully"
                        });
            }
        } catch (err) {
            res.status(400).send(err);
        }
    }
};

/**
 * This is used to get the product details based on the access token
 * @param req - Http Request with id in params
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const getProduct = async (req, res) => {
    const productId = req.params.id;
    const row = await Product.findByPk(productId);
    res.status(200).json(row);
};

/** 
 * This is used to get the product details based on the access token
 * @param req - Http Request with id in params
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    if (!productId)
        res.status(400).json("Bad Request");
    const row = await Product.destroy({
        where: {
            id: productId
        }
    });
    if (row === 1)
        res.status(204).json(row);
    else
        res.status(404).send("");
};