const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    consfirmPassword: String
});

UserSchema.methods.setPassword = function (inputPassword) {
    this.password = crypto.randomBytes(16).toString('hex');
    this.consfirmPassword = crypto.pbkdf2Sync(password, this.inputPassword, 1000, 512, 'sha512').toString('hex');
}


UserSchema.methods.validatePassword = function (inputPassword) {
    const password = crypto.pbkdf2Sync(password, this.consfirmPassword, 1000, 512, 'sha512').toString('hex');
    return this.consfirmPassword === password;
}

UserSchema.methods.generatJWT = function(){
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email:this.email,
        id:this._id,
        exp:parseInt(expirationDate.getTime() / 1000, 10),

    },'secret');
} 

UserSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        password: this.password,
        consfirmPassword:this.consfirmPassword
    }
}

const User = mongoose.model('User', UserSchema);

module.exports = User;