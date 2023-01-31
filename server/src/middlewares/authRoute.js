import { validateAccessToken } from "../utils/token.js";
/**
 * Authorization Express Middleware to validate the request.
 *
 * @param req Request.
 * @param res Response.
 * @param next Next middleware to be executed.
 */
export const authRoute = (req, res) => {
  const authHeader = req.headers.authorization;
  const userId = req.params.id;
  const token = authHeader;
  if (token == null) return res.sendStatus(401);

  if(!validateAccessToken(authHeader, userId)) {
    return res.sendStatus(403);
  }
};
