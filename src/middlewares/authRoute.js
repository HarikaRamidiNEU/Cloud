import User from "../models/User.js";
import auth from "basic-auth";
import { comparePassword } from "../config/crypto.js";

/**
 * Authorization Express Middleware to validate the request.
 *
 * @param req Request.
 * @param res Response.
 * @param next Next middleware to be executed.
 */
export const authRoute = async (req, res) => {
  let status = 200;
  const user = await auth(req);
  
  const dbuser = await User.findOne({where: {username: user.name}})
  if(dbuser){
    const passwordMatches = await comparePassword(dbuser.password, user.pass);
    const userId = req.params.id;
    if(! passwordMatches)
      status = 401;
    else if(userId && userId != dbuser.id)
      status = 403;
    }
  else{
    status = 401;
    return status;
  }
  return status;
};