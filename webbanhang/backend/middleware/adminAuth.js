import e from 'express';
import  jwt  from 'jsonwebtoken';

const adminAuth = async(req,res,next)=>{
    try {
        const {token} = req.headers;
        if (!token) {
            return res.json({success:false,message:"Không có quyền truy cập, vui lòng đăng nhập lại"}); 
            
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD) {
            return res.json({success:false,message:"Không có quyền truy cập, vui lòng đăng nhập lại"}); 
            
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

export default adminAuth;