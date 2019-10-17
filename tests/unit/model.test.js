const mongoose = require('mongoose');
const crypto = require('crypto');
const { secret } = require('../../configs/config')

describe('model', () => {
    describe('user', () => {
        it('create', () => {
            const User = require('../../model/user');
            const Model = mongoose.Model;
            const [ mockEmail, mockPassword, mockNickname ] = [ 'abc@naver.com', 'abc123', 'nick' ];
            Model.prototype.save = jest.fn(function () {
                return [this.email, this.password, this.nickname];
            });
            const encrypted = crypto.createHmac('sha1', secret)
            .update(mockPassword)
            .digest('base64')
            expect(User.create(mockEmail, mockPassword, mockNickname)).toEqual([mockEmail, encrypted, mockNickname]);
        });
    });
})