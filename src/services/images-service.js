import Product from "../models/Product.js"
import Image from "../models/Image.js"
import * as s3uploader from "../middlewares/s3FileUploader.js"

export const uploadFile = async(req, res) => {
    const file  = req.file;
    console.log(file);
    try {
        if (!file)
            res.status(400).send({
                message: "Bad request."
            })
        else {
            const productId = req.params.id;
            const product = await Product.findByPk(productId);
            if (product) {
                const userId = product.owner_user_id;
                const data = await s3uploader.uploadFile(userId, productId, file.path, file.originalname)
                const imageRequest = {
                    "product_id" : productId,
                    "file_name" : data.Key.split('/')[2],
                    "s3_bucket_path" : data.Location
                };
                const row = await Image.create(imageRequest);
                res.status(201).send(row);
            } else {
                res.status(400).send({
                    message: "Bad Request, No such product exists"
                })
            }
        }
    } catch (err) {
        res.status(400).send({
            message: "Bad request"
        })
    }
};

export const getFile = async(req,res) => {
    const p_id = req.params.id;
    const imageId = req.params.imageId;
    const product = await Product.findByPk(p_id);
    if(product){
        const row = await Image.findByPk(imageId);
        res.status(200).json(row);
    }else{
        res.status(400).send({
            message: "Bad Request, No such product exists"
        })
    }
}

export const getAllFiles = async(req, res) => {
    const p_id = req.params.id;
    const product = await Product.findByPk(p_id);
    if(product){
        const rows = await Image.findAll( {where: {
            product_id : p_id
        }})
        res.status(200).json(rows);
    }else{
        res.status(400).send({
            message: "Bad Request, No such product exists"
        })
    }
}

export const deleteFile = async(req, res) => {
    const p_id = req.params.id;
    const imageId = req.params.imageId;
    const product = await Product.findByPk(p_id);
    if(product){
        const image = await Image.findByPk(imageId);
        if(image){
            await s3uploader.deleteFile(product.owner_user_id+"/"+p_id+"/"+image.file_name)
            const row = await Image.destroy({ where: {
                image_id: imageId
            }});
            res.status(204).json(row);
        }
        else
            res.status(404).send("");
    }else{
        res.status(400).send({
            message: "Bad Request, No such product exists"
        })
    }
};