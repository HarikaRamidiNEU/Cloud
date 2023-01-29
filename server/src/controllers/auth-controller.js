import * as authService from "../services/auth/auth-service";

/**
 * It logsIn a user and returns the accesstoken in the response
 * @param req - Http Request with <ISignInUser> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const login = async (req, response) => {
    try {
      const userWithToken = await authService.loginUser(req.body);
      setResponse(response, userWithToken);
    } catch (err) {
      if (err.message === "User Not found.") setError(response, err, 404);
      else if (err.message === "Invalid Password") setError(response, err, 401);
      else setError(response, err, 500);
    }
  };
  