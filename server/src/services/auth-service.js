import { generateAccessToken } from "../utils/token";
/**
 * This method is used to generate the accesstoken for the valid users
 * @param signInUser - user object with username and password
 */
 export const loginUser = async (signInUser) => {
    const user =  await User.findOne({
      username: signInUser.username
    });
      if (!user) {
        throw new Error("User Not found");
      }

      const passwordIsValid = await user.comparePassword(signInUser.password);
      if (!passwordIsValid) {
        throw new Error("Invalid Password");
      }
      else{
      const aToken =  generateAccessToken(user.id);

      const res = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        accessToken: aToken,
        refreshToken
      }
      return res;
    }
  };
