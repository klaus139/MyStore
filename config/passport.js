const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async (passport) => {
    passport.use(new localStrategy({usernameField: 'email'}, async (email, password, done) => {
        try{
            const user = await User.findOne({email: email});
            if(!user){
                return done(null, false, {message: 'This email is not registered'});
            }else{
                try{
                    const isMatch = await bcrypt.compare(password, user.password);
                    if(isMatch){
                        return done(null, user, {message: 'Login successfully'});
                    } else {
                        return done(null, false, {message: 'Password incorrect'});
                    }
                    
                } catch (err){
                    console.log(err);
                    return done(err);
                }
            }
        } catch (err){
            console.log(err);
            return done(err);
        }
    }));
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            return done(err, user);
        });
    });
};