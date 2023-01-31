import { validateAccessToken } from "../utils/token.js";
/**
 * Authorization Express Middleware to validate the request.
 *
 * @param req Request.
 * @param res Response.
 * @param next Next middleware to be executed.
 */
export const authRoute = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const userId = req.params.id;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  if(validateAccessToken(authHeader, userId)) {
    req.user = user;
    next();
  }
  else
    return res.sendStatus(403);
};
