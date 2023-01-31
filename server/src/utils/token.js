import pool from "../config/database.js";
/**
 * Generates an access token with the given parameters using base64.
 * @param username 
 * @param password
 * @returns access token.
 */
 export const generateAccessToken = (username, password) => {
    const plainCredential = `${username}:${password}`;
    const bearerToken = Buffer.from(plainCredential, "utf8").toString("base64");
     return bearerToken;
}

export const validateAccessToken = async (token, userId) => {
    const plainCredential = Buffer.from(token, "base64").toString("utf8");
    const username = plainCredential.split(":")[0];
    const results = await pool.query("Select id from public.\"Users\" where username = $1", [username]);
    const originalUserId = results.rows[0].id;
    if(originalUserId && (userId === originalUserId))
        return true;
    else
        return false;
}

