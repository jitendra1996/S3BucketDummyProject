const bcrypt =  require('bcryptjs');

/**
 * Encrypts a password using bcrypt algorithm.
 *
 * @param {string} password - The password to be encrypted.
 * @returns {Promise<string>} - A promise that resolves to the encrypted password hash.
 * @throws {Error} - If an error occurs during the encryption process.
 */
exports.encryptPassword = async (password)=>{
    try {
        const hash = await bcrypt.hash(password,12);
        return hash;
    } catch (error) {
        console.error("🚀 ~ exports.encryptPassword= ~ error:", error);
    }
}
