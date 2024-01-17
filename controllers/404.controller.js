exports.get404Page = (req,res) => {
    res.json({status:400,message:"Page not found",success:false});
};