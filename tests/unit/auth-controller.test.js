const mongoose = require('mongoose');
const crypto = require('crypto');
const { secret } = require('../../configs/config')

describe('authController', () => {
    const authController = require('../../routes/auth/auth-controller');
    const Model = mongoose.Model;
    Model.prototype.save = jest.fn(function () {
        return new Promise ((resolve, reject) => {
            resolve(this);
        });
    });

    const mockUserInfo = {
        "email": 'abc@naver.com',
        "password": 'abc123',
        "nickname": 'nick'
    };

    const mockRequest = {
        "body": mockUserInfo
    };

    const mockResponse = {
        "status": jest.fn().mockReturnValue(this),
        "redirect" : () => {},
        "send": (data) =>  data
    };

    const encrypted = crypto.createHmac('sha1', secret)
        .update(mockUserInfo.password)
        .digest('base64')

    it('register successfully', async () => {
        const sentData = await authController.register(mockRequest, mockResponse);
        
        expect(sentData).toEqual(expect.objectContaining({ email: mockUserInfo.email, password: encrypted, nickname:mockUserInfo.nickname }));
    });

    it('register without email', async () => {
        delete mockUserInfo.email;
        await authController.register(mockRequest, mockResponse);
        
        expect(mockResponse.status).toHaveBeenCalledWith(409);
    });
});