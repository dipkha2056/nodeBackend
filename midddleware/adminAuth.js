const jwt = require('jsonwebtoken')
const user = require('../models/signUp')

module.exports.verifyUser = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verifydata = jwt.verify(token, 'sercretkey');
        user.findOne({ _id: verifydata.userId })
            .then(function (userInfo) {
               // res.send(userInfo);
               req.userData = userInfo
               console.log(userInfo)
               next()
            })
            .catch(function (e) {
                res.status(201).json({ message: e })
            })
    }
    catch {

    }
}

// module.exports.verifyAccount = function(req,res,next){
//     if(!req.userData){
//         return res.status(401).json({message : "Unauthorized User !"})
//     }
//     else if(req.userData.loginfrom!== 'Accountant'){
//         return res.status(401).json({message : "authorized User!!"})
//     }
//     next()
// }