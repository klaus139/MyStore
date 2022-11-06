const mongoose = require('mongoose');
module.exports = async function (key){
    try {
        await mongoose.connect(key);
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
};