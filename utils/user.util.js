const bcrypt =  require('bcryptjs');

exports.encryptPassword = async (password)=>{
    try {
        const hash = await bcrypt.hash(password,12);
        return hash;
    } catch (error) {
        console.error("🚀 ~ exports.encryptPassword= ~ error:", error);
    }
}