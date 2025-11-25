export const authorizedRoles=(...allowedRoles)=>{
return (req,res,next)=>{
if(!req.user || !allowedRoles.include(req.user.role)){
return res.status(401).json({message:"Forbidden insufficient role"})
}
next();
}
}