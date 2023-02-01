import { validateAccessToken } from "../utils/token.js";
/**
 * Authorization Express Middleware to validate the request.
 *
 * @param req Request.
 * @param res Response.
 * @param next Next middleware to be executed.
 */
export const authRoute = async (req, res) => {
  const authHeader = req.headers.authorization;
  const userId = req.params.id;
  const token = authHeader;
  let status = 200;
  if (token == null) {
    status = 401;
    return status;
  };
  const isValid = await validateAccessToken(authHeader, userId);
  if(!isValid) {
    status = 403;
  }
  return status;
};
