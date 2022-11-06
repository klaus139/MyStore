module.exports = async function(req, res, next){
    if(req.isAuthenticated()) {
        const user = req.user;
        if(user.role === 'admin') {
            return next();
        } else{
            req.flash('error', 'You are not authorized to access this page');
            res.redirect('back');
        }

    } else {
        req.flash('error', 'You need to login first');
        res.redirect('/users/login');
    }
}