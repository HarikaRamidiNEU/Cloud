import bcrypt from 'bcryptjs';

/**
 * Salt for generating hash.
 */
const salt = bcrypt.genSaltSync(10);

/**
 * Generates a hashed value for given password.
 *
 * @param password Password to be hashed.
 * @returns Hashed password.
 */
export const hashPassword = (password) => {
    return bcrypt.hash(password, salt);
}

/**
 * Compares the given password against hashed password.
 *
 * @param hashedPassword Hashed password.
 * @param password Password to be validated.
 * @returns true, if the password match.
 */
export const comparePassword = (hashedPassword, password) => {
    return bcrypt.compare(password, hashedPassword);
}