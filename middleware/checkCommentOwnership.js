const comments = require('../models/Comment');
module.exports = async function (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.cid, (err, foundcomment) => {
            if(err) {
                res.redirect('back');
            } else {
                if(foundcomment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect('back');
                }
            }
        })
    } else {
        res.redirect('/users/login');
    }
};