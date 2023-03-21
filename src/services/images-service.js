import Product from "../models/Product.js"
import Image from "../models/Image.js"
import * as s3uploader from "../middlewares/s3FileUploader.js"
import logger from '../config/logger.js'

export const uploadFile = async(req, res) => {
    const file  = req.file;
    const fileType = req.body.filetype;
    const supportedFileTypes = ['jpeg','png','jpg'];
    try {
        if (!file || !fileType){
            logger.error("file or/and fileType is/are missing.")
            res.status(400).send({
                message: "Bad request."
            })
        }
        else {
            const ext = file.originalname.split('.').pop();
            if(!supportedFileTypes.includes(fileType) && ext !== fileType){
                logger.error("filetype is not supported or file name and filetype are mismatching");
                res.status(400).send({
                    message: "Bad Request, either fileType is not supported or the file and filetype are mismatching please check."
                })
            }
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
                logger.info("Image details have been updated in database")
                res.status(201).send(row);
            } else {
                logger.error("Product with productId "+productId+ " doesn't exists");
                res.status(400).send({
                    message: "Bad Request, No such product exists"
                })
            }
        }
    } catch (err) {
        logger.error(err);
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
        logger.info("Getting Image details from database")
        const row = await Image.findByPk(imageId);
        logger.info("Image details are retrieved from database")
        res.status(200).json(row);
    }else{
        logger.error("Product with productId "+p_id+ " doesn't exists");
        res.status(400).send({
            message: "Bad Request, No such product exists"
        })
    }
}

export const getAllFiles = async(req, res) => {
    const p_id = req.params.id;
    const product = await Product.findByPk(p_id);
    if(product){
        logger.info("Getting Images details from database")
        const rows = await Image.findAll( {where: {
            product_id : p_id
        }})
        logger.info("Images details are retrieved from database")
        res.status(200).json(rows);
    }else{
        logger.error("Product with productId "+p_id+ " doesn't exists");
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
            logger.info("deleting Image details from database")
            const row = await Image.destroy({ where: {
                image_id: imageId
            }});
            logger.info("Image details are deleted from database")
            res.status(204).json(row);
        }
        else{
            logger.error("Image with imageId "+imageId+ " doesn't exists");
            res.status(404).send("");
        }
    }else{
        logger.error("Product with productId "+p_id+ " doesn't exists");
        res.status(400).send({
            message: "Bad Request, No such product exists"
        })
    }
};