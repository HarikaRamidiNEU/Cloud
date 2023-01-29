
/**
 * Generates an access token with the given parameters using base64.
 * @param username 
 * @param password
 * @returns access token.
 */
 export const generateAccessToken = (username, password) => {
    const plainCredential = `${username}:${password}`
    const bearerToken = Buffer.from(plainCredential).toString('base64');
     return bearerToken;
  }