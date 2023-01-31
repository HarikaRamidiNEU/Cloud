import database from "../config/database.js";
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

export const validateAccessToken = (token, userId) => {
    const plainCredential = Buffer.from(token).toString('ascii');
    const username = plainCredential.split(":")[0];
    const originalUserId = database.query("Select id from public.'Users' where username = $1", username);
    if(userId.equals(originalUserId))
        return true;
    else
        return false;
}

