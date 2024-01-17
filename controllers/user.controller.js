exports.postLoggedInSuccessfully = async (req,res)=>{
    try {
        res.json({status:200,message:"You logged in successfully",success:true});
    } catch (error) {
        console.error("🚀 ~ router.post ~ error:", error)
    }
}