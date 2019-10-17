const mongoose = require('mongoose');
const crypto = require('crypto');
const { secret } = require('../configs/config')
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const User = new Schema({
    id: { 
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    authority: {
        type: String,
        default: 'member'
    },
    accessToken: {
        type: String,
        dafault: null
    },
    provider: {
        type: String,
        dafault: null
    }
});

User.statics.create = async function ({ id, password, nickname, accessToken, provider }) {
        accessToken = accessToken || null;
        const encrypted = crypto.createHmac('sha1', secret)
        .update(password)
        .digest('base64');
        return user = new this({ id, password: encrypted, nickname, accessToken, provider });
}

User.statics.findOneById = function(id) {
    return this.findOne({
        id
    }).exec()
}

User.methods.verify = function(password) {
    const encrypted = crypto.createHmac('sha1', secret)
                      .update(password)
                      .digest('base64')

    return this.password === encrypted
}
 
module.exports = mongoose.model('User', User);