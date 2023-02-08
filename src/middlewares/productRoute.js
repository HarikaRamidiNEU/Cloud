import User from "../models/User.js"
import Product from "../models/Product.js";
import auth from "basic-auth";
import { comparePassword } from "../config/crypto.js";
/**
 * User product Express Middleware to validate the request.
 *
 * @param req Request.
 * @param res Response.
 * @param next Next middleware to be executed.
 */
export const productRoute = async (req, res) => {
    let status = 200;
    const user = await auth(req);
    
    const dbuser = await User.findOne({where: {username: user.name}})
    if(dbuser){
      const passwordMatches = await comparePassword(dbuser.password, user.pass);
      const productId = req.params.id;
      const product = await Product.findAll({where: {owner_user_id: dbuser.id, id: productId}})
      if(! passwordMatches)
        status = 401;
      else if(product.length === 0)
        status = 403;
      }
    else{
      status = 401;
      return status;
    }
    return status;
};
